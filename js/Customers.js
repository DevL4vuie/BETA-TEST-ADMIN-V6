// // js/customers.js
// import {
//     db, auth,
//     collection, onSnapshot, doc, updateDoc,
//     query, orderBy
// } from './firebase.js';

// import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// // ─── State ────────────────────────────────────────────────────
// let allCustomers   = [];
// let filteredData   = [];
// let currentPage    = 1;
// const PAGE_SIZE    = 10;
// let selectedCustomer = null;
// let pendingConfirmAction = null;

// // ─── Init ─────────────────────────────────────────────────────
// document.addEventListener('DOMContentLoaded', () => {
//     const dateEl = document.getElementById('currentDate');
//     if (dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', {
//         weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//     });

//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') document.body.classList.add('dark-mode');

//     loadCustomers();
// });

// // ─── Load from Firestore ───────────────────────────────────────
// function loadCustomers() {
//     const q = query(collection(db, 'customer_users'), orderBy('createdAt', 'desc'));

//     onSnapshot(q, (snapshot) => {
//         allCustomers = [];
//         const cities = new Set();

//         snapshot.forEach(d => {
//             const data = { id: d.id, ...d.data() };
//             // Only show role === 'customer' (skip admin/staff)
//             if (data.role && data.role !== 'customer') return;
//             allCustomers.push(data);
//             if (data.city) cities.add(data.city);
//         });

//         // Populate city filter dynamically
//         const cityFilter = document.getElementById('cityFilter');
//         if (cityFilter) {
//             const current = cityFilter.value;
//             cityFilter.innerHTML = '<option value="all">All Cities</option>';
//             [...cities].sort().forEach(c => {
//                 const opt = document.createElement('option');
//                 opt.value = c; opt.textContent = c;
//                 if (c === current) opt.selected = true;
//                 cityFilter.appendChild(opt);
//             });
//         }

//         updateStats();
//         applyFilters();
//     }, (err) => {
//         console.error('Error loading customers:', err);
//         document.getElementById('customersTableBody').innerHTML =
//             `<tr><td colspan="7" class="empty-row" style="color:#e74a3b;"><i class="fas fa-exclamation-circle"></i> Failed to load customers.</td></tr>`;
//     });
// }

// // ─── Stats ────────────────────────────────────────────────────
// function updateStats() {
//     const total    = allCustomers.length;
//     const active   = allCustomers.filter(c => c.isActive !== false).length;
//     const inactive = total - active;
//     const cdo      = allCustomers.filter(c => (c.city || '').toLowerCase().includes('cagayan')).length;

//     document.getElementById('statTotal').innerText   = total;
//     document.getElementById('statActive').innerText  = active;
//     document.getElementById('statInactive').innerText = inactive;
//     document.getElementById('statCDO').innerText     = cdo;
// }

// // ─── Filters ─────────────────────────────────────────────────
// window.applyFilters = function() {
//     const term   = (document.getElementById('searchInput')?.value || '').toLowerCase();
//     const status = document.getElementById('statusFilter')?.value || 'all';
//     const city   = document.getElementById('cityFilter')?.value   || 'all';

//     filteredData = allCustomers.filter(c => {
//         const matchTerm =
//             (c.fullName || '').toLowerCase().includes(term) ||
//             (c.email    || '').toLowerCase().includes(term) ||
//             (c.phone    || '').toLowerCase().includes(term) ||
//             (c.username || '').toLowerCase().includes(term);

//         const isActive = c.isActive !== false;
//         const matchStatus =
//             status === 'all' ? true :
//             status === 'active' ? isActive : !isActive;

//         const matchCity = city === 'all' || (c.city || '') === city;

//         return matchTerm && matchStatus && matchCity;
//     });

//     currentPage = 1;
//     renderTable();
// };

// // ─── Render Table ─────────────────────────────────────────────
// function renderTable() {
//     const tbody = document.getElementById('customersTableBody');
//     if (!tbody) return;

//     const total = filteredData.length;
//     const start = (currentPage - 1) * PAGE_SIZE;
//     const end   = Math.min(start + PAGE_SIZE, total);
//     const page  = filteredData.slice(start, end);

//     document.getElementById('showingText').innerText =
//         `Showing ${total === 0 ? 0 : start + 1}–${end} of ${total} customers`;
//     document.getElementById('pageIndicator').innerText = `Page ${currentPage}`;

