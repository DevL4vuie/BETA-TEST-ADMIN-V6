




// // import { 
// //     db, collection, query, orderBy, onSnapshot, getDocs, auth 
// // } from './firebase.js';
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// // // ── State ─────────────────────────────────────────────────────
// // let allInquiries  = [];   // active (archived === false/undefined)
// // let allArchived   = [];   // archived (archived === true)
// // let filtered      = [];
// // let currentView   = 'active';   // 'active' | 'archive'
// // let activeFilter  = 'all';
// // let activeSearch  = '';
// // let sortField     = 'date';
// // let sortAsc       = false;
// // let dateFrom      = '';
// // let dateTo        = '';
// // let currentPage   = 1;
// // const PER_PAGE    = 10;
// // let archiveTarget = null;
// // let restoreTarget = null;
// // let deleteTarget  = null;

// // // Notification state
// // let notifications    = [];      // { id, orderId, customer, time, read }
// // let seenInquiryIds   = new Set(); // IDs we've already seen (no notif on initial load)
// // let initialLoadDone  = false;

// // // Store info from Firestore users collection
// // let storeInfo = { name: "Gene's Lechon", email: '', phone: '', address: '' };

// // const QUICK_REPLIES = [
// //   { label: "✅ Confirmed",       text: "Hi {customer}! Great news — your order ({orderId}) has been confirmed. We'll have it ready by {orderDate} at {orderTime}. Thank you for choosing {storeName}! 🐷" },
// //   { label: "📦 Ready for Pickup", text: "Hi {customer}! Your order ({orderId}) is now ready. Please come by at your scheduled time. See you soon! — {storeName} 🐷" },
// //   { label: "⏳ Need More Info",   text: "Hi {customer}! We received your inquiry ({orderId}). Could you provide more details so we can process it? — {storeName}" },
// //   { label: "❌ Unavailable",      text: "Hi {customer}, we're sorry but we cannot fulfill order {orderId} on {orderDate}. Please contact us to reschedule. — {storeName}" },
// //   { label: "🙏 Thank You",       text: "Hi {customer}! Thank you for your order ({orderId}). We appreciate your support! — {storeName} 🐷" }
// // ];

// // // ── Init ──────────────────────────────────────────────────────
// // document.addEventListener('DOMContentLoaded', () => {
// //   showDateNow();
// //   loadStoreInfo();
// //   listenToInquiries();
// //   // Close notification panel when clicking outside
// //   document.addEventListener('click', (e) => {
// //     const wrap = document.getElementById('notifWrap');
// //     if (wrap && !wrap.contains(e.target)) closeNotifPanel();
// //   });
// // });

// // function showDateNow() {
// //   const el = document.getElementById('currentDate');
// //   if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
// // }

// // async function loadStoreInfo() {
// //   try {
// //     const snap = await getDocs(collection(db, "users"));
// //     snap.forEach(d => {
// //       const data = d.data();
// //       if (data.role === 'admin') {
// //         storeInfo.email   = data.email     || storeInfo.email;
// //         storeInfo.phone   = data.phone     || storeInfo.phone;
// //         storeInfo.address = data.address   || storeInfo.address;
// //         storeInfo.name    = data.storeName || storeInfo.name;
// //       }
// //     });
// //   } catch (e) { console.warn('Could not load store info:', e); }
// // }

// // // ── Firestore Real-time Listener ──────────────────────────────
// // function listenToInquiries() {
// //   const q = query(collection(db, "inquiries"), orderBy("date", "desc"));

// //   onSnapshot(q, (snap) => {
// //     const prevIds = new Set([...allInquiries, ...allArchived].map(i => i.id));

// //     allInquiries = [];
// //     allArchived  = [];

// //     snap.forEach(d => {
// //       const data = { id: d.id, ...d.data() };
// //       if (data.archived) allArchived.push(data);
// //       else               allInquiries.push(data);
// //     });

// //     // ── Detect NEW inquiries for notifications ─────────────
// //     if (initialLoadDone) {
// //       allInquiries.forEach(inq => {
// //         if (!prevIds.has(inq.id) && !seenInquiryIds.has(inq.id)) {
// //           addNotification(inq);
// //         }
// //       });
// //     } else {
// //       // First load — record all existing IDs, no notifications
// //       allInquiries.forEach(i => seenInquiryIds.add(i.id));
// //       allArchived.forEach(i  => seenInquiryIds.add(i.id));
// //       initialLoadDone = true;
// //     }

// //     // Always mark seen
// //     allInquiries.forEach(i => seenInquiryIds.add(i.id));
// //     allArchived.forEach(i  => seenInquiryIds.add(i.id));

// //     document.getElementById('loadingState').style.display = 'none';
// //     updateStats();
// //     applyAll();

// //   }, (err) => {
// //     console.error('Firestore error:', err);
// //     document.getElementById('loadingState').style.display = 'none';
// //     document.getElementById('emptyState').style.display   = 'block';
// //     showToast('Could not connect to database.', 'error');
// //   });
// // }

// // // ── Stats ─────────────────────────────────────────────────────
// // function updateStats() {
// //   const c = { total: allInquiries.length, pending:0, confirmed:0, ready:0, cancelled:0 };
// //   allInquiries.forEach(i => { if (c[i.status] !== undefined) c[i.status]++; });

// //   document.getElementById('statTotal').textContent     = c.total;
// //   document.getElementById('statPending').textContent   = c.pending;
// //   document.getElementById('statConfirmed').textContent = c.confirmed;
// //   document.getElementById('statReady').textContent     = c.ready;
// //   document.getElementById('statArchived').textContent  = allArchived.length;

// //   const badge = document.getElementById('sidebarBadge');
// //   if (badge) { badge.textContent = c.pending || ''; badge.style.display = c.pending ? '' : 'none'; }

// //   // Archive tab count
// //   const archiveCount = document.getElementById('archiveTabCount');
// //   if (archiveCount) {
// //     archiveCount.textContent = allArchived.length;
// //     archiveCount.style.display = allArchived.length > 0 ? 'inline-flex' : 'none';
// //   }
// // }

// // // ══════════════════════════════════════════════════════════════
// // //  NOTIFICATIONS
// // // ══════════════════════════════════════════════════════════════

// // function addNotification(inq) {
// //   const notif = {
// //     id:       inq.id,
// //     orderId:  inq.orderId || inq.id,
// //     customer: inq.customer || 'Unknown',
// //     items:    (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', '),
// //     total:    inq.total || 0,
// //     time:     new Date(),
// //     read:     false
// //   };
// //   notifications.unshift(notif);
// //   // Keep max 20 notifications
// //   if (notifications.length > 20) notifications.pop();
// //   renderNotifPanel();
// //   // Play bell animation
// //   animateNotifBtn();
// //   showToast(`New inquiry from ${notif.customer}!`, 'info');
// // }

// // function animateNotifBtn() {
// //   const btn = document.getElementById('notifBtn');
// //   if (!btn) return;
// //   btn.classList.add('ring');
// //   setTimeout(() => btn.classList.remove('ring'), 1000);
// // }

// // function renderNotifPanel() {
// //   const list    = document.getElementById('notifList');
// //   const badge   = document.getElementById('notifBadge');
// //   const unread  = notifications.filter(n => !n.read).length;

// //   badge.textContent    = unread;
// //   badge.style.display  = unread > 0 ? 'flex' : 'none';

// //   if (notifications.length === 0) {
// //     list.innerHTML = `<div class="notif-empty"><i class="fas fa-check-circle"></i><p>All caught up!</p></div>`;
// //     return;
// //   }

// //   list.innerHTML = notifications.map(n => `
// //     <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="notifClick('${n.id}')">
// //       <div class="notif-dot-ind ${n.read ? '' : 'active'}"></div>
// //       <div class="notif-content">
// //         <div class="notif-title">
// //           <span class="notif-name">${n.customer}</span>
// //           <span class="notif-order">${n.orderId}</span>
// //         </div>
// //         <div class="notif-items">${n.items || '—'}</div>
// //         <div class="notif-meta">
// //           <span class="notif-total">₱${n.total.toLocaleString()}</span>
// //           <span class="notif-time">${timeAgo(n.time)}</span>
// //         </div>
// //       </div>
// //     </div>`).join('');
// // }

// // window.notifClick = function(id) {
// //   // Mark as read
// //   const n = notifications.find(x => x.id === id);
// //   if (n) n.read = true;
// //   renderNotifPanel();
// //   closeNotifPanel();
// //   // Switch to active view and open detail
// //   if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
// //   openDetail(id);
// // };

// // window.toggleNotifPanel = function() {
// //   const panel = document.getElementById('notifPanel');
// //   const isOpen = panel.classList.contains('open');
// //   if (isOpen) {
// //     closeNotifPanel();
// //   } else {
// //     panel.classList.add('open');
// //     // Mark all as read when opened
// //     setTimeout(() => {
// //       notifications.forEach(n => n.read = true);
// //       renderNotifPanel();
// //     }, 1500);
// //   }
// // };

// // function closeNotifPanel() {
// //   document.getElementById('notifPanel')?.classList.remove('open');
// // }

// // window.clearAllNotifs = function() {
// //   notifications = [];
// //   renderNotifPanel();
// // };

// // // ══════════════════════════════════════════════════════════════
// // //  VIEW SWITCHING (active ↔ archive)
// // // ══════════════════════════════════════════════════════════════

// // window.switchView = function(view, btn) {
// //   currentView  = view;
// //   activeFilter = 'all';
// //   activeSearch = '';
// //   document.getElementById('globalSearch').value = '';
// //   resetDateFilter(true); // silent reset

// //   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
// //   if (btn) btn.classList.add('active');

// //   const pageTitle  = document.getElementById('pageTitle');
// //   const emptyTitle = document.getElementById('emptyTitle');
// //   const emptyMsg   = document.getElementById('emptyMsg');
// //   const statusHeader = document.getElementById('statusHeader');

// //   if (view === 'archive') {
// //     pageTitle.textContent  = 'Archive';
// //     emptyTitle.textContent = 'No archived inquiries';
// //     emptyMsg.textContent   = 'Inquiries you archive will appear here.';
// //     if (statusHeader) statusHeader.textContent = 'Status';
// //   } else {
// //     pageTitle.textContent  = 'Inquiries';
// //     emptyTitle.textContent = 'No inquiries found';
// //     emptyMsg.textContent   = 'Inquiries submitted from the landing page will appear here in real-time.';
// //   }

// //   applyAll();
// // };

// // // ── Filter / Sort / Search ────────────────────────────────────
// // function applyAll() {
// //   const source = currentView === 'archive' ? allArchived : allInquiries;

// //   filtered = source.filter(i => {
// //     const matchFilter = currentView === 'archive' || activeFilter === 'all' || i.status === activeFilter;
// //     const sl = activeSearch.toLowerCase();
// //     const matchSearch = !activeSearch ||
// //       (i.customer || '').toLowerCase().includes(sl) ||
// //       (i.orderId  || '').toLowerCase().includes(sl) ||
// //       (i.email    || '').toLowerCase().includes(sl) ||
// //       (i.phone    || '').toLowerCase().includes(sl);
// //     const matchDate = (() => {
// //       if (!dateFrom && !dateTo) return true;
// //       const d = new Date(i.date || i.createdAt);
// //       if (isNaN(d)) return true;
// //       if (dateFrom && d < new Date(dateFrom))             return false;
// //       if (dateTo   && d > new Date(dateTo + 'T23:59:59')) return false;
// //       return true;
// //     })();
// //     return matchFilter && matchSearch && matchDate;
// //   });

// //   filtered.sort((a, b) => {
// //     let va, vb;
// //     switch (sortField) {
// //       case 'total':     va = a.total||0;           vb = b.total||0;           break;
// //       case 'date':      va = new Date(a.date||0);  vb = new Date(b.date||0);  break;
// //       case 'orderDate': va = new Date(a.orderDate||0); vb = new Date(b.orderDate||0); break;
// //       case 'customer':  va = (a.customer||'').toLowerCase(); vb = (b.customer||'').toLowerCase(); break;
// //       default:          va = (a[sortField]||'').toString().toLowerCase(); vb = (b[sortField]||'').toString().toLowerCase();
// //     }
// //     return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
// //   });

// //   currentPage = 1;
// //   renderTable();
// //   renderPagination();
// // }

// // window.setFilter = function(f, btn) {
// //   if (currentView === 'archive') switchView('active', btn);
// //   activeFilter = f;
// //   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
// //   if (btn) btn.classList.add('active');
// //   applyAll();
// // };

// // window.handleSearch = function(val) { activeSearch = val; applyAll(); };

// // window.applyDateFilter = function() {
// //   dateFrom = document.getElementById('dateFrom').value;
// //   dateTo   = document.getElementById('dateTo').value;
// //   // Show/hide reset button
// //   const resetBtn = document.getElementById('dateResetBtn');
// //   if (resetBtn) resetBtn.style.display = (dateFrom || dateTo) ? 'inline-flex' : 'none';
// //   applyAll();
// // };

// // window.resetDateFilter = function(silent = false) {
// //   dateFrom = ''; dateTo = '';
// //   const f = document.getElementById('dateFrom');
// //   const t = document.getElementById('dateTo');
// //   const r = document.getElementById('dateResetBtn');
// //   if (f) f.value = '';
// //   if (t) t.value = '';
// //   if (r) r.style.display = 'none';
// //   if (!silent) applyAll();
// // };

// // window.sortBy = function(field) {
// //   sortAsc   = sortField === field ? !sortAsc : false;
// //   sortField = field;
// //   applyAll();
// // };

// // // ── Render Table ──────────────────────────────────────────────
// // function renderTable() {
// //   const tbody = document.getElementById('inquiryBody');
// //   const empty = document.getElementById('emptyState');
// //   tbody.innerHTML = '';

// //   if (filtered.length === 0) { empty.style.display = 'block'; return; }
// //   empty.style.display = 'none';

// //   const start = (currentPage - 1) * PER_PAGE;
// //   filtered.slice(start, start + PER_PAGE).forEach((inq, idx) => {
// //     const tr        = document.createElement('tr');
// //     tr.style.animationDelay = `${idx * 0.04}s`;
// //     if (currentView === 'archive') tr.classList.add('archived-row');

// //     const initials  = (inq.customer || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
// //     const itemsStr  = (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', ') || '—';
// //     const orderDate = inq.orderDate
// //       ? new Date(inq.orderDate + 'T00:00:00').toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
// //       : '—';
// //     const inqDate   = inq.date ? timeAgo(new Date(inq.date)) : '—';
// //     const status    = inq.status || 'pending';

// //     // Different action buttons for active vs archive view
// //     const actionBtns = currentView === 'archive'
// //       ? `<button class="action-btn restore" title="Restore" onclick="openRestore('${inq.id}')"><i class="fas fa-undo"></i></button>
// //          <button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
// //          <button class="action-btn delete"  title="Delete Forever" onclick="openDelete('${inq.id}')"><i class="fas fa-trash"></i></button>`
// //       : `<button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
// //          <button class="action-btn reply"   title="Reply"   onclick="openReply('${inq.id}')"><i class="fas fa-reply"></i></button>
// //          <button class="action-btn archive" title="Archive" onclick="openArchive('${inq.id}')"><i class="fas fa-archive"></i></button>`;

// //     tr.innerHTML = `
// //       <td><input type="checkbox" class="row-check" data-id="${inq.id}"/></td>
// //       <td><span class="order-id">${inq.orderId || inq.id}</span></td>
// //       <td>
// //         <div class="customer-cell">
// //           <div class="cust-avatar" style="background:${avatarColor(inq.customer||'')}">${initials}</div>
// //           <div>
// //             <div class="cust-name">${inq.customer || '—'}</div>
// //             <div class="cust-email">${inq.email || '—'}</div>
// //           </div>
// //         </div>
// //       </td>
// //       <td>${inqDate}</td>
// //       <td>${orderDate}${inq.orderTime ? `<span style="color:var(--text-grey);font-size:11px;"> @ ${formatTime(inq.orderTime)}</span>` : ''}</td>
// //       <td><div class="items-preview" title="${itemsStr}">${itemsStr}</div></td>
// //       <td><span class="total-cell">₱${(inq.total||0).toLocaleString()}</span></td>
// //       <td>
// //         ${currentView === 'archive'
// //           ? `<span class="status-badge ${status}">${status}</span>`
// //           : `<select class="status-select" onchange="quickStatusUpdate('${inq.id}', this.value)">
// //                <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
// //                <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
// //                <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready</option>
// //                <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
// //              </select>`}
// //       </td>
// //       <td><div class="row-actions">${actionBtns}</div></td>`;
// //     tbody.appendChild(tr);
// //   });
// // }

// // // ── Pagination ────────────────────────────────────────────────
// // function renderPagination() {
// //   const total = Math.ceil(filtered.length / PER_PAGE);
// //   const el    = document.getElementById('pagination');
// //   el.innerHTML = '';
// //   if (total <= 1) return;

// //   const info = document.createElement('span');
// //   info.className   = 'page-info';
// //   const s = (currentPage-1)*PER_PAGE+1, e = Math.min(currentPage*PER_PAGE, filtered.length);
// //   info.textContent = `${s}–${e} of ${filtered.length}`;
// //   el.appendChild(info);

