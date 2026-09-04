# Review Flow

Bounded flow for independently evaluating a software change against intent, design, correctness, maintainability, risk and workflow rules.

## Intent examples

- “Review this change.”
- “Review this PR.”
- “Check this implementation before we merge.”

## Shape

`review requested -> gather change/context -> independent review -> findings -> accept or route corrections -> review completed`

Review should remain meaningfully independent from implementation where the runtime supports separate agents/contexts.