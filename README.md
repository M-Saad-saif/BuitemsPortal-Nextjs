# BUITEMS Student Portal — Next.js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)

> A comprehensive student portal for BUITEMS — unified Next.js 14 App Router conversion with full authentication, academic calculators, AI assistant, and interactive tools.

## ✨ Live Demo

[🔗 Visit Live Portal](https://buitems-portal.vercel.app) 

---

## 🎯 Overview

**BuitemsPortal-Nextjs** is a unified student portal for Balochistan University of Information Technology, Engineering and Management Sciences (BUITEMS). Originally a MERN stack application (React + Express), this version consolidates everything into a **single Next.js 14 App Router** codebase, eliminating the need for separate frontend/backend deployments.

### Key Capabilities
- 🔐 **JWT Authentication** with secure token-based session management
- 📊 **Academic Calculators** — GPA, CGPA, and admission aggregate tools
- 📄 **Front Page Generator** — 4 professional templates with PDF export
- 🗓️ **Interactive Timetable** — Customizable weekly class schedule
- 🤖 **AI Study Assistant** — Claude-powered academic Q&A chatbot
- 👤 **Student Portal** — Profile management, semester records, GPA analysis
- 🏛️ **Faculty & Department Directory** — Complete BUITEMS academic structure

---

## 🔄 Architecture Evolution

| Original MERN Stack | Next.js 14 Version |
|---------------------|-------------------|
| `create-react-app` frontend | **Next.js 14 App Router** |
| Separate Express server (`backend/`) | `app/api/` Route Handlers |
| `React Router` navigation | `next/link` + `next/navigation` |
| `backend/DB.js` | `lib/db.js` (cached Mongoose connection) |
| `backend/middleware/fetchuser.js` | `lib/jwt.js` helper in each route |
| `backend/utils/cloudinary.js` | `lib/cloudinary.js` |
| CSS Modules / inline styles | **Tailwind CSS** |
| Two separate deployments | **Single Vercel deployment** |

---

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: JavaScript/TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM

### Authentication & Security
- **JWT** — JSON Web Tokens
- **bcryptjs** — Password hashing

### Storage & Media
- **Cloudinary** — Profile image uploads

### AI Integration
- **Anthropic Claude API** — AI Study Assistant

### Development Tools
- **ESLint** — Code linting
- **PostCSS** — CSS processing

---

## 📁 Project Structure
buitems-nextjs/
├── app/ # Next.js App Router
│ ├── layout.js # Root layout (Navbar, Footer, AuthProvider)
│ ├── page.js # Home page
│ ├── login/page.js # Login
│ ├── signup/page.js # Sign Up
│ ├── portal/page.js # Student Portal (tabs: profile, semesters, analysis, AI)
│ ├── gpa-calculator/page.js # GPA Calculator
│ ├── cgpa-calculator/page.js # CGPA Calculator
│ ├── aggregate-calculator/page.js # Aggregate Calculator
│ ├── front-pages/page.js # Template selector
│ ├── generate-fp/page.js # Front page generator + PDF
│ ├── timetable/page.js # Interactive timetable
│ ├── fac-and-dept/page.js # Faculties & Departments
│ ├── about/page.js # About page
│ └── api/ # API Routes (replaces Express backend)
│ ├── auth/
│ │ ├── createuser/route.js # POST /api/auth/createuser
│ │ ├── login/route.js # POST /api/auth/login
│ │ ├── profile/route.js # GET + PUT /api/auth/profile
│ │ ├── add-semester/route.js
│ │ └── delete-semester/route.js
│ ├── upload/route.js # POST (Cloudinary image upload)
│ └── ai-chat/route.js # POST (AI assistant proxy)
├── components/
│ └── layout/
│ ├── Navbar.js # Responsive navigation
│ └── Footer.js # Site footer
├── lib/ # Core utilities
│ ├── AuthContext.js # Global auth state (login/signup/logout)
│ ├── db.js # MongoDB connection with caching
│ ├── jwt.js # JWT sign/verify helpers
│ └── cloudinary.js # Cloudinary configuration
├── models/
│ └── UserModel.js # Mongoose user schema
├── styles/
│ └── globals.css # Global styles & Tailwind imports
├── public/ # Static assets
├── .env.local.example # Environment variables template
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind theme (BUITEMS colors)
└── vercel.json # Vercel deployment settings

text

---

## ✨ Key Features

### 🔐 Authentication System
- JWT-based authentication with secure token storage
- Login, Signup, and protected routes
- Profile management with Cloudinary image upload
- Persistent session using `AuthContext`

### 📚 Academic Calculators
- **GPA Calculator** — 4.0 scale with subject-wise breakdown
- **CGPA Calculator** — Multi-semester cumulative tracking
- **Aggregate Calculator** — Matric + FSc + Entry Test formula

### 📄 Front Page Generator
- 4 professionally designed templates
- Real-time preview
- Instant PDF export with proper formatting

### 🗓️ Interactive Timetable
- Grid and list view options
- Editable course slots (time, subject, instructor)
- Responsive design for mobile/desktop

### 🤖 AI Study Assistant
- Claude-powered chatbot
- Academic Q&A for BUITEMS courses
- Context-aware responses

### 🏛️ Faculty & Departments
- Complete listing of all 7 faculties
- 20+ departments with program details
- Organized by faculty structure

### 👤 Student Portal
- Profile dashboard with image upload
- Semester-wise academic records
- GPA trend analysis
- Integrated AI chat tab

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Anthropic API key (optional, for AI chat)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-Saad-saif/BuitemsPortal-Nextjs.git
   cd BuitemsPortal-Nextjs
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
Run development server

bash
npm run dev
Open http://localhost:3000

Build for production

bash
npm run build
npm start
🔌 API Reference
All API routes are available under /api/. Authentication uses header: auth-token: <jwt_token>

Method	Endpoint	Auth	Description
POST	/api/auth/createuser	—	Register new user
POST	/api/auth/login	—	Login, returns JWT
GET	/api/auth/profile	✅	Get current user profile
PUT	/api/auth/profile	✅	Update profile (name, image, etc.)
POST	/api/auth/add-semester	✅	Add semester record (courses, GPA)
DELETE	/api/auth/delete-semester	✅	Delete semester record
POST	/api/upload	✅	Upload profile picture to Cloudinary
POST	/api/ai-chat	—	Send message to AI assistant
Example Request (Login)
bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@buitms.edu.pk","password":"yourpassword"}'
🌐 Deployment
Deploy to Vercel (Recommended)
Push code to GitHub

Import project in Vercel

Go to vercel.com/new

Select your repository

Framework preset: Next.js (auto-detected)

Add environment variables

MONGO_URI — Your MongoDB connection string

JWT_SECRET — Secret for signing tokens

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

ANTHROPIC_API_KEY (optional)

Deploy

bash
vercel --prod
Manual Deployment
bash
npm run build
npm start
🔐 Environment Variables
Create a .env.local file with:

env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/buitems-portal

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (for profile images)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI Assistant (optional)
ANTHROPIC_API_KEY=sk-ant-your-key
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style (ESLint configured)

Use Tailwind CSS for styling

Keep API routes consistent with existing patterns

Test authentication flows before submitting

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgments
BUITEMS — For academic structure and inspiration

Anthropic — For Claude AI API

Cloudinary — For image hosting

Vercel — For seamless deployment platform

📞 Contact
Saad Saif
https://img.shields.io/badge/GitHub-M--Saad--saif-181717?logo=github

Project Link: https://github.com/M-Saad-saif/BuitemsPortal-Nextjs