// //   el.appendChild(mkPageBtn('<i class="fas fa-chevron-left"></i>',  currentPage===1,     () => goPage(currentPage-1)));
// //   for (let p=1; p<=total; p++) {
// //     if (total>7 && p>2 && p<total-1 && Math.abs(p-currentPage)>1) {
// //       if (p===3||p===total-2) { const d=document.createElement('span'); d.textContent='…'; d.style.cssText='padding:0 4px;color:var(--text-grey);font-size:13px;'; el.appendChild(d); }
// //       continue;
// //     }
// //     const btn = mkPageBtn(p, false, () => goPage(p));
// //     if (p===currentPage) btn.classList.add('active');
// //     el.appendChild(btn);
// //   }
// //   el.appendChild(mkPageBtn('<i class="fas fa-chevron-right"></i>', currentPage===total, () => goPage(currentPage+1)));
// // }
// // function mkPageBtn(label, disabled, onClick) {
// //   const b = document.createElement('button');
// //   b.className='page-btn'; b.innerHTML=label; b.disabled=disabled; b.onclick=onClick; return b;
// // }
// // function goPage(p) { currentPage=p; renderTable(); renderPagination(); }

// // // ── Status Update ─────────────────────────────────────────────
// // window.quickStatusUpdate = async function(id, status) {
// //   try {
// //     await updateDoc(doc(db, "inquiries", id), { status });
// //     showToast(`Status set to "${status}"`, 'success');
// //   } catch (err) { showToast('Failed to update status.', 'error'); }
// // };

// // // ══════════════════════════════════════════════════════════════
// // //  ARCHIVE / RESTORE / DELETE
// // // ══════════════════════════════════════════════════════════════

// // window.openArchive = function(id) { archiveTarget = id; openModal('archiveModal'); };

// // window.confirmArchive = async function() {
// //   if (!archiveTarget) return;
// //   const btn = document.getElementById('confirmArchiveBtn');
// //   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Archiving...';
// //   btn.disabled  = true;
// //   try {
// //     await updateDoc(doc(db, "inquiries", archiveTarget), { archived: true });
// //     showToast('Inquiry archived.', 'success');
// //   } catch (err) { showToast('Failed to archive.', 'error'); }
// //   closeModal('archiveModal');
// //   btn.innerHTML = '<i class="fas fa-archive"></i> Archive';
// //   btn.disabled  = false;
// //   archiveTarget = null;
// // };

// // window.openRestore = function(id) { restoreTarget = id; openModal('restoreModal'); };

// // window.confirmRestore = async function() {
// //   if (!restoreTarget) return;
// //   const btn = document.getElementById('confirmRestoreBtn');
// //   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restoring...';
// //   btn.disabled  = true;
// //   try {
// //     await updateDoc(doc(db, "inquiries", restoreTarget), { archived: false });
// //     showToast('Inquiry restored!', 'success');
// //     // Switch back to active view
// //     switchView('active', document.querySelector('.ftab'));
// //   } catch (err) { showToast('Failed to restore.', 'error'); }
// //   closeModal('restoreModal');
// //   btn.innerHTML = '<i class="fas fa-undo"></i> Restore';
// //   btn.disabled  = false;
// //   restoreTarget = null;
// // };

// // window.openDelete = function(id) { deleteTarget = id; openModal('deleteModal'); };

// // window.confirmDelete = async function() {
// //   if (!deleteTarget) return;
// //   const btn = document.getElementById('confirmDeleteBtn');
// //   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
// //   btn.disabled  = true;
// //   try {
// //     await deleteDoc(doc(db, "inquiries", deleteTarget));
// //     showToast('Inquiry permanently deleted.', 'success');
// //   } catch (err) { showToast('Failed to delete.', 'error'); }
// //   closeModal('deleteModal');
// //   btn.innerHTML = '<i class="fas fa-trash"></i> Delete Forever';
// //   btn.disabled  = false;
// //   deleteTarget  = null;
// // };

// // // ══════════════════════════════════════════════════════════════
// // //  DETAIL MODAL
// // // ══════════════════════════════════════════════════════════════

// // window.openDetail = async function(id) {
// //   const source = [...allInquiries, ...allArchived];
// //   let inq;
// //   try {
// //     const snap = await getDoc(doc(db, "inquiries", id));
// //     if (!snap.exists()) { showToast('Inquiry not found.', 'error'); return; }
// //     inq = { id: snap.id, ...snap.data() };
// //   } catch { inq = source.find(i => i.id === id); if (!inq) return; }

// //   const status     = inq.status || 'pending';
// //   const isArchived = !!inq.archived;

// //   document.getElementById('modalOrderId').textContent = inq.orderId || inq.id;
// //   const badge = document.getElementById('modalStatusBadge');
// //   badge.textContent = status; badge.className = `status-badge ${status}`;

// //   const itemsHtml = (inq.items||[]).map(item =>
// //     `<tr><td>${item.qty}×</td><td>${item.name}</td><td style="text-align:right;font-weight:700;">₱${((item.price||0)*(item.qty||0)).toLocaleString()}</td></tr>`
// //   ).join('') || '<tr><td colspan="3" style="color:var(--text-grey);">No items recorded</td></tr>';

// //   const orderDate   = inq.orderDate ? new Date(inq.orderDate+'T00:00:00').toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '—';
// //   const submittedAt = inq.date ? new Date(inq.date).toLocaleString('en-PH') : '—';

// //   document.getElementById('detailModalBody').innerHTML = `
// //     ${isArchived ? `<div class="archive-banner"><i class="fas fa-archive"></i> This inquiry is archived. <button class="inline-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')">Restore it</button></div>` : ''}

// //     <div class="detail-status-bar">
// //       <label><i class="fas fa-tag" style="color:var(--primary);margin-right:5px;"></i> Update Status</label>
// //       <select class="status-select-lg" onchange="quickStatusUpdate('${inq.id}', this.value)" ${isArchived?'disabled':''}>
// //         <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
// //         <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
// //         <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready / Fulfilled</option>
// //         <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
// //       </select>
// //     </div>

// //     <div class="detail-grid">
// //       <div class="detail-block">
// //         <h4><i class="fas fa-user"></i> Customer Info</h4>
// //         <div class="detail-row"><span class="dl">Name</span>   <span class="dv">${inq.customer||'—'}</span></div>
// //         <div class="detail-row"><span class="dl">Email</span>  <span class="dv">${inq.email||'—'}</span></div>
// //         <div class="detail-row"><span class="dl">Phone</span>  <span class="dv">${inq.phone||'—'}</span></div>
// //         <div class="detail-row"><span class="dl">Source</span> <span class="dv">${inq.source==='landing_page'?'🌐 Website':(inq.source||'—')}</span></div>
// //       </div>
// //       <div class="detail-block">
// //         <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
// //         <div class="detail-row"><span class="dl">Order Date</span><span class="dv">${orderDate}</span></div>
// //         <div class="detail-row"><span class="dl">Time</span>      <span class="dv">${inq.orderTime?formatTime(inq.orderTime):'—'}</span></div>
// //         <div class="detail-row"><span class="dl">Submitted</span> <span class="dv">${submittedAt}</span></div>
// //       </div>
// //     </div>

// //     ${inq.notes ? `<div class="notes-section"><h4><i class="fas fa-sticky-note"></i> Special Instructions</h4><p>${inq.notes}</p></div>` : ''}

// //     <div class="detail-block" style="margin-bottom:0;">
// //       <h4><i class="fas fa-shopping-basket"></i> Order Items</h4>
// //       <table class="items-table">
// //         <thead><tr><th>Qty</th><th>Item</th><th style="text-align:right;">Subtotal</th></tr></thead>
// //         <tbody>${itemsHtml}</tbody>
// //       </table>
// //       <div class="items-total"><span>Total Amount</span><span>₱${(inq.total||0).toLocaleString()}</span></div>
// //     </div>

// //     <div class="detail-actions">
// //       <button class="btn-secondary" onclick="closeModal('detailModal')"><i class="fas fa-times"></i> Close</button>
// //       ${isArchived
// //         ? `<button class="btn-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')"><i class="fas fa-undo"></i> Restore</button>
// //            <button class="btn-danger"  onclick="closeModal('detailModal'); openDelete('${inq.id}')"><i class="fas fa-trash"></i> Delete</button>`
// //         : `<button class="btn-outline-primary" onclick="closeModal('detailModal'); openReply('${inq.id}')"><i class="fas fa-reply"></i> Reply</button>
// //            <button class="btn-archive-confirm" onclick="closeModal('detailModal'); openArchive('${inq.id}')"><i class="fas fa-archive"></i> Archive</button>
// //            <button class="btn-primary" onclick="printInquiry('${inq.id}')"><i class="fas fa-print"></i> Print</button>`}
// //     </div>`;

// //   openModal('detailModal');
// // };

// // // ══════════════════════════════════════════════════════════════
// // //  REPLY MODAL
// // // ══════════════════════════════════════════════════════════════

// // window.openReply = function(id) {
// //   const inq = allInquiries.find(i => i.id === id);
// //   if (!inq) return;
// //   document.getElementById('replyRecipient').textContent = `To: ${inq.customer} (${inq.email||inq.phone||'—'})`;
// //   document.getElementById('replyTo').value      = inq.email || '';
// //   document.getElementById('replySubject').value = `Re: Your Order Inquiry ${inq.orderId||inq.id} — ${storeInfo.name}`;
// //   document.getElementById('replyMessage').value = '';
// //   document.getElementById('smsPhone').textContent = inq.phone || '—';
// //   document.getElementById('smsMessage').value     = fillTemplate(QUICK_REPLIES[0].text, inq);
// //   const chips = document.getElementById('qrChips');
// //   chips.innerHTML = '';
// //   QUICK_REPLIES.forEach(qr => {
// //     const chip = document.createElement('button');
// //     chip.className = 'qr-chip'; chip.textContent = qr.label;
// //     chip.onclick = () => {
// //       const f = fillTemplate(qr.text, inq);
// //       document.getElementById('replyMessage').value = f;
// //       document.getElementById('smsMessage').value   = f;
// //     };
// //     chips.appendChild(chip);
// //   });
// //   switchReplyTab('email', document.querySelector('.rtab'));
// //   openModal('replyModal');
// // };

// // window.switchReplyTab = function(tab, btn) {
// //   document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
// //   if (btn) btn.classList.add('active');
// //   document.getElementById('replyEmailSection').style.display = tab==='email'?'block':'none';
// //   document.getElementById('replySmsSection').style.display   = tab==='sms'  ?'block':'none';
// // };

// // window.sendEmailReply = function() {
// //   const to=document.getElementById('replyTo').value.trim();
// //   const subject=encodeURIComponent(document.getElementById('replySubject').value);
// //   const body=encodeURIComponent(document.getElementById('replyMessage').value);
// //   if (!to)   { showToast('No email address!', 'error'); return; }
// //   if (!body) { showToast('Write a message first!', 'error'); return; }
// //   window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;
// //   showToast('Opening email client...', 'info');
// //   closeModal('replyModal');
// // };

// // window.copySmsMessage = function() {
// //   const msg=document.getElementById('smsMessage').value;
// //   if (!msg) { showToast('Nothing to copy.', 'error'); return; }
// //   navigator.clipboard.writeText(msg)
// //     .then(()=>{ showToast('Copied!', 'success'); closeModal('replyModal'); })
// //     .catch(()=> showToast('Could not copy — copy manually.', 'error'));
// // };

// // function fillTemplate(t, inq) {
// //   return t
// //     .replace(/{customer}/g,  inq.customer||'')
// //     .replace(/{orderId}/g,   inq.orderId||inq.id||'')
// //     .replace(/{orderDate}/g, inq.orderDate||'')
// //     .replace(/{orderTime}/g, inq.orderTime?formatTime(inq.orderTime):'')
// //     .replace(/{total}/g,     `₱${(inq.total||0).toLocaleString()}`)
// //     .replace(/{storeName}/g, storeInfo.name)
// //     .replace(/{storePhone}/g,storeInfo.phone||'')
// //     .replace(/{storeEmail}/g,storeInfo.email||'');
// // }

// // // ── Print ─────────────────────────────────────────────────────
// // window.printInquiry = function(id) {
// //   const inq = [...allInquiries,...allArchived].find(i=>i.id===id);
// //   if (!inq) return;
// //   const w = window.open('','_blank','width=700,height=800');
// //   const rows = (inq.items||[]).map(i=>`<tr><td>${i.qty}×</td><td>${i.name}</td><td>₱${((i.price||0)*(i.qty||0)).toLocaleString()}</td></tr>`).join('');
// //   w.document.write(`<!DOCTYPE html><html><head><title>Inquiry ${inq.orderId||inq.id}</title>
// //   <style>body{font-family:Arial,sans-serif;padding:40px;color:#1a2b4c;}h1{font-size:22px;color:#ff4e00;margin-bottom:4px;}
// //   h2{font-size:13px;font-weight:700;border-bottom:2px solid #eee;padding-bottom:6px;margin:20px 0 10px;text-transform:uppercase;letter-spacing:.5px;color:#8d97ad;}
// //   table{width:100%;border-collapse:collapse;}td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee;font-size:13px;}
// //   .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#e3f2fd;color:#1565c0;}
// //   .total{font-size:16px;font-weight:800;color:#ff4e00;}footer{margin-top:40px;font-size:11px;color:#8d97ad;border-top:1px solid #eee;padding-top:12px;}</style>
// //   </head><body>
// //   <h1>${storeInfo.name}</h1>
// //   <p style="color:#8d97ad;font-size:12px;">${[storeInfo.address,storeInfo.phone,storeInfo.email].filter(Boolean).join(' · ')}</p>
// //   <h2>Order Info</h2>
// //   <table>
// //     <tr><td><strong>Order ID</strong></td><td>${inq.orderId||inq.id}</td></tr>
// //     <tr><td><strong>Status</strong></td><td><span class="badge">${inq.status||'pending'}</span></td></tr>
// //     <tr><td><strong>Order Date</strong></td><td>${inq.orderDate||'—'} ${inq.orderTime?'at '+formatTime(inq.orderTime):''}</td></tr>
// //     <tr><td><strong>Submitted</strong></td><td>${inq.date?new Date(inq.date).toLocaleString():'—'}</td></tr>
// //   </table>
// //   <h2>Customer</h2>
// //   <table>
// //     <tr><td><strong>Name</strong></td><td>${inq.customer||'—'}</td></tr>
// //     <tr><td><strong>Email</strong></td><td>${inq.email||'—'}</td></tr>
// //     <tr><td><strong>Phone</strong></td><td>${inq.phone||'—'}</td></tr>
// //   </table>
// //   <h2>Items</h2>
// //   <table><thead><tr><th>Qty</th><th>Item</th><th>Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
// //   <p class="total" style="margin-top:12px;text-align:right;">Total: ₱${(inq.total||0).toLocaleString()}</p>
// //   ${inq.notes?`<h2>Notes</h2><p style="font-size:13px;">${inq.notes}</p>`:''}
// //   <footer>Printed on ${new Date().toLocaleString()} · ${storeInfo.name}</footer>
// //   <script>window.print();<\/script></body></html>`);
// //   w.document.close();
// // };

// // // ── Export CSV ────────────────────────────────────────────────
// // window.exportCSV = function() {
// //   if (!filtered.length) { showToast('No data to export.', 'error'); return; }
// //   const rows = [['Order ID','Customer','Email','Phone','Inquiry Date','Order Date','Order Time','Items','Total','Status','Archived','Notes']];
// //   filtered.forEach(i => rows.push([
// //     i.orderId||i.id, i.customer||'', i.email||'', i.phone||'',
// //     i.date?new Date(i.date).toLocaleString():'', i.orderDate||'',
// //     i.orderTime?formatTime(i.orderTime):'',
// //     (i.items||[]).map(x=>`${x.qty}x ${x.name}`).join(' | '),
// //     i.total||0, i.status||'', i.archived?'Yes':'No', (i.notes||'').replace(/,/g,';')
// //   ]));
// //   const csv=rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
// //   const a=document.createElement('a');
// //   a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
// //   a.download=`inquiries-${new Date().toISOString().slice(0,10)}.csv`;
// //   a.click();
// //   showToast(`Exported ${filtered.length} rows.`, 'success');
// // };

// // // ── Select All / Sidebar / Modals ─────────────────────────────
// // window.toggleSelectAll = cb => document.querySelectorAll('.row-check').forEach(c => c.checked=cb.checked);
// // window.toggleSidebar   = ()  => document.getElementById('sidebar').classList.toggle('collapsed');

// // function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow='hidden'; }
// // window.closeModal = id  => { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; };
// // document.querySelectorAll('.modal-overlay').forEach(m =>
// //   m.addEventListener('click', e => { if (e.target===m) window.closeModal(m.id); })
// // );

// // // ── Toast ─────────────────────────────────────────────────────
// // window.showToast = function(msg, type='success') {
// //   const c = document.getElementById('toastContainer');
// //   const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
// //   const t = document.createElement('div');
// //   t.className = `toast ${type}`;
// //   t.innerHTML = `<i class="fas ${icons[type]||icons.success}"></i> ${msg}`;
// //   c.appendChild(t);
// //   setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); }, 3000);
// // };

// // // ── Utilities ─────────────────────────────────────────────────
// // function timeAgo(date) {
// //   if (!(date instanceof Date)||isNaN(date)) return '—';
// //   const m=Math.floor((Date.now()-date.getTime())/60000);
// //   if (m<1)  return 'Just now';
// //   if (m<60) return `${m}m ago`;
// //   const h=Math.floor(m/60);
// //   if (h<24) return `${h}h ago`;
// //   const d=Math.floor(h/24);
// //   if (d<7)  return `${d}d ago`;
// //   return date.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
// // }
// // function formatTime(t) {
// //   if (!t||typeof t!=='string') return '';
// //   const [h,m]=t.split(':'), hr=parseInt(h,10);
// //   return `${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;
// // }
// // function avatarColor(name) {
// //   const p=['#1a2b4c','#ff4e00','#1976d2','#2e7d32','#7b1fa2','#c62828','#f57f17','#0288d1'];
// //   let hash=0; for (const c of (name||'')) hash=(hash*31+c.charCodeAt(0))&0xffffffff;
// //   return p[Math.abs(hash)%p.length];
// // }






