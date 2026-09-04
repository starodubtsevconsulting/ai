# Workflow Specification

Common contract and repository structure for reusable workflows.

## Structural consistency principle

Every workflow MUST expose the same required skeleton even when parts are not populated.

## Core model

A workflow represents a reusable human/business activity. A flow is a bounded process inside it. A workflow may operate over multiple sources/projects.

`Role capabilities -> agents.md implementation bindings -> Team policy/authorization -> Source context -> runtime`

## Sources / projects

Every workflow MUST define how its sources are identified/resolved, even if only one source exists. Source owns source-specific context/configuration/artifacts/conventions.

The active profile and workflow together resolve the canonical physical roots and access modes available to an Agent
request. When several configured sources/projects are in scope, selecting one as primary chooses the initial working
directory but does not grant access outside the resolved set. Harness and bridge adapters consume this same scope contract
so equivalent requests have equivalent boundaries regardless of where execution occurs.

## Role capability implementation

Reusable roles define conceptual capabilities. `agents.md` turns those concepts into concrete workflow-local implementations. Implementation binding does **not** grant authority; Team command policy remains authoritative.

## Team model

Every workflow owns static Team definition under `team/`. Team defines collaboration/security/command/lifecycle authorization. Runtime maintains dynamic roster IDs/state.

## Agent lifecycle

Every workflow-local Agent MUST satisfy the complete Agent instantiation contract defined by [`role.spec.md`](role.spec.md) before READY. This includes clone policy, generation semantics, knowledge transfer and proactive/recovery cloning.

`workflow.spec.md` does not redefine those lifecycle mechanics. It requires workflows to supply concrete configuration and recovery sources.

## Workflow knowledge continuity and recovery

Normal continuity comes from **proactive knowledge transfer** between Agent generations. Recovery is needed only when that opportunity was missed or the transferred knowledge is incomplete.

A workflow SHOULD define the knowledge sources available for recovery cloning. Recovery sources are evidence used to reconstruct enough working context for the next Agent generation; they are not substitutes for normal proactive transfer.

Common recovery-source categories are:

| Recovery source | What it can recover | Notes |
| --- | --- | --- |
| **Supervisor / coordinating Agent** | Objective, delegated responsibility, decisions it knows about, expected outcome, current coordination context. | May itself have persistent/external memory. Usually broader and less detailed than the exhausted Worker's private working context. |
| **Work / ticket tracker** | Progress, completed checklist items, current status, comments, gotchas, decisions recorded during work, blockers and remaining work. | Cheap, natural durable operational memory when kept continuously synchronized. Provider is workflow/runtime-specific; not assumed to be Jira. |
| **Session storage** | Captured session/handoff/activity state that survives an Agent instance. | Optional/future mechanism; workflow may declare it even when runtime implementation is not yet available. |
| **Durable workflow/source memory** | Persistent strategy, source knowledge, historical decisions and other scoped memory. | Availability depends on Agent/workflow memory configuration. |
| **External work artifacts/evidence** | Current code/files, source control, documents, outputs, logs or other durable evidence. | Useful for reconstructing actual state even when conversational context is gone. |

Recovery SHOULD use the smallest sufficient set of available sources rather than blindly loading everything.

### Work tracker as operational memory

When a workflow uses a work/ticket tracker, the workflow SHOULD keep it synchronized as work progresses rather than updating it only at the end.

Where Manager owns work tracking, Manager is responsible for keeping relevant progress durable through the configured work-tracking capability. This may include:

- status/progress changes;
- completed/remaining checklist items;
- concise comments about important discoveries/gotchas;
- blockers;
- decisions relevant to continuation;
- references to important artifacts/evidence.

This serves normal Human/team observability and also creates a cheap recovery source if an Agent's conversational context is unexpectedly lost.

The tracker is **not** intended to duplicate the entire Agent conversation. It preserves operationally useful continuation state.

### Supervisor-assisted recovery

A workflow MAY identify a supervising/coordinating Agent for another Agent. During recovery cloning, lifecycle authority may request bounded reconstruction knowledge from that supervisor when Team communication/lifecycle policy permits it.

