# 🍺 Bucks Party Quiz

A web app where your mates answer questions about the buck, and all answers are revealed together on the night.

## How It Works

1. **Participants** visit your Vercel URL, enter their name, and answer all questions
2. **Answers are saved** to Vercel KV (free Redis database)
3. **The Buck** visits `/results` to see every answer, grouped by question or by person

---

## ✏️ Customise the Quiz

Open `lib/questions.ts` and edit:
- `BUCK_NAME` — the groom's first name
- `questions` — add, remove, or change any questions

---

## 🚀 Deploy to Vercel (Step by Step)

### 1. Create a GitHub repo

You need a free GitHub account. Go to https://github.com/new and create a repo called `bucks-quiz`.

Then push this folder:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bucks-quiz.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com and sign up (free) with your GitHub account
2. Click **"Add New Project"**
3. Import your `bucks-quiz` repo
4. Click **Deploy** — Vercel auto-detects Next.js

### 3. Add Vercel KV (the database)

After deploying:
1. Go to your project dashboard on Vercel
2. Click **Storage** tab → **Create Database** → **KV**
3. Name it `bucks-quiz-kv` → click **Create & Continue**
4. Click **Connect to Project** and select your project
5. Click **I will add later** when asked about env vars (Vercel adds them automatically)
6. Redeploy: go to **Deployments** → click the three dots on latest → **Redeploy**

### 4. Share the Links

- **Participant link** (share with mates): `https://your-app.vercel.app`
- **Results link** (for the buck on the night): `https://your-app.vercel.app/results`

---

## 🛠 Running Locally (Optional)

```bash
npm install
# Add a .env.local file with your KV credentials from Vercel dashboard
npm run dev
```

---

## 📁 Project Structure

```
app/
  page.tsx          # Landing page — name entry
  quiz/page.tsx     # The quiz questionnaire
  results/page.tsx  # Results reveal page
  api/
    submit/route.ts # POST: saves an answer set
    results/route.ts # GET: fetches all answers
lib/
  questions.ts      # ← EDIT THIS to customise the quiz
```
