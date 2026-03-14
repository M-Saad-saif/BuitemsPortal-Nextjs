# BuitemsWeb-auth — Next.js Conversion

> Original MERN stack project by [Saad Saif](https://github.com/M-Saad-saif) converted from Create-React-App + Express into a unified **Next.js 14 App Router** application.

## 🔄 What Changed (vs original)

| Original | Next.js Version |
|----------|----------------|
| `create-react-app` frontend | `Next.js 14 App Router` |
| Separate Express server (`backend/`) | `app/api/` Route Handlers |
| `React Router` navigation | `next/link` + `next/navigation` |
| `backend/DB.js` | `lib/db.js` (cached Mongoose connection) |
| `backend/middleware/fetchuser.js` | `lib/jwt.js` helper used in each route |
| `backend/utils/cloudinary.js` | `lib/cloudinary.js` |
| `backend/models/UserModel.js` | `models/UserModel.js` (identical schema) |
| `backend/routes/userauth.js` | `app/api/auth/*/route.js` (one file per endpoint) |
| CSS Modules / inline styles | Tailwind CSS |
| Two separate deployments | **Single Vercel deployment** |

## 📁 Project Structure

```
buitems-nextjs/
├── app/
│   ├── layout.js                    ← Root layout (Navbar, Footer, AuthProvider)
│   ├── page.js                      ← Home page
│   ├── login/page.js                ← Login
│   ├── signup/page.js               ← Sign Up
│   ├── portal/page.js               ← Student Portal (all tabs)
│   ├── gpa-calculator/page.js       ← GPA Calculator
│   ├── cgpa-calculator/page.js      ← CGPA Calculator
│   ├── aggregate-calculator/page.js ← Aggregate Calculator
│   ├── front-pages/page.js          ← Template selector
│   ├── generate-fp/page.js          ← Front page generator + PDF
│   ├── timetable/page.js            ← Interactive timetable
│   ├── fac-and-dept/page.js         ← Faculties & Departments
│   ├── about/page.js                ← About page
│   └── api/
│       ├── auth/
│       │   ├── createuser/route.js  ← POST /api/auth/createuser
│       │   ├── login/route.js       ← POST /api/auth/login
│       │   ├── profile/route.js     ← GET + PUT /api/auth/profile
│       │   ├── add-semester/route.js
│       │   └── delete-semester/route.js
│       ├── upload/route.js          ← POST (Cloudinary image upload)
│       └── ai-chat/route.js         ← POST (AI assistant proxy)
├── components/
│   └── layout/
│       ├── Navbar.js
│       └── Footer.js
├── lib/
│   ├── AuthContext.js               ← Global auth state (login/signup/logout)
│   ├── db.js                        ← MongoDB connection
│   ├── jwt.js                       ← JWT sign/verify helpers
│   └── cloudinary.js                ← Cloudinary config
├── models/
│   └── UserModel.js                 ← Mongoose schema (same as original)
├── styles/
│   └── globals.css
└── .env.local.example
```

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual values:
#   MONGO_URI=...
#   JWT_SECRET=...
#   CLOUDINARY_CLOUD_NAME=...
#   CLOUDINARY_API_KEY=...
#   CLOUDINARY_API_SECRET=...
#   ANTHROPIC_API_KEY=...  (optional, for AI chat)
```

### 3. Run development server
```bash
npm run dev
# → http://localhost:3000
```

### 4. Build for production
```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (will prompt for env vars)
vercel
```

Or push to GitHub and import at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.

**Add environment variables in Vercel Dashboard** → Project → Settings → Environment Variables:
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `ANTHROPIC_API_KEY` (optional)

## 🔑 API Endpoints (same as original Express routes)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/createuser` | — | Register new user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET  | `/api/auth/profile` | ✅ | Get current user |
| PUT  | `/api/auth/profile` | ✅ | Update profile |
| POST | `/api/auth/add-semester` | ✅ | Add semester record |
| DELETE | `/api/auth/delete-semester` | ✅ | Delete semester |
| POST | `/api/upload` | ✅ | Upload profile picture |
| POST | `/api/ai-chat` | — | AI study assistant |

Auth header: `auth-token: <jwt_token>` (same as original)

## ✅ Features Preserved

- ✅ JWT authentication (same token format)
- ✅ MongoDB + Mongoose (same UserModel schema)
- ✅ Cloudinary profile picture upload
- ✅ GPA Calculator (4.0 scale, subject breakdown)
- ✅ CGPA Calculator (multi-semester)
- ✅ Aggregate Calculator (Matric + FSc + Entry Test)
- ✅ Assignment Front Page Generator (4 templates, PDF export)
- ✅ Interactive Timetable (grid + list view, editable)
- ✅ Faculties & Departments (all 7 faculties, 20+ departments)
- ✅ Student Portal (profile, semester records, GPA analysis, AI chat)
- ✅ Responsive navbar with mobile menu
- ✅ Same BUITEMS navy/blue/amber color theme
- ✅ AI Study Assistant (Anthropic Claude or OpenAI)
"# BuitemsPortal-Nextjs" 
