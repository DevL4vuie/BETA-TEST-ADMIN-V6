// // 1. Get the initialized Database from your local file
// import { db } from './firebase.js'; 

// // 2. Get the Firestore TOOLS directly from the Internet (CDN)
// // This was the missing link causing the "Loading..." freeze
// import { 
//     collection, 
//     doc, 
//     onSnapshot, 
//     query, 
//     setDoc, 
//     updateDoc, 
//     deleteDoc 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // 3. Get Auth tools for creating users
// import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// console.log("Users JS Starting...");

// // --- WINDOW FUNCTIONS (Keep buttons working) ---

// window.openUserModal = function() {
//     console.log("Button Clicked!"); 
//     const modal = document.getElementById('userModal');
//     if (modal) {
//         document.getElementById('modalTitle').innerText = "Add New User";
//         document.getElementById('userForm').reset();
//         document.getElementById('editUserId').value = "";
//         document.getElementById('email').disabled = false;
//         document.getElementById('passwordGroup').style.display = 'block';
//         document.getElementById('password').required = true;
//         document.getElementById('status').value = 'active';
//         modal.style.display = 'flex';
//     }
// };

// window.closeAllModals = function() {
//     document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
// };

// window.triggerEdit = function(id) {
//     const user = allUsers.find(u => u.id === id);
//     if (!user) return;
//     document.getElementById('modalTitle').innerText = "Edit User";
//     document.getElementById('editUserId').value = user.id;
//     document.getElementById('fullName').value = user.name || '';
//     document.getElementById('email').value = user.email || '';
//     document.getElementById('role').value = user.role || 'cashier';
//     document.getElementById('status').value = user.status || 'active';
//     document.getElementById('email').disabled = true;
//     document.getElementById('passwordGroup').style.display = 'none'; 
//     document.getElementById('password').required = false;
//     document.getElementById('userModal').style.display = 'flex';
// };

// window.triggerDelete = function(id) {
//     document.getElementById('deleteUserId').value = id;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// window.togglePassVisibility = function() {
//     const passInput = document.getElementById('password');
//     const icon = document.querySelector('.toggle-pass');
//     if (passInput.type === "password") {
//         passInput.type = "text";
//         icon.classList.remove('fa-eye');
//         icon.classList.add('fa-eye-slash');
//     } else {
//         passInput.type = "password";
//         icon.classList.remove('fa-eye-slash');
//         icon.classList.add('fa-eye');
//     }
// };

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

// let allUsers = [];

// // --- MAIN LOGIC ---
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('userForm');
//     if (form) form.addEventListener('submit', handleFormSubmit);
    
//     document.getElementById('confirmDeleteBtn')?.addEventListener('click', executeDelete);
//     document.getElementById('userSearch')?.addEventListener('keyup', filterUsers);
    
//     // Load Users immediately
//     loadUsers();

//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// });

// function loadUsers() {
//     try {
//         console.log("Attempting to load users...");
//         const q = query(collection(db, "users"));
        
//         onSnapshot(q, (snapshot) => {
//             allUsers = [];
//             snapshot.forEach(docSnap => {
//                 allUsers.push({ id: docSnap.id, ...docSnap.data() });
//             });
//             console.log(`Loaded ${allUsers.length} users.`);
//             renderUsers(allUsers);
//         }, (error) => {
//             console.error("Snapshot Error:", error);
//             document.getElementById('usersTableBody').innerHTML = `<tr><td colspan="5" style="color:red; text-align:center;">Error: ${error.message}</td></tr>`;
//         });
//     } catch (err) {
//         console.error("Load Function Crash:", err);
//     }
// }

// function renderUsers(users) {
//     const tbody = document.getElementById('usersTableBody');
//     if (!tbody) return;
//     tbody.innerHTML = '';

//     if (users.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:#888;">No users found in database.</td></tr>';
//         return;
//     }

//     users.forEach(user => {
//         const name = user.name || 'Unknown';
//         const email = user.email || 'No Email';
//         const role = user.role || 'cashier';
//         const status = user.status || 'active';
//         const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=64`;
//         const roleBadge = role === 'admin' ? 'admin' : 'cashier';
//         const isActive = status === 'active';

