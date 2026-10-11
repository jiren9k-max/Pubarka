document.documentElement.classList.add("js");

// Header: solid background once the page scrolls.
const header = document.querySelector("[data-header]");
const syncHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

// Mobile menu.
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Zatvori meni" : "Otvori meni");
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
};
if (toggle && nav) {
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => event.key === "Escape" && setMenu(false));
}

// Reveal on scroll, staggered within each parent.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((child) => child.classList.contains("reveal"));
    item.style.setProperty("--delay", `${Math.min(siblings.indexOf(item), 5) * 0.08}s`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Open / closed status in Sarajevo time. Index = weekday (0 = Sunday), values in minutes.
const hours = [
  [15 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
  [8 * 60, 23 * 60 + 30],
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n) => String(n).padStart(2, "0");
const formatTime = (minutes) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

const sarajevoNow = () => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Sarajevo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value]),
  );
  return { day: weekdays.indexOf(parts.weekday), minutes: Number(parts.hour) * 60 + Number(parts.minute) };
};

const updateStatus = () => {
  const { day, minutes } = sarajevoNow();
  const [opens, closes] = hours[day];
  const isOpen = minutes >= opens && minutes < closes;
  const text = isOpen
    ? `Otvoreno · do ${formatTime(closes)}`
    : minutes < opens
      ? `Zatvoreno · otvaramo u ${formatTime(opens)}`
      : `Zatvoreno · sutra od ${formatTime(hours[(day + 1) % 7][0])}`;

  document.querySelectorAll("[data-open-status]").forEach((element) => {
    element.textContent = text;
    element.classList.toggle("is-open", isOpen);
    element.hidden = false;
  });
  document.querySelectorAll("[data-days]").forEach((row) => {
    row.classList.toggle("is-today", row.dataset.days.split(",").map(Number).includes(day));
  });
};
updateStatus();
setInterval(updateStatus, 60 * 1000);

document.querySelectorAll("[data-year]").forEach((element) => (element.textContent = String(new Date().getFullYear())));