// // ============================================================
// //  GENE'S LECHON — inquiries.js
// //  Features: Archive/Restore, Date Reset, Live Notifications,
// //  Status Update, Reply (Email + SMS), Export CSV, Print
// // ============================================================

// import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import {
//   getFirestore,
//   collection, onSnapshot, query, orderBy,
//   doc, updateDoc, deleteDoc, getDoc, getDocs
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey:            "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
//   authDomain:        "pos-and-sales-monitoring.firebaseapp.com",
//   projectId:         "pos-and-sales-monitoring",
//   storageBucket:     "pos-and-sales-monitoring.firebasestorage.app",
//   messagingSenderId: "516453934117",
//   appId:             "1:516453934117:web:1783067b8aa6b37373cbcc",
//   measurementId:     "G-FT1G64DB9N"
// };

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const db  = getFirestore(app);

// // ── State ─────────────────────────────────────────────────────
// let allInquiries  = [];   // active (archived === false/undefined)
// let allArchived   = [];   // archived (archived === true)
// let filtered      = [];
// let currentView   = 'active';   // 'active' | 'archive'
// let activeFilter  = 'all';
// let activeSearch  = '';
// let sortField     = 'date';
// let sortAsc       = false;
// let dateFrom      = '';
// let dateTo        = '';
// let currentPage   = 1;
// const PER_PAGE    = 10;
// let archiveTarget = null;
// let restoreTarget = null;
// let deleteTarget  = null;

// // Notification state
// let notifications    = [];      // { id, orderId, customer, time, read }
// let seenInquiryIds   = new Set(); // IDs we've already seen (no notif on initial load)
// let initialLoadDone  = false;

// // Store info from Firestore users collection
// let storeInfo = { name: "Gene's Lechon", email: '', phone: '', address: '' };

// const QUICK_REPLIES = [
//   { label: "✅ Confirmed",       text: "Hi {customer}! Great news — your order ({orderId}) has been confirmed. We'll have it ready by {orderDate} at {orderTime}. Thank you for choosing {storeName}! 🐷" },
//   { label: "📦 Ready for Pickup", text: "Hi {customer}! Your order ({orderId}) is now ready. Please come by at your scheduled time. See you soon! — {storeName} 🐷" },
//   { label: "⏳ Need More Info",   text: "Hi {customer}! We received your inquiry ({orderId}). Could you provide more details so we can process it? — {storeName}" },
//   { label: "❌ Unavailable",      text: "Hi {customer}, we're sorry but we cannot fulfill order {orderId} on {orderDate}. Please contact us to reschedule. — {storeName}" },
//   { label: "🙏 Thank You",       text: "Hi {customer}! Thank you for your order ({orderId}). We appreciate your support! — {storeName} 🐷" }
// ];

// // ── Init ──────────────────────────────────────────────────────
// document.addEventListener('DOMContentLoaded', () => {
//   showDateNow();
//   loadStoreInfo();
//   listenToInquiries();
//   // Close notification panel when clicking outside
//   document.addEventListener('click', (e) => {
//     const wrap = document.getElementById('notifWrap');
//     if (wrap && !wrap.contains(e.target)) closeNotifPanel();
//   });
// });

// function showDateNow() {
//   const el = document.getElementById('currentDate');
//   if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
// }

// async function loadStoreInfo() {
//   try {
//     const snap = await getDocs(collection(db, "users"));
//     snap.forEach(d => {
//       const data = d.data();
//       if (data.role === 'admin') {
//         storeInfo.email   = data.email     || storeInfo.email;
//         storeInfo.phone   = data.phone     || storeInfo.phone;
//         storeInfo.address = data.address   || storeInfo.address;
//         storeInfo.name    = data.storeName || storeInfo.name;
//       }
//     });
//   } catch (e) { console.warn('Could not load store info:', e); }
// }

// // ── Firestore Real-time Listener ──────────────────────────────
// function listenToInquiries() {
//   const q = query(collection(db, "inquiries"), orderBy("date", "desc"));

//   onSnapshot(q, (snap) => {
//     const prevIds = new Set([...allInquiries, ...allArchived].map(i => i.id));

//     allInquiries = [];
//     allArchived  = [];

//     snap.forEach(d => {
//       const data = { id: d.id, ...d.data() };
//       if (data.archived) allArchived.push(data);
//       else               allInquiries.push(data);
//     });

//     // ── Detect NEW inquiries for notifications ─────────────
//     if (initialLoadDone) {
//       allInquiries.forEach(inq => {
//         if (!prevIds.has(inq.id) && !seenInquiryIds.has(inq.id)) {
//           addNotification(inq);
//         }
//       });
//     } else {
//       // First load — record all existing IDs, no notifications
//       allInquiries.forEach(i => seenInquiryIds.add(i.id));
//       allArchived.forEach(i  => seenInquiryIds.add(i.id));
//       initialLoadDone = true;
//     }

//     // Always mark seen
//     allInquiries.forEach(i => seenInquiryIds.add(i.id));
//     allArchived.forEach(i  => seenInquiryIds.add(i.id));

//     document.getElementById('loadingState').style.display = 'none';
//     updateStats();
//     applyAll();

//   }, (err) => {
//     console.error('Firestore error:', err);
//     document.getElementById('loadingState').style.display = 'none';
//     document.getElementById('emptyState').style.display   = 'block';
//     showToast('Could not connect to database.', 'error');
//   });
// }

// // ── Stats ─────────────────────────────────────────────────────
// function updateStats() {
//   const c = { total: allInquiries.length, pending:0, confirmed:0, ready:0, cancelled:0 };
//   allInquiries.forEach(i => { if (c[i.status] !== undefined) c[i.status]++; });

//   document.getElementById('statTotal').textContent     = c.total;
//   document.getElementById('statPending').textContent   = c.pending;
//   document.getElementById('statConfirmed').textContent = c.confirmed;
//   document.getElementById('statReady').textContent     = c.ready;
//   document.getElementById('statArchived').textContent  = allArchived.length;

//   const badge = document.getElementById('sidebarBadge');
//   if (badge) { badge.textContent = c.pending || ''; badge.style.display = c.pending ? '' : 'none'; }
//   const mobBadge = document.getElementById('mobBadge');
//   if (mobBadge) { mobBadge.textContent = c.pending || ''; mobBadge.style.display = c.pending ? 'flex' : 'none'; }

//   // Archive tab count
//   const archiveCount = document.getElementById('archiveTabCount');
//   if (archiveCount) {
//     archiveCount.textContent = allArchived.length;
//     archiveCount.style.display = allArchived.length > 0 ? 'inline-flex' : 'none';
//   }
// }

// // ══════════════════════════════════════════════════════════════
// //  NOTIFICATIONS
// // ══════════════════════════════════════════════════════════════

// function addNotification(inq) {
//   const notif = {
//     id:       inq.id,
//     orderId:  inq.orderId || inq.id,
//     customer: inq.customer || 'Unknown',
//     items:    (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', '),
//     total:    inq.total || 0,
//     time:     new Date(),
//     read:     false
//   };
//   notifications.unshift(notif);
//   // Keep max 20 notifications
//   if (notifications.length > 20) notifications.pop();
//   renderNotifPanel();
//   // Play bell animation
//   animateNotifBtn();
//   showToast(`New inquiry from ${notif.customer}!`, 'info');
// }

// function animateNotifBtn() {
//   const btn = document.getElementById('notifBtn');
//   if (!btn) return;
//   btn.classList.add('ring');
//   setTimeout(() => btn.classList.remove('ring'), 1000);
// }

// function renderNotifPanel() {
//   const list    = document.getElementById('notifList');
//   const badge   = document.getElementById('notifBadge');
//   const unread  = notifications.filter(n => !n.read).length;

//   badge.textContent    = unread;
//   badge.style.display  = unread > 0 ? 'flex' : 'none';

//   if (notifications.length === 0) {
//     list.innerHTML = `<div class="notif-empty"><i class="fas fa-check-circle"></i><p>All caught up!</p></div>`;
//     return;
//   }

//   list.innerHTML = notifications.map(n => `
//     <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="notifClick('${n.id}')">
//       <div class="notif-dot-ind ${n.read ? '' : 'active'}"></div>
//       <div class="notif-content">
//         <div class="notif-title">
//           <span class="notif-name">${n.customer}</span>
//           <span class="notif-order">${n.orderId}</span>
//         </div>
//         <div class="notif-items">${n.items || '—'}</div>
//         <div class="notif-meta">
//           <span class="notif-total">₱${n.total.toLocaleString()}</span>
//           <span class="notif-time">${timeAgo(n.time)}</span>
//         </div>
//       </div>
//     </div>`).join('');
// }

// window.notifClick = function(id) {
//   // Mark as read
//   const n = notifications.find(x => x.id === id);
//   if (n) n.read = true;
//   renderNotifPanel();
//   closeNotifPanel();
//   // Switch to active view and open detail
//   if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
//   openDetail(id);
// };

// window.toggleNotifPanel = function() {
//   const panel = document.getElementById('notifPanel');
//   const isOpen = panel.classList.contains('open');
//   if (isOpen) {
//     closeNotifPanel();
//   } else {
//     panel.classList.add('open');
//     // Mark all as read when opened
//     setTimeout(() => {
//       notifications.forEach(n => n.read = true);
//       renderNotifPanel();
//     }, 1500);
//   }
// };

// function closeNotifPanel() {
//   document.getElementById('notifPanel')?.classList.remove('open');
// }

// window.clearAllNotifs = function() {
//   notifications = [];
//   renderNotifPanel();
// };

// // ══════════════════════════════════════════════════════════════
// //  VIEW SWITCHING (active ↔ archive)
// // ══════════════════════════════════════════════════════════════

// window.switchView = function(view, btn) {
//   currentView  = view;
//   activeFilter = 'all';
//   activeSearch = '';
//   document.getElementById('globalSearch').value = '';
//   resetDateFilter(true); // silent reset

//   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');

//   const pageTitle  = document.getElementById('pageTitle');
//   const emptyTitle = document.getElementById('emptyTitle');
//   const emptyMsg   = document.getElementById('emptyMsg');
//   const statusHeader = document.getElementById('statusHeader');

//   if (view === 'archive') {
//     pageTitle.textContent  = 'Archive';
//     emptyTitle.textContent = 'No archived inquiries';
//     emptyMsg.textContent   = 'Inquiries you archive will appear here.';
//     if (statusHeader) statusHeader.textContent = 'Status';
//   } else {
//     pageTitle.textContent  = 'Inquiries';
//     emptyTitle.textContent = 'No inquiries found';
//     emptyMsg.textContent   = 'Inquiries submitted from the landing page will appear here in real-time.';
//   }

//   applyAll();
// };

// // ── Filter / Sort / Search ────────────────────────────────────
// function applyAll() {
//   const source = currentView === 'archive' ? allArchived : allInquiries;

//   filtered = source.filter(i => {
//     const matchFilter = currentView === 'archive' || activeFilter === 'all' || i.status === activeFilter;
//     const sl = activeSearch.toLowerCase();
//     const matchSearch = !activeSearch ||
//       (i.customer || '').toLowerCase().includes(sl) ||
//       (i.orderId  || '').toLowerCase().includes(sl) ||
//       (i.email    || '').toLowerCase().includes(sl) ||
//       (i.phone    || '').toLowerCase().includes(sl);
//     const matchDate = (() => {
//       if (!dateFrom && !dateTo) return true;
//       const d = new Date(i.date || i.createdAt);
//       if (isNaN(d)) return true;
//       if (dateFrom && d < new Date(dateFrom))             return false;
//       if (dateTo   && d > new Date(dateTo + 'T23:59:59')) return false;
//       return true;
//     })();
//     return matchFilter && matchSearch && matchDate;
//   });

//   filtered.sort((a, b) => {
//     let va, vb;
//     switch (sortField) {
//       case 'total':     va = a.total||0;           vb = b.total||0;           break;
//       case 'date':      va = new Date(a.date||0);  vb = new Date(b.date||0);  break;
//       case 'orderDate': va = new Date(a.orderDate||0); vb = new Date(b.orderDate||0); break;
//       case 'customer':  va = (a.customer||'').toLowerCase(); vb = (b.customer||'').toLowerCase(); break;
//       default:          va = (a[sortField]||'').toString().toLowerCase(); vb = (b[sortField]||'').toString().toLowerCase();
//     }
//     return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
//   });

//   currentPage = 1;
//   renderTable();
//   renderPagination();
// }

// window.setFilter = function(f, btn) {
//   if (currentView === 'archive') switchView('active', btn);
//   activeFilter = f;
//   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');
//   applyAll();
// };

// window.handleSearch = function(val) { activeSearch = val; applyAll(); };

// window.applyDateFilter = function() {
//   dateFrom = document.getElementById('dateFrom').value;
//   dateTo   = document.getElementById('dateTo').value;
//   // Show/hide reset button
//   const resetBtn = document.getElementById('dateResetBtn');
//   if (resetBtn) resetBtn.style.display = (dateFrom || dateTo) ? 'inline-flex' : 'none';
//   applyAll();
// };

// window.resetDateFilter = function(silent = false) {
//   dateFrom = ''; dateTo = '';
//   const f = document.getElementById('dateFrom');
//   const t = document.getElementById('dateTo');
//   const r = document.getElementById('dateResetBtn');
//   if (f) f.value = '';
//   if (t) t.value = '';
//   if (r) r.style.display = 'none';
//   if (!silent) applyAll();
// };

// window.sortBy = function(field) {
//   sortAsc   = sortField === field ? !sortAsc : false;
//   sortField = field;
//   applyAll();
// };

// // ── Render Table ──────────────────────────────────────────────
// function renderTable() {
//   const tbody = document.getElementById('inquiryBody');
//   const empty = document.getElementById('emptyState');
//   tbody.innerHTML = '';

//   if (filtered.length === 0) { empty.style.display = 'block'; return; }
//   empty.style.display = 'none';

//   const start = (currentPage - 1) * PER_PAGE;
//   filtered.slice(start, start + PER_PAGE).forEach((inq, idx) => {
//     const tr        = document.createElement('tr');
//     tr.style.animationDelay = `${idx * 0.04}s`;
//     if (currentView === 'archive') tr.classList.add('archived-row');

//     const initials  = (inq.customer || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
//     const itemsStr  = (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', ') || '—';
//     const orderDate = inq.orderDate
//       ? new Date(inq.orderDate + 'T00:00:00').toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
//       : '—';
//     const inqDate   = inq.date ? timeAgo(new Date(inq.date)) : '—';
//     const status    = inq.status || 'pending';

//     // Different action buttons for active vs archive view
//     const actionBtns = currentView === 'archive'
//       ? `<button class="action-btn restore" title="Restore" onclick="openRestore('${inq.id}')"><i class="fas fa-undo"></i></button>
//          <button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
//          <button class="action-btn delete"  title="Delete Forever" onclick="openDelete('${inq.id}')"><i class="fas fa-trash"></i></button>`
//       : `<button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
//          <button class="action-btn reply"   title="Reply"   onclick="openReply('${inq.id}')"><i class="fas fa-reply"></i></button>
//          <button class="action-btn archive" title="Archive" onclick="openArchive('${inq.id}')"><i class="fas fa-archive"></i></button>`;

//     tr.innerHTML = `
//       <td><input type="checkbox" class="row-check" data-id="${inq.id}"/></td>
//       <td><span class="order-id">${inq.orderId || inq.id}</span></td>
//       <td>
//         <div class="customer-cell">
//           <div class="cust-avatar" style="background:${avatarColor(inq.customer||'')}">${initials}</div>
//           <div>
//             <div class="cust-name">${inq.customer || '—'}</div>
//             <div class="cust-email">${inq.email || '—'}</div>
//           </div>
//         </div>
//       </td>
//       <td>${inqDate}</td>
//       <td>${orderDate}${inq.orderTime ? `<span style="color:var(--text-grey);font-size:11px;"> @ ${formatTime(inq.orderTime)}</span>` : ''}</td>
//       <td><div class="items-preview" title="${itemsStr}">${itemsStr}</div></td>
//       <td><span class="total-cell">₱${(inq.total||0).toLocaleString()}</span></td>
//       <td>
//         ${currentView === 'archive'
//           ? `<span class="status-badge ${status}">${status}</span>`
//           : `<select class="status-select" onchange="quickStatusUpdate('${inq.id}', this.value)">
//                <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
//                <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
//                <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready</option>
//                <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
//              </select>`}
//       </td>
//       <td><div class="row-actions">${actionBtns}</div></td>`;
//     tbody.appendChild(tr);
//   });
// }

// // ── Pagination ────────────────────────────────────────────────
// function renderPagination() {
//   const total = Math.ceil(filtered.length / PER_PAGE);
//   const el    = document.getElementById('pagination');
//   el.innerHTML = '';
//   if (total <= 1) return;

//   const info = document.createElement('span');
//   info.className   = 'page-info';
//   const s = (currentPage-1)*PER_PAGE+1, e = Math.min(currentPage*PER_PAGE, filtered.length);
//   info.textContent = `${s}–${e} of ${filtered.length}`;
//   el.appendChild(info);

