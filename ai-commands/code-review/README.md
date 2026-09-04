# Code Review

Status: **TODO / specification placeholder**

Reusable AI command for an independent review pass over a software change.

The command runs from a requesting reasoning agent such as Designer Reviewer while creating a separate review context with its own review rules/instructions. Independence comes from separate review context/rules, not a permanent Independent Reviewer role.

## Inputs

Uses the common `profile -> workflow -> source/project` execution context from [`command.spec.md`](../command.spec.md).

| Input | Required | Meaning |
| --- | --- | --- |
| `profile` | yes | Active AI profile/context. |
| `workflow` | yes | Active workflow context. |
| `project` | yes | Software project/source being reviewed. |
| `location` | yes | Repository/worktree/path where review evidence can be resolved. |
| `review_target` | yes | Change to review: PR, branch, commit, diff, files, or equivalent bounded target. |
| `scope` | no | Intended ticket/story scope, acceptance criteria, design intent or other supplied review context. |
| `reference` | no | Ticket/story/PR identifiers useful for traceability. |

The command normally receives a location/target rather than a large copy of source code as prompt input. It obtains bounded review evidence as needed.

## Outputs

| Output | Meaning |
| --- | --- |
| `review_report` | Bounded independent review report containing relevant findings, evidence, risks and recommendations for the caller. |

The exact review-report schema remains intentionally open for later refinement.

## Prompt / intent scenarios

| Example prompt / intent | Command action | Required inputs / context | Result / notes |
| --- | --- | --- | --- |
| "Review this change" | independent code review | common context + location + review target | review report |
| "Review this PR against this story" | scope-aware independent review | common context + PR target + supplied story/scope | review report |

## Intended model

`Designer Reviewer -> code-review -> source-control (when needed) -> isolated review context -> review report -> Designer Reviewer`

Review execution should normally use intelligence/reasoning comparable to Designer Reviewer while avoiding contamination by Designer Reviewer's conclusions where practical.

## Result policy

```text
preserve-raw-output: false
result-mode: bounded
```

## Command delegation

| Command | Access | Purpose |
| --- | --- | --- |
| [`source-control`](../source-control/) | `allowed` | Retrieve bounded diffs/history/source-control evidence required by review. |
| [`ticket-tracker`](../ticket-tracker/) | `forbidden` | Code review does not perform ticket administration. |

Commands not listed are not granted.

## Intended responsibilities

- receive bounded change/design/context inputs;
- create/use separate review context;
- apply code-review-specific rules/checklists;
- obtain source-control evidence through allowed `source-control` dependency when needed;
- inspect implementation evidence relevant to review;
- return bounded review report to caller;
- not modify implementation merely because it found an issue.

## TODO

- define `spec.md`;
- refine review evidence boundaries;
- define independent review rules/checklists;
- define model/intelligence inheritance/selection behavior;
- refine source-control/diff acquisition behavior;
- refine review-report schema;
- add tests and implementation.