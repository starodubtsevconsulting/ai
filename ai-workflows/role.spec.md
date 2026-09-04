# Role Specification

This document defines the common contract for reusable Roles and their Agent realizations.

## Required Role properties

Every reusable Role definition MUST contain Properties with at least `level`, `human-facing`, `interaction-mode`, `memory-class`, and `lifecycle`.

A Role MAY provide defaults for Agent runtime requirements such as Elastic Agent Pool or Harness Context Policy, but the concrete Agent realization/runtime MUST resolve final values during instantiation.

## Agent instantiation contract

Every runtime AI Agent MUST resolve, at minimum:

- runtime identity/team slot;
- workflow/source binding;
- Role binding;
- execution mode (`direct` by default, or `proxy` with its required structured bindings);
- model/intelligence/reasoning/context configuration;
- memory/lifecycle/scheduling configuration;
- capability bindings and Team authorization;
- physical access scope resolved from the active profile, workflow and selected source/project;
- clone policy: `clone-after-compactions`, `clone-at-context-utilization`;
- Elastic Agent Pool policy: `elastic-pool-enabled`;
- **Harness Context Policy**.

An Agent with unresolved required instantiation parameters is **NOT READY**.

Execution mode changes how an Agent realizes its existing Role; it does not create another Role or grant authority.
Proxy-backed execution follows [`_common/proxy-execution.md`](_common/proxy-execution.md).

## Workflow physical scope

Every Agent session operates within an explicit physical access scope resolved from the active profile, workflow and
configured sources/projects. The scope contains canonical workspace roots and the allowed access mode for each root. The
selected primary source/project chooses the initial working directory; it does not silently replace or broaden the
workflow's configured scope.

The same resolved scope applies whether work executes directly in the visible Agent harness or through a bridge, proxy,
external model or locally hosted runtime. Runtime initializes every such execution session with the scope before accepting
work and enforces it independently of prompt compliance.

An explicit path outside the resolved roots is rejected before filesystem work or delegation. Rejection reports the
boundary reason and enough sanitized scope information for the caller to correct the request. It MUST NOT be reported as
a connection, handshake or target-model failure when the bridge itself is healthy.

Scope is deny-by-default. A nearby directory, shared parent, remembered prior session, reachable filesystem location or
target runtime capability does not authorize access.

## Harness Context Policy

Harness Context Policy defines **requirements imposed on the AI harness/runtime that hosts an Agent** to control context usage, exposure, efficiency and observability.

It is explicitly harness-related configuration. The Agent declares/requires the policy; the harness/runtime adapter applies it using mechanisms available in the active harness.

Conceptually:

`Agent configuration -> Harness Context Policy -> harness/runtime adapter -> Codex / Claude Code / Hermes / Pi / other harness`

The common policy is harness-neutral. It MUST NOT assume Claude-specific, Codex-specific or other provider-specific configuration names.

### Common policy fields

A concrete Agent SHOULD resolve applicable values such as:

- `tool-output-policy` — normally `bounded`; avoid injecting unnecessarily large raw tool output into Agent context;
- `unused-tools` — normally `disabled` where the harness supports selective tool exposure;
- `unused-mcp` — normally `disabled` where MCP/tool-server exposure is configurable;
- `model-switching` — normally `avoid` within a running Agent context unless explicitly required;
- `context-monitoring` — normally `enabled` when harness telemetry is available;
- `cache-awareness` — `enabled` when the harness exposes meaningful prompt/context-cache behavior;
- `instruction-budget` — optional configured budget/limit for automatically loaded instruction/context material;
- `scheduled-work-cache-awareness` — enabled when scheduled/background Agent execution and harness caching interact.

Workflow/profile may specialize these values for a concrete Agent.

### Harness application

The harness/runtime adapter translates common policy intent into harness-specific mechanisms.

Examples may include instruction-file loading behavior, MCP/tool exposure, hooks/output filtering, model/effort configuration, cache telemetry, context/compaction telemetry or scheduled-task configuration. Those implementation details belong to the harness/runtime adapter, not to reusable workflow/Role definitions.