//   el.appendChild(mkPageBtn('<i class="fas fa-chevron-left"></i>',  currentPage===1,     () => goPage(currentPage-1)));
//   for (let p=1; p<=total; p++) {
//     if (total>7 && p>2 && p<total-1 && Math.abs(p-currentPage)>1) {
//       if (p===3||p===total-2) { const d=document.createElement('span'); d.textContent='…'; d.style.cssText='padding:0 4px;color:var(--text-grey);font-size:13px;'; el.appendChild(d); }
//       continue;
//     }
//     const btn = mkPageBtn(p, false, () => goPage(p));
//     if (p===currentPage) btn.classList.add('active');
//     el.appendChild(btn);
//   }
//   el.appendChild(mkPageBtn('<i class="fas fa-chevron-right"></i>', currentPage===total, () => goPage(currentPage+1)));
// }
// function mkPageBtn(label, disabled, onClick) {
//   const b = document.createElement('button');
//   b.className='page-btn'; b.innerHTML=label; b.disabled=disabled; b.onclick=onClick; return b;
// }
// function goPage(p) { currentPage=p; renderTable(); renderPagination(); }

// // ── Status Update ─────────────────────────────────────────────
// window.quickStatusUpdate = async function(id, status) {
//   try {
//     await updateDoc(doc(db, "inquiries", id), { status });
//     showToast(`Status set to "${status}"`, 'success');
//   } catch (err) { showToast('Failed to update status.', 'error'); }
// };

// // ══════════════════════════════════════════════════════════════
// //  ARCHIVE / RESTORE / DELETE
// // ══════════════════════════════════════════════════════════════

// window.openArchive = function(id) { archiveTarget = id; openModal('archiveModal'); };

// window.confirmArchive = async function() {
//   if (!archiveTarget) return;
//   const btn = document.getElementById('confirmArchiveBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Archiving...';
//   btn.disabled  = true;
//   try {
//     await updateDoc(doc(db, "inquiries", archiveTarget), { archived: true });
//     showToast('Inquiry archived.', 'success');
//   } catch (err) { showToast('Failed to archive.', 'error'); }
//   closeModal('archiveModal');
//   btn.innerHTML = '<i class="fas fa-archive"></i> Archive';
//   btn.disabled  = false;
//   archiveTarget = null;
// };

// window.openRestore = function(id) { restoreTarget = id; openModal('restoreModal'); };

// window.confirmRestore = async function() {
//   if (!restoreTarget) return;
//   const btn = document.getElementById('confirmRestoreBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restoring...';
//   btn.disabled  = true;
//   try {
//     await updateDoc(doc(db, "inquiries", restoreTarget), { archived: false });
//     showToast('Inquiry restored!', 'success');
//     // Switch back to active view
//     switchView('active', document.querySelector('.ftab'));
//   } catch (err) { showToast('Failed to restore.', 'error'); }
//   closeModal('restoreModal');
//   btn.innerHTML = '<i class="fas fa-undo"></i> Restore';
//   btn.disabled  = false;
//   restoreTarget = null;
// };

// window.openDelete = function(id) { deleteTarget = id; openModal('deleteModal'); };

// window.confirmDelete = async function() {
//   if (!deleteTarget) return;
//   const btn = document.getElementById('confirmDeleteBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
//   btn.disabled  = true;
//   try {
//     await deleteDoc(doc(db, "inquiries", deleteTarget));
//     showToast('Inquiry permanently deleted.', 'success');
//   } catch (err) { showToast('Failed to delete.', 'error'); }
//   closeModal('deleteModal');
//   btn.innerHTML = '<i class="fas fa-trash"></i> Delete Forever';
//   btn.disabled  = false;
//   deleteTarget  = null;
// };

// // ══════════════════════════════════════════════════════════════
// //  DETAIL MODAL
// // ══════════════════════════════════════════════════════════════

// window.openDetail = async function(id) {
//   const source = [...allInquiries, ...allArchived];
//   let inq;
//   try {
//     const snap = await getDoc(doc(db, "inquiries", id));
//     if (!snap.exists()) { showToast('Inquiry not found.', 'error'); return; }
//     inq = { id: snap.id, ...snap.data() };
//   } catch { inq = source.find(i => i.id === id); if (!inq) return; }

//   const status     = inq.status || 'pending';
//   const isArchived = !!inq.archived;

//   document.getElementById('modalOrderId').textContent = inq.orderId || inq.id;
//   const badge = document.getElementById('modalStatusBadge');
//   badge.textContent = status; badge.className = `status-badge ${status}`;

//   const itemsHtml = (inq.items||[]).map(item =>
//     `<tr><td>${item.qty}×</td><td>${item.name}</td><td style="text-align:right;font-weight:700;">₱${((item.price||0)*(item.qty||0)).toLocaleString()}</td></tr>`
//   ).join('') || '<tr><td colspan="3" style="color:var(--text-grey);">No items recorded</td></tr>';

//   const orderDate   = inq.orderDate ? new Date(inq.orderDate+'T00:00:00').toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '—';
//   const submittedAt = inq.date ? new Date(inq.date).toLocaleString('en-PH') : '—';

//   document.getElementById('detailModalBody').innerHTML = `
//     ${isArchived ? `<div class="archive-banner"><i class="fas fa-archive"></i> This inquiry is archived. <button class="inline-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')">Restore it</button></div>` : ''}

//     <div class="detail-status-bar">
//       <label><i class="fas fa-tag" style="color:var(--primary);margin-right:5px;"></i> Update Status</label>
//       <select class="status-select-lg" onchange="quickStatusUpdate('${inq.id}', this.value)" ${isArchived?'disabled':''}>
//         <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
//         <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
//         <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready / Fulfilled</option>
//         <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
//       </select>
//     </div>

//     <div class="detail-grid">
//       <div class="detail-block">
//         <h4><i class="fas fa-user"></i> Customer Info</h4>
//         <div class="detail-row"><span class="dl">Name</span>   <span class="dv">${inq.customer||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Email</span>  <span class="dv">${inq.email||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Phone</span>  <span class="dv">${inq.phone||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Source</span> <span class="dv">${inq.source==='landing_page'?'🌐 Website':(inq.source||'—')}</span></div>
//       </div>
//       <div class="detail-block">
//         <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
//         <div class="detail-row"><span class="dl">Order Date</span><span class="dv">${orderDate}</span></div>
//         <div class="detail-row"><span class="dl">Time</span>      <span class="dv">${inq.orderTime?formatTime(inq.orderTime):'—'}</span></div>
//         <div class="detail-row"><span class="dl">Submitted</span> <span class="dv">${submittedAt}</span></div>
//       </div>
//     </div>

//     ${inq.notes ? `<div class="notes-section"><h4><i class="fas fa-sticky-note"></i> Special Instructions</h4><p>${inq.notes}</p></div>` : ''}

//     <div class="detail-block" style="margin-bottom:0;">
//       <h4><i class="fas fa-shopping-basket"></i> Order Items</h4>
//       <table class="items-table">
//         <thead><tr><th>Qty</th><th>Item</th><th style="text-align:right;">Subtotal</th></tr></thead>
//         <tbody>${itemsHtml}</tbody>
//       </table>
//       <div class="items-total"><span>Total Amount</span><span>₱${(inq.total||0).toLocaleString()}</span></div>
//     </div>

//     <div class="detail-actions">
//       <button class="btn-secondary" onclick="closeModal('detailModal')"><i class="fas fa-times"></i> Close</button>
//       ${isArchived
//         ? `<button class="btn-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')"><i class="fas fa-undo"></i> Restore</button>
//            <button class="btn-danger"  onclick="closeModal('detailModal'); openDelete('${inq.id}')"><i class="fas fa-trash"></i> Delete</button>`
//         : `<button class="btn-outline-primary" onclick="closeModal('detailModal'); openReply('${inq.id}')"><i class="fas fa-reply"></i> Reply</button>
//            <button class="btn-archive-confirm" onclick="closeModal('detailModal'); openArchive('${inq.id}')"><i class="fas fa-archive"></i> Archive</button>
//            <button class="btn-primary" onclick="printInquiry('${inq.id}')"><i class="fas fa-print"></i> Print</button>`}
//     </div>`;

//   openModal('detailModal');
// };

// // ══════════════════════════════════════════════════════════════
// //  REPLY MODAL
// // ══════════════════════════════════════════════════════════════

// window.openReply = function(id) {
//   const inq = allInquiries.find(i => i.id === id);
//   if (!inq) return;
//   document.getElementById('replyRecipient').textContent = `To: ${inq.customer} (${inq.email||inq.phone||'—'})`;
//   document.getElementById('replyTo').value      = inq.email || '';
//   document.getElementById('replySubject').value = `Re: Your Order Inquiry ${inq.orderId||inq.id} — ${storeInfo.name}`;
//   document.getElementById('replyMessage').value = '';
//   document.getElementById('smsPhone').textContent = inq.phone || '—';
//   document.getElementById('smsMessage').value     = fillTemplate(QUICK_REPLIES[0].text, inq);
//   const chips = document.getElementById('qrChips');
//   chips.innerHTML = '';
//   QUICK_REPLIES.forEach(qr => {
//     const chip = document.createElement('button');
//     chip.className = 'qr-chip'; chip.textContent = qr.label;
//     chip.onclick = () => {
//       const f = fillTemplate(qr.text, inq);
//       document.getElementById('replyMessage').value = f;
//       document.getElementById('smsMessage').value   = f;
//     };
//     chips.appendChild(chip);
//   });
//   switchReplyTab('email', document.querySelector('.rtab'));
//   openModal('replyModal');
// };

// window.switchReplyTab = function(tab, btn) {
//   document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');
//   document.getElementById('replyEmailSection').style.display = tab==='email'?'block':'none';
//   document.getElementById('replySmsSection').style.display   = tab==='sms'  ?'block':'none';
// };

// window.sendEmailReply = function() {
//   const to=document.getElementById('replyTo').value.trim();
//   const subject=encodeURIComponent(document.getElementById('replySubject').value);
//   const body=encodeURIComponent(document.getElementById('replyMessage').value);
//   if (!to)   { showToast('No email address!', 'error'); return; }
//   if (!body) { showToast('Write a message first!', 'error'); return; }
//   window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;
//   showToast('Opening email client...', 'info');
//   closeModal('replyModal');
// };

// window.copySmsMessage = function() {
//   const msg=document.getElementById('smsMessage').value;
//   if (!msg) { showToast('Nothing to copy.', 'error'); return; }
//   navigator.clipboard.writeText(msg)
//     .then(()=>{ showToast('Copied!', 'success'); closeModal('replyModal'); })
//     .catch(()=> showToast('Could not copy — copy manually.', 'error'));
// };

// function fillTemplate(t, inq) {
//   return t
//     .replace(/{customer}/g,  inq.customer||'')
//     .replace(/{orderId}/g,   inq.orderId||inq.id||'')
//     .replace(/{orderDate}/g, inq.orderDate||'')
//     .replace(/{orderTime}/g, inq.orderTime?formatTime(inq.orderTime):'')
//     .replace(/{total}/g,     `₱${(inq.total||0).toLocaleString()}`)
//     .replace(/{storeName}/g, storeInfo.name)
//     .replace(/{storePhone}/g,storeInfo.phone||'')
//     .replace(/{storeEmail}/g,storeInfo.email||'');
// }

// // ── Print ─────────────────────────────────────────────────────
// window.printInquiry = function(id) {
//   const inq = [...allInquiries,...allArchived].find(i=>i.id===id);
//   if (!inq) return;
//   const w = window.open('','_blank','width=700,height=800');
//   const rows = (inq.items||[]).map(i=>`<tr><td>${i.qty}×</td><td>${i.name}</td><td>₱${((i.price||0)*(i.qty||0)).toLocaleString()}</td></tr>`).join('');
//   w.document.write(`<!DOCTYPE html><html><head><title>Inquiry ${inq.orderId||inq.id}</title>
//   <style>body{font-family:Arial,sans-serif;padding:40px;color:#1a2b4c;}h1{font-size:22px;color:#ff4e00;margin-bottom:4px;}
//   h2{font-size:13px;font-weight:700;border-bottom:2px solid #eee;padding-bottom:6px;margin:20px 0 10px;text-transform:uppercase;letter-spacing:.5px;color:#8d97ad;}
//   table{width:100%;border-collapse:collapse;}td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee;font-size:13px;}
//   .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#e3f2fd;color:#1565c0;}
//   .total{font-size:16px;font-weight:800;color:#ff4e00;}footer{margin-top:40px;font-size:11px;color:#8d97ad;border-top:1px solid #eee;padding-top:12px;}</style>
//   </head><body>
//   <h1>${storeInfo.name}</h1>
//   <p style="color:#8d97ad;font-size:12px;">${[storeInfo.address,storeInfo.phone,storeInfo.email].filter(Boolean).join(' · ')}</p>
//   <h2>Order Info</h2>
//   <table>
//     <tr><td><strong>Order ID</strong></td><td>${inq.orderId||inq.id}</td></tr>
//     <tr><td><strong>Status</strong></td><td><span class="badge">${inq.status||'pending'}</span></td></tr>
//     <tr><td><strong>Order Date</strong></td><td>${inq.orderDate||'—'} ${inq.orderTime?'at '+formatTime(inq.orderTime):''}</td></tr>
//     <tr><td><strong>Submitted</strong></td><td>${inq.date?new Date(inq.date).toLocaleString():'—'}</td></tr>
//   </table>
//   <h2>Customer</h2>
//   <table>
//     <tr><td><strong>Name</strong></td><td>${inq.customer||'—'}</td></tr>
//     <tr><td><strong>Email</strong></td><td>${inq.email||'—'}</td></tr>
//     <tr><td><strong>Phone</strong></td><td>${inq.phone||'—'}</td></tr>
//   </table>
//   <h2>Items</h2>
//   <table><thead><tr><th>Qty</th><th>Item</th><th>Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
//   <p class="total" style="margin-top:12px;text-align:right;">Total: ₱${(inq.total||0).toLocaleString()}</p>
//   ${inq.notes?`<h2>Notes</h2><p style="font-size:13px;">${inq.notes}</p>`:''}
//   <footer>Printed on ${new Date().toLocaleString()} · ${storeInfo.name}</footer>
//   <script>window.print();<\/script></body></html>`);
//   w.document.close();
// };

// // ── Export CSV ────────────────────────────────────────────────
// window.exportCSV = function() {
//   if (!filtered.length) { showToast('No data to export.', 'error'); return; }
//   const rows = [['Order ID','Customer','Email','Phone','Inquiry Date','Order Date','Order Time','Items','Total','Status','Archived','Notes']];
//   filtered.forEach(i => rows.push([
//     i.orderId||i.id, i.customer||'', i.email||'', i.phone||'',
//     i.date?new Date(i.date).toLocaleString():'', i.orderDate||'',
//     i.orderTime?formatTime(i.orderTime):'',
//     (i.items||[]).map(x=>`${x.qty}x ${x.name}`).join(' | '),
//     i.total||0, i.status||'', i.archived?'Yes':'No', (i.notes||'').replace(/,/g,';')
//   ]));
//   const csv=rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
//   const a=document.createElement('a');
//   a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
//   a.download=`inquiries-${new Date().toISOString().slice(0,10)}.csv`;
//   a.click();
//   showToast(`Exported ${filtered.length} rows.`, 'success');
// };

// // ── Select All / Sidebar / Modals ─────────────────────────────
// window.toggleSelectAll = cb => document.querySelectorAll('.row-check').forEach(c => c.checked=cb.checked);
// window.toggleSidebar = function() {
//   // Works with both: inquiries.html own sidebar (id=sidebar) OR sidebar.js injected (.sidebar class)
//   const sidebar  = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay  = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   const isMobile = window.innerWidth <= 900;
//   if (isMobile) {
//     const isOpen = sidebar?.classList.contains('mobile-open') || sidebar?.classList.contains('active');
//     sidebar?.classList.toggle('mobile-open', !isOpen);
//     sidebar?.classList.toggle('active', !isOpen);
//     overlay?.classList.toggle('show', !isOpen);
//     overlay?.classList.toggle('active', !isOpen);
//     document.body.style.overflow = isOpen ? '' : 'hidden';
//   } else {
//     sidebar?.classList.toggle('collapsed');
//   }
// };

// window.openMobileSidebar = function() {
//   const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   sidebar?.classList.add('mobile-open');
//   sidebar?.classList.add('active');
//   overlay?.classList.add('show');
//   overlay?.classList.add('active');
//   document.body.style.overflow = 'hidden';
// };

// window.closeSidebarMobile = function() {
//   const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   sidebar?.classList.remove('mobile-open');
//   sidebar?.classList.remove('active');
//   overlay?.classList.remove('show');
//   overlay?.classList.remove('active');
//   document.body.style.overflow = '';
// };

// function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow='hidden'; }
// window.closeModal = id  => { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; };
// document.querySelectorAll('.modal-overlay').forEach(m =>
//   m.addEventListener('click', e => { if (e.target===m) window.closeModal(m.id); })
// );

// // ── Toast ─────────────────────────────────────────────────────
// window.showToast = function(msg, type='success') {
//   const c = document.getElementById('toastContainer');
//   const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
//   const t = document.createElement('div');
//   t.className = `toast ${type}`;
//   t.innerHTML = `<i class="fas ${icons[type]||icons.success}"></i> ${msg}`;
//   c.appendChild(t);
//   setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); }, 3000);
// };

// // ── Utilities ─────────────────────────────────────────────────
// function timeAgo(date) {
//   if (!(date instanceof Date)||isNaN(date)) return '—';
//   const m=Math.floor((Date.now()-date.getTime())/60000);
//   if (m<1)  return 'Just now';
//   if (m<60) return `${m}m ago`;
//   const h=Math.floor(m/60);
//   if (h<24) return `${h}h ago`;
//   const d=Math.floor(h/24);
//   if (d<7)  return `${d}d ago`;
//   return date.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
// }
// function formatTime(t) {
//   if (!t||typeof t!=='string') return '';
//   const [h,m]=t.split(':'), hr=parseInt(h,10);
//   return `${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;
// }
// function avatarColor(name) {
//   const p=['#1a2b4c','#ff4e00','#1976d2','#2e7d32','#7b1fa2','#c62828','#f57f17','#0288d1'];
//   let hash=0; for (const c of (name||'')) hash=(hash*31+c.charCodeAt(0))&0xffffffff;
//   return p[Math.abs(hash)%p.length];
// }

