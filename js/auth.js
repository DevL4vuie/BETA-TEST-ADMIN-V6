
//finale code below

// import { auth, db, doc, getDoc } from './firebase.js';
// import { 
//     onAuthStateChanged, 
//     signInWithEmailAndPassword, 
//     signOut 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// // --- SECURITY: LIST OF ADMIN ONLY PAGES ---
// const adminPages = [
//     'dashboard.html', 
//     'transactions.html', 
//     'sales.html', 
//     'inventory.html', 
//     'products.html'
// ];

// // 1. GLOBAL SECURITY LISTENER
// onAuthStateChanged(auth, async (user) => {
//     const currentPath = window.location.pathname;
//     let page = currentPath.split("/").pop();
//     if (page === '') page = 'index.html';

//     if (user) {
//         // --- LOGGED IN ---
//         let role = localStorage.getItem('userRole');
        
//         // Fetch role if missing
//         if (!role) {
//             role = await getUserRole(user.uid);
//             localStorage.setItem('userRole', role);
//         }

//         // A. SECURITY: Kick Cashier out of Admin Pages
//         if (role !== 'admin' && adminPages.includes(page)) {
//             alert("Access Denied: Admins Only.");
//             window.location.href = 'pos.html'; 
//             return;
//         }

//         // B. UI: Hide Admin Links (Dashboard, etc.) for Cashiers
//         if (role !== 'admin') {
//             hideAdminLinks();
//         }

//         // C. Redirect from Login Page
//         if (page === 'index.html') {
//             if (role === 'admin') window.location.href = 'dashboard.html';
//             else window.location.href = 'pos.html';
//         }

//     } else {
//         // --- LOGGED OUT ---
//         if (page !== 'index.html') {
//             window.location.href = 'index.html';
//         }
//     }
// });

// // 2. HELPER: Hide Admin Links Safely
// function hideAdminLinks() {
//     // Select all links and buttons
//     const elements = document.querySelectorAll('a, button, .menu-item');
    
//     elements.forEach(el => {
//         const href = el.getAttribute('href');
//         const onclick = el.getAttribute('onclick') || '';
//         const text = el.innerText.toLowerCase();
//         const html = el.innerHTML.toLowerCase();

//         // --- SAFETY CHECK: NEVER HIDE LOGOUT ---
//         // If it looks like a logout button (has text 'log', icon 'sign-out', or calls logout function)
//         if (text.includes('log') || html.includes('sign-out') || onclick.includes('logout')) {
//             el.style.display = ''; // Ensure it is visible
//             if(el.parentElement.tagName === 'LI') el.parentElement.style.display = '';
//             return; // Skip hiding this element
//         }
//         // ---------------------------------------

//         // Hide ONLY if strict match with Admin Pages list
//         if (href && adminPages.includes(href)) {
//             el.style.display = 'none';
//             if(el.parentElement.tagName === 'LI') el.parentElement.style.display = 'none';
//         }
//     });
// }

// // 3. LOGOUT FUNCTION
// window.logout = function() {
//     if(confirm("Are you sure you want to logout?")) {
//         signOut(auth).then(() => {
//             localStorage.clear();
//             window.location.replace('index.html');
//         });
//     }
// };
// // Keeps old function name working just in case
// window.performLogout = window.logout; 

// // 4. LOGIN LOGIC
// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const email = document.getElementById('username').value.trim(); 
//         const pass = document.getElementById('password').value;
//         const errorMsg = document.getElementById('error-msg');
//         if(errorMsg) errorMsg.style.display = 'none';

//         try {
//             const cred = await signInWithEmailAndPassword(auth, email, pass);
//             const user = cred.user;
            
//             // Get User Name & Check Status
//             const userDoc = await getDoc(doc(db, "users", user.uid));
//             if (userDoc.exists()) {
//                 const data = userDoc.data();
//                 if (data.status === 'disabled') throw new Error("Account Disabled");
//                 localStorage.setItem('userName', data.name || 'User');
//             }

//             // Get Role & Redirect
//             const role = await getUserRole(user.uid);
//             localStorage.setItem('userRole', role);
            
//             if (role === 'admin') window.location.href = 'dashboard.html';
//             else window.location.href = 'pos.html';

//         } catch (err) {
//             if(errorMsg) {
//                 errorMsg.style.display = 'block';
//                 errorMsg.textContent = err.message;
//             } else {
//                 alert(err.message);
//             }
//         }
//     });
// }

