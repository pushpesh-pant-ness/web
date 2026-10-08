(function () {
  "use strict";

  /* ---------- Dark mode toggle (theme already applied early by head/custom.html) ---------- */
  var THEME_KEY = "theme-preference";
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#1b1d21" : "#ffffff");
  }

  var themeToggle = document.createElement("button");
  themeToggle.id = "theme-toggle";
  themeToggle.type = "button";
  themeToggle.setAttribute("aria-label", "Toggle dark mode");
  themeToggle.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
  themeToggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  });
  document.body.appendChild(themeToggle);

  /* ---------- Back to top ---------- */
  var backToTop = document.createElement("button");
  backToTop.id = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("is-visible", window.scrollY > 400);
  });

  /* ---------- Project tag filter ---------- */
  var filterBar = document.getElementById("tag-filter");
  if (filterBar) {
    var cards = document.querySelectorAll(".project-card");
    var noResults = document.getElementById("no-results-msg");

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".tag-filter-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".tag-filter-btn").forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      var tag = btn.getAttribute("data-tag");
      var visibleCount = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(",");
        var show = tag === "all" || tags.indexOf(tag) !== -1;
        card.hidden = !show;
        if (show) visibleCount++;
      });
      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  }

  /* ---------- Timeline show more ---------- */
  var timelineToggle = document.getElementById("timeline-toggle");
  if (timelineToggle) {
    var collapsibleItems = document.querySelectorAll(".timeline-item--collapsible");
    collapsibleItems.forEach(function (item) {
      item.classList.add("is-collapsed");
    });
    timelineToggle.setAttribute("aria-expanded", "false");

    timelineToggle.addEventListener("click", function () {
      var expanded = timelineToggle.getAttribute("aria-expanded") === "true";
      collapsibleItems.forEach(function (item) {
        item.classList.toggle("is-collapsed", expanded);
      });
      timelineToggle.setAttribute("aria-expanded", String(!expanded));
      timelineToggle.textContent = expanded ? "Show earlier roles" : "Show less";
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(".project-card, .skill-badge, .timeline-item");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
})();
