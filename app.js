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

    let isValid = true;

    // Check validation based on which step we are LEAVING (stepNumber is the step we are ENTERING)
    if (stepNumber === 2) {
        // Leaving Step 1. Check Q1 (Radio) and Q2 (Checkbox)
        const q1Checked = currentStepEl.querySelector('input[name="homeQ1Importance"]:checked');
        const q2Checked = currentStepEl.querySelectorAll('input[name="homeBenefitsOffer"]:checked');
        if (!q1Checked || q2Checked.length === 0) isValid = false;
    } else if (stepNumber === 3) {
        // Leaving Step 2. Check Q3, Q4, Q5 (all Radios)
        const q3Checked = currentStepEl.querySelector('input[name="homeQ3Reason"]:checked');
        const q4Checked = currentStepEl.querySelector('input[name="homeQ4Satisfaction"]:checked');
        const q5Checked = currentStepEl.querySelector('input[name="homeQ5Productivity"]:checked');
        if (!q3Checked || !q4Checked || !q5Checked) isValid = false;
    } else if (stepNumber === 4) {
        // Leaving Step 3. Check Q6 (Checkbox) and Q7 (Radio)
        const q6Checked = currentStepEl.querySelectorAll('input[name="homeChallenges"]:checked');
        const q7Checked = currentStepEl.querySelector('input[name="homeQ7Expansion"]:checked');
        if (q6Checked.length === 0 || !q7Checked) isValid = false;
    }

    if (!isValid) {
        alert('Please answer all questions on this step before proceeding.');
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

    // Update progress bar UI (4-step scale: 25%, 50%, 75%, 100%)
    const percent = (stepNumber / 4) * 100;
    const progressText = document.getElementById('survey-progress-text');
    const progressBar = document.getElementById('survey-progress-bar');
    if (progressText) progressText.innerText = `Step ${stepNumber} of 4`;
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
    const percent = (stepNumber / 4) * 100;
    const progressText = document.getElementById('survey-progress-text');
    const progressBar = document.getElementById('survey-progress-bar');
    if (progressText) progressText.innerText = `Step ${stepNumber} of 4`;
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

    // Check answers for personalized feedback
    const offersNone = document.querySelector('input[name="homeBenefitsOffer"][value="none"]:checked');
    const hasChallenges = document.querySelector('input[name="homeChallenges"][value="complex-regulations"]:checked') ||
                          document.querySelector('input[name="homeChallenges"][value="admin-burden"]:checked');
    const plansExpand = document.querySelector('input[name="homeQ7Expansion"][value="yes-definitely"]:checked');

    let riskMessage = "";
    if (offersNone) {
        riskMessage = "IMMEDIATE ADVISORY RECOMMENDED: Operating without ESI, EPF, or group insurance benefits exposes your business to audits and penalties under labor policies once statutory employee thresholds are met. Bharat HR Ventures will contact you immediately to map out a secure compliance setup.";
    } else if (hasChallenges) {
        riskMessage = "OPTIMIZATION PROFILE: Navigating complex regulations and high administrative burdens is a common roadblock. We specialize in complete statutory takeover (filing, returns, and dispute resolution), reducing your operational overhead by up to 90%.";
    } else if (plansExpand) {
        riskMessage = "EXPANSION AUDIT ESTIMATE: Since you plan to expand benefits in the next year, we will help you deploy ESI/EPF structures, coordinate cashless group insurance products, and ensure all filings are aligned with statutory requirements.";
    } else {
        riskMessage = "COMPLIANCE SCORE: Your baseline registrations appear active. We will connect with you to review your monthly returns and audit your files for operational and statutory efficiency.";
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