// // ── Stat card click handlers (filter by status) ──────────────
// document.addEventListener('DOMContentLoaded', () => {
//   // Wire stat cards to filter the table
//   const statMap = [
//     { id: 'statTotal',     filter: 'all'       },
//     { id: 'statPending',   filter: 'pending'   },
//     { id: 'statConfirmed', filter: 'confirmed' },
//     { id: 'statReady',     filter: 'ready'     },
//     { id: 'statArchived',  filter: 'archive'   },
//   ];
//   statMap.forEach(({ id, filter }) => {
//     const el = document.getElementById(id)?.closest('.stat-card');
//     if (!el) return;
//     el.style.cursor = 'pointer';
//     el.addEventListener('click', () => {
//       if (filter === 'archive') {
//         const archiveBtn = document.querySelector('.ftab-archive');
//         switchView('archive', archiveBtn);
//       } else {
//         if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
//         const btn = [...document.querySelectorAll('.ftab')].find(b =>
//           b.getAttribute('onclick')?.includes(`'${filter}'`) || (filter === 'all' && b.textContent.trim() === 'All')
//         );
//         setFilter(filter, btn);
//       }
//     });
//   });
// });















// // ============================================================
// //  GENE'S LECHON — Inquiries.js  ✅ WORKING VERSION
// //  Only change from original: switchView pageTitle null crash
// //  fixed with optional chaining + fallback selector
// // ============================================================

// import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import {
//   getFirestore,
//   collection, onSnapshot, query, orderBy,
//   doc, updateDoc, deleteDoc, getDoc, getDocs
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey:            "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
//   authDomain:        "pos-and-sales-monitoring.firebaseapp.com",
//   projectId:         "pos-and-sales-monitoring",
//   storageBucket:     "pos-and-sales-monitoring.firebasestorage.app",
//   messagingSenderId: "516453934117",
//   appId:             "1:516453934117:web:1783067b8aa6b37373cbcc",
//   measurementId:     "G-FT1G64DB9N"
// };

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const db  = getFirestore(app);

// // ── State ─────────────────────────────────────────────────────
// let allInquiries  = [];
// let allArchived   = [];
// let filtered      = [];
// let currentView   = 'active';
// let activeFilter  = 'all';
// let activeSearch  = '';
// let sortField     = 'date';
// let sortAsc       = false;
// let dateFrom      = '';
// let dateTo        = '';
// let currentPage   = 1;
// const PER_PAGE    = 10;
// let archiveTarget = null;
// let restoreTarget = null;
// let deleteTarget  = null;

// let notifications   = [];
// let seenInquiryIds  = new Set();
// let initialLoadDone = false;

// let storeInfo = { name: "Gene's Lechon", email: '', phone: '', address: '' };

// const QUICK_REPLIES = [
//   { label: "✅ Confirmed",        text: "Hi {customer}! Great news — your order ({orderId}) has been confirmed. We'll have it ready by {orderDate} at {orderTime}. Thank you for choosing {storeName}! 🐷" },
//   { label: "📦 Ready for Pickup", text: "Hi {customer}! Your order ({orderId}) is now ready. Please come by at your scheduled time. See you soon! — {storeName} 🐷" },
//   { label: "⏳ Need More Info",   text: "Hi {customer}! We received your inquiry ({orderId}). Could you provide more details so we can process it? — {storeName}" },
//   { label: "❌ Unavailable",      text: "Hi {customer}, we're sorry but we cannot fulfill order {orderId} on {orderDate}. Please contact us to reschedule. — {storeName}" },
//   { label: "🙏 Thank You",        text: "Hi {customer}! Thank you for your order ({orderId}). We appreciate your support! — {storeName} 🐷" }
// ];

// // ── Init ──────────────────────────────────────────────────────
// document.addEventListener('DOMContentLoaded', () => {
//   showDateNow();
//   loadStoreInfo();
//   listenToInquiries();
//   document.addEventListener('click', (e) => {
//     const wrap = document.getElementById('notifWrap');
//     if (wrap && !wrap.contains(e.target)) closeNotifPanel();
//   });
// });

// function showDateNow() {
//   const el = document.getElementById('currentDate');
//   if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
// }

// async function loadStoreInfo() {
//   try {
//     const snap = await getDocs(collection(db, "users"));
//     snap.forEach(d => {
//       const data = d.data();
//       if (data.role === 'admin') {
//         storeInfo.email   = data.email     || storeInfo.email;
//         storeInfo.phone   = data.phone     || storeInfo.phone;
//         storeInfo.address = data.address   || storeInfo.address;
//         storeInfo.name    = data.storeName || storeInfo.name;
//       }
//     });
//   } catch (e) { console.warn('Could not load store info:', e); }
// }

// // ── Firestore Real-time Listener ──────────────────────────────
// function listenToInquiries() {
//   const q = query(collection(db, "inquiries"), orderBy("date", "desc"));

//   onSnapshot(q, (snap) => {
//     const prevIds = new Set([...allInquiries, ...allArchived].map(i => i.id));

//     allInquiries = [];
//     allArchived  = [];

//     snap.forEach(d => {
//       const data = { id: d.id, ...d.data() };
//       if (data.archived) allArchived.push(data);
//       else               allInquiries.push(data);
//     });

//     if (initialLoadDone) {
//       allInquiries.forEach(inq => {
//         if (!prevIds.has(inq.id) && !seenInquiryIds.has(inq.id)) addNotification(inq);
//       });
//     } else {
//       allInquiries.forEach(i => seenInquiryIds.add(i.id));
//       allArchived.forEach(i  => seenInquiryIds.add(i.id));
//       initialLoadDone = true;
//     }

//     allInquiries.forEach(i => seenInquiryIds.add(i.id));
//     allArchived.forEach(i  => seenInquiryIds.add(i.id));

//     document.getElementById('loadingState').style.display = 'none';
//     updateStats();
//     applyAll();

//   }, (err) => {
//     console.error('Firestore error:', err);
//     document.getElementById('loadingState').style.display = 'none';
//     document.getElementById('emptyState').style.display   = 'block';
//     showToast('Could not connect to database.', 'error');
//   });
// }

// // ── Stats ─────────────────────────────────────────────────────
// function updateStats() {
//   const c = { total: allInquiries.length, pending:0, confirmed:0, ready:0, cancelled:0 };
//   allInquiries.forEach(i => { if (c[i.status] !== undefined) c[i.status]++; });

//   document.getElementById('statTotal').textContent     = c.total;
//   document.getElementById('statPending').textContent   = c.pending;
//   document.getElementById('statConfirmed').textContent = c.confirmed;
//   document.getElementById('statReady').textContent     = c.ready;
//   document.getElementById('statArchived').textContent  = allArchived.length;

//   const badge = document.getElementById('sidebarBadge');
//   if (badge) { badge.textContent = c.pending || ''; badge.style.display = c.pending ? '' : 'none'; }
//   const mobBadge = document.getElementById('mobBadge');
//   if (mobBadge) { mobBadge.textContent = c.pending || ''; mobBadge.style.display = c.pending ? 'flex' : 'none'; }

//   const archiveCount = document.getElementById('archiveTabCount');
//   if (archiveCount) {
//     archiveCount.textContent = allArchived.length;
//     archiveCount.style.display = allArchived.length > 0 ? 'inline-flex' : 'none';
//   }
// }

// // ══════════════════════════════════════════════════════════════
// //  NOTIFICATIONS
// // ══════════════════════════════════════════════════════════════
// function addNotification(inq) {
//   const notif = {
//     id:       inq.id,
//     orderId:  inq.orderId || inq.id,
//     customer: inq.customer || 'Unknown',
//     items:    (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', '),
//     total:    inq.total || 0,
//     time:     new Date(),
//     read:     false
//   };
//   notifications.unshift(notif);
//   if (notifications.length > 20) notifications.pop();
//   renderNotifPanel();
//   animateNotifBtn();
//   showToast(`New inquiry from ${notif.customer}!`, 'info');
// }

// function animateNotifBtn() {
//   const btn = document.getElementById('notifBtn');
//   if (!btn) return;
//   btn.classList.add('ring');
//   setTimeout(() => btn.classList.remove('ring'), 1000);
// }

// function renderNotifPanel() {
//   const list   = document.getElementById('notifList');
//   const badge  = document.getElementById('notifBadge');
//   const unread = notifications.filter(n => !n.read).length;

//   badge.textContent   = unread;
//   badge.style.display = unread > 0 ? 'flex' : 'none';

//   if (notifications.length === 0) {
//     list.innerHTML = `<div class="notif-empty"><i class="fas fa-check-circle"></i><p>All caught up!</p></div>`;
//     return;
//   }

//   list.innerHTML = notifications.map(n => `
//     <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="notifClick('${n.id}')">
//       <div class="notif-dot-ind ${n.read ? '' : 'active'}"></div>
//       <div class="notif-content">
//         <div class="notif-title">
//           <span class="notif-name">${n.customer}</span>
//           <span class="notif-order">${n.orderId}</span>
//         </div>
//         <div class="notif-items">${n.items || '—'}</div>
//         <div class="notif-meta">
//           <span class="notif-total">₱${n.total.toLocaleString()}</span>
//           <span class="notif-time">${timeAgo(n.time)}</span>
//         </div>
//       </div>
//     </div>`).join('');
// }

// window.notifClick = function(id) {
//   const n = notifications.find(x => x.id === id);
//   if (n) n.read = true;
//   renderNotifPanel();
//   closeNotifPanel();
//   if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
//   openDetail(id);
// };

// window.toggleNotifPanel = function() {
//   const panel = document.getElementById('notifPanel');
//   const isOpen = panel.classList.contains('open');
//   if (isOpen) {
//     closeNotifPanel();
//   } else {
//     panel.classList.add('open');
//     setTimeout(() => {
//       notifications.forEach(n => n.read = true);
//       renderNotifPanel();
//     }, 1500);
//   }
// };

// function closeNotifPanel() {
//   document.getElementById('notifPanel')?.classList.remove('open');
// }

// window.clearAllNotifs = function() {
//   notifications = [];
//   renderNotifPanel();
// };

// // ══════════════════════════════════════════════════════════════
// //  VIEW SWITCHING
// //  THE FIX: pageTitle was getElementById('pageTitle') → null
// //  → crash → applyAll() never ran → table never loaded.
// //  Now uses optional chaining so it NEVER throws even if the
// //  element doesn't exist, and falls back to .page-title h1.
// // ══════════════════════════════════════════════════════════════
// window.switchView = function(view, btn) {
//   currentView  = view;
//   activeFilter = 'all';
//   activeSearch = '';
//   document.getElementById('globalSearch').value = '';
//   resetDateFilter(true);

//   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');

//   // ✅ FIX: try #pageTitle first, fall back to .page-title h1, never crash
//   const pageTitle    = document.getElementById('pageTitle') || document.querySelector('.page-title h1');
//   const emptyTitle   = document.getElementById('emptyTitle');
//   const emptyMsg     = document.getElementById('emptyMsg');
//   const statusHeader = document.getElementById('statusHeader');

//   if (view === 'archive') {
//     if (pageTitle)    pageTitle.textContent    = 'Archive';
//     if (emptyTitle)   emptyTitle.textContent   = 'No archived inquiries';
//     if (emptyMsg)     emptyMsg.textContent     = 'Inquiries you archive will appear here.';
//     if (statusHeader) statusHeader.textContent = 'Status';
//   } else {
//     if (pageTitle)  pageTitle.textContent  = 'Inquiries';
//     if (emptyTitle) emptyTitle.textContent = 'No inquiries found';
//     if (emptyMsg)   emptyMsg.textContent   = 'Inquiries submitted from the landing page will appear here in real-time.';
//   }

//   applyAll(); // ✅ now always runs
// };

// // ── Filter / Sort / Search ────────────────────────────────────
// function applyAll() {
//   const source = currentView === 'archive' ? allArchived : allInquiries;

//   filtered = source.filter(i => {
//     const matchFilter = currentView === 'archive' || activeFilter === 'all' || i.status === activeFilter;
//     const sl = activeSearch.toLowerCase();
//     const matchSearch = !activeSearch ||
//       (i.customer || '').toLowerCase().includes(sl) ||
//       (i.orderId  || '').toLowerCase().includes(sl) ||
//       (i.email    || '').toLowerCase().includes(sl) ||
//       (i.phone    || '').toLowerCase().includes(sl);
//     const matchDate = (() => {
//       if (!dateFrom && !dateTo) return true;
//       const d = new Date(i.date || i.createdAt);
//       if (isNaN(d)) return true;
//       if (dateFrom && d < new Date(dateFrom))             return false;
//       if (dateTo   && d > new Date(dateTo + 'T23:59:59')) return false;
//       return true;
//     })();
//     return matchFilter && matchSearch && matchDate;
//   });

//   filtered.sort((a, b) => {
//     let va, vb;
//     switch (sortField) {
//       case 'total':     va = a.total||0;                       vb = b.total||0;                       break;
//       case 'date':      va = new Date(a.date||0);              vb = new Date(b.date||0);              break;
//       case 'orderDate': va = new Date(a.orderDate||0);         vb = new Date(b.orderDate||0);         break;
//       case 'customer':  va = (a.customer||'').toLowerCase();   vb = (b.customer||'').toLowerCase();   break;
//       default:          va = (a[sortField]||'').toString().toLowerCase(); vb = (b[sortField]||'').toString().toLowerCase();
//     }
//     return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
//   });

//   currentPage = 1;
//   renderTable();
//   renderPagination();
// }

// window.setFilter = function(f, btn) {
//   if (currentView === 'archive') switchView('active', btn);
//   activeFilter = f;
//   document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');
//   applyAll();
// };

// window.handleSearch = function(val) { activeSearch = val; applyAll(); };

// window.applyDateFilter = function() {
//   dateFrom = document.getElementById('dateFrom').value;
//   dateTo   = document.getElementById('dateTo').value;
//   const resetBtn = document.getElementById('dateResetBtn');
//   if (resetBtn) resetBtn.style.display = (dateFrom || dateTo) ? 'inline-flex' : 'none';
//   applyAll();
// };

// window.resetDateFilter = function(silent = false) {
//   dateFrom = ''; dateTo = '';
//   const f = document.getElementById('dateFrom');
//   const t = document.getElementById('dateTo');
//   const r = document.getElementById('dateResetBtn');
//   if (f) f.value = '';
//   if (t) t.value = '';
//   if (r) r.style.display = 'none';
//   if (!silent) applyAll();
// };

// window.sortBy = function(field) {
//   sortAsc   = sortField === field ? !sortAsc : false;
//   sortField = field;
//   applyAll();
// };

// // ── Render Table ──────────────────────────────────────────────
// function renderTable() {
//   const tbody = document.getElementById('inquiryBody');
//   const empty = document.getElementById('emptyState');
//   tbody.innerHTML = '';

//   if (filtered.length === 0) { empty.style.display = 'block'; return; }
//   empty.style.display = 'none';

//   const start = (currentPage - 1) * PER_PAGE;
//   filtered.slice(start, start + PER_PAGE).forEach((inq, idx) => {
//     const tr = document.createElement('tr');
//     tr.style.animationDelay = `${idx * 0.04}s`;
//     if (currentView === 'archive') tr.classList.add('archived-row');

//     const initials  = (inq.customer || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
//     const itemsStr  = (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', ') || '—';
//     const orderDate = inq.orderDate
//       ? new Date(inq.orderDate + 'T00:00:00').toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
//       : '—';
//     const inqDate = inq.date ? timeAgo(new Date(inq.date)) : '—';
//     const status  = inq.status || 'pending';

//     const actionBtns = currentView === 'archive'
//       ? `<button class="action-btn restore" title="Restore"        onclick="openRestore('${inq.id}')"><i class="fas fa-undo"></i></button>
//          <button class="action-btn view"    title="View"           onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
//          <button class="action-btn delete"  title="Delete Forever" onclick="openDelete('${inq.id}')"><i class="fas fa-trash"></i></button>`
//       : `<button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
//          <button class="action-btn reply"   title="Reply"   onclick="openReply('${inq.id}')"><i class="fas fa-reply"></i></button>
//          <button class="action-btn archive" title="Archive" onclick="openArchive('${inq.id}')"><i class="fas fa-archive"></i></button>`;

//     tr.innerHTML = `
//       <td><input type="checkbox" class="row-check" data-id="${inq.id}"/></td>
//       <td><span class="order-id">${inq.orderId || inq.id}</span></td>
//       <td>
//         <div class="customer-cell">
//           <div class="cust-avatar" style="background:${avatarColor(inq.customer||'')}">${initials}</div>
//           <div>
//             <div class="cust-name">${inq.customer || '—'}</div>
//             <div class="cust-email">${inq.email || '—'}</div>
//           </div>
//         </div>
//       </td>
//       <td>${inqDate}</td>
//       <td>${orderDate}${inq.orderTime ? `<span style="color:var(--text-grey);font-size:11px;"> @ ${formatTime(inq.orderTime)}</span>` : ''}</td>
//       <td><div class="items-preview" title="${itemsStr}">${itemsStr}</div></td>
//       <td><span class="total-cell">₱${(inq.total||0).toLocaleString()}</span></td>
//       <td>
//         ${currentView === 'archive'
//           ? `<span class="status-badge ${status}">${status}</span>`
//           : `<select class="status-select" onchange="quickStatusUpdate('${inq.id}', this.value)">
//                <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
//                <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
//                <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready</option>
//                <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
//              </select>`}
//       </td>
//       <td><div class="row-actions">${actionBtns}</div></td>`;
//     tbody.appendChild(tr);
//   });
// }

