
// // // export function initSidebar() {
// // //     // 1. Get Current Page Name
// // //     const currentPage = window.location.pathname.split("/").pop() || "index.html";

// // //     // 2. GET USER ROLE
// // //     // Change this to 'cashier' or 'clerk' to test the different views!
// // //     // In the real app, this value comes from the Login page.
// // //     const userRole = localStorage.getItem('userRole') || 'admin'; 

// // //     console.log("Current User Role:", userRole);

// // //     // 3. Define Menu Items & Permissions
// // //     const menuItems = [
// // //         { 
// // //             name: "Dashboard", 
// // //             link: "dashboard.html", 
// // //             icon: "fa-home", 
// // //             roles: ['admin', 'cashier'] 
// // //         },
// // //         { 
// // //             name: "POS", 
// // //             link: "pos.html", 
// // //             icon: "fa-cash-register", 
// // //             roles: ['admin', 'cashier'] 
// // //         },
// // //         { 
// // //             name: "Transactions", 
// // //             link: "transactions.html", 
// // //             icon: "fa-receipt", 
// // //             roles: ['admin', 'cashier'] 
// // //         },
// // //         { 
// // //             name: "Sales", 
// // //             link: "sales.html", 
// // //             icon: "fa-chart-line", 
// // //             roles: ['admin', 'cashier'] 
// // //         },
// // //         { 
// // //             name: "Products", 
// // //             link: "products.html", 
// // //             icon: "fa-box", 
// // //             roles: ['admin', 'clerk'] 
// // //         },
// // //         { 
// // //             name: "Inventory", 
// // //             link: "inventory.html", 
// // //             icon: "fa-boxes", 
// // //             roles: ['admin', 'clerk'] 
// // //         },
// // //         { 
// // //             name: "Settings", 
// // //             link: "settings.html", 
// // //             icon: "fa-cog", 
// // //             roles: ['admin'] 
// // //         }
// // //     ];

// // //     // 4. Filter Items based on Role
// // //     const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

// // //     // 5. Generate Menu HTML
// // //     let navLinksHTML = "";
// // //     visibleItems.forEach(item => {
// // //         const isActive = currentPage === item.link ? "active" : "";
// // //         navLinksHTML += `
// // //             <li>
// // //                 <a href="${item.link}" class="${isActive}">
// // //                     <i class="fas ${item.icon}"></i> 
// // //                     <span>${item.name}</span>
// // //                 </a>
// // //             </li>
// // //         `;
// // //     });

// // //     // 6. Build the Sidebar Structure
// // //     const sidebarHTML = `
// // //         <div class="sidebar-header">
// // //             <i class="fas fa-piggy-bank brand-icon"></i>
// // //             <div class="brand-text">
// // //                 <h2>Gene's Lechon</h2>
// // //                 <span style="text-transform: capitalize; color: #aaa; font-size: 12px;">${userRole} Panel</span>
// // //             </div>
// // //         </div>

// // //         <div class="menu-label">MENU</div>
// // //         <ul class="nav-links">
// // //             ${navLinksHTML}
// // //         </ul>

// // //         <div class="sidebar-footer">
// // //             <button class="btn-logout-sidebar" onclick="window.openLogoutModal()">
// // //                 <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
// // //             </button>
// // //         </div>
// // //     `;

// // //     // 7. Inject into Placeholder
// // //     const sidebarElement = document.getElementById('sidebar-placeholder');
// // //     if (sidebarElement) {
// // //         sidebarElement.className = "sidebar"; // Apply CSS class
// // //         sidebarElement.innerHTML = sidebarHTML;
// // //     }

// // //     injectLogoutModal();
// // // }

// // // function injectLogoutModal() {
// // //     // Check if modal already exists to avoid duplicates
// // //     if (document.getElementById('logoutModal')) return;

