# AI Command Specification

Common contract for reusable AI Commands.

Related infrastructure:

- [AI Profiles](https://github.com/starodubtsevconsulting/ai-profiles) — profile/environment/provider configuration.
- [AI Workflows](https://github.com/starodubtsevconsulting/ai/tree/main/ai-workflows) — workflow, team and source/project context.

## Common execution context

AI Commands are generally profile-, workflow-, and source/project-aware:

`profile -> workflow -> source/project -> command-specific inputs`

| Context | Meaning |
| --- | --- |
| `profile` | Active AI profile/environment/configuration. |
| `workflow` | Active reusable workflow/team context. |
| `source` / `project` | Concrete workflow subject/project. |

These should normally be inherited/resolved from active runtime/session.

## Provider abstraction

Many AI Commands are stable **generic/umbrella contracts** over interchangeable concrete systems. The concrete system is called a **provider**.

Examples:

| Command capability | Example providers |
| --- | --- |
| logs / observability | Datadog, local logs, cloud logging, other registered observability provider |
| source control | Git, another registered source-control provider |
| ticket tracking | Jira, Trello, GitHub Issues, another registered tracker |
| computer use | harness/runtime-specific computer-use adapter |

The command defines **what capability means**. Provider adapter defines **how that capability is performed for a concrete system**.

`generic command -> provider resolution -> provider adapter -> concrete system`

Provider names are open runtime identifiers, not permanent enums in the reusable specification.

A command MAY accept an explicit `provider`, but callers normally should not need to supply infrastructure already configured for active profile/workflow/source.

Recommended resolution:

`explicit provider -> source/project override -> workflow/profile configuration -> runtime default if explicitly defined -> BLOCKED`

Provider-specific endpoints, credentials, repository mappings, service names and similar details belong to profile/project/runtime configuration rather than reusable command prose.

A command using another generic command does not need to understand the nested command's concrete provider. For example:

`code-review -> source-control -> provider=Git (resolved from context)`

Code Review asks Source Control for bounded evidence; Source Control resolves whether that means Git or another configured provider.

## Input contract

Every AI Command MUST define inputs explicitly, even when it has no command-specific inputs.

| Input | Required | Meaning |
| --- | --- | --- |
|  |  |  |

Inputs are semantic contract, not necessarily CLI flags/function parameters.

Rules:

- required inputs are explicit;
- missing required input causes clarification/`BLOCKED`, not guessing;
- common profile/workflow/source context is used when applicable;
- `provider` is explicit/optional where capability has interchangeable implementations;
- command-specific source/project/harness/target identifiers are declared when needed;
- inputs do not grant authority;
- implementation-specific values are runtime-mapped when appropriate.

## Output contract

Every AI Command MUST define caller-usable semantic output, including observational/side-effecting commands.

| Output | Meaning |
| --- | --- |
|  |  |

A command may produce a report/result, mutation plus result/reference, behavioral effect, or explicitly no domain output.

## Prompt / intent scenarios

Every AI Command MUST contain representative natural-language intent mappings.

| Example prompt / intent | Command action | Required inputs / context | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

Mappings do not grant authority. Workflow/team routing decides whether/when a role reaches command.

## Command result policy

| Property | Meaning |
| --- | --- |
| `preserve-raw-output` | Whether raw/detailed output should be preserved/referenced when available. |
| `result-mode` | Caller-facing style such as `summary`, `bounded`, or `reference`. |

## Command delegation — not granted by default

An AI Command may call another AI Command only when explicitly granted.

`dependency not listed -> command may not call it`

## Required command sections

Every command README/spec MUST contain these sections even when tables are empty:

### Inputs

| Input | Required | Meaning |
| --- | --- | --- |
|  |  |  |

### Outputs

| Output | Meaning |
| --- | --- |
|  |  |

### Prompt / intent scenarios

| Example prompt / intent | Command action | Required inputs / context | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

### Result policy

```text
preserve-raw-output: <true|false>
result-mode: <mode>
```

### Command delegation

| Command | Access | Purpose |
| --- | --- | --- |
|  |  |  |

## Effective authority

`caller/workflow authorization + calling-command delegation grant + called-command/runtime authorization -> execute`

Input/output/provider definitions and prompt mappings cannot broaden authority.

## Minimum acceptance checklist

- [ ] Inputs table exists and required inputs are explicit.
- [ ] Common profile/workflow/source context is represented when applicable.
- [ ] Provider is defined/resolvable when command abstracts interchangeable systems.
- [ ] Provider-specific configuration remains outside reusable command contract.
- [ ] Outputs table defines caller-usable semantic result/effect.
- [ ] Missing required input/provider blocks/clarifies rather than guesses.
- [ ] Prompt/intent table exists even if empty.
- [ ] Result policy exists.
- [ ] Command delegation table exists even if empty.
- [ ] Nested calls cannot bypass authorization.