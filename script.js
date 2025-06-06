// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Navbar scroll effect - Simplified to always keep white background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            // Enhanced shadow when scrolling but always white
            navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
            navbar.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            // Default state - still white
            navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
            navbar.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        }
    }
});
