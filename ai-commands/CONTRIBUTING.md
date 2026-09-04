# Contributing to AI Commands

```mermaid
flowchart TD
  Actor["Actor: command contributor"]
  Actor --> Model["Choose the smallest useful command shape"]
  Model --> Build["Author human rationale, contract, optional execution, and configuration boundary"]
  Build --> Validate["Validate documentation, safety, and portability"]
  Validate --> Review["Open one reviewable contribution"]
  Review --> Outcome["Outcome: reusable AI Command"]
```

Thank you for helping build portable, executable skills. A contribution should
be understandable from its diagrams and Markdown before anyone runs its code.

## Current project context

```mermaid
flowchart TD
  Organization["Organization or user context"]
  Organization --> Profile["Profile: configuration and policy"]
  Profile --> Workflow["Workflow: business process"]
  Workflow --> Commands["AI Commands: reusable capabilities shared here"]
  Commands --> Outcome["Outcome: commands adapted to your AI environment"]
```

AI Commands are currently the open-source extraction shared from a larger
project. A **profile** can be understood as the configuration and policy for
your organization or user context. A **workflow** is whatever business or work
process uses the commands. Profiles and workflows are not published here yet;
the reusable Commands layer is what this repository currently shares.

You may use or adapt the commands in whichever AI environment you prefer. A
contribution may reference profile or workflow coordinates, but must keep the
command independently understandable and must not require unpublished parent
artifacts.

## Command model

```mermaid
flowchart TD
  Actor["Actor: one AI Command"]
  Actor --> Why["Human rationale: WHY.md"]
  Why --> Contract["Contract: AI-readable skill"]
  Contract --> Execution["Execution: entry point and supporting code when needed"]
  Execution --> Configuration["Configuration: profile-resolved values when needed"]
  Configuration --> Outcome["Outcome: bounded pluggable capability"]
```

Every command includes a human-facing `WHY.md` explaining why the command exists
and a `<name>.command.md` contract defining what the AI should do. A command that
performs deterministic work adds an executable entry point—usually
`<name>.command.sh`—and may use Python, JavaScript, TypeScript, or another
appropriate implementation language. A command that needs environment-specific
values defines a configuration contract resolved from the active profile or
local command configuration.

`WHY.md` is deliberately separate from the AI contract. It explains the human
problem, desired outcome, motivation, and important tradeoffs. Execution rules,
routing, safety boundaries, inputs, and completion criteria belong in the
command contract.

## Folder templates

```mermaid
flowchart TD
  Actor["Actor: contributor chooses a template"]
  Actor --> Why["Write WHY.md"]
  Why --> Decision{"Does the command execute deterministic work?"}
  Decision -->|No| Contract["Use the contract-only template"]
  Decision -->|Yes| Executable["Use the executable template"]
  Contract --> Outcome["Outcome: minimal complete command"]
  Executable --> Outcome
```

Contract-only:

```text
<name>/
├── WHY.md
├── README.md
└── <name>.command.md
```

Executable or integrated:

```text
<name>/
├── WHY.md
├── README.md
├── <name>.command.md
├── <name>.command.sh
├── <name>.command.example.conf
├── src/                         # optional Python, JS, TS, or other code
├── adapters/                    # optional provider-specific mechanics
├── test/
├── feature.yml                 # optional visual-feature metadata
├── app.sh                      # optional standalone UI entry point
└── launcher/                   # optional Electron or browser UI
```

A reusable starting point for the rationale is available at
[`doc/command-template/WHY.md`](doc/command-template/WHY.md).

Keep generated reports, installed dependencies, credentials, and real local
configuration out of version control.

## Human rationale layer

```mermaid
flowchart TD
  Actor["Actor: human reads WHY.md"]
  Actor --> Problem["Understand the problem"]
  Problem --> Value["Understand why solving it matters"]
  Value --> Tradeoffs["Understand limitations and tradeoffs"]
  Tradeoffs --> Outcome["Outcome: reason to keep and use the command"]
```

`WHY.md` should be short, human-facing, and implementation-independent. Explain
the problem being solved, why it matters, the control or capability gained, and
important limitations. Do not duplicate execution steps from the command
contract.

## Contract layer

```mermaid
flowchart TD
  Actor["Actor: command author writes name.command.md"]
  Actor --> Intent["Define supported intent and expected outcome"]
  Intent --> Context["Declare inputs, context, capabilities, and route"]
  Context --> Safety["Declare prohibited effects and failure behavior"]
  Safety --> Evidence["Define observable completion evidence"]
  Evidence --> Outcome["Outcome: self-contained AI-readable contract"]
```

The contract is the source of truth for execution. It should explain what the
command means, how natural-language intent maps to it, which context it consumes,
what it may change, what it must never do, and which evidence demonstrates
completion.

