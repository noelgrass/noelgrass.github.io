Yes. Same style — plain English, no jargon, operator-level. Here's the section for adding a new song or album.

Add this to CARETAKER-GUIDE.md. It should go right after the "The 4 Things You'll Actually Do" section (section 2), because adding an album is one of those four things — but it deserves its own full guide.

Insert this as a new section between section 2 and section 3:

```markdown
---

## 2.5 Adding a New Album or Song — Step by Step

This is the most common thing you'll do. About once a month, you'll want to add a new release to your store.

**Read this once now.** Then next time you add an album, follow along.

**Time:** about 15 minutes the first time. About 8 minutes once you've done it twice.

**Do it on a laptop.** Not your phone. You'll be switching between tabs and copying things.

---

### What you're actually doing

You're doing **four things**, in this order:

1. **Bundle your music into one file** on your computer (a `.zip` file)
2. **Upload that file** to your storage (Cloudflare R2)
3. **Tell your store's brain** that this album exists and where the file is
4. **Add it to the store page** so customers can see and buy it

That's it. After the fourth step, the album is live. Anyone can buy it.

**What happens automatically after that:** When a customer clicks Buy on that album, Paystack takes their money, your store's brain finds the file, Resend emails it to them. All of that works without you doing anything else.

---

### Before you start, gather these

- **The album's files** — your tracks (MP3s, WAVs, whatever you're delivering), cover art, any liner notes
- **A cover image** for the store page — a square JPG or PNG, ideally at least 800×800 pixels
- **A YouTube video ID** — if you want a Preview button. This is the code at the end of a YouTube URL. If the URL is `youtube.com/watch?v=abc123xyz`, the ID is `abc123xyz`. If you don't have a preview video, skip this — you can leave the preview button off.
- **The price** — in KES. For example, EP = 500, Album = 900, Single = 200. Or whatever you want.
- **The category** — Solo Piano, Orchestral, Experimental, or Ambient. This determines which section of the store page it appears in.

---

### Step 1 — Bundle your music into a ZIP file

**What you're doing:** Combining all your album's files into one file that customers will download.

**Why:** Instead of sending them 4 separate MP3s, you send them one file that contains everything.

**How:**

1. On your computer, create a new folder. Name it after the album (e.g. `Quiet Hours`)
2. Put everything inside it:
   - All the audio tracks, numbered in order (like `01 - First Song.mp3`)
   - Any artwork
   - Any PDFs (liner notes, credits)
3. Right-click the folder:
   - **On Mac:** Choose "Compress"
   - **On Windows:** Choose "Send to" → "Compressed (zipped) folder"
4. You now have a new file: `Quiet Hours.zip`

**Now — rename the ZIP file.**

This is important. R2 — your file storage — is picky about names. It needs:
- All lowercase
- Hyphens between words (not spaces, not underscores)
- `.zip` at the end

So:
- ❌ `Quiet Hours.zip` — has spaces and capitals
- ❌ `quiet_hours.zip` — has an underscore
- ❌ `Quiet-Hours.ZIP` — capitals and uppercase extension
- ✅ `quiet-hours.zip` — perfect

Rename the file on your computer **before** uploading. Once it's uploaded, renaming is annoying.

**Write down the exact filename.** You'll need it in step 3. Something like:
```

quiet-hours.zip

```

---

### Step 2 — Upload the ZIP to your storage

**What you're doing:** Putting the file where your store can find it.

**Why:** Right now, the file is only on your computer. Customers can't reach your computer. It needs to live somewhere online, private, and accessible only to your store.

**How:**

1. Open **dash.cloudflare.com** in your browser
2. In the left sidebar, click **R2**
3. Click the bucket named **my-digital-store**
4. You'll see two folders: `previews` and `products`
5. Click **products**
6. Now choose where this album belongs:
   - **album** folder → for full-length albums
   - **ep** folder → for EPs
   - **single** folder → for singles
7. Click the folder that fits
8. Click the **Upload** button (top right)
9. Choose **Select file** → find your `.zip` file → upload

**How to know it worked:** The file will appear in the list, with a size and a modified date.

**Write down the full path.** You'll need it in step 3. Something like:
```

products/ep/quiet-hours.zip

