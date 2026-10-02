# Public Analytics and Event Tracking

## Existing analytics systems discovered

- Google Analytics / GA4 was present in the public site shell via an embedded gtag script in the HTML. The original tracking ID was hard-coded in the HTML and has been replaced by a safe, environment-driven contract.
- No Google Tag Manager container, Meta Pixel, Microsoft Clarity, Plausible, PostHog, or other external vendor scripts were found in the public app source.
- The site had a local click logger in `src/utils/ecosystem.ts` that stored interactions in browser storage for local logs only; it was not a production analytics provider.
- No consent management system was found in the public application.

## Canonical architecture

The public app now uses one canonical wrapper at `src/lib/analytics.ts`.

- UI code calls `analytics.track(...)` or `analytics.pageView(...)`.
- The abstraction sends events to the configured provider when available.
- It falls back to a safe dev console log in development mode.
- It is non-blocking: failures in analytics never break page rendering or navigation.

The canonical provider contract is:

- `window.gtag` if a GA measurement ID is configured.
- `window.dataLayer` for vendor-compatible event payloads.
- Safe local logging in development only.

## Page-view behavior

The app tracks canonical public route paths only, without double-counting:

- `/`
- `/firms`
- `/firm/:slug`
- `/challenges`
- `/challenge/:slug`
- `/compare`
- `/blog`
- `/blog/:slug`

SPA navigations trigger one page view per route change. The route tracking strips query strings so the app does not treat `utm_*` variants as separate canonical pages.

## Event taxonomy implemented

| Event | Purpose | Trigger | Required properties |
| --- | --- | --- | --- |
| `page_view` | Canonical page view | route change | `page_path`, `source_page`, `utm_*` when present |
| `firm_search` | discovery search | firm directory query | `query_length`, `query_category`, `result_count` |
| `firm_view` | firm detail open | firm page render | `firm_id`, `firm_slug`, `source_page` |
| `challenge_search` | challenge discovery search | challenge directory query | `query_length`, `query_category`, `result_count` |
| `challenge_view` | challenge detail open | challenge page render | `challenge_id`, `challenge_slug`, `source_page` |
| `compare_opened` | compare page opened | compare page mount | `comparison_count`, `source_page` |
| `compare_add` | add challenge to compare | add button click | `challenge_id`, `comparison_count` |
| `compare_remove` | remove challenge from compare | remove button click | `challenge_id`, `comparison_count` |
| `compare_clear` | clear all challenges | clear all action | `challenge_ids`, `comparison_count` |
| `compare_share` | comparison shared/copied | share action | `challenge_ids`, `comparison_count`, `destination_type` |
| `cta_click` | public CTA behavior | CTA clicks | `cta_id`, `page`, `destination_type` |
| `affiliate_click` | outbound commercial click | external firm CTA | `firm_id`, `firm_slug`, `destination_type`, `placement`, `page` |
| `promo_view` | promo code visible | product detail render | `firm_id`, `firm_slug`, `page` |
| `promo_copy` | promo code copied | code copy click | `firm_id`, `firm_slug`, `page` |
| `blog_view` | blog listing/article view | blog list or post render | `blog_slug`, `blog_category`, `source_page` |

## PII and privacy restrictions

The analytics abstraction intentionally drops or ignores properties that look like:

- email
- phone number
- full name
- address
- payment details
- API keys or tokens
- passwords
- session secrets
- financial data

Only public identifiers such as firm slug, challenge slug, CTA ID, and page metadata are sent.

## UTM and attribution

UTM parameters are captured when present in the URL and stored in session-scoped state only:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

The app does not create a permanent user profile or persist personal data. It does not send full query strings as page identities.

## Conversion status

Actual purchase confirmation is not present in the current app architecture. The site does not fire a `purchase` event based on a click alone.

The current status is:

- `affiliate_click`: tracked when the user clicks external/affiliate links.
- `checkout_click` / `purchase`: not implemented because no confirmed checkout integration exists in the public site.

## Consent status

No consent mechanism was found in the public code. The analytics layer does not create a fake banner or compliance system. It stays non-blocking and privacy-aware.

## Environment contract

Set an optional environment variable in the app environment for GA4 when it is configured for a deployment:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ANALYTICS_DEBUG=false
```

The repository includes a safe example file at `.env.example` with placeholders only.

## Duplicate-event audit

The app intentionally avoids duplicate page views by:

- tracking only canonical route paths
- tracking on route-change effects rather than every render
- preventing repeated page_view dispatch for the same route transition

The analytics layer does not force deduplication for legitimate events such as compare add/remove/share actions, which can occur as the user interacts with the site.

## Limitations

- This is a public-site analytics foundation only; no OS or central analytics backend is built.
- No purchase conversion pipeline exists yet.
- No consent system or legal compliance framework exists unless added later by the product/legal layer.
- Blog category and tag filters are not implemented in the current public UI, so no category/tag events were invented.
