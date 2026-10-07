/* =========================================================
   ABHIRAJ SINH JADEJA — PERSONAL PORTFOLIO
   Simple JavaScript for mobile-friendly interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Mobile navigation */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (
                navMenu.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }

    /* Active navigation highlighting */
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.getAttribute("id");

                    navigationLinks.forEach((link) => {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }
                    });
                });
            },
            {
                root: null,
                threshold: 0.15,
                rootMargin: "-20% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-intro, " +
        ".about-content, " +
        ".education-card, " +
        ".interest-card, " +
        ".strength-card, " +
        ".goal-card, " +
        ".contact-message, " +
        ".contact-item"
    );

    if ("IntersectionObserver" in window) {
        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    /* Current year */
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* Escape key closes menu */
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("active")
        ) {
            navMenu.classList.remove("active");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
                menuToggle.focus();
            }
        }
    });
});
