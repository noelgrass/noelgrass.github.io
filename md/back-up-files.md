Here it is. Same style as the others — plain English, operator-level. Add this to CARETAKER-GUIDE.md.

Where to put it: insert this as a new section right after the "Adding a New Album" section (2.5), before section 3.

```markdown
---

## 2.6 Backing Up Your Store — Do This Monthly

This is the most important section in this guide. **Read it twice.**

Here's the truth: your store is safe, but only if you have backups. If something disappears — a file, the Worker, a password, your whole account — a backup is what saves you.

**Do this once a month.** Set a phone reminder. It takes 10 minutes.

---

### Why this matters

Your store has four things that can be lost:

| Thing | How it could be lost |
|---|---|
| **The album files** (the `.zip`s) | You accidentally delete a file. Or the whole R2 bucket. |
| **The Worker code** (the store's brain) | You accidentally delete the Worker. Or lose access to Cloudflare. |
| **Your store page files** | You overwrite something. Or GitHub has an issue. |
| **Your access** (passwords, keys) | You forget a password. Or a service locks you out. |

**Backups solve three of these.** The fourth (losing access) is solved by keeping your passwords safe — which is also part of this guide.

---

### What you're backing up (four things)

When you "back up your store," you're actually backing up **four separate things**:

1. **The album files** — the actual `.zip`s customers download
2. **The Worker code** — a text file that lives in Cloudflare
3. **Your store pages** — the HTML files in GitHub
4. **Your passwords and keys** — the logins to all your accounts

Let me walk through each.

---

### Backup 1 — The album files

**What these are:** Every `.zip` file you've uploaded to R2. The Impressionist, Into A Stillness, all of them.

**Where they live:** Cloudflare R2, inside the bucket called `my-digital-store`.

**Why they matter:** If Cloudflare ever lost these files, you'd have to re-upload them from your computer. If you don't have the originals anymore, they're gone forever.

**How to back them up:**

1. Open **dash.cloudflare.com** in your browser
2. In the left sidebar, click **R2**
3. Click the bucket named **my-digital-store**
4. At the top of the file list, there's a **checkbox** on the far left. Tick it.
5. This selects all files. (You'll see a message like "12 objects selected.")
6. A button appears — usually near the top right — that says **Download**. Click it.
7. Your browser downloads a `.zip` file containing everything in your bucket.

**Where to save it:**

Save that downloaded file somewhere safe. Options:
- **Google Drive** — free, accessible from any device
- **Dropbox** — similar
- **An external hard drive** — the most reliable
- **Your computer** — works, but risky (if your computer dies, so does the backup)

**My recommendation:** Save to **Google Drive** or an **external hard drive**. Ideally both.

**Name it clearly.** Something like:
```

noelgrass-backup-2026-11.zip