//         const row = `
//             <tr>
//                 <td>
//                     <div class="user-cell">
//                         <img src="${avatarUrl}" alt="${name}">
//                         <span>${name}</span>
//                     </div>
//                 </td>
//                 <td>${email}</td>
//                 <td><span class="role-badge ${roleBadge}">${role.toUpperCase()}</span></td>
//                 <td>
//                     <span class="status-badge ${isActive ? 'status-active' : 'status-disabled'}"></span>
//                     ${isActive ? 'Active' : 'Disabled'}
//                 </td>
//                 <td>
//                     <div class="actions">
//                         <button class="btn-icon" onclick="window.triggerEdit('${user.id}')"><i class="fas fa-edit"></i></button>
//                         ${role === 'admin' 
//                             ? `<button class="btn-icon" style="opacity:0.3; cursor:not-allowed;"><i class="fas fa-trash"></i></button>`
//                             : `<button class="btn-icon delete" onclick="window.triggerDelete('${user.id}')"><i class="fas fa-trash"></i></button>`
//                         }
//                     </div>
//                 </td>
//             </tr>
//         `;
//         tbody.innerHTML += row;
//     });
// }

// async function handleFormSubmit(e) {
//     e.preventDefault();
//     const saveBtn = document.getElementById('saveUserBtn');
    
//     const id = document.getElementById('editUserId').value;
//     const name = document.getElementById('fullName').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const role = document.getElementById('role').value;
//     const status = document.getElementById('status').value;

//     saveBtn.innerText = "Processing...";
//     saveBtn.disabled = true;

//     try {
//         if (id) {
//             await updateDoc(doc(db, "users", id), { name, role, status });
//             showToast("User updated successfully");
//         } else {
//             if (password.length < 6) throw new Error("Password must be 6+ characters");
            
//             let secondaryApp;
//             try { secondaryApp = getApp("SecondaryApp"); } 
//             catch (e) { secondaryApp = initializeApp(firebaseConfig, "SecondaryApp"); }
            
//             const secondaryAuth = getAuth(secondaryApp);
//             const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            
//             await setDoc(doc(db, "users", cred.user.uid), {
//                 name, email, role, status, createdAt: new Date()
//             });
            
//             showToast("User created successfully");
//         }
//         window.closeAllModals();
//     } catch (err) {
//         console.error(err);
//         if(err.code === 'auth/email-already-in-use') showToast("Email already exists", "error");
//         else showToast(err.message, "error");
//     } finally {
//         saveBtn.innerText = "Save User";
//         saveBtn.disabled = false;
//     }
// }

// async function executeDelete() {
//     const id = document.getElementById('deleteUserId').value;
//     const btn = document.getElementById('confirmDeleteBtn');
//     btn.innerText = "Deleting...";
//     btn.disabled = true;

//     try {
//         await deleteDoc(doc(db, "users", id));
//         showToast("User deleted");
//         window.closeAllModals();
//     } catch (err) {
//         showToast(err.message, "error");
//     } finally {
//         btn.innerText = "Delete";
//         btn.disabled = false;
//     }
// }

// function filterUsers() {
//     const term = document.getElementById('userSearch').value.toLowerCase();
//     const filtered = allUsers.filter(u => 
//         (u.name && u.name.toLowerCase().includes(term)) || 
//         (u.email && u.email.toLowerCase().includes(term))
//     );
//     renderUsers(filtered);
// }

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     if (!container) return;
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }






// // 1. Get the initialized Database from your local file
// import { db } from './firebase.js'; 

// // 2. Get the Firestore TOOLS directly from the Internet (CDN)
// import { 
//     collection, 
//     doc, 
//     getDoc, 
//     onSnapshot, 
//     query, 
//     setDoc, 
//     updateDoc, 
//     deleteDoc 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // 3. Get Auth tools for creating users
// import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// console.log("Users JS Starting...");

// // --- ACCESS CONTROL CHECK ---
// const auth = getAuth();
// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         // Check if current user is Admin
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);
        