// async function getUserRole(uid) {
//     try {
//         const snap = await getDoc(doc(db, "users", uid));
//         return snap.exists() && snap.data().role ? snap.data().role.toLowerCase() : 'cashier';
//     } catch(e) { return 'cashier'; }
// }




// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // --- CONFIGURATION ---
// const firebaseConfig = {
//     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
//     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
//     projectId: "pos-and-sales-monitoring",
//     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
//     messagingSenderId: "516453934117",
//     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
//     measurementId: "G-FT1G64DB9N"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // --- 1. LOGIN LOGIC ---
// window.addEventListener('load', () => {
//     const loginForm = document.getElementById('login-form') || document.getElementById('loginForm');
//     if (loginForm) {
//         loginForm.addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const submitBtn = loginForm.querySelector('button[type="submit"]');
//             if(submitBtn) submitBtn.innerText = "Logging in...";

//             const email = (document.getElementById('email') || document.getElementById('username')).value.trim();
//             const pass = document.getElementById('password').value;
//             const errorMsg = document.getElementById('error-msg');

//             try {
//                 const cred = await signInWithEmailAndPassword(auth, email, pass);
//                 const role = await getUserRole(cred.user.uid);
                
//                 // Redirect based on role
//                 if (role === 'admin') window.location.href = 'dashboard.html';
//                 else if (role === 'clerk') window.location.href = 'inventory.html';
//                 else window.location.href = 'pos.html';

//             } catch (err) {
//                 if(submitBtn) submitBtn.innerText = "Login";
//                 if(errorMsg) {
//                     errorMsg.style.display = 'block';
//                     errorMsg.textContent = "Login failed: " + err.message;
//                 } else {
//                     alert(err.message);
//                 }
//             }
//         });
//     }
// });

// // --- 2. SECURITY & SIDEBAR CONTROL ---
// onAuthStateChanged(auth, async (user) => {
//     const path = window.location.pathname;
//     const page = path.split('/').pop() || 'index.html';

//     // A. Handle Not Logged In
//     if (!user) {
//         if (page !== 'index.html' && page !== 'login.html') {
//             window.location.href = 'index.html';
//         }
//         return;
//     }

//     // B. Get Role
//     const role = await getUserRole(user.uid);

//     // C. HIDE SIDEBAR ITEMS (UI Polish)
//     // This removes the buttons so they can't even click them
//     hideSidebarItems(role);

//     // D. STRICT PAGE ACCESS (Security Guard)
//     // If they are on a page they shouldn't be, kick them out immediately.
    
//     if (page === 'index.html' || page === 'login.html') {
//         // Already logged in? Go to home.
//         if (role === 'admin') window.location.href = 'dashboard.html';
//         else if (role === 'clerk') window.location.href = 'inventory.html';
//         else window.location.href = 'pos.html';
//         return;
//     }

//     if (role === 'clerk') {
//         // CLERK ALLOWED LIST: Only Inventory and Products
//         if (!page.includes('inventory') && !page.includes('product')) {
//             alert("Access Denied: Clerks can only access Inventory.");
//             window.location.href = 'inventory.html';
//         }
//     } 
//     else if (role === 'cashier') {
//         // CASHIER ALLOWED LIST: Only POS and Sales (maybe transactions)
//         if (!page.includes('pos') && !page.includes('sales') && !page.includes('transaction')) {
//             alert("Access Denied: Cashiers can only access POS.");
//             window.location.href = 'pos.html';
//         }
//     }
//     // Admin is allowed everywhere, so no "if" needed for them.
// });

// // Helper: Hides Sidebar Links based on Role
// function hideSidebarItems(role) {
//     // Wait for DOM to be ready just in case
//     setTimeout(() => {
//         const links = document.querySelectorAll('.nav-links li a');
        
//         links.forEach(link => {
//             const href = link.getAttribute('href');
//             if (!href) return;

//             let shouldHide = false;

//             if (role === 'clerk') {
//                 // Clerk Hides: Dashboard, POS, Users, Sales
//                 if (href.includes('dashboard') || href.includes('pos') || href.includes('users') || href.includes('sales')) {
//                     shouldHide = true;
//                 }
//             } 
//             else if (role === 'cashier') {
//                 // Cashier Hides: Dashboard, Inventory, Products, Users
//                 if (href.includes('dashboard') || href.includes('inventory') || href.includes('product') || href.includes('users')) {
//                     shouldHide = true;
//                 }
//             }