```
Include the date so you know when it was made.

**How often:** Once a month. Or whenever you add a new album.

---

### Backup 2 — The Worker code

**What this is:** The script that runs your store's brain. It lives inside Cloudflare. It handles payments, finds files, sends emails.

**Where it lives:** Cloudflare Worker, called `my-store-backend`.

**Why it matters:** If you accidentally delete the Worker, you can rebuild it — but only if you have the code saved somewhere. Cloudflare doesn't keep a backup for you.

**How to back it up:**

1. Open **dash.cloudflare.com**
2. In the left sidebar, click **Workers & Pages**
3. Click **my-store-backend**
4. Click **Edit code** (top right)
5. Click inside the code editor
6. Press **Ctrl+A** (Windows) or **Cmd+A** (Mac) — this selects all the code
7. Press **Ctrl+C** (or **Cmd+C**) — this copies it
8. Open a plain text editor on your computer — Notepad (Windows), TextEdit (Mac), or any code editor
9. Paste the code in
10. Save the file as `worker.js`

**Where to save it:**

Two places:
- **On your computer** — a folder called something like `noelgrass-store-backup`
- **In your GitHub repo** — inside a folder called `store-code/`

**How to add it to GitHub:**

1. Open your GitHub repo (`noelgrass.github.io`)
2. If there's no `store-code` folder, create one: click **Add file** → **Create new file** → in the name field, type `store-code/worker.js` → GitHub will create the folder automatically
3. Paste the Worker code into the file
4. Scroll down → **Commit changes**

Now the Worker code lives both in Cloudflare AND in your GitHub repo. If Cloudflare loses it, you can grab it from GitHub.

**How often:** Whenever you change the Worker code. If nothing's changed, no need to redo it. But check every month — sometimes updates happen without you noticing.

---

### Backup 3 — Your store pages

**What these are:** All the HTML files that make up your website — `store.html`, `index.html`, every gallery, every page.

**Where they live:** GitHub, in your repo called `noelgrass.github.io`.

**Why they matter:** You might accidentally overwrite something. Or break a file. Or want to see an older version.

**The good news:** You don't have to do anything. **GitHub keeps every version automatically.**

**How it works:**

Every time you commit a change to a file, GitHub saves the previous version. You can always go back.

**To see the history of any file:**

1. Open your GitHub repo
2. Click any file (like `store.html`)
3. At the top of the page, there's a **History** link. Click it.
4. You'll see every version of that file, with the date and message of each commit
5. Click any past version to view it
6. If you want to restore it, copy the old content and paste it into the current version

**So:** GitHub is your backup for the website itself. You don't need to do anything extra.

**But do this once a month anyway:**

1. Open your GitHub repo
2. Click the green **Code** button
3. Click **Download ZIP**
4. Save that file alongside your other backups

This gives you a snapshot of your entire site, on your computer, at that moment in time.

**How often:** Once a month is plenty.

---

### Backup 4 — Your passwords and keys

**What this is:** Every login and secret you use to run the store. The keys that protect it.

**Why it matters:** These are the keys to your kingdom. If you lose access, the store is stuck.

**The list you need to keep safe:**

**Accounts (logins):**
- GitHub — email + password
- Cloudflare — email + password
- Paystack — email + password
- Resend — email + password
- Your domain registrar — email + password

**Secret keys (the important ones):**

| Key | What it does | Where it lives |
|---|---|---|
| `PAYSTACK_SECRET_KEY` | Verifies payments are real | Cloudflare Worker settings |
| `RESEND_API_KEY` | Sends emails | Cloudflare Worker settings |
| `DOWNLOAD_SIGNING_SECRET` | Protects download links | Cloudflare Worker settings |
| `PAYSTACK_PUBLIC_KEY` | Opens the payment popup | Inside `store.html` (safe to share) |

**How to back these up:**

**Option 1 — A password manager (recommended)**

Use a password manager like:
- **Bitwarden** — free, works everywhere
- **1Password** — paid, very polished
- **Your browser's built-in** — Chrome, Safari, Firefox all have this

Save every account's email and password. Save the secret keys too — either as notes or as a separate "secure note."

**Option 2 — A paper notebook (offline)**

Write everything down in a physical notebook. Store it somewhere safe — not in the same room as your laptop.

This sounds old-fashioned, but it's actually the most reliable. Hacking can't reach paper.

**Option 3 — Both**

Best answer: password manager for daily use, paper notebook for disasters.

**Important — never do this:**

- ❌ Don't save passwords in a plain text file on your computer
- ❌ Don't email them to yourself
- ❌ Don't save them in your phone's notes app (unless it's encrypted)
- ❌ Don't post them anywhere
- ❌ Don't share them with anyone

---

### Your Monthly Backup Checklist

Set a phone reminder for the 1st of every month. Then do this:

**1. Back up album files (3 minutes)**
- [ ] Cloudflare → R2 → my-digital-store → select all → Download
- [ ] Save to Google Drive / external drive
- [ ] Name it with the date

**2. Back up the Worker code (2 minutes)**
- [ ] Cloudflare → my-store-backend → Edit code → Ctrl+A → Ctrl+C
- [ ] Paste into GitHub `store-code/worker.js`
- [ ] Commit

**3. Back up the site (1 minute)**
- [ ] GitHub → your repo → Code → Download ZIP
- [ ] Save alongside your other backups

**4. Verify your passwords are still good (3 minutes)**
- [ ] Can you log into GitHub?
- [ ] Can you log into Cloudflare?
- [ ] Can you log into Paystack?
- [ ] Can you log into Resend?
- [ ] Are all passwords saved somewhere safe?

**Total time: 9 minutes.**

---

### Where to keep your backups

**Best answer:** Two different places.

**Example setup:**
- **Google Drive** — one copy, accessible anywhere
- **External hard drive** — one copy, offline, safe from hacking

**Why two?**
- If Google locks your account, you still have the drive
- If your house floods, you still have Google

**Simple rule:** If you can only do one place, do the external drive. Offline is safer than online.

---

### How to know it worked

After a backup, you should have:

- ✅ A `.zip` file with all your album files
- ✅ A `worker.js` file with the Worker code (in GitHub and on your computer)
- ✅ A `.zip` of your whole site (from GitHub)
- ✅ All your passwords saved somewhere safe
- ✅ All filenames include the date (like `noelgrass-backup-2026-11.zip`)

**Test it occasionally:** Once every three months, try downloading one album file from your backup and confirm it opens. Just to make sure the backup isn't corrupted.

---

### What if you forget to back up?

**Nothing bad happens immediately.** The store keeps running.

But:
- If Cloudflare ever has an outage, your files might be temporarily unreachable
- If you accidentally delete something, you can't restore it
- If a service locks you out, you have nothing to fall back on

**The backup is insurance.** You hope you never need it. But you're very glad you have it when you do.

---

### The short version

If you only remember one thing from this section, remember this:

> **On the 1st of every month, download three things: the R2 files, the Worker code, and a ZIP of your GitHub repo. Save them somewhere not on this laptop. Takes 9 minutes.**

Do that, and you'll never lose your store.

---

### What to do if you accidentally lose something

If you ever think you've lost something important:

1. **Don't panic.** Most things are recoverable.
2. **Don't try to fix it yourself.** Guessing can make it worse.
3. **Paste this into the chat:**

> "I think I lost [describe what]. Here's what happened: [describe]. What do I do?"

We'll figure it out together. Almost nothing is truly unrecoverable if you have backups.

---

### Common mistakes

**1. Backing up only to your computer**
→ If your computer dies, so does your backup. Save to an external drive or cloud.

**2. Not naming files with dates**
→ Three backups later, you won't know which is which.

**3. Saving passwords in plain text**
→ Anyone with access to your computer can read them.

**4. Skipping months**
→ Set a phone reminder. Nine minutes a month is nothing.

**5. Backing up only once, then never again**
→ Your store changes. Backups need to change too.

---

### The one-page summary

**Save this to your phone. Print it. Stick it on the fridge.**

**Monthly backup — 1st of the month:**

| Step | Where | Time |
|---|---|---|
| Download R2 files | Cloudflare → R2 → my-digital-store | 3 min |
| Copy Worker code to GitHub | Cloudflare → Worker → Edit → paste to GitHub | 2 min |
| Download GitHub repo | GitHub → Code → Download ZIP | 1 min |
| Check passwords still work | All four accounts | 3 min |

**Save everything to:** Google Drive **and** an external drive.

**Name everything with the date.**

**That's it. Nine minutes. Once a month. Nothing can take your store from you.**
```

---

Where to paste this:

Open CARETAKER-GUIDE.md on GitHub → pencil icon → find this line:

```
## 3. Something Feels Wrong — Decision Tree
```

Insert the entire block above just before that line. Commit.

Reply "done" when you've pasted it, or tell me which scenario you want next.