//         if (userSnap.exists()) {
//             const userData = userSnap.data();
//             // RULE: Only Admin can access Manage Users
//             if (userData.role !== 'admin') {
//                 console.warn("Unauthorized access to Users page.");
//                 // Redirect based on role rules
//                 if (userData.role === 'cashier') window.location.href = 'pos.html';
//                 else if (userData.role === 'clerk') window.location.href = 'inventory.html';
//                 else window.location.href = 'dashboard.html';
//             }
//         }
//     }
// });

// // --- WINDOW FUNCTIONS (Keep buttons working) ---

// window.openUserModal = function() {
//     console.log("Button Clicked!"); 
//     const modal = document.getElementById('userModal');
//     if (modal) {
//         document.getElementById('modalTitle').innerText = "Add New User";
//         document.getElementById('userForm').reset();
//         document.getElementById('editUserId').value = "";
//         document.getElementById('email').disabled = false;
//         document.getElementById('passwordGroup').style.display = 'block';
//         document.getElementById('password').required = true;
//         document.getElementById('status').value = 'active';
        
//         // Handle Role Select
//         const roleSelect = document.getElementById('role');
//         // Ensure 'admin' option is REMOVED when creating new users
//         const adminOpt = roleSelect.querySelector('option[value="admin"]');
//         if(adminOpt) adminOpt.remove();
        
//         roleSelect.disabled = false;
//         roleSelect.value = 'cashier';
        
//         modal.style.display = 'flex';
//     }
// };

// window.closeAllModals = function() {
//     document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
// };

// window.triggerEdit = function(id) {
//     const user = allUsers.find(u => u.id === id);
//     if (!user) return;
    
//     document.getElementById('modalTitle').innerText = "Edit User";
//     document.getElementById('editUserId').value = user.id;
//     document.getElementById('fullName').value = user.name || '';
//     document.getElementById('email').value = user.email || '';
//     document.getElementById('status').value = user.status || 'active';
//     document.getElementById('email').disabled = true;
    
//     // Handle Role Select Logic
//     const roleSelect = document.getElementById('role');
    
//     // First, remove any old dynamic options to start clean
//     const existingAdminOpt = roleSelect.querySelector('option[value="admin"]');
//     if (existingAdminOpt) existingAdminOpt.remove();

//     if (user.role === 'admin') {
//         // If the user IS an admin, we must add the option so they can be saved correctly
//         const opt = document.createElement('option');
//         opt.value = 'admin';
//         opt.innerText = 'Administrator';
//         roleSelect.appendChild(opt);
        
//         roleSelect.value = 'admin';
//         // RULE: Disable dropdown so Admin role cannot be changed (prevents locking oneself out)
//         roleSelect.disabled = true; 
//     } else {
//         // Normal user: Enable select, ensure value is set
//         roleSelect.disabled = false;
//         roleSelect.value = user.role || 'cashier';
//     }

//     document.getElementById('passwordGroup').style.display = 'none'; 
//     document.getElementById('password').required = false;
//     document.getElementById('userModal').style.display = 'flex';
// };

// window.triggerDelete = function(id) {
//     document.getElementById('deleteUserId').value = id;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// window.togglePassVisibility = function() {
//     const passInput = document.getElementById('password');
//     const icon = document.querySelector('.toggle-pass');
//     if (passInput.type === "password") {
//         passInput.type = "text";
//         icon.classList.remove('fa-eye');
//         icon.classList.add('fa-eye-slash');
//     } else {
//         passInput.type = "password";
//         icon.classList.remove('fa-eye-slash');
//         icon.classList.add('fa-eye');
//     }
// };

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

// let allUsers = [];

// // --- MAIN LOGIC ---
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('userForm');
//     if (form) form.addEventListener('submit', handleFormSubmit);
    
//     document.getElementById('confirmDeleteBtn')?.addEventListener('click', executeDelete);
//     document.getElementById('userSearch')?.addEventListener('keyup', filterUsers);
    
//     // Load Users
//     loadUsers();

//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// });

// function loadUsers() {
//     try {
//         console.log("Attempting to load users...");
//         const q = query(collection(db, "users"));
        
