document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // STICKY NAVBAR & ACTIVE NAV LINK HIGHLIGHTING
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky class on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active link based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset for sticky nav
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE MENU
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle burger / close icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ==========================================================================
    // B-H-A-R-A-T PROCESS TABS INTERACTIVITY
    // ==========================================================================
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');
    const displayCards = document.querySelectorAll('.bharat-card');

    alphabetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Deactivate all buttons
            alphabetButtons.forEach(btn => btn.classList.remove('active'));
            // Activate clicked button
            button.classList.add('active');

            // Fade out active cards and show targeted card
            displayCards.forEach(card => {
                if (card.classList.contains('active')) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.classList.remove('active');
                        
                        // Activate new card
                        const targetCard = document.getElementById(targetId);
                        targetCard.classList.add('active');
                        // Tiny delay to trigger CSS transition
                        setTimeout(() => {
                            targetCard.style.opacity = '1';
                            targetCard.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // SCROLL REVEAL EFFECT ON LOAD / SCROLL
    // ==========================================================================
    const revealElements = [
        ...document.querySelectorAll('.stat-card'),
        ...document.querySelectorAll('.service-box'),
        ...document.querySelectorAll('.scheme-card'),
        ...document.querySelectorAll('.benefit-item'),
        ...document.querySelectorAll('.timeline-step')
    ];

    // Add initial CSS for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial trigger for elements already in view
});

// ==========================================================================
// HOME EMBEDDED SURVEY CONTROLLER
// ==========================================================================
window.nextHomeStep = (stepNumber) => {
    const currentStepEl = document.querySelector('.home-survey-step.active-step');
    if (!currentStepEl) return;

    // Validate required radio inputs in current step
    const requiredRadios = currentStepEl.querySelectorAll('input[type="radio"][required]');
    let isValid = true;
    
    requiredRadios.forEach(radio => {
        const name = radio.name;
        const checked = currentStepEl.querySelector(`input[name="${name}"]:checked`);
        if (!checked) isValid = false;
    });

    if (!isValid) {
        alert('Please answer the required questions before proceeding.');
        return;
    }

    // Hide all steps
    document.querySelectorAll('.home-survey-step').forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active-step');
    });

    // Show targeted step
    const targetStepEl = document.getElementById(`home-step-${stepNumber}`);
    if (targetStepEl) {
        targetStepEl.style.display = 'block';
        targetStepEl.classList.add('active-step');
    }

    // Update progress bar UI
    const percent = stepNumber === 2 ? 66 : 100;
    const progressText = document.getElementById('survey-progress-text');
    const progressBar = document.getElementById('survey-progress-bar');
    if (progressText) progressText.innerText = `Step ${stepNumber} of 3`;
    if (progressBar) progressBar.style.width = `${percent}%`;
};

window.prevHomeStep = (stepNumber) => {
    // Hide all steps
    document.querySelectorAll('.home-survey-step').forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active-step');
    });

    // Show targeted step
    const targetStepEl = document.getElementById(`home-step-${stepNumber}`);
    if (targetStepEl) {
        targetStepEl.style.display = 'block';
        targetStepEl.classList.add('active-step');
    }

    // Update progress bar UI
    const percent = stepNumber === 1 ? 33 : 66;
    const progressText = document.getElementById('survey-progress-text');
    const progressBar = document.getElementById('survey-progress-bar');
    if (progressText) progressText.innerText = `Step ${stepNumber} of 3`;
    if (progressBar) progressBar.style.width = `${percent}%`;
};

window.submitHomeSurvey = (event) => {
    event.preventDefault();

    // Verify fields
    const company = document.getElementById('homeCompanyName').value;
    const name = document.getElementById('homeContactName').value;
    const email = document.getElementById('homeContactEmail').value;
    const phoneCode = document.getElementById('homeCountryCode').value;
    const phoneNum = document.getElementById('homePhone').value;

    const workforce = document.querySelector('input[name="homeWorkforceSize"]:checked').value;
    const status = document.querySelector('input[name="homeEsiPfStatus"]:checked').value;

    // Build risk estimate feedback message
    let riskMessage = "";
    if (workforce === "20-or-more" && status === "neither") {
        riskMessage = "CRITICAL LEGAL RISK: Establishments with 20 or more employees are legally mandated to register for EPF under Indian labor laws. Operating without ESI/PF registers can invite penal interest and damages. Bharat HR Ventures will contact you immediately to file your registration and protect your enterprise.";
    } else if (workforce === "10-19" && (status === "neither" || status === "pf-only")) {
        riskMessage = "MODERATE RISK: Establishments with 10 or more employees are required to comply with ESI laws. You are vulnerable to compliance audits. We recommend implementing ESI coverage immediately.";
    } else {
        riskMessage = "COMPLIANT STATUS: Your baseline registrations appear secure. We will review your payroll and monthly filing processes to identify opportunities to optimize employee insurance claims and reduce overheads.";
    }

    // Show feedback and toggle screens
    const feedbackEl = document.getElementById('home-assessment-feedback');
    if (feedbackEl) feedbackEl.innerText = riskMessage;

    // Hide progress bar and form
    const progressContainer = document.querySelector('.survey-progress-container');
    const formEl = document.getElementById('homeSurveyForm');
    const thankYouEl = document.getElementById('home-thank-you');

    if (progressContainer) progressContainer.style.display = 'none';
    if (formEl) formEl.style.display = 'none';
    if (thankYouEl) thankYouEl.style.display = 'block';
};
