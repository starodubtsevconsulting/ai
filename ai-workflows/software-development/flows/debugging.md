# Debugging Flow

Bounded flow for investigating and correcting unexpected software behavior.

## Intent examples

- “Why is this failing?”
- “Debug this.”
- “Find the cause of this error.”

## Shape

`failure/evidence -> reproduce/observe -> form hypotheses -> investigate -> isolate cause -> correction -> verify -> debugging completed`

The flow should preserve evidence and distinguish observed facts from hypotheses. It may route into Implementation for the correction and Testing for verification.