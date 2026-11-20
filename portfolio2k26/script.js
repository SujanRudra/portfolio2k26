
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
// ACTIVE NAVIGATION ON SCROLL
// ==============================

const sections = document.querySelectorAll("main section");
const activeNavLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop - 150 &&
            window.scrollY < sectionTop + sectionHeight - 150
        ) {
            current = section.getAttribute("id");
        }

    });

    activeNavLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});