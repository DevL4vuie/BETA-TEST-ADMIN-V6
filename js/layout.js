document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. AUTO-HIGHLIGHT LOGIC (The "Function") --- */
    // Get current file name (e.g. "dashboard.html")
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";
    
    // Select all menu links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Check exact match OR if current page matches the link
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* --- 2. MOBILE MENU LOGIC --- */
    // Even if buttons are hidden in HTML, we keep the logic ready 
    // in case you add a trigger later.
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const mobileBtn = document.querySelector('.mobile-menu-btn'); // Currently removed from HTML

    function closeSidebar() {
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
    }

    if (overlay) overlay.addEventListener('click', closeSidebar);
    
    // Safety check: close sidebar when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });
});