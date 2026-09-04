# Common Agent Initialization Contract

## Included rules

| Included rule | Required application |
| --- | --- |
| [Included Rules Principle](https://github.com/starodubtsevconsulting/ai/blob/main/ai-commands/doc/principles/included-rules-principle.md) | Load external rule dependencies explicitly and transitively. |
| [Diagram First Principle](https://github.com/starodubtsevconsulting/ai/blob/main/ai-commands/doc/principles/diagram-first-principle.md) | Keep lifecycle decisions and blocked routes aligned with the diagrams below. |

## What this contract is

This file defines the reusable safety contract for creating, replacing, and reinitializing a workflow's runtime Agent
roster. It exists to prevent a lifecycle administrator from creating duplicate Agents, replacing only part of a Team,
initializing Agents from different rule versions, or declaring a roster ready before every Agent has a verified identity.

A workflow initializer or human-controlled Admin applies this contract when it performs an Agent lifecycle operation. The
workflow still defines which Agents exist, their models, role contracts, communication routes, and readiness tokens; this
file defines how those declarations become one consistent set of live runtime tasks. In practical terms, it governs the
transition from an old roster to a new roster: inventory existing tasks, archive the selected generation, wait for proof
that it is inactive, create one replacement batch, bind exact task IDs, and verify the whole Team before use.

This contract is infrastructure policy, not a Team definition or product-work workflow. It does not grant Agents new
capabilities, decide who may delegate to whom, choose a runtime provider, or authorize ordinary work. A workflow may add
stricter lifecycle requirements, but it must not weaken the duplicate-prevention, source-consistency, or readiness gates
defined here.

## Authoritative inventory and archive barrier

```mermaid
flowchart TD
  Human["Actor: human requests Agent lifecycle"] --> Inventory{"Decision: authoritative uncapped runtime-project inventory available?"}
  Inventory -->|Allowed| Reconcile["Allowed: reconcile every exact task ID and generation"]
  Inventory -->|Prohibited| Blocked["BLOCKED: recent feed, sidebar excerpt, title search, or empty result cannot prove absence"]
  Reconcile --> Archive["Allowed: archive every selected predecessor by exact task ID"]
  Archive --> Barrier{"Decision: complete inactive-roster readback?"}
  Barrier -->|Yes| Create["Allowed: begin one replacement batch"]
  Barrier -->|No| Blocked
  Create --> Outcome["Outcome: replacement may proceed without hidden predecessors"]
  Blocked --> Outcome
```

- Before any archive or create call, enumerate the complete selected runtime project through an authoritative, uncapped
  membership source that returns exact task IDs and archived state.
- A recent-task feed, capped listing, sidebar excerpt, title search, conversation memory, or empty result from those
  surfaces is never evidence that an Agent is absent. If complete inventory is unavailable, return
  `BLOCKED_AUTHORITATIVE_ROSTER_INVENTORY_UNAVAILABLE` with zero lifecycle mutation.
- Archive selected predecessors concurrently by exact ID and verify the complete inactive barrier before creating any
  successor. Duplicate active generations are reconciled before creation.

## Durable creation ledger

```mermaid
flowchart TD
  Admin["Actor: authorized workflow initializer"] --> Batch["Prerequisite: one durable batch with one row per declared Agent"]
  Batch --> Receipt{"Decision: exact task ID, pending client ID, or terminal failure?"}
  Receipt -->|Exact task ID| Bind["Allowed: bind the row and verify identity"]
  Receipt -->|Pending client ID| Wait["Allowed: retain receipt and wait without retry"]
  Receipt -->|Terminal failure| Repair["Allowed: repair only the exact failed row"]
  Wait --> Duplicate["BLOCKED: no fallback batch, creation-mode switch, or duplicate retry"]
  Bind --> Outcome["Outcome: exactly one ledger-authorized task per declared Agent"]
  Repair --> Outcome
  Duplicate --> Outcome
```

- A receipt containing only `clientThreadId` is pending, not absent or failed. Retain its intended Agent identity until it
  resolves to an exact task ID or terminal failure.
- While any receipt is pending, do not retry that Agent, launch a fallback batch, switch creation modes, or infer absence
  from a bounded listing. Return `WAIT_FOR_PENDING_CREATION_RECEIPTS`.
- If a delayed candidate appears beside another candidate, archive the non-authoritative generation by exact ID before
  completion. Final cutover requires one active task per non-elastic Agent, only ledger-authorized elastic capacity, no
  unresolved client IDs, and no task from an earlier attempt.

## Immutable source revision and readiness

```mermaid
flowchart TD
  Admin["Actor: authorized workflow initializer"] --> Source{"Decision: one validated immutable source revision recorded?"}
  Source -->|Allowed| Worktree["Allowed: create every Agent from that exact revision"]
  Source -->|Prohibited| Blocked["BLOCKED: dirty, divergent, implicit, or mismatched checkout"]
  Worktree --> Verify{"Decision: exact identity, project, source, directory, and readiness token verify?"}
  Verify -->|Yes| Ready["Allowed: make the complete generation dispatchable"]
  Verify -->|No| Blocked
  Ready --> Outcome["Outcome: one source-consistent ready roster"]
  Blocked --> Outcome
```

- Record one immutable revision containing the validated profile binding, manifest, Team policy, role contracts, and all
  included rules. Every created worktree starts from that exact revision.
- A dirty or divergent checkout HEAD, implicit default branch, or mismatched worktree revision is
  `BLOCKED_INITIALIZATION_SOURCE_REVISION`. Archive the candidate by exact ID; never bind it.
- Bind the complete exact task-ID directory after all rows resolve. Readiness is all-or-nothing and requires every exact
  role acknowledgement before the new generation becomes dispatchable.
