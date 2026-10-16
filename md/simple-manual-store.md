# Caretaker's Guide — Noel Grass Store

A plain-English guide for keeping the Noel Grass store running.

No coding knowledge assumed. No developer to call. Just you, this document, and a chat if you get stuck.

---

## 0. Read This First

This guide is not a manual. It's a **life raft.**

You did not build this system. Someone helped you put it together. It works. Your job now is not to understand every part — your job is to **keep it running** and **know what to do when something feels wrong.**

Here's what this guide assumes:

- You're on a **laptop** most of the time — but sometimes your **phone at night**
- You're worried about **everything** — losing files, losing access, breaking something
- You have **nobody specific** to call for help
- You want **short, clear answers** — not theory

Here's how to use this guide:

- **If nothing is wrong:** read sections 1 and 2 once. That's all you need to know day-to-day.
- **If something feels off:** jump to section 3. Follow the decision tree.
- **If something is broken right now:** jump to section 5, the emergency card. Do exactly what it says.
- **If you want to change something:** jump to section 6.

One last thing — **you are not alone.** At the end of every section, there's a line that says "if this doesn't work, paste this into the chat." That's your backup. Not a developer. Just a place to describe the problem and get help.

---

## 1. What You Own

The store is built from five pieces. Here's what each one is, in plain English.

### The Storefront

**What customers see.** Your store page, your discography, your biography, your galleries. All the pages on your website.

**Where it lives:** GitHub, at `noelgrass.github.io`

**What can go wrong:** Very little. GitHub is extremely reliable. If you break something, you can undo it (see section 6).

### Paystack

**The payment system.** It processes M-PESA and card payments. When someone pays, it takes the money and tells your store.

**Where it lives:** `dashboard.paystack.com`

**What can go wrong:** A payment fails on the customer's end, or you need to refund someone. Both are handled through the dashboard — no code.

### Cloudflare Worker

**The "brain."** When someone pays, this piece checks that the payment is real and sends them the download link.

**Where it lives:** Cloudflare dashboard, a thing called "Workers"

**What can go wrong:** Very rarely. It runs itself. You only touch it to add a new album.

### Cloudflare R2

**The storage.** Where your actual `.zip` album files live.

**Where it lives:** Cloudflare dashboard, a thing called "R2"

**What can go wrong:** Almost nothing — but this is the one piece you **cannot** let disappear (see section 4).

### Resend

**The email sender.** When someone buys, this piece emails them the download link.

**Where it lives:** `resend.com`

**What can go wrong:** Until you verify your own domain, it only sends to your own email. (See section 6 for how to fix that.)

---

## 2. The 4 Things You'll Actually Do

This is the important part. Everything else in this guide exists just in case.

**These four things are 90% of what you'll ever do.**

### 1. Add a new album

When you have a new release to sell.

**What to do:**
1. Upload the `.zip` to Cloudflare R2 → `my-digital-store` → `products` → correct folder
2. Add one line to the Worker's `PRODUCTS` list (see manual for the exact line)
3. Copy an existing album block in `store.html` and change the words
4. Save

**Time:** ~10 minutes.

**If something doesn't work:** see section 3, "a new album isn't showing."

### 2. Change a price

**What to do:**
1. Open `store.html` on GitHub
2. Find the album (Ctrl+F works)
3. Change the number after `data-amount` (it's in cents — see the manual)
4. Save

**Time:** ~2 minutes.

### 3. Refund a customer

**What to do:**
1. Go to `dashboard.paystack.com`
2. Search their email in Transactions
3. Click the payment → Refund

**Time:** ~1 minute.

### 4. Send a customer a new download link

**What to do:**
Tell them: *"Click your original download link. Even if it's expired, it will offer to send you a new one. Enter the email you used to buy."*

They handle it themselves. You don't have to do anything.

**Time:** ~30 seconds to reply.

---

## 3. Something Feels Wrong — Decision Tree

### A customer says no email arrived

Do this in order. Stop when it works.

1. **Ask them to check their spam folder.** Search for "Your download."
2. **Check the email.** Go to Paystack → Transactions → find their payment. Is the email on the transaction the same one they're checking?
3. **If they paid with a different email** — tell them to check that inbox.
4. **Ask them to click the original download link again.** Even if expired, it offers to send a new one.

**If none of that works, paste this into the chat:**
> "A customer says they didn't get their email. Here's their Paystack transaction: [paste the reference number]. What do I do?"

### The download link doesn't work

1. **Ask them to click it again.** Expired links show a page that offers to send a new one.
2. **If it says "invalid"** — the link was probably cut off when copied. Tell them to click it directly from the email, not copy-paste it.

**If still broken, paste this into the chat:**
> "A customer says their download link doesn't work. Here's the message: [paste what they saw]."

### A new album isn't showing on the store

1. **Wait 60 seconds** — GitHub Pages takes a minute to update.
2. **Hard-refresh your browser.** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).
3. **Check the file name.** The Worker's `r2Key` and the actual file in R2 must match **exactly** — same letters, same hyphens, same case.
4. **Check the product ID.** The `data-id` in the store must match the key in the Worker's `PRODUCTS` list.

**If still not showing, paste this into the chat:**
> "I added a new album but it's not showing. Here's the line I added to the Worker: [paste]. Here's the block I added to store.html: [paste]."

### The payment popup won't open