Portable commands must not hardcode an organization, client, private repository,
credential, workflow team, or local filesystem path. External workflows and
profiles may narrow or extend the portable contract.

## Execution layer

```mermaid
flowchart TD
  Actor["Actor: contract requires deterministic behavior"]
  Actor --> Entry["Provide one documented executable entry point"]
  Entry --> Validate["Validate inputs, dependencies, and environment"]
  Validate --> Code["Delegate implementation to focused supporting code"]
  Code --> Evidence["Write bounded logs, reports, or artifacts"]
  Evidence --> Outcome["Outcome: repeatable executable behavior"]
```

Prefer a small shell entry point for predictable invocation and environment
setup. Put substantial behavior in focused source files rather than one large
shell script. Choose the implementation language that fits the command.

Executables should support explicit project and output locations when relevant,
avoid writing surprising files into a repository root, and fail with actionable
messages when dependencies or authorization are missing.

## Configuration layer

```mermaid
flowchart TD
  Actor["Actor: command needs environment-specific values"]
  Actor --> Schema["Document the configuration keys and safe defaults"]
  Schema --> Resolve["Resolve values from the active profile or ignored local config"]
  Resolve --> Secret{"Does a value contain a credential or secret?"}
  Secret -->|Yes| Local["Keep it in provider-appropriate local storage"]
  Secret -->|No| Apply["Apply the validated profile value"]
  Local --> Outcome["Outcome: configured command without committed secrets"]
  Apply --> Outcome
```

Publish `<name>.command.example.conf` only when a local configuration file is
useful. Use placeholders, never real credentials. Profile configuration should
select providers, policies, identities, URL patterns, or template references;
tokens and passwords belong in ignored credential stores.

Commands consume the supplied profile, workflow, and project coordinates. They
must not guess a profile from a company name, URL, current directory, or previous
conversation.

## Optional visual layer

```mermaid
flowchart TD
  Actor["Actor: command benefits from interaction or rich output"]
  Actor --> App["Add app.sh and optional feature.yml"]
  App --> UI["Keep Electron or browser UI inside the command folder"]
  UI --> Domain["Share the same domain behavior with the CLI"]
  Domain --> Outcome["Outcome: standalone command-owned visual tool"]
```

A visual command may provide an Electron application, browser page, interactive
report, preview, or progress view. The UI is an adapter over the same command
contract, not a separate source of behavior. Keep it runnable independently and
capable of accepting bounded context from a host launcher.

## Visual-first documentation

```mermaid
flowchart TD
  Actor["Actor: contributor adds a substantive Markdown section"]
  Actor --> Diagram["Start with a compact vertical Mermaid diagram"]
  Diagram --> Explain["Follow with the prose governed by that visual"]
  Explain --> Verify["Verify actor, decision, allowed, blocked, and outcome paths"]
  Verify --> Outcome["Outcome: scrollable visual-first documentation"]
```

Every top-level and substantive section starts with a compact Mermaid
`flowchart TD`. Prefer short nodes that fit narrow screens. Put the diagram
before the explanatory paragraphs, keep its behavior consistent with the text,
and avoid uncovered normative rules.

Use diagrams for behavior, decisions, boundaries, lifecycle, or structure. Use
small text trees for literal folder layouts. Do not replace meaningful prose
with decorative diagrams.

## Platform support

```mermaid
flowchart TD
  Command["Executable command"]
  Command --> Mac["macOS: primary and expected to work"]
  Command --> Linux["Linux: best effort; test when available"]
  Command --> Windows["Windows: currently untested"]
  Windows --> Contribution["Compatibility contributions welcome"]
```

macOS is the project's primary development and validation platform. Executable
commands should work on macOS unless their contract explicitly states otherwise.

Linux compatibility is a best-effort goal. Some commands have been exercised on
Ubuntu, but contributors must not describe all Linux distributions as supported
without current evidence. Prefer portable paths, shell behavior, runtimes, and
dependency checks so Linux remains straightforward to validate and repair.

Windows is currently untested and is not a promised platform. Do not claim
Windows support based only on code inspection. Windows compatibility changes are
welcome when they preserve existing behavior, document platform-specific
prerequisites, and include repeatable validation evidence.

Contract-only commands remain platform-neutral unless their instructions depend
on a platform feature. Every executable contribution or pull request must state
which platforms were actually tested and distinguish tested support from
best-effort or untested compatibility.

## Contribution workflow

```mermaid
flowchart TD
  Actor["Actor: contributor prepares a change"]
  Actor --> Scope["Keep one command or one shared convention in scope"]
  Scope --> Test["Run contract, executable, link, and portability checks"]
  Test --> Review["Inspect the complete diff for secrets and private coupling"]
  Review --> PR["Open a focused pull request"]
  PR --> Outcome["Outcome: auditable contribution"]
```