// // //     const modalHTML = `
// // //     <div class="modal" id="logoutModal">
// // //         <div class="modal-content center-content" style="max-width: 350px;">
// // //             <div style="width: 60px; height: 60px; background: #ffebee; color: #f44336; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px;">
// // //                 <i class="fas fa-sign-out-alt"></i>
// // //             </div>
// // //             <h3>Sign Out?</h3>
// // //             <p style="color:#666; margin-bottom: 20px;">Are you sure you want to end your session?</p>
// // //             <div class="modal-footer center-footer" style="display: flex; justify-content: center; gap: 10px;">
// // //                 <button type="button" class="btn-outline" onclick="document.getElementById('logoutModal').style.display='none'" style="padding: 10px 20px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer;">Cancel</button>
// // //                 <button type="button" class="btn-danger" onclick="window.location.href='index.html'" style="padding: 10px 20px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer;">Logout</button>
// // //             </div>
// // //         </div>
// // //     </div>
// // //     `;
// // //     document.body.insertAdjacentHTML('beforeend', modalHTML);
    
// // //     // Make global function to open it
// // //     window.openLogoutModal = function() {
// // //         document.getElementById('logoutModal').style.display = 'flex';
// // //     }
// // // }


// // export function initSidebar() {
// //     // 1. Get Current Page Name
// //     const currentPage = window.location.pathname.split("/").pop() || "index.html";

// //     // 2. GET USER ROLE
// //     const userRole = localStorage.getItem('userRole') || 'admin'; 

// //     // 3. Define Menu Items
// //     const menuItems = [
// //         { 
// //             name: "Dashboard", 
// //             link: "dashboard.html", 
// //             icon: "fa-th-large", 
// //             roles: ['admin', 'cashier'] 
// //         },
// //         { 
// //             name: "POS System", 
// //             link: "pos.html", 
// //             icon: "fa-cash-register", 
// //             roles: ['admin', 'cashier'] 
// //         },
// //         { 
// //             name: "Sales", 
// //             link: "sales.html", 
// //             icon: "fa-chart-line", 
// //             roles: ['admin', 'cashier'] 
// //         },
// //         { 
// //             name: "Transactions", 
// //             link: "transactions.html", 
// //             icon: "fa-history", 
// //             roles: ['admin', 'cashier'] 
// //         },
// //         { 
// //             name: "Inventory", 
// //             link: "inventory.html", 
// //             icon: "fa-boxes", 
// //             roles: ['admin', 'clerk'] 
// //         },
// //         { 
// //             name: "Products", 
// //             link: "products.html", 
// //             icon: "fa-tag", 
// //             roles: ['admin', 'clerk'] 
// //         },

// //     ];

// //     // 4. Filter Items based on Role
// //     const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

// //     // 5. Generate Menu HTML
// //     let navLinksHTML = "";
    
// //     // Helper to check active state
// //     const isActive = (link) => currentPage === link ? "active" : "";

// //     visibleItems.forEach(item => {
// //         navLinksHTML += `
// //             <li>
// //                 <a href="${item.link}" class="${isActive(item.link)}">
// //                     <i class="fas ${item.icon}"></i> 
// //                     <span>${item.name}</span>
// //                 </a>
// //             </li>
// //         `;
// //     });

// //     // 6. Build the Sidebar Structure
// //     const sidebarHTML = `
// //         <div class="sidebar-header">
// //             <i class="fas fa-piggy-bank brand-icon"></i>
// //             <div class="brand-text">
// //                 <h2>Gene's Lechon</h2>
// //                 <span style="text-transform: capitalize; color: #aaa; font-size: 12px;">${userRole} Panel</span>
// //             </div>
// //         </div>

// //         <div class="menu-label">MENU</div>
// //         <ul class="nav-links">
// //             ${navLinksHTML}
// //         </ul>

// //         <div class="sidebar-footer">
// //             <a href="#" class="btn-logout-sidebar" onclick="window.openLogoutModal()">
// //                 <i class="fas fa-sign-out-alt"></i> <span>Sign Out</span>
// //             </a>
// //         </div>
// //     `;

// //     // 7. Inject into Placeholder
// //     const sidebarElement = document.getElementById('sidebar-placeholder');
// //     if (sidebarElement) {
// //         sidebarElement.className = "sidebar"; // Ensure CSS class is applied
// //         sidebarElement.innerHTML = sidebarHTML;
// //     }

// //     injectLogoutModal();
// // }

// // function injectLogoutModal() {
// //     // Check if modal already exists
// //     if (document.getElementById('logoutModal')) return;

