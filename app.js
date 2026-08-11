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

    // ==========================================================================
    // DYNAMIC COMPREHENSIVE COUNTRY PHONE CODES POPULATION
    // ==========================================================================
    const countryCodes = [
        { name: "Afghanistan", code: "+93" },
        { name: "Albania", code: "+355" },
        { name: "Algeria", code: "+213" },
        { name: "Andorra", code: "+376" },
        { name: "Angola", code: "+244" },
        { name: "Antigua and Barbuda", code: "+1" },
        { name: "Argentina", code: "+54" },
        { name: "Armenia", code: "+374" },
        { name: "Australia", code: "+61" },
        { name: "Austria", code: "+43" },
        { name: "Azerbaijan", code: "+994" },
        { name: "Bahamas", code: "+1" },
        { name: "Bahrain", code: "+973" },
        { name: "Bangladesh", code: "+880" },
        { name: "Barbados", code: "+1" },
        { name: "Belarus", code: "+375" },
        { name: "Belgium", code: "+32" },
        { name: "Belize", code: "+501" },
        { name: "Benin", code: "+229" },
        { name: "Bhutan", code: "+975" },
        { name: "Bolivia", code: "+591" },
        { name: "Bosnia and Herzegovina", code: "+387" },
        { name: "Botswana", code: "+267" },
        { name: "Brazil", code: "+55" },
        { name: "Brunei", code: "+673" },
        { name: "Bulgaria", code: "+359" },
        { name: "Burkina Faso", code: "+226" },
        { name: "Burundi", code: "+257" },
        { name: "Cambodia", code: "+855" },
        { name: "Cameroon", code: "+237" },
        { name: "Canada", code: "+1" },
        { name: "Cape Verde", code: "+238" },
        { name: "Central African Republic", code: "+236" },
        { name: "Chad", code: "+235" },
        { name: "Chile", code: "+56" },
        { name: "China", code: "+86" },
        { name: "Colombia", code: "+57" },
        { name: "Comoros", code: "+269" },
        { name: "Congo (DRC)", code: "+243" },
        { name: "Congo (Republic)", code: "+242" },
        { name: "Costa Rica", code: "+506" },
        { name: "Croatia", code: "+385" },
        { name: "Cuba", code: "+53" },
        { name: "Cyprus", code: "+357" },
        { name: "Czech Republic", code: "+420" },
        { name: "Denmark", code: "+45" },
        { name: "Djibouti", code: "+253" },
        { name: "Dominica", code: "+1" },
        { name: "Dominican Republic", code: "+1" },
        { name: "Ecuador", code: "+593" },
        { name: "Egypt", code: "+20" },
        { name: "El Salvador", code: "+503" },
        { name: "Equatorial Guinea", code: "+240" },
        { name: "Eritrea", code: "+291" },
        { name: "Estonia", code: "+372" },
        { name: "Eswatini", code: "+268" },
        { name: "Ethiopia", code: "+251" },
        { name: "Fiji", code: "+679" },
        { name: "Finland", code: "+358" },
        { name: "France", code: "+33" },
        { name: "Gabon", code: "+241" },
        { name: "Gambia", code: "+220" },
        { name: "Georgia", code: "+995" },
        { name: "Germany", code: "+49" },
        { name: "Ghana", code: "+233" },
        { name: "Greece", code: "+30" },
        { name: "Grenada", code: "+1" },
        { name: "Guatemala", code: "+502" },
        { name: "Guinea", code: "+224" },
        { name: "Guinea-Bissau", code: "+245" },
        { name: "Guyana", code: "+592" },
        { name: "Haiti", code: "+509" },
        { name: "Honduras", code: "+504" },
        { name: "Hong Kong", code: "+852" },
        { name: "Hungary", code: "+36" },
        { name: "Iceland", code: "+354" },
        { name: "India", code: "+91" },
        { name: "Indonesia", code: "+62" },
        { name: "Iran", code: "+98" },
        { name: "Iraq", code: "+964" },
        { name: "Ireland", code: "+353" },
        { name: "Israel", code: "+972" },
        { name: "Italy", code: "+39" },
        { name: "Jamaica", code: "+1" },
        { name: "Japan", code: "+81" },
        { name: "Jordan", code: "+962" },
        { name: "Kazakhstan", code: "+7" },
        { name: "Kenya", code: "+254" },
        { name: "Kiribati", code: "+686" },
        { name: "Korea, North", code: "+850" },
        { name: "Korea, South", code: "+82" },
        { name: "Kuwait", code: "+965" },
        { name: "Kyrgyzstan", code: "+996" },
        { name: "Laos", code: "+856" },
        { name: "Latvia", code: "+371" },
        { name: "Lebanon", code: "+961" },
        { name: "Lesotho", code: "+266" },
        { name: "Liberia", code: "+231" },
        { name: "Libya", code: "+218" },
        { name: "Liechtenstein", code: "+423" },
        { name: "Lithuania", code: "+370" },
        { name: "Luxembourg", code: "+352" },
        { name: "Macau", code: "+853" },
        { name: "Madagascar", code: "+261" },
        { name: "Malawi", code: "+265" },
        { name: "Malaysia", code: "+60" },
        { name: "Maldives", code: "+960" },
        { name: "Mali", code: "+223" },
        { name: "Malta", code: "+356" },
        { name: "Marshall Islands", code: "+692" },
        { name: "Mauritania", code: "+222" },
        { name: "Mauritius", code: "+230" },
        { name: "Mexico", code: "+52" },
        { name: "Micronesia", code: "+691" },
        { name: "Moldova", code: "+373" },
        { name: "Monaco", code: "+377" },
        { name: "Mongolia", code: "+976" },
        { name: "Montenegro", code: "+382" },
        { name: "Morocco", code: "+212" },
        { name: "Mozambique", code: "+258" },
        { name: "Myanmar", code: "+95" },
        { name: "Namibia", code: "+264" },
        { name: "Nauru", code: "+674" },
        { name: "Nepal", code: "+977" },
        { name: "Netherlands", code: "+31" },
        { name: "New Zealand", code: "+64" },
        { name: "Nicaragua", code: "+505" },
        { name: "Niger", code: "+227" },
        { name: "Nigeria", code: "+234" },
        { name: "North Macedonia", code: "+389" },
        { name: "Norway", code: "+47" },
        { name: "Oman", code: "+968" },
        { name: "Pakistan", code: "+92" },
        { name: "Palau", code: "+680" },
        { name: "Palestine", code: "+970" },
        { name: "Panama", code: "+507" },
        { name: "Papua New Guinea", code: "+675" },
        { name: "Paraguay", code: "+595" },
        { name: "Peru", code: "+51" },
        { name: "Philippines", code: "+63" },
        { name: "Poland", code: "+48" },
        { name: "Portugal", code: "+351" },
        { name: "Qatar", code: "+974" },
        { name: "Romania", code: "+40" },
        { name: "Russia", code: "+7" },
        { name: "Rwanda", code: "+250" },
        { name: "Saint Kitts and Nevis", code: "+1" },
        { name: "Saint Lucia", code: "+1" },
        { name: "Saint Vincent", code: "+1" },
        { name: "Samoa", code: "+685" },
        { name: "San Marino", code: "+378" },
        { name: "Sao Tome and Principe", code: "+239" },
        { name: "Saudi Arabia", code: "+966" },
        { name: "Senegal", code: "+221" },
        { name: "Serbia", code: "+381" },
        { name: "Seychelles", code: "+248" },
        { name: "Sierra Leone", code: "+232" },
        { name: "Singapore", code: "+65" },
        { name: "Slovakia", code: "+421" },
        { name: "Slovenia", code: "+386" },
        { name: "Solomon Islands", code: "+677" },
        { name: "Somalia", code: "+252" },
        { name: "South Africa", code: "+27" },
        { name: "South Sudan", code: "+211" },
        { name: "Spain", code: "+34" },
        { name: "Sri Lanka", code: "+94" },
        { name: "Sudan", code: "+249" },
        { name: "Suriname", code: "+597" },
        { name: "Sweden", code: "+46" },
        { name: "Switzerland", code: "+41" },
        { name: "Syria", code: "+963" },
        { name: "Taiwan", code: "+886" },
        { name: "Tajikistan", code: "+992" },
        { name: "Tanzania", code: "+255" },
        { name: "Thailand", code: "+66" },
        { name: "Timor-Leste", code: "+670" },
        { name: "Togo", code: "+228" },
        { name: "Tonga", code: "+676" },
        { name: "Trinidad and Tobago", code: "+1" },
        { name: "Tunisia", code: "+216" },
        { name: "Turkey", code: "+90" },
        { name: "Turkmenistan", code: "+993" },
        { name: "Tuvalu", code: "+688" },
        { name: "Uganda", code: "+256" },
        { name: "Ukraine", code: "+380" },
        { name: "United Arab Emirates", code: "+971" },
        { name: "United Kingdom", code: "+44" },
        { name: "United States", code: "+1" },
        { name: "Uruguay", code: "+598" },
        { name: "Uzbekistan", code: "+998" },
        { name: "Vanuatu", code: "+678" },
        { name: "Vatican City", code: "+39" },
        { name: "Venezuela", code: "+58" },
        { name: "Vietnam", code: "+84" },
        { name: "Yemen", code: "+967" },
        { name: "Zambia", code: "+260" },
        { name: "Zimbabwe", code: "+263" }
    ];

    const selectEl = document.getElementById('homeCountryCode');
    if (selectEl) {
        selectEl.innerHTML = ''; // Clear default
        countryCodes.forEach(item => {
            // Determine expected digits (defaults to 10 if not in list)
            let digits = 10;
            if (item.name === "Australia") digits = 9;
            else if (item.name === "Singapore") digits = 8;
            else if (item.name === "United Arab Emirates" || item.name === "Saudi Arabia") digits = 9;
            else if (item.name === "China") digits = 11;
            else if (item.name === "France" || item.name === "Italy" || item.name === "Spain") digits = 9;
            
            const option = document.createElement('option');
            option.value = item.code;
            option.textContent = `${item.name} (${item.code})`;
            option.setAttribute('data-digits', digits);
            if (item.name === "India") {
                option.selected = true;
            }
            selectEl.appendChild(option);
        });
    }

    const phoneInput = document.getElementById('homePhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.setCustomValidity("");
        });
    }
});

