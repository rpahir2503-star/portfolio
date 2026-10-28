# Personal Portfolio Website with API-Based Chatbot Integration

An individual practical **Internal Assessment** project developed for the Computer Science & Engineering curriculum at JECRC University by **Rohit Ahir**.

- **Author**: Rohit Ahir
- **College**: JECRC University, Jaipur, Rajasthan
- **Degree**: B.Tech in Computer Science and Engineering (CSE Core)
- **Current Year**: 2nd Year
- **Expected Graduation**: 2029
- **Email**: [rpahir2503@2006](mailto:rpahir2503@2006)
- **GitHub Profile**: [https://github.com/rpahir2503-star](https://github.com/rpahir2503-star)
- **Live Deployed Portfolio (Vercel)**: [https://personal-portfolio-iota-six-33.vercel.app](https://personal-portfolio-iota-six-33.vercel.app)

---

## 1. Project Overview
This repository contains a personalized, responsive portfolio website showcasing featured projects completed during the semester. The website incorporates modern UI/UX design, mobile responsiveness, a persistent light/dark mode toggle, an interactive project search and filter engine, and a secure API-based chatbot integrated with Groq.

---

## 2. Featured Projects & Coursework Repositories

| # | Project Name | Description | Technologies | Links |
|:---:|:---|:---|:---|:---|
| **1** | **Interactive Quiz Application** | Responsive CS & AI quiz application developed in Lecture 10 testing computer science and AI concepts with dynamic question rendering, instant visual feedback, and score tracking. | HTML5, CSS3, JavaScript, Web Development | [GitHub Repository](https://github.com/rpahir2503-star/INTERACTIVE-QUIZ-APPLICATION) &bull; [Live Demo](https://quiz-rohit-5529.vercel.app) |
| **2** | **Book Reading List Application** | Reading tracker application developed in Lecture 11 with full CRUD operations, reading lifecycle statuses (Want to Read, Currently Reading, Completed), live search, multi-status filtering, and LocalStorage persistence. | HTML5, CSS3, JavaScript, LocalStorage | [GitHub Repository](https://github.com/rpahir2503-star/Book-Reading-list-application) &bull; [Live Demo](https://booknest-six-pearl.vercel.app) |
| **3** | **Bug Fixing Using Cursor AI** | Practical software engineering case study identifying and fixing 3 runtime bugs (uninitialized accumulator, off-by-one buffer overflow, integer division truncation) in an array average algorithm using 3-step chain prompting in Cursor AI. | C, Python, Cursor AI, Prompt Engineering | [GitHub Repository](https://github.com/rpahir2503-star/bug-fixing-using-cursor-ai) |
| **4** | **Messy Python Code Improvement** | Practical case study refactoring and auditing program scripts using AI assistance, transforming unmodular code with cryptic variables into clean, documented, and test-verified Python implementations. | Python, C, AI Tools, Unit Testing | [GitHub Repository](https://github.com/rpahir2503-star/messy-python-code-improvement) |
| **5** | **Python Programs Collection** | Core Python programs converting traditional C algorithms into Python (Factorial calculation, Fibonacci series generator, and C-structure to Python-dictionary data mapping) developed in Google Colab. | Python, C, Google Colab, Algorithms | [GitHub Repository](https://github.com/rohit25bcon1143-oss/python-basics-1143) |
| **6** | **Portfolio Website & AI Assistant** | Modern responsive academic portfolio website showcasing coursework projects with real-time search, dynamic category filtering, light/dark mode, Open-Meteo live weather updates, and secure Groq API AI chatbot integration. | HTML5, CSS3, JavaScript, Groq API, Vercel | [GitHub Repository](https://github.com/rpahir2503-star/portfoio-website) &bull; [Live Demo](https://portfoio-website-kappa.vercel.app) |
| **7** | **ArriveAI** | SaaS prototype that sends AI-powered notifications when a delivery is about to arrive. | Next.js, AI | SaaS Prototype |
| **8** | **Traffic Escape** | Mobile puzzle game where players navigate traffic and clear the road to free their car. | HTML5, Canvas | Mobile Game |

---

## 3. Implemented Features

### A. Dynamic Project Search & Filter (Task 3)
- Visitors can search projects in real time by **project name** or **technology** (e.g., `Python`, `Quiz`, `Book`, `Cursor`, `AI`).
- Category filter buttons (`All`, `Python`, `Web Development`, `AI Tools`) allow instant domain filtering.
- A dynamic counter updates live based on the entered search term (*"Showing 8 of 8 projects"*).

### B. Light & Dark Mode Toggle (Task 3)
- Smooth toggle switch in the sticky header accessible on both desktop and mobile devices.
- Automatically respects system preferences (`prefers-color-scheme`) and persists user preference across sessions using `localStorage`.

### C. Secure AI Chatbot Integration (Task 6)
- Allows visitors to ask questions about Rohit's academic background at JECRC University, his skills, and coursework projects.
- **Strict Security Architecture**: Secret API keys are **never** bundled into frontend client JavaScript or committed to GitHub.
- Communicates with `/api/chat`, a secure **Vercel Serverless Function** reading `process.env.GROQ_API_KEY`.
- Includes suggested question chips for quick testing (*"Who are you?"*, *"Where do you study?"*, *"What are your skills?"*, *"What projects have you completed?"*, *"Tell me about the Interactive Quiz Application"*, *"What is the Book Reading List Application?"*, *"Where can I find your GitHub?"*).
- Includes graceful client fallback handling for local static demonstrations.

---

## 4. Technologies Used
- **Frontend**: Semantic HTML5, CSS3 (Custom CSS variables, Grid, Flexbox, media queries), Vanilla JavaScript (ES6+).
- **Backend / Serverless**: Node.js Serverless Function (`api/chat.js`) on Vercel.
- **AI API**: Groq API (`openai/gpt-oss-20b`) with role-based system prompts.
- **Typography**: Google Fonts (`Bricolage Grotesque` and `IBM Plex Sans`).
- **DevOps & Hosting**: Git, GitHub, Vercel CLI, GitHub Pages.

---

## 5. Local Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/rpahir2503-star/personal-portfolio.git
cd personal-portfolio
```

### Step 2: Running Frontend Locally
To view the frontend pages and interactive filters:
```bash
npx serve .
# Or using Python:
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Step 3: Running with Local Vercel Serverless Function (Optional)
To test the live Groq backend server locally:
```bash
# Add your GROQ_API_KEY to .env.local (this file is ignored by git)
echo GROQ_API_KEY=your_groq_api_key_here > .env.local

# Run Vercel development server
npx vercel dev
```

---

## 6. Vercel Deployment & Environment Variables

When deploying this project to Vercel:

1. **Import the repository** into Vercel from GitHub (`rpahir2503-star/personal-portfolio`).
2. **Add Environment Variable**:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your private Groq API key (`gsk_...`)
3. **Deploy**: Vercel automatically deploys both the static assets and the serverless `/api/chat` route.

---

## 7. Author Information
- **Rohit Ahir** (2nd Year B.Tech CSE Core)
- Department of Computer Science & Engineering, JECRC University, Jaipur
- Email: [rpahir2503@2006](mailto:rpahir2503@2006)
- GitHub: [@rpahir2503-star](https://github.com/rpahir2503-star)
