<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## 1. Think Before Coding

Before implementing:
- State assumptions. If uncertain, ask.
- If multiple interpretations exist, present them.
- If a simpler approach exists, say so.
- If unclear, stop and ask.

## 2. Simplicity First

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite.

## 3. Surgical Changes

When editing existing code:
- Don't modify adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style.
- Mention dead code; don't delete it.

When your changes create orphans:
- Remove imports/variables/functions YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

Every changed line must trace to the user's request.

## 4. Goal-Driven Execution

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
<!-- END:nextjs-agent-rules -->
