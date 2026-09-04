# Software Development Workflow

Reusable software-development workflow.

## Composition

This workflow realizes reusable Roles through [`agents.md`](agents.md) and coordinates them through [`team/`](team/README.md).

The team includes Workflow Strategist, Designer Reviewer, Coder, Manager, Command Runner, UI Acceptance Tester and Judge, with Admin when configured.

## Lifecycle model

The Strategist provides durable workflow continuity. Workers are bounded/session-oriented unless explicitly configured otherwise. Command Runner normally has one routine instance and may gain temporary concurrent copies for slow bounded operations.

## Flows

- [`implementation`](flows/implementation.md)
- [`testing`](flows/testing.md)
- [`debugging`](flows/debugging.md)
- [`review`](flows/review.md)
- [`release`](flows/release.md)

## Prompt routing / use cases

| Example prompt / intent | Route type | Route target | Result / notes |
| --- | --- | --- | --- |
| “Let's design this.” / “How should we build this?” | agent | Designer Reviewer | Human-facing design discussion. |
| “Let's code this.” / “Implement this change.” | flow | [`implementation`](flows/implementation.md) | Designer Reviewer may delegate implementation to Coder. |
| “Run the tests.” / “Build this.” | agent | Command Runner | Routine bounded execution. |
| “Show me the diff.” / “What changed in Git?” | agent | Command Runner | Routes through `source-control`. |
| “Commit these changes.” / “Push these changes.” / “Create a branch.” | agent | Command Runner | Bounded `source-control` operation subject to authorization. |
| “Check the new ticket.” / “Create a ticket for this.” | agent | Manager | Manager owns ticket/work tracking. |
| “Use this ticket link and start the work.” | agent chain | Designer Reviewer -> Manager | Resolve the link through the configured tracker, return authoritative scope, then continue the implementation flow. |
| “Is there still work for this topic?” | agent | Manager | Search relevant matching work, including active items; one completed match is not evidence that no active related item exists. |
| “Review whether this follows the design.” | agent | Designer Reviewer | Design-conformance review. |
| “Why is this failing?” / “Debug this.” | flow | [`debugging`](flows/debugging.md) | Enter debugging/investigation flow. |
| “Deploy this branch to dev.” | command execution | temporary Command Runner | Resolve branch + `dev`; create temporary Runner when deployment wait would monopolize normal Runner. |
| “Deploy this branch to test.” | command execution | temporary Command Runner | Resolve branch + `test`; execute configured deployment capability. |
| “Deploy the snapshot to dev.” | command execution | temporary Command Runner | Deploy supplied/resolved snapshot artifact to `dev`. |
| “Deploy release 1.2.3 to test.” | command execution | temporary Command Runner | Deploy explicit release/version to explicit environment subject to gates/authorization. |
| “Deploy the current approved release.” | flow | [`release`](flows/release.md) | Release flow resolves/approves deployment intent then delegates bounded execution to Command Runner. |
| “Let's release it.” | flow | [`release`](flows/release.md) | Enter release/readiness flow; execution occurs only after target/deployable/environment resolve. |
| “What should we build first?” | strategist | Workflow Strategist | Workflow-level prioritization/strategy. |

## Deployment execution contract

Deployment is a bounded command-execution responsibility, not a dedicated Agent responsibility at this stage.

A caller/release flow must provide or authoritatively resolve deployment inputs before execution:

`Profile -> Workflow -> Project -> Command Runner -> deployment capability`

| Input | Required | Meaning / examples |
| --- | --- | --- |
| Project/source | yes | Concrete software project/repository. |
| Environment/target | yes | `dev`, `test`, staging, production or project-defined target. |
| Deployable selector | yes | Branch, snapshot/artifact, release/version, commit or another project-defined deployable. |
| Branch | conditional | Required when deploying a branch. |
| Release/version | conditional | Required when deploying a release. |
| Snapshot/artifact | conditional | Required when deploying a snapshot/build artifact. |
| Commit/ref | conditional | Used when deployment targets an exact source-control ref. |
| Pipeline/deployment implementation | runtime binding | GitHub/Bitbucket/GitLab/cloud/other capability resolved by configuration. |

If target or deployable is ambiguous, execution stops rather than choosing strategically.

## Slow-operation concurrency

The normal Command Runner should remain available for routine workflow commands. For a slow deployment/pipeline operation, Manager/runtime may create a temporary Command Runner copy on demand:

`deploy request -> temporary Runner -> execute/wait/report -> archive temporary Runner`

This avoids keeping a permanent Deployer or warm Runner pool while preventing a long deployment from blocking unrelated command execution.

## Connected commands

Commands are defined in the [AI Commands repository](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands).

| Command | Reference | Used by / purpose |
| --- | --- | --- |
| `source-control` | [AI Commands / source-control](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands/source-control) | Resolve/inspect branches, commits, tags/releases and other source-control state used by development/deployment operations. |
| `ticket-tracker` | [AI Commands / ticket-tracker](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands/ticket-tracker) | Manager keeps work/progress synchronized and provides durable recovery context. |

Deployment/pipeline execution may later be bound to a dedicated AI Command or another runtime/provider capability without introducing a dedicated Deployer Agent.

## Context and memory

Workers receive task-relevant contextual knowledge rather than owning permanent conversational memory by default. Ticket/work tracking and durable artifacts provide recovery context when direct context transfer is unavailable.

## Runtime independence

Runtime/profile resolves concrete models/providers/harnesses and command/provider integrations.

## Privacy boundary

Credentials, private repository configuration, ticket-system credentials, deployment credentials and organization-specific private data remain runtime/profile concerns.
