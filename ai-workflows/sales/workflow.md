# Sales Workflow

## Purpose

Coordinate a sales or lead-development process from an opportunity signal toward a qualified commercial outcome while preserving context, evidence, relationship history, and deliberate strategy.

This workflow exists primarily as a cross-domain example: the workflow abstraction is not limited to software, administration, or creative work. It can represent a business activity with its own roles, strategies, events, memory and adaptive flow.

## Strategic layer

The workflow composes a Workflow Strategist from [`_common/roles/workflow/strategist.md`](../_common/roles/workflow/strategist.md) using `WORKFLOW_STRATEGIC` memory.

The Strategist can retain durable sales-domain state such as qualification principles, segment observations, messaging decisions, experiment results, objections, follow-up lessons, channel performance and reasons for changing approach.

It does not model or reshape the human seller. Cross-workflow questions such as whether sales deserves attention now, how much time/capital it receives, or how it competes with consulting, product work or other goals belong to the Global Governor.

## Strategies

Different sales contexts require different strategies. A workflow may use relationship-led, qualification-first, high-touch, product-led, account-based, experimentation-driven, or other approaches.

The Workflow Strategist selects/adapts strategy to the market, offer, evidence and current objective. Strategy shapes the concrete flow rather than being confused with the workflow itself.

## Candidate execution roles

Possible ephemeral `SESSION` roles include Researcher, Qualifier, Outreach Writer, Follow-up Agent, Analyst and Reviewer. Concrete roles and permissions are composed by the workflow/runtime rather than assumed globally.

## Events and adaptive flow

Events may include an opportunity appearing, qualification evidence changing, outreach being sent, a response arriving, an objection being recorded, a meeting becoming ready, or an opportunity being won/lost.

The Strategist connects those events into a concrete flow appropriate to the selected strategy and changes the flow when evidence changes.

Conceptually:

`opportunity/events + sales strategy -> adaptive flow -> execution roles -> market evidence -> strategy/memory update`

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

Sales-domain lessons and relationship/process context belong to workflow memory. Execution agents do not acquire permanent personal memory. Sensitive/private data remains subject to the profile/runtime privacy boundary and should not be published as part of a reusable workflow definition.

## Runtime boundary

The workflow defines the reusable domain contract. The runtime/profile supplies concrete systems, CRM/tools, models, providers, credentials, integrations and memory implementation.