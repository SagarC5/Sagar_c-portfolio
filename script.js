// Performance optimized JavaScript

// Cache DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Throttled scroll handler for better performance
let ticking = false;

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Batch DOM queries for better performance
    const elementsToAnimate = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.highlight-card'),
        ...document.querySelectorAll('.education-item'),
        ...document.querySelectorAll('.skills-section'),
        ...document.querySelectorAll('.certifications-section'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.resume-preview-card')
    ];

    // Add animation classes and observe elements
    elementsToAnimate.forEach((element, index) => {
        if (element.classList.contains('section-header')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('highlight-card') || 
                   element.classList.contains('project-card') ||
                   element.classList.contains('resume-preview-card')) {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${(index % 4) * 0.1}s`;
        } else if (element.classList.contains('education-item')) {
            element.classList.add('slide-in-left');
            element.style.transitionDelay = `${(index % 3) * 0.2}s`;
        } else if (element.classList.contains('skills-section')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('certifications-section')) {
            element.classList.add('slide-in-right');
        }
        observer.observe(element);
    });

    // Animate about content
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage && aboutText) {
        aboutImage.classList.add('slide-in-left');
        aboutText.classList.add('slide-in-right');
        observer.observe(aboutImage);
        observer.observe(aboutText);
    }

    // Animate contact content
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo && contactForm) {
        contactInfo.classList.add('slide-in-left');
        contactForm.classList.add('slide-in-right');
        observer.observe(contactInfo);
        observer.observe(contactForm);
    }

    // Animate resume content
    const resumeActions = document.querySelector('.resume-actions');
    if (resumeActions) {
        resumeActions.classList.add('fade-in');
        observer.observe(resumeActions);
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}




// Certificate Modal Functionality
let driveLink = "https://drive.google.com/drive/folders/1PKcYyTiKgqaECn8UWzSz0EkZQkvoewq2?usp=sharing";

// Detect if the user is the author
const urlParams = new URLSearchParams(window.location.search);
const isAuthor = urlParams.get('author') === 'true';

// Set the drive link in the button
const driveLinkElement = document.getElementById('certificateDriveLink');
if (driveLinkElement) {
    driveLinkElement.href = driveLink;
}

// If author, show the input to update link
if (isAuthor) {
    const editSection = document.getElementById('linkEditSection');
    if (editSection) editSection.style.display = 'block';
}

// Allow author to update the link during session
function updateDriveLink() {
    const newLink = document.getElementById('newDriveLink').value.trim();
    if (newLink) {
        driveLink = newLink;
        if (driveLinkElement) driveLinkElement.href = driveLink;
        alert("Drive link updated (only in this session).");
    } else {
        alert("Please enter a valid Drive link.");
    }
}

// Resume Modal Functionality
const viewResumeBtn = document.getElementById('viewResumeBtn');
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const resumeModal = document.getElementById('resumeModal');
const closeResumeModal = document.getElementById('closeResumeModal');

// Open resume modal
if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close resume modal
if (closeResumeModal) {
    closeResumeModal.addEventListener('click', () => {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Download resume functionality
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        // Create a temporary link to download a sample resume
        const link = document.createElement('a');
        link.href = 'assets/SAGAR_C_Resume_.pdf';
        link.download = 'SAGAR_C_Resume_.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        alert('Resume downloaded successfully!');
    });
}

// Back to menu functionality
if (backToMenuBtn) {
    backToMenuBtn.addEventListener('click', () => {
        // Scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize certificate display
document.addEventListener('DOMContentLoaded', () => {
    displayCertificates();
});

// Optimized parallax effect
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    parallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

// Optimized typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
});

// Optimized active navigation highlighting
let navTicking = false;

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(updateActiveNav);
        navTicking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Optimized hover effects using event delegation
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.highlight-card, .skills-section, .certifications-section, .project-card, .education-item, .resume-preview-card')) {
        const card = e.target.closest('.highlight-card, .skills-section, .certifications-section, .project-card, .education-item, .resume-preview-card');
        card.style.transform = 'translateY(-5px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.highlight-card, .skills-section, .certifications-section, .project-card, .education-item, .resume-preview-card')) {
        const card = e.target.closest('.highlight-card, .skills-section, .certifications-section, .project-card, .education-item, .resume-preview-card');
        card.style.transform = 'translateY(0)';
    }
});

// Add CSS for active nav link and loading state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3b82f6 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);