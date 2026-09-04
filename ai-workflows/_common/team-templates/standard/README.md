# Standard Team Template

Reusable default team organization for workflows built around Human control, governance, strategy, coordination and disposable workers.

## Roles

The template operates on a small set of reusable **roles**:

| Role | Meaning |
| --- | --- |
| `Admin` | Human-controlled workflow administration/recovery. |
| `Judge` | Governance/compliance authority. |
| `Strategist` | Workflow-local strategy and durable direction. |
| `Manager` | Coordination, staffing and lifecycle authority. |
| `Worker` | Performs bounded domain work; normally disposable/replaceable. |

In informal/runtime language, **agent type** may be used as a synonym for the Agent's role. It does not introduce another architectural layer.

A workflow instantiates these roles as concrete Agents and gives those Agents useful names/configuration for the domain:

`Role -> Agent`

Examples:

`Worker -> Coder`

`Worker -> Designer Reviewer`

`Worker -> UI Acceptance Tester`

`Manager -> Manager`

The Agent name describes the concrete job it performs in that workflow. `Coder` is therefore not another role underneath Worker; it is a Software Development Agent fulfilling the Worker role.

A runtime may create multiple instances/identities of the same configured Agent when needed, for example `Coder 1` and `Coder 2`.

## Inherited matrices

The Standard Team Template owns the reusable/default part of every Team policy matrix:

| Matrix | Template responsibility | Workflow responsibility |
| --- | --- | --- |
| [`capability-matrix.csv`](capability-matrix.csv) | Generic Role capabilities/ownership/boundaries. | Domain-specific Agent capabilities and exceptions. |
| [`communication-matrix.csv`](communication-matrix.csv) | Default ordinary communication between Human and Roles / Role-to-Role. | Agent-specific routes, Human-facing Worker exceptions, Worker-to-Worker routes. |
| [`lifecycle-matrix.csv`](lifecycle-matrix.csv) | Lifecycle/control-plane authority such as inspect-health and clone. | Genuine lifecycle exceptions only. |
| [`command-matrix.csv`](command-matrix.csv) | Fail-closed default: grants no concrete AI Commands. | Concrete command names and Agent permissions for the workflow. |

Policy resolution is conceptually:

`standard template defaults -> workflow Agent bindings -> explicit workflow overrides`

A workflow MUST NOT copy a template row merely to restate the same policy. Local matrices contain only domain-specific policy, concrete bindings and explicit overrides.

Concrete AI Commands intentionally remain workflow-specific because a generic Worker does not inherently need `source-control`, `ticket-tracker`, `logs`, or any other named command.

## Lifecycle defaults

[`lifecycle-matrix.csv`](lifecycle-matrix.csv) is authoritative for default lifecycle/control-plane relationships between Roles.

The template intentionally distinguishes ordinary communication from lifecycle control. Permission to clone an Agent does not imply permission to converse with that Agent through an otherwise forbidden communication route.

## Workflow usage

A workflow using this template should declare:

1. template: `standard`;
2. each concrete Agent's Role;
3. the Agent's workflow-specific name/configuration;
4. domain-specific capability/communication/command policy;
5. only genuine overrides to inherited generic policy.

If a future workflow requires fundamentally different organizational semantics, introduce another named Team Template instead of weakening `standard` with unrelated exceptions.