# Book Writing Workflow

## Purpose

Turn an idea, research, lived experience, or partial manuscript into a coherent book while preserving author intent, voice, factual integrity and continuity.

## Strategic layer

This workflow composes a Workflow Strategist from [`_common/roles/workflow/strategist.md`](../_common/roles/workflow/strategist.md). The Strategist uses `WORKFLOW_STRATEGIC` memory to retain premise, audience, themes, structure, voice decisions, research conclusions, continuity, editorial decisions, rejected directions and rationale.

The Strategist knows the book and its writing strategy. It does not model or reshape the human author. WHY this book matters relative to other goals, WHEN the author should work on it, and how it competes with other workflows belong to the Global Governor.

## Strategies

Writing strategy is first-class and separate from the workflow itself. Different authors and books can use fundamentally different approaches to planning, discovery, drafting, research and revision.

Reusable strategy examples live under [`strategies/`](strategies/):

- [`outline-first.md`](strategies/outline-first.md)
- [`discovery-writing.md`](strategies/discovery-writing.md)

Named author-inspired strategies may be added when they are grounded in documented practices rather than stereotypes.

The Workflow Strategist selects, combines, adapts or creates a strategy for the particular book. The selected strategy then shapes the concrete flow/pipeline. The pipeline is therefore an execution consequence of strategy, not the definition of Book Writing itself.

Conceptually:

`Book Writing Workflow + available roles + selected strategy -> Strategist-defined/adapted flow -> execution agents -> events/evidence -> strategy/flow adjustment`

## Candidate execution roles

A runtime may compose ephemeral agents such as Researcher, Outliner/Architect, Writer, Editor and Reviewer. These are `SESSION` agents by default. They receive only the manuscript context and strategic-memory projection needed for the current task. Useful decisions/evidence flow back to the Workflow Strategist.

## Flow and events

The workflow connects work through events and a concrete flow, but does not prescribe one universal sequence. The Strategist derives/adapts that flow from the selected strategy and current evidence.

For example, an outline-first strategy may make outline validation an early gate, while discovery writing may intentionally draft before detailed structure and introduce stronger continuity/restructure loops later.

## Prompt routing / use cases

| Example prompt / intent | Route type | Route target | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Connected commands

Commands are defined in the [AI Commands repository](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands).

| Command | Reference | Used by / purpose |
| --- | --- | --- |
| None yet | — | Commands will be connected as the workflow is implemented. |

## Memory boundary

Book/project memory belongs to the workflow, not individual Writer or Editor agents. See [`_common/memory.md`](../_common/memory.md). Raw manuscript/source files remain authoritative artifacts and are not replaced by extracted memory summaries.

## Runtime boundary

The workflow declares its domain, possible roles/capabilities, events, memory requirements and boundaries. The Strategist determines/adapts strategy and flow. The runtime/profile chooses concrete models, providers, harnesses, tools and memory implementations.