//     if (page.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" class="empty-row"><i class="fas fa-users-slash"></i> No customers found.</td></tr>`;
//         return;
//     }

//     tbody.innerHTML = page.map(c => {
//         const initial  = (c.fullName || c.username || '?')[0].toUpperCase();
//         const isActive = c.isActive !== false;
//         const badgeCls = isActive ? 'badge-active' : 'badge-inactive';
//         const badgeTxt = isActive ? 'Active' : 'Inactive';
//         const dot      = isActive ? '🟢' : '🔴';

//         const dateStr = c.createdAt?.toDate
//             ? c.createdAt.toDate().toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
//             : '—';

//         const location = [c.city, c.province].filter(Boolean).join(', ') || '—';

//         return `
//         <tr onclick="window.openCustomer('${c.id}')">
//             <td>
//                 <div class="cust-cell">
//                     <div class="cust-avatar">${initial}</div>
//                     <div>
//                         <div class="cust-name">${esc(c.fullName || '—')}</div>
//                         <div class="cust-email">${esc(c.email || '—')}</div>
//                     </div>
//                 </div>
//             </td>
//             <td>${esc(c.phone || '—')}</td>
//             <td>${esc(location)}</td>
//             <td>${esc(c.username || '—')}</td>
//             <td><span class="badge ${badgeCls}">${dot} ${badgeTxt}</span></td>
//             <td>${dateStr}</td>
//             <td onclick="event.stopPropagation()">
//                 <button class="btn-action-icon" title="View" onclick="window.openCustomer('${c.id}')">
//                     <i class="fas fa-eye"></i>
//                 </button>
//                 <button class="btn-action-icon ${isActive ? 'danger' : ''}" 
//                     title="${isActive ? 'Deactivate' : 'Activate'}"
//                     onclick="window.quickToggle('${c.id}', ${isActive})">
//                     <i class="fas fa-${isActive ? 'ban' : 'check-circle'}"></i>
//                 </button>
//             </td>
//         </tr>`;
//     }).join('');
// }

// // ─── Pagination ───────────────────────────────────────────────
// window.prevPage = function() {
//     if (currentPage > 1) { currentPage--; renderTable(); }
// };
// window.nextPage = function() {
//     const maxPage = Math.ceil(filteredData.length / PAGE_SIZE);
//     if (currentPage < maxPage) { currentPage++; renderTable(); }
// };

// // ─── Open Customer Modal ──────────────────────────────────────
// window.openCustomer = function(id) {
//     const c = allCustomers.find(x => x.id === id);
//     if (!c) return;
//     selectedCustomer = c;

//     const isActive = c.isActive !== false;
//     const initial  = (c.fullName || c.username || '?')[0].toUpperCase();

//     // Avatar
//     document.getElementById('modalAvatar').innerText = initial;

//     // Info
//     setText('modalFullName',  c.fullName   || '—');
//     setText('modalUsername',  c.username   || '—');
//     setText('modalEmail',     c.email      || '—');
//     setText('modalPhone',     c.phone      || '—');
//     setText('modalCity',      c.city       || '—');
//     setText('modalProvince',  c.province   || '—');
//     setText('modalStreet',    c.street     || '—');
//     setText('modalBarangay',  c.barangay   || '—');
//     setText('modalUid',       c.uid        || c.id || '—');

//     const fmtDate = (ts) => ts?.toDate
//         ? ts.toDate().toLocaleString('en-PH', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
//         : '—';
//     setText('modalCreatedAt', fmtDate(c.createdAt));
//     setText('modalUpdatedAt', fmtDate(c.updatedAt));

//     // Status badge
//     const sb = document.getElementById('modalStatusBadge');
//     sb.innerText = isActive ? 'Active' : 'Inactive';
//     sb.className = `status-badge ${isActive ? 'active' : 'inactive'}`;

//     // Toggle button
//     const btn = document.getElementById('btnToggleStatus');
//     if (isActive) {
//         btn.innerHTML = '<i class="fas fa-ban"></i> Deactivate';
//         btn.className = 'btn-toggle-status';
//     } else {
//         btn.innerHTML = '<i class="fas fa-check-circle"></i> Activate';
//         btn.className = 'btn-toggle-status activate';
//     }

