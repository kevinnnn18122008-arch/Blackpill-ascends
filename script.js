// ========== LIQUID CANVAS ANIMATION ==========
const canvas = document.getElementById('liquidCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 150 + 50;
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.vx *= -1;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.vy *= -1;
            }

            // Keep within bounds
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        draw() {
            ctx.fillStyle = `rgba(40, 40, 40, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.strokeStyle = `rgba(192, 192, 192, ${this.opacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    const particles = [];
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }

    function animate() {
        // Dark background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// ========== SMOOTH SCROLL BEHAVIOR ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== BUTTON INTERACTIONS ==========
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== PAYMENT BUTTON HANDLERS (Razorpay Ready) ==========
document.querySelectorAll('[data-plan]').forEach(btn => {
    btn.addEventListener('click', function() {
        const plan = this.dataset.plan;
        console.log(`Plan selected: ${plan}`);
        
        // Placeholder for Razorpay integration
        // Example structure:
        /*
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID",
            amount: getPlanAmount(plan),
            currency: "INR",
            name: "Blackpill Essence",
            description: `${plan} Plan`,
            image: "logo-url",
            handler: function(response) {
                console.log("Payment successful:", response);
            },
            prefill: {
                email: userEmail,
                contact: userPhone
            }
        };
        const rzp = new Razorpay(options);
        rzp.open();
        */
        
        alert(`${plan.toUpperCase()} plan selected. Razorpay integration coming soon!`);
    });
});

// ========== FORM SUBMISSION ==========
const consultationForm = document.querySelector('.consultation-form');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Placeholder for backend integration
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        const btn = this.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Consultation Scheduled!';
        btn.style.background = 'rgba(192, 192, 192, 0.3)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .detail-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ========== NAVBAR SCROLL EFFECT ==========
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.85)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== ACTIVE NAV LINK ==========
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar-right a').forEach(link => {
        link.style.color = '#b8b8b8';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#ffffff';
        }
    });
});

// ========== MOBILE MENU TOGGLE (Optional for smaller screens) ==========
function setupResponsiveMenu() {
    const navbarRight = document.querySelector('.navbar-right');
    
    if (window.innerWidth <= 768) {
        navbarRight.style.maxHeight = '0';
        navbarRight.style.overflow = 'hidden';
        navbarRight.style.transition = 'max-height 0.3s ease';
    }
}

window.addEventListener('resize', setupResponsiveMenu);
setupResponsiveMenu();

// ========== CONSOLE MESSAGE ==========
console.log('%cBlackpill Essence', 'font-size: 24px; font-weight: bold; color: #c0c0c0;');
console.log('%cElite Transformation Platform', 'font-size: 14px; color: #a8a8a8;');