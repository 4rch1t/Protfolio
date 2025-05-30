document.addEventListener('DOMContentLoaded', () => {
    
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercentage + '%';
    });
    
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
       
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            
            setTimeout(() => {
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });
        
        
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .social-link, .skill-item, .info-item, .btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
                cursorDot.style.boxShadow = '0 0 20px rgba(0, 245, 160, 0.7)';
                cursorOutline.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
                cursorDot.style.boxShadow = '0 0 15px rgba(0, 245, 160, 0.5)';
                cursorOutline.classList.remove('hover');
            });
        });
        
        
        document.addEventListener('mouseout', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
    }
    
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (document.body.classList.contains('light-theme')) {
                nav.style.backgroundColor = 'rgba(255,255,255,0.95)';
                nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            } else {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            }
        } else {
            if (document.body.classList.contains('light-theme')) {
                nav.style.backgroundColor = 'rgba(255,255,255,0.85)';
                nav.style.boxShadow = 'none';
            } else {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
                nav.style.boxShadow = 'none';
            }
        }
    });
    
    
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            
            console.log('Form submitted with values:', formValues);
            
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.color = 'var(--accent-primary)';
            successMessage.style.marginTop = '20px';
            successMessage.style.padding = '15px';
            successMessage.style.border = '1px solid var(--accent-primary)';
            successMessage.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
            
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    
    const skillBars = document.querySelectorAll('.skill-level');
    
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar.parentElement)) {
                const width = bar.style.width;
                bar.style.width = width;
            }
        });
    }
    
    
    const heroText = document.querySelector('.hero-content h2');
    
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        
        setTimeout(typeWriter, 500);
    }
    
    
    const sections = document.querySelectorAll('section:not(.hero)');
    
    function checkSections() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }
    
    
    const backToTopBtn = document.querySelector('.back-to-top');
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    function toggleBackToTopBtn() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    
    const heroImage = document.querySelector('.image-container');
    
    function parallaxEffect() {
        if (heroImage) {
            const scrollValue = window.scrollY;
            if (scrollValue < window.innerHeight) {
                heroImage.style.transform = `rotate(-5deg) translateY(${scrollValue * 0.1}px)`;
            }
        }
    }
    
    
    checkSections();
    animateSkillBars();
    toggleBackToTopBtn();
    
    
    window.addEventListener('scroll', () => {
        checkSections();
        animateSkillBars();
        toggleBackToTopBtn();
        parallaxEffect();
    });
    
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});