//         onSnapshot(q, (snapshot) => {
//             allUsers = [];
//             snapshot.forEach(docSnap => {
//                 allUsers.push({ id: docSnap.id, ...docSnap.data() });
//             });
//             console.log(`Loaded ${allUsers.length} users.`);
//             renderUsers(allUsers);
//         }, (error) => {
//             console.error("Snapshot Error:", error);
//             document.getElementById('usersTableBody').innerHTML = `<tr><td colspan="6" style="color:red; text-align:center;">Error: ${error.message}</td></tr>`;
//         });
//     } catch (err) {
//         console.error("Load Function Crash:", err);
//     }
// }

// function renderUsers(users) {
//     const tbody = document.getElementById('usersTableBody');
//     if (!tbody) return;
//     tbody.innerHTML = '';

//     if (users.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; color:#888;">No users found.</td></tr>';
//         return;
//     }

//     users.forEach(user => {
//         const name = user.name || 'Unknown';
//         const email = user.email || 'No Email';
//         const role = user.role || 'cashier';
//         const status = user.status || 'active';
//         // RULE: Admin views passwords. Show 'plainPassword' if available.
//         const passwordDisplay = user.plainPassword ? user.plainPassword : '•••'; 
        
//         const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=64`;
        
//         // Badges for roles
//         let roleBadge = 'cashier';
//         if (role === 'admin') roleBadge = 'admin';
//         if (role === 'clerk') roleBadge = 'clerk'; 

//         const isActive = status === 'active';

//         const row = `
//             <tr>
//                 <td>
//                     <div class="user-cell">
//                         <img src="${avatarUrl}" alt="${name}">
//                         <span>${name}</span>
//                     </div>
//                 </td>
//                 <td>${email}</td>
//                 <td style="font-family: monospace; color: var(--primary);">${passwordDisplay}</td>
//                 <td><span class="role-badge ${roleBadge}">${role.toUpperCase()}</span></td>
//                 <td>
//                     <span class="status-badge ${isActive ? 'status-active' : 'status-disabled'}"></span>
//                     ${isActive ? 'Active' : 'Disabled'}
//                 </td>
//                 <td>
//                     <div class="actions">
//                         <button class="btn-icon" onclick="window.triggerEdit('${user.id}')"><i class="fas fa-edit"></i></button>
//                         ${role === 'admin' 
//                             ? `<button class="btn-icon" style="opacity:0.3; cursor:not-allowed;"><i class="fas fa-trash"></i></button>`
//                             : `<button class="btn-icon delete" onclick="window.triggerDelete('${user.id}')"><i class="fas fa-trash"></i></button>`
//                         }
//                     </div>
//                 </td>
//             </tr>
//         `;
//         tbody.innerHTML += row;
//     });
// }

// async function handleFormSubmit(e) {
//     e.preventDefault();
//     const saveBtn = document.getElementById('saveUserBtn');
    
//     const id = document.getElementById('editUserId').value;
//     const name = document.getElementById('fullName').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const role = document.getElementById('role').value;
//     const status = document.getElementById('status').value;

//     // Redundant safety check
//     if (role === 'admin' && !id) {
//         showToast("Cannot create new Admins.", "error");
//         return;
//     }

//     saveBtn.innerText = "Processing...";
//     saveBtn.disabled = true;

//     try {
//         if (id) {
//             // Update existing user
//             await updateDoc(doc(db, "users", id), { name, role, status });
//             showToast("User updated successfully");
//         } else {
//             // Create new user
//             if (password.length < 6) throw new Error("Password must be 6+ characters");
            
//             // Create user in secondary app to avoid logging out current admin
//             let secondaryApp;
//             try { secondaryApp = getApp("SecondaryApp"); } 
//             catch (e) { secondaryApp = initializeApp(firebaseConfig, "SecondaryApp"); }
            
//             const secondaryAuth = getAuth(secondaryApp);
//             const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            
//             // RULE: Store password so Admin can view it later
//             await setDoc(doc(db, "users", cred.user.uid), {
//                 name, 
//                 email, 
//                 role, 
//                 status, 
//                 plainPassword: password, // Storing for "View Password" requirement
//                 createdAt: new Date()
//             });
            