//     document.getElementById('customerModal').style.display = 'flex';
// };

// window.closeModal = function() {
//     document.getElementById('customerModal').style.display = 'none';
//     selectedCustomer = null;
// };

// // ─── Toggle Status (from modal) ───────────────────────────────
// window.toggleStatus = function() {
//     if (!selectedCustomer) return;
//     const isActive = selectedCustomer.isActive !== false;
//     const action   = isActive ? 'deactivate' : 'activate';
//     const name     = selectedCustomer.fullName || selectedCustomer.username || 'this customer';

//     openConfirm(
//         isActive ? 'Deactivate Customer?' : 'Activate Customer?',
//         `Are you sure you want to ${action} <strong>${esc(name)}</strong>?`,
//         isActive ? 'danger' : 'success',
//         async () => {
//             try {
//                 await updateDoc(doc(db, 'customer_users', selectedCustomer.id), {
//                     isActive: !isActive,
//                     updatedAt: new Date()
//                 });
//                 showToast(`Customer ${action}d successfully.`, 'success');
//                 window.closeModal();
//             } catch (e) {
//                 console.error(e);
//                 showToast('Failed to update status.', 'error');
//             }
//         }
//     );
// };

// // ─── Quick Toggle (from table row button) ────────────────────
// window.quickToggle = function(id, currentlyActive) {
//     const c      = allCustomers.find(x => x.id === id);
//     const name   = c?.fullName || c?.username || 'this customer';
//     const action = currentlyActive ? 'deactivate' : 'activate';

//     openConfirm(
//         currentlyActive ? 'Deactivate Customer?' : 'Activate Customer?',
//         `Are you sure you want to ${action} <strong>${esc(name)}</strong>?`,
//         currentlyActive ? 'danger' : 'success',
//         async () => {
//             try {
//                 await updateDoc(doc(db, 'customer_users', id), {
//                     isActive: !currentlyActive,
//                     updatedAt: new Date()
//                 });
//                 showToast(`Customer ${action}d successfully.`, 'success');
//             } catch (e) {
//                 console.error(e);
//                 showToast('Failed to update status.', 'error');
//             }
//         }
//     );
// };

// // ─── Password Reset ───────────────────────────────────────────
// window.sendPasswordReset = async function() {
//     if (!selectedCustomer?.email) {
//         showToast('No email address found.', 'error');
//         return;
//     }
//     openConfirm(
//         'Send Password Reset?',
//         `A reset link will be sent to <strong>${esc(selectedCustomer.email)}</strong>.`,
//         'warning',
//         async () => {
//             try {
//                 await sendPasswordResetEmail(auth, selectedCustomer.email);
//                 showToast('Password reset email sent!', 'success');
//             } catch (e) {
//                 console.error(e);
//                 showToast('Failed to send reset email: ' + e.message, 'error');
//             }
//         }
//     );
// };

// // ─── Export CSV ───────────────────────────────────────────────
// window.exportCSV = function() {
//     const headers = ['Full Name', 'Username', 'Email', 'Phone', 'City', 'Province', 'Barangay', 'Street', 'Status', 'Date Joined'];
//     const rows = filteredData.map(c => [
//         c.fullName  || '',
//         c.username  || '',
//         c.email     || '',
//         c.phone     || '',
//         c.city      || '',
//         c.province  || '',
//         c.barangay  || '',
//         c.street    || '',
//         c.isActive !== false ? 'Active' : 'Inactive',
//         c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString() : ''
//     ]);

//     const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement('a');
//     a.href = url;
//     a.download = `customers_${new Date().toISOString().slice(0,10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     showToast('CSV exported!', 'success');
// };

// // ─── Confirm Modal ────────────────────────────────────────────
// function openConfirm(title, message, type = 'warning', onConfirm) {
//     document.getElementById('confirmTitle').innerText   = title;
//     document.getElementById('confirmMessage').innerHTML = message;

//     const icon = document.getElementById('confirmIcon');
//     icon.className = `confirm-icon ${type === 'danger' ? 'danger' : type === 'success' ? 'success' : ''}`;
//     icon.innerHTML = type === 'danger'
//         ? '<i class="fas fa-exclamation-triangle"></i>'
//         : type === 'success'
//         ? '<i class="fas fa-check-circle"></i>'
//         : '<i class="fas fa-exclamation-circle"></i>';