// // ── Pagination ────────────────────────────────────────────────
// function renderPagination() {
//   const total = Math.ceil(filtered.length / PER_PAGE);
//   const el    = document.getElementById('pagination');
//   el.innerHTML = '';
//   if (total <= 1) return;

//   const info = document.createElement('span');
//   info.className = 'page-info';
//   const s = (currentPage-1)*PER_PAGE+1, e = Math.min(currentPage*PER_PAGE, filtered.length);
//   info.textContent = `${s}–${e} of ${filtered.length}`;
//   el.appendChild(info);

//   el.appendChild(mkPageBtn('<i class="fas fa-chevron-left"></i>',  currentPage===1,     () => goPage(currentPage-1)));
//   for (let p=1; p<=total; p++) {
//     if (total>7 && p>2 && p<total-1 && Math.abs(p-currentPage)>1) {
//       if (p===3||p===total-2) { const d=document.createElement('span'); d.textContent='…'; d.style.cssText='padding:0 4px;color:var(--text-grey);font-size:13px;'; el.appendChild(d); }
//       continue;
//     }
//     const btn = mkPageBtn(p, false, () => goPage(p));
//     if (p===currentPage) btn.classList.add('active');
//     el.appendChild(btn);
//   }
//   el.appendChild(mkPageBtn('<i class="fas fa-chevron-right"></i>', currentPage===total, () => goPage(currentPage+1)));
// }
// function mkPageBtn(label, disabled, onClick) {
//   const b = document.createElement('button');
//   b.className='page-btn'; b.innerHTML=label; b.disabled=disabled; b.onclick=onClick; return b;
// }
// function goPage(p) { currentPage=p; renderTable(); renderPagination(); }

// // ── Status Update ─────────────────────────────────────────────
// window.quickStatusUpdate = async function(id, status) {
//   try {
//     await updateDoc(doc(db, "inquiries", id), { status });
//     showToast(`Status set to "${status}"`, 'success');
//   } catch (err) { showToast('Failed to update status.', 'error'); }
// };

// // ══════════════════════════════════════════════════════════════
// //  ARCHIVE / RESTORE / DELETE
// // ══════════════════════════════════════════════════════════════
// window.openArchive = function(id) { archiveTarget = id; openModal('archiveModal'); };

// window.confirmArchive = async function() {
//   if (!archiveTarget) return;
//   const btn = document.getElementById('confirmArchiveBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Archiving...';
//   btn.disabled  = true;
//   try {
//     await updateDoc(doc(db, "inquiries", archiveTarget), { archived: true });
//     showToast('Inquiry archived.', 'success');
//   } catch (err) { showToast('Failed to archive.', 'error'); }
//   closeModal('archiveModal');
//   btn.innerHTML = '<i class="fas fa-archive"></i> Archive';
//   btn.disabled  = false;
//   archiveTarget = null;
// };

// window.openRestore = function(id) { restoreTarget = id; openModal('restoreModal'); };

// window.confirmRestore = async function() {
//   if (!restoreTarget) return;
//   const btn = document.getElementById('confirmRestoreBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restoring...';
//   btn.disabled  = true;
//   try {
//     await updateDoc(doc(db, "inquiries", restoreTarget), { archived: false });
//     showToast('Inquiry restored!', 'success');
//     switchView('active', document.querySelector('.ftab'));
//   } catch (err) { showToast('Failed to restore.', 'error'); }
//   closeModal('restoreModal');
//   btn.innerHTML = '<i class="fas fa-undo"></i> Restore';
//   btn.disabled  = false;
//   restoreTarget = null;
// };

// window.openDelete = function(id) { deleteTarget = id; openModal('deleteModal'); };

// window.confirmDelete = async function() {
//   if (!deleteTarget) return;
//   const btn = document.getElementById('confirmDeleteBtn');
//   btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
//   btn.disabled  = true;
//   try {
//     await deleteDoc(doc(db, "inquiries", deleteTarget));
//     showToast('Inquiry permanently deleted.', 'success');
//   } catch (err) { showToast('Failed to delete.', 'error'); }
//   closeModal('deleteModal');
//   btn.innerHTML = '<i class="fas fa-trash"></i> Delete Forever';
//   btn.disabled  = false;
//   deleteTarget  = null;
// };

// // ══════════════════════════════════════════════════════════════
// //  DETAIL MODAL
// // ══════════════════════════════════════════════════════════════
// window.openDetail = async function(id) {
//   const source = [...allInquiries, ...allArchived];
//   let inq;
//   try {
//     const snap = await getDoc(doc(db, "inquiries", id));
//     if (!snap.exists()) { showToast('Inquiry not found.', 'error'); return; }
//     inq = { id: snap.id, ...snap.data() };
//   } catch { inq = source.find(i => i.id === id); if (!inq) return; }

//   const status     = inq.status || 'pending';
//   const isArchived = !!inq.archived;

//   document.getElementById('modalOrderId').textContent = inq.orderId || inq.id;
//   const badge = document.getElementById('modalStatusBadge');
//   badge.textContent = status; badge.className = `status-badge ${status}`;

//   const itemsHtml = (inq.items||[]).map(item =>
//     `<tr><td>${item.qty}×</td><td>${item.name}</td><td style="text-align:right;font-weight:700;">₱${((item.price||0)*(item.qty||0)).toLocaleString()}</td></tr>`
//   ).join('') || '<tr><td colspan="3" style="color:var(--text-grey);">No items recorded</td></tr>';

//   const orderDate   = inq.orderDate ? new Date(inq.orderDate+'T00:00:00').toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '—';
//   const submittedAt = inq.date ? new Date(inq.date).toLocaleString('en-PH') : '—';

//   document.getElementById('detailModalBody').innerHTML = `
//     ${isArchived ? `<div class="archive-banner"><i class="fas fa-archive"></i> This inquiry is archived. <button class="inline-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')">Restore it</button></div>` : ''}
//     <div class="detail-status-bar">
//       <label><i class="fas fa-tag" style="color:var(--primary);margin-right:5px;"></i> Update Status</label>
//       <select class="status-select-lg" onchange="quickStatusUpdate('${inq.id}', this.value)" ${isArchived?'disabled':''}>
//         <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
//         <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
//         <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready / Fulfilled</option>
//         <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
//       </select>
//     </div>
//     <div class="detail-grid">
//       <div class="detail-block">
//         <h4><i class="fas fa-user"></i> Customer Info</h4>
//         <div class="detail-row"><span class="dl">Name</span>   <span class="dv">${inq.customer||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Email</span>  <span class="dv">${inq.email||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Phone</span>  <span class="dv">${inq.phone||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Address</span><span class="dv">${inq.address||'—'}</span></div>
//         <div class="detail-row"><span class="dl">Source</span> <span class="dv">${inq.source==='landing_page'?'🌐 Website':(inq.source||'—')}</span></div>
//       </div>
//       <div class="detail-block">
//         <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
//         <div class="detail-row"><span class="dl">Order Date</span><span class="dv">${orderDate}</span></div>
//         <div class="detail-row"><span class="dl">Time</span>      <span class="dv">${inq.orderTime?formatTime(inq.orderTime):'—'}</span></div>
//         <div class="detail-row"><span class="dl">Submitted</span> <span class="dv">${submittedAt}</span></div>
//       </div>
//     </div>
//     ${inq.notes ? `<div class="notes-section"><h4><i class="fas fa-sticky-note"></i> Special Instructions</h4><p>${inq.notes}</p></div>` : ''}
//     <div class="detail-block" style="margin-bottom:0;">
//       <h4><i class="fas fa-shopping-basket"></i> Order Items</h4>
//       <table class="items-table">
//         <thead><tr><th>Qty</th><th>Item</th><th style="text-align:right;">Subtotal</th></tr></thead>
//         <tbody>${itemsHtml}</tbody>
//       </table>
//       <div class="items-total"><span>Total Amount</span><span>₱${(inq.total||0).toLocaleString()}</span></div>
//     </div>
//     <div class="detail-actions">
//       <button class="btn-secondary" onclick="closeModal('detailModal')"><i class="fas fa-times"></i> Close</button>
//       ${isArchived
//         ? `<button class="btn-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')"><i class="fas fa-undo"></i> Restore</button>
//            <button class="btn-danger"  onclick="closeModal('detailModal'); openDelete('${inq.id}')"><i class="fas fa-trash"></i> Delete</button>`
//         : `<button class="btn-outline-primary" onclick="closeModal('detailModal'); openReply('${inq.id}')"><i class="fas fa-reply"></i> Reply</button>
//            <button class="btn-archive-confirm" onclick="closeModal('detailModal'); openArchive('${inq.id}')"><i class="fas fa-archive"></i> Archive</button>
//            <button class="btn-primary" onclick="printInquiry('${inq.id}')"><i class="fas fa-print"></i> Print</button>`}
//     </div>`;

//   openModal('detailModal');
// };

// // ══════════════════════════════════════════════════════════════
// //  REPLY MODAL
// // ══════════════════════════════════════════════════════════════
// window.openReply = function(id) {
//   const inq = allInquiries.find(i => i.id === id);
//   if (!inq) return;
//   document.getElementById('replyRecipient').textContent = `To: ${inq.customer} (${inq.email||inq.phone||'—'})`;
//   document.getElementById('replyTo').value      = inq.email || '';
//   document.getElementById('replySubject').value = `Re: Your Order Inquiry ${inq.orderId||inq.id} — ${storeInfo.name}`;
//   document.getElementById('replyMessage').value = '';
//   document.getElementById('smsPhone').textContent = inq.phone || '—';
//   document.getElementById('smsMessage').value     = fillTemplate(QUICK_REPLIES[0].text, inq);
//   const chips = document.getElementById('qrChips');
//   chips.innerHTML = '';
//   QUICK_REPLIES.forEach(qr => {
//     const chip = document.createElement('button');
//     chip.className = 'qr-chip'; chip.textContent = qr.label;
//     chip.onclick = () => {
//       const f = fillTemplate(qr.text, inq);
//       document.getElementById('replyMessage').value = f;
//       document.getElementById('smsMessage').value   = f;
//     };
//     chips.appendChild(chip);
//   });
//   switchReplyTab('email', document.querySelector('.rtab'));
//   openModal('replyModal');
// };

// window.switchReplyTab = function(tab, btn) {
//   document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
//   if (btn) btn.classList.add('active');
//   document.getElementById('replyEmailSection').style.display = tab==='email'?'block':'none';
//   document.getElementById('replySmsSection').style.display   = tab==='sms'  ?'block':'none';
// };

// window.sendEmailReply = function() {
//   const to=document.getElementById('replyTo').value.trim();
//   const subject=encodeURIComponent(document.getElementById('replySubject').value);
//   const body=encodeURIComponent(document.getElementById('replyMessage').value);
//   if (!to)   { showToast('No email address!', 'error'); return; }
//   if (!body) { showToast('Write a message first!', 'error'); return; }
//   window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;
//   showToast('Opening email client...', 'info');
//   closeModal('replyModal');
// };

// window.copySmsMessage = function() {
//   const msg=document.getElementById('smsMessage').value;
//   if (!msg) { showToast('Nothing to copy.', 'error'); return; }
//   navigator.clipboard.writeText(msg)
//     .then(()=>{ showToast('Copied!', 'success'); closeModal('replyModal'); })
//     .catch(()=> showToast('Could not copy — copy manually.', 'error'));
// };

// function fillTemplate(t, inq) {
//   return t
//     .replace(/{customer}/g,  inq.customer||'')
//     .replace(/{orderId}/g,   inq.orderId||inq.id||'')
//     .replace(/{orderDate}/g, inq.orderDate||'')
//     .replace(/{orderTime}/g, inq.orderTime?formatTime(inq.orderTime):'')
//     .replace(/{total}/g,     `₱${(inq.total||0).toLocaleString()}`)
//     .replace(/{storeName}/g, storeInfo.name)
//     .replace(/{storePhone}/g,storeInfo.phone||'')
//     .replace(/{storeEmail}/g,storeInfo.email||'');
// }

// // ── Print ─────────────────────────────────────────────────────
// window.printInquiry = function(id) {
//   const inq = [...allInquiries,...allArchived].find(i=>i.id===id);
//   if (!inq) return;
//   const w = window.open('','_blank','width=700,height=800');
//   const rows = (inq.items||[]).map(i=>`<tr><td>${i.qty}×</td><td>${i.name}</td><td>₱${((i.price||0)*(i.qty||0)).toLocaleString()}</td></tr>`).join('');
//   w.document.write(`<!DOCTYPE html><html><head><title>Inquiry ${inq.orderId||inq.id}</title>
//   <style>body{font-family:Arial,sans-serif;padding:40px;color:#1a2b4c;}h1{font-size:22px;color:#ff4e00;margin-bottom:4px;}
//   h2{font-size:13px;font-weight:700;border-bottom:2px solid #eee;padding-bottom:6px;margin:20px 0 10px;text-transform:uppercase;letter-spacing:.5px;color:#8d97ad;}
//   table{width:100%;border-collapse:collapse;}td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee;font-size:13px;}
//   .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#e3f2fd;color:#1565c0;}
//   .total{font-size:16px;font-weight:800;color:#ff4e00;}footer{margin-top:40px;font-size:11px;color:#8d97ad;border-top:1px solid #eee;padding-top:12px;}</style>
//   </head><body>
//   <h1>${storeInfo.name}</h1>
//   <p style="color:#8d97ad;font-size:12px;">${[storeInfo.address,storeInfo.phone,storeInfo.email].filter(Boolean).join(' · ')}</p>
//   <h2>Order Info</h2>
//   <table>
//     <tr><td><strong>Order ID</strong></td><td>${inq.orderId||inq.id}</td></tr>
//     <tr><td><strong>Status</strong></td><td><span class="badge">${inq.status||'pending'}</span></td></tr>
//     <tr><td><strong>Order Date</strong></td><td>${inq.orderDate||'—'} ${inq.orderTime?'at '+formatTime(inq.orderTime):''}</td></tr>
//     <tr><td><strong>Submitted</strong></td><td>${inq.date?new Date(inq.date).toLocaleString():'—'}</td></tr>
//   </table>
//   <h2>Customer</h2>
//   <table>
//     <tr><td><strong>Name</strong></td>   <td>${inq.customer||'—'}</td></tr>
//     <tr><td><strong>Email</strong></td>  <td>${inq.email||'—'}</td></tr>
//     <tr><td><strong>Phone</strong></td>  <td>${inq.phone||'—'}</td></tr>
//     <tr><td><strong>Address</strong></td><td>${inq.address||'—'}</td></tr>
//   </table>
//   <h2>Items</h2>
//   <table><thead><tr><th>Qty</th><th>Item</th><th>Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
//   <p class="total" style="margin-top:12px;text-align:right;">Total: ₱${(inq.total||0).toLocaleString()}</p>
//   ${inq.notes?`<h2>Notes</h2><p style="font-size:13px;">${inq.notes}</p>`:''}
//   <footer>Printed on ${new Date().toLocaleString()} · ${storeInfo.name}</footer>
//   <script>window.print();<\/script></body></html>`);
//   w.document.close();
// };

// // ── Export CSV ────────────────────────────────────────────────
// window.exportCSV = function() {
//   if (!filtered.length) { showToast('No data to export.', 'error'); return; }
//   const rows = [['Order ID','Customer','Email','Phone','Address','Inquiry Date','Order Date','Order Time','Items','Total','Status','Archived','Notes']];
//   filtered.forEach(i => rows.push([
//     i.orderId||i.id, i.customer||'', i.email||'', i.phone||'', i.address||'',
//     i.date?new Date(i.date).toLocaleString():'', i.orderDate||'',
//     i.orderTime?formatTime(i.orderTime):'',
//     (i.items||[]).map(x=>`${x.qty}x ${x.name}`).join(' | '),
//     i.total||0, i.status||'', i.archived?'Yes':'No', (i.notes||'').replace(/,/g,';')
//   ]));
//   const csv=rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
//   const a=document.createElement('a');
//   a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
//   a.download=`inquiries-${new Date().toISOString().slice(0,10)}.csv`;
//   a.click();
//   showToast(`Exported ${filtered.length} rows.`, 'success');
// };

// // ── Select All / Sidebar / Modals ─────────────────────────────
// window.toggleSelectAll = cb => document.querySelectorAll('.row-check').forEach(c => c.checked=cb.checked);
// window.toggleSidebar = function() {
//   const sidebar  = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay  = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   const isMobile = window.innerWidth <= 900;
//   if (isMobile) {
//     const isOpen = sidebar?.classList.contains('mobile-open') || sidebar?.classList.contains('active');
//     sidebar?.classList.toggle('mobile-open', !isOpen);
//     sidebar?.classList.toggle('active', !isOpen);
//     overlay?.classList.toggle('show', !isOpen);
//     overlay?.classList.toggle('active', !isOpen);
//     document.body.style.overflow = isOpen ? '' : 'hidden';
//   } else {
//     sidebar?.classList.toggle('collapsed');
//   }
// };

// window.openMobileSidebar = function() {
//   const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   sidebar?.classList.add('mobile-open','active');
//   overlay?.classList.add('show','active');
//   document.body.style.overflow = 'hidden';
// };

