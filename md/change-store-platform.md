Good. This is the biggest one — the "leave Paystack" scenario. Let me be straight with you before writing it, because this guide is different from the others.

---

One honest thing first

You probably shouldn't do this. Not yet.

Paystack is working. You've tested it. It handles M-PESA. Swapping providers is 2–4 hours of careful work, and there's a real risk of breaking the store if something goes wrong mid-swap.

But. You might have a reason. Maybe Flutterwave's fees are lower. Maybe Paystack's business activation is blocking you. Maybe you just want options.

So — I'll write the guide. But it will be honest: it tells you when it's worth doing, and when it's not.

Same format as the others: plain English, operator-level, step by step.

---

Paste this into CARETAKER-GUIDE.md, right after the "Backing Up" section (2.6).

```markdown
---

## 2.7 Changing Your Payment Provider — The Big Swap

This is the biggest change in the whole caretaker's guide. **Read the whole thing before you touch anything.**

This is what you'd do if you ever decide to stop using Paystack and switch to a different company — like Flutterwave, Stripe, or another payment provider.

**Be warned:** this is a real project. It's not a click-a-button change. It's about 2–4 hours of careful work. And if you get something wrong in the middle, customers can pay and get nothing.

**The good news:** if you follow this guide carefully, nothing permanent breaks. You can always undo it.

---

### First — should you actually do this?

Before starting, ask yourself **why** you want to change.

**Good reasons to switch:**
- Paystack's business activation has been rejected multiple times and you need an alternative
- Paystack charges higher fees than a competitor
- Paystack doesn't support your country or currency
- You've had real problems with Paystack (failed payments, bad customer service)

**Bad reasons to switch:**
- "Just to try something new"
- "I read that Flutterwave is better"
- "I want to see if it's easy" (it's not)
- Boredom

**My honest advice:** if Paystack is working and there's no specific problem, **don't switch.** The downside risk is bigger than the upside.

**If you still want to switch, keep reading.**

---

### What changes and what doesn't

The good news: **most of your store stays exactly the same.** Only two things change.

**What changes:**

| Thing | Before | After |
|---|---|---|
| The Buy button's script | Loads Paystack's library | Loads the new provider's library |
| The checkout code | Uses Paystack's popup | Uses the new provider's popup |
| The Worker's webhook check | Verifies Paystack's signature | Verifies the new provider's signature |

**What stays the same:**

| Thing | Notes |
|---|---|
| Your design — every page | Completely untouched |
| Your album files in R2 | Untouched |
| Your Resend emails | Untouched |
| The Worker's overall logic | The flow is the same — just different names |
| The customer's experience | Nearly identical |
| The download link system | Untouched |

**In short:** you're swapping the "who collects the money" part. Everything else stays the same.

---

### Before you start

**You need:**

- Access to Cloudflare (your Worker)
- Access to GitHub (your store page)
- A Paystack account that's working (so the store still works during the transition)
- A new account with the provider you're switching to — **fully set up**
- A laptop
- A pen and paper
- **At least 2 hours of uninterrupted time**

**Do not do this in small pieces.** Do it in one sitting.

**Do not do this while customers are buying.** Pick a quiet time — like late at night or a Sunday morning.

**Do not do this without a backup.** Take a backup of your Worker code and `store.html` **first**. See the previous section.

---

### The four big steps

Here's the whole process in outline. Each one is detailed below.

1. **Set up the new provider** — get it working, get API keys
2. **Update the store page** — swap the checkout script
3. **Update the Worker** — swap the signature verification
4. **Set the webhook URL** — tell the new provider where to send notifications

**Each step has a test.** Don't move to the next until the current one works.

---

### Step 1 — Set up the new provider

**What you're doing:** Making sure the new payment provider is fully ready to take payments.

**Why first:** If the new provider isn't fully working, the whole swap fails. Better to find problems here than midway.

**Which provider?**

The most likely alternative for a Kenya-based music store is **Flutterwave**. Others:
- **Stripe** — powerful, but M-PESA support in Kenya is limited
- **DPO** — works in East Africa
- **PayPal** — for international, not great for M-PESA
- **Cash App** — only works in some countries

**In this guide, I'll use Flutterwave as the example.** The pattern is the same for any provider, just with different names.

**What to do:**

1. Go to `flutterwave.com`
2. Sign up for a new account
3. Complete their business activation process
   - This can take 1–3 days
   - Have your ID, business info, and bank account ready
4. Once approved, find your **API keys**:
   - Usually two keys — a **public key** and a **secret key**
   - Sometimes a third — a **webhook secret** (a static string like "MyWebhookHash")
5. Write these down somewhere safe

**Public key:** starts with `FLWPUBK_TEST-` (test) or `FLWPUBK-` (live)
**Secret key:** starts with `FLWSECK_TEST-` (test) or `FLWSECK-` (live)
**Webhook secret:** whatever you set — make it a long random string

**Test your new account works:**

Before doing anything else, complete a small test payment through Flutterwave's own dashboard. Just to confirm the account is fully working.

**If something is broken at this stage:** Fix it before continuing. Don't proceed until the new provider is fully operational.

---

### Step 2 — Update the store page

**What you're doing:** Changing the store page so it uses the new provider's checkout popup instead of Paystack's.

**Why:** Right now, when someone clicks Buy, they open a Paystack popup. After this step, they open a Flutterwave popup.

**In GitHub:**

1. Open your repo → click `store.html` → click the pencil (edit) icon
2. Find this line near the top:
```

   <script src="https://js.paystack.co/v1/inline.js"></script>

