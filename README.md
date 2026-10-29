# Nyakayojo Secondary School website

Open `index.html` in a browser. No build step or server is needed. Internet is needed only for fonts and the Google Map.

```
index.html          header, search, footer, page shell
css/styles.css      base design (colours are variables at the top)
css/theme.css       brand layer: header, search bar, side menu (no dark mode)
js/config.js        school name, motto, phones, email, address, map
js/data.js          news, history, staff, dues, uniform prices, checklists, FAQs, policies, photo list
js/forms.js         designed printable forms: guidance record, clearing form, hostel, dues, uniform, joining, job, receipts
js/main.js          routing, dark mode, online forms
js/features.js      gallery filter and lightbox, search, form wizard, cookie notice
js/logo.js          crest embedded for printed forms
pages/              one file per page (14 pages)
assets/images/      logo and school photos
```

To add photos, copy them to `assets/images/` and list them in `DATA.photos` in `js/data.js`.
To receive online applications automatically, connect the forms to a service such as Formspree or your own backend.
Check the dues and uniform prices in `js/data.js` each year; they come from the 2025 admission letter.

## Admin panel
Open `#admin` (footer link "Staff admin"). Default passcode: `nyakayojo2026`. Change it at once under Publish and backup.
Add, edit and delete news, events and vacancies. Edits save in that browser. To show them to all visitors, click Download content.js and replace `js/content.js` on your host.
The passcode check runs in the browser, so it keeps casual visitors out but is not real security. A server login is needed for that.

## Application forms
`js/apply.js` holds one form definition used three ways: online wizard, blank printable A4 form, and a filled copy with attachments. Routes: `#apply`, `#applyonline`, `#applyscan` (upload a hand-filled form), `#jobapply`.
To receive applications by themselves, set `formEndpoint` in `js/config.js` to a form service URL or your own server (it receives JSON with photos and documents). Without it, applicants print or save the filled form as PDF and email it.
Check the bank account numbers in `js/config.js` (`banks`) before publishing.
