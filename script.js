/* =========================
   ELEMENTS
========================= */
const toggle = document.getElementById("darkToggle");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
const progressBar = document.getElementById("progress-bar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-links");

/* =========================
   DARK MODE
========================= */
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================
   ACTIVE NAV LINK
========================= */
function setActiveLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

/* =========================
   SCROLL ANIMATION
========================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".project, .skills span").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   SCROLL EVENTS
========================= */
window.addEventListener("scroll", () => {
  setActiveLink();

  // Navbar shrink
  navbar.classList.toggle("shrink", window.scrollY > 80);

  // Scroll progress bar
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (window.scrollY / scrollHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

/* =========================
   HAMBURGER MENU
========================= */
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});


/* =========================
   SKILL PROGRESS ANIMATION
========================= */
const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".progress-bar");

let skillsAnimated = false;

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        progressBars.forEach(bar => {
          const value = bar.getAttribute("data-progress");
          bar.style.width = value + "%";
        });
        skillsAnimated = true;
      }
    });
  },
  { threshold: 0.4 }
);

skillObserver.observe(skillSection);



/* =========================
   SOFT SKILLS ANIMATION
========================= */
const softSkills = document.querySelectorAll(".soft-skill");

const softSkillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        softSkills.forEach((skill, index) => {
          setTimeout(() => {
            skill.classList.add("show");
          }, index * 150); // stagger effect
        });
        softSkillObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

softSkillObserver.observe(document.getElementById("soft-skills"));


window.addEventListener("scroll", () => {
  const photo = document.querySelector(".profile-photo");
  if (photo) {
    photo.style.transform = `translateY(${window.scrollY * 0.05}px) scale(1)`;
  }
});