//             showToast("User created successfully");
//         }
//         window.closeAllModals();
//     } catch (err) {
//         console.error(err);
//         if(err.code === 'auth/email-already-in-use') showToast("Email already exists", "error");
//         else showToast(err.message, "error");
//     } finally {
//         saveBtn.innerText = "Save User";
//         saveBtn.disabled = false;
//     }
// }

// async function executeDelete() {
//     const id = document.getElementById('deleteUserId').value;
//     const btn = document.getElementById('confirmDeleteBtn');
//     btn.innerText = "Deleting...";
//     btn.disabled = true;

//     try {
//         await deleteDoc(doc(db, "users", id));
//         showToast("User deleted");
//         window.closeAllModals();
//     } catch (err) {
//         showToast(err.message, "error");
//     } finally {
//         btn.innerText = "Delete";
//         btn.disabled = false;
//     }
// }

// function filterUsers() {
//     const term = document.getElementById('userSearch').value.toLowerCase();
//     const filtered = allUsers.filter(u => 
//         (u.name && u.name.toLowerCase().includes(term)) || 
//         (u.email && u.email.toLowerCase().includes(term))
//     );
//     renderUsers(filtered);
// }

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     if (!container) return;
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }








// ============================================================
//  GENE'S LECHON — users.js (Enhanced: Archive/Restore/Delete)
// ============================================================

import { db } from './firebase.js';
import {
    collection, doc, getDoc, onSnapshot, query,
    setDoc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged,
    signInWithEmailAndPassword, updatePassword, signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

console.log("Users JS Starting...");

// ── State ─────────────────────────────────────────────────
let currentUserUid = null;
let allUsers       = [];   // active + disabled (archived === false/undefined)
let allArchived    = [];   // archived === true
let currentView    = 'active';  // 'active' | 'archive'

// ── Auth Check ────────────────────────────────────────────
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUserUid = user.uid;
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.role !== 'admin') {
                if (data.role === 'cashier') window.location.href = 'pos.html';
                else if (data.role === 'clerk') window.location.href = 'inventory.html';
                else window.location.href = 'dashboard.html';
            }
        }
    }
});

// ── Config (for secondary auth) ────────────────────────────
const firebaseConfig = {
    apiKey:            "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
    authDomain:        "pos-and-sales-monitoring.firebaseapp.com",
    projectId:         "pos-and-sales-monitoring",
    storageBucket:     "pos-and-sales-monitoring.firebasestorage.app",
    messagingSenderId: "516453934117",
    appId:             "1:516453934117:web:1783067b8aa6b37373cbcc",
    measurementId:     "G-FT1G64DB9N"
};

// ── DOMContentLoaded ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    document.getElementById('userForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', executeDelete);
    document.getElementById('userSearch')?.addEventListener('input', filterUsers);

    loadUsers();
});

// ── Firestore Listener ────────────────────────────────────
function loadUsers() {
    const q = query(collection(db, "users"));
    onSnapshot(q, (snapshot) => {
        allUsers    = [];
        allArchived = [];
        snapshot.forEach(d => {
            const u = { id: d.id, ...d.data() };
            if (u.archived) allArchived.push(u);
            else            allUsers.push(u);
        });
        updateStats();
        renderCurrentView();
    }, (err) => {
        console.error("Snapshot error:", err);
        document.getElementById('usersTableBody').innerHTML =
            `<tr><td colspan="5" style="color:red;text-align:center;padding:30px;">Error: ${err.message}</td></tr>`;
    });
}

// ── Stats ─────────────────────────────────────────────────
function updateStats() {
    const active   = allUsers.filter(u => u.status === 'active').length;
    const disabled = allUsers.filter(u => u.status !== 'active').length;

    document.getElementById('statTotal').textContent    = allUsers.length;
    document.getElementById('statActive').textContent   = active;
    document.getElementById('statDisabled').textContent = disabled;
    document.getElementById('statArchived').textContent = allArchived.length;

    const pill = document.getElementById('archivePill');
    if (pill) {
        pill.textContent   = allArchived.length;
        pill.style.display = allArchived.length > 0 ? 'inline-block' : 'none';
    }
}

