console.log("Portfolio Website Started...");

const topBtn = document.getElementById("topBtn");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Scroll-to-top button show/hide
window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// Highlight active nav link on scroll
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Animated counters
const counters = document.querySelectorAll(".count");
counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCounter();
});

// EmailJS Initialize
emailjs.init({
    publicKey: "-uiDSCvFKIZxWs6tO",
});

const contactForm = document.getElementById("contactForm");
const btn = document.querySelector("#contactForm button");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = "Sending...";

    emailjs.send("service_9swmduz", "template_sw6sv1b", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    })
    .then(function () {
        btn.innerText = "✅ Message Sent";
        contactForm.reset();
        setTimeout(function () {
            btn.disabled = false;
            btn.innerText = "Send Message";
        }, 2000);
    })
    .catch(function (error) {
        console.error(error);
        btn.innerText = "❌ Failed";
        setTimeout(function () {
            btn.disabled = false;
            btn.innerText = "Send Message";
        }, 2000);
    });
});

// Splash Screen
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("splash").style.display = "none";
    }, 3000);
});
