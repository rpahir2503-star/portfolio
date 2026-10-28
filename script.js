/**
 * Rohit Ahir - Portfolio Scripts
 * Handles Theme Toggling, Project Live Search/Filtering, and Contact Form.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Desktop & Mobile)
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      if (themeIcon) themeIcon.textContent = "\u2600"; // Sun icon
      if (themeText) themeText.textContent = "Light";
    } else {
      if (themeIcon) themeIcon.textContent = "\u263D"; // Moon icon
      if (themeText) themeText.textContent = "Dark";
    }
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {}

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", !expanded);
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Project Search & Filter (Task 3)
  const searchInput = document.getElementById("projectSearch");
  const clearSearchBtn = document.getElementById("clearSearch");
  const filterPills = document.querySelectorAll(".pill-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const projectsCount = document.getElementById("projectsCount");
  const noProjectsNotice = document.getElementById("noProjectsNotice");

  let activeCategory = "all";
  let activeSearchTerm = "";

  function filterProjects() {
    const term = activeSearchTerm.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
      const name = (card.querySelector(".project-name")?.textContent || "").toLowerCase();
      const summary = (card.querySelector(".project-summary")?.textContent || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const category = (card.getAttribute("data-category") || "").toLowerCase();

      // Category matching
      const matchesCategory = (activeCategory === "all") || category.includes(activeCategory);

      // Search term matching (across name, description, and tags)
      const matchesSearch = !term ||
        name.includes(term) ||
        summary.includes(term) ||
        tags.includes(term);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update count indicator
    if (projectsCount) {
      projectsCount.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
    }

    // Empty state
    if (noProjectsNotice) {
      noProjectsNotice.style.display = visibleCount === 0 ? "block" : "none";
    }

    // Toggle clear button
    if (clearSearchBtn) {
      clearSearchBtn.style.display = term.length > 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearchTerm = e.target.value;
      filterProjects();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      activeSearchTerm = "";
      filterProjects();
      searchInput.focus();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      filterProjects();
    });
  });

  // Initialize filter state and dynamic counter on page load
  filterProjects();

  // 5. Contact Form Handler (Opens visitor email client)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const RECEIVING_EMAIL = "rpahir2503@2006";

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get("name");
      const senderEmail = data.get("email");
      const message = data.get("message");

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(
        `Hi Rohit,\n\n${message}\n\nFrom: ${name} (${senderEmail})`
      );

      window.location.href = `mailto:${RECEIVING_EMAIL}?subject=${subject}&body=${body}`;
      if (formStatus) {
        formStatus.textContent = "Opening your default email application...";
      }
      contactForm.reset();
    });
  }

  // 6. Live Weather Updates (Open-Meteo API)
  const weatherBody = document.getElementById("weatherBody");
  const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto";

  function weatherFromCode(code) {
    const map = {
      0: { label: "Clear sky", icon: "\u2600" },
      1: { label: "Mainly clear", icon: "\u26C5" },
      2: { label: "Partly cloudy", icon: "\u26C5" },
      3: { label: "Overcast", icon: "\u2601" },
      45: { label: "Fog", icon: "\u2591" },
      48: { label: "Rime fog", icon: "\u2591" },
      51: { label: "Light drizzle", icon: "\u2614" },
      53: { label: "Drizzle", icon: "\u2614" },
      55: { label: "Dense drizzle", icon: "\u2614" },
      61: { label: "Slight rain", icon: "\u2614" },
      63: { label: "Rain", icon: "\u2614" },
      65: { label: "Heavy rain", icon: "\u2614" },
      71: { label: "Slight snow", icon: "\u2744" },
      73: { label: "Snow", icon: "\u2744" },
      75: { label: "Heavy snow", icon: "\u2744" },
      80: { label: "Rain showers", icon: "\u2614" },
      81: { label: "Rain showers", icon: "\u2614" },
      82: { label: "Violent rain showers", icon: "\u2614" },
      95: { label: "Thunderstorm", icon: "\u26A1" },
      96: { label: "Thunderstorm with hail", icon: "\u26A1" },
      99: { label: "Thunderstorm with hail", icon: "\u26A1" }
    };
    return map[code] || { label: "Weather update", icon: "\u2601" };
  }

  function formatWeatherTime(isoTime) {
    if (!isoTime) return "Just now";
    const date = new Date(isoTime);
    if (Number.isNaN(date.getTime())) return isoTime.replace("T", " ");
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  async function loadWeather() {
    if (!weatherBody) return;

    try {
      const response = await fetch(WEATHER_API);
      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();
      const current = data.current || {};
      const units = data.current_units || {};
      const condition = weatherFromCode(Number(current.weather_code));
      const tempUnit = units.temperature_2m || "°C";
      const humidityUnit = units.relative_humidity_2m || "%";
      const windUnit = units.wind_speed_10m || "km/h";
      const locationLabel = data.timezone
        ? data.timezone.replace("_", " ")
        : "Open-Meteo station";

      weatherBody.innerHTML = `
        <div class="weather-live">
          <div class="weather-temp-block">
            <div class="weather-icon" aria-hidden="true">${condition.icon}</div>
            <div>
              <div class="weather-temp">${Math.round(current.temperature_2m)}${tempUnit}</div>
              <p class="weather-condition">${condition.label}</p>
            </div>
          </div>
          <div class="weather-meta">
            <div class="weather-stat">
              <span class="weather-stat-label">Humidity</span>
              <span class="weather-stat-value">${current.relative_humidity_2m}${humidityUnit}</span>
            </div>
            <div class="weather-stat">
              <span class="weather-stat-label">Wind</span>
              <span class="weather-stat-value">${current.wind_speed_10m} ${windUnit}</span>
            </div>
            <div class="weather-stat">
              <span class="weather-stat-label">Location</span>
              <span class="weather-stat-value">${locationLabel}</span>
            </div>
            <p class="weather-updated">Updated ${formatWeatherTime(current.time)}</p>
          </div>
        </div>
      `;
    } catch (err) {
      weatherBody.innerHTML =
        '<p class="weather-status error">Live weather is unavailable right now. Please try again later.</p>';
    }
  }

  loadWeather();
});
