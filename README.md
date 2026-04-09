# 🚀 AI-Powered Video SaaS Platform

An AI-driven SaaS application that allows users to upload videos, process them using cloud-based transformations, and generate intelligent insights like summaries and captions.

Built using modern full-stack technologies like Next.js, Prisma, NeonDB, and Cloudinary.

---

## 📌 Features

- 🔐 User Authentication (Signup/Login)
- 📤 Upload Videos & Images
- ☁️ Cloud storage using Cloudinary
- 🎬 Media transformations (resize, optimize, thumbnails)
- 📊 Dashboard to manage content
- ⚡ Fast and scalable backend

---

## 🏗️ Tech Stack

**Frontend:**
- Next.js  
- Tailwind CSS  

**Backend:**
- Next.js API Routes  
- Prisma ORM  

**Database:**
- NeonDB (PostgreSQL)  

**Cloud & Media:**
- Cloudinary  

**AI Integration:**
- OpenAI API  

---

## 📁 Folder Structure

```
app/
components/
lib/
prisma/
public/
actions/
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ayush09-disci/ai-image-transform-saas.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
DATABASE_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

OPENAI_API_KEY=
```

---

### 4. Run database migration
```bash
npx prisma migrate dev
```

---

### 5. Start development server
```bash
npm run dev
```

---

## 🧠 Key Learnings

- Building scalable SaaS applications  
- Integrating AI into real-world apps  
- Handling media uploads & transformations  
- Using Prisma ORM with PostgreSQL  
- Backend development with Next.js API routes  

---

## 📸 Screenshots

Add screenshots of:
- Dashboard  
- Upload page  
- AI results  

---

## 🚀 Future Improvements

- 🎥 Real-time processing  
- 📈 Improved dashboard  
- 💳 Payment integration (Stripe)  