//             if (shouldHide) {
//                 // Hide the entire List Item (<li>)
//                 link.parentElement.style.display = 'none';
//             }
//         });
//     }, 100); // Small delay to ensure HTML is parsed
// }

// async function getUserRole(uid) {
//     try {
//         const snap = await getDoc(doc(db, "users", uid));
//         if (snap.exists() && snap.data().role) return snap.data().role;
//         return 'cashier';
//     } catch (e) {
//         return 'cashier';
//     }
// }

// // Global Logout
// window.logout = async function() {
//     await signOut(auth);
//     localStorage.clear();
//     window.location.href = 'index.html';
// };
// window.confirmLogout = function() { window.logout(); };





import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// --- CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
    authDomain: "pos-and-sales-monitoring.firebaseapp.com",
    projectId: "pos-and-sales-monitoring",
    storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
    messagingSenderId: "516453934117",
    appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
    measurementId: "G-FT1G64DB9N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- 1. LOGIN LOGIC ---
window.addEventListener('load', () => {
    const loginForm = document.getElementById('login-form') || document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.innerText = "Logging in...";

            const email = (document.getElementById('email') || document.getElementById('username')).value.trim();
            const pass = document.getElementById('password').value;
            const errorMsg = document.getElementById('error-msg');

            try {
                const cred = await signInWithEmailAndPassword(auth, email, pass);
                const role = await getUserRole(cred.user.uid);

                // ── ADMIN ONLY ──────────────────────────────────────────
                if (role !== 'admin') {
                    await signOut(auth);

                    // Hide loading overlay and reset button
                    const overlay = document.getElementById('loadingOverlay');
                    const loginBtn = document.getElementById('loginBtn');
                    if (overlay) overlay.classList.remove('active');
                    if (loginBtn) loginBtn.innerHTML = '<span>Login</span>';
                    if (loginBtn) loginBtn.classList.remove('btn-loading');
                    if (submitBtn) submitBtn.innerHTML = '<span>Login</span>';

                    const roleName = role === 'clerk' ? 'Clerk' : role === 'cashier' ? 'Cashier' : 'Your account';
                    const msg = `🚫 ${roleName} accounts cannot access this panel. Only admins are allowed in here.`;

                    if (errorMsg) {
                        errorMsg.innerText = msg;
                        errorMsg.style.cssText = 'display:block !important; color:#f44336; margin-top:10px; font-size:13px; font-weight:600;';
                    } else {
                        alert(msg);
                    }
                    return;
                }

                window.location.href = 'dashboard.html';

            } catch (err) {
                const overlay = document.getElementById('loadingOverlay');
                const loginBtn = document.getElementById('loginBtn');
                if (overlay) overlay.classList.remove('active');
                if (loginBtn) loginBtn.innerHTML = '<span>Login</span>';
                if (loginBtn) loginBtn.classList.remove('btn-loading');
                if (submitBtn) submitBtn.innerHTML = '<span>Login</span>';

                const msg = "Login failed: " + err.message;
                if (errorMsg) {
                    errorMsg.innerText = msg;
                    errorMsg.style.cssText = 'display:block !important; color:#f44336; margin-top:10px; font-size:13px; font-weight:600;';
                } else {
                    alert(msg);
                }
            }
        });
    }
});

// --- 2. SECURITY GUARD ---
onAuthStateChanged(auth, async (user) => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // A. Not logged in → send to login
    if (!user) {
        if (page !== 'index.html' && page !== 'login.html') {
            window.location.href = 'index.html';
        }
        return;
    }

    // B. Get role
    const role = await getUserRole(user.uid);

    // C. Non-admin logged in somehow → boot them out everywhere
    if (role !== 'admin') {
        await signOut(auth);
        window.location.href = 'index.html';
        return;
    }

    // D. Admin already logged in → skip login page
    if (page === 'index.html' || page === 'login.html') {
        window.location.href = 'dashboard.html';
        return;
    }

    // Admin is allowed everywhere — no further restrictions needed
});

async function getUserRole(uid) {
    try {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists() && snap.data().role) return snap.data().role;
        return null;
    } catch (e) {
        return null;
    }
}

// Global Logout
window.logout = async function () {
    await signOut(auth);
    localStorage.clear();
    window.location.href = 'index.html';
};
window.confirmLogout = function () { window.logout(); };