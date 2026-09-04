# Why UI Acceptance Tester?

![UI Acceptance Tester role visual](img/ui-acceptance-tester.png)

End-to-end UI tests are valuable, but maintaining them can become tedious because the product keeps moving.

Modern AI harnesses can often look at and interact with a real screen. That gives us another option: let an acceptance-testing agent use computer vision/computer-use to learn the interface when necessary, then turn what it learned into ordinary deterministic test code.

The desired steady state is not an AI visually clicking through the application forever. It is:

`look -> learn -> write reusable test/helpers -> run mechanically`

For a web project that mechanical layer may be Playwright. If the UI changes and the old automation stops representing reality, the agent can temporarily return to computer-use, understand the changed interface and repair the project's tests.

Each project keeps its own UI knowledge and acceptance code. The reusable role provides the learning/testing strategy; the project provides the actual product.