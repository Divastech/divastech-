(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));
  const form = document.getElementById("enquiry-form");
  if (form) {
    const topicField = form.querySelector('[name="topic"]');
    const requestedTopic = new URLSearchParams(window.location.search).get("topic");
    if (requestedTopic && topicField) {
      const match = Array.from(topicField.options).find(option =>
        option.text.toLowerCase().includes(requestedTopic.toLowerCase()) ||
        requestedTopic.toLowerCase().includes(option.text.toLowerCase())
      );
      if (match) topicField.value = match.value;
    }
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = ["Hello Divastech,", "", `My name is ${String(data.get("name")).trim()}.`,
        `I am interested in: ${String(data.get("topic")).trim()}.`, "", String(data.get("message")).trim()].join("\n");
      const url = `https://wa.me/2348022848628?text=${encodeURIComponent(message)}`;
      const status = document.getElementById("form-status");
      if (status) status.textContent = "Opening WhatsApp with your enquiry. Review it there and tap Send.";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();