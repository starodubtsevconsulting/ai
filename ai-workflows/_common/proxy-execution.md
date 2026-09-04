# Proxy-backed Agent execution

Proxying is a reusable Agent execution mechanism, not a Role. A proxy-backed Agent keeps the Role and Team authority of
the responsibility it represents while delegating the actual work through a configured bridge to another Agent/model.

Examples:

`Worker -> Proxy Coder`

`Worker -> Proxy Designer Reviewer`

`Strategist -> Proxy Strategist`

The concrete Agent name makes proxying visible. The existing Role remains authoritative for responsibility,
communication and capability policy.

## Execution configuration

Agent realization should use structured execution configuration rather than treating `proxy` as a new Role or relying on
a bare boolean:

```yaml
agent:
  name: Proxy Coder
  role: Worker
  execution:
    mode: proxy
    bridge: <profile-resolved-bridge>
    target: <profile-resolved-target>
```

`execution.mode` is `direct` by default. When it is `proxy`, runtime must additionally resolve:

- represented responsibility/capability;
- bridge/transport binding;
- target Agent/model binding;
- timeout, cancellation and status behavior;
- context and physical-scope projection;
- failure and provenance reporting;
- Elastic Agent Pool policy when enabled.

An unresolved required proxy dimension makes the Agent not ready.

## Responsibilities

A proxy-backed Agent:

- accepts only requests authorized for its existing Role and concrete Agent identity;
- forwards bounded intent and required contextual knowledge through its configured bridge;
- waits for the correlated target result;
- returns that result with minimal transformation;
- preserves sanitized target/provenance information when operationally useful;
- surfaces target or bridge failure without silently substituting intelligence.

Proxy execution does not lend authority. It must not redesign the request, broaden caller/target permissions, expose
credentials, choose an undeclared fallback target, or claim externally performed work as wrapper-generated work.

## Context and physical scope

The proxy-backed Agent receives the same resolved physical access scope as direct Agents in its workflow. It validates
explicit paths before delegation and passes the bounded scope to the target session as initialization context. The target
runtime must also enforce the boundary; prompt text alone is not a security control.

When a request falls outside scope, the Agent returns the sanitized boundary reason without invoking the target. It must
not collapse a policy rejection into a bridge or handshake failure.

## Lifecycle and capacity

Replacement generation and Elastic Agent Pool behavior apply to the concrete Agent independently of execution mode.
Proxy-backed pool members remain the same Role and proxy execution configuration while handling independent assignments.
They are not replacement clones merely because several target sessions exist.

Runtime naming follows the common convention:

`Proxy Coder (1) [feature-A]`

where `(1)` is replacement generation and `[feature-A]` is assignment.

## Integration examples

- [Hermes-backed Proxy Agent](../integrations/hermes-proxy.md)
