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
    const serviceRequired = document.getElementById('homeServiceRequired').value;
    const messageText = document.getElementById('homeMessage').value;

    // Validate phone number digits length dynamically
    const phoneInput = document.getElementById('homePhone');
    const phoneNumClean = phoneNum.replace(/\D/g, ""); // Strip non-digits
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

    // Compile survey data for submission
    const formData = {
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        companyName: company,
        contactName: name,
        emailAddress: email,
        phoneNumber: `${phoneCode} ${phoneNum}`,
        serviceRequired: serviceRequired,
        message: messageText,
        q1Importance: document.querySelector('input[name="homeQ1Importance"]:checked')?.value || "",
        q2Benefits: Array.from(document.querySelectorAll('input[name="homeBenefitsOffer"]:checked')).map(el => {
            const spanText = el.closest('label').querySelector('span').innerText;
            return spanText;
        }).join(", "),
        q3Reason: document.querySelector('input[name="homeQ3Reason"]:checked')?.closest('label').querySelector('span').innerText || "",
        q4Satisfaction: document.querySelector('input[name="homeQ4Satisfaction"]:checked')?.closest('label').querySelector('span').innerText || "",
        q5Productivity: document.querySelector('input[name="homeQ5Productivity"]:checked')?.closest('label').querySelector('span').innerText || "",
        q6Challenges: Array.from(document.querySelectorAll('input[name="homeChallenges"]:checked')).map(el => {
            const spanText = el.closest('label').querySelector('span').innerText;
            return spanText;
        }).join(", "),
        q7Expansion: document.querySelector('input[name="homeQ7Expansion"]:checked')?.closest('label').querySelector('span').innerText || ""
    };

    // Post to Google Sheet Web App if URL is provided
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

    // Hide progress bar and form
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
