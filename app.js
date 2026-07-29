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