//     const btn = document.getElementById('btnConfirmAction');
//     btn.style.background = type === 'danger' ? '#e74a3b' : type === 'success' ? '#1cc88a' : 'var(--primary)';

//     pendingConfirmAction = onConfirm;
//     document.getElementById('confirmModal').style.display = 'flex';
// }

// window.closeConfirm = function() {
//     document.getElementById('confirmModal').style.display = 'none';
//     pendingConfirmAction = null;
// };

// document.getElementById('btnConfirmAction')?.addEventListener('click', async () => {
//     if (pendingConfirmAction) {
//         const btn = document.getElementById('btnConfirmAction');
//         const orig = btn.innerText;
//         btn.disabled = true;
//         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
//         await pendingConfirmAction();
//         btn.disabled = false;
//         btn.innerText = orig;
//         window.closeConfirm();
//     }
// });

// // Close modals on backdrop click
// document.querySelectorAll('.modal').forEach(m => {
//     m.addEventListener('click', (e) => {
//         if (e.target === m) {
//             m.style.display = 'none';
//             if (m.id === 'customerModal') selectedCustomer = null;
//             if (m.id === 'confirmModal')  pendingConfirmAction = null;
//         }
//     });
// });

// // ─── Toast ────────────────────────────────────────────────────
// function showToast(msg, type = 'success') {
//     const container = document.getElementById('toast-container');
//     if (!container) return;
//     const t = document.createElement('div');
//     t.className = `toast ${type}`;
//     const icon = type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'check-circle';
//     t.innerHTML = `<i class="fas fa-${icon}"></i> <span>${msg}</span>`;
//     container.appendChild(t);
//     setTimeout(() => { t.style.opacity = '0'; t.style.transition = '0.3s'; setTimeout(() => t.remove(), 300); }, 3500);
// }

// // ─── Helpers ─────────────────────────────────────────────────
// function setText(id, val) {
//     const el = document.getElementById(id);
//     if (el) el.innerText = val;
// }

// function esc(str) {
//     return String(str)
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;');
// }










// js/customers.js
import {
    db, auth,
    collection, onSnapshot, doc, updateDoc, deleteDoc,
    query, orderBy
} from './firebase.js';

import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// ─── State ────────────────────────────────────────────────────
let allCustomers     = [];
let filteredData     = [];
let currentPage      = 1;
const PAGE_SIZE      = 10;
let selectedCustomer = null;
let pendingConfirmAction = null;
let showArchived     = false;  // toggle active vs archived view

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');

    loadCustomers();
});

// ─── Load from Firestore ───────────────────────────────────────
function loadCustomers() {
    const q = query(collection(db, 'customer_users'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
        allCustomers = [];
        const cities = new Set();

        snapshot.forEach(d => {
            const data = { id: d.id, ...d.data() };
            if (data.role && data.role !== 'customer') return;
            allCustomers.push(data);
            // Only collect cities from non-archived
            if (data.city && data.status !== 'archived') cities.add(data.city);
        });

        // Populate city filter dynamically
        const cityFilter = document.getElementById('cityFilter');
        if (cityFilter) {
            const current = cityFilter.value;
            cityFilter.innerHTML = '<option value="all">All Cities</option>';
            [...cities].sort().forEach(c => {
                const opt = document.createElement('option');
                opt.value = c; opt.textContent = c;
                if (c === current) opt.selected = true;
                cityFilter.appendChild(opt);
            });
        }

        updateStats();
        applyFilters();
    }, (err) => {
        console.error('Error loading customers:', err);
        document.getElementById('customersTableBody').innerHTML =
            `<tr><td colspan="7" class="empty-row" style="color:#e74a3b;"><i class="fas fa-exclamation-circle"></i> Failed to load customers.</td></tr>`;
    });
}

// ─── Stats ────────────────────────────────────────────────────
function updateStats() {
    const nonArchived = allCustomers.filter(c => c.status !== 'archived');
    const archived    = allCustomers.filter(c => c.status === 'archived');
    const total    = nonArchived.length;
    const active   = nonArchived.filter(c => c.isActive !== false).length;
    const inactive = nonArchived.filter(c => c.isActive === false).length;
    const cdo      = nonArchived.filter(c => (c.city || '').toLowerCase().includes('cagayan')).length;

    document.getElementById('statTotal').innerText    = total;
    document.getElementById('statActive').innerText   = active;
    document.getElementById('statInactive').innerText = inactive;
    document.getElementById('statCDO').innerText      = cdo;

    const archEl = document.getElementById('statArchived');
    if (archEl) archEl.innerText = archived.length;
}