// //     // THIS IS YOUR ORIGINAL DESIGN STYLE
// //     const modalHTML = `
// //     <div class="modal" id="logoutModal">
// //         <div class="modal-content small-modal" style="text-align: center; max-width: 350px;">
// //             <div class="logout-icon-container" style="margin-bottom: 20px;">
// //                 <div style="background: #fee; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
// //                     <i class="fas fa-sign-out-alt" style="font-size: 28px; color: #f44336; margin-left: 5px;"></i>
// //                 </div>
// //             </div>
// //             <h3 style="color: var(--navy); margin-bottom: 10px; font-size: 20px;">Sign Out?</h3>
// //             <p style="color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">
// //                 Are you sure you want to end your session?
// //             </p>
// //             <div class="modal-footer" style="justify-content: space-between; background: transparent; padding: 0;">
// //                 <button class="btn-cancel" onclick="document.getElementById('logoutModal').style.display='none'">Cancel</button>
// //                 <button class="btn-pay" style="background: #f44336; border:none; box-shadow: 0 4px 10px rgba(244, 67, 54, 0.3);" onclick="window.location.href='index.html'">Yes, Sign Out</button>
// //             </div>
// //         </div>
// //     </div>
// //     `;
    
// //     document.body.insertAdjacentHTML('beforeend', modalHTML);
    
// //     // Global function to open it
// //     window.openLogoutModal = function() {
// //         document.getElementById('logoutModal').style.display = 'flex';
// //     }
// // }









// // // 1. IMPORT FIREBASE TOOLS DIRECTLY
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { auth } from './firebase.js'; 

// // export function initSidebar() {
// //     // 1. Get Current Page & Role
// //     const currentPage = window.location.pathname.split("/").pop() || "index.html";
// //     const userRole = localStorage.getItem('userRole') || 'admin'; 

// //     // 2. Define Menu Items
// //     const menuItems = [
// //         { name: "Dashboard", link: "dashboard.html", icon: "fa-th-large", roles: ['admin', 'cashier'] },
// //         { name: "POS System", link: "pos.html", icon: "fa-cash-register", roles: ['admin', 'cashier'] },
// //         { name: "Sales", link: "sales.html", icon: "fa-chart-line", roles: ['admin', 'cashier'] },
// //         { name: "Transactions", link: "transactions.html", icon: "fa-history", roles: ['admin', 'cashier'] },
// //         { name: "Inventory", link: "inventory.html", icon: "fa-boxes", roles: ['admin', 'clerk'] },
// //         { name: "Products", link: "products.html", icon: "fa-tag", roles: ['admin', 'clerk'] },
// //         { name: "Manage Users", link: "users.html", icon: "fa-users", roles: ['admin'] },
// //     ];

// //     // 3. Build Menu HTML
// //     let navLinksHTML = "";
// //     const visibleItems = menuItems.filter(item => item.roles.includes(userRole));
    
// //     visibleItems.forEach(item => {
// //         const activeClass = (currentPage === item.link) ? "active" : "";
// //         navLinksHTML += `
// //             <li>
// //                 <a href="${item.link}" class="${activeClass}">
// //                     <i class="fas ${item.icon}"></i> 
// //                     <span>${item.name}</span>
// //                 </a>
// //             </li>
// //         `;
// //     });

// //     // 4. Build Sidebar HTML
// //     const sidebarHTML = `
// //         <div class="sidebar-header">
// //             <i class="fas fa-piggy-bank brand-icon"></i>
// //             <div class="brand-text">
// //                 <h2>Gene's Lechon</h2>
// //                 <span style="text-transform: capitalize; color: #aaa; font-size: 12px;">${userRole} Panel</span>
// //             </div>
// //         </div>

// //         <div class="menu-label">MENU</div>
// //         <ul class="nav-links">
// //             ${navLinksHTML}
// //         </ul>

// //         <div class="sidebar-footer">
// //             <button class="btn-logout-sidebar" onclick="window.openLogoutModal()">
// //                 <i class="fas fa-sign-out-alt"></i> <span>Sign Out</span>
// //             </button>
// //         </div>
// //     `;

// //     // 5. Inject into Page
// //     const sidebarElement = document.getElementById('sidebar-placeholder');
// //     if (sidebarElement) {
// //         sidebarElement.className = "sidebar";
// //         sidebarElement.innerHTML = sidebarHTML;
// //     }

