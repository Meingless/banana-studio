# Issue 23: first bilingual interface candidate

Review only; this is not the complete translation of every screen.

The first slice translates the workspace bar, language control, AI settings
heading, primary image generation/Brainstorm/template labels, and history title.
User prompts, saved data, model/provider identifiers and generation instructions
are never translated by changing the interface language. Admin reports, detailed
settings/help, most Gallery dialogs and backend error messages remain outside
this first slice and can still appear in English or their existing language.

A typed English/Turkish dictionary supplies matching keys/placeholders. The
versioned local preference overrides browser-language detection; unavailable
storage still permits an in-memory selection. Browser Turkish is detected even
when storage access throws. Changes update html.lang and synchronize valid
cross-tab storage events. React renders substitutions as text rather than HTML.

The language context/switcher concept was independently reviewed from
thundergokhan's mixed PR #31 at 9f3cfaa3c0c3bb563d0bedc1cb86a7906d741b4b.
This candidate does not incorporate that PR's templates, shortcut modal,
YouTube safe zone, optimizer, proxy, lockfile or other unrelated changes.

Tests check dictionary/placeholder parity, preference failures, language fallback
and substitutions. The browser fixture at tests/ui/i18n.html checks both
languages, selection persistence after reload and the primary layout. All
application requests are synthetic. Translation completeness, smaller-window
layouts and physical Windows acceptance still require review before a final
product-wide language release.