// ─── Toggle Archived View ─────────────────────────────────────
window.toggleArchivedView = function() {
    showArchived = !showArchived;
    const btn = document.getElementById('btnToggleArchive');
    if (btn) {
        btn.innerHTML = showArchived
            ? '<i class="fas fa-users"></i> View Active'
            : '<i class="fas fa-archive"></i> View Archived';
        btn.classList.toggle('active-archive', showArchived);
    }
    // Update page title hint
    const h1 = document.querySelector('header .header-title h1');
    if (h1) h1.innerText = showArchived ? 'Manage Customers — Archived' : 'Manage Customers';

    applyFilters();
};

// ─── Filters ─────────────────────────────────────────────────
window.applyFilters = function() {
    const term   = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const status = document.getElementById('statusFilter')?.value || 'all';
    const city   = document.getElementById('cityFilter')?.value   || 'all';

    // Pool: archived or active based on view
    const pool = showArchived
        ? allCustomers.filter(c => c.status === 'archived')
        : allCustomers.filter(c => c.status !== 'archived');

    filteredData = pool.filter(c => {
        const matchTerm =
            (c.fullName || '').toLowerCase().includes(term) ||
            (c.email    || '').toLowerCase().includes(term) ||
            (c.phone    || '').toLowerCase().includes(term) ||
            (c.username || '').toLowerCase().includes(term);

        const isActive = c.isActive !== false;
        const matchStatus = showArchived ? true :
            status === 'all' ? true :
            status === 'active' ? isActive : !isActive;

        const matchCity = city === 'all' || (c.city || '') === city;

        return matchTerm && matchStatus && matchCity;
    });

    currentPage = 1;
    renderTable();
};

// ─── Render Table ─────────────────────────────────────────────
function renderTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    const total = filteredData.length;
    const start = (currentPage - 1) * PAGE_SIZE;
    const end   = Math.min(start + PAGE_SIZE, total);
    const page  = filteredData.slice(start, end);

    document.getElementById('showingText').innerText =
        `Showing ${total === 0 ? 0 : start + 1}–${end} of ${total} ${showArchived ? 'archived' : 'customers'}`;
    document.getElementById('pageIndicator').innerText = `Page ${currentPage}`;

    if (page.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-row">
            <i class="fas fa-${showArchived ? 'archive' : 'users-slash'}"></i>
            No ${showArchived ? 'archived customers' : 'customers'} found.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = page.map(c => {
        const initial    = (c.fullName || c.username || '?')[0].toUpperCase();
        const isActive   = c.isActive !== false;
        const isArchived = c.status === 'archived';

        let badgeCls, badgeTxt, dot;
        if (isArchived) {
            badgeCls = 'badge-archived'; badgeTxt = 'Archived'; dot = '📦';
        } else if (isActive) {
            badgeCls = 'badge-active';   badgeTxt = 'Active';   dot = '🟢';
        } else {
            badgeCls = 'badge-inactive'; badgeTxt = 'Inactive'; dot = '🔴';
        }

        const dateStr = c.createdAt?.toDate
            ? c.createdAt.toDate().toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
            : '—';

        const location = [c.city, c.province].filter(Boolean).join(', ') || '—';

        const actionBtns = isArchived
            ? `<button class="btn-action-icon" title="View" onclick="window.openCustomer('${c.id}')">
                   <i class="fas fa-eye"></i>
               </button>
               <button class="btn-action-icon restore" title="Restore" onclick="window.restoreCustomer('${c.id}')">
                   <i class="fas fa-undo-alt"></i>
               </button>
               <button class="btn-action-icon danger" title="Delete Permanently" onclick="window.confirmDeletePermanently('${c.id}')">
                   <i class="fas fa-trash-alt"></i>
               </button>`
            : `<button class="btn-action-icon" title="View" onclick="window.openCustomer('${c.id}')">
                   <i class="fas fa-eye"></i>
               </button>
               <button class="btn-action-icon ${isActive ? 'danger' : ''}"
                   title="${isActive ? 'Deactivate' : 'Activate'}"
                   onclick="window.quickToggle('${c.id}', ${isActive})">
                   <i class="fas fa-${isActive ? 'ban' : 'check-circle'}"></i>
               </button>
               <button class="btn-action-icon archive" title="Archive"
                   onclick="window.quickArchive('${c.id}', ${isActive})">
                   <i class="fas fa-archive"></i>
               </button>`;

        return `
        <tr class="${isArchived ? 'row-archived' : ''}" onclick="window.openCustomer('${c.id}')">
            <td>
                <div class="cust-cell">
                    <div class="cust-avatar ${isArchived ? 'archived' : ''}">${initial}</div>
                    <div>
                        <div class="cust-name">${esc(c.fullName || '—')}</div>
                        <div class="cust-email">${esc(c.email || '—')}</div>
                    </div>
                </div>
            </td>
            <td>${esc(c.phone || '—')}</td>
            <td>${esc(location)}</td>
            <td>${esc(c.username || '—')}</td>
            <td><span class="badge ${badgeCls}">${dot} ${badgeTxt}</span></td>
            <td>${dateStr}</td>
            <td onclick="event.stopPropagation()">${actionBtns}</td>
        </tr>`;
    }).join('');
}

