// ===== Initialize Lucide Icons =====
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTypingAnimation();
    initScrollReveal();
    initNavbar();
    initProjectFilters();
    initTestimonialSlider();
    initContactForm();
    initScrollTop();
    initCounterAnimation();
    initSmoothScrolling();
});

// ===== Typing Animation =====
function initTypingAnimation() {
    const typedTextEl = document.getElementById('typedText');
    if (!typedTextEl) return;

    const titles = [
        'Full Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Open Source Contributor',
        'Tech Blogger'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ===== Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== Project Filters =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
    document.head.appendChild(style);
}

// ===== Testimonial Slider =====
function initTestimonialSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dots = document.querySelectorAll('#testimonialDots .dot');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = track.children.length;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });

    // Auto-play
    let autoplayInterval = setInterval(() => {
        goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
    }, 5000);

    // Pause on hover
    const wrapper = track.closest('.testimonials-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        wrapper.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
            }, 5000);
        });
    }
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        // Simulate sending
        submitBtn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="15"/>
        </svg>
        Sending...
      </span>
    `;
        submitBtn.disabled = true;

        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(spinStyle);

        setTimeout(() => {
            submitBtn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:8px;">
          ✓ Message Sent!
        </span>
      `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
                lucide.createIcons();
            }, 2500);
        }, 1500);
    });
}

// ===== Scroll to Top =====
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Parallax effect on mouse move (subtle) =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.bg-gradient-orbs .orb');
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});
