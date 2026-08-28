# AI

This is the umbrella repository for useful public pieces of the **AI Workflow Suite** and related AI work from Starodubtsev Consulting. The projects are kept in separate repositories so each piece can evolve and be used independently, while this repository provides a simple entry point to understand how they fit together.

The public collection currently includes **AI Commands**, **AI Workflows**, and **AI Profile**, with additional useful pieces published as they become ready. Feel free to explore, contribute, or ask questions.

This umbrella repository also contains shared AI reference material that does not belong to one specific implementation project, including **[local model and hardware benchmarks](benchmarks/local-models/README.md)**.

```mermaid
flowchart TD
  Actor["Actor: person exploring the public AI collection"]
  Actor --> Commands["AI Commands: pluggable executable skills"]
  Actor --> Workflows["AI Workflows: reusable work processes"]
  Actor --> Profile["AI Profile: copyable working-context template"]
  Commands --> Outcome["Outcome: discover the currently published projects"]
  Workflows --> Outcome
  Profile --> Outcome
```

Public entry point for reusable AI-assisted work projects from Starodubtsev
Consulting.

## Repositories

```mermaid
flowchart TD
  Actor["Actor: AI-assisted work"]
  Actor --> Workflow["Workflow defines the business or work process"]
  Workflow --> Commands["Commands provide reusable capabilities"]
  Actor --> Profile["Profile selects context and configuration"]
  Profile --> Workflow
  Profile --> Commands
  Commands --> Outcome["Outcome: coordinated portable building blocks"]
  Profile --> Outcome
```

### [AI Commands](https://github.com/starodubtsevconsulting/ai-commands)

Pluggable executable skills that combine AI-readable Markdown contracts with
optional scripts, supporting code, configuration boundaries, reports, and
command-owned visual tools.

### [AI Workflows](https://github.com/starodubtsevconsulting/ai-workflows)

Reusable business and work processes that coordinate commands and define the
agent roles, rules, and collaboration needed to complete a workflow.

### [AI Profile](https://github.com/starodubtsevconsulting/ai-profile)

A sanitized, copyable example of the personal or organization-specific context
that activates workflows, configures commands, binds projects, and supplies
non-secret policies and runtime preferences. Commands and workflows remain
portable and profile-agnostic; real profiles normally stay private because they
may identify internal projects, repositories, integrations, and policies.

## Current status

```mermaid
flowchart TD
  Actor["Actor: larger private AI project"]
  Actor --> Review["Select a portable piece for public review"]
  Review --> Publish["Publish approved repositories incrementally"]
  Publish --> Outcome["Outcome: small curated public collection"]
```

Only the repositories listed above are currently published as part of this
collection. Additional commands, workflows, profiles, runtimes, and integrations
remain outside the public collection unless they receive explicit review and,
for profiles, sanitization suitable for public release.
