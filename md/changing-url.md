Here it is. Plain English. No jargon. Written for someone who didn't build the system and just needs to follow the steps.

Paste this in place of the domain section I sent before. In CARETAKER-GUIDE.md, find the section that starts with ## 7. When You Get Your Domain and replace the whole thing with this.

```markdown
---

## 7. When You Get Your Domain

Right now, your store lives at `noelgrass.github.io/store` — a long web address that GitHub gave you for free.

A domain is a **shorter, fancier web address that you own** — like `noelgrass.com`. It looks more professional. Customers remember it. And you control it forever.

This section walks you through moving your store from the GitHub address to your own domain.

**Read this first — before doing anything:**

- **Do this on a laptop, not your phone.** The screens are wider, and you'll be switching between tabs.
- **Do it slowly.** One step at a time. Test after each step. Don't rush.
- **Set aside 1–2 hours.** Some of it is waiting for the internet to update.
- **If you get stuck at any point, stop and paste what happened into the chat.** Don't guess.

---

### What will change

- Your web address (from `noelgrass.github.io/store` to `noelgrass.com/store`)
- The email address your customers see when they get a download email (from `onboarding@resend.dev` to `store@noelgrass.com`)
- A few small things inside your website files

### What will NOT change

- Your music files — completely untouched
- How payments work — completely untouched
- The download links your customers receive — they still point to the same place
- Your design — looks exactly the same

---

### Step 1 — Buy the domain

**What you're doing:** Registering a web address that you own.

**Where to buy:** Go to **cloudflare.com/products/registrar** — this is the cheapest and simplest place. You already have a Cloudflare account, so it uses the same login.

**What to buy:**
- Search for the domain you want (like `noelgrass.com`)
- If it's available, buy it
- Cost: roughly $10 per year

**What to say no to:** When you're checking out, they'll try to sell you extras like SSL certificates, extra email, or hosting. **Say no to all of them.** You don't need any of them. You're already using free equivalents.

**Write this down somewhere safe:**
- Your new domain name
- Where you bought it (Cloudflare Registrar)

**How to know it worked:** You'll get a confirmation email, and the domain will appear in your Cloudflare account under **Domain Registration**.

---

### Step 2 — Point the domain at your store

**What you're doing:** Telling the internet "when someone types `noelgrass.com`, show them my GitHub site."

Right now, your domain doesn't know where your store lives. You're going to introduce them.

**Part A — Tell GitHub about your new domain:**

1. Open GitHub and go to your repo (`noelgrass.github.io`)
2. Click **Settings** at the top
3. In the left sidebar, click **Pages**
4. Under "Custom domain," type your new domain (like `noelgrass.com`) — no `www`, no `https://`
5. Click **Save**

**Part B — Tell your domain about GitHub:**

GitHub will now show you a message that says something like *"Add a CNAME record pointing to `noelgrass.github.io`."*

That's technical talk for: *"Go to your domain settings and add a forwarding instruction."*

Here's what to actually do:

1. Open a new tab and go to **Cloudflare** → your new domain → **DNS** (in the left sidebar)
2. You'll see a table of "records"
3. Click **Add record** to add a new one
4. Fill in:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `noelgrass.github.io`
   - Leave the other fields alone
5. Click **Save**

Now GitHub might also ask you to add **four more records** — called "A records." They look like IP addresses (like `185.199.108.153`). Add each one the same way:
- **Type:** A
- **Name:** `@` (or leave blank — Cloudflare will interpret it)
- **Target:** the IP address GitHub showed you

Add all four.

**Now wait.**

DNS — the system that connects domain names to websites — takes time to update. Usually 5–60 minutes. Sometimes longer.

**How to check if it's ready:**
- Open a new tab
- Type your new domain (like `noelgrass.com`)
- If your store loads → it's ready
- If it shows an error → wait 15 more minutes and try again

**Don't panic if it doesn't work immediately.** That's normal. DNS is slow.

**If it's been an hour and still nothing:** Paste this into the chat:
> "I added my domain to GitHub Pages and added the DNS records, but the domain isn't loading. Here's a screenshot of my Cloudflare DNS records. What's wrong?"

---

### Step 3 — Turn on secure HTTPS

**What you're doing:** Making your site show the little padlock in the browser.

Without this, browsers will say "not secure" next to your domain. With this, they'll show a padlock. Customers trust padlocks.

**How:**

