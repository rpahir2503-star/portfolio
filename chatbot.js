/**
 * Rohit Ahir - AI Chatbot Client
 * Communicates with /api/chat (Vercel Serverless Function).
 * Contains fallback answers for offline / static previews.
 */

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const chatStatus = document.getElementById("chatStatus");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const suggestions = document.querySelectorAll(".sugg-chip");

  const conversationHistory = [];

  function appendMessage(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${role === "user" ? "chat-user" : "chat-assistant"}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Authentic fallback response generator for static or offline previews
  function getLocalFallback(query) {
    const q = query.toLowerCase().trim();

    if (q.includes("who are you") || q.includes("introduce") || q.includes("about you")) {
      return "I'm Rohit Ahir's AI portfolio assistant. Rohit is a 2nd-year B.Tech CSE (Core) student at JECRC University, Jaipur, focused on software engineering, web development, Python, and practical AI tools.";
    }
    if (q.includes("where do you study") || q.includes("college") || q.includes("university") || q.includes("education")) {
      return "Rohit studies at JECRC University in Jaipur, pursuing his B.Tech in Computer Science and Engineering (CSE Core), currently in his 2nd year with an expected graduation in 2029.";
    }
    if (q.includes("skill") || q.includes("technologies") || q.includes("stack")) {
      return "Rohit's skills include HTML, CSS, JavaScript, Python, C, C++, Git, GitHub, Web Development, and AI Tools.";
    }
    if (q.includes("what projects") || q.includes("completed") || q.includes("list projects") || q.includes("all projects")) {
      return "Rohit's portfolio showcases 8 projects including his coursework: 1) Interactive Quiz Application, 2) Book Reading List Application, 3) Bug Fixing Using Cursor AI, 4) Messy Python Code Improvement, 5) Python Programs Collection, 6) Personal Portfolio Website, 7) ArriveAI, and 8) Traffic Escape.";
    }
    if (q.includes("quiz") || q.includes("interactive quiz")) {
      return "The Interactive Quiz Application (Lecture 10) tests CS and AI concepts with dynamic question rendering, instant visual feedback, and score tracking. Live demo: https://quiz-rohit-5529.vercel.app | GitHub: https://github.com/rpahir2503-star/INTERACTIVE-QUIZ-APPLICATION";
    }
    if (q.includes("book") || q.includes("reading") || q.includes("booknest")) {
      return "The Book Reading List Application (Lecture 11) is a reading tracker with full CRUD actions, status management, live search, and LocalStorage persistence. Live demo: https://booknest-six-pearl.vercel.app | GitHub: https://github.com/rpahir2503-star/Book-Reading-list-application";
    }
    if (q.includes("cursor") || q.includes("bug fixing") || q.includes("average")) {
      return "The Bug Fixing Using Cursor AI project is a prompt engineering case study analyzing and resolving 3 runtime bugs (uninitialized variable, buffer overflow, integer truncation) in an array average algorithm using 3-step chain prompting. GitHub: https://github.com/rpahir2503-star/bug-fixing-using-cursor-ai";
    }
    if (q.includes("messy") || q.includes("refactor")) {
      return "The Messy Python Code Improvement project refactors unmodular code with cryptic variables into clean, tested, and documented Python using AI assistance. GitHub: https://github.com/rpahir2503-star/messy-python-code-improvement";
    }
    if (q.includes("python basics") || q.includes("python programs") || q.includes("colab")) {
      return "The Python Programs Collection features foundational programs converting C algorithms into Python (Factorial, Fibonacci, C-structure data mapping) in Google Colab. GitHub: https://github.com/rohit25bcon1143-oss/python-basics-1143";
    }
    if (q.includes("portfolio") || q.includes("portfoio") || q.includes("website")) {
      return "Rohit's Personal Portfolio Website is built with semantic HTML, CSS custom properties, dynamic search & filtering, live weather updates, and secure Groq API AI chatbot integration. Live demo: https://portfoio-website-kappa.vercel.app | GitHub: https://github.com/rpahir2503-star/portfoio-website";
    }
    if (q.includes("arrive") || q.includes("arriveai")) {
      return "ArriveAI is a SaaS prototype developed with Next.js and AI integrations that dispatches smart automated notifications when an order delivery is approaching.";
    }
    if (q.includes("traffic") || q.includes("escape") || q.includes("game")) {
      return "Traffic Escape is an engaging mobile-responsive puzzle game built with HTML5 and Canvas where players clear road congestion to navigate their car to safety.";
    }
    if (q.includes("github") || q.includes("repo") || q.includes("where is your github")) {
      return "You can find all of Rohit's projects and open-source repositories on his official GitHub profile: https://github.com/rpahir2503-star";
    }
    if (q.includes("email") || q.includes("contact")) {
      return "You can reach Rohit directly by email at rpahir2503@2006 or connect via his GitHub profile: https://github.com/rpahir2503-star";
    }

    // Default guardrail response
    return "I am Rohit Ahir's academic portfolio assistant, designed specifically to answer questions about his educational background, skills, and course projects. How can I help you learn more about his work?";
  }

  async function sendMessage(text) {
    const question = (text || userInput.value || "").trim();
    if (!question) return;

    appendMessage("user", question);
    userInput.value = "";
    userInput.disabled = true;
    sendButton.disabled = true;
    chatStatus.textContent = "AI is thinking...";

    conversationHistory.push({ role: "user", content: question });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          history: conversationHistory
        })
      });

      if (response.ok) {
        const data = await response.json();
        const answer = data.answer || "Thank you for asking!";
        appendMessage("assistant", answer);
        conversationHistory.push({ role: "assistant", content: answer });
      } else {
        // If serverless endpoint is unavailable (e.g. static preview or local static server)
        const errJson = await response.json().catch(() => ({}));
        if (errJson.error && errJson.error.includes("GROQ_API_KEY")) {
          appendMessage("assistant", `[Server Notice]: ${errJson.error}\n\n${getLocalFallback(question)}`);
        } else {
          const fallback = getLocalFallback(question);
          appendMessage("assistant", fallback);
          conversationHistory.push({ role: "assistant", content: fallback });
        }
      }
    } catch (err) {
      console.warn("API request fallback:", err.message);
      const fallback = getLocalFallback(question);
      appendMessage("assistant", fallback);
      conversationHistory.push({ role: "assistant", content: fallback });
    } finally {
      userInput.disabled = false;
      sendButton.disabled = false;
      chatStatus.textContent = "";
      userInput.focus();
    }
  }

  if (sendButton) {
    sendButton.addEventListener("click", () => sendMessage());
  }

  if (userInput) {
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Clickable suggested question chips
  suggestions.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.textContent.trim();
      userInput.value = q;
      sendMessage(q);
    });
  });

  // Clear chat button
  if (clearChatBtn) {
    clearChatBtn.addEventListener("click", () => {
      chatMessages.innerHTML = `
        <div class="chat-message chat-assistant">
          Chat cleared. Ask me anything about Rohit Ahir's background, skills, or projects!
        </div>
      `;
      conversationHistory.length = 0;
      chatStatus.textContent = "";
    });
  }
});
