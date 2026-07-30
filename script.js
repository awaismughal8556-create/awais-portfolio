/* =====================================================
   AWAIS MUGHAL PORTFOLIO
   Professional JavaScript
===================================================== */

"use strict";

/* =====================================================
   ALWAYS OPEN ON THE HOME SECTION
   FIX: browsers can restore the last scroll position on reload, or
   jump straight to a section if the URL has a #hash. This forces
   the page to always start at the very top (Home) first.
===================================================== */

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}

window.scrollTo(0, 0);


/* =====================================================
   PRELOADER
===================================================== */

/* =====================================================
   PRELOADER
   FIX/ENHANCEMENT: previously hid the moment the "load" event fired,
   which on a light page can be near-instant — too fast to read the
   Bismillah text. Now it waits for whichever is later: the page
   finishing load, or a minimum 1.8s so it's always visible.
===================================================== */

const preloader = document.getElementById("preloader");
const MIN_PRELOADER_TIME = 2000;
const preloaderStart = Date.now();

function hidePreloader() {

    if (!preloader) return;

    const elapsed = Date.now() - preloaderStart;
    const remaining = Math.max(MIN_PRELOADER_TIME - elapsed, 0);

    setTimeout(() => {

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 500);

    }, remaining);

}

if (document.readyState === "complete") {

    hidePreloader();

} else {

    window.addEventListener("load", hidePreloader);

}


/* =====================================================
   FOOTER YEAR
   FIX: <span id="year"></span> existed in the HTML but nothing
   ever set its text, so the copyright line showed "© . All Rights
   Reserved." with a blank year.
===================================================== */

const yearSpan = document.getElementById("year");

if (yearSpan) {

    yearSpan.textContent = new Date().getFullYear();

}


/* =====================================================
   STICKY HEADER
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 100){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-menu");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
    });
}

if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}

document.querySelectorAll("#sidebar a").forEach(link=>{

link.onclick=()=>{

sidebar.classList.remove("active");

}

});


/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/* =====================================================
   ACTIVE MENU
===================================================== */

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(sec=>{

const top=window.scrollY;

const offset=sec.offsetTop-200;

const height=sec.offsetHeight;

if(top>=offset && top<offset+height){

current=sec.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

if (cursor && cursor2) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        cursor2.style.left = e.clientX + "px";
        cursor2.style.top = e.clientY + "px";

    });

}


/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

});


/* =====================================================
   THEME SWITCH
===================================================== */

const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("light-theme")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}


/* =====================================================
   TYPING EFFECT
===================================================== */

const typing = document.querySelector(".typing");

if (typing) {

    const words = [
        "Professional Web Developer",
        "Frontend Developer",
        "UI / UX Designer",
        "Freelancer",
        "Responsive Website Expert"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typing.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typing.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 50 : 100);

    }

    typeEffect();

}
/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 150;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target.toLocaleString();

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealItems = document.querySelectorAll(
".section, .service-card, .skill-card, .project-card, .certificate-card, .testimonial-card, .timeline-item, .counter-box"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => {

    item.classList.add("hidden");

    revealObserver.observe(item);

});


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons = document.querySelectorAll(".project-filter button");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(project => {

            if (filter === "all" || project.classList.contains(filter)) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});


/* =====================================================
   CONTACT FORM
   Sends the message directly to your inbox using EmailJS —
   no email app opens on the visitor's computer, and no backend
   server is needed.

   Fill in the 2 values below from your EmailJS dashboard:
   - Service ID  -> "Email Services" tab
   - Template ID -> "Email Templates" tab
   Your template's variables should match the form field names:
   {{name}}, {{email}}, {{subject}}, {{message}}
===================================================== */

const EMAILJS_PUBLIC_KEY = "-uiDSCvFKIZxWs6tO";
const EMAILJS_SERVICE_ID = "service_9swmduz";
const EMAILJS_TEMPLATE_ID = "template_sw6sv1b";

if (window.emailjs) {

    emailjs.init(EMAILJS_PUBLIC_KEY);

}

const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = contactForm ? contactForm.querySelector("button[type='submit']") : null;
const contactBtnDefaultText = contactSubmitBtn ? contactSubmitBtn.textContent.trim() : "";

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (contactSubmitBtn) {

            contactSubmitBtn.textContent = "Sending...";
            contactSubmitBtn.disabled = true;

        }

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)

            .then(() => {

                alert("✅ Aapka message bhej diya gaya hai. Shukriya!");

                contactForm.reset();

            })

            .catch(() => {

                alert("❌ Message send nahi ho saka. Dobara koshish karein.");

            })

            .finally(() => {

                if (contactSubmitBtn) {

                    contactSubmitBtn.textContent = contactBtnDefaultText;
                    contactSubmitBtn.disabled = false;

                }

            });

    });

}


/* =====================================================
   NEWSLETTER
===================================================== */

const newsletter = document.querySelector(".newsletter form");

if (newsletter) {

    newsletter.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input");

        if (email.value.trim() === "") {

            alert("Please enter your email.");

            return;

        }

        alert("✅ Successfully Subscribed!");

        this.reset();

    });

}
/* =====================================================
   TESTIMONIAL AUTO SLIDER
===================================================== */

const slider = document.querySelector(".testimonial-slider");

if (slider) {

    let index = 0;

    const cards = slider.children;

    if (cards.length > 1) {

        setInterval(() => {

            index++;

            if (index >= cards.length) {

                index = 0;

            }

            slider.scrollTo({

                left: cards[index].offsetLeft,

                behavior: "smooth"

            });

        }, 4000);

    }

}


/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* =====================================================
   SMOOTH SECTION SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* =====================================================
   IMAGE LAZY LOAD
===================================================== */

const lazyImages = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const img = entry.target;

            img.loading = "lazy";

            imageObserver.unobserve(img);

        }

    });

});

lazyImages.forEach(img => {

    imageObserver.observe(img);

});


/* =====================================================
   KEYBOARD SHORTCUT
===================================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log("%cAwais Mughal Portfolio",
"color:#d4af37;font-size:24px;font-weight:bold;");

console.log("%cDeveloped with HTML, CSS & JavaScript",
"color:white;font-size:14px;");
