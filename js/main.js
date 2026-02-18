// ========================================
// SHANEFAITH ELECTRICAL & CIVIL
// JavaScript - Interactive Functionality
// ========================================

'use strict';

// ========================================
// NAVIGATION - Mobile Menu Toggle
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Clear all error messages
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate Name
        if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate Message
        if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            submitForm(name, email, phone, message);
        }
    });
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Find the input field and add error styling
        const inputElement = errorElement.previousElementSibling;
        if (inputElement) {
            inputElement.style.borderColor = '#e74c3c';
        }
    }
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
    
    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(element => {
        element.style.borderColor = '#ecf0f1';
    });
}

// Submit form (Demo - in production, send to backend)
function submitForm(name, email, phone, message) {
    const formMessage = document.getElementById('formMessage');
    
    // Simulate form submission
    contactForm.style.opacity = '0.6';
    contactForm.style.pointerEvents = 'none';
    
    // Show success message
    formMessage.textContent = 'Thank you! We received your message and will contact you shortly.';
    formMessage.classList.add('success');
    
    // Reset form after 2 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
        formMessage.textContent = '';
        formMessage.classList.remove('success');
    }, 3000);
    
    // Log form data (production: send to server)
    console.log('Form submitted:', { name, email, phone, message });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, project cards, and trust cards
const animatedElements = document.querySelectorAll(
    '.service-card, .project-card, .trust-card, .highlight-item'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// NAVBAR STYLING ON SCROLL
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// IMAGE LAZY LOADING
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// EXTERNAL LINK HANDLING
// ========================================

// WhatsApp Integration
const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow normal behavior - opens WhatsApp
        // In production, you could track this click
        console.log('WhatsApp clicked');
    });
});

// Phone Call Links
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Phone call initiated');
    });
});

// ========================================
// REAL-TIME FORM INPUT FEEDBACK
// ========================================

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        // Clear error when user starts typing
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            input.style.borderColor = '#ecf0f1';
        }
    });
});

// ========================================
// UTILITY - PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ========================================
// KEYBOARD NAVIGATION
// ========================================

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// CONSOLE LOGGING - DEVELOPMENT
// ========================================

console.log(`
=====================================
ShaneFaith Electrical & Civil
Professional Website - ${new Date().getFullYear()}
=====================================
For inquiries, visit shanefaith.co.za
or call us at: +27 (0) XX XXX XXXX
=====================================
`);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}, 100));
