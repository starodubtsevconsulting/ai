# Why Command Runner?

![Command Runner role visual](img/command_runner.png)

Imagine a Designer Reviewer looking at a failed application and saying:

> Find out why it failed after the deployment.

It knows **what it wants to know**. It should not necessarily need to know whether the answer lives in Datadog, local logs, some cloud console, or a command we have not even invented yet.

We also do not want a high-level agent quietly improvising shell commands and external tool calls just because it happens to have access to them.

That is where Command Runner comes in.

It is the team's controlled operational fallback: give it a bounded outcome, let it figure out which registered AI Command matches the intent, check whether the caller is actually allowed to use that command, run it, and return a small useful answer.

So instead of this:

`high-level agent -> random operational/tool execution`

we get something visible and inspectable:

`high-level agent -> Command Runner -> authorized AI Command -> bounded result`

## Why not use it for everything?

Because that would just create bureaucracy between agents and capabilities they already understand.

A Coder knows what source control is. If the workflow explicitly allows Coder to use `source-control`, then:

`Coder -> source-control`

is clearer than:

`Coder -> Command Runner -> source-control`

Command Runner becomes useful when the command is **not known in advance**, or when no dedicated role owns the operational responsibility.

## Why not just ask Coder?

Because Coder has a job: implement bounded software work. It is not the universal technical person we send every strange operational question to.

If Designer Reviewer needs something and there is a known responsible role, it should ask that role. If there is no such role and the need can be satisfied by a bounded command, Command Runner is the fallback.

## The interesting part: it is also a design signal

Suppose we notice this happening constantly:

`Designer Reviewer -> Command Runner -> same kind of operation`

That tells us something.

Maybe this is no longer an occasional operation. Maybe the workflow is missing a role. Maybe an existing role should receive direct command access. Maybe the workflow route is unclear. Maybe we need a better AI Command.

Command Runner therefore gives us a useful smell in the architecture. Every time it runs we can ask:

> Is this genuinely ad-hoc, or has this become somebody's responsibility?

Sometimes the answer is: keep using Command Runner.

Sometimes the answer is: introduce a better abstraction.

That is why it exists.