// //     // 6. Initialize the Modal
// //     injectLogoutModal();
// // }

// // function injectLogoutModal() {
// //     if (document.getElementById('logoutModal')) return;

// //     const modalHTML = `
// //     <div class="modal" id="logoutModal">
// //         <div class="modal-content small-modal" style="text-align: center; max-width: 350px;">
// //             <div class="logout-icon-container" style="margin-bottom: 20px;">
// //                 <div style="background: #fee; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
// //                     <i class="fas fa-sign-out-alt" style="font-size: 28px; color: #f44336; margin-left: 5px;"></i>
// //                 </div>
// //             </div>
// //             <h3 style="color: var(--navy); margin-bottom: 10px; font-size: 20px;">Sign Out?</h3>
// //             <p style="color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">
// //                 Are you sure you want to end your session?
// //             </p>
// //             <div class="modal-footer" style="justify-content: space-between; background: transparent; padding: 0;">
// //                 <button class="btn-cancel" onclick="document.getElementById('logoutModal').style.display='none'">Cancel</button>
// //                 <button class="btn-pay" style="background: #f44336; border:none; box-shadow: 0 4px 10px rgba(244, 67, 54, 0.3);" onclick="window.handleLogoutClick()">Yes, Sign Out</button>
// //             </div>
// //         </div>
// //     </div>
// //     `;
    
// //     document.body.insertAdjacentHTML('beforeend', modalHTML);
// // }

// // // ==========================================
// // // FORCE GLOBAL ACCESS
// // // ==========================================

// // // 1. Open Modal
// // window.openLogoutModal = function() {
// //     const modal = document.getElementById('logoutModal');
// //     if (modal) modal.style.display = 'flex';
// // };

// // // 2. THE REAL LOGOUT (Fixed!)
// // window.handleLogoutClick = async function() {
// //     try {
// //         // We now call Firebase DIRECTLY here.
// //         // We do not rely on window.logout() from other files.
// //         await signOut(auth);
        
// //         // Clear all local data
// //         localStorage.clear();
        
// //         // Redirect to Login
// //         window.location.href = 'index.html';
        
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //         // Force redirect even if error
// //         localStorage.clear();
// //         window.location.href = 'index.html';
// //     }
// // };








// // // 1. IMPORT FIREBASE TOOLS DIRECTLY
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { auth } from './firebase.js'; 

// // export function initSidebar() {
// //     const currentPage = window.location.pathname.split("/").pop() || "index.html";

// //     // Menu items matching the screenshot exactly
// //     const menuItems = [
// //         { name: "Dashboard",    link: "dashboard.html",    icon: "fa-th-large"      },
// //         { name: "POS System",   link: "pos.html",          icon: "fa-cash-register" },
// //         { name: "Sales",        link: "sales.html",        icon: "fa-chart-line"    },
// //         { name: "Transactions", link: "transactions.html", icon: "fa-history"       },
// //         { name: "Inventory",    link: "inventory.html",    icon: "fa-boxes"         },
// //         { name: "Products",     link: "products.html",     icon: "fa-tag"           },
// //         { name: "Manage Users", link: "users.html",        icon: "fa-users"         },
// //     ];

// //     let navLinksHTML = "";
// //     menuItems.forEach(item => {
// //         const isActive = currentPage === item.link;
// //         navLinksHTML += `
// //             <li>
// //                 <a href="${item.link}" class="${isActive ? 'active' : ''}">
// //                     <i class="fas ${item.icon}"></i>
// //                     <span>${item.name}</span>
// //                 </a>
// //             </li>
// //         `;
// //     });

// //     const sidebarHTML = `
// //         <div class="sidebar-header">
// //             <div class="brand-icon">
// //                 <i class="fas fa-piggy-bank"></i>
// //             </div>
// //             <div class="brand-text">
// //                 <h2>Gene's Lechon</h2>
// //                 <span>Admin Panel</span>
// //             </div>
// //         </div>

// //         <p class="menu-label">MENU</p>
// //         <ul class="nav-links">
// //             ${navLinksHTML}
// //         </ul>