1. Go back to GitHub → your repo → **Settings** → **Pages**
2. Look for the checkbox labeled **"Enforce HTTPS"**
3. Tick it
4. **If the checkbox is greyed out:** GitHub is still setting up the certificate. Wait 15 minutes, refresh the page, and try again.

**How to know it worked:** Visit your domain. There should be a padlock next to the web address.

**If it's been an hour and the checkbox is still greyed out:** Paste this into the chat:
> "The Enforce HTTPS checkbox on GitHub Pages is greyed out. What should I do?"

---

### Step 4 — Update the hidden labels inside your website

**Why this step matters — read carefully.**

Your website has hidden labels inside each page. These labels tell other websites how to talk about you.

For example:
- When someone shares your store on WhatsApp, WhatsApp looks for a label that says *"here's the preview image for this link."*
- When Google shows your store in search results, it looks for a label that says *"here's the proper title and description."*
- When Twitter shows a link, same thing.

**Right now, all these labels say `noelgrass.github.io`.** If you don't update them, they'll all still point to the old address — and your shared links will look broken.

**How to find and fix them:**

The easy way:

1. Open your GitHub repo
2. Press the letter `t` on your keyboard
3. A search box appears — type `noelgrass.github.io`
4. GitHub will list every file that mentions your old address

**For each file it shows:**

1. Click the file
2. Click the pencil icon (edit)
3. Press Ctrl+F (or Cmd+F) and search for `noelgrass.github.io`
4. Wherever it appears, change it to your new domain (`noelgrass.com`)
5. Scroll down → Commit changes

**Which files matter most:**

- **`store.html`** — you'll find 4–5 spots with the old URL
- **`index.html`** — same, maybe more
- Every other page — same pattern

**Important — don't change everything blindly.**

Some mentions of `noelgrass.github.io` should stay. For example:
- Links to GitHub itself (`github.com/noelgrass`) — leave those
- Any links to files that are only hosted on GitHub — leave those

**If you're not sure whether to change something, stop and paste it into the chat:**
> "I'm updating URLs from noelgrass.github.io to noelgrass.com. Should I change this line: [paste the line]?"

**After all files are updated:**
Wait 60 seconds, then visit your new domain. Your pages should look the same.

---

### Step 5 — Update Paystack

**What you're doing:** Telling Paystack where to send customers after they pay.

Right now, after a customer pays, Paystack sends their browser back to your old GitHub address. Now it should send them to your new domain.

**This step has two parts.** Paystack has a "Test Mode" and a "Live Mode" — they're separate, and you need to update both. Don't skip either one.

**Part A — Test Mode:**

1. Log in to Paystack
2. At the top of the page, make sure the toggle says **Test**
3. Left menu → **Settings** → **API Keys & Webhooks**
4. Find the field labeled **Test Callback URL**
5. It currently says `https://noelgrass.github.io/store`
6. Change it to `https://noelgrass.com/store` (with your actual domain)
7. Click **Save changes**

**Part B — Live Mode:**

1. Now toggle to **Live** at the top of the page
2. Same page → **Live Callback URL**
3. Change it the same way
4. Click **Save changes**

**Important — what NOT to change:**

There's also a field called **Webhook URL**. **Leave it alone.** It points to your Cloudflare Worker, which hasn't changed. Only the "Callback URL" changes.

**If you're not sure which field to change:** Screenshot the page and paste it into the chat:
> "I'm updating Paystack for my new domain. Which field should I change?"

---

### Step 6 — Set up your new email address in Resend

**This is the most important step in this whole guide.** Read it twice.

**Why this matters:**

Right now, when your store sends a download email, it comes from `onboarding@resend.dev` — a generic address that Resend provides. But Resend has a strict rule: **that address can only send emails to you.** Not to customers. Only to your own email.

Which means: **until you complete this step, no real customer will ever receive their download email.** The store will take their money and deliver nothing.

You need to verify your domain in Resend so it can send emails from `store@noelgrass.com` to anyone.

**How to do it:**

**Part A — Add your domain to Resend:**

1. Log in to **resend.com**
2. In the left menu, click **Domains**
3. Click **Add Domain**
4. Type your domain name — just `noelgrass.com`, no `www`, no `https://`
5. Click **Add**

**Part B — Copy the DNS records Resend shows you:**

Resend will now display 3–4 chunks of text. They look like technical strings of letters and numbers. These are the "DNS records."

**Take a screenshot of this page.** You'll need these exact values in the next step.

**Part C — Add them at your domain registrar:**