1. **Try a different browser.** Sometimes a browser glitch causes this.
2. **Clear your browser cache** (or open in a private window).
3. **Check your internet.** If the Paystack script didn't load, nothing will work.

**If it still won't open, paste this into the chat:**
> "The Paystack popup won't open when I click Buy. What should I check?"

### A customer says they paid but nothing happened

1. **Open Paystack** → Transactions → search their email.
2. **Is there a payment?**
   - **Yes:** wait 1 minute, check the Worker logs (see the manual), and see if the email arrived.
   - **No:** they didn't actually pay. Tell them to try again.

**If there's a payment but no email, paste this into the chat:**
> "A customer paid — here's their Paystack reference: [paste]. But no email was sent. What's wrong?"

### Everything is down

1. **Don't panic.** Nothing has disappeared.
2. **Check your internet** — sometimes it's just you.
3. **Try a different device** — if the phone works, it's your laptop.
4. **Wait 5 minutes and try again.** Sometimes things come back on their own.

**If it's still down after 5 minutes, paste this into the chat:**
> "My store seems to be completely down. [Describe what you see.] What should I check first?"

---

## 4. Never Touch This

These are the things you must never touch. Not because they're fragile — because they're **working** and touching them is how you break them.

**Never:**

- **Delete the R2 bucket.** This permanently deletes every album file. There is no recycle bin.
- **Delete the Worker.** If you do, you can rebuild it — but only if you have the code backed up.
- **Change the `DOWNLOAD_SIGNING_SECRET`** unless you really mean to. It invalidates every existing download link.
- **Turn off signature verification** in the Worker. Ever. Not "just for a minute to test." Never.
- **Delete a Paystack transaction.** You can't. But don't try.
- **Share screenshots** of Cloudflare or Paystack settings without hiding the keys.

**If you're tempted to do any of these, stop and paste this into the chat first:**
> "I want to do [the thing]. Is it safe?"

---

## 5. Emergency Card

**Print this. Or save it as a phone note. Or screenshot it.**

If something is broken **right now**, do these three things in order:

### 1. Breathe. Then check these URLs.

- **Paystack:** `dashboard.paystack.com` — do you see recent payments?
- **Cloudflare Worker:** `dash.cloudflare.com` → Workers & Pages → `my-store-backend` → Logs — is it logging anything?
- **Resend:** `resend.com` → Emails — did your emails send?

If everything looks normal in those three places, **the system is probably fine** — the problem might just be on the customer's end.

### 2. Save a screenshot of anything that looks wrong.

Screenshots are the fastest way to get help.

### 3. Paste this into the chat:

> "Something is broken. Here's what I see: [describe]. Here's a screenshot: [paste]. What do I do?"

That's it. That's the whole emergency card.

---

## 6. "I Want to Change X" — Quick Reference

### "I want to update my bio"

Open `biography.html` in GitHub. Edit the text. Save.

### "I want to add a new page"

Copy an existing page (like `biography.html`). Rename it. Change the content. Add a link in the menu.

If that sounds hard, paste this into the chat:
> "I want to add a new page called [name]. Can you give me the exact code?"

### "I want to change the design"

**Don't.** Not without help. The design is the store. Changing it risks breaking every page.

If you really want to change something visual, paste this into the chat:
> "I want to change [specific thing] about the design. Can you give me the exact code?"

### "I want to verify my domain in Resend"

This is the biggest thing standing between you and selling to real customers. Steps:

1. Buy a domain (Cloudflare Registrar is cheapest)
2. Go to `resend.com` → Domains → Add Domain
3. Add the DNS records they show you
4. Wait, then click Verify
5. Update the Worker's `from:` line to use your new domain
6. Redeploy

If this feels hard, paste this into the chat:
> "I want to verify a domain in Resend. Walk me through it."

### "I want to back up my files"

**Worker code:**
1. Cloudflare → Worker → Edit code
2. Ctrl+A, Ctrl+C
3. Paste into a text file → save as `worker.js`
4. Upload to GitHub in a folder called `store-code/`

**R2 files:**
1. Cloudflare → R2 → `my-digital-store`
2. Tick the top checkbox → Download
3. Save the `.zip` somewhere safe (Google Drive, external drive)

Do this **once a month.** Set a phone reminder.

### "I want to switch to Paystack Live Mode"

This means real money. Do it carefully:

1. Complete Paystack's business activation
2. Get your Live keys
3. Update `store.html` with the Live public key
4. Update the Worker's `PAYSTACK_SECRET_KEY` with the Live secret
5. Set the Live webhook URL in Paystack
6. Test with a small real payment, then refund it

**If you're about to do this, paste this into the chat first:**
> "I want to switch to Paystack Live Mode. Walk me through it carefully."

---

## A Final Word

You own a store. It works. It sells music. It sends downloads.

You didn't build it alone — but you **made the decisions** that built it. You chose the platforms. You paid for the accounts. You tested the flow. You found the errors and asked for help until they were fixed.

That's real work. That's why the store exists.

This guide isn't here to teach you to code. It's here to remind you that:

- **Nothing you built is fragile.** It's meant to run.
- **Nothing is unrecoverable** if you have backups. And you can make backups in 5 minutes.
- **You have backup.** The chat. Not a developer. Not a paid service. Just someone to describe the problem to.

You can do this.

Keep the emergency card close. Back up the Worker code. Take a breath.

— End of guide.