// //         <div class="sidebar-footer">
// //             <button class="btn-logout-sidebar" onclick="window.openLogoutModal()">
// //                 <i class="fas fa-sign-out-alt"></i>
// //                 <span>Sign Out</span>
// //             </button>
// //         </div>
// //     `;

// //     const sidebarElement = document.getElementById('sidebar-placeholder');
// //     if (sidebarElement) {
// //         sidebarElement.className = "sidebar";
// //         sidebarElement.innerHTML = sidebarHTML;
// //     }

// //     injectLogoutModal();
// // }

// // function injectLogoutModal() {
// //     if (document.getElementById('logoutModal')) return;

// //     const modalHTML = `
// //     <div class="modal" id="logoutModal">
// //         <div class="modal-content small-modal" style="text-align: center; max-width: 350px;">
// //             <div style="margin-bottom: 20px;">
// //                 <div style="background: #fee; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
// //                     <i class="fas fa-sign-out-alt" style="font-size: 28px; color: #f44336; margin-left: 5px;"></i>
// //                 </div>
// //             </div>
// //             <h3 style="color: var(--navy); margin-bottom: 10px; font-size: 20px;">Sign Out?</h3>
// //             <p style="color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">
// //                 Are you sure you want to end your session?
// //             </p>
// //             <div class="modal-footer" style="justify-content: space-between; background: transparent; padding: 0;">
// //                 <button class="btn-cancel" onclick="document.getElementById('logoutModal').style.display='none'">Cancel</button>
// //                 <button class="btn-pay" style="background: #f44336; border:none; box-shadow: 0 4px 10px rgba(244,67,54,0.3);" onclick="window.handleLogoutClick()">Yes, Sign Out</button>
// //             </div>
// //         </div>
// //     </div>
// //     `;
// //     document.body.insertAdjacentHTML('beforeend', modalHTML);
// // }

// // window.openLogoutModal = function() {
// //     const modal = document.getElementById('logoutModal');
// //     if (modal) modal.style.display = 'flex';
// // };

// // window.handleLogoutClick = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.clear();
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //         localStorage.clear();
// //         window.location.href = 'index.html';
// //     }
// // };




// // // 1. IMPORT FIREBASE TOOLS DIRECTLY
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { auth } from './firebase.js'; 

// // export function initSidebar() {
// //     const currentPage = window.location.pathname.split("/").pop() || "index.html";

// //     // Menu items matching the screenshot exactly
// //     const menuItems = [
// //         { name: "Dashboard",    link: "dashboard.html",    icon: "fa-th-large"      },
// //         { name: "POS System",   link: "pos.html",          icon: "fa-cash-register" },
// //         { name: "Sales",        link: "sales.html",        icon: "fa-chart-line"    },
// //         { name: "Transactions", link: "transactions.html", icon: "fa-history"       },
// //         { name: "Inventory",    link: "inventory.html",    icon: "fa-boxes"         },
// //         { name: "Products",     link: "products.html",     icon: "fa-tag"           },
// //         { name: "Manage Users", link: "users.html",        icon: "fa-users"         },
// //     ];

// //     let navLinksHTML = "";
// //     menuItems.forEach(item => {
// //         const isActive = currentPage === item.link;
// //         navLinksHTML += `
// //             <li>
// //                 <a href="${item.link}" class="${isActive ? 'active' : ''}">
// //                     <i class="fas ${item.icon}"></i>
// //                     <span>${item.name}</span>
// //                 </a>
// //             </li>
// //         `;
// //     });

// //     const sidebarHTML = `
// //         <div class="sidebar-header">
// //             <div class="brand-icon">
// //                 <i class="fas fa-piggy-bank"></i>
// //             </div>
// //             <div class="brand-text">
// //                 <h2>Gene's Lechon</h2>
// //                 <span>Admin Panel</span>
// //             </div>
// //         </div>

// //         <p class="menu-label">MENU</p>
// //         <ul class="nav-links">
// //             ${navLinksHTML}
// //         </ul>

// //         <div class="sidebar-footer">
// //             <button class="btn-logout-sidebar" onclick="window.openLogoutModal()">
// //                 <i class="fas fa-sign-out-alt"></i>
// //                 <span>Sign Out</span>
// //             </button>
// //         </div>
// //     `;