// window.closeSidebarMobile = function() {
//   const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
//   const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
//   sidebar?.classList.remove('mobile-open','active');
//   overlay?.classList.remove('show','active');
//   document.body.style.overflow = '';
// };

// function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow='hidden'; }
// window.closeModal = id  => { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; };
// document.querySelectorAll('.modal-overlay').forEach(m =>
//   m.addEventListener('click', e => { if (e.target===m) window.closeModal(m.id); })
// );

// // ── Toast ─────────────────────────────────────────────────────
// window.showToast = function(msg, type='success') {
//   const c = document.getElementById('toastContainer');
//   const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
//   const t = document.createElement('div');
//   t.className = `toast ${type}`;
//   t.innerHTML = `<i class="fas ${icons[type]||icons.success}"></i> ${msg}`;
//   c.appendChild(t);
//   setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); }, 3000);
// };

// // ── Utilities ─────────────────────────────────────────────────
// function timeAgo(date) {
//   if (!(date instanceof Date)||isNaN(date)) return '—';
//   const m=Math.floor((Date.now()-date.getTime())/60000);
//   if (m<1)  return 'Just now';
//   if (m<60) return `${m}m ago`;
//   const h=Math.floor(m/60);
//   if (h<24) return `${h}h ago`;
//   const d=Math.floor(h/24);
//   if (d<7)  return `${d}d ago`;
//   return date.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
// }
// function formatTime(t) {
//   if (!t||typeof t!=='string') return '';
//   const [h,m]=t.split(':'), hr=parseInt(h,10);
//   return `${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;
// }
// function avatarColor(name) {
//   const p=['#1a2b4c','#ff4e00','#1976d2','#2e7d32','#7b1fa2','#c62828','#f57f17','#0288d1'];
//   let hash=0; for (const c of (name||'')) hash=(hash*31+c.charCodeAt(0))&0xffffffff;
//   return p[Math.abs(hash)%p.length];
// }

// // ── Stat card click handlers ──────────────────────────────────
// document.addEventListener('DOMContentLoaded', () => {
//   const statMap = [
//     { id: 'statTotal',     filter: 'all'       },
//     { id: 'statPending',   filter: 'pending'   },
//     { id: 'statConfirmed', filter: 'confirmed' },
//     { id: 'statReady',     filter: 'ready'     },
//     { id: 'statArchived',  filter: 'archive'   },
//   ];
//   statMap.forEach(({ id, filter }) => {
//     const el = document.getElementById(id)?.closest('.stat-card');
//     if (!el) return;
//     el.style.cursor = 'pointer';
//     el.addEventListener('click', () => {
//       if (filter === 'archive') {
//         const archiveBtn = document.querySelector('.ftab-archive');
//         switchView('archive', archiveBtn);
//       } else {
//         if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
//         const btn = [...document.querySelectorAll('.ftab')].find(b =>
//           b.getAttribute('onclick')?.includes(`'${filter}'`) || (filter === 'all' && b.textContent.trim() === 'All')
//         );
//         setFilter(filter, btn);
//       }
//     });
//   });
// });
















// ============================================================
//  GENE'S LECHON — Inquiries.js
// ============================================================

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection, onSnapshot, query, orderBy,
  doc, updateDoc, deleteDoc, getDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
  authDomain:        "pos-and-sales-monitoring.firebaseapp.com",
  projectId:         "pos-and-sales-monitoring",
  storageBucket:     "pos-and-sales-monitoring.firebasestorage.app",
  messagingSenderId: "516453934117",
  appId:             "1:516453934117:web:1783067b8aa6b37373cbcc",
  measurementId:     "G-FT1G64DB9N"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db  = getFirestore(app);

let allInquiries  = [];
let allArchived   = [];
let filtered      = [];
let currentView   = 'active';
let activeFilter  = 'all';
let activeSearch  = '';
let sortField     = 'date';
let sortAsc       = false;
let dateFrom      = '';
let dateTo        = '';
let currentPage   = 1;
const PER_PAGE    = 10;
let archiveTarget = null;
let restoreTarget = null;
let deleteTarget  = null;

let notifications   = [];
let seenInquiryIds  = new Set();
let initialLoadDone = false;

let storeInfo = { name: "Gene's Lechon", email: '', phone: '', address: '' };

const QUICK_REPLIES = [
  { label: "✅ Confirmed",        text: "Hi {customer}! Great news — your order ({orderId}) has been confirmed. We'll have it ready by {orderDate} at {orderTime}. Thank you for choosing {storeName}! 🐷" },
  { label: "📦 Ready for Pickup", text: "Hi {customer}! Your order ({orderId}) is now ready. Please come by at your scheduled time. See you soon! — {storeName} 🐷" },
  { label: "⏳ Need More Info",   text: "Hi {customer}! We received your inquiry ({orderId}). Could you provide more details so we can process it? — {storeName}" },
  { label: "❌ Unavailable",      text: "Hi {customer}, we're sorry but we cannot fulfill order {orderId} on {orderDate}. Please contact us to reschedule. — {storeName}" },
  { label: "🙏 Thank You",        text: "Hi {customer}! Thank you for your order ({orderId}). We appreciate your support! — {storeName} 🐷" }
];

document.addEventListener('DOMContentLoaded', () => {
  showDateNow();
  loadStoreInfo();
  listenToInquiries();
  // Wire hamburger
  const hamburger = document.getElementById('hamburgerBtn');
  if (hamburger) hamburger.addEventListener('click', () => window.toggleSidebar());
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('notifWrap');
    if (wrap && !wrap.contains(e.target)) closeNotifPanel();
  });
});

