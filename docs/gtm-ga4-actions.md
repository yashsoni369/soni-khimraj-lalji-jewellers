# GTM + GA4 — action list

For: **sonikhimrajlaljijewellers.com** · GTM container `GTM-KJGS93VK` · GA4 property with measurement ID `G-4R59PN3Y3V`

Paste this whole file into Claude in Chrome. Do it **after** the `seo/pages-ctas` branch is deployed (the new events only exist on the new site). Tick each box.

---

## 0. What the website now sends to the dataLayer

Every event also carries `page_type` (`home`, `gold_rate`, `bridal`, `old_gold_exchange`, `silver`, `gold_dream_scheme`, `not_found`).

| Event | When | Parameters | Already has a GTM tag? |
|---|---|---|---|
| `whatsapp_click` | Any WhatsApp button/link | `cta_location`, `lead_intent`, `collection_category`, `product_name` | Yes |
| `phone_call_click` | Any phone number tap | `cta_location`, `phone_number` | Yes |
| `get_directions_click` | Map / directions links | `cta_location` | Yes |
| `content_inquiry_click` | "Ask Mr. Soni" knowledge buttons | `cta_location`, `content_topic` | Yes |
| `appointment_request` | "Book a visit" form sent | `cta_location`, `visit_purpose`, `visit_day`, `visit_time` | **No — add** |
| `save_contact_click` | "Save our number" (vCard) | `cta_location` | **No — add** |
| `review_click` | "Leave a Google review" (shows once the review link is added to the site) | `cta_location` | **No — add** |

New `lead_intent` values: `gold_rate`, `old_gold_valuation`, `book_visit`, `silver_catalogue`, `scheme_enquiry`.

Page views: sent by the Google tag in the page itself, plus GA4's automatic "page changes based on browser history" — **do not** add a page_view tag in GTM.

---

## 1. GTM (tagmanager.google.com → container GTM-KJGS93VK → Workspace)

### 1a. Variables → User-Defined Variables → New → "Data Layer Variable"
Create one for each name below (Variable name and Data Layer Variable Name the same, version 2). Skip any that already exist.

- [ ] `page_type`
- [ ] `visit_purpose`
- [ ] `visit_day`
- [ ] `visit_time`

(`cta_location`, `lead_intent`, `collection_category`, `product_name`, `phone_number`, `content_topic` already exist — check, don't duplicate.)

### 1b. Triggers → New → "Custom Event"
- [ ] Name `CE - appointment_request`, Event name `appointment_request`, fires on All Custom Events
- [ ] Name `CE - save_contact_click`, Event name `save_contact_click`
- [ ] Name `CE - review_click`, Event name `review_click`

### 1c. Tags → New → "Google Analytics: GA4 Event"
Measurement ID `G-4R59PN3Y3V` (same as the existing tags). Copy the settings style of the existing `whatsapp_click` tag.

- [ ] `GA4 - appointment_request` → Event name `appointment_request` → parameters `cta_location`, `visit_purpose`, `visit_day`, `visit_time`, `page_type` → trigger `CE - appointment_request`
- [ ] `GA4 - save_contact_click` → Event name `save_contact_click` → parameters `cta_location`, `page_type` → trigger `CE - save_contact_click`
- [ ] `GA4 - review_click` → Event name `review_click` → parameters `cta_location`, `page_type` → trigger `CE - review_click`

### 1d. Add `page_type` to the 4 existing GA4 event tags
- [ ] `whatsapp_click` tag → Event Parameters → add `page_type` = `{{page_type}}`
- [ ] `phone_call_click` tag → same
- [ ] `get_directions_click` tag → same
- [ ] `content_inquiry_click` tag → same

### 1e. Test and publish
- [ ] Click **Preview**, enter `https://www.sonikhimrajlaljijewellers.com/bridal-jewellery`
- [ ] On the site: tap "Book a Bridal Appointment" → send the form (WhatsApp opens — you can close it). In Tag Assistant, `appointment_request` should show the GA4 tag **Fired**.
- [ ] Tap "Save Our Number" (bottom of the page) → `save_contact_click` fires.
- [ ] Tap any WhatsApp button → `whatsapp_click` fires with `page_type = bridal`.
- [ ] **Submit** → Version name `Pages + appointment/vCard/review events` → **Publish**.

---

## 2. GA4 (analytics.google.com → Admin)

### 2a. Key events (Admin → Data display → Events)
Events appear here only after they have fired at least once (wait up to 24 h after step 1e). Then toggle **Mark as key event** for:

- [ ] `whatsapp_click`
- [ ] `phone_call_click`
- [ ] `get_directions_click`
- [ ] `appointment_request`

(Leave `save_contact_click`, `review_click`, `content_inquiry_click` as normal events.)

### 2b. Custom dimensions (Admin → Data display → Custom definitions → Create custom dimension)
Scope **Event** for all. Dimension name = Event parameter:

- [ ] `cta_location`
- [ ] `lead_intent`
- [ ] `collection_category`
- [ ] `product_name`
- [ ] `content_topic`
- [ ] `visit_purpose`
- [ ] `page_type`

(Skip any that already exist.)

### 2c. Data streams
Admin → Data collection → Data streams → the web stream → **Enhanced measurement** (gear icon):
- [ ] "Page views" ON, and under it **"Page changes based on browser history events" ON** (the site now changes pages without a full reload).

### 2d. Data retention
Admin → Data collection and modification → Data retention:
- [ ] Event data retention → **14 months** → Save.

### 2e. Search Console link
Admin → Product links → Search Console links → Link:
- [ ] Choose `sc-domain:sonikhimrajlaljijewellers.com` → the web stream → Submit.

### 2f. (Optional) Internal traffic
Admin → Data streams → web stream → Configure tag settings → Define internal traffic:
- [ ] Add the shop's Wi-Fi public IP (search "what is my IP" on a shop device) so staff visits don't count.

---

## 3. Google Business Profile link tracking
Already covered in `docs/google-business-profile-actions.md` (website URL with `utm_source=google&utm_medium=organic&utm_campaign=gbp`). In GA4 these visits show as source/medium `google / organic`, campaign `gbp`.

## 4. When done
- [ ] Screenshot the published GTM version and the GA4 key events list, and send them back.
