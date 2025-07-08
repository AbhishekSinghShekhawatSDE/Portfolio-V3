document.addEventListener("DOMContentLoaded", function() {

    function initPortfolio() {
        initSmartHeader();
        initCustomCursor();
        initQuantumFlowBackground();
        initKineticCards();
        initInertialCards();
        initButtonRipples();
        initFadeInAnimations();
        initCopyrightYear();
        initTimelineAnimation();
        initProjectFilters();
        initContactForm();
        initContributionForm();
        initTypewriter();
        initProficiencyBars();
        initContributeTypewriter();
        initFaqAccordion();
        initResumeFinalAnimation();
        initFullGallery();
        initCertificateExpander();
        initProfilePicMessageSequence();
        initMobileMenu();
    }

    function initCertificateExpander() {
        const showMoreBtn = document.getElementById('show-more-certs-btn');
        const certGrid = document.querySelector('.certifications-grid');
        if (!showMoreBtn || !certGrid) {
            return;
        }
        showMoreBtn.addEventListener('click', () => {
            certGrid.classList.add('is-expanded');
        });
    }

    function initProjectFilters() {
        const filterContainer = document.querySelector('.project-filters');
        if (!filterContainer) return;
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-card-item');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
                const filter = button.dataset.filter;
                projectItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category.includes(filter)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    function initFullGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) return;

        const gate = document.getElementById('gallery-gate');
        const content = document.getElementById('gallery-content');
        const showRegisterBtn = document.getElementById('show-register-btn');
        const showLoginBtn = document.getElementById('show-login-btn');
        const registerForm = document.getElementById('register-form');
        const loginForm = document.getElementById('login-form');

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2y8SFElJBx03Kanb7ILD347LNWPps8CLZQuKyUrg7-954gWONWm26LMvSaaCUs4mmqQ/exec';

        const switchForms = (showForm, hideForm, showBtn, hideBtn) => {
            const notes = document.querySelectorAll('.form-status-note');
            notes.forEach(note => note.textContent = '');
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
            showBtn.classList.add('active');
            hideBtn.classList.remove('active');
        };
        if (showRegisterBtn) showRegisterBtn.addEventListener('click', () => switchForms(registerForm, loginForm, showRegisterBtn, showLoginBtn));
        if (showLoginBtn) showLoginBtn.addEventListener('click', () => switchForms(loginForm, registerForm, showLoginBtn, showRegisterBtn));

        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const statusNote = registerForm.querySelector('.form-status-note');
                const submitButton = registerForm.querySelector('button[type="submit"]');
                statusNote.textContent = '';

                const pass = registerForm.querySelector('input[name="password"]').value;
                const confirmPass = registerForm.querySelector('input[name="confirm_password"]').value;
                if (pass !== confirmPass) {
                    statusNote.style.color = '#F87171';
                    statusNote.textContent = 'Passwords do not match.';
                    return;
                }
                submitButton.disabled = true;
                submitButton.textContent = 'Registering...';
                const formData = new FormData(registerForm);
                formData.append('command', 'register');
                const queryParams = new URLSearchParams(formData);
                try {
                    const response = await fetch(`${SCRIPT_URL}?${queryParams}`);
                    if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                    const result = await response.json();
                    if (result.status === 'success') {
                        statusNote.style.color = 'var(--color-primary)';
                        statusNote.textContent = result.message;
                        registerForm.reset();
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    statusNote.style.color = '#F87171';
                    statusNote.textContent = `Error: ${error.message}`;
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Create Account';
                }
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const statusNote = loginForm.querySelector('.form-status-note');
                const submitButton = loginForm.querySelector('button[type="submit"]');
                statusNote.textContent = '';
                submitButton.disabled = true;
                submitButton.textContent = 'Logging In...';
                const formData = new FormData(loginForm);
                formData.append('command', 'login');
                const queryParams = new URLSearchParams(formData);
                try {
                    const response = await fetch(`${SCRIPT_URL}?${queryParams}`);
                    const result = await response.json();
                    if (result.status === 'success') {
                        gate.style.display = 'none';
                        content.style.display = 'block';
                        content.classList.add('visible');
                        if (window.initKineticCards) window.initKineticCards();
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    statusNote.style.color = '#F87171';
                    statusNote.textContent = error.message;
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enter Gallery';
                }
            });
        }

        const modal = document.getElementById('gallery-modal');
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            const closeModalBtn = modal.querySelector('.close-modal-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    modalContent.innerHTML = '';
                    if (item.classList.contains('video-item')) {
                        const videoSrc = item.dataset.videoSrc;
                        const video = document.createElement('video');
                        video.src = videoSrc;
                        video.controls = true;
                        video.autoplay = true;
                        video.style.maxWidth = '100%';
                        modalContent.appendChild(video);
                    } else {
                        const imgSrc = item.querySelector('img').src;
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.style.maxWidth = '100%';
                        modalContent.appendChild(img);
                    }
                    modal.style.display = 'flex';
                });
            });
            const closeModal = () => modal.style.display = 'none';
            closeModalBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    function initResumeFinalAnimation() {
        const endTrigger = document.getElementById('resume-end-trigger');
        if (!endTrigger) return;
        let hasCelebrated = false;
        const celebrationObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasCelebrated) {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: {
                        y: 0.7
                    }
                });
                hasCelebrated = true;
                celebrationObserver.unobserve(endTrigger);
            }
        }, {
            threshold: 1.0
        });
        celebrationObserver.observe(endTrigger);
    }

    function initContributeTypewriter() {
        const target = document.getElementById('contribute-intro');
        if (!target || !window.Typed) return;
        const text = "This is a genuine opportunity to gain <span class='text-highlight'>real-world experience</span> that matters. You will contribute to live projects, earn <span class='text-highlight'>verifiable recognition</span>, and build a network that will accelerate your career.";
        new Typed('#contribute-intro', {
            strings: [text],
            typeSpeed: 25,
            backSpeed: 10,
            loop: false,
            showCursor: true,
            cursorChar: '_',
        });
    }

    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    function initTimelineAnimation() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        const items = timeline.querySelectorAll('.timeline-item');
        const progressDot = timeline.querySelector('.timeline-progress-dot');
        const line = timeline.querySelector('.timeline-line');
        if (!progressDot || !line || items.length === 0) return;
        items.forEach(item => {
            const dot = document.createElement('div');
            dot.classList.add('timeline-checkpoint-dot');
            item.appendChild(dot);
        });
        const checkpoints = timeline.querySelectorAll('.timeline-checkpoint-dot');
        progressDot.addEventListener('mouseenter', () => {
            progressDot.style.animationPlayState = 'paused';
        });
        progressDot.addEventListener('mouseleave', () => {
            progressDot.style.animationPlayState = 'running';
        });

        function checkTimelineCheckpoints() {
            const lineRect = line.getBoundingClientRect();
            const dotRect = progressDot.getBoundingClientRect();
            const progress = (lineRect.bottom - dotRect.bottom) / lineRect.height;
            items.forEach((item, index) => {
                const checkpointPosition = 1 - (index / (items.length - 1));
                if (progress >= checkpointPosition) {
                    checkpoints[index].classList.add('activated');
                }
            });
            requestAnimationFrame(checkTimelineCheckpoints);
        }
        progressDot.addEventListener('animationiteration', () => {
            checkpoints.forEach(dot => dot.classList.remove('activated'));
        });
        requestAnimationFrame(checkTimelineCheckpoints);
    }

    function initProfilePicMessageSequence() {
        const profilePicContainers = document.querySelectorAll('.profile-pic-container');
        if (profilePicContainers.length === 0) return;
        const messages = ["Hi, how are you?", "Hope you are doing fine!", "How do you like my portfolio so far?", "This portfolio is a matrix game.", "It includes more than 20 hidden pages.", "Most people only find 3-4.", "But the smart ones can break the matrix.", "Let's see how many you can find.", "Message me your count!", "Good luck..."];
        let messageIndex = 0;
        profilePicContainers.forEach(container => {
            const hoverDiv = container.querySelector('.profile-pic-hover');
            let messageSpan = null;
            container.addEventListener('mouseenter', () => {
                if (!messageSpan) {
                    messageSpan = document.createElement('span');
                    hoverDiv.appendChild(messageSpan);
                }
                messageSpan.textContent = messages[messageIndex];
                messageIndex = (messageIndex + 1) % messages.length;
            });
        });
    }

    function initContributionForm() {
        const form = document.getElementById('contributionForm');
        if (!form) return;
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyMGUtlCvV2ZHj59g2PwjbJV1oLqxfQ4SR0OCI-FAsFbi07dthMTSTn_LtVKuMYzB6wiA/exec';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('.form-submit-btn');
            const statusNote = form.querySelector('.form-status-note');
            statusNote.textContent = '';
            statusNote.style.color = '#F87171';
            const formData = new FormData(form);
            if (!formData.get('fullName').trim()) {
                statusNote.textContent = 'Please enter your Full Name.';
                return;
            }
            if (!formData.get('email').trim()) {
                statusNote.textContent = 'Please enter your Email Address.';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email'))) {
                statusNote.textContent = 'Please enter a valid email format.';
                return;
            }
            if (!formData.get('mobileNumber').trim()) {
                statusNote.textContent = 'Please enter your Mobile Number.';
                return;
            }
            if (!formData.get('collegeName').trim()) {
                statusNote.textContent = 'Please enter your College Name.';
                return;
            }
            if (!formData.get('branch').trim()) {
                statusNote.textContent = 'Please enter your Branch / Stream.';
                return;
            }
            if (!formData.get('currentYear')) {
                statusNote.textContent = 'Please select your Current Year.';
                return;
            }
            if (!formData.get('primaryArea')) {
                statusNote.textContent = 'Please select your Primary Contribution Area.';
                return;
            }
            if (!formData.get('keySkills').trim()) {
                statusNote.textContent = 'Please list your Key Skills.';
                return;
            }
            if (!formData.get('profileLink').trim()) {
                statusNote.textContent = 'Please provide a Portfolio/LinkedIn/GitHub link.';
                return;
            }
            if (!formData.get('availability')) {
                statusNote.textContent = 'Please select your Weekly Availability.';
                return;
            }
            if (!formData.get('whyJoin').trim()) {
                statusNote.textContent = 'Please tell us why you want to join.';
                return;
            }
            if (!formData.get('consent')) {
                statusNote.textContent = 'You must agree to the consent terms.';
                return;
            }
            if (!formData.get('agreement')) {
                statusNote.textContent = 'You must agree to the contribution terms.';
                return;
            }
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            statusNote.style.color = 'var(--color-text-secondary)';
            statusNote.textContent = 'Please wait...';
            try {
                const finalFormData = new FormData(form);
                finalFormData.set('consent', 'Agreed');
                finalFormData.set('agreement', 'Agreed');
                const queryParams = new URLSearchParams(finalFormData);
                const response = await fetch(`${SCRIPT_URL}?${queryParams}`);
                if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
                const result = await response.json();
                if (result.status === 'success') {
                    statusNote.style.color = 'var(--color-primary)';
                    statusNote.textContent = 'Thank you! Your application has been received.';
                    submitButton.textContent = 'Application Sent!';
                    form.reset();
                    setTimeout(() => {
                        window.location.href = 'thankyou.html';
                    }, 2000);
                } else {
                    throw new Error(result.message || 'The server reported a submission error.');
                }
            } catch (error) {
                console.error('Contribution form submission error:', error);
                statusNote.textContent = `Error: ${error.message}. Please check console or try again.`;
                submitButton.disabled = false;
                submitButton.textContent = 'Submit My Application';
            }
        });
    }

    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        if (!menuToggle || !mobileMenu) return;
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = document.body.classList.toggle('mobile-menu-open');
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
        });
    }

    function initQuantumFlowBackground() {
        const canvas = document.getElementById('quantum-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles, pulses;
        const mouse = {
            x: null,
            y: null,
            radius: 150
        };

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();
        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 40) + 5;
                this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                if (mouse.x !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let maxDistance = mouse.radius;
                        let force = (maxDistance - distance) / maxDistance;
                        let directionX = forceDirectionX * force * this.density;
                        let directionY = forceDirectionY * force * this.density;
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            this.x -= (this.x - this.baseX) / 10;
                        }
                        if (this.y !== this.baseY) {
                            this.y -= (this.y - this.baseY) / 10;
                        }
                    }
                }
            }
        }
        class Pulse {
            constructor(startNode, endNode) {
                this.startNode = startNode;
                this.endNode = endNode;
                this.progress = 0;
                this.speed = Math.random() * 0.015 + 0.005;
            }
            update() {
                this.progress += this.speed;
            }
            draw() {
                const currentX = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
                const currentY = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
                ctx.beginPath();
                ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function init() {
            particles = [];
            pulses = [];
            let particleDensity = 10000;
            if (window.matchMedia('(max-width: 768px)').matches) {
                particleDensity = 30000;
            }
            let numberOfParticles = (canvas.width * canvas.height) / particleDensity;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            let connectionDistance = (canvas.width / 8) * (canvas.height / 8);
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < connectionDistance) {
                        let opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            pulses.forEach((pulse, index) => {
                pulse.update();
                pulse.draw();
                if (pulse.progress >= 1) {
                    pulses.splice(index, 1);
                }
            });
            if (Math.random() < 0.03 && pulses.length < particles.length / 20) {
                const startNode = particles[Math.floor(Math.random() * particles.length)];
                const potentialEndNodes = particles.filter(p => {
                    if (p === startNode) return false;
                    let distance = ((startNode.x - p.x) * (startNode.x - p.x)) + ((startNode.y - p.y) * (startNode.y - p.y));
                    return distance < connectionDistance && distance > 100;
                });
                if (potentialEndNodes.length > 0) {
                    const endNode = potentialEndNodes[Math.floor(Math.random() * potentialEndNodes.length)];
                    pulses.push(new Pulse(startNode, endNode));
                }
            }
            requestAnimationFrame(animate);
        }
        init();
        animate();
    }

    function initTypewriter() {
        const target = document.getElementById('expertise-intro');
        if (!target) return;
        const text = "A showcase of the skills, verifiable credentials, and hands-on experience I use to build robust and efficient systems. I am driven by a growth mindset and a dedication to disciplined, high-quality engineering.";
        new Typed('#expertise-intro', {
            strings: [text],
            typeSpeed: 20,
            showCursor: false,
        });
    }

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXOG1hL0c67ms39GrW4OIY10GhdzQjULr9Drtgf0VzIHvlB8XEBFQPYMQ-50OuUTjq/exec';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('.form-submit-btn');
            const statusNote = form.querySelector('.form-status-note');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            statusNote.style.color = 'var(--color-text-secondary)';
            statusNote.textContent = 'Please wait...';
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                const queryParams = new URLSearchParams(data);
                const response = await fetch(`${SCRIPT_URL}?${queryParams}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                });
                const resultText = await response.text();
                const result = JSON.parse(resultText);
                if (result.status === 'success') {
                    statusNote.style.color = 'var(--color-primary)';
                    statusNote.textContent = 'Thank you! Your message has been sent successfully.';
                    submitButton.textContent = 'Message Sent!';
                    form.reset();
                    setTimeout(() => {
                        window.location.href = 'thankyou.html';
                    }, 2000);
                } else {
                    throw new Error(result.message || 'An unknown error occurred on the server.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                statusNote.style.color = '#F87171';
                statusNote.textContent = `Error: ${error.message}. Please try again later.`;
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    function initProficiencyBars() {
        const bars = document.querySelectorAll('.proficiency-meter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const barSpan = entry.target.querySelector('span');
                    const randomPercent = Math.floor(Math.random() * 10) + 89;
                    barSpan.style.setProperty('--proficiency', `${randomPercent}%`);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        bars.forEach(bar => observer.observe(bar));
    }

    function initSmartHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (lastScrollY < window.scrollY && window.scrollY > 150) {
                header.classList.add('header--hidden');
            } else {
                header.classList.remove('header--hidden');
            }
            lastScrollY = window.scrollY;
        });
    }

    function initCustomCursor() {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const cursorOutline = document.querySelector('.cursor-outline');
            window.addEventListener('mousemove', (e) => {
                cursorOutline.style.setProperty('--x', e.clientX + 'px');
                cursorOutline.style.setProperty('--y', e.clientY + 'px');
            });
            const hoverableElements = document.querySelectorAll('a, button, .btn, .link-arrow, .logo, .kinetic-card, .inertial-card');
            hoverableElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
            window.addEventListener('mousedown', () => document.body.classList.add('cursor-pressed'));
            window.addEventListener('mouseup', () => document.body.classList.remove('cursor-pressed'));
        }
    }

    // ---- TASK 5: UPGRADED KINETIC CARDS FOR TOUCH ----
function initKineticCards() {
    const kineticCards = document.querySelectorAll('.kinetic-card');
    kineticCards.forEach(card => {
        const tiltStrength = 10;
        const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            // This logic now checks for touch coordinates first, then mouse coordinates.
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            if (clientX === undefined || clientY === undefined) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;
            card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${-((y - rect.height / 2) / (rect.height / 2)) * tiltStrength}deg) rotateY(${((x - rect.width / 2) / (rect.width / 2)) * tiltStrength}deg)`;
        };
        const handleLeave = () => { card.style.transform = 'perspective(1000px) translateY(0) rotateX(0) rotateY(0)'; };

        // Desktop mouse events
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        
        // Mobile touch events for a premium tap-and-hold feel
        card.addEventListener('touchstart', handleMove, { passive: true });
        card.addEventListener('touchend', handleLeave);
    });
}

// ---- TASK 5: UPGRADED INERTIAL CARDS FOR TOUCH ----
function initInertialCards() {
    const inertialCards = document.querySelectorAll('.inertial-card');
    inertialCards.forEach(card => {
        const tiltStrength = 4;
        const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            if (clientX === undefined || clientY === undefined) return;
            
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            card.style.transform = `perspective(1200px) translateY(-2px) rotateX(${-((y - rect.height / 2) / (rect.height / 2)) * tiltStrength}deg) rotateY(${((x - rect.width / 2) / (rect.width / 2)) * tiltStrength}deg)`;
        };
        const handleLeave = () => { card.style.transform = 'perspective(1200px) translateY(0) rotateX(0) rotateY(0)'; };

        // Desktop mouse events
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);

        // Mobile touch events
        card.addEventListener('touchstart', handleMove, { passive: true });
        card.addEventListener('touchend', handleLeave);
    });
}

    function initButtonRipples() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                const existingRipple = this.querySelector('.ripple');
                if (existingRipple) existingRipple.remove();
                this.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }

    function initFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-element');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        fadeElements.forEach(element => observer.observe(element));
    }

    function initCopyrightYear() {
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    initPortfolio();
});