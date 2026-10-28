# Issue 20: preserve reference transparency candidate

Review only; separate owner acceptance is required before merging.

PNG stays PNG and WebP uses alpha-capable WebP encoding (or the browser's actual
PNG fallback). JPEG sources remain JPEG. No white fill flattens transparent
references. The data URL's MIME takes precedence over stale attachment metadata;
returned MIME is read from the actual encoder output, not assumed from its input.
Unexpected lossy fallback preserves original bytes rather than silently flattening.

The shared attachment/saved-person compressor reuses that implementation and
retains strict decode/error rejection. Its dimension cap applies to the longest
side, so very tall images may be smaller than the prior width-only helper.
All thirteen reference-to-text call sites pass the returned bytes and MIME
together, including Brainstorm, Enhance, variations, video frames and H3 prompts.
The attachment caller also updates its stored MIME. PNG originals can be larger
than JPEG, so text requests progressively resize and reject images that still
exceed the existing combined 3,800,000-character base64 budget before dispatch.
This image budget is not a guarantee for arbitrarily large accompanying text.

Unit regressions cover format/dimensions, stale metadata, WebP encoder fallback,
strict/soft errors, the real Brainstorm request builder and request-budget
recompression/rejection. The browser fixture tests actual canvas encode/decode:
PNG, WebP and the attachment/saved-person path retain alpha 0/255 for a synthetic
transparent/opaque pixel pair. No provider call or user media is required.

Pending acceptance coverage includes full product reference upload/storage and
paid provider behavior on large, high-detail transparent images, plus physical
Windows UI. Existing provider-supported MIME allowlists remain unchanged.
Use tests/ui/image-alpha.html for the synthetic review fixture.
