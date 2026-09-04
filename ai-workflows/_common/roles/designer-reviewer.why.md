# Why Designer Reviewer?

![Designer Reviewer role visual](img/designer-reviewer.png)

Someone has to keep the picture of what we are actually trying to build while implementation is happening.

The same role is also a useful Human-facing surface: the Human can discuss a design, ask whether an implementation matches it, or bring a pull request without needing to orchestrate the rest of the software-development team manually.

Designer Reviewer owns that reasoning boundary. It can understand the product and source code, shape design intent, delegate implementation and judge whether the result conforms to what was intended. It does not quietly become the Coder just because it can see the code.

Combining design and conformance review in one role keeps continuity between "this is what we meant" and "this is what we built", while independent review can still be introduced as a separate bounded `code-review` command when another perspective is useful.