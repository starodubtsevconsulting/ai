# Common Roles

Reusable role contracts shared by workflows.

A role describes responsibilities, boundaries, capabilities, lifecycle expectations, and memory requirements. A role is not an agent instance.

A concrete workflow selects one or more roles and specializes them into workflow-specific agent profiles. The runtime/harness then realizes those profiles as agents.

Conceptually:

`common role + workflow specialization + runtime/profile configuration -> agent`

Roles in this directory must remain independent of a particular workflow, project, organization, model provider, or harness.

## Initial roles

- `strategist.md` — persistent workflow-level strategic continuity and domain memory.
- `designer.md` — ephemeral design/architecture work for a bounded session/task.
- `coder.md` — ephemeral implementation work.
- `reviewer.md` — ephemeral review/evidence work.
- `command-runner.md` — ephemeral bounded command execution.