// ==========================================================================
// GOOGLE SHEETS INTEGRATION (Set your Apps Script URL here)
// ==========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEiythMKIfSxGLYbQJnEHsVCSH2GC4Bmu_KzUVlQ--o79ccbkVd04yV_RzCcUfiKTv/exec";

// ==========================================================================
// 8-SERVICE SURVEY QUESTION BANK & DYNAMIC ENGINE
// ==========================================================================
const SERVICES_SURVEY_DATA = {
    "esi-compliance": {
        title: "ESI Compliance & Management",
        subtitle: "Employee State Insurance statutory filings, registrations & dispute handling",
        icon: "fa-certificate",
        questions: [
            { id: "q1", text: "1. What is your company's current total workforce size? *", type: "single", options: ["Under 20 employees", "20–50 employees", "51–200 employees", "200+ employees"] },
            { id: "q2", text: "2. How many employees earn a gross monthly wage of ₹21,000 or less? *", type: "single", options: ["None", "1 – 10", "11 – 50", "50+"] },
            { id: "q3", text: "3. Do you already have an active ESI Registration Code? *", type: "single", options: ["Yes, active", "No, need new registration", "Inactive / Needs recovery"] },
            { id: "q4", text: "4. What core support do you need right now? (Select all that apply) *", type: "multi", options: ["New registration", "Monthly return filings", "Employee ID cards & registration", "Claim facilitation & dispute support"] },
            { id: "q5", text: "5. Are there any pending ESI notices or past non-compliance issues? *", type: "single", options: ["Yes", "No", "Unsure / Need audit"] },
            { id: "q6", text: "6. How often do you issue employee salary payouts? *", type: "single", options: ["Monthly (Fixed date)", "Bi-weekly / Weekly", "Daily / Contractual basis"] },
            { id: "q7", text: "7. Preferred mode of data sharing for monthly filings: *", type: "single", options: ["Excel / CSV uploads", "HRMS / Payroll Software Integration", "Manual documentation"] }
        ]
    },
    "pf-compliance": {
        title: "PF (Provident Fund) Compliance & Management",
        subtitle: "EPFO compliance, ECR filings, UAN management & audit resolution",
        icon: "fa-piggy-bank",
        questions: [
            { id: "q1", text: "1. What is your workforce structure? *", type: "single", options: ["Mostly Permanent / Full-time", "Mostly Contract / Temporary", "Mixed (Permanent + Contract)"] },
            { id: "q2", text: "2. Do you already have an EPFO Establishment Code? *", type: "single", options: ["Yes", "No, need fresh registration"] },
            { id: "q3", text: "3. Are your past monthly PF filings (ECR) up to date? *", type: "single", options: ["Up to date", "Pending filings / Arrears", "Unsure"] },
            { id: "q4", text: "4. Which services do you require? (Select all that apply) *", type: "multi", options: ["Monthly ECR generation & filing", "New employee UAN generation", "Employee PF withdrawal/transfer assistance", "EPFO audit & notice support"] },
            { id: "q5", text: "5. How many total employees are eligible for PF? *", type: "single", options: ["Under 20", "20 – 50", "51 – 200", "200+"] },
            { id: "q6", text: "6. How do you manage PF currently? *", type: "single", options: ["In-house HR team", "External Consultant / Agency", "Starting for the first time"] },
            { id: "q7", text: "7. How will salary registers be provided each month? *", type: "single", options: ["Automated system access", "Shared Excel sheet by 1st–5th of every month", "Custom portal upload"] }
        ]
    },
    "documentation-advisory": {
        title: "End-to-End Documentation & Corporate Advisory",
        subtitle: "Contracts, policy handbooks, background verification & legal protection",
        icon: "fa-file-signature",
        questions: [
            { id: "q1", text: "1. What is your company's current stage? *", type: "single", options: ["Early-stage Startup", "Growing SME", "Established Enterprise"] },
            { id: "q2", text: "2. Which documents do you need us to draft or update? (Select all that apply) *", type: "multi", options: ["Employment Contracts & NDAs", "Company Policy Manual (Leave, POSH, Conduct)", "Offer Letters & Termination Letters", "Statutory Compliance Registers"] },
            { id: "q3", text: "3. Do you need Background Verification (BGV) services? *", type: "single", options: ["Yes, for all new hires", "Yes, for selective leadership roles only", "No, documentation only"] },
            { id: "q4", text: "4. If BGV is required, which checks do you need? (Select all that apply) *", type: "multi", options: ["Employment & Education check", "Police Clearance & Criminal record check", "Health checkup & Vaccination verification", "Address verification"] },
            { id: "q5", text: "5. Average monthly hiring volume requiring documentation: *", type: "single", options: ["1 – 5 per month", "6 – 20 per month", "20+ per month"] },
            { id: "q6", text: "6. Are you currently facing any active employee legal grievances or statutory notices? *", type: "single", options: ["Yes", "No"] },
            { id: "q7", text: "7. What is your target timeline for completion? *", type: "single", options: ["Urgent (Within 1 week)", "Standard (2–3 weeks)", "Flexible"] }
        ]
    },
    "insurance-schemes": {
        title: "Government-Backed Health & Life Insurance Integration",
        subtitle: "Ayushman Bharat, PMJJBY, PMSBY and cashless claim facilitation",
        icon: "fa-shield-heart",
        questions: [
            { id: "q1", text: "1. Which government schemes do you wish to integrate? (Select all that apply) *", type: "multi", options: ["Ayushman Bharat (AB-PMJAY) - Health Cover", "PMJJBY - Life Insurance", "PMSBY - Accident Insurance", "Need recommendation"] },
            { id: "q2", text: "2. Estimated number of employees to enroll: *", type: "single", options: ["1 – 25", "26 – 100", "100+"] },
            { id: "q3", text: "3. Do all eligible employees have bank accounts and Aadhaar linked? *", type: "single", options: ["Yes, 100%", "Mostly (70%–90%)", "No / Need assistance"] },
            { id: "q4", text: "4. Who will fund the scheme premiums? *", type: "single", options: ["Fully paid by company", "Deducted via payroll (Employee funded)", "Co-funded model"] },
            { id: "q5", text: "5. Do you also have an existing private Group Medical Insurance policy? *", type: "single", options: ["Yes", "No, replacing with government schemes", "No, want to offer both"] },
            { id: "q6", text: "6. Do you require dedicated claims support for employees during emergencies? *", type: "single", options: ["Yes, full assistance", "Basic guidance only"] },
            { id: "q7", text: "7. Preferred launch timeline: *", type: "single", options: ["Immediate / Next payroll cycle", "Within 30 days", "Exploring for future planning"] }
        ]
    },
    "talent-advisory": {
        title: "Executive Recruitment & Talent Advisory",
        subtitle: "Executive search, leadership hiring, compensation benchmarking & onboarding",
        icon: "fa-user-tie",
        questions: [
            { id: "q1", text: "1. What level of positions are you looking to fill? (Select all that apply) *", type: "multi", options: ["C-Suite (CEO, CTO, CFO, etc.)", "VP / Director level", "Senior Managerial / Lead positions"] },
            { id: "q2", text: "2. How many active open positions do you have right now? *", type: "single", options: ["1 – 2 roles", "3 – 5 roles", "5+ roles"] },
            { id: "q3", text: "3. Work arrangement for these roles: *", type: "single", options: ["On-site", "Hybrid", "Remote"] },
            { id: "q4", text: "4. Target hiring timeline: *", type: "single", options: ["Immediate (Within 15–30 days)", "Standard (30–60 days)", "Leadership search (60–90 days)"] },
            { id: "q5", text: "5. Do you require additional talent services? (Select all that apply) *", type: "multi", options: ["Salary & Compensation Benchmarking", "Executive Background Verification", "International Visa / Passport Assistance"] },
            { id: "q6", text: "6. Number of internal interview rounds planned: *", type: "single", options: ["1 – 2 rounds", "3 – 4 rounds", "5+ rounds"] },
            { id: "q7", text: "7. How would you describe your company's pitch for candidates? *", type: "single", options: ["High-growth startup / Equity upside", "Established corporate / Stability & benefits", "Niche industry leader"] }
        ]
    },
    "payroll-admin": {
        title: "Payroll & HR Administration",
        subtitle: "End-to-end payroll processing, tax deductions, attendance & employee helpdesk",
        icon: "fa-calculator",
        questions: [
            { id: "q1", text: "1. Total current employee headcount: *", type: "single", options: ["Under 20", "20 – 100", "100 – 500", "500+"] },
            { id: "q2", text: "2. How is attendance tracked currently? *", type: "single", options: ["Biometric machine / Face recognition", "Web portal / Mobile app", "Manual register / Excel sheet"] },
            { id: "q3", text: "3. Standard monthly salary payout date: *", type: "single", options: ["Last day of the month", "1st – 5th of the month", "7th – 10th of the month"] },
            { id: "q4", text: "4. Do you require us to use your existing HRMS software or our platform? *", type: "single", options: ["Use our existing HR software", "Use Bharat HR Ventures platform/system", "No preference"] },
            { id: "q5", text: "5. What extra modules do you need included? (Select all that apply) *", type: "multi", options: ["TDS / Form 16 management", "Professional Tax (PT) filings", "Leave & Attendance management", "Employee Helpdesk for payslip queries"] },
            { id: "q6", text: "6. Salary structure complexity: *", type: "single", options: ["Simple (Fixed Base + Allowance)", "Complex (Variables, Incentives, Overtime, Shift allowances)"] },
            { id: "q7", text: "7. Primary reason for outsourcing payroll: *", type: "single", options: ["Time savings / Focus on core business", "Ensuring 100% statutory accuracy", "Employee size growing rapidly"] }
        ]
    },
    "hr-audit": {
        title: "Comprehensive HR Audit & Statutory Check",
        subtitle: "Labor law audit, register inspection, notice risk identification & POSH reviews",
        icon: "fa-magnifying-glass-chart",
        questions: [
            { id: "q1", text: "1. When was your last formal HR & Labor Law audit conducted? *", type: "single", options: ["Within the last 12 months", "1 – 3 years ago", "Never / First time"] },
            { id: "q2", text: "2. How many operating locations/branches does your company have in India? *", type: "single", options: ["Single location", "2 – 5 locations", "5+ locations across multiple states"] },
            { id: "q3", text: "3. Breakdown of your current workforce: *", type: "single", options: ["Mostly permanent employees", "Significant third-party / Contract labor", "Equal mix of both"] },
            { id: "q4", text: "4. Have you received any labor inspection notices or penalties in the past 24 months? *", type: "single", options: ["Yes", "No", "Unsure"] },
            { id: "q5", text: "5. Which areas do you feel are most at risk? (Select all that apply) *", type: "multi", options: ["Wage registers & Overtime logs", "ESI / PF compliance gaps", "Contract labor compliance", "POSH & Factory/Establishments Act rules"] },
            { id: "q6", text: "6. What is your primary goal for this audit? *", type: "single", options: ["Preparation for investor funding / M&A", "Annual routine compliance check", "Resolving ongoing legal/statutory issues"] },
            { id: "q7", text: "7. Desired audit completion timeframe: *", type: "single", options: ["Fast-track (Within 10 days)", "Standard (2–3 weeks)"] }
        ]
    },
    "corporate-travel": {
        title: "Corporate Travel & Leisure Management",
        subtitle: "Corporate retreats, team outings, executive transport & offsite events",
        icon: "fa-plane-departure",
        questions: [
            { id: "q1", text: "1. What type of event/travel are you planning? *", type: "single", options: ["Single-day Team Outing / Dinner", "Overnight / Weekend Retreat", "Corporate Conference / Milestone Event", "Regular Business Travel Management"] },
            { id: "q2", text: "2. Expected number of attendees: *", type: "single", options: ["Small Team (10 – 25 people)", "Mid-size (26 – 100 people)", "Large (100+ people)"] },
            { id: "q3", text: "3. Who will be attending? *", type: "single", options: ["Employees only", "Leadership team only", "Employees + Family/Dependents"] },
            { id: "q4", text: "4. Budget tier per head: *", type: "single", options: ["Economy / Budget-friendly", "Premium / Standard", "Luxury / High-end"] },
            { id: "q5", text: "5. Which services do you need us to handle? (Select all that apply) *", type: "multi", options: ["Flight / Train / Bus transport", "Hotel accommodation & venue booking", "Food, Beverages & Gala Dinners", "Team building games & activities"] },
            { id: "q6", text: "6. Preferred travel distance / location type: *", type: "single", options: ["Within the city / Local resort", "Driving distance (Outstation)", "Outstation flight travel / Destination trip"] },
            { id: "q7", text: "7. Target timeline / date of the event: *", type: "single", options: ["Within 2 weeks", "Next month", "2–3 months away"] }
        ]
    }
};

