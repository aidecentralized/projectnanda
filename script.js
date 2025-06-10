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
        // Prevent adding multiple listeners if function is called more than once
        if (themeToggleBtn.getAttribute('data-listener-attached') !== 'true') {
            themeToggleBtn.addEventListener('click', () => {
                const currentIsDark = document.body.classList.contains('dark-mode');
                const newTheme = currentIsDark ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
            themeToggleBtn.setAttribute('data-listener-attached', 'true');
        }
    }

    // Listen for changes in OS theme preference
    // Check if listener already exists for this media query
    if (!prefersDarkScheme.hasThemeChangeListener) { // Custom flag to track listener
        prefersDarkScheme.addEventListener('change', (e) => {
            // Only apply if no theme is explicitly saved by the user
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
        prefersDarkScheme.hasThemeChangeListener = true;
    }
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

    initializeThemeChanger();
}

// Fetch and include external HTML snippets
function includeHTML() {
    const includeElements = document.querySelectorAll('[data-include]');
    let filesProcessed = 0;
    const totalFiles = includeElements.length;

    if (totalFiles === 0) {
        // If no includes, ensure theme changer and video thumbnails are initialized if their elements exist
        if (document.getElementById('theme-toggle')) {
            initializeThemeChanger();
        }
        initVideoThumbnails(); // Initialize video thumbnails even if no includes
        return;
    }

    includeElements.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(res => {
                if (res.ok) return res.text();
                console.error('Failed to fetch include:', file, res.status);
                return '';
            })
            .then(html => {
                el.innerHTML = html;
                if (file === 'navbar.html') {
                    initNavbar();
                }
            })
            .catch(error => {
                console.error('Error including HTML:', file, error);
                el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
            })
            .finally(() => {
                filesProcessed++;
                if (filesProcessed === totalFiles) {
                    // All includes processed, now safe to initialize anything that might depend on them
                    // or elements present on the main page.
                    if (document.getElementById('theme-toggle') && !document.getElementById('theme-toggle').hasAttribute('data-listener-attached')) {
                        // If navbar was not an include, or theme button is standalone
                        initializeThemeChanger();
                    }
                    initVideoThumbnails(); // Initialize video thumbnails after all includes
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
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

function initVideoThumbnails() {
    const thumbnailContainers = document.querySelectorAll('.video-thumbnail-container');

    thumbnailContainers.forEach(container => {
        if (container.getAttribute('data-listener-attached') === 'true') {
            return;
        }
        container.setAttribute('data-listener-attached', 'true');

        container.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            if (!videoId) return;

            this.innerHTML = ''; // Clear the thumbnail container

            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('video-container');

            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', '');

            iframeContainer.appendChild(iframe);
            this.appendChild(iframeContainer);

            this.style.cursor = 'default';
            this.style.marginBottom = '0';
        });
    });
}

// Initial theme application and other initializations on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    includeHTML();
    // initVideoThumbnails(); // Now called reliably within includeHTML's logic or after it.
});
