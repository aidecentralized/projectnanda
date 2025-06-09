// Initialize navigation after the navbar is loaded
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n =>
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        })
    );
}

// Fetch and include external HTML snippets
function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
                console.error('Failed to fetch include:', file, res.status);
                return ''; // Avoid breaking page on fetch error
            })
            .then(html => {
                el.innerHTML = html;
                if (file === 'navbar.html') {
                    // The active link highlighting script is in navbar.html itself.
                    // initNavbar here is for hamburger functionality.
                    initNavbar();
                }
            })
            .catch(error => {
                console.error('Error including HTML:', file, error);
                el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
            });
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);

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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
            navbar.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            // Revert to the exact style defined in CSS for the .navbar at top
            navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)');
            navbar.style.setProperty('backdrop-filter', 'blur(10px)');
            navbar.style.boxShadow = 'none';
        }
    }
});