1. Go back to Cloudflare (where your domain lives)
2. Click your domain
3. Click **DNS** in the left sidebar
4. For each record Resend showed you, click **Add record** and fill it in
5. **Copy-paste the values.** Don't retype them — one wrong character and it won't work.

Typically you'll add:
- 1 TXT record (long, looks like a paragraph)
- 2 CNAME records (shorter)
- Sometimes 1 MX record

If Resend gives you 4 records, add all 4. If it gives you 3, add all 3.

**Part D — Wait and verify:**

1. After adding all records, **wait 15 minutes**
2. Go back to Resend → **Domains**
3. Click **Verify** next to your domain
4. If it works: you'll see a **green tick** ✅
5. If it doesn't work: wait another 15 minutes and try again

**If verification fails after an hour:**

The most common cause is a typo in one of the DNS records. Delete them all from Cloudflare and re-add them. This time, copy-paste carefully.

**If it still fails:** Paste this into the chat:
> "I'm verifying my domain in Resend but it keeps failing. Here's a screenshot of what Resend shows, and here's a screenshot of my Cloudflare DNS records. What's wrong?"

**What this unlocks:** After this step, your store can send emails to anyone. Real customers. From your own address. This is the single most important thing standing between you and selling to real people.

---

### Step 7 — Change the "from" address in your store's brain

**What you're doing:** Telling your store to send emails from your new address.

Right now, when a customer buys, the email comes from `onboarding@resend.dev`. After this step, it comes from `store@noelgrass.com`.

**How:**

1. Open **Cloudflare** → **Workers & Pages** → **my-store-backend**
2. Click **Edit code**
3. Press Ctrl+F (or Cmd+F) to open the search box
4. Type or paste: `onboarding@resend.dev`
5. You'll find it inside a line that looks like this:
```

from: "Noel Grass ",

```
6. Change it to:
```

from: "Noel Grass ",

```
   Replace `yourdomain.com` with your actual domain.
7. Click **Deploy** (top right of the page)
8. Wait 20 seconds

**How to test it works:**

1. Go to your store
2. Buy any album with the test card
3. Check your email
4. The email should now come from `store@yourdomain.com` — not from `onboarding@resend.dev`

**If the email still comes from the old address:**

The deploy might not have finished. Wait 2 more minutes and try again.

**If it's still wrong after that:** Paste this into the chat:
> "I changed the from: line in my Worker to use my new domain, but emails still come from onboarding@resend.dev. Here's what the line looks like now: [paste the line]."

---

### Step 8 — Update everywhere else you've shared your store

**What you're doing:** Changing your store's web address everywhere it's mentioned on the internet.

This step isn't technical. It's just tedious. But it matters — otherwise people will click old links and get confused.

**Where to check:**

- **Instagram bio** — update the link
- **YouTube channel description** — update the link
- **Facebook page** — update the link
- **Spotify artist profile** — update the link
- **Bandcamp** — update the link
- **SoundCloud** — update the link
- **Apple Music** — update the link
- **IMDb** — update the link
- **Wikidata** — update the link
- **LinkedIn** — update the link
- **Google Business Profile** — update the link
- **Music In Africa directory** — update the link
- **Filamu directory** — update the link
- **Your email signature** — update the link
- **Anywhere else you've shared the store**

**How to find them:**

- Open your email app and search for `noelgrass.github.io` — every message you've sent with the old link will come up
- Open each social profile and check the bio section
- Open each directory listing and check the URL

**Tip:** Keep the old GitHub link working. Don't delete the GitHub Pages site. If someone finds the old link, it'll still work and just serve the same store. No harm done.

---

### Step 9 — Test that everything works

**Don't skip this step.** You need to confirm nothing broke before telling anyone about your new domain.

**Test 1 — The store loads:**

1. Open a new tab
2. Type your new domain + `/store` — like `noelgrass.com/store`
3. The page should load, and the design should look correct
4. Click around — previews work, buttons visible

**Test 2 — Payment works:**

1. Click **Buy** on any album
2. Enter your email — use the email you signed up to Resend with
3. Confirm the Paystack popup opens with the right album and price
4. Pay with the test card:
   - Card: `4084 0840 8408 4081`
   - Expiry: any future date
   - CVV: `408`
   - PIN: `0000`
   - OTP: `123456`

**Test 3 — The email arrives:**