```

**Remember:** the path is **exact**. Every letter, every hyphen, every dot. R2 is case-sensitive, which means `products/Ep/Quiet-Hours.zip` and `products/ep/quiet-hours.zip` are two different things. Getting this wrong is the most common reason an album doesn't work.

---

### Step 3 — Tell your store's brain the album exists

**What you're doing:** Registering the album. This tells your store: *"When someone buys the product called `quiet-hours`, send them the file at `products/ep/quiet-hours.zip`."*

**Why:** Right now, the file exists, but your store doesn't know it exists. It has no way to connect a customer's purchase to a file.

**How:**

1. Open **dash.cloudflare.com**
2. In the left sidebar, click **Workers & Pages**
3. Click **my-store-backend**
4. Click **Edit code** (top right)
5. In the code editor, find this near the top:
```

const PRODUCTS = {

```
6. Below that line, you'll see a list. Each line describes an album. It looks like this:
```

"into-a-stillness": { r2Key: "products/ep/into-a-stillness.zip", title: "Into A Stillness That Answers", filename: "Into-A-Stillness-That-Answers.zip" },

```
7. **Add a new line** below the others. Copy the format exactly, replacing the values with your new album's:

```

"quiet-hours": { r2Key: "products/ep/quiet-hours.zip", title: "Quiet Hours", filename: "Quiet-Hours.zip" },

```

   Breaking it down:
   - **`"quiet-hours"`** — the album's "short name." All lowercase, hyphens. This is what the Buy button will use later. Write it down.
   - **`"products/ep/quiet-hours.zip"`** — the exact path from step 2
   - **`"Quiet Hours"`** — the display title customers will see
   - **`"Quiet-Hours.zip"`** — what the file will be called when a customer downloads it

8. **Check the commas.** Every line ends with `,` — except the very last one before the closing `};`. If you're not sure, look at how the lines around yours end.

9. Click **Deploy** (top right).
10. Wait about 20 seconds. You'll see a "Deployed" confirmation.

**How to know it worked:** No error messages. The deploy completes.

**If you get an error:** You probably missed a comma or a bracket. Look at your new line very carefully and compare it to the lines around it. Everything must match — the quotation marks, the colons, the commas.

**If you're stuck:** Paste this into the chat:
> "I'm adding a new album to the Worker. Here's my new line: [paste the line]. I'm getting this error: [paste the error]."

---

### Step 4 — Add it to the store page

**What you're doing:** Making the album appear on your store page, with a Buy button.

**Why:** Without this, the album exists in your brain and in your storage — but customers can't see it.

**How:**

**First, upload the cover image:**

1. Open your GitHub repo (`noelgrass.github.io`)
2. Click into the **images** folder → **discography**
3. Click **Add file** → **Upload files**
4. Upload your cover image, naming it `quiet-hours.jpg` (or `.png` — match the file extension)

**Then, edit the store page:**

1. In your repo, click **store.html**
2. Click the pencil icon (edit)
3. Press Ctrl+F (or Cmd+F) to search for a category name — like `Solo Piano`. This finds the section you want.
4. Inside that section, you'll see several album blocks. **Copy one whole block** — from `<div class="store-item">` down to the matching `</div>`. Pick an EP to copy if yours is an EP, so the format matches.
5. **Paste it right below the last album** in that section.
6. Now edit the pasted block. It'll look like this:
   ```html
   <div class="store-item">
     <div class="poster">
       <img src="images/discography/COVER.jpg" alt="ALT TEXT" loading="lazy">
       <span class="badge">EP</span>
     </div>
     <div class="caption">ALBUM TITLE</div>
     <div class="format-label">Solo Piano</div>
     <div class="item-actions">
       <button type="button" class="action-link js-preview" data-video="YOUTUBE_ID" aria-label="Preview ALBUM TITLE">Preview</button>
       <button type="button" class="action-link js-buy" data-id="PRODUCT-ID" data-title="ALBUM TITLE" data-amount="AMOUNT" data-currency="KES" aria-label="Buy ALBUM TITLE">Buy</button>
     </div>
   </div>