If a requested policy dimension cannot be observed or enforced by the active harness, runtime MUST report it as `UNSUPPORTED` or `UNKNOWN` rather than pretending it is enforced.

### Readiness and validation

Before Agent READY, runtime MUST resolve each required Harness Context Policy dimension into one of:

`ENFORCED | UNSUPPORTED | UNKNOWN | explicitly accepted exception`

A workflow/profile may define which unsupported/unknown dimensions block readiness. Judge/runtime validation may compare declared policy with observed harness configuration.

Harness Context Policy is preventative configuration. A separate runtime audit may measure actual context/token/cache/tool behavior and report drift or waste without modifying configuration.

## Elastic Agent Pool

Elastic Agent Pool is a horizontal capacity mechanism available to any Agent whose resolved configuration enables it.

When enabled, configuration MAY define `elastic-pool-min-ready`, `elastic-pool-max`, assignment observability and completion/reuse policy.

Pool copies are horizontal siblings, not replacement generations. Work MUST be safely partitioned.

Examples:

`Command Runner: enabled, min-ready = 1`

`Coder: enabled, min-ready = 0`

## Replacement cloning

Cloning is distinct from Elastic Agent Pool:

`Cloning = Agent (N) -> Agent (N+1)` — continuity/replacement.

`Elastic Pool = Agent A + Agent B + ...` — concurrent capacity.

When both configured context-health signals are available, proactive cloning requires compaction/equivalent threshold **AND** context-utilization/pressure threshold. Context transfer occurs before outgoing lock when reliable context remains; recovery cloning reconstructs contextual knowledge when proactive transfer was missed.

Replacement is transactional and self-checking. Runtime must verify the successor, update the authoritative roster, migrate
any schedule, archive the superseded identity and then re-read authoritative state to prove that exactly one intended
generation remains active. Delayed completion is reconciled rather than treated as a second request to create another
successor. Scheduled execution is suspended for an outgoing `(cloning)` identity and resumes only for the validated active
generation. These invariants apply to every Agent lineage; examples never restrict them to a particular Agent name.

## Runtime naming

Common display convention:

`Name (generation) [assignment] (lifecycle marker)`

`(number)` = replacement generation; `[text]` = current assignment; `(cloning)` = outgoing replacement state.

## Initialization validation

Candidate configuration MUST be validated against applicable Role, Workflow and Team rules before READY, including clone policy, Elastic Agent Pool policy and Harness Context Policy resolution.

## Role capabilities versus concrete commands

Reusable Roles describe conceptual capabilities, never concrete AI Command dependencies:

`Role capability -> Agent binding -> Team authorization -> Command/provider/harness`

## Communication and trust

Every runtime Agent inherits [`_common/communication.md`](_common/communication.md). Runtime identities must enter authoritative roster before normal trusted communication.

## Team/runtime separation

Workflow defines static Team contract; runtime maintains dynamic roster, pool membership, assignments, generations, lifecycle state and harness-policy enforcement state.

## Contextual knowledge

Contextual knowledge is task-relevant working information held in active Agent context. It is distinct from persistent memory.

## Override rule

Reusable Role properties are defaults. Workflow/profile specialization may override explicitly but SHOULD NOT silently broaden authority, privacy access, command permissions, memory scope, pool capacity or harness context exposure.

## Acceptance checklist

- [ ] Required Role properties declared.
- [ ] Agent resolves clone policy.
- [ ] Agent resolves `elastic-pool-enabled`.
- [ ] Execution mode and any required proxy bindings are resolved without changing Role authority.
- [ ] Agent resolves Harness Context Policy before READY.
- [ ] Harness-specific implementation remains outside reusable workflow/Role definitions.
- [ ] Physical roots and access modes are resolved and enforced consistently across direct and proxied execution.
- [ ] Unsupported/unknown harness policy dimensions are reported rather than guessed.
- [ ] Elastic scaling is not confused with replacement cloning.
- [ ] Context transfer/recovery lifecycle supported.
- [ ] Clone completion proves one active generation and no stale scheduled predecessor.
- [ ] Initialization validated before activation.
- [ ] Team authorization remains authoritative.