Supervisor knowledge may come from its current context and/or configured memory extension. It SHOULD be treated as partial reconstruction evidence rather than assumed to be an exact copy of the exhausted Agent's lost context.

### Recovery principle

`proactive transfer available -> use direct Agent knowledge transfer`

`direct knowledge unavailable -> recovery clone -> reconstruct from authorized durable/peer evidence -> activate with explicitly partial/recovered context`

The system MUST NOT claim exact continuity when reconstruction is incomplete. Some recovered context is still preferable to silently starting the successor with no knowledge of prior work.

## Staffing authorities

Workflow declares which Agents may change runtime membership. Staffing changes update authoritative runtime roster/trust state.

## Optional Admin

Workflow MAY define Admin as Human-facing lifecycle/recovery authority. Governance remains Human -> Judge.

## Required folder structure

Every workflow MUST contain `README.md`, `workflow.md`, `agents.md`, and `team/` with required matrices.

## agents.md

Defines workflow-local Agent realizations and concrete implementation bindings.

### Agent properties

| Agent | Role | Human-facing override | Intelligence | Reasoning | Context | Memory | Lifecycle | Clone after compactions | Clone at context utilization | Scheduled | Schedule intent | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |  |  |  |

### Capability implementation bindings

| Agent | Role capability | Implementation type | Implementation | Notes |
| --- | --- | --- | --- | --- |
|  |  | `command` / `harness` / `runtime` / `project` / other |  |  |

## team/

Required static coordination/authority contract. Missing communication/command/lifecycle grants mean not allowed. Runtime IDs do not belong in static matrices.

## workflow.md

Required authoritative workflow contract with purpose/boundary, sources/projects, strategic layer, roles/composition, strategies, flows/events, prompt routing/use cases, connected commands, memory, **knowledge recovery sources**, inputs/outputs/evidence, runtime/privacy boundaries.

Its sources/projects section must describe how runtime resolves canonical roots and access modes without embedding private
machine paths in reusable workflow policy.

### Knowledge recovery sources

Every workflow SHOULD state which recovery-source categories it supports and how they resolve at runtime.

| Recovery source | Available | Resolution / implementation | Notes |
| --- | --- | --- | --- |
| Supervisor / coordinating Agent |  |  |  |
| Work / ticket tracker |  |  |  |
| Session storage |  |  |  |
| Durable workflow/source memory |  |  |  |
| External work artifacts/evidence |  |  |  |

## Concepts

**Workflow** = long-lived reusable domain/activity.

**Source** = concrete subject/context workflow operates on.

**Project** = common Software Development source type.

**Role** = reusable responsibility/behavior contract.

**Agent** = concrete workflow participant fulfilling a Role.

**Team** = static workflow-specific collaboration/security/authorization policy.

**Runtime roster** = dynamic mapping of Agent instances to current IDs/state.

**Flow** = bounded process inside workflow.

**Command** = bounded reusable action/implementation option.

**Knowledge transfer** = direct outgoing-to-successor working-context handoff before exhaustion.

**Knowledge recovery** = best-effort reconstruction from authorized evidence after direct transfer is unavailable/incomplete.

## Memory

Persistent source-specific knowledge SHOULD preserve source identity/scope. Agent memory is one possible continuity/recovery source, not a requirement that every Worker maintain persistent memory.

## Runtime boundary

Runtime/profile resolves active source/project and maps requirements/bindings to concrete models, providers, IDs, paths, schedules, credentials, memory/recovery implementations and final authorization.

## Minimum acceptance checklist

- [ ] required skeleton exists;
- [ ] source/project resolution defined;
- [ ] every Agent satisfies Role-to-Agent instantiation contract;
- [ ] clone-policy thresholds supplied;
- [ ] knowledge recovery sources represented;
- [ ] work tracker continuity responsibility represented when tracker is used;
- [ ] concrete command bindings authorized separately by command matrix;
- [ ] static Team policy separate from runtime roster;
- [ ] every Agent declares scheduled yes/no;
- [ ] command/communication/lifecycle access requires explicit grant;
- [ ] memory/runtime/privacy boundaries represented.