// //     const sidebarElement = document.getElementById('sidebar-placeholder');
// //     if (sidebarElement) {
// //         sidebarElement.className = "sidebar";
// //         sidebarElement.innerHTML = sidebarHTML;
// //     }

// //     injectLogoutModal();
// // }

// // function injectLogoutModal() {
// //     if (document.getElementById('logoutModal')) return;

// //     const modalHTML = `
// //     <div class="modal" id="logoutModal">
// //         <div class="modal-content small-modal" style="text-align: center; max-width: 350px;">
// //             <div style="margin-bottom: 20px;">
// //                 <div style="background: #fee; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
// //                     <i class="fas fa-sign-out-alt" style="font-size: 28px; color: #f44336; margin-left: 5px;"></i>
// //                 </div>
// //             </div>
// //             <h3 style="color: var(--navy); margin-bottom: 10px; font-size: 20px;">Sign Out?</h3>
// //             <p style="color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">
// //                 Are you sure you want to end your session?
// //             </p>
// //             <div class="modal-footer" style="justify-content: space-between; background: transparent; padding: 0;">
// //                 <button class="btn-cancel" onclick="document.getElementById('logoutModal').style.display='none'">Cancel</button>
// //                 <button class="btn-pay" style="background: #f44336; border:none; box-shadow: 0 4px 10px rgba(244,67,54,0.3);" onclick="window.handleLogoutClick()">Yes, Sign Out</button>
// //             </div>
// //         </div>
// //     </div>
// //     `;
// //     document.body.insertAdjacentHTML('beforeend', modalHTML);
// // }

// // window.openLogoutModal = function() {
// //     const modal = document.getElementById('logoutModal');
// //     if (modal) modal.style.display = 'flex';
// // };

// // window.handleLogoutClick = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.clear();
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //         localStorage.clear();
// //         window.location.href = 'index.html';
// //     }
// // };






// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { auth } from './firebase.js';

// export function initSidebar() {
//     const currentPage = window.location.pathname.split("/").pop() || "index.html";

//     const menuItems = [
//         { name: "Dashboard",    link: "dashboard.html",    icon: "fa-th-large"      },
//         { name: "POS System",   link: "pos.html",          icon: "fa-cash-register" },
//         { name: "Sales",        link: "sales.html",        icon: "fa-chart-line"    },
//         { name: "Transactions", link: "transactions.html", icon: "fa-history"       },
//         { name: "Inventory",    link: "inventory.html",    icon: "fa-boxes"         },
//         { name: "Products",     link: "products.html",     icon: "fa-tag"           },
//         // AFTER (fixed)
//         { name: "Inquiries", link: "Inquiries.html", icon: "fa-envelope-open-text" },
//         { name: "Manage Users", link: "users.html",        icon: "fa-users"         },
//     ];

//     let navLinksHTML = "";
//     menuItems.forEach(item => {
//         const isActive = currentPage === item.link;
//         navLinksHTML += `
//             <li>
//                 <a href="${item.link}" class="${isActive ? 'active' : ''}">
//                     <i class="fas ${item.icon}"></i>
//                     <span>${item.name}</span>
//                 </a>
//             </li>
//         `;
//     });

//     const sidebarHTML = `
//         <div class="sidebar-header">
//             <div class="brand-icon"><i class="fas fa-piggy-bank"></i></div>
//             <div class="brand-text">
//                 <h2>Gene's Lechon</h2>
//                 <span>Admin Panel</span>
//             </div>
//         </div>
//         <p class="menu-label">MENU</p>
//         <ul class="nav-links">${navLinksHTML}</ul>
//         <div class="sidebar-footer">
//             <button class="btn-logout-sidebar" id="sidebarLogoutBtn">
//                 <i class="fas fa-sign-out-alt"></i>
//                 <span>Sign Out</span>
//             </button>
//         </div>
//     `;

//     // Inject sidebar into placeholder
//     const placeholder = document.getElementById('sidebar-placeholder');
//     if (placeholder) {
//         placeholder.className = "sidebar";
//         placeholder.innerHTML = sidebarHTML;
//     }

//     // Inject overlay
//     if (!document.querySelector('.sidebar-overlay')) {
//         const overlay = document.createElement('div');
//         overlay.className = 'sidebar-overlay';
//         document.body.appendChild(overlay);
//     }

