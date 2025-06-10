// Function to apply the selected theme
function applyTheme(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️'; // Sun icon for light mode switch
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙'; // Moon icon for dark mode switch
    }
}

// Function to set up the theme toggle button listener and OS preference listener
function initializeThemeChanger() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Event listener for the toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentIsDark = document.body.classList.contains('dark-mode');
            const newTheme = currentIsDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Listen for changes in OS theme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only apply if no theme is explicitly saved by the user
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Initialize navigation (hamburger menu)
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n =>
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            })
        );
    }

    // Crucially, set up the theme toggle button listener *after* navbar HTML is loaded
    initializeThemeChanger();
}

// Fetch and include external HTML snippets
function includeHTML() {
    const includeElements = document.querySelectorAll('[data-include]');
    let filesProcessed = 0;

    if (includeElements.length === 0) {
        // If no includes, but navbar might exist (e.g. if HTML is pre-rendered with navbar)
        // and theme toggle button is present, try to initialize it.
        // This also covers case where navbar.html might not be an include but theme toggle is.
        if (document.getElementById('theme-toggle')) {
            const testBtn = document.getElementById('theme-toggle');
            // Check if theme changer hasn't been setup by a potential initNavbar call
            if (testBtn && !testBtn.getAttribute('data-listener-set-main')) {
                initializeThemeChanger();
                if(testBtn) testBtn.setAttribute('data-listener-set-main', 'true'); // Mark as set up by this path
            }
        }
        return;
    }

    includeElements.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
                console.error('Failed to fetch include:', file, res.status);
                return '';
            })
            .then(html => {
                el.innerHTML = html;
                if (file === 'navbar.html') {
                    initNavbar(); // initNavbar now also calls initializeThemeChanger
                    // Mark the button as listener-set by initNavbar to avoid re-init by the 'finally' block
                    const themeBtn = document.getElementById('theme-toggle');
                    if (themeBtn) themeBtn.setAttribute('data-listener-set-initnavbar', 'true');
                }
            })
            .catch(error => {
                console.error('Error including HTML:', file, error);
                el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
            })
            .finally(() => {
                filesProcessed++;
                // If all includes are processed and theme changer hasn't been init (e.g. no navbar.html)
                // but a theme-toggle button exists standalone.
                if (filesProcessed === includeElements.length) {
                     const themeBtn = document.getElementById('theme-toggle');
                     if (themeBtn && !themeBtn.getAttribute('data-listener-set-initnavbar') && !themeBtn.getAttribute('data-listener-set-main')) {
                        initializeThemeChanger();
                        themeBtn.setAttribute('data-listener-set-main', 'true'); // Mark as set up
                     }
                }
            });
    });
}

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
            // navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
            // navbar.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            // navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)');
            // navbar.style.setProperty('backdrop-filter', 'blur(10px)');
            navbar.style.boxShadow = 'none';
        }
    }
});

// Initial theme application on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default
    }

    includeHTML();
});
