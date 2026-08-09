# 🎓 BUITEMS Student Portal — Next.js

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.4-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**A single-codebase, all-in-one academic toolkit and student portal for Balochistan University of Information Technology, Engineering and Management Sciences (BUITEMS).**

🔗 **Live Demo:** [buitems-portal.vercel.app](https://buitems-portal.vercel.app)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Grading Scale](#-grading-scale)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Roadmap Ideas](#-roadmap-ideas)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

BuitemsPortal-Nextjs is a unified, single-deployment academic toolkit built for BUITEMS students. Instead of shipping a separate frontend and backend, the entire app — UI, authentication, database access, file uploads, PDF generation, and an AI chatbot — lives inside one **Next.js 14 App Router** project and deploys as one Vercel app.

It combines two things students actually use every semester:

1. **Public academic tools** anyone can use without an account — GPA/CGPA calculators, an aggregate calculator, assignment front-page generator, faculty directory, timetable builder, and a to‑do list.
2. **A authenticated Student Portal** — a personal dashboard where a student's semester records, GPA history, and profile are saved to MongoDB and can be revisited any time, plus an AI study assistant chat tab.

---

## ✨ Key Features

### 🔐 Authentication & Account Security
- Signup / Login with **JWT** (7-day expiry) issued via `jsonwebtoken` and passwords hashed with **bcryptjs**
- Session persisted client-side and exposed app-wide through a custom `AuthContext`
- **Forgot / Reset Password flow**: a one-time reset token is generated with `crypto.randomBytes`, stored as a **SHA-256 hash** with a **10-minute expiry**, and emailed to the user via **Nodemailer** over SMTP — the raw token is never stored in the database
- Route-level protection: unauthenticated users are redirected away from `/portal`

### 👤 Student Portal (authenticated dashboard)
A tabbed dashboard (`app/portal`) with four sections:
| Tab | What it does |
|---|---|
| **Profile** | View/edit name, roll number, department, batch, program, phone, and profile picture |
| **Semester Records** | Add and delete semester entries (subjects, credit hours, grades) — each save recalculates CGPA server-side |
| **GPA Analysis** | Visual breakdown/trend of GPA across all saved semesters |
| **AI Assistant** | In-portal chat tab wired to the AI study assistant |

- Profile pictures are uploaded and stored on **Cloudinary**, with the public ID tracked for clean replacement/deletion
- CGPA and total credit hours are **auto-computed on the User model** via a Mongoose `pre("save")` hook every time a semester is added or removed — no separate calculation endpoint needed

### 📊 Academic Calculators
- **GPA Calculator** — add unlimited subjects with name, credit hours, and letter grade; instantly computes semester GPA on the 4.0 scale with a full quality-points breakdown table and a grading-scale reference card
- **CGPA Calculator** — combine multiple semesters (GPA + credit hours each) into a cumulative GPA
- **Aggregate Calculator** — BUITEMS-style admission aggregate using the weighted formula **Matric 10% + Intermediate 40% + Entry Test (NTS) 50%**, with per-field validation

### 📄 Assignment Front Page Generator
- Choose from **4 professionally designed cover-page templates** (Academic, Modern White, Professional Layout, Wave Design)
- Fill in assignment details (name, CMS ID, course, topic, department, semester, submission info) with a **live preview**
- Export the finished cover page as a **PDF** using `jspdf` + `html2canvas` — no backend rendering required

### 🗓️ Interactive Timetable
- Editable **Monday–Friday weekly grid** with configurable time slots
- Add subject, instructor, and location per slot with color-coded blocks
- Fully responsive for both desktop grid view and mobile

### ✅ To-Do List
- Personal task manager with **priority levels** (high / medium / low), due dates, and completion tracking
- Persists locally via `localStorage` (`buitems_todo_list_v1`) — no login required

### 🏛️ Faculty & Department Directory
- Structured listing of BUITEMS faculties (Basic Sciences, Engineering & Architecture, Management Sciences, etc.) with direct links to each official department page

### 🤖 AI Study Assistant
- Chat-based academic help assistant available both as a standalone tab and inside the portal
- Powered by **Groq's `llama-3.3-70b-versatile`** model via the `groq-sdk`, with a system prompt tuned for concise, student-friendly explanations across CS, engineering, math, and science topics
- Gracefully degrades with a clear message if `GROQ_API_KEY` isn't configured

### 🔎 SEO & Discoverability
- Dynamic `sitemap.js` and `robots.js` for search-engine indexing
- Custom `not-found.js` page

---

## 🛠️ Tech Stack

**Framework & Language**
- [Next.js 14](https://nextjs.org/) (App Router, Route Handlers)
- React 18
- TypeScript config alongside JavaScript (`tsconfig.json`, `next-env.d.ts`)

**Styling**
- Tailwind CSS 3.4 + PostCSS/Autoprefixer
- `react-icons` and `lucide-react` for iconography
- `react-hot-toast` for notifications, `react-loader-spinner` for loading states

**Database & Backend**
- MongoDB with **Mongoose 8** ODM, cached connection pattern for serverless (`lib/db.js`)
- API routes implemented as Next.js **Route Handlers** under `app/api/`

**Authentication & Security**
- `jsonwebtoken` for JWT issuing/verification
- `bcryptjs` for password hashing
- `crypto` (Node built-in) for password-reset tokens
- `js-cookie` / `cookie` for token/session handling on the client

**Media & Documents**
- `cloudinary` for profile picture storage
- `jspdf` + `html2canvas` for client-side PDF export (front pages)

**Email**
- `nodemailer` for transactional password-reset emails over SMTP

**AI**
- `groq-sdk` for the AI Study Assistant (Llama 3.3 70B)

**Tooling**
- ESLint (`eslint-config-next`)

---

## 📁 Project Structure

```
BuitemsPortal-Nextjs/
├── app/
│   ├── about/                     # About page
│   ├── aggregate-calculator/      # Matric + Inter + Entry Test aggregate tool
│   ├── api/
│   │   ├── ai-chat/               # Groq-powered AI assistant endpoint
│   │   └── auth/
│   │       ├── createuser/        # Signup
│   │       ├── login/             # Login, issues JWT
│   │       ├── profile/           # Get/update profile
│   │       ├── add-semester/      # Add semester record (recomputes CGPA)
│   │       ├── delete-semester/   # Delete semester record
│   │       ├── forgot-password/   # Generates + emails reset token
│   │       └── reset-password/    # Verifies token, sets new password
│   │   └── upload/                # Cloudinary profile picture upload
│   ├── cgpa-calculator/           # Multi-semester CGPA tool
│   ├── fac-and-dept/              # Faculty & department directory
│   ├── forgot-password/           # Request password reset UI
│   ├── reset-password/[token]/    # Set new password UI
│   ├── front-pages/               # Template gallery for cover pages
│   ├── generate-fp/               # Cover page editor + PDF export
│   ├── gpa-calculator/            # Semester GPA calculator
│   ├── login/ · signup/           # Auth pages
│   ├── portal/                    # Authenticated student dashboard
│   ├── timetable/                 # Weekly class schedule builder
│   ├── todo-list/                 # Personal task manager
│   ├── layout.js · page.js        # Root layout & landing page
│   ├── sitemap.js · robots.js     # SEO
│   └── not-found.js               # 404 page
│
├── components/
│   ├── UI/                        # Buttons, spinner, small shared UI
│   ├── layout/                    # Navbar, Footer, ToolHeader, ToolsCard
│   └── portal/                    # ProfileHeader, ProfileTab, SemesterRecordsTab,
│                                   # GPAAnalysisTab, AIChatTab, dialogs
│
├── lib/
│   ├── AuthContext.js              # Client-side auth/session context
│   ├── db.js                       # Cached Mongoose connection
│   ├── jwt.js                      # Sign/verify JWT, extract token from request
│   ├── cloudinary.js                # Cloudinary SDK config
│   ├── mailer.js                    # Nodemailer transport + reset-password email
│   └── constants/grades.js          # Grade → GPA point map & color helpers
│
├── models/
│   └── UserModel.js                 # User schema (profile, semesters, auto CGPA calc)
│
├── public/                          # Static assets & template preview images
├── styles/globals.css               # Global styles
├── next.config.js · tailwind.config.js · postcss.config.js · tsconfig.json
└── package.json
```

---

## 🎓 Grading Scale

| Grade | GPA Points |
|:---:|:---:|
| A | 4.0 |
| A- | 3.7 |
| B+ | 3.3 |
| B | 3.0 |
| B- | 2.7 |
| C+ | 2.3 |
| C | 2.0 |
| C- | 1.7 |
| D+ | 1.3 |
| D | 1.0 |
| F | 0.0 |

**Aggregate formula** (used by the Aggregate Calculator): `Matric × 10% + Intermediate × 40% + Entry Test × 50%`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A MongoDB database (MongoDB Atlas or local)
- A Cloudinary account (for profile picture uploads)
- An SMTP account (e.g. Gmail App Password) for password-reset emails
- A Groq API key (optional — enables the AI Study Assistant)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/M-Saad-saif/BuitemsPortal-Nextjs.git
cd BuitemsPortal-Nextjs

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local   # then fill in the values (see below)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production build

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/buitems-portal

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (profile picture uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# SMTP (password reset emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App URL (used to build the password reset link)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Study Assistant (optional)
GROQ_API_KEY=gsk_your_groq_key
```

> Without `GROQ_API_KEY`, the AI Assistant tab still works but responds with a friendly "not configured" message instead of a real reply.

---

## 🔌 API Reference

All routes live under `/api/`. Protected routes expect the JWT in an `auth-token` header (or `Authorization: Bearer <token>`).

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `POST` | `/api/auth/createuser` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Log in, returns a JWT |
| `GET` | `/api/auth/profile` | ✅ | Get the current user's profile |
| `PUT` | `/api/auth/profile` | ✅ | Update profile fields |
| `POST` | `/api/auth/add-semester` | ✅ | Add a semester record (subjects, credits, GPA) — recomputes CGPA |
| `DELETE` | `/api/auth/delete-semester` | ✅ | Remove a semester record |
| `POST` | `/api/auth/forgot-password` | — | Generate a hashed, 10-minute reset token and email a reset link |
| `POST` | `/api/auth/reset-password` | — | Verify the reset token and set a new password |
| `POST` | `/api/upload` | ✅ | Upload a profile picture to Cloudinary |
| `POST` | `/api/ai-chat` | — | Send a message to the Groq-powered AI study assistant |

**Example — Login:**
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@buitms.edu.pk","password":"yourpassword"}'
```

**Example — AI Chat:**
```bash
curl -X POST https://your-domain.com/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Explain pipeline hazards in simple terms"}'
```

---

## 🌐 Deployment

### Deploy to Vercel (recommended)

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Add all environment variables listed above in the Vercel project settings
5. Deploy

```bash
vercel --prod
```

### Manual deployment

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap Ideas

- [ ] Server-persisted timetable and to-do data (currently local-only for to-do)
- [ ] Semester-wise GPA trend charts on the GPA Analysis tab
- [ ] Export semester records / transcript as PDF
- [ ] Push/email notifications for timetable reminders
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Guidelines:** follow the existing ESLint/Tailwind conventions, keep new API routes consistent with the patterns in `app/api/`, and test authentication flows (signup, login, forgot/reset password) before submitting.

---

## 🙏 Acknowledgments

- **BUITEMS** — for the academic structure and inspiration behind the tools
- **Groq** — for fast LLM inference powering the AI Study Assistant
- **Cloudinary** — for image hosting
- **Vercel** — for seamless deployment

---

**Project Link:** [github.com/M-Saad-saif/BuitemsPortal-Nextjs](https://github.com/M-Saad-saif/BuitemsPortal-Nextjs)