let currentSelectedService = "esi-compliance";

function generateQuestionHTML(q, stepNum) {
    const isMulti = q.type === "multi";
    const inputType = isMulti ? "checkbox" : "radio";
    const inputName = `dynamic_${q.id}`;
    
    let optionsHTML = q.options.map(opt => {
        return `
            <label class="survey-radio-label" style="padding: 10px 14px; gap: 10px; font-size: 0.9rem;">
                <input type="${inputType}" name="${inputName}" value="${opt.replace(/"/g, '&quot;')}" ${!isMulti ? 'required' : ''}>
                <span>${opt}</span>
            </label>
        `;
    }).join("");

    return `
        <div class="form-group" style="margin-bottom: 20px;">
            <label style="font-size: 0.95rem; margin-bottom: 8px; font-weight: 600; display: block; color: var(--color-text-dark);">${q.text}</label>
            <div class="survey-radio-group">
                ${optionsHTML}
            </div>
        </div>
    `;
}

function renderServiceQuestions(serviceKey) {
    const data = SERVICES_SURVEY_DATA[serviceKey];
    if (!data) return;
    
    currentSelectedService = serviceKey;

    const step2Container = document.getElementById('home-step-2-container');
    const step3Container = document.getElementById('home-step-3-container');

    const serviceBadge = `
        <div style="margin-bottom: 18px; padding: 8px 14px; background: rgba(30, 58, 138, 0.06); border-radius: 6px; border-left: 3px solid var(--color-accent); display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid ${data.icon}" style="color: var(--color-accent);"></i>
            <div>
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent); display: block; letter-spacing: 0.5px;">Selected Service Assessment</span>
                <strong style="font-size: 0.92rem; color: var(--color-text-dark);">${data.title}</strong>
            </div>
        </div>
    `;

    if (step2Container) {
        // Questions 1, 2, 3
        const q1to3 = data.questions.slice(0, 3).map(q => generateQuestionHTML(q, 2)).join("");
        step2Container.innerHTML = serviceBadge + q1to3;
    }

    if (step3Container) {
        // Questions 4, 5, 6, 7
        const q4to7 = data.questions.slice(3, 7).map(q => generateQuestionHTML(q, 3)).join("");
        step3Container.innerHTML = serviceBadge + q4to7;
    }
}

