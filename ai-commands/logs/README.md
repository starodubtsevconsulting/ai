# Logs

Status: **TODO / specification placeholder**

Reusable AI command for bounded retrieval and preprocessing of runtime/application logs.

## Inputs

Uses common `profile -> workflow -> source/project` context from [`command.spec.md`](../command.spec.md).

| Input | Required | Meaning |
| --- | --- | --- |
| `profile` | yes | Active AI profile/context used to resolve configured logging provider when not explicitly supplied. |
| `workflow` | yes | Active workflow context. |
| `source` / `project` | yes | Concrete workflow source/project whose logs are being inspected. |
| `provider` | no | Explicit logging provider/adapter, e.g. Datadog, local logs, cloud logging, or another registered provider. |
| `log_source` | no | Provider-specific logical source such as service/application/runtime/log stream. May be resolved from project/profile configuration. |
| `time_range` | no | Absolute `from -> to` range or relative range such as `last 5 minutes`. |
| `query` / `filter` | no | Text, error, level, component, correlation ID or other narrowing criteria. |
| `goal` | no | What caller is trying to understand, e.g. `why did startup fail?`. |

## Provider resolution

Caller MAY explicitly provide `provider`, but normally should not need to know infrastructure details already configured for the active profile/workflow/project.

Resolution order:

`explicit provider -> project/source override -> workflow/profile configuration -> BLOCKED`

For example, a project/profile may declare that its logs use Datadog and provide the provider-specific endpoint/site/service mapping needed by the runtime adapter. Then a caller can simply ask:

`logs(profile=X, workflow=software-development, project=Y, time_range=last 5 minutes, filter=errors)`

and `logs` resolves Datadog from configuration.

This keeps callers independent from observability infrastructure while still allowing an explicit provider override when appropriate.

Provider configuration/credentials/URLs belong to profile/project/runtime configuration, not reusable command prose. The command consumes resolved configuration; it does not invent endpoints or credentials.

## Outputs

| Output | Meaning |
| --- | --- |
| `log_report` | Bounded caller-usable report containing requested/relevant evidence, provider/source/time/filter context and concise summary when useful. |

Report may reference preserved raw evidence when permitted, but MUST NOT dump unbounded logs into caller context.

## Prompt / intent scenarios

| Example prompt / intent | Command action | Required inputs / context | Result / notes |
| --- | --- | --- | --- |
| "Give me logs from 10:00 to 10:05" | retrieve time-bounded logs | common context; provider resolved/configured | log report |
| "Give me logs for the last five minutes" | relative-time retrieval | common context; provider resolved/configured | log report |
| "Find errors in the logs from the last five minutes" | filtered retrieval | common context + time/filter | log report |
| "Get the last five minutes from Datadog" | explicit-provider retrieval | common context + provider=Datadog + time range | log report |
| "Why did this service fail to start?" | goal-directed diagnostic retrieval | common context + resolvable provider/source | diagnostic log report |
| "Find logs related to this correlation ID" | correlation-filtered retrieval | common context + correlation ID | log report |

## Result policy

```text
preserve-raw-output: true
result-mode: bounded
```

## Intended behavior

- resolve provider from explicit input or profile/workflow/project configuration;
- select corresponding observability adapter;
- resolve configured logical log source when possible;
- apply time/service/query filters before returning data;
- understand absolute/relative time ranges;
- use caller goal to focus evidence;
- enforce output/token/line limits;
- preserve provider/source provenance;
- preserve/reference raw evidence according to policy;
- return enough evidence without unbounded exposure.

## Command delegation

| Command | Access | Purpose |
| --- | --- | --- |
|  |  |  |

Commands not listed are not granted.

## TODO

- define `spec.md`;
- refine provider-neutral query inputs/outputs;
- define profile/project provider configuration convention;
- define hard output limits/summarization behavior;
- define adapters such as local logs and Datadog;
- define authorization/privacy/storage boundaries;
- add tests and implementation.