```

7. Change each piece:
   Where it says Change to
   COVER.jpg Your cover image filename, like quiet-hours.jpg
   ALT TEXT A short description, like "Quiet Hours — EP by Noel Grass"
   EP (in the badge) EP, Album, or Single
   ALBUM TITLE (in the caption) Quiet Hours
   Solo Piano (in format-label) The category
   ALBUM TITLE (in the aria-labels) Quiet Hours
   YOUTUBE_ID The YouTube video ID (just the code — not the full URL)
   PRODUCT-ID (in data-id) Must match the id from step 3 — quiet-hours
   ALBUM TITLE (in data-title) Quiet Hours
   AMOUNT (in data-amount) The price in cents — see the table below
8. Prices are in cents. So:
   You want to charge Write
   KES 200 20000
   KES 500 50000
   KES 900 90000
   KES 1200 120000
9. Double-check the data-id. It must match the id in the Worker's PRODUCTS list exactly. If the Worker says quiet-hours and the store says quiethours — it will fail silently. Customers pay and get nothing.
10. Scroll down → click Commit changes → write a message like Add Quiet Hours → commit.
11. Wait 60 seconds. GitHub Pages takes about a minute to rebuild.

---

Step 5 — Test that it works

Don't skip this. Test before telling anyone about it.

1. Open noelgrass.github.io/store (or your domain if you've moved)
2. Find your new album on the page. If you don't see it:
   · Hard-refresh the browser — Ctrl+Shift+R on Windows or Cmd+Shift+R on Mac
   · Wait another 60 seconds and refresh again
3. Click Buy
4. A popup asks for your email — use your own email (the one you signed up to Resend with — while you're in sandbox mode, only that email works)
5. Click Continue to payment
6. The Paystack popup should open, showing:
   · The correct album title
   · The correct price
7. Pay with the test card:
   · Card: 4084 0840 8408 4081
   · Expiry: any future date
   · CVV: 408
   · PIN: 0000
   · OTP: 123456
8. A success popup should appear
9. Check your inbox — within 30 seconds you should have an email titled something like "Your download — Quiet Hours"
10. Click the download link in the email
11. Confirm the .zip downloads
12. Open the .zip — confirm the tracks inside are the right ones

If anything fails: Don't panic. Go to the troubleshooting section, or paste this into the chat:

"I added a new album called [name]. I got to step [number] and this happened: [describe]. Here's a screenshot. What do I do?"

---

The three names must match

This is the single most common reason a new album doesn't work. Three names must be exactly the same:

Where it lives Example
The actual file in R2 quiet-hours.zip
The r2Key in the Worker products/ep/quiet-hours.zip (the file name at the end)
The data-id in the store page quiet-hours

If those three don't match, the customer pays and gets nothing.

Same with capital letters. R2 is case-sensitive:

· Quiet-Hours.zip and quiet-hours.zip are two different files

Check all three, every time. Before you test.

---

Adding just a single song (not a full album)

The process is exactly the same. Two differences:

· Put the .zip in the single folder instead of album or ep
· In the store page block, use Single as the badge instead of EP or Album
· On the Worker line, use a filename like my-new-song.zip and put it under products/single/
· Price it as a single — usually KES 200 (data-amount="20000")

Everything else is identical.

---

If you ever want to add multiple songs as one product

You can. Bundle them into one .zip just like an album. The store doesn't care if the zip contains one track or twenty — it treats it the same way.

So if you have three songs you want to sell together as a small release, bundle them into a .zip and follow the same steps. Call it whatever you want — an EP, a mini-album, a bundle.

---

The five things to remember

1. The file goes in R2 — always lowercase, always hyphens
2. The Worker needs one new line — mind the commas
3. The store page needs one new block — mind the data-id
4. The three names must match — file, Worker, store page
5. Test before telling anyone — always

That's it. Fifteen minutes. Done.

---

If you forget everything else

The most important thing is: after you've added the album, test it yourself.

Buy it with the test card. Check the email arrives. Check the download works. Confirm the tracks are correct.

If all of that passes, you're done. If any of it fails, go back and check the three names match.

That's the whole secret.

```

---

## Where to put this

Open `CARETAKER-GUIDE.md` on GitHub → pencil icon → find this line:

```

3. Something Feels Wrong — Decision Tree

```

Insert the entire block above **just before** that line. Commit.

**Reply "done" when you've pasted it**, or tell me if something's unclear.