window.selectServiceCard = (cardEl, serviceKey) => {
    document.querySelectorAll('.survey-service-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');
    const radio = cardEl.querySelector('input[type="radio"]');
    if (radio) {
        radio.checked = true;
    }
};

window.nextHomeStep = (stepNumber) => {
    const currentStepEl = document.querySelector('.home-survey-step.active-step');
    if (!currentStepEl) return;

    let isValid = true;

    // Check validation based on which step we are LEAVING
    if (stepNumber === 2) {
        // Leaving Step 1 (Service Selection)
        const checkedService = document.querySelector('input[name="selectedService"]:checked');
        if (!checkedService) {
            alert('Please select a service option to proceed with the assessment.');
            return;
        }
        renderServiceQuestions(checkedService.value);
    } else if (stepNumber === 3) {
        // Leaving Step 2 (Q1, Q2, Q3)
        const currentData = SERVICES_SURVEY_DATA[currentSelectedService];
        const step2Questions = currentData.questions.slice(0, 3);
        
        for (const q of step2Questions) {
            const checked = currentStepEl.querySelectorAll(`input[name="dynamic_${q.id}"]:checked`);
            if (checked.length === 0) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            alert('Please answer all questions on this step before proceeding.');
            return;
        }
    } else if (stepNumber === 4) {
        // Leaving Step 3 (Q4, Q5, Q6, Q7)
        const currentData = SERVICES_SURVEY_DATA[currentSelectedService];
        const step3Questions = currentData.questions.slice(3, 7);
        
        for (const q of step3Questions) {
            const checked = currentStepEl.querySelectorAll(`input[name="dynamic_${q.id}"]:checked`);
            if (checked.length === 0) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            alert('Please answer all questions on this step before proceeding.');
            return;
        }
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
    document.querySelectorAll('.home-survey-step').forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active-step');
    });

    const targetStepEl = document.getElementById(`home-step-${stepNumber}`);
    if (targetStepEl) {
        targetStepEl.style.display = 'block';
        targetStepEl.classList.add('active-step');
    }

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
    const email = document.getElementById('homeContactEmail') ? document.getElementById('homeContactEmail').value : "";
    const phoneCode = document.getElementById('homeCountryCode').value;
    const phoneNum = document.getElementById('homePhone').value;
    const messageText = document.getElementById('homeMessage').value;

    // Validate phone number digits length dynamically
    const phoneInput = document.getElementById('homePhone');
    const phoneNumClean = phoneNum.replace(/\D/g, "");
    const selectEl = document.getElementById('homeCountryCode');
    const selectedOption = selectEl.options[selectEl.selectedIndex];
    const expectedDigits = parseInt(selectedOption.getAttribute('data-digits')) || 10;

    if (phoneNumClean.length !== expectedDigits) {
        phoneInput.setCustomValidity(`Please enter exactly ${expectedDigits} digits for your phone number.`);
        phoneInput.reportValidity();
        return;
    } else {
        phoneInput.setCustomValidity("");
    }

    const currentData = SERVICES_SURVEY_DATA[currentSelectedService] || SERVICES_SURVEY_DATA["esi-compliance"];
    
    // Extract dynamic answers
    const getAnswer = (qId) => {
        const checkedList = Array.from(document.querySelectorAll(`input[name="dynamic_${qId}"]:checked`));
        return checkedList.map(el => el.value).join(", ");
    };

    const q1Ans = getAnswer("q1");
    const q2Ans = getAnswer("q2");
    const q3Ans = getAnswer("q3");
    const q4Ans = getAnswer("q4");
    const q5Ans = getAnswer("q5");
    const q6Ans = getAnswer("q6");
    const q7Ans = getAnswer("q7");

    // Dynamic tailored feedback based on selected service
    let riskMessage = `ASSESSMENT COMPLETE: We have logged your assessment for ${currentData.title}. Our statutory specialists will review your requirements and connect with your team to provide a customized roadmap and compliance protection plan.`;

    // Compile survey payload for Google Sheet
    const formData = {
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        companyName: company,
        contactName: name,
        emailAddress: email || "Not Provided",
        phoneNumber: `${phoneCode} ${phoneNum}`,
        serviceRequired: currentData.title,
        message: messageText,
        q1Importance: q1Ans,
        q2Benefits: q2Ans,
        q3Reason: q3Ans,
        q4Satisfaction: q4Ans,
        q5Productivity: q5Ans,
        q6Challenges: q6Ans,
        q7Expansion: q7Ans
    };

    // Post to Google Sheet Web App
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(() => console.log("Lead successfully submitted to Google Sheet."))
        .catch(err => console.error("Error submitting lead to Google Sheet:", err));
    }

    // Show feedback and toggle screens
    const feedbackEl = document.getElementById('home-assessment-feedback');
    if (feedbackEl) feedbackEl.innerText = riskMessage;

    const progressContainer = document.querySelector('.survey-progress-container');
    const formEl = document.getElementById('homeSurveyForm');
    const thankYouEl = document.getElementById('home-thank-you');

    if (progressContainer) progressContainer.style.display = 'none';
    if (formEl) formEl.style.display = 'none';
    if (thankYouEl) thankYouEl.style.display = 'block';
};

