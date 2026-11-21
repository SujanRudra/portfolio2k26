
// ==============================
// TYPEWRITER EFFECT
// ==============================

const changingText = document.getElementById("changingText");

const roles = [
    "Aspiring Developer",
    "Problem Solver",
    "Tech Enthusiast",
    "Creative Thinker"
];

let roleIndex = 0;
let charIndex = 0;

let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    // Add or remove one character
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    // Display the text
    changingText.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    // When typing is complete
    if (!isDeleting && charIndex === currentRole.length) {

        speed = 1500; // Pause before deleting
        isDeleting = true;

    }

    // When deleting is complete
    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        speed = 400; // Pause before next word
    }

    setTimeout(typeEffect, speed);
}

// Start animation
typeEffect();


// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    menuToggle.textContent =
        navLinks.classList.contains("show") ? "✕" : "☰";

});


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";

    });

});



// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});


// ==============================
// DYNAMIC PAGE NAVIGATION
// ==============================

// Get all main sections
const pageSections = document.querySelectorAll("main > section");

// Get navbar links
const activeNavLinks = document.querySelectorAll(".nav-links a");

// Add a class to identify portfolio pages
pageSections.forEach(section => {
    section.classList.add("portfolio-page");
});


// Function to switch pages
function showPage(pageId, updateHistory = true) {

    const targetPage = Array.from(pageSections)
        .find(section => section.id === pageId);

    // Fallback to Home if the requested page doesn't exist
    const selectedPage = targetPage || pageSections[0];

    if (!selectedPage) return;

    // Show selected section and hide the others
    pageSections.forEach(section => {
        section.classList.toggle(
            "active-page",
            section === selectedPage
        );
    });

    // Update active navbar link
    activeNavLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${selectedPage.id}`
        );
    });

    // Close mobile navigation
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";

    // Return to the top of the page
    window.scrollTo(0, 0);

    // Update browser URL
    if (
        updateHistory &&
        window.location.hash !== `#${selectedPage.id}`
    ) {
        history.pushState(null, "", `#${selectedPage.id}`);
    }
}


// Handle clicks on internal section links
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const pageId = link.getAttribute("href").substring(1);

        const targetExists = Array.from(pageSections)
            .some(section => section.id === pageId);

        if (!targetExists) return;

        event.preventDefault();

        showPage(pageId);

    });

});


// Support browser Back and Forward buttons
window.addEventListener("popstate", () => {

    const pageId = window.location.hash.substring(1);

    showPage(pageId, false);

});


// Display the requested page when the website opens
const initialPage = window.location.hash.substring(1);

showPage(initialPage || "home", false);