// ── View Switching ─────────────────────────────────────────
window.switchUserView = function(view, btn) {
    currentView = view;
    document.querySelectorAll('.vtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.getElementById('userSearch').value = '';
    renderCurrentView();
};

function renderCurrentView() {
    const source = currentView === 'archive' ? allArchived : allUsers;
    renderUsers(source);
}

function filterUsers() {
    const term   = document.getElementById('userSearch').value.toLowerCase();
    const source = currentView === 'archive' ? allArchived : allUsers;
    const result = term
        ? source.filter(u =>
            (u.name  || '').toLowerCase().includes(term) ||
            (u.email || '').toLowerCase().includes(term))
        : source;
    renderUsers(result);
}

// ── Render Table ──────────────────────────────────────────
function renderUsers(users) {
    const tbody    = document.getElementById('usersTableBody');
    const emptyEl  = document.getElementById('emptyState');
    const emptyTitle = document.getElementById('emptyTitle');
    const emptyMsg   = document.getElementById('emptyMsg');

    tbody.innerHTML = '';

    if (users.length === 0) {
        if (emptyEl) {
            emptyEl.style.display = 'block';
            if (currentView === 'archive') {
                if (emptyTitle) emptyTitle.textContent = 'No archived users';
                if (emptyMsg)   emptyMsg.textContent   = 'Users you archive will appear here.';
            } else {
                if (emptyTitle) emptyTitle.textContent = 'No users found';
                if (emptyMsg)   emptyMsg.textContent   = 'Add a new user to get started.';
            }
        }
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    users.forEach(user => {
        const name    = user.name    || 'Unknown';
        const email   = user.email   || '—';
        const role    = user.role    || 'cashier';
        const status  = user.status  || 'active';
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`;


        // Status dot
        let dotClass = 'dot-active';
        let statusLabel = 'Active';
        if (status === 'disabled') { dotClass = 'dot-disabled'; statusLabel = 'Disabled'; }
        if (user.archived)         { dotClass = 'dot-archived'; statusLabel = 'Archived'; }

        // Action buttons — different for active vs archived view
        let actionBtns = '';
        if (currentView === 'archive') {
            // Archived view: Restore + Delete Forever
            actionBtns = `
                <button class="action-btn restore-btn" title="Restore User" onclick="window.openRestore('${user.id}')">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="action-btn delete-btn" title="Delete Forever" onclick="window.openDelete('${user.id}')">
                    <i class="fas fa-trash"></i>
                </button>`;
        } else {
            // Active view: Edit + Archive (no delete)
            const isAdmin = role === 'admin';
            actionBtns = `
                <button class="action-btn edit" title="Edit User" onclick="window.triggerEdit('${user.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                ${isAdmin
                    ? `<button class="action-btn archive-btn" title="Admins cannot be archived" disabled>
                           <i class="fas fa-archive"></i>
                       </button>`
                    : `<button class="action-btn archive-btn" title="Archive User" onclick="window.openArchive('${user.id}')">
                           <i class="fas fa-archive"></i>
                       </button>`
                }`;
        }

        const tr = document.createElement('tr');
        if (currentView === 'archive') tr.classList.add('archived-row');
        tr.innerHTML = `
            <td>
                <div class="user-cell">
                    <img src="${avatarUrl}" alt="${name}" class="user-avatar">
                    <div class="user-info">
                        <span class="user-name">${name}</span>
                        <span class="user-meta">${role === 'admin' ? '👑 Administrator' : `#${user.id.slice(0,6)}`}</span>
                    </div>
                </div>
            </td>
            <td>${email}</td>
            <td><span class="role-badge ${role}">${role.toUpperCase()}</span></td>
            <td>
                <span class="status-dot ${dotClass}"></span>${statusLabel}
            </td>
            <td><div class="row-actions">${actionBtns}</div></td>`;
        tbody.appendChild(tr);
    });
}

// ── Modal Openers ─────────────────────────────────────────
window.openUserModal = function() {
    document.getElementById('modalTitle').innerText = "Add New User";
    document.getElementById('userForm').reset();
    document.getElementById('editUserId').value = "";

    const emailInput = document.getElementById('email');
    emailInput.disabled = false;
    emailInput.classList.remove('input-disabled');

    document.getElementById('passLabel').innerHTML = '<i class="fas fa-lock"></i> Password <small>(Min. 6 characters)</small>';
    document.getElementById('passHelpText').style.display  = 'none';
    document.getElementById('password').required = true;

    const statusSelect = document.getElementById('status');
    statusSelect.disabled = false;
    statusSelect.value    = 'active';
    document.getElementById('selfDisableWarning').style.display = 'none';

    const roleSelect = document.getElementById('role');
    const adminOpt   = roleSelect.querySelector('option[value="admin"]');
    if (adminOpt) adminOpt.remove();
    roleSelect.disabled = false;
    roleSelect.value    = 'cashier';

    openModal('userModal');
};

window.triggerEdit = function(id) {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;

    document.getElementById('modalTitle').innerText    = "Edit User Details";
    document.getElementById('editUserId').value        = user.id;
    document.getElementById('fullName').value          = user.name   || '';
    document.getElementById('email').value             = user.email  || '';
    document.getElementById('status').value            = user.status || 'active';

    const emailInput = document.getElementById('email');
    emailInput.disabled = true;
    emailInput.classList.add('input-disabled');

    document.getElementById('passLabel').innerHTML = '<i class="fas fa-lock"></i> New Password';
    document.getElementById('passHelpText').style.display = 'block';
    document.getElementById('password').value    = '';
    document.getElementById('password').required = false;

    const roleSelect = document.getElementById('role');
    const existingAdminOpt = roleSelect.querySelector('option[value="admin"]');
    if (existingAdminOpt) existingAdminOpt.remove();

    if (user.role === 'admin') {
        const opt = document.createElement('option');
        opt.value = 'admin'; opt.innerText = 'Administrator';
        roleSelect.appendChild(opt);
        roleSelect.value    = 'admin';
        roleSelect.disabled = true;
    } else {
        roleSelect.disabled = false;
        roleSelect.value    = user.role || 'cashier';
    }

    const statusSelect  = document.getElementById('status');
    const warningText   = document.getElementById('selfDisableWarning');
    if (currentUserUid && user.id === currentUserUid) {
        statusSelect.value    = 'active';
        statusSelect.disabled = true;
        statusSelect.classList.add('input-disabled');
        warningText.style.display = 'block';
    } else {
        statusSelect.disabled = false;
        statusSelect.classList.remove('input-disabled');
        warningText.style.display = 'none';
    }

    openModal('userModal');
};

// ── Archive / Restore / Delete ────────────────────────────
window.openArchive = function(id) {
    if (currentUserUid && id === currentUserUid) {
        showToast("You cannot archive your own account.", "error"); return;
    }
    document.getElementById('archiveUserId').value = id;
    openModal('archiveModal');
};

window.confirmArchive = async function() {
    const id  = document.getElementById('archiveUserId').value;
    const btn = document.getElementById('confirmArchiveBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Archiving...';
    btn.disabled  = true;
    try {
        await updateDoc(doc(db, "users", id), { archived: true, status: 'disabled' });
        showToast("User archived successfully.", "success");
        closeModal('archiveModal');
    } catch (err) {
        console.error(err);
        showToast("Failed to archive user.", "error");
        closeModal('archiveModal');
    }
    btn.innerHTML = '<i class="fas fa-archive"></i> Archive';
    btn.disabled  = false;
};

window.openRestore = function(id) {
    document.getElementById('restoreUserId').value = id;
    openModal('restoreModal');
};

window.confirmRestore = async function() {
    const id  = document.getElementById('restoreUserId').value;
    const btn = document.getElementById('confirmRestoreBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restoring...';
    btn.disabled  = true;
    try {
        await updateDoc(doc(db, "users", id), { archived: false, status: 'active' });
        showToast("User restored successfully.", "success");
        closeModal('restoreModal');
        // Switch back to active view
        window.switchUserView('active', document.getElementById('tabActive'));
    } catch (err) {
        console.error(err);
        showToast("Failed to restore user.", "error");
        closeModal('restoreModal');
    }
    btn.innerHTML = '<i class="fas fa-undo"></i> Restore';
    btn.disabled  = false;
};

window.openDelete = function(id) {
    if (currentUserUid && id === currentUserUid) {
        showToast("You cannot delete your own account.", "error"); return;
    }
    document.getElementById('deleteUserId').value = id;
    openModal('deleteModal');
};

async function executeDelete() {
    const id  = document.getElementById('deleteUserId').value;
    const btn = document.getElementById('confirmDeleteBtn');
    if (currentUserUid && id === currentUserUid) {
        showToast("Cannot delete yourself!", "error");
        closeModal('deleteModal'); return;
    }
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
    btn.disabled  = true;
    try {
        await deleteDoc(doc(db, "users", id));
        showToast("User permanently deleted.", "success");
        closeModal('deleteModal');
    } catch (err) {
        showToast(err.message, "error");
    }
    btn.innerHTML = '<i class="fas fa-trash"></i> Delete Forever';
    btn.disabled  = false;
}

// ── Form Submit (Add/Edit) ────────────────────────────────
async function handleFormSubmit(e) {
    e.preventDefault();
    const saveBtn = document.getElementById('saveUserBtn');
    const id      = document.getElementById('editUserId').value;
    const name    = document.getElementById('fullName').value;
    const email   = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const role    = document.getElementById('role').value;
    const status  = document.getElementById('status').value;

    if (role === 'admin' && !id) {
        showToast("Cannot create new Admins.", "error"); return;
    }

    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    saveBtn.disabled  = true;

    const secondaryAuth = getSecondaryAuth();

    try {
        if (id) {
            // ── Update existing ──
            const updates = { name, role, status };
            if (password && password.trim() !== '') {
                if (password.length < 6) throw new Error("Password must be 6+ characters");
                const userDoc    = await getDoc(doc(db, "users", id));
                const oldPassword = userDoc.data().plainPassword;
                if (oldPassword) {
                    try {
                        const cred = await signInWithEmailAndPassword(secondaryAuth, email, oldPassword);
                        await updatePassword(cred.user, password);
                        await signOut(secondaryAuth);
                        updates.plainPassword = password;
                    } catch (authErr) {
                        console.warn("Auth update failed:", authErr);
                        updates.plainPassword = password;
                        showToast("DB updated. Auth password may not match.", "warning");
                    }
                } else {
                    updates.plainPassword = password;
                }
            }
            await updateDoc(doc(db, "users", id), updates);
            showToast("User updated successfully.");
        } else {
            // ── Create new ──
            if (password.length < 6) throw new Error("Password must be 6+ characters");
            const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            await signOut(secondaryAuth);
            await setDoc(doc(db, "users", cred.user.uid), {
                name, email, role, status,
                plainPassword: password,
                archived: false,
                createdAt: new Date()
            });
            showToast("User created successfully.");
        }
        closeModal('userModal');
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') showToast("Email already exists.", "error");
        else showToast(err.message, "error");
    } finally {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save User';
        saveBtn.disabled  = false;
    }
}

// ── Helpers ───────────────────────────────────────────────
window.generatePassword = function() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";
    for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    const inp  = document.getElementById('password');
    inp.value  = pass;
    inp.type   = 'text';
};

function getSecondaryAuth() {
    let secondaryApp;
    try   { secondaryApp = getApp("SecondaryApp"); }
    catch { secondaryApp = initializeApp(firebaseConfig, "SecondaryApp"); }
    return getAuth(secondaryApp);
}

function openModal(id)  {
    const m = document.getElementById(id);
    if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
}

window.closeAllModals = function() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    document.body.style.overflow = '';
};

// Close modal on backdrop click
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(m =>
        m.addEventListener('click', e => { if (e.target === m) window.closeAllModals(); })
    );
});

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle' };
    const toast  = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity    = '0';
        toast.style.transition = 'opacity .35s';
        setTimeout(() => toast.remove(), 350);
    }, 3000);
}

// Expose for HTML onclick
window.triggerDelete = window.openDelete; // legacy alias