// ─── Pagination ───────────────────────────────────────────────
window.prevPage = function() {
    if (currentPage > 1) { currentPage--; renderTable(); }
};
window.nextPage = function() {
    const maxPage = Math.ceil(filteredData.length / PAGE_SIZE);
    if (currentPage < maxPage) { currentPage++; renderTable(); }
};

// ─── Open Customer Modal ──────────────────────────────────────
window.openCustomer = function(id) {
    const c = allCustomers.find(x => x.id === id);
    if (!c) return;
    selectedCustomer = c;

    const isActive = c.isActive !== false;
    const initial  = (c.fullName || c.username || '?')[0].toUpperCase();

    // Avatar
    document.getElementById('modalAvatar').innerText = initial;

    // Info
    setText('modalFullName',  c.fullName   || '—');
    setText('modalUsername',  c.username   || '—');
    setText('modalEmail',     c.email      || '—');
    setText('modalPhone',     c.phone      || '—');
    setText('modalCity',      c.city       || '—');
    setText('modalProvince',  c.province   || '—');
    setText('modalStreet',    c.street     || '—');
    setText('modalBarangay',  c.barangay   || '—');
    setText('modalUid',       c.uid        || c.id || '—');

    const fmtDate = (ts) => ts?.toDate
        ? ts.toDate().toLocaleString('en-PH', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
        : '—';
    setText('modalCreatedAt', fmtDate(c.createdAt));
    setText('modalUpdatedAt', fmtDate(c.updatedAt));

    // Status badge
    const sb = document.getElementById('modalStatusBadge');
    sb.innerText = isActive ? 'Active' : 'Inactive';
    sb.className = `status-badge ${isActive ? 'active' : 'inactive'}`;

    // Toggle button + archive button
    const btn = document.getElementById('btnToggleStatus');
    const archiveBtn = document.getElementById('btnArchive');
    const isArchived = c.status === 'archived';

    if (isArchived) {
        // Archived view: hide toggle, show restore + delete permanently
        if (btn) btn.style.display = 'none';
        if (archiveBtn) {
            archiveBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete Permanently';
            archiveBtn.className = 'btn-delete-perm';
            archiveBtn.onclick = () => window.confirmDeletePermanently(c.id);
        }
        // Show restore button
        const restoreBtn = document.getElementById('btnRestore');
        if (restoreBtn) {
            restoreBtn.style.display = 'flex';
            restoreBtn.onclick = () => window.restoreCustomer(c.id);
        }
    } else {
        // Hide restore button for non-archived
        const restoreBtn = document.getElementById('btnRestore');
        if (restoreBtn) restoreBtn.style.display = 'none';

        if (btn) {
            btn.style.display = 'flex';
            if (isActive) {
                btn.innerHTML = '<i class="fas fa-ban"></i> Deactivate';
                btn.className = 'btn-toggle-status';
            } else {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Activate';
                btn.className = 'btn-toggle-status activate';
            }
        }
        if (archiveBtn) {
            archiveBtn.innerHTML = '<i class="fas fa-archive"></i> Archive';
            archiveBtn.className = 'btn-archive';
            archiveBtn.onclick = () => window.archiveCustomer(c.id, isActive);
        }
    }

    document.getElementById('customerModal').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('customerModal').style.display = 'none';
    selectedCustomer = null;
};

// ─── Toggle Status (from modal) ───────────────────────────────
window.toggleStatus = function() {
    if (!selectedCustomer) return;
    const isActive = selectedCustomer.isActive !== false;
    const action   = isActive ? 'deactivate' : 'activate';
    const name     = selectedCustomer.fullName || selectedCustomer.username || 'this customer';

    openConfirm(
        isActive ? 'Deactivate Customer?' : 'Activate Customer?',
        `Are you sure you want to ${action} <strong>${esc(name)}</strong>?`,
        isActive ? 'danger' : 'success',
        async () => {
            try {
                await updateDoc(doc(db, 'customer_users', selectedCustomer.id), {
                    isActive: !isActive,
                    updatedAt: new Date()
                });
                showToast(`Customer ${action}d successfully.`, 'success');
                window.closeModal();
            } catch (e) {
                console.error(e);
                showToast('Failed to update status.', 'error');
            }
        }
    );
};

// ─── Quick Toggle (from table row button) ────────────────────
window.quickToggle = function(id, currentlyActive) {
    const c      = allCustomers.find(x => x.id === id);
    const name   = c?.fullName || c?.username || 'this customer';
    const action = currentlyActive ? 'deactivate' : 'activate';

    openConfirm(
        currentlyActive ? 'Deactivate Customer?' : 'Activate Customer?',
        `Are you sure you want to ${action} <strong>${esc(name)}</strong>?`,
        currentlyActive ? 'danger' : 'success',
        async () => {
            try {
                await updateDoc(doc(db, 'customer_users', id), {
                    isActive: !currentlyActive,
                    updatedAt: new Date()
                });
                showToast(`Customer ${action}d successfully.`, 'success');
            } catch (e) {
                console.error(e);
                showToast('Failed to update status.', 'error');
            }
        }
    );
};

// ─── Archive Customer ─────────────────────────────────────────
window.archiveCustomer = function(id, isActive) {
    // RULE: must be inactive first
    if (isActive) {
        openConfirm(
            'Cannot Archive Active Account',
            'You must <strong>deactivate</strong> this customer\'s account before archiving it.',
            'warning',
            null,  // no action — just an info popup
            'Got it'
        );
        return;
    }
    const c    = allCustomers.find(x => x.id === id);
    const name = c?.fullName || c?.username || 'this customer';

    openConfirm(
        'Archive Customer?',
        `<strong>${esc(name)}</strong> will be moved to the archive. Their data is preserved but they won't appear in the active list.`,
        'danger',
        async () => {
            try {
                await updateDoc(doc(db, 'customer_users', id), {
                    status:    'archived',
                    updatedAt: new Date()
                });
                showToast('Customer archived successfully.', 'success');
                window.closeModal();
            } catch (e) {
                console.error(e);
                showToast('Failed to archive customer.', 'error');
            }
        }
    );
};

// Quick archive from table row (with same active check)
window.quickArchive = function(id, isActive) {
    window.archiveCustomer(id, isActive);
};

// ─── Restore Customer ─────────────────────────────────────────
window.restoreCustomer = function(id) {
    const c    = allCustomers.find(x => x.id === id);
    const name = c?.fullName || c?.username || 'this customer';

    openConfirm(
        'Restore Customer?',
        `<strong>${esc(name)}</strong> will be restored to the active list with an <strong>Inactive</strong> status. You can reactivate them after restoring.`,
        'success',
        async () => {
            try {
                await updateDoc(doc(db, 'customer_users', id), {
                    status:    'active',
                    isActive:  false,   // restored as inactive — admin reactivates manually
                    updatedAt: new Date()
                });
                showToast('Customer restored successfully.', 'success');
                window.closeModal();
            } catch (e) {
                console.error(e);
                showToast('Failed to restore customer.', 'error');
            }
        }
    );
};

// ─── Delete Permanently ───────────────────────────────────────
window.confirmDeletePermanently = function(id) {
    const c    = allCustomers.find(x => x.id === id);
    const name = c?.fullName || c?.username || 'this customer';

    openConfirm(
        '⚠️ Delete Permanently?',
        `This will <strong>permanently delete</strong> <strong>${esc(name)}</strong> and all their data. This action <strong>cannot be undone</strong>.`,
        'danger',
        async () => {
            try {
                await deleteDoc(doc(db, 'customer_users', id));
                showToast('Customer permanently deleted.', 'success');
                window.closeModal();
            } catch (e) {
                console.error(e);
                showToast('Failed to delete customer.', 'error');
            }
        },
        'Yes, Delete Forever'
    );
};
window.sendPasswordReset = async function() {
    if (!selectedCustomer?.email) {
        showToast('No email address found.', 'error');
        return;
    }
    openConfirm(
        'Send Password Reset?',
        `A reset link will be sent to <strong>${esc(selectedCustomer.email)}</strong>.`,
        'warning',
        async () => {
            try {
                await sendPasswordResetEmail(auth, selectedCustomer.email);
                showToast('Password reset email sent!', 'success');
            } catch (e) {
                console.error(e);
                showToast('Failed to send reset email: ' + e.message, 'error');
            }
        }
    );
};

// ─── Export CSV ───────────────────────────────────────────────
window.exportCSV = function() {
    const headers = ['Full Name', 'Username', 'Email', 'Phone', 'City', 'Province', 'Barangay', 'Street', 'Status', 'Date Joined'];
    const rows = filteredData.map(c => [
        c.fullName  || '',
        c.username  || '',
        c.email     || '',
        c.phone     || '',
        c.city      || '',
        c.province  || '',
        c.barangay  || '',
        c.street    || '',
        c.isActive !== false ? 'Active' : 'Inactive',
        c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString() : ''
    ]);

    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported!', 'success');
};

// ─── Confirm Modal ────────────────────────────────────────────
function openConfirm(title, message, type = 'warning', onConfirm, btnLabel = 'Confirm') {
    document.getElementById('confirmTitle').innerText   = title;
    document.getElementById('confirmMessage').innerHTML = message;

    const icon = document.getElementById('confirmIcon');
    icon.className = `confirm-icon ${type === 'danger' ? 'danger' : type === 'success' ? 'success' : ''}`;
    icon.innerHTML = type === 'danger'
        ? '<i class="fas fa-exclamation-triangle"></i>'
        : type === 'success'
        ? '<i class="fas fa-check-circle"></i>'
        : '<i class="fas fa-exclamation-circle"></i>';

    const btn = document.getElementById('btnConfirmAction');
    btn.innerText = btnLabel;
    btn.style.background = type === 'danger' ? '#e74a3b' : type === 'success' ? '#1cc88a' : 'var(--primary)';

    // If no action, just show as info (single OK button)
    const cancelBtn = document.querySelector('#confirmModal .btn-close');
    if (onConfirm === null) {
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else {
        if (cancelBtn) cancelBtn.style.display = '';
    }

    pendingConfirmAction = onConfirm;
    document.getElementById('confirmModal').style.display = 'flex';
}

window.closeConfirm = function() {
    document.getElementById('confirmModal').style.display = 'none';
    pendingConfirmAction = null;
};

document.getElementById('btnConfirmAction')?.addEventListener('click', async () => {
    if (!pendingConfirmAction) {
        // info-only popup — just close
        window.closeConfirm();
        // restore cancel button visibility
        const cancelBtn = document.querySelector('#confirmModal .btn-close');
        if (cancelBtn) cancelBtn.style.display = '';
        return;
    }
    const btn  = document.getElementById('btnConfirmAction');
    const orig = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    await pendingConfirmAction();
    btn.disabled  = false;
    btn.innerText = orig;
    window.closeConfirm();
    const cancelBtn = document.querySelector('#confirmModal .btn-close');
    if (cancelBtn) cancelBtn.style.display = '';
});

// Close modals on backdrop click
document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
        if (e.target === m) {
            m.style.display = 'none';
            if (m.id === 'customerModal') selectedCustomer = null;
            if (m.id === 'confirmModal')  pendingConfirmAction = null;
        }
    });
});

// ─── Toast ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icon = type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'check-circle';
    t.innerHTML = `<i class="fas fa-${icon}"></i> <span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = '0.3s'; setTimeout(() => t.remove(), 300); }, 3500);
}

// ─── Helpers ─────────────────────────────────────────────────
function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function esc(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}