# Issue 19: deferred admin panel candidate

Review only; do not merge without the owner's separate decision.

Only the admin panel moves behind a dynamic import, triggered by its first open.
The component remains mounted after that first use, preserving selected tabs and
usage filters on close/reopen. Loading and chunk errors show a closeable dialog;
a failed chunk can be retried without reloading the workspace or losing a draft.

Same dependency cache, Vite 6.4.5 production build, same source base:

| App mounted, before first admin open | Before | Candidate |
| --- | ---: | ---: |
| JavaScript bytes, static graph plus immediate bootstrap App import | 1,430,953 | 1,398,414 |
| Gzip bytes, each loaded chunk compressed separately | 417,206 | 410,381 |

This saves 32,539 raw bytes / 6,825 gzip bytes on this path, not a measured
first-paint time or a promise of an equally sized network/CPU improvement.
The deferred admin chunk is about 34.7 KB raw / 8.9 KB gzip and loads on use.
The existing large-main-chunk warning remains. Share entry behavior is unchanged.

Synthetic rendering tests cover closed/first-open behavior. A browser fixture
checks loading, opening and preserving a Last 7 days filter on reopen with all
application requests mocked. A real offline/chunk-failure network test and
physical Windows UI test remain review coverage limits.

Run the fixture at tests/ui/deferred-admin.html with a local development server.
No account, keys, user media or provider quota are needed.
