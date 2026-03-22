# Contributing to play-store-screenshots

This is a focused skill repository. Contributions that improve agent behavior, output quality, or developer experience are welcome.

## What to contribute

**High-value contributions:**
- Improvements to the 7-step workflow in `SKILL.md` that produce better or more consistent output
- New slide layout templates that cover common compositions not already handled
- Play Store compliance fixes (e.g. updated dimension requirements, policy changes)
- Better copywriting guidance or examples
- Documentation clarity improvements

**Avoid:**
- Hardcoded brand styles or app-specific assumptions
- Adding framework complexity beyond what the skill requires
- Verbose additions that don't improve AI agent outcomes
- Changes that make the skill more opinionated without clear benefit to users

## Testing

There are no automated tests. Manual validation is required.

To test a skill behavior change:

1. Start with an empty directory
2. Ask your AI agent (Claude Code, Cursor, etc.) to generate Play Store screenshots using the skill
3. Verify the agent follows the updated workflow correctly
4. Check that exported screenshots meet Play Store requirements
5. Confirm the feature graphic is generated at 1024×500px
6. Verify no iOS UI elements appear in the output

For documentation-only changes: verify all commands are copy-pasteable and produce the expected results.

## Before opening a PR

- Check existing PRs to avoid duplicate work
- Read the full `SKILL.md` — changes to one section often have implications for others
- Keep `README.md` and `SKILL.md` in sync if your change affects both
- Write a clear PR description explaining the practical problem your change solves

## Documentation standards

- Write for both humans and AI agents — `SKILL.md` is read by both
- Be concrete. Vague guidance produces inconsistent AI output
- Prefer examples over abstract rules
- Keep sections focused — split large changes into smaller PRs
