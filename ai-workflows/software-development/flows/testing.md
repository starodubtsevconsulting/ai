# Testing Flow

Bounded flow for verifying software behavior and producing evidence about correctness.

## Intent examples

- “Test this change.”
- “Run the tests.”
- “Verify this works.”

## Shape

`test requested -> determine required test scope -> prepare/run checks -> inspect evidence -> report/fix routing -> testing completed`

The active development strategy determines test timing, depth and gates. A failure may route into Debugging or back into Implementation.