//     // Inject hamburger into header
//     const header = document.querySelector('header');
//     if (header && !document.getElementById('hamburgerBtn')) {
//         const hamburger = document.createElement('button');
//         hamburger.id = 'hamburgerBtn';
//         hamburger.className = 'hamburger-btn';
//         hamburger.innerHTML = '<i class="fas fa-bars"></i>';
//         header.insertBefore(hamburger, header.firstChild);
//     }

//     setupMobileMenu();
//     injectLogoutModal();

//     document.getElementById('sidebarLogoutBtn')?.addEventListener('click', () => {
//         document.getElementById('logoutModal').style.display = 'flex';
//     });
// }

// function setupMobileMenu() {
//     const sidebar = document.querySelector('.sidebar');
//     const overlay = document.querySelector('.sidebar-overlay');
//     const hamburger = document.getElementById('hamburgerBtn');

//     const open  = () => { sidebar?.classList.add('active');    overlay?.classList.add('active');    };
//     const close = () => { sidebar?.classList.remove('active'); overlay?.classList.remove('active'); };

//     hamburger?.addEventListener('click', (e) => { e.stopPropagation(); sidebar?.classList.contains('active') ? close() : open(); });
//     overlay?.addEventListener('click', close);
//     document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', close));
//     window.addEventListener('resize', () => { if (window.innerWidth > 1024) close(); });
// }

// function injectLogoutModal() {
//     if (document.getElementById('logoutModal')) return;
//     document.body.insertAdjacentHTML('beforeend', `
//     <div id="logoutModal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center;">
//         <div style="background:#fff; border-radius:16px; padding:32px 28px; max-width:360px; width:90%; text-align:center; box-shadow:0 8px 32px rgba(0,0,0,0.18);">
//             <div style="background:#fee; width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
//                 <i class="fas fa-sign-out-alt" style="font-size:28px; color:#f44336; margin-left:4px;"></i>
//             </div>
//             <h3 style="color:#1a2b4c; margin:0 0 8px; font-size:18px;">Sign Out?</h3>
//             <p style="color:#8d97ad; font-size:14px; margin:0 0 24px;">Are you sure you want to end your session?</p>
//             <div style="display:flex; gap:12px;">
//                 <button id="logoutCancelBtn" style="flex:1; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f5f5f5; cursor:pointer; font-size:14px; color:#444; font-family:inherit;">Cancel</button>
//                 <button id="logoutConfirmBtn" style="flex:1; padding:10px; border-radius:8px; border:none; background:#f44336; cursor:pointer; font-size:14px; color:#fff; font-weight:600; font-family:inherit;">Sign Out</button>
//             </div>
//         </div>
//     </div>`);

//     const modal = document.getElementById('logoutModal');
//     document.getElementById('logoutCancelBtn').addEventListener('click', () => modal.style.display = 'none');
//     modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
//     document.getElementById('logoutConfirmBtn').addEventListener('click', async () => {
//         document.getElementById('logoutConfirmBtn').textContent = 'Signing out...';
//         try { await signOut(auth); } catch(e) { console.error(e); }
//         localStorage.clear();
//         window.location.href = 'index.html';
//     });
// }

// // Backwards compat for any inline onclick still using these
// window.openLogoutModal = () => { document.getElementById('logoutModal').style.display = 'flex'; };
// window.handleLogoutClick = async () => {
//     try { await signOut(auth); } catch(e) {}
//     localStorage.clear();
//     window.location.href = 'index.html';
// };

























import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from './firebase.js';

