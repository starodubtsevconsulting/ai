# Command Runner Role

Bounded dynamic execution/routing Worker for registered AI Commands delegated by workflow Agents.

## Properties

- role: `Worker`
- level: execution
- human-facing: false
- interaction-mode: reactive
- memory-class: `SESSION`
- lifecycle: ephemeral
- intelligence: low by default
- reasoning: low by default

## Purpose

Command Runner translates bounded caller intent into authorized command invocation, executes it, waits/observes when needed, and returns a compact useful result.

Because the work is normally mechanical, Command Runner SHOULD use a cheap/low-intelligence model unless a concrete command requires otherwise.

## Ready-first Runner pool

A workflow normally keeps one ready Command Runner so the first caller does not pay Agent startup latency.

Idle/ready:

`Command Runner`

Busy assignment:

`Command Runner [deploy]`

`Command Runner [logs]`

`Command Runner [source-control]`

Square brackets are reserved for **current assignment labels**. When the Runner becomes ready/idle again, the assignment label is removed.

### Keep one ready

`ready Command Runner count >= 1`

When the ready Runner accepts work, lifecycle/staffing authority may create another plain `Command Runner` to preserve ready capacity.

```text
Command Runner                     # ready

request: deploy

Command Runner [deploy]            # busy
Command Runner                     # ready

request: logs

Command Runner [deploy]            # busy
Command Runner [logs]              # busy
Command Runner                     # ready
```

This is an Elastic Agent Pool with minimum ready capacity `1`.

### Completion

After an assignment completes, excess Runner capacity may be archived/destroyed or one completed Runner may be safely reset and reused as the ready `Command Runner`.

`Command Runner [deploy] -> Command Runner`

when that instance is selected for reuse.

## Naming convention

Agent display naming follows the common convention:

`Name (generation) [assignment] (lifecycle marker)`

Semantics:

- `(number)` = replacement generation;
- `[text]` = current elastic-pool/work assignment;
- `(cloning)` = outgoing replacement lifecycle marker.

Examples:

`Coder (3) [feature-A]`

`Coder (3) [feature-A] (cloning)`

`Coder (4) [feature-A]`

`Command Runner [deploy]`

Assignment labels and generation are independent runtime metadata and MUST NOT be conflated.

Temporary elastic copies are horizontal capacity, not replacement cloning.

## Not a mandatory proxy

Command Runner is not required between every Agent and every AI Command. When an Agent naturally owns a bounded command and workflow explicitly grants direct access, it may call that command directly.

## Authorization

Before execution verify caller identity/context, communication permission, caller permission for resolved command and runtime authorization. Command Runner never lends its own authority to the caller.

## Output protection

`command raw output -> preserve/reference if required -> filter/bound/summarize -> compact report -> caller`

## Communication

Follows [`../communication.md`](../communication.md).

## Boundaries

- Not human-facing.
- Does not own product/design/workflow strategy.
- Does not broaden caller permissions.
- Does not maintain durable memory by default.
- Busy/temporary Runners receive only contextual knowledge and bindings needed for their bounded assignment.