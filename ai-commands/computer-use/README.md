# Computer Use

Reusable AI Command for observing/interacting with an **already available graphical target** through capabilities supplied by the selected AI harness/runtime.

The command is harness-aware at runtime but harness-independent in its contract.

## Inputs

| Input | Required | Meaning |
| --- | --- | --- |
| `harness` | yes | Harness/runtime implementation, e.g. `codex`, `claude-code`, `hermes`, `pi`, or future registered name. |
| `source` | yes | Active workflow source/project identifier whose UI/context is being observed. |
| `target` | yes | Already available UI target/session: desktop window, browser/tab/page, or runtime-specific target. |
| `goal` | yes | Bounded observation/interaction objective. |
| `interaction_scope` | no | Additional allowed interaction boundary when needed. |

Harness names are runtime identifiers, not permanent enum values.

## Outputs

| Output | Meaning |
| --- | --- |
| `status` | `DONE`, `BLOCKED`, `REFUSED`, or `FAILED` with concise reason when not successful. |
| `observation_report` | Bounded caller-usable description of what was visually/structurally observed relative to the requested goal. |
| `interaction_report` | Actions performed and resulting visible state when interaction was requested; empty for observation-only use. |
| `automation_hints` | When discoverable and useful, stable UI facts that can help encode deterministic automation. |
| `evidence_reference` | Optional reference to authorized preserved screenshot/trace/artifact when runtime/flow retains one. |

The primary output is **not "the screen" itself**. It is a bounded observation report derived from the visual/interactive capability so another agent can reason and learn from it.

For a web UI, `observation_report` / `automation_hints` may include, when actually available through the harness:

- visible control names/labels and roles;
- page/window/screen state;
- navigation relationships;
- element identifiers/selectors/test IDs/accessibility information;
- relevant text/value/state;
- interaction outcome;
- stable structural clues useful for Playwright or another automation library.

The command MUST distinguish observed facts from inferred suggestions. It MUST NOT fabricate DOM IDs/selectors/styles when the harness only provides pixels/vision and cannot inspect those properties.

Example:

```text
status: DONE
observation_report:
  Settings dialog is open. A button labelled "Save" is enabled.
automation_hints:
  role=button, accessible-name="Save"
interaction_report: none
```

A UI Acceptance Tester can use this report to write/repair project-owned Playwright adapters/tests without carrying the full visual trace in its context.

## Harness capability model

Harness may expose computer-use through built-in capability, plugin, MCP/tool, desktop/browser control, screenshots or another mechanism.

`computer-use(harness, source, target, goal) -> harness adapter -> capability -> bounded observation report`

Unknown/unavailable/unauthorized capability returns `BLOCKED`/`REFUSED` as appropriate.

## Source/project context

`source` identifies the concrete workflow subject/project. Runtime resolves source-specific context but this command does not own project startup/lifecycle.

## Target and startup boundary

`computer-use` observes/interacts; it is not a launcher. Target normally already exists and is reachable through selected harness.

`prepare/start target -> computer-use observes/interacts`

If target is absent, return `BLOCKED` with missing prerequisite.

## Prompt / intent scenarios

| Example prompt / intent | Command action | Required inputs / context | Result / notes |
| --- | --- | --- | --- |
| "Look at this screen" | observe current UI | harness + source + target + goal | observation report |
| "What is this Save button?" | inspect targeted UI element | harness + source + target + goal | observed properties + automation hints |
| "Open settings and inspect this option" | interact + observe | harness + source + target + goal/scope | interaction + observation report |
| "Learn how this UI flow works" | exploratory interaction | harness + source + target + goal | structured observations/automation hints |

## Intended use

UI Acceptance Tester may use this command to discover/relearn UI and encode the returned knowledge into stable project-owned automation such as Playwright tests/helpers. Repeatable verification should normally use encoded automation afterward.

## Result policy

```text
preserve-raw-output: false
result-mode: bounded
```

Large visual traces are not automatically retained.

## Command delegation

| Command | Access | Purpose |
| --- | --- | --- |
|  |  |  |

No nested AI Command dependency is granted by default.

## Boundaries

- Requires explicit caller/workflow/runtime authorization.
- Requires explicit `harness`, `source`, `target`, and `goal`.
- Does not launch arbitrary projects/applications.
- Does not bypass OS/application/harness controls.
- Does not invent properties unavailable to the selected harness.
- Returns bounded caller-usable results.
- Product-specific selectors/test code belong to project, not this command.