export function initSidebar() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const menuItems = [
        { name: "Dashboard",    link: "dashboard.html",    icon: "fa-th-large"      },
        { name: "POS System",   link: "pos.html",          icon: "fa-cash-register" },
        { name: "Sales",        link: "sales.html",        icon: "fa-chart-line"    },
        { name: "Transactions", link: "transactions.html", icon: "fa-history"       },
        { name: "Inventory",    link: "inventory.html",    icon: "fa-boxes"         },
        { name: "Products",     link: "products.html",     icon: "fa-tag"           },
        // AFTER (fixed)
        { name: "Inquiries", link: "Inquiries.html", icon: "fa-envelope-open-text" },
        { name: "Manage Users", link: "users.html",        icon: "fa-users"         },
        { name: "Customers",    link: "Customers.html",    icon: "fa-user-friends"  },
    ];

    let navLinksHTML = "";
    menuItems.forEach(item => {
        const isActive = currentPage === item.link;
        navLinksHTML += `
            <li>
                <a href="${item.link}" class="${isActive ? 'active' : ''}">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.name}</span>
                </a>
            </li>
        `;
    });

    const sidebarHTML = `
        <div class="sidebar-header">
            <div class="brand-icon"><i class="fas fa-piggy-bank"></i></div>
            <div class="brand-text">
                <h2>Gene's Lechon</h2>
                <span>Admin Panel</span>
            </div>
        </div>
        <p class="menu-label">MENU</p>
        <ul class="nav-links">${navLinksHTML}</ul>
        <div class="sidebar-footer">
            <button class="btn-logout-sidebar" id="sidebarLogoutBtn">
                <i class="fas fa-sign-out-alt"></i>
                <span>Sign Out</span>
            </button>
        </div>
    `;

    // Inject sidebar into placeholder
    const placeholder = document.getElementById('sidebar-placeholder');
    if (placeholder) {
        placeholder.className = "sidebar";
        placeholder.innerHTML = sidebarHTML;
    }

    // Inject overlay
    if (!document.querySelector('.sidebar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // Inject hamburger into header
    const header = document.querySelector('header');
    if (header && !document.getElementById('hamburgerBtn')) {
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburgerBtn';
        hamburger.className = 'hamburger-btn';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        header.insertBefore(hamburger, header.firstChild);
    }

    setupMobileMenu();
    injectLogoutModal();

    document.getElementById('sidebarLogoutBtn')?.addEventListener('click', () => {
        document.getElementById('logoutModal').style.display = 'flex';
    });
}

function setupMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.getElementById('hamburgerBtn');

    const open  = () => { sidebar?.classList.add('active');    overlay?.classList.add('active');    };
    const close = () => { sidebar?.classList.remove('active'); overlay?.classList.remove('active'); };

    hamburger?.addEventListener('click', (e) => { e.stopPropagation(); sidebar?.classList.contains('active') ? close() : open(); });
    overlay?.addEventListener('click', close);
    document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', close));
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) close(); });
}

function injectLogoutModal() {
    if (document.getElementById('logoutModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
    <div id="logoutModal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center;">
        <div style="background:#fff; border-radius:16px; padding:32px 28px; max-width:360px; width:90%; text-align:center; box-shadow:0 8px 32px rgba(0,0,0,0.18);">
            <div style="background:#fee; width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
                <i class="fas fa-sign-out-alt" style="font-size:28px; color:#f44336; margin-left:4px;"></i>
            </div>
            <h3 style="color:#1a2b4c; margin:0 0 8px; font-size:18px;">Sign Out?</h3>
            <p style="color:#8d97ad; font-size:14px; margin:0 0 24px;">Are you sure you want to end your session?</p>
            <div style="display:flex; gap:12px;">
                <button id="logoutCancelBtn" style="flex:1; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f5f5f5; cursor:pointer; font-size:14px; color:#444; font-family:inherit;">Cancel</button>
                <button id="logoutConfirmBtn" style="flex:1; padding:10px; border-radius:8px; border:none; background:#f44336; cursor:pointer; font-size:14px; color:#fff; font-weight:600; font-family:inherit;">Sign Out</button>
            </div>
        </div>
    </div>`);

    const modal = document.getElementById('logoutModal');
    document.getElementById('logoutCancelBtn').addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    document.getElementById('logoutConfirmBtn').addEventListener('click', async () => {
        document.getElementById('logoutConfirmBtn').textContent = 'Signing out...';
        try { await signOut(auth); } catch(e) { console.error(e); }
        localStorage.clear();
        window.location.href = 'index.html';
    });
}

// Backwards compat for any inline onclick still using these
window.openLogoutModal = () => { document.getElementById('logoutModal').style.display = 'flex'; };
window.handleLogoutClick = async () => {
    try { await signOut(auth); } catch(e) {}
    localStorage.clear();
    window.location.href = 'index.html';
};