Feedback Collector 📝
A simple full-stack feedback collection app where users can submit their name, email, and a message. Admins (or developers) can toggle to view all submissions.

🚀 Live Demo
Frontend (vercel): https://feed-back-frontend.vercel.app/

Backend (Render): https://feedback-backeng.onrender.com

📂 Repositories
Frontend Repository: https://github.com/ShivamG1979/FeedBack_Frontend

Backend Repository: https://github.com/ShivamG1979/FeedBack_Backeng

📦 Tech Stack
Frontend
Framework: React (Vite or Next.js)

Styling: Bootstrap 5

Deployment: Netlify

Features:

Form validation (name, email, message)

Loading state on submission

Admin view toggle for feedback list

Responsive design

Footer watermark with full name and submission info

Backend
Platform: Render (Node.js/Express or similar)

Endpoints:

POST /submit-feedback — Store a new feedback

GET /feedbacks — Retrieve all feedbacks

Data storage: JSON-based (in-memory or lightweight DB like SQLite, JSON file, or mock DB)

⚙️ Setup & Deployment
1. Frontend (vercel)
Setup
cd frontend
npm install
npm run dev
Deploy
Push to GitHub

Connect vercel to your GitHub repo

Deploy!

2. Backend (Render)
Setup
cd backend
npm install
node server.js
Deploy
Push backend to a separate GitHub repo (or a subfolder)

Connect the repo to Render.com

Set build & start commands:

Build command: npm install

Start command: node server.js

Ensure CORS is enabled to allow frontend access

✨ Features
 Clean UI with Bootstrap 5

 Responsive design (mobile-first)

 Form-level validation

 Loading state on submit

 Toggleable admin view for feedback

 Timestamp included for each feedback

 Dark/Light theme toggle (bonus)

 Watermark footer with your name

🧑‍💻 Author
Built by Your Full Name
Footer credit visible on the live app
Submission for Candidate Task — Feedback Collector

📜 License
This project is licensed under the MIT License.