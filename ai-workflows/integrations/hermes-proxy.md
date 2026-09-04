# Hermes-backed Proxy Agent example

This optional integration example shows how a runtime can realize
[`proxy` execution](../_common/proxy-execution.md) with Hermes as the external Agent harness. Proxying does not introduce
a Role, and this example does not require workflows to use Hermes, MCP, a particular model provider or transport API.

## Separation of responsibilities

```text
Workflow Agent + existing Role + proxy execution -> registered bridge -> Hermes session -> configured model/provider
```

- The workflow defines the visible Agent, represented responsibility and Team authorization.
- The active profile resolves projects, physical roots, access modes and the desired harness configuration.
- The runtime adapter resolves Hermes installation, process/session lifecycle and transport.
- The bridge exposes bounded asynchronous delegation operations to the Proxy Agent.
- Hermes resolves its model/provider configuration without exposing credentials to the Proxy Agent.

`Proxy Coder` is an appropriate visible Agent name when the represented responsibility is software implementation.
Its existing `Worker` Role remains authoritative. `Local Coder` is less precise because location does not describe the
proxy boundary and the backing target need not remain local.

## Profile-driven configuration

Reusable workflow files must not contain a fixed endpoint, port, filesystem root, credential, provider or model. Runtime
resolves them from profile-owned configuration and secret storage.

Conceptual configuration:

```yaml
agent:
  name: Proxy Coder
  role: Worker
  represents: implementation
  execution:
    mode: proxy
bridge:
  adapter: <registered-bridge-adapter>
  submit-operation: <registered-submit-operation>
  status-operation: <registered-status-operation>
  timeout: <profile-defined-duration>
harness:
  id: hermes
  provider: <profile-selected-provider>
  model: <profile-selected-model>
scope:
  source: active-profile-and-workflow
  enforcement: runtime
```

Names inside angle brackets are configuration slots, not literal values or required API names.

## Initialization and readiness

Runtime should:

1. verify that the registered bridge operations are available;
2. resolve the workflow physical scope and selected primary project;
3. initialize or attach to a Hermes session with that scope;
4. perform a bounded, non-product identity/readiness handshake;
5. retain only sanitized executor/provider/model identity needed to validate later receipts;
6. mark the proxy-backed Agent ready when its own identity, Role and bridge contract are valid.

Temporary Hermes unavailability does not require recreating the visible proxy-backed Agent when the bridge remains correctly
installed. Until a successful identity receipt exists, every accepted request retries the handshake before delegation.
A runtime or bridge restart similarly triggers reconnection and revalidation without widening the session scope.

## Delegation lifecycle

For each accepted request, the proxy-backed Agent:

1. validates caller, Team route, represented capability and explicit filesystem paths;
2. submits the bounded request exactly once with a new correlation ID;
3. waits or polls the registered status operation using that correlation ID;
4. returns progress only when useful;
5. presents the correlated terminal Hermes result with minimal transformation;
6. preserves sanitized provenance and failure classification.

The proxy-backed Agent must never answer the delegated request using its wrapper model, silently choose another target, start an
unconfigured service, or infer an endpoint by scanning the machine.

## Physical scope

Direct launcher-created Hermes sessions and proxy-created Hermes delegations receive the same canonical roots and access
modes resolved from the active profile/workflow. The primary project selects the starting directory; all configured roots
remain bounded by their declared modes.

An explicit outside-scope path is rejected before submission. This is a policy result, not a Hermes handshake failure.
The response should explain the sanitized boundary and how the caller can select an authorized project without exposing
unrelated machine paths.

## Failure vocabulary

An implementation should keep these conditions distinguishable:

| Condition | Meaning |
| --- | --- |
| bridge unavailable | Registered delegation mechanism cannot be reached. |
| Hermes unavailable | Bridge is present, but the configured Hermes session is not ready. |
| identity mismatch | Receipt does not match the initialized executor/provider/model binding. |
| scope rejected | Request targets a path outside profile/workflow authorization. |
| timed out | Correlated work did not reach a terminal result within configured policy. |
| cancelled | Correlated work was explicitly cancelled. |
| target failed | Hermes or its configured target returned a terminal execution failure. |

Errors and receipts must be sanitized. They must not expose credentials, authentication material, internal transport
details or unrestricted filesystem inventory.

## Acceptance checks

- A request succeeds when Hermes starts before the proxy-backed Agent.
- A request retries successfully when Hermes starts after the proxy-backed Agent.
- A bridge/runtime restart reconnects without proxy-backed Agent reinitialization.
- A correlated long-running request returns its eventual terminal response rather than an invented wrapper response.
- An inside-scope project request succeeds.
- An outside-scope path is rejected descriptively before delegation.
- Endpoint, credential, provider and model values remain profile/runtime concerns.