1. Check your inbox
2. Confirm the email comes from `store@yourdomain.com` — not the old `onboarding@resend.dev`
3. Click the download link
4. Confirm the file downloads correctly

**Test 4 — The redirect works:**

1. After paying, look at where the browser goes
2. It should be back on your new domain, not the old GitHub one

**If anything fails:**

Don't panic. The system has backups. Paste this into the chat:
> "I moved to my new domain. Here's what's not working: [describe]. Here's a screenshot. What do I do?"

---

### Step 10 — Update this guide

**Why:** You'll read this document in the future. If it still says `noelgrass.github.io`, it will confuse you.

**How:**

1. Open your repo on GitHub
2. Open `CARETAKER-GUIDE.md`
3. Click the pencil icon (edit)
4. Press Ctrl+F to search for `noelgrass.github.io`
5. Change each mention to your new domain
6. Also search for `onboarding@resend.dev` — change to `store@yourdomain.com`
7. Commit the change

**Same for `STORE-MANUAL.md`** if you have it — same edits.

---

## The Complete Checklist

Print this. Or save it to your phone. Tick as you go.

**Buying the domain:**
- [ ] Domain bought from Cloudflare Registrar
- [ ] Cost paid, confirmation received

**Connecting the domain:**
- [ ] GitHub Pages custom domain set
- [ ] DNS CNAME record added at Cloudflare
- [ ] DNS A records added (all 4 of them)
- [ ] Domain loads in browser
- [ ] Enforce HTTPS checkbox ticked on GitHub
- [ ] Padlock shows in browser

**Updating files:**
- [ ] `store.html` — all old URLs replaced
- [ ] `index.html` — all old URLs replaced
- [ ] All other pages — same
- [ ] Committed to GitHub

**Paystack:**
- [ ] Test Callback URL updated
- [ ] Live Callback URL updated
- [ ] Webhook URL left alone (should still point to the Worker)

**Resend:**
- [ ] Domain added in Resend
- [ ] DNS records copied from Resend
- [ ] DNS records added at Cloudflare
- [ ] Domain verified (green tick)

**Worker:**
- [ ] `from:` line updated to use new domain
- [ ] Deployed
- [ ] Test email sent and received

**External platforms:**
- [ ] Instagram bio
- [ ] YouTube description
- [ ] Facebook page
- [ ] Spotify profile
- [ ] Bandcamp
- [ ] SoundCloud
- [ ] Apple Music
- [ ] IMDb
- [ ] Wikidata
- [ ] LinkedIn
- [ ] Google Business Profile
- [ ] Music In Africa
- [ ] Filamu
- [ ] Email signature
- [ ] Anything else you can find

**Testing:**
- [ ] Store loads on new domain
- [ ] Buy button opens Paystack popup
- [ ] Test payment succeeds
- [ ] Email arrives from new domain
- [ ] Download link works
- [ ] After-payment redirect works

**Documentation:**
- [ ] `CARETAKER-GUIDE.md` updated
- [ ] `STORE-MANUAL.md` updated

---

## The most common mistakes

**1. Only updating the callback URL in Paystack's Test Mode**
→ Live Mode keeps the old setting. Update **both**.

**2. Forgetting the hidden labels inside `store.html` and `index.html`**
→ Your shared links look broken.
→ Google shows the wrong URL in search results.

**3. Not verifying the Resend domain properly**
→ Your emails silently fail for real customers.
→ Customers pay and get nothing.

**4. Being impatient with DNS**
→ Trying to test the domain before the internet has updated.
→ Wait 15–60 minutes. It can't be rushed.

**5. Forgetting external listings**
→ Old links everywhere. People click them and get confused.

**6. Panicking when something doesn't work**
→ Every step has a fix.
→ Nothing here is permanent until you decide it is.

---

## One final note

**You can always undo this.**

If something breaks and you can't fix it, you can revert every step:
- Remove the custom domain from GitHub Pages
- Delete the DNS records
- Revert the Paystack callback URL
- Revert the Worker's `from:` line

Everything goes back to how it was. The old GitHub URL keeps working the whole time.

**Don't rush. Do one step. Test. Move on. There's no deadline.**

When you're ready, you'll have a store with your own name on it. That's worth doing properly.
```

---

Where to paste this

Open CARETAKER-GUIDE.md on GitHub → pencil (edit) icon → find ## 7. When You Get Your Domain → select everything from that heading down to the last line before ## A Final Word → delete → paste this new version → commit.

Reply with "done" once you've pasted it, or ask if you got stuck.