```
3. **Don't delete it yet.** Add a comment by putting `<!--` before it and `-->` after it, so it looks like:
```

   <!-- <script src="https://js.paystack.co/v1/inline.js"></script> -->

```
   This "disables" the line temporarily. If something goes wrong, you can easily re-enable it.
4. Right below that line, add Flutterwave's script:
```

   <script src="https://checkout.flutterwave.com/v3.js"></script>

```

**Now — update the checkout code.**

Scroll down in `store.html` and find the block that starts with:
```

var handler = PaystackPop.setup({

```

You need to replace **the whole block** from `var handler = PaystackPop.setup({` down to `handler.openIframe();` with Flutterwave's version.

Here's what Paystack's looks like:
```javascript
var handler = PaystackPop.setup({
  key: PAYSTACK_PUBLIC_KEY,
  email: email,
  amount: amount,
  currency: currency,
  metadata: {
    product_id: productId,
    custom_fields: [...]
  },
  callback: function (response) { showSuccess(email); },
  onClose: function () {}
});
handler.openIframe();
```

Here's what Flutterwave's looks like:

```javascript
FlutterwaveCheckout({
  public_key: FLUTTERWAVE_PUBLIC_KEY,
  tx_ref: "txref-" + Date.now(),
  amount: amount / 100,          // Flutterwave uses main units, not cents
  currency: currency,
  customer: { email: email },
  meta: { product_id: productId },
  customizations: {
    title: "Noel Grass",
    description: title
  },
  callback: function (response) {
    showSuccess(email);
  },
  onclose: function () {}
});
```

Important differences to note:

Paystack Flutterwave
key public_key
amount in cents amount in main units (so divide by 100)
metadata meta
Auto-generates reference You supply tx_ref yourself
PaystackPop.setup({...}) FlutterwaveCheckout({...})
.openIframe() to open Opens automatically

You also need to change the config line near the top:

Find:

```
var PAYSTACK_PUBLIC_KEY = "pk_test_...";
```

Replace with:

```
var FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK_TEST-...";
```

Use the test key for now, not the live one.

Save the file. Commit the change to GitHub.

Test the checkout:

1. Wait 60 seconds for GitHub Pages to update
2. Visit store.html in a browser
3. Open the browser's developer console (F12) — this shows JavaScript errors
4. Click Buy on any album
5. Enter your email
6. The Flutterwave popup should open

If the popup opens and shows your album name and price: Step 2 works. Move to step 3.

If it doesn't work:

· Check the console for error messages
· Most common issue: wrong public key format
· Paste this into the chat:
  "I'm switching from Paystack to Flutterwave. The checkout popup won't open. Here's the console error: [paste]. Here's my store.html code around the checkout: [paste]."

Don't move to step 3 until step 2 works. If the popup doesn't open, nothing else matters.

---

Step 3 — Update the Worker

What you're doing: Changing the Worker so it verifies Flutterwave's payment notifications instead of Paystack's.

Why: This is where the money gets verified. Get this wrong and fake payments could come through, or real payments could be ignored.

How to find the relevant code:

In Cloudflare → Worker → Edit code → press Ctrl+F → search for verifyPaystackSignature.

You'll find a function at the bottom of the file that looks like this:

```javascript
async function verifyPaystackSignature(body, signature, secret) {
  // uses HMAC-SHA512
}
```

Replace that whole function with a new one for Flutterwave. But first, understand the difference:

Paystack Flutterwave
Uses HMAC-SHA512 cryptography Uses a simple static "hash"
The signature is computed from the payload You set a string and check it matches
Header: x-paystack-signature Header: verif-hash

This means Flutterwave's is actually simpler.

You don't need HMAC. You just need to check that the header verif-hash matches a secret string you set in your Flutterwave dashboard.

What to change in the Worker:

1. Environment variable. In Cloudflare Worker → Settings → Variables, add a new one:
   · Name: FLUTTERWAVE_WEBHOOK_SECRET
   · Value: a long random string (like a8f9b2c1d4e5...)
2. The webhook handler. Replace the Paystack verification with Flutterwave's:

Delete this:

```javascript
const isValid = await verifyPaystackSignature(
  rawBody, signature, env.PAYSTACK_SECRET_KEY
);
if (!signature || !isValid) {
  return new Response("Unauthorized signature", { status: 401 });
}
```

Replace with:

```javascript
const signature = request.headers.get("verif-hash");
if (!signature || signature !== env.FLUTTERWAVE_WEBHOOK_SECRET) {
  return new Response("Unauthorized", { status: 401 });
}
```

3. The payload parsing. Flutterwave sends a different shape of JSON. The key differences:

Paystack Flutterwave
payload.event === "charge.success" payload.status === "successful" and payload.event === "charge.completed"
payload.data.customer.email payload.data.customer.email
payload.data.reference payload.data.tx_ref
payload.data.metadata.product_id payload.data.meta.product_id

So the code changes too:

Delete this:

```javascript
if (payload.event !== "charge.success") { ... }
const customerEmail = payload.data.customer.email;
const reference = payload.data.reference;
const productId = (payload.data.metadata && payload.data.metadata.product_id) || null;
```

Replace with:

```javascript
if (payload.event !== "charge.completed" || payload.data.status !== "successful") { ... }
const customerEmail = payload.data.customer.email;
const reference = payload.data.tx_ref;
const productId = (payload.data.meta && payload.data.meta.product_id) || null;
```

4. The from: sender line. Leave it alone — that's Resend, not Paystack.
5. The buildDownloadLink function. It uses the reference. Since Flutterwave's reference is tx_ref, the code still works — it just receives a different value.

Save and Deploy.

Test: Use the Test Webhook feature in Flutterwave's dashboard to send a fake webhook. The Worker's logs should show "Webhook received. Product: ..." — same as with Paystack.

If the Worker logs an error:

· Check the environment variable is set correctly
· Check the header name is exactly verif-hash (case-sensitive? check Flutterwave's docs)
· Paste this into the chat:
  "I'm switching to Flutterwave. My Worker isn't receiving webhooks correctly. Here's the log: [paste]."

---

Step 4 — Set the webhook URL in Flutterwave

What you're doing: Telling Flutterwave to send payment notifications to your Worker.

Why: Without this, Flutterwave doesn't know where to send the payment confirmation. Your Worker never learns about payments, and no emails get sent.

How:

1. Log in to your Flutterwave dashboard
2. Go to Settings → Webhooks
3. Set the URL to:
   ```
   https://my-store-backend.noelgrass.workers.dev/
   ```
4. Set the secret hash to the same random string you used in step 3 (the FLUTTERWAVE_WEBHOOK_SECRET)
5. Save

Also:

1. Go to Settings → API Keys
2. Find the Callback URL setting
3. Set it to https://noelgrass.github.io/store (or your domain once you have one)
4. Save

Test with a real test payment:

1. Go to your store
2. Click Buy
3. Enter your email
4. Flutterwave popup should open
5. Use Flutterwave's test card:
   · Card: 5531 8866 5214 2950
   · Expiry: 09/32 (or any future date)
   · CVV: 564
   · PIN: 3310
   · OTP: 12345
6. Complete the payment
7. Check:
   · Did the Flutterwave popup confirm success?
   · Did the store's success modal appear?
   · Did your email arrive within 30 seconds?
   · Does the download link work?

If everything works: You've successfully switched providers. Congratulations.

If something doesn't work: See "If something goes wrong" below.

---

If something goes wrong

Problem: The Flutterwave popup won't open

· Check the browser's developer console (F12) for errors
· Most common cause: wrong public key format
· Check that the FLUTTERWAVE_PUBLIC_KEY line matches the format Flutterwave expects

Problem: Popup opens but shows wrong price

· Flutterwave uses main units, not cents. So KES 500 is 500, not 50000.
· Check your amount calculation. It should be amount / 100.

Problem: Customer pays, but no email arrives

· This is the webhook failing
· Check the Worker logs — did a webhook arrive?
· If no: Flutterwave's webhook URL is wrong, or the verif-hash doesn't match
· If yes but no email: the payload parsing is wrong

Problem: Worker logs show "Unauthorized"

· The verif-hash header doesn't match your FLUTTERWAVE_WEBHOOK_SECRET
· Double-check both values in the two dashboards

Problem: Nothing works and you want to undo

Good news: you can always undo. This is why step 2 has you comment out the old script instead of deleting it. To revert:

1. In store.html, remove the comment markers around <script src="https://js.paystack.co/v1/inline.js"></script>
2. Comment out or delete the Flutterwave script
3. Restore the old PaystackPop.setup({...}) block
4. Revert the Worker code to the previous version (GitHub keeps the old version in your store-code/worker.js history)
5. Change the Paystack webhook URL back if it's still set

Reverting takes 15 minutes if you've been keeping backups.

---

The complete checklist

Before starting:

☐ Backed up the Worker code
☐ Backed up store.html
☐ New provider account fully set up
☐ New provider API keys in hand
☐ 2+ hours of uninterrupted time

Step 1: New provider setup

☐ Account activated
☐ Test payment works in their dashboard
☐ Public key obtained
☐ Secret key obtained
☐ Webhook secret decided

Step 2: Store page

☐ Old provider script commented out
☐ New provider script added
☐ Public key variable updated
☐ Checkout code replaced
☐ Committed to GitHub
☐ Test popup opens correctly

Step 3: Worker

☐ Environment variable added
☐ Signature verification replaced
☐ Payload parsing updated
☐ Deployed
☐ Test webhook works

Step 4: Webhook URL

☐ Webhook URL set in new provider dashboard
☐ Webhook secret set in new provider dashboard
☐ Callback URL set
☐ Test purchase works end to end

After:

☐ Emails arrive
☐ Downloads work
☐ Update CARETAKER-GUIDE.md and STORE-MANUAL.md with new provider details
☐ Cancel old provider account (optional, after a few weeks of confidence)

---

Common mistakes

1. Forgetting the amount conversion
→ Flutterwave uses main units. 50000 becomes 500.

2. Not testing in the new provider's dashboard first
→ Problems you could have caught early break everything later.

3. Deleting the old code instead of commenting it out
→ You can't revert easily if something goes wrong.

4. Doing this while customers are actively buying
→ Do it during a quiet window. Late night or weekend.

5. Not having backups
→ Without backups, you can't revert. Take them first.

6. Forgetting to update the webhook URL in the new provider
→ Payments happen, but no emails ever get sent.

---

One final warning

This is the most complex thing in the caretaker's guide.

Everything else you'll do — adding an album, changing a price, backing up — is routine. This is a real project.

If you're not fully confident, don't do it alone. Paste the situation into the chat before starting:

"I'm thinking about switching from Paystack to Flutterwave. Here's why: [reason]. What are the risks?"

And if you're midway and something goes wrong:

"I'm switching to Flutterwave. I'm at step [number]. This happened: [describe]. Here's a screenshot. What do I do?"

You don't have to do this yourself.

And — again — don't do this at all unless there's a real reason.

Paystack works. Paystack handles M-PESA. If nothing is wrong, leave it. The downside risk of a bad swap is bigger than the upside of a marginal fee difference.

```

---

## Where to paste this

Open `CARETAKER-GUIDE.md` on GitHub → pencil icon → find this line:

```

3. Something Feels Wrong — Decision Tree

```

Insert the entire block above **just before** that line. Commit.

---

## One honest thing before you paste it

**This is the longest and most complex section we've written.** It's real, accurate, and complete. But it's also a warning wrapped in instructions.

Read it once carefully before you ever use it. The guide exists so that **if** you ever need to swap providers, you can do it safely. Not so that you do it speculatively.

If you want, we can also write a **shorter "should I swap" decision guide** — 10 questions that help you decide whether it's worth the risk. That would go before this in the guide.

**Want me to also write the "should I swap?" checklist?** Or is this enough?