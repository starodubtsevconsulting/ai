# Software Development Team

## Included rules

| Included rule | Required application |
| --- | --- |
| [Common Agent contract](../../agents.md) | Apply common identity, communication, packet, lifecycle, and safety rules. |
| [Common Agent Initialization Contract](../../_common/initialization.md) | Apply authoritative roster inventory, archive barriers, durable creation receipts, exact source binding, and all-or-nothing readiness. |
| [Software Development workflow](../workflow.md) | Apply the workflow's delivery order and ownership boundaries. |
| [Role capability matrix template](../../role-capability-matrix.md) | Apply common capability and Role-relationship communication semantics before the concrete Team matrices. |
| [Included Rules Principle](https://github.com/starodubtsevconsulting/ai/blob/main/ai-commands/doc/principles/included-rules-principle.md) | Apply explicit, transitive, fail-closed loading for every rule in this table. |
| [Diagram First Principle](https://github.com/starodubtsevconsulting/ai/blob/main/ai-commands/doc/principles/diagram-first-principle.md) | Apply when interpreting or editing this Team policy. |
| [Capability matrix](capability-matrix.csv) | Load the concrete Software Development capability grants. |
| [Communication matrix](communication-matrix.csv) | Load the concrete Software Development Agent-to-Agent routes. |
| [Command matrix](command-matrix.csv) | Load the concrete command ownership and execution routes. |
| [Lifecycle matrix](lifecycle-matrix.csv) | Load the concrete Agent lifecycle rules. |
| Complete included-rule context | Every Agent loading this policy must load every rule in this table. Missing, unreadable, partial, conflicting, remembered, or locally copied substitutes are `BLOCKED_INCLUDED_RULE_CONTEXT`. |

Compact shared context for all Software Development agents.

| Agent | Responsibility | Human-facing | Works with / delegates to |
| --- | --- | --- | --- |
| Strategist | Software Development strategy (HOW), durable domain continuity and workflow memory | Context-dependent | Workflow team and Global Governor when routed |
| Judge | Governance/rule changes and compliance enforcement | Yes — Human only | Human; live-test scenarios only for agent testing |
| Designer Reviewer | Design/architecture and implementation-conformance review | Yes | Human, Coder, Manager, Command Runner, `code-review` command |
| Coder | Bounded implementation | Yes | Designer Reviewer, Command Runner / allowed commands |
| Manager | Ticket/story coordination, estimate validation/recording and staffing | No | Designer Reviewer, Strategist, Coder, `ticket-tracker` |
| Command Runner | Bounded command/tool execution with caller-policy enforcement | No | Authorized callers and AI Commands |

## Directional supervision and return

| Supervising Agent | Assigned Worker | Assignment direction | Reverse direction |
| --- | --- | --- | --- |
| Designer Reviewer | Coder | Designer Reviewer sends bounded design, source-inspection, implementation, and same-scope correction packets to Coder. | Coder returns evidence, clarification questions, blockers, or terminal disposition only; it must not assign work to Designer Reviewer. |

This concrete relationship binds the common `Supervising Worker -> Assigned Worker` compatibility. The reverse
`Assigned Worker -> Supervising Worker` direction is `RETURN_ONLY`, not reverse delegation or supervision. Role
compatibility, the concrete communication matrix, and exact runtime identities must all permit a message.

## Terminology

Software Development uses these terms deliberately:

- **Ticket / Story** — synonyms for the tracked unit of software work that Manager creates/manages through the ticket tracker. `Ticket` is the preferred generic term; `story` is accepted naturally when the project uses story terminology.
- **Task** — a smaller implementation piece inside a ticket/story. Tasks normally appear through decomposition/checklists/subtasks and provide evidence for scope and estimation.

Conceptually:

`Ticket / Story -> Tasks -> implementation`

Manager MUST NOT normally reinterpret `task` as `ticket`. If a caller says `create a task`, Manager treats it as a request concerning a task/subtask inside an existing or being-created ticket/story. If context does not identify the parent ticket/story, Manager asks for clarification.

## Prompt / intent routing

| Example prompt / intent | Entry agent | Workflow flow / route | Result |
| --- | --- | --- | --- |
| "Review this pull request: <url>" | Designer Reviewer | Pull request review flow | Review against ticket scope |
| "Create a ticket for this work" | Designer Reviewer / authorized caller | Ticket creation + estimation flow | Evidence-backed estimated ticket |
| "Create a story for this work" | Designer Reviewer / authorized caller | Story synonym -> ticket creation + estimation flow | Evidence-backed estimated ticket/story |
| "Add a task for the tests" | Authorized caller | Task/subtask route under parent ticket/story | Decomposed task |
|  |  |  |  |

### Ticket creation + estimation flow

Manager owns ticket/story creation and estimate acceptance/recording. It is intentionally not assumed to have enough reasoning capacity to independently decompose underspecified software work.

An estimate is a claim requiring supporting evidence. A bare value such as `4h` is insufficient merely because it came from a more intelligent agent.

The reasoning-capable caller provides an **estimation packet** containing:

- ticket/story scope/outcome;
- concrete decomposition into tasks/checklist items/subtasks;
- estimate per task when useful, or enough sizing information to explain total;
- dependencies, uncertainty and assumptions;
- proposed total estimate according to project convention.

Example:

```text
Story: add runtime roster validation
Tasks:
- [ ] load authoritative roster: ~1h
- [ ] validate sender identity before COPY: ~1h
- [ ] replacement/roster update path: ~1h
- [ ] tests: ~1h
Total proposed estimate: ~4h
Assumptions: existing runtime registry API is available
```

`Add runtime roster validation — 4h` alone is not reviewable evidence.

Typical route:

1. Designer Reviewer determines actionable ticket/story scope.
2. Designer Reviewer decomposes it into reviewable tasks/checklist items.
3. Designer Reviewer derives/proposes estimate and states assumptions/uncertainty.
4. Designer Reviewer sends estimation packet to Manager.
5. Manager evaluates whether tasks/decomposition reasonably support estimate.
6. Manager MAY accept, challenge or reject estimate as insufficiently supported.
7. If unsupported, Manager returns `BLOCKED` and requests tasks/decomposition/evidence/clarification.
8. If coherent, Manager accepts/normalizes estimate and records ticket/story through authorized ticket-tracking path.
9. Manager reports ticket identifier and accepted estimate to caller.

Example rejection:

`Designer Reviewer -> Manager: create ticket "Implement X"; estimate=4h`

`Manager -> Designer Reviewer: BLOCKED; estimate is unsupported. Provide task decomposition/checklist and assumptions.`

Example acceptance:

`Designer Reviewer -> Manager: create story; scope=...; tasks=[...]; task estimates=[...]; total=4h; assumptions=...`

`Manager -> Designer Reviewer: COPY`

`Manager -> ticket-tracker: create ticket/story with accepted scope/tasks/estimate`

`Manager -> Designer Reviewer: DONE; ticket=<id>; accepted estimate=4h`

### Pull request review flow

1. Designer Reviewer asks Command Runner for bounded pull-request metadata.
2. Workflow resolves/extracts ticket reference through configured capability path.
3. Designer Reviewer asks Manager for authoritative ticket/story scope.
4. Manager reports bounded scope back.
5. Designer Reviewer invokes `code-review` with PR URL + ticket reference + scope.
6. `code-review` returns bounded independent findings/evidence.
7. Designer Reviewer interprets findings against design intent and reports to Human.

## Team rules

- Respect responsibility boundaries; do not silently absorb another agent's ownership.
- **Ticket** and **story** refer to the tracked parent work item; ticket is preferred generic terminology.
- **Task** means a decomposed piece inside a ticket/story, not a synonym for ticket.
- Software estimates must be evidence-backed by tasks/decomposition and assumptions.
- Manager owns estimate acceptance/recording and may reject unsupported estimates.
- Designer Reviewer owns design intent/conformance review; Coder owns implementation.
- Independent code review is `code-review`, not a standing Reviewer agent.
- Workflow Strategist owns Software Development HOW/durable domain continuity.
- Command Runner executes bounded operations and enforces caller command policy.
- Judge governs AI Workflow/AI Command rules and is directly invoked only by Human.

See [`capability-matrix.csv`](capability-matrix.csv), [`communication-matrix.csv`](communication-matrix.csv), and [`command-matrix.csv`](command-matrix.csv).
