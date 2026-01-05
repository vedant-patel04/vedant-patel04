// ================================
// VEDANT PATEL - CYBERSECURITY PORTFOLIO
// JavaScript Interactions & Animations
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initTypingEffect();
    initSkillBars();
    initScrollAnimations();
});

// ================================
// MATRIX BACKGROUND ANIMATION
// ================================
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:<>?/\\~`';
    const charArray = chars.split('');
    
    // Column settings
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    
    // Track drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black for fade effect
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Green text
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px Fira Code, monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop when it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 50);
}

// ================================
// TYPING EFFECT
// ================================
function initTypingEffect() {
    const element = document.getElementById('typed-header');
    const text = 'Vedant Patel | SOC Analyst | Cybersecurity & Threat Detection';
    let index = 0;
    let isDeleting = false;
    let pauseEnd = false;
    
    function type() {
        if (pauseEnd) {
            setTimeout(() => {
                pauseEnd = false;
                isDeleting = true;
                type();
            }, 3000);
            return;
        }
        
        if (isDeleting) {
            element.textContent = text.substring(0, index - 1);
            index--;
            
            if (index === 0) {
                isDeleting = false;
                setTimeout(type, 500);
                return;
            }
        } else {
            element.textContent = text.substring(0, index + 1);
            index++;
            
            if (index === text.length) {
                pauseEnd = true;
                type();
                return;
            }
        }
        
        // Speed control
        const speed = isDeleting ? 30 : 80;
        setTimeout(type, speed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// ================================
// ANIMATED SKILL BARS
// ================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ================================
// SCROLL ANIMATIONS
// ================================
function initScrollAnimations() {
    // Add fade-in animation to cards on scroll
    const animatedElements = document.querySelectorAll(
        '.about-card, .skill-category, .project-card, .cert-badge, .education-item, .contact-card, .stats-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animation for grid items
    const grids = document.querySelectorAll('.skills-grid, .projects-grid, .certifications-grid');
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// PARALLAX EFFECT ON HEADER
// ================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (header && scrolled < window.innerHeight) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ================================
// TERMINAL TYPING ANIMATION
// ================================
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line .command');
    
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 1500);
    });
}

// Initialize terminal animation when visible
const terminalBlock = document.querySelector('.terminal-block');
if (terminalBlock) {
    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initTerminalAnimation();
            terminalObserver.unobserve(terminalBlock);
        }
    }, { threshold: 0.5 });
    
    terminalObserver.observe(terminalBlock);
}

// ================================
// INTERACTIVE HOVER EFFECTS
// ================================
const cards = document.querySelectorAll('.project-card, .skill-category, .about-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ================================
// CONSOLE EASTER EGG
// ================================
console.log('%c🛡️ Welcome to Vedant Patel\'s Portfolio!', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cIf you\'re seeing this, you\'re probably a fellow security enthusiast! 🔐', 'color: #00d1ff; font-size: 14px;');
console.log('%cFeel free to inspect the code - it\'s all clean! 💻', 'color: #8b949e; font-size: 12px;');
