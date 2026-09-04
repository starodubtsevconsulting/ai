# Stock Trading Workflow

## Purpose

Support rule-driven stock-market trading over shorter horizons while preserving setup definitions, risk constraints, market evidence, decisions, execution outcomes and post-trade learning.

## Strategic layer

The Workflow Strategist owns `WORKFLOW_STRATEGIC` trading memory: setup definitions, conditions, risk rules, observations, decisions, execution evidence, failed patterns and lessons across trading sessions.

The Strategist determines HOW a selected trading strategy is applied and adapted. WHY capital/time should be allocated to trading, WHEN trading should be active relative to other goals, and broader human/financial constraints belong to the Global Governor.

## Strategies

Different strategies may create very different flows: trend following, momentum, mean reversion, breakout, swing, event-driven or custom rule sets. A strategy should define its assumptions, eligibility conditions, risk model, invalidation/exit logic and evidence requirements rather than relying on ad-hoc model intuition.

## Candidate execution roles

Possible ephemeral `SESSION` roles include Market Researcher, Setup Scanner, Risk Reviewer, Execution Planner, Trade Reviewer and Journal Analyst.

## Events and adaptive flow

Meaningful events may include market/session open, candidate signal, setup qualification, risk approval/rejection, planned entry, execution evidence, stop/target/invalidation condition, position close and post-trade review.

The Strategist connects events into the concrete flow required by the selected strategy while preserving hard risk/authorization boundaries.

## Prompt routing / use cases

| Example prompt / intent | Route type | Route target | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Connected commands

Commands are defined in the [AI Commands repository](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands).

| Command | Reference | Used by / purpose |
| --- | --- | --- |
| None yet | — | Commands will be connected as the workflow is implemented. |

## Risk and execution boundary

Research/analysis and actual brokerage execution are separate capabilities. A runtime MUST NOT infer permission to place trades merely because an agent can analyze markets or can technically access a broker integration. Any real-money execution capability requires explicit private profile/runtime authorization and bounded risk controls.

The workflow should preserve the distinction between facts, signals, assumptions, strategy decisions and realized outcomes. Post-trade evidence should feed durable workflow learning rather than ephemeral agent memory.

## Runtime boundary

The workflow remains independent of a particular broker, exchange/data vendor, model, harness or provider. Private account information, holdings, credentials, order permissions and limits remain outside the public workflow contract.