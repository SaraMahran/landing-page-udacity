/**
 * Define Global Variables
 */
const sections = document.querySelectorAll("section");
const navbarList = document.getElementById("navbar__list");
let scrollTimeout; // To handle the scroll hiding

/**
 * Helper Functions
 */

// Check if section is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= window.innerHeight / 2;
}

/**
 * Main Functions
 */

// Build the navigation menu
function buildNavigation() {
  sections.forEach((section) => {
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");

    navLink.textContent = section.getAttribute("data-nav");
    navLink.href = `#${section.id}`;
    navLink.classList.add("menu__link");

    navItem.appendChild(navLink);
    navbarList.appendChild(navItem);
  });
}

// Set active class on section and link
function setActiveSection() {
  sections.forEach((section) => {
    const link = document.querySelector(`a[href="#${section.id}"]`);
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      link.classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      link.classList.remove("active");
    }
  });
}

// Scroll smoothly to section
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.nodeName === "A") {
    const sectionId = event.target.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Show scroll-to-top button when scrolling down
function toggleScrollToTopButton() {
  const scrollButton = document.getElementById("scroll-to-top");
  if (window.scrollY > window.innerHeight) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
}

// Hide navbar when not scrolling
function hideNavbarOnIdle() {
  document.querySelector(".navbar__menu").classList.remove("hidden");
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.querySelector(".navbar__menu").classList.add("hidden");
  }, 2000);
}

// Scroll to top of page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle section collapse
function toggleSectionCollapse(event) {
  if (event.target.nodeName === "H2") {
    const sectionContent = event.target.nextElementSibling;
    sectionContent.classList.toggle("collapsed");
  }
}

/**
 * Events
 */

// Build menu on page load
document.addEventListener("DOMContentLoaded", () => {
  buildNavigation();

  // Create scroll-to-top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.id = "scroll-to-top";
  scrollToTopBtn.textContent = "Top";
  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.body.appendChild(scrollToTopBtn);
});

// Scroll to section on link click
navbarList.addEventListener("click", scrollToSection);

// Set section as active on scroll
window.addEventListener("scroll", () => {
  setActiveSection();
  toggleScrollToTopButton();
  hideNavbarOnIdle();
});

// Toggle section collapse on header click
sections.forEach((section) => {
  section.querySelector("h2").addEventListener("click", toggleSectionCollapse);
});