Keep pull requests focused. Include tests for deterministic behavior and safety
guards. Verify Markdown links and vertical diagrams. Search the final diff for
credentials, private URLs, organization names, local absolute paths, generated
reports, and unrelated files.

## Branch naming

```mermaid
flowchart TD
  Actor["Actor: contributor starts one bounded change"]
  Actor --> Purpose["Describe the change purpose in a few words"]
  Purpose --> Format["Use lowercase kebab case"]
  Format --> Guard["Exclude agent, model, and tool attribution"]
  Guard --> Outcome["Outcome: short purpose-based branch name"]
```

Use a short, feature-like branch name that describes the change rather than who
or what authored it.

Good examples:

- `publish-agents-command`
- `add-git-command`
- `improve-command-validation`

Do not prefix branches with an AI agent, model, editor, automation tool, or
personal identity. A branch is project history; its name should describe
purpose, not authorship.

## Documentation-first delivery

```mermaid
flowchart TD
  Actor["Actor: contributor proposes behavior"]
  Actor --> Why["Explain why in WHY.md"]
  Why --> Visual["Describe behavior with a vertical diagram"]
  Visual --> Contract["Update the command contract and human README"]
  Contract --> Code["Implement only the documented behavior"]
  Code --> Test["Test allowed and blocked paths"]
  Test --> Scenario["Run the live scenario when human-visible behavior changes"]
  Scenario --> Outcome["Outcome: documentation-led change"]
```

Behavior begins with the reason and documentation. Update `WHY.md`, the relevant
visual, command contract, human README, configuration example, and folder
template before or together with implementation. Code must not introduce an
undocumented capability, provider, mutation, route, configuration key, or UI
behavior.

Documentation-first does not mean documentation-only. Executable changes still
need proportionate automated tests and observable evidence. A documentation
change that alters command behavior is a contract change and receives the same
safety review as code.

Use `<name>.scenario.md` for an agent-run live acceptance flow when a command
has installation, integration, UI, browser, or other human-visible behavior
that automated tests cannot prove by themselves. Keep the scenario repeatable,
declare external effects and authorization points, and return an explicit ready
or blocked result backed by observed evidence.

## Pull request contract

```mermaid
flowchart TD
  Actor["Actor: contributor opens a pull request"]
  Actor --> Scope["State one bounded command or convention change"]
  Scope --> Docs["Link rationale, visual, and contract changes"]
  Docs --> Evidence["List tests and validation evidence"]
  Evidence --> Boundary["Confirm secrets and private coupling are absent"]
  Boundary --> Decision{"Structure, docs, code, and evidence agree?"}
  Decision -->|No| Revise["Revise before review"]
  Decision -->|Yes| Outcome["Outcome: reviewable pull request"]
  Revise --> Outcome
```

Every pull request must:

- explain the user-facing purpose and bounded scope;
- include or update the command's human-facing `WHY.md`;
- update diagrams and prose before or with changed behavior;
- preserve the command folder convention or explain a reusable convention change;
- identify the command shape and which rationale, contract, execution,
  configuration, or visual layers changed;
- list exact validation performed and important blocked paths covered;
- disclose external providers, dependencies, generated artifacts, and migration effects;
- confirm that credentials, real local configuration, private identifiers,
  absolute local paths, and unrelated files are absent;
- remain understandable and testable without access to a private parent repository.

Use the repository’s pull-request template. Draft pull requests may contain
incomplete implementation, but they must still describe the intended contract
and mark missing evidence honestly. Review approval is based on the complete
diff, not on claims in the description alone.

## Review checklist

```mermaid
flowchart TD
  Actor["Actor: reviewer evaluates a command"]
  Actor --> Why["Human reason clear?"]
  Why --> Contract["Contract complete and visual first?"]
  Contract --> Execution["Execution deterministic and tested when present?"]
  Execution --> Config["Configuration portable and secret-free?"]
  Config --> Boundary["Workflow and profile coupling externalized?"]
  Boundary --> Outcome["Outcome: approve or return bounded findings"]
```

- [ ] The command has a concise human-facing `WHY.md`.
- [ ] The command has a concise human README and required command contract.
- [ ] Every substantive Markdown section begins with a vertical diagram.
- [ ] Optional executable, source, configuration, and UI files have a real need.
- [ ] Tests cover deterministic behavior and important blocked paths.
- [ ] A live scenario covers installation, integration, or human-visible behavior when automated tests alone cannot establish acceptance.
- [ ] No credentials, private identifiers, absolute local paths, or generated output are committed.
- [ ] Profile, workflow, and project coordinates are consumed rather than guessed.
- [ ] The change is self-contained and links resolve inside the repository.