function showDateNow() {
  const el = document.getElementById('currentDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

async function loadStoreInfo() {
  try {
    const snap = await getDocs(collection(db, "users"));
    snap.forEach(d => {
      const data = d.data();
      if (data.role === 'admin') {
        storeInfo.email   = data.email     || storeInfo.email;
        storeInfo.phone   = data.phone     || storeInfo.phone;
        storeInfo.address = data.address   || storeInfo.address;
        storeInfo.name    = data.storeName || storeInfo.name;
      }
    });
  } catch (e) { console.warn('Could not load store info:', e); }
}

function listenToInquiries() {
  const q = query(collection(db, "inquiries"), orderBy("date", "desc"));
  onSnapshot(q, (snap) => {
    const prevIds = new Set([...allInquiries, ...allArchived].map(i => i.id));
    allInquiries = [];
    allArchived  = [];
    snap.forEach(d => {
      const data = { id: d.id, ...d.data() };
      if (data.archived) allArchived.push(data);
      else               allInquiries.push(data);
    });
    if (initialLoadDone) {
      allInquiries.forEach(inq => {
        if (!prevIds.has(inq.id) && !seenInquiryIds.has(inq.id)) addNotification(inq);
      });
    } else {
      allInquiries.forEach(i => seenInquiryIds.add(i.id));
      allArchived.forEach(i  => seenInquiryIds.add(i.id));
      initialLoadDone = true;
    }
    allInquiries.forEach(i => seenInquiryIds.add(i.id));
    allArchived.forEach(i  => seenInquiryIds.add(i.id));
    document.getElementById('loadingState').style.display = 'none';
    updateStats();
    applyAll();
  }, (err) => {
    console.error('Firestore error:', err);
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('emptyState').style.display   = 'block';
    showToast('Could not connect to database.', 'error');
  });
}

function updateStats() {
  const c = { total: allInquiries.length, pending:0, confirmed:0, ready:0, cancelled:0 };
  allInquiries.forEach(i => { if (c[i.status] !== undefined) c[i.status]++; });
  document.getElementById('statTotal').textContent     = c.total;
  document.getElementById('statPending').textContent   = c.pending;
  document.getElementById('statConfirmed').textContent = c.confirmed;
  document.getElementById('statReady').textContent     = c.ready;
  document.getElementById('statArchived').textContent  = allArchived.length;
  const badge = document.getElementById('sidebarBadge');
  if (badge) { badge.textContent = c.pending || ''; badge.style.display = c.pending ? '' : 'none'; }
  const mobBadge = document.getElementById('mobBadge');
  if (mobBadge) { mobBadge.textContent = c.pending || ''; mobBadge.style.display = c.pending ? 'flex' : 'none'; }
  const archiveCount = document.getElementById('archiveTabCount');
  if (archiveCount) {
    archiveCount.textContent = allArchived.length;
    archiveCount.style.display = allArchived.length > 0 ? 'inline-flex' : 'none';
  }
}

// ── NOTIFICATIONS ─────────────────────────────────────────────
function addNotification(inq) {
  const notif = {
    id: inq.id, orderId: inq.orderId || inq.id,
    customer: inq.customer || 'Unknown',
    items: (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', '),
    total: inq.total || 0, time: new Date(), read: false
  };
  notifications.unshift(notif);
  if (notifications.length > 20) notifications.pop();
  renderNotifPanel();
  animateNotifBtn();
  showToast(`New inquiry from ${notif.customer}!`, 'info');
}

function animateNotifBtn() {
  const btn = document.getElementById('notifBtn');
  if (!btn) return;
  btn.classList.add('ring');
  setTimeout(() => btn.classList.remove('ring'), 1000);
}

function renderNotifPanel() {
  const list   = document.getElementById('notifList');
  const badge  = document.getElementById('notifBadge');
  const unread = notifications.filter(n => !n.read).length;
  badge.textContent   = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';
  if (notifications.length === 0) {
    list.innerHTML = `<div class="notif-empty"><i class="fas fa-check-circle"></i><p>All caught up!</p></div>`;
    return;
  }
  list.innerHTML = notifications.map(n => `
    <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="notifClick('${n.id}')">
      <div class="notif-dot-ind ${n.read ? '' : 'active'}"></div>
      <div class="notif-content">
        <div class="notif-title">
          <span class="notif-name">${n.customer}</span>
          <span class="notif-order">${n.orderId}</span>
        </div>
        <div class="notif-items">${n.items || '—'}</div>
        <div class="notif-meta">
          <span class="notif-total">₱${n.total.toLocaleString()}</span>
          <span class="notif-time">${timeAgo(n.time)}</span>
        </div>
      </div>
    </div>`).join('');
}

window.notifClick = function(id) {
  const n = notifications.find(x => x.id === id);
  if (n) n.read = true;
  renderNotifPanel();
  closeNotifPanel();
  if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
  openDetail(id);
};

window.toggleNotifPanel = function() {
  const panel = document.getElementById('notifPanel');
  const isOpen = panel.classList.contains('open');
  if (isOpen) { closeNotifPanel(); }
  else {
    panel.classList.add('open');
    setTimeout(() => { notifications.forEach(n => n.read = true); renderNotifPanel(); }, 1500);
  }
};

function closeNotifPanel() { document.getElementById('notifPanel')?.classList.remove('open'); }
window.clearAllNotifs = function() { notifications = []; renderNotifPanel(); };

// ── VIEW SWITCHING ────────────────────────────────────────────
window.switchView = function(view, btn) {
  currentView  = view;
  activeFilter = 'all';
  activeSearch = '';
  document.getElementById('globalSearch').value = '';
  resetDateFilter(true);
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const pageTitle    = document.getElementById('pageTitle') || document.querySelector('.page-title h1');
  const emptyTitle   = document.getElementById('emptyTitle');
  const emptyMsg     = document.getElementById('emptyMsg');
  const statusHeader = document.getElementById('statusHeader');
  if (view === 'archive') {
    if (pageTitle)    pageTitle.textContent    = 'Archive';
    if (emptyTitle)   emptyTitle.textContent   = 'No archived inquiries';
    if (emptyMsg)     emptyMsg.textContent     = 'Inquiries you archive will appear here.';
    if (statusHeader) statusHeader.textContent = 'Status';
  } else {
    if (pageTitle)  pageTitle.textContent  = 'Inquiries';
    if (emptyTitle) emptyTitle.textContent = 'No inquiries found';
    if (emptyMsg)   emptyMsg.textContent   = 'Inquiries submitted from the landing page will appear here in real-time.';
  }
  applyAll();
};

// ── FILTER / SORT / SEARCH ────────────────────────────────────
function applyAll() {
  const source = currentView === 'archive' ? allArchived : allInquiries;
  filtered = source.filter(i => {
    const matchFilter = currentView === 'archive' || activeFilter === 'all' || i.status === activeFilter;
    const sl = activeSearch.toLowerCase();
    const matchSearch = !activeSearch ||
      (i.customer || '').toLowerCase().includes(sl) ||
      (i.orderId  || '').toLowerCase().includes(sl) ||
      (i.email    || '').toLowerCase().includes(sl) ||
      (i.phone    || '').toLowerCase().includes(sl);
    const matchDate = (() => {
      if (!dateFrom && !dateTo) return true;
      const d = new Date(i.date || i.createdAt);
      if (isNaN(d)) return true;
      if (dateFrom && d < new Date(dateFrom))             return false;
      if (dateTo   && d > new Date(dateTo + 'T23:59:59')) return false;
      return true;
    })();
    return matchFilter && matchSearch && matchDate;
  });
  filtered.sort((a, b) => {
    let va, vb;
    switch (sortField) {
      case 'total':     va = a.total||0;                       vb = b.total||0;                       break;
      case 'date':      va = new Date(a.date||0);              vb = new Date(b.date||0);              break;
      case 'orderDate': va = new Date(a.orderDate||0);         vb = new Date(b.orderDate||0);         break;
      case 'customer':  va = (a.customer||'').toLowerCase();   vb = (b.customer||'').toLowerCase();   break;
      default:          va = (a[sortField]||'').toString().toLowerCase(); vb = (b[sortField]||'').toString().toLowerCase();
    }
    return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });
  currentPage = 1;
  renderTable();
  renderPagination();
}

window.setFilter = function(f, btn) {
  if (currentView === 'archive') switchView('active', btn);
  activeFilter = f;
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyAll();
};

window.handleSearch    = function(val) { activeSearch = val; applyAll(); };

window.applyDateFilter = function() {
  dateFrom = document.getElementById('dateFrom').value;
  dateTo   = document.getElementById('dateTo').value;
  const resetBtn = document.getElementById('dateResetBtn');
  if (resetBtn) resetBtn.style.display = (dateFrom || dateTo) ? 'inline-flex' : 'none';
  applyAll();
};

window.resetDateFilter = function(silent = false) {
  dateFrom = ''; dateTo = '';
  const f = document.getElementById('dateFrom');
  const t = document.getElementById('dateTo');
  const r = document.getElementById('dateResetBtn');
  if (f) f.value = '';
  if (t) t.value = '';
  if (r) r.style.display = 'none';
  if (!silent) applyAll();
};

window.sortBy = function(field) {
  sortAsc   = sortField === field ? !sortAsc : false;
  sortField = field;
  applyAll();
};

// ── RENDER TABLE ──────────────────────────────────────────────
function renderTable() {
  const tbody = document.getElementById('inquiryBody');
  const empty = document.getElementById('emptyState');
  tbody.innerHTML = '';
  if (filtered.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  const start = (currentPage - 1) * PER_PAGE;
  filtered.slice(start, start + PER_PAGE).forEach((inq, idx) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = `${idx * 0.04}s`;
    if (currentView === 'archive') tr.classList.add('archived-row');
    const initials  = (inq.customer || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const itemsStr  = (inq.items || []).map(i => `${i.qty}× ${i.name}`).join(', ') || '—';
    const orderDate = inq.orderDate
      ? new Date(inq.orderDate + 'T00:00:00').toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
      : '—';
    const inqDate = inq.date ? timeAgo(new Date(inq.date)) : '—';
    const status  = inq.status || 'pending';
    const actionBtns = currentView === 'archive'
      ? `<button class="action-btn restore" title="Restore"        onclick="openRestore('${inq.id}')"><i class="fas fa-undo"></i></button>
         <button class="action-btn view"    title="View"           onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
         <button class="action-btn delete"  title="Delete Forever" onclick="openDelete('${inq.id}')"><i class="fas fa-trash"></i></button>`
      : `<button class="action-btn view"    title="View"    onclick="openDetail('${inq.id}')"><i class="fas fa-eye"></i></button>
         <button class="action-btn reply"   title="Reply"   onclick="openReply('${inq.id}')"><i class="fas fa-reply"></i></button>
         <button class="action-btn archive" title="Archive" onclick="openArchive('${inq.id}')"><i class="fas fa-archive"></i></button>`;
    tr.innerHTML = `
      <td><input type="checkbox" class="row-check" data-id="${inq.id}"/></td>
      <td><span class="order-id">${inq.orderId || inq.id}</span></td>
      <td>
        <div class="customer-cell">
          <div class="cust-avatar" style="background:${avatarColor(inq.customer||'')}">${initials}</div>
          <div>
            <div class="cust-name">${inq.customer || '—'}</div>
            <div class="cust-email">${inq.email || '—'}</div>
          </div>
        </div>
      </td>
      <td>${inqDate}</td>
      <td>${orderDate}${inq.orderTime ? `<span style="color:var(--text-grey);font-size:11px;"> @ ${formatTime(inq.orderTime)}</span>` : ''}</td>
      <td><div class="items-preview" title="${itemsStr}">${itemsStr}</div></td>
      <td><span class="total-cell">₱${(inq.total||0).toLocaleString()}</span></td>
      <td><span class="status-badge ${status}">${status}</span></td>
      <td><div class="row-actions">${actionBtns}</div></td>`;
    tbody.appendChild(tr);
  });
}

// ── PAGINATION ────────────────────────────────────────────────
function renderPagination() {
  const total = Math.ceil(filtered.length / PER_PAGE);
  const el    = document.getElementById('pagination');
  el.innerHTML = '';
  if (total <= 1) return;
  const info = document.createElement('span');
  info.className = 'page-info';
  const s = (currentPage-1)*PER_PAGE+1, e = Math.min(currentPage*PER_PAGE, filtered.length);
  info.textContent = `${s}–${e} of ${filtered.length}`;
  el.appendChild(info);
  el.appendChild(mkPageBtn('<i class="fas fa-chevron-left"></i>',  currentPage===1,     () => goPage(currentPage-1)));
  for (let p=1; p<=total; p++) {
    if (total>7 && p>2 && p<total-1 && Math.abs(p-currentPage)>1) {
      if (p===3||p===total-2) { const d=document.createElement('span'); d.textContent='…'; d.style.cssText='padding:0 4px;color:var(--text-grey);font-size:13px;'; el.appendChild(d); }
      continue;
    }
    const btn = mkPageBtn(p, false, () => goPage(p));
    if (p===currentPage) btn.classList.add('active');
    el.appendChild(btn);
  }
  el.appendChild(mkPageBtn('<i class="fas fa-chevron-right"></i>', currentPage===total, () => goPage(currentPage+1)));
}
function mkPageBtn(label, disabled, onClick) {
  const b = document.createElement('button');
  b.className='page-btn'; b.innerHTML=label; b.disabled=disabled; b.onclick=onClick; return b;
}
function goPage(p) { currentPage=p; renderTable(); renderPagination(); }

// ── STATUS UPDATE ─────────────────────────────────────────────
window.quickStatusUpdate = async function(id, status) {
  try {
    await updateDoc(doc(db, "inquiries", id), { status });
    showToast(`Status set to "${status}"`, 'success');
  } catch (err) { showToast('Failed to update status.', 'error'); }
};

// ── ARCHIVE / RESTORE / DELETE ────────────────────────────────
window.openArchive = function(id) { archiveTarget = id; openModal('archiveModal'); };

window.confirmArchive = async function() {
  if (!archiveTarget) return;
  const btn = document.getElementById('confirmArchiveBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Archiving...';
  btn.disabled  = true;
  try {
    await updateDoc(doc(db, "inquiries", archiveTarget), { archived: true });
    showToast('Inquiry archived.', 'success');
  } catch (err) { showToast('Failed to archive.', 'error'); }
  closeModal('archiveModal');
  btn.innerHTML = '<i class="fas fa-archive"></i> Archive';
  btn.disabled  = false;
  archiveTarget = null;
};

window.openRestore = function(id) { restoreTarget = id; openModal('restoreModal'); };

window.confirmRestore = async function() {
  if (!restoreTarget) return;
  const btn = document.getElementById('confirmRestoreBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Restoring...';
  btn.disabled  = true;
  try {
    await updateDoc(doc(db, "inquiries", restoreTarget), { archived: false });
    showToast('Inquiry restored!', 'success');
    switchView('active', document.querySelector('.ftab'));
  } catch (err) { showToast('Failed to restore.', 'error'); }
  closeModal('restoreModal');
  btn.innerHTML = '<i class="fas fa-undo"></i> Restore';
  btn.disabled  = false;
  restoreTarget = null;
};

window.openDelete = function(id) { deleteTarget = id; openModal('deleteModal'); };

window.confirmDelete = async function() {
  if (!deleteTarget) return;
  const btn = document.getElementById('confirmDeleteBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
  btn.disabled  = true;
  try {
    await deleteDoc(doc(db, "inquiries", deleteTarget));
    showToast('Inquiry permanently deleted.', 'success');
  } catch (err) { showToast('Failed to delete.', 'error'); }
  closeModal('deleteModal');
  btn.innerHTML = '<i class="fas fa-trash"></i> Delete Forever';
  btn.disabled  = false;
  deleteTarget  = null;
};

// ── DETAIL MODAL ──────────────────────────────────────────────
window.openDetail = async function(id) {
  const source = [...allInquiries, ...allArchived];
  let inq;
  try {
    const snap = await getDoc(doc(db, "inquiries", id));
    if (!snap.exists()) { showToast('Inquiry not found.', 'error'); return; }
    inq = { id: snap.id, ...snap.data() };
  } catch { inq = source.find(i => i.id === id); if (!inq) return; }

  const status     = inq.status || 'pending';
  const isArchived = !!inq.archived;

  document.getElementById('modalOrderId').textContent = inq.orderId || inq.id;
  const badge = document.getElementById('modalStatusBadge');
  badge.textContent = status; badge.className = `status-badge ${status}`;

  const itemsHtml = (inq.items||[]).map(item =>
    `<tr><td>${item.qty}×</td><td>${item.name}</td><td style="text-align:right;font-weight:700;">₱${((item.price||0)*(item.qty||0)).toLocaleString()}</td></tr>`
  ).join('') || '<tr><td colspan="3" style="color:var(--text-grey);">No items recorded</td></tr>';

  const orderDate   = inq.orderDate ? new Date(inq.orderDate+'T00:00:00').toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '—';
  const submittedAt = inq.date ? new Date(inq.date).toLocaleString('en-PH') : '—';

  // ✅ STATUS ONLY — no action buttons at the bottom
  document.getElementById('detailModalBody').innerHTML = `
    ${isArchived ? `<div class="archive-banner"><i class="fas fa-archive"></i> This inquiry is archived. <button class="inline-restore" onclick="closeModal('detailModal'); openRestore('${inq.id}')">Restore it</button></div>` : ''}
    <div class="detail-status-bar">
      <span class="status-bar-label"><i class="fas fa-tag"></i> Status</span>
      <select class="status-select-lg" onchange="quickStatusUpdate('${inq.id}', this.value)" ${isArchived?'disabled':''}>
        <option value="pending"   ${status==='pending'   ?'selected':''}>🕐 Pending</option>
        <option value="confirmed" ${status==='confirmed' ?'selected':''}>✅ Confirmed</option>
        <option value="ready"     ${status==='ready'     ?'selected':''}>📦 Ready / Fulfilled</option>
        <option value="cancelled" ${status==='cancelled' ?'selected':''}>❌ Cancelled</option>
      </select>
    </div>
    <div class="detail-grid">
      <div class="detail-block">
        <h4><i class="fas fa-user"></i> Customer Info</h4>
        <div class="detail-row"><span class="dl">Name</span>   <span class="dv">${inq.customer||'—'}</span></div>
        <div class="detail-row"><span class="dl">Email</span>  <span class="dv">${inq.email||'—'}</span></div>
        <div class="detail-row"><span class="dl">Phone</span>  <span class="dv">${inq.phone||'—'}</span></div>
        <div class="detail-row"><span class="dl">Address</span><span class="dv">${inq.address||'—'}</span></div>
        <div class="detail-row"><span class="dl">Source</span> <span class="dv">${inq.source==='landing_page'?'🌐 Website':(inq.source||'—')}</span></div>
      </div>
      <div class="detail-block">
        <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
        <div class="detail-row"><span class="dl">Order Date</span><span class="dv">${orderDate}</span></div>
        <div class="detail-row"><span class="dl">Time</span>      <span class="dv">${inq.orderTime?formatTime(inq.orderTime):'—'}</span></div>
        <div class="detail-row"><span class="dl">Submitted</span> <span class="dv">${submittedAt}</span></div>
      </div>
    </div>
    ${inq.notes ? `<div class="notes-section"><h4><i class="fas fa-sticky-note"></i> Special Instructions</h4><p>${inq.notes}</p></div>` : ''}
    <div class="detail-block" style="margin-bottom:0;">
      <h4><i class="fas fa-shopping-basket"></i> Order Items</h4>
      <table class="items-table">
        <thead><tr><th>Qty</th><th>Item</th><th style="text-align:right;">Subtotal</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div class="items-total"><span>Total Amount</span><span>₱${(inq.total||0).toLocaleString()}</span></div>
    </div>`;

  openModal('detailModal');
};

// ── REPLY MODAL ───────────────────────────────────────────────
window.openReply = function(id) {
  const inq = allInquiries.find(i => i.id === id);
  if (!inq) return;
  document.getElementById('replyRecipient').textContent = `To: ${inq.customer} (${inq.email||inq.phone||'—'})`;
  document.getElementById('replyTo').value      = inq.email || '';
  document.getElementById('replySubject').value = `Re: Your Order Inquiry ${inq.orderId||inq.id} — ${storeInfo.name}`;
  document.getElementById('replyMessage').value = '';
  document.getElementById('smsPhone').textContent = inq.phone || '—';
  document.getElementById('smsMessage').value     = fillTemplate(QUICK_REPLIES[0].text, inq);
  const chips = document.getElementById('qrChips');
  chips.innerHTML = '';
  QUICK_REPLIES.forEach(qr => {
    const chip = document.createElement('button');
    chip.className = 'qr-chip'; chip.textContent = qr.label;
    chip.onclick = () => {
      const f = fillTemplate(qr.text, inq);
      document.getElementById('replyMessage').value = f;
      document.getElementById('smsMessage').value   = f;
    };
    chips.appendChild(chip);
  });
  switchReplyTab('email', document.querySelector('.rtab'));
  openModal('replyModal');
};

window.switchReplyTab = function(tab, btn) {
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('replyEmailSection').style.display = tab==='email'?'block':'none';
  document.getElementById('replySmsSection').style.display   = tab==='sms'  ?'block':'none';
};

window.sendEmailReply = function() {
  const to=document.getElementById('replyTo').value.trim();
  const subject=encodeURIComponent(document.getElementById('replySubject').value);
  const body=encodeURIComponent(document.getElementById('replyMessage').value);
  if (!to)   { showToast('No email address!', 'error'); return; }
  if (!body) { showToast('Write a message first!', 'error'); return; }
  window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;
  showToast('Opening email client...', 'info');
  closeModal('replyModal');
};

window.copySmsMessage = function() {
  const msg=document.getElementById('smsMessage').value;
  if (!msg) { showToast('Nothing to copy.', 'error'); return; }
  navigator.clipboard.writeText(msg)
    .then(()=>{ showToast('Copied!', 'success'); closeModal('replyModal'); })
    .catch(()=> showToast('Could not copy — copy manually.', 'error'));
};

function fillTemplate(t, inq) {
  return t
    .replace(/{customer}/g,  inq.customer||'')
    .replace(/{orderId}/g,   inq.orderId||inq.id||'')
    .replace(/{orderDate}/g, inq.orderDate||'')
    .replace(/{orderTime}/g, inq.orderTime?formatTime(inq.orderTime):'')
    .replace(/{total}/g,     `₱${(inq.total||0).toLocaleString()}`)
    .replace(/{storeName}/g, storeInfo.name)
    .replace(/{storePhone}/g,storeInfo.phone||'')
    .replace(/{storeEmail}/g,storeInfo.email||'');
}

// ── PRINT ─────────────────────────────────────────────────────
window.printInquiry = function(id) {
  const inq = [...allInquiries,...allArchived].find(i=>i.id===id);
  if (!inq) return;
  const w = window.open('','_blank','width=700,height=800');
  const rows = (inq.items||[]).map(i=>`<tr><td>${i.qty}×</td><td>${i.name}</td><td>₱${((i.price||0)*(i.qty||0)).toLocaleString()}</td></tr>`).join('');
  w.document.write(`<!DOCTYPE html><html><head><title>Inquiry ${inq.orderId||inq.id}</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#1a2b4c;}h1{font-size:22px;color:#ff4e00;margin-bottom:4px;}
  h2{font-size:13px;font-weight:700;border-bottom:2px solid #eee;padding-bottom:6px;margin:20px 0 10px;text-transform:uppercase;letter-spacing:.5px;color:#8d97ad;}
  table{width:100%;border-collapse:collapse;}td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee;font-size:13px;}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#e3f2fd;color:#1565c0;}
  .total{font-size:16px;font-weight:800;color:#ff4e00;}footer{margin-top:40px;font-size:11px;color:#8d97ad;border-top:1px solid #eee;padding-top:12px;}</style>
  </head><body>
  <h1>${storeInfo.name}</h1>
  <p style="color:#8d97ad;font-size:12px;">${[storeInfo.address,storeInfo.phone,storeInfo.email].filter(Boolean).join(' · ')}</p>
  <h2>Order Info</h2>
  <table>
    <tr><td><strong>Order ID</strong></td><td>${inq.orderId||inq.id}</td></tr>
    <tr><td><strong>Status</strong></td><td><span class="badge">${inq.status||'pending'}</span></td></tr>
    <tr><td><strong>Order Date</strong></td><td>${inq.orderDate||'—'} ${inq.orderTime?'at '+formatTime(inq.orderTime):''}</td></tr>
    <tr><td><strong>Submitted</strong></td><td>${inq.date?new Date(inq.date).toLocaleString():'—'}</td></tr>
  </table>
  <h2>Customer</h2>
  <table>
    <tr><td><strong>Name</strong></td>   <td>${inq.customer||'—'}</td></tr>
    <tr><td><strong>Email</strong></td>  <td>${inq.email||'—'}</td></tr>
    <tr><td><strong>Phone</strong></td>  <td>${inq.phone||'—'}</td></tr>
    <tr><td><strong>Address</strong></td><td>${inq.address||'—'}</td></tr>
  </table>
  <h2>Items</h2>
  <table><thead><tr><th>Qty</th><th>Item</th><th>Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="total" style="margin-top:12px;text-align:right;">Total: ₱${(inq.total||0).toLocaleString()}</p>
  ${inq.notes?`<h2>Notes</h2><p style="font-size:13px;">${inq.notes}</p>`:''}
  <footer>Printed on ${new Date().toLocaleString()} · ${storeInfo.name}</footer>
  <script>window.print();<\/script></body></html>`);
  w.document.close();
};

// ── EXPORT CSV ────────────────────────────────────────────────
window.exportCSV = function() {
  if (!filtered.length) { showToast('No data to export.', 'error'); return; }
  const rows = [['Order ID','Customer','Email','Phone','Address','Inquiry Date','Order Date','Order Time','Items','Total','Status','Archived','Notes']];
  filtered.forEach(i => rows.push([
    i.orderId||i.id, i.customer||'', i.email||'', i.phone||'', i.address||'',
    i.date?new Date(i.date).toLocaleString():'', i.orderDate||'',
    i.orderTime?formatTime(i.orderTime):'',
    (i.items||[]).map(x=>`${x.qty}x ${x.name}`).join(' | '),
    i.total||0, i.status||'', i.archived?'Yes':'No', (i.notes||'').replace(/,/g,';')
  ]));
  const csv=rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download=`inquiries-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  showToast(`Exported ${filtered.length} rows.`, 'success');
};

// ── MISC ──────────────────────────────────────────────────────
window.toggleSelectAll = cb => document.querySelectorAll('.row-check').forEach(c => c.checked=cb.checked);

window.toggleSidebar = function() {
  const sidebar  = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const overlay  = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    const isOpen = sidebar?.classList.contains('mobile-open') || sidebar?.classList.contains('active');
    sidebar?.classList.toggle('mobile-open', !isOpen);
    sidebar?.classList.toggle('active', !isOpen);
    overlay?.classList.toggle('show', !isOpen);
    overlay?.classList.toggle('active', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  } else {
    sidebar?.classList.toggle('collapsed');
  }
};

window.openMobileSidebar = function() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
  sidebar?.classList.add('mobile-open','active');
  overlay?.classList.add('show','active');
  document.body.style.overflow = 'hidden';
};

window.closeSidebarMobile = function() {
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');
  sidebar?.classList.remove('mobile-open','active');
  overlay?.classList.remove('show','active');
  document.body.style.overflow = '';
};

function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow='hidden'; }
window.closeModal = id  => { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; };
document.querySelectorAll('.modal-overlay').forEach(m =>
  m.addEventListener('click', e => { if (e.target===m) window.closeModal(m.id); })
);

window.showToast = function(msg, type='success') {
  const c = document.getElementById('toastContainer');
  const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type]||icons.success}"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); }, 3000);
};

function timeAgo(date) {
  if (!(date instanceof Date)||isNaN(date)) return '—';
  const m=Math.floor((Date.now()-date.getTime())/60000);
  if (m<1)  return 'Just now';
  if (m<60) return `${m}m ago`;
  const h=Math.floor(m/60);
  if (h<24) return `${h}h ago`;
  const d=Math.floor(h/24);
  if (d<7)  return `${d}d ago`;
  return date.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
}
function formatTime(t) {
  if (!t||typeof t!=='string') return '';
  const [h,m]=t.split(':'), hr=parseInt(h,10);
  return `${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;
}
function avatarColor(name) {
  const p=['#1a2b4c','#ff4e00','#1976d2','#2e7d32','#7b1fa2','#c62828','#f57f17','#0288d1'];
  let hash=0; for (const c of (name||'')) hash=(hash*31+c.charCodeAt(0))&0xffffffff;
  return p[Math.abs(hash)%p.length];
}

document.addEventListener('DOMContentLoaded', () => {
  const statMap = [
    { id: 'statTotal',     filter: 'all'       },
    { id: 'statPending',   filter: 'pending'   },
    { id: 'statConfirmed', filter: 'confirmed' },
    { id: 'statReady',     filter: 'ready'     },
    { id: 'statArchived',  filter: 'archive'   },
  ];
  statMap.forEach(({ id, filter }) => {
    const el = document.getElementById(id)?.closest('.stat-card');
    if (!el) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      if (filter === 'archive') {
        const archiveBtn = document.querySelector('.ftab-archive');
        switchView('archive', archiveBtn);
      } else {
        if (currentView === 'archive') switchView('active', document.querySelector('.ftab'));
        const btn = [...document.querySelectorAll('.ftab')].find(b =>
          b.getAttribute('onclick')?.includes(`'${filter}'`) || (filter === 'all' && b.textContent.trim() === 'All')
        );
        setFilter(filter, btn);
      }
    });
  });
});