// ==========================================================================
// ONBOARDING & DOCUMENT CENTER CONTROLLER
// ==========================================================================
window.downloadFormTemplate = () => {
    const templateSelect = document.getElementById('docSelectTemplate');
    const val = templateSelect.value;
    if (!val) {
        alert("Please select a statutory document template first.");
        return;
    }

    let filePath = "";
    let fileName = "";
    if (val === "esi_form_1") {
        filePath = "assets/forms/esi_form_1_declaration.txt";
        fileName = "esi_form_1_declaration.txt";
    } else if (val === "epf_form_11") {
        filePath = "assets/forms/epf_form_11_declaration.txt";
        fileName = "epf_form_11_declaration.txt";
    } else if (val === "health_ins") {
        filePath = "assets/forms/health_insurance_enrollment.txt";
        fileName = "health_insurance_enrollment.txt";
    } else if (val === "hr_checklist") {
        filePath = "assets/forms/corporate_onboarding_checklist.txt";
        fileName = "corporate_onboarding_checklist.txt";
    }

    if (filePath) {
        const link = document.createElement("a");
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

window.submitOnboardingDocument = (event) => {
    event.preventDefault();

    const company = document.getElementById('docCompany').value;
    const name = document.getElementById('docContactName').value;
    const email = document.getElementById('docEmail').value;
    const templateSelect = document.getElementById('docSelectTemplate');
    const docType = templateSelect.options[templateSelect.selectedIndex].text;
    const fileInput = document.getElementById('docFileInput');

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select or drop a signed scan document to submit.");
        return;
    }

    const file = fileInput.files[0];
    if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please upload a smaller scan.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Data = e.target.result.split(',')[1];
        
        const payload = {
            action: "upload",
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            companyName: company,
            contactName: name,
            emailAddress: email,
            documentType: docType,
            filename: file.name,
            fileData: base64Data,
            mimeType: file.type
        };

        if (GOOGLE_SCRIPT_URL) {
            // Show loading state
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Encrypting & Uploading...';

            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                // Show success screen
                document.getElementById('docUploadForm').style.display = 'none';
                document.getElementById('doc-upload-thank-you').style.display = 'block';
            })
            .catch(err => {
                console.error("Upload error:", err);
                alert("Upload failed. Please check your internet connection.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            });
        } else {
            alert("Upload portal is ready! Configure the GOOGLE_SCRIPT_URL to save your documents.");
            // Local preview success
            document.getElementById('docUploadForm').style.display = 'none';
            document.getElementById('doc-upload-thank-you').style.display = 'block';
        }
    };

    reader.readAsDataURL(file);
};

window.addEventListener('DOMContentLoaded', () => {
    // Document Upload Drag & Drop Event Listeners
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('docFileInput');
    const uploadZoneText = document.getElementById('upload-zone-text');

    if (uploadZone && fileInput) {
        // Trigger file input click when uploadZone is clicked
        uploadZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Update display name when file is selected
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                uploadZoneText.innerText = `Selected: ${fileInput.files[0].name}`;
                uploadZone.style.borderColor = 'var(--color-accent)';
            }
        });

        // Drag & Drop events
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
            }, false);
        });

        uploadZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                uploadZoneText.innerText = `Selected: ${files[0].name}`;
                uploadZone.style.borderColor = 'var(--color-accent)';
            }
        }, false);
    }
});

// ==========================================================================
// TEAM SECTION DESCRIPTION ACCORDION CONTROLLER
// ==========================================================================
window.toggleTeamDescription = (btn) => {
    const card = btn.closest('.team-card');
    if (!card) return;
    const panel = card.querySelector('.team-desc-panel');
    const isActive = card.classList.contains('active');

    // Close all other expanded team cards in the grid for clean UX (accordion style)
    const activeCards = document.querySelectorAll('.team-card.active');
    activeCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
            const otherBtn = c.querySelector('.team-expand-btn');
            if (otherBtn) otherBtn.classList.remove('active');
            const otherPanel = c.querySelector('.team-desc-panel');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
        }
    });

    if (isActive) {
        card.classList.remove('active');
        btn.classList.remove('active');
        if (panel) panel.style.maxHeight = '0px';
    } else {
        card.classList.add('active');
        btn.classList.add('active');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    }
};
