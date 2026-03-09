


// // import { 
// //     db, collection, query, onSnapshot, doc, updateDoc, getDoc, orderBy 
// // } from './firebase.js';

// // let allTransactions = [];
// // let volumeChartInstance = null;
// // let methodChartInstance = null;
// // let currentTransactionId = null; 
// // let pendingVoidId = null; 

// // document.addEventListener('DOMContentLoaded', () => {
// //     // 1. Initialize UI
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
// //     const savedTheme = localStorage.getItem('theme');
// //     if (savedTheme === 'dark') document.body.classList.add('dark-mode');

// //     initCharts();
// //     setupFilters(); 

// //     // 2. FETCH DATA
// //     console.log("Starting data fetch...");
// //     const q = query(collection(db, "transactions"), orderBy("date", "desc")); 
    
// //     onSnapshot(q, (snapshot) => {
// //         allTransactions = [];
// //         snapshot.forEach((doc) => {
// //             const data = doc.data();
            
// //             // Fix Date Logic
// //             let cleanDate;
// //             if (data.date && typeof data.date.toDate === 'function') {
// //                 cleanDate = data.date.toDate(); 
// //             } else {
// //                 cleanDate = new Date(data.date); 
// //             }

// //             // Fix Total Logic
// //             const cleanTotal = data.total || data.totalAmount || data.subtotal || 0;

// //             allTransactions.push({ 
// //                 id: doc.id, 
// //                 ...data, 
// //                 dateObj: cleanDate,
// //                 finalTotal: cleanTotal 
// //             });
// //         });
        
// //         console.log("Data loaded:", allTransactions.length);
// //         applyFilters(); 
// //     });
// // });

// // // ==========================================
// // //  UI HELPERS (TOAST & CONFIRM)
// // // ==========================================

// // function showToast(message, type = 'success') {
// //     const container = document.getElementById('toast-container');
// //     if(!container) return;

// //     const toast = document.createElement('div');
// //     toast.className = `toast ${type}`;
    
// //     let icon = 'check-circle';
// //     if(type === 'error') icon = 'times-circle';
// //     if(type === 'warning') icon = 'exclamation-triangle';

// //     toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
    
// //     container.appendChild(toast);
// //     setTimeout(() => toast.classList.add('show'), 10);
// //     setTimeout(() => {
// //         toast.style.opacity = '0';
// //         setTimeout(() => toast.remove(), 300);
// //     }, 3000);
// // }

// // // Global Confirm Modal Logic
// // window.openConfirmModal = function(msg, actionCallback) {
// //     const modal = document.getElementById('confirmModal');
// //     const msgEl = document.getElementById('confirmMessage');
// //     const btn = document.getElementById('btnConfirmAction');

// //     if(msgEl) msgEl.innerText = msg;
// //     if(modal) modal.style.display = 'flex';

// //     // Remove old listeners
// //     const newBtn = btn.cloneNode(true);
// //     btn.parentNode.replaceChild(newBtn, btn);

// //     newBtn.addEventListener('click', async () => {
// //         setBtnLoading(newBtn, true);
// //         await actionCallback();
// //         setBtnLoading(newBtn, false);
// //         window.closeConfirmModal();
// //     });
// // };

// // window.closeConfirmModal = function() {
// //     document.getElementById('confirmModal').style.display = 'none';
// // };

// // // ==========================================
// // //  FILTER LOGIC
// // // ==========================================

// // function setupFilters() {
// //     const applyBtn = document.getElementById('applyFilterBtn');
// //     const resetBtn = document.getElementById('resetFilterBtn');
    
// //     if(applyBtn) applyBtn.addEventListener('click', applyFilters);
// //     if(resetBtn) resetBtn.addEventListener('click', resetFilters);
    
// //     const search = document.getElementById('searchInput');
// //     const status = document.getElementById('statusFilter');
// //     const method = document.getElementById('methodFilter');

// //     if(search) search.addEventListener('keyup', applyFilters);
// //     if(status) status.addEventListener('change', applyFilters);
// //     if(method) method.addEventListener('change', applyFilters);
// // }

// // function resetFilters() {
// //     document.getElementById('searchInput').value = '';
// //     document.getElementById('statusFilter').value = 'all';
// //     document.getElementById('methodFilter').value = 'all';
// //     document.getElementById('startDate').value = '';
// //     document.getElementById('endDate').value = '';
// //     applyFilters();
// // }

// // function applyFilters() {
// //     const term = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
// //     const status = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all';
// //     const method = document.getElementById('methodFilter') ? document.getElementById('methodFilter').value : 'all';
// //     const startVal = document.getElementById('startDate') ? document.getElementById('startDate').value : '';
// //     const endVal = document.getElementById('endDate') ? document.getElementById('endDate').value : '';

// //     const filtered = allTransactions.filter(t => {
// //         // Search
// //         const orderId = (t.orderId || '').toLowerCase();
// //         const custName = (t.customer || '').toLowerCase();
// //         const matchesTerm = orderId.includes(term) || custName.includes(term);

// //         // Status (Smart Check)
// //         let matchesStatus = true;
// //         if (status !== 'all') {
// //             const dbStatus = (t.status || '').toLowerCase();
// //             const filterStatus = status.toLowerCase();
// //             if (filterStatus === 'paid') {
// //                 matchesStatus = (dbStatus === 'paid' || dbStatus === 'completed');
// //             } else {
// //                 matchesStatus = (dbStatus === filterStatus);
// //             }
// //         }

// //         // Method
// //         const tMethod = (t.method || t.paymentMethod || '').toLowerCase();
// //         const matchesMethod = (method === 'all') ? true : tMethod.includes(method.toLowerCase());

// //         // Date
// //         let matchesDate = true;
// //         if (startVal || endVal) {
// //             const tDate = t.dateObj; 
// //             if (startVal) {
// //                 const startDate = new Date(startVal);
// //                 startDate.setHours(0, 0, 0, 0);
// //                 if (tDate < startDate) matchesDate = false;
// //             }
// //             if (endVal) {
// //                 const endDate = new Date(endVal);
// //                 endDate.setHours(23, 59, 59, 999);
// //                 if (tDate > endDate) matchesDate = false;
// //             }
// //         }
// //         return matchesTerm && matchesStatus && matchesMethod && matchesDate;
// //     });
// //     updateDashboard(filtered);
// // }

// // // ==========================================
// // //  DASHBOARD & TABLE
// // // ==========================================

// // function updateDashboard(data) {
// //     const activeData = data.filter(t => t.status !== 'Void');
// //     const totalSales = activeData.reduce((sum, t) => sum + (Number(t.finalTotal) || 0), 0);
// //     const totalCount = activeData.length;
// //     const avgOrder = totalCount > 0 ? totalSales / totalCount : 0;

// //     const salesEl = document.getElementById('totalSalesDisplay');
// //     const countEl = document.getElementById('totalCountDisplay');
// //     const avgEl = document.getElementById('avgOrderDisplay');

// //     if(salesEl) salesEl.innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
// //     if(countEl) countEl.innerText = totalCount;
// //     if(avgEl) avgEl.innerText = '₱' + avgOrder.toLocaleString(undefined, {minimumFractionDigits: 2});

// //     updateCharts(activeData); 
// //     renderTable(data); 
// // }

// // function renderTable(data) {
// //     const tbody = document.getElementById('transactionsTableBody');
// //     if(!tbody) return;
// //     tbody.innerHTML = '';
    
// //     document.getElementById('showingText').innerText = `Showing ${data.length} entries`;

// //     if(data.length === 0) {
// //         tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No transactions found</td></tr>`;
// //         return;
// //     }

// //     data.forEach(t => {
// //         const statusText = t.status || 'Completed';
// //         let badgeStyle = 'background:#d1fae5; color:#065f46;'; 
// //         if(statusText === 'Partial') badgeStyle = 'background:#fef3c7; color:#92400e;'; 
// //         if(statusText === 'Void') badgeStyle = 'background:#fee2e2; color:#b91c1c;'; 

// //         const dateStr = t.dateObj.toLocaleDateString();
// //         const timeStr = t.dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

// //         const row = document.createElement('tr');
// //         row.innerHTML = `
// //             <td><span class="id-pill" style="font-weight:600;">${t.orderId}</span></td>
// //             <td>${dateStr} <div style="font-size:11px; color:var(--text-grey);">${timeStr}</div></td>
// //             <td>${t.customer || 'Walk-in'}</td>
// //             <td style="font-weight: 600;">₱${Number(t.finalTotal).toLocaleString()}</td>
// //             <td><span style="padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; ${badgeStyle}">${statusText}</span></td>
// //             <td style="text-transform: capitalize;">${t.method || t.paymentMethod || '-'}</td>
// //             <td>
// //                 <button class="action-btn" onclick="window.openDetails('${t.id}')" style="background:none; border:none; cursor:pointer; color:var(--text-grey); font-size: 16px;">
// //                     <i class="fas fa-eye"></i>
// //                 </button>
// //             </td>
// //         `;
// //         tbody.appendChild(row);
// //     });
// // }

// // // ==========================================
// // //  CHARTS (POPPING EFFECT ADDED)
// // // ==========================================

// // function initCharts() {
// //     const ctxVol = document.getElementById('volumeChart');
// //     if(ctxVol) {
// //         volumeChartInstance = new Chart(ctxVol.getContext('2d'), {
// //             type: 'bar',
// //             data: { labels: [], datasets: [{ label: 'Sales (₱)', data: [], backgroundColor: '#ff4e00', borderRadius: 4 }] },
// //             options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display: false} }, scales: { y: { beginAtZero: true } } }
// //         });
// //     }
    
// //     // --- THIS IS THE UPDATED CHART ---
// //     const ctxMethod = document.getElementById('methodChart');
// //     if(ctxMethod) {
// //         methodChartInstance = new Chart(ctxMethod.getContext('2d'), {
// //             type: 'doughnut', 
// //             data: { 
// //                 labels: ['Cash', 'GCash', 'Bank'], 
// //                 datasets: [{ 
// //                     data: [0, 0, 0], 
// //                     backgroundColor: ['#ed9119', '#1cc88a', '#36b9cc'],
// //                     hoverOffset: 25, // <--- MAKES IT POP
// //                     borderWidth: 2,
// //                     borderColor: '#ffffff'
// //                 }] 
// //             },
// //             options: { 
// //                 responsive: true, 
// //                 maintainAspectRatio: false,
// //                 layout: {
// //                     padding: 20 // <--- Prevents cropping when popped
// //                 },
// //                 plugins: {
// //                     legend: {
// //                         position: 'bottom',
// //                         labels: { padding: 20 }
// //                     }
// //                 }
// //             }
// //         });
// //     }
// // }

// // function updateCharts(data) {
// //     if(!volumeChartInstance || !methodChartInstance) return;
// //     let cash = 0, gcash = 0, bank = 0;
// //     data.forEach(t => {
// //         const m = (t.method || t.paymentMethod || '').toLowerCase();
// //         if(m.includes('gcash')) gcash++;
// //         else if(m.includes('bank')) bank++;
// //         else cash++;
// //     });
// //     methodChartInstance.data.datasets[0].data = [cash, gcash, bank];
// //     methodChartInstance.update();

// //     const chartData = [...data].reverse().slice(-10);
// //     volumeChartInstance.data.labels = chartData.map(t => t.dateObj.toLocaleDateString(undefined, {month:'short', day:'numeric'}));
// //     volumeChartInstance.data.datasets[0].data = chartData.map(t => t.finalTotal);
// //     volumeChartInstance.update();
// // }

// // // ==========================================
// // //  MODALS
// // // ==========================================

// // window.openDetails = function(id) {
// //     currentTransactionId = id;
// //     const t = allTransactions.find(x => x.id === id);
// //     if(!t) return;
    
// //     const modal = document.getElementById('detailsModal');
// //     const body = document.getElementById('modalBody');
// //     const footer = document.querySelector('#detailsModal .modal-footer');

// //     let itemsHtml = '';
// //     if(t.items) t.items.forEach(item => {
// //         itemsHtml += `
// //             <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; border-bottom:1px dashed #eee; padding-bottom:8px;">
// //                 <span>${item.qty}x ${item.name}</span>
// //                 <span>₱${(item.price * item.qty).toLocaleString()}</span>
// //             </div>`;
// //     });

// //     body.innerHTML = `
// //         <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
// //             <div><p class="label">Order ID</p><p class="value">${t.orderId}</p></div>
// //             <div><p class="label">Date</p><p class="value">${t.dateObj.toLocaleString()}</p></div>
// //             <div><p class="label">Customer</p><p class="value">${t.customer || 'Walk-in'}</p></div>
// //             <div><p class="label">Method</p><p class="value" style="text-transform:capitalize;">${t.method || t.paymentMethod || '-'}</p></div>
// //         </div>
        
// //         <div style="margin-bottom: 15px;">
// //              <p class="label">Status</p>
// //              <span style="font-weight:bold; font-size: 16px; color: var(--primary);">${t.status || 'Completed'}</span>
// //         </div>

// //         <h4 style="margin-bottom:10px; color:var(--navy);">Items</h4>
// //         <div style="background: #f8f9fc; padding: 15px; border-radius: 8px;">
// //             ${itemsHtml}
// //             <div style="display:flex; justify-content:space-between; margin-top:10px; font-weight:700; font-size:1.1em;">
// //                 <span>Total Amount</span>
// //                 <span>₱${Number(t.finalTotal).toLocaleString()}</span>
// //             </div>
// //              <div style="display:flex; justify-content:space-between; margin-top:5px; color:#e74a3b; display:${(t.balance > 0 && t.status !== 'Void') ? 'flex' : 'none'}">
// //                 <span>Balance Due</span>
// //                 <span>₱${Number(t.balance || 0).toLocaleString()}</span>
// //             </div>
// //         </div>
// //     `;

// //     let left = `<button class="btn-secondary" onclick="closeDetailsModal()">Close</button>`;
// //     if (t.status !== 'Void') left += `<button class="btn-secondary" onclick="window.printTransaction()"><i class="fas fa-print"></i> Print</button>`;
    
// //     let right = '';
// //     if (t.status === 'Partial' && t.balance > 0) right += `<button class="btn-settle" onclick="window.openSettleModal()">Settle Balance</button>`;
// //     if (t.status !== 'Void') right += `<button class="btn-void" onclick="window.voidTransaction('${t.id}')">Void Order</button>`;

// //     footer.innerHTML = `<div class="footer-group">${left}</div><div class="footer-group">${right}</div>`;
// //     modal.style.display = 'flex';
// // };

// // window.closeDetailsModal = function() { document.getElementById('detailsModal').style.display = 'none'; };
// // window.printTransaction = function() { window.print(); };

// // // ==========================================
// // //  SETTLE & VOID (WITH LOADING & TOASTS)
// // // ==========================================

// // window.openSettleModal = function() {
// //     const t = allTransactions.find(x => x.id === currentTransactionId);
// //     if(!t) return;
// //     document.getElementById('settleBalanceDisplay').innerText = '₱' + Number(t.balance).toLocaleString();
// //     document.getElementById('settleAmountInput').value = t.balance; 
// //     document.getElementById('settleModal').style.display = 'flex';
// // };

// // window.closeSettleModal = function() { document.getElementById('settleModal').style.display = 'none'; };

// // window.confirmSettlement = async function() {
// //     const btn = document.querySelector('#settleModal .btn-confirm');
// //     const t = allTransactions.find(x => x.id === currentTransactionId);
// //     if(!t) return;
// //     const amount = parseFloat(document.getElementById('settleAmountInput').value);
    
// //     if(isNaN(amount) || amount <= 0) { showToast("Invalid amount", "error"); return; }
// //     if(amount > t.balance) { showToast("Amount exceeds balance", "error"); return; }

// //     setBtnLoading(btn, true);

// //     try {
// //         const newBalance = t.balance - amount;
// //         const newStatus = newBalance <= 0 ? 'Completed' : 'Partial'; 
        
// //         await updateDoc(doc(db, "transactions", currentTransactionId), {
// //             balance: newBalance,
// //             cashReceived: (t.cashReceived || 0) + amount,
// //             status: newStatus
// //         });
        
// //         showToast("Payment Settled Successfully!", "success");
// //         closeSettleModal(); 
// //         closeDetailsModal();
// //     } catch(e) { 
// //         console.error(e); 
// //         showToast("Error updating payment", "error");
// //     } finally {
// //         setBtnLoading(btn, false);
// //     }
// // };

// // window.voidTransaction = async function(id) {
// //     pendingVoidId = id;
// //     window.openConfirmModal("Are you sure you want to VOID this order? Items will return to stock and sales will be deducted.", executeVoid);
// // };

// // async function executeVoid() {
// //     const id = pendingVoidId;
// //     const t = allTransactions.find(x => x.id === id);
// //     if(!t) return;

// //     try {
// //         if(t.items && t.items.length > 0) {
// //             for (let item of t.items) {
// //                 const productRef = doc(db, "products", item.id);
// //                 const productSnap = await getDoc(productRef);
// //                 if (productSnap.exists()) {
// //                     await updateDoc(productRef, { quantity: Number(productSnap.data().quantity || 0) + Number(item.qty || 0) });
// //                 }
// //             }
// //         }
// //         await updateDoc(doc(db, "transactions", id), { status: 'Void' });
        
// //         showToast("Order Voided Successfully", "success");
// //         closeDetailsModal(); 
// //     } catch(e) { 
// //         console.error(e); 
// //         showToast("Error voiding order", "error");
// //     }
// // }

// // function setBtnLoading(btn, isLoading) {
// //     if(!btn) return;
// //     if(isLoading) {
// //         btn.dataset.originalText = btn.innerHTML;
// //         btn.disabled = true;
// //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
// //     } else {
// //         btn.disabled = false;
// //         if(btn.dataset.originalText) {
// //             btn.innerHTML = btn.dataset.originalText;
// //         }
// //     }
// // }










// // import { 
// //     db, collection, query, onSnapshot 
// // } from './firebase.js';

// // let allTransactions = [];
// // let volumeChartInstance = null;
// // let methodChartInstance = null;

// // document.addEventListener('DOMContentLoaded', () => {
// //     // 1. Initialize Date & Theme
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
// //     const savedTheme = localStorage.getItem('theme');
// //     if (savedTheme === 'dark') document.body.classList.add('dark-mode');

// //     // 2. Setup UI
// //     initCharts();
// //     setupModal();
// //     setupFilters(); // <--- This now handles all your buttons

// //     // 3. FETCH DATA FROM 'transactions' collection
// //     console.log("Fetching data from: transactions");
// //     const q = query(collection(db, "transactions")); 
    
// //     onSnapshot(q, (snapshot) => {
// //         allTransactions = [];
// //         console.log(`Found ${snapshot.size} transactions.`); 

// //         snapshot.forEach((doc) => {
// //             const data = doc.data();
            
// //             // Handle Date (Timestamp or String)
// //             let txDate = new Date();
// //             if (data.date && data.date.toDate) {
// //                 txDate = data.date.toDate();
// //             } else if (data.date) {
// //                 txDate = new Date(data.date);
// //             }

// //             // --- DATA MAPPING ---
// //             const mappedTransaction = {
// //                 id: doc.id,
// //                 orderId: data.orderId || doc.id.substring(0,8),
// //                 date: txDate,
                
// //                 // Name
// //                 customerName: data.customer || 'Walk-in',
                
// //                 // Phone (Checks 'contact' first, then 'phone', then 'customerPhone')
// //                 customerPhone: data.contact || data.phone || data.customerPhone || '', 
                
// //                 // Money
// //                 totalAmount: parseFloat(data.total || 0), 
// //                 paymentMethod: data.method || 'Cash',
                
// //                 // Details
// //                 items: data.items || [],
// //                 status: data.status || 'Completed',
// //             };

// //             allTransactions.push(mappedTransaction);
// //         });

// //         // Sort by Date (Newest First)
// //         allTransactions.sort((a, b) => b.date - a.date);

// //         updateDashboard(allTransactions);

// //     }, (error) => {
// //         console.error("Error getting transactions:", error);
// //     });
// // });

// // function updateDashboard(data) {
// //     const tbody = document.getElementById('transactionsTableBody');
// //     tbody.innerHTML = '';

// //     if (data.length === 0) {
// //         tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 20px;">No transactions found.</td></tr>';
// //         document.getElementById('showingText').innerText = 'Showing 0 entries';
// //         // Optional: clear charts or show empty state
// //         return;
// //     }

// //     // Show first 15 entries (or all if you prefer)
// //     // const displayData = data.slice(0, 15); 
// //     const displayData = data; // Showing all filtered data for now

// //     displayData.forEach(t => {
// //         const dateStr = t.date.toLocaleDateString();
// //         const timeStr = t.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
// //         let itemsSummary = 'No items';
// //         if(t.items && t.items.length > 0) {
// //             itemsSummary = t.items.map(i => `${i.name} (x${i.qty})`).join(', ');
// //             if(itemsSummary.length > 25) itemsSummary = itemsSummary.substring(0, 25) + '...';
// //         }

// //         // Determine Status Color Class
// //         const statusClass = t.status.toLowerCase(); // 'completed', 'refunded', etc.

// //         const row = `
// //             <tr>
// //                 <td style="font-weight:600; color:#ff4e00;">${t.orderId}</td>
// //                 <td>${dateStr}<br><small style="color:#888">${timeStr}</small></td>
// //                 <td>
// //                     <div style="font-weight:600;">${t.customerName}</div>
// //                     <div style="font-size:12px; color:#666;">${t.customerPhone}</div>
// //                 </td>
// //                 <td style="font-size:13px; color:#555;">${itemsSummary}</td>
// //                 <td style="font-weight:700;">₱${t.totalAmount.toLocaleString()}</td>
// //                 <td><span style="background:#e3f2fd; color:#1976d2; padding:2px 8px; border-radius:4px; font-size:12px;">${t.paymentMethod}</span></td>
// //                 <td><span class="status ${statusClass}">${t.status}</span></td>
// //                 <td>
// //                     <button class="btn-action" onclick="window.viewDetails('${t.id}')"><i class="fas fa-eye"></i></button>
// //                 </td>
// //             </tr>
// //         `;
// //         tbody.innerHTML += row;
// //     });

// //     document.getElementById('showingText').innerText = `Showing ${displayData.length} entries`;
    
// //     // Update charts based on the filtered data
// //     updateCharts(data);
// // }

// // // --- FILTERS (FIXED) ---
// // function setupFilters() {
// //     const applyBtn = document.getElementById('applyFilterBtn');
// //     const resetBtn = document.getElementById('resetFilterBtn');

// //     // Apply Filter Logic
// //     if(applyBtn) {
// //         applyBtn.addEventListener('click', () => {
// //             // 1. Get Values from HTML Inputs
// //             const searchText = document.getElementById('searchInput').value.toLowerCase();
// //             const statusVal = document.getElementById('statusFilter').value;
// //             const methodVal = document.getElementById('methodFilter').value;
// //             const dateVal = document.getElementById('dateFilter').value; // Returns YYYY-MM-DD

// //             // 2. Filter the Master Array
// //             const filtered = allTransactions.filter(t => {
// //                 // Search: Check Order ID or Customer Name
// //                 const matchSearch = t.orderId.toLowerCase().includes(searchText) || 
// //                                     t.customerName.toLowerCase().includes(searchText);
                
// //                 // Status: Check exact match or "all"
// //                 const matchStatus = statusVal === 'all' || t.status.toLowerCase() === statusVal.toLowerCase();

// //                 // Method: Check if method string includes selection (e.g. 'gcash')
// //                 const matchMethod = methodVal === 'all' || t.paymentMethod.toLowerCase().includes(methodVal.toLowerCase());

// //                 // Date: Check if dates match (ignoring time)
// //                 let matchDate = true;
// //                 if(dateVal) {
// //                     const tDateStr = t.date.toISOString().split('T')[0]; // Convert transaction date to YYYY-MM-DD
// //                     matchDate = tDateStr === dateVal;
// //                 }

// //                 return matchSearch && matchStatus && matchMethod && matchDate;
// //             });

// //             // 3. Update the UI with filtered results
// //             updateDashboard(filtered);
// //         });
// //     }

// //     // Reset Logic
// //     if(resetBtn) {
// //         resetBtn.addEventListener('click', () => {
// //             document.getElementById('searchInput').value = '';
// //             document.getElementById('statusFilter').value = 'all';
// //             document.getElementById('methodFilter').value = 'all';
// //             document.getElementById('dateFilter').value = '';
            
// //             // Show everything again
// //             updateDashboard(allTransactions);
// //         });
// //     }
// // }

// // // --- MODAL (POP-UP) ---
// // window.viewDetails = function(id) {
// //     const t = allTransactions.find(x => x.id === id);
// //     if(!t) return;

// //     const modal = document.getElementById('detailsModal');
// //     const body = document.getElementById('modalBody');
    
// //     // Build Item List
// //     let itemsHtml = '<ul style="list-style:none; padding:10px; background:#f9f9f9; border-radius:8px; margin:10px 0;">';
// //     if(t.items) {
// //         t.items.forEach(i => {
// //             itemsHtml += `<li style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:13px;">
// //                 <span>${i.name} (x${i.qty})</span>
// //                 <span>₱${(i.price * i.qty).toLocaleString()}</span>
// //             </li>`;
// //         });
// //     }
// //     itemsHtml += '</ul>';

// //     // Build Body
// //     body.innerHTML = `
// //         <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
// //             <h2 style="color:#ff4e00; margin:0;">₱${t.totalAmount.toLocaleString()}</h2>
// //             <span class="status ${t.status.toLowerCase()}">${t.status}</span>
// //         </div>
// //         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; font-size:13px;">
// //             <div>
// //                 <label style="color:#888;">Order ID</label>
// //                 <div style="font-weight:600;">${t.orderId}</div>
// //             </div>
// //             <div>
// //                 <label style="color:#888;">Date</label>
// //                 <div style="font-weight:600;">${t.date.toLocaleString()}</div>
// //             </div>
// //             <div>
// //                 <label style="color:#888;">Customer</label>
// //                 <div style="font-weight:600;">${t.customerName}</div>
// //                 <div style="font-weight:600; color:#444;">${t.customerPhone || 'No Contact'}</div>
// //             </div>
// //             <div>
// //                 <label style="color:#888;">Payment</label>
// //                 <div style="font-weight:600;">${t.paymentMethod}</div>
// //             </div>
// //         </div>
// //         <hr style="margin:15px 0; border:0; border-top:1px dashed #ddd;">
// //         <label style="color:#888; font-size:13px;">Items</label>
// //         ${itemsHtml}
// //     `;

// //     // Footer Buttons
// //     const footer = modal.querySelector('.modal-footer');
// //     if (footer) {
// //         footer.innerHTML = `
// //             <button onclick="window.print()" style="padding:8px 16px; background:#ff4e00; color:white; border:none; border-radius:5px; cursor:pointer;">Print</button>
// //             <button onclick="document.getElementById('detailsModal').style.display='none'" style="padding:8px 16px; background:#eee; border:none; border-radius:5px; margin-left:10px; cursor:pointer;">Close</button>
// //         `;
// //     }

// //     modal.style.display = 'flex';
// // };

// // function setupModal() {
// //     const modal = document.getElementById('detailsModal');
// //     if(!modal) return;
    
// //     window.onclick = (e) => {
// //         if (e.target == modal) modal.style.display = 'none';
// //     };
    
// //     const closeBtn = modal.querySelector('.close-modal');
// //     if(closeBtn) {
// //         closeBtn.onclick = () => modal.style.display = 'none';
// //     }
// // }

// // // --- CHARTS ---
// // function initCharts() {
// //     const ctxVol = document.getElementById('volumeChart');
// //     if(ctxVol) {
// //         volumeChartInstance = new Chart(ctxVol.getContext('2d'), {
// // type: 'bar',
// //             data: { 
// //                 labels: [], 
// //                 datasets: [{ 
// //                     label: 'Sales', 
// //                     data: [], 
// //                     backgroundColor: '#ff4e00',
                    
// //                     /* --- ADD THIS FOR THE POP EFFECT --- */
// //                     hoverBackgroundColor: '#ff784e', // Lighter orange on hover
// //                     hoverBorderColor: '#ffffff',     // White border on hover
// //                     hoverBorderWidth: 3,             // Thickness of the border
// //                     borderRadius: 5,                 // Slightly round the corners
// //                     borderSkipped: false             // Border goes all the way around
// //                     /* ----------------------------------- */
// //                 }] 
// //             },
// //             options: { 
// //                 responsive: true, 
// //                 plugins: { 
// //                     legend: { display: false },
// //                     tooltip: {
// //                         // Makes the tooltip pop nicely too
// //                         backgroundColor: 'rgba(0, 0, 0, 0.8)', 
// //                         padding: 12,
// //                         cornerRadius: 8
// //                     }
// //                 },
// //                 // Makes the hover transition snappy
// //                 hover: {
// //                     mode: 'index',
// //                     intersect: false,
// //                     animationDuration: 200
// //                 }
// //             }
// //         });
// //     }

// //     const ctxMethod = document.getElementById('methodChart');
// //     if(ctxMethod) {
// //         methodChartInstance = new Chart(ctxMethod.getContext('2d'), {
// //             type: 'doughnut', 
// //             data: {
// //                 labels: ['Cash', 'GCash', 'Bank'],
// //                 datasets: [{
// //                     data: [0, 0, 0], // Initial empty data
// //                     backgroundColor: ['#ed9119', '#1cc88a', '#36b9cc'],
// //                     hoverOffset: 20, 
// //                     borderWidth: 1
// //                 }]
// //             },
// //             options: {
// //                 responsive: true,
// //                 maintainAspectRatio: false,
// //                 layout: {
// //                     padding: 20
// //                 }
// //             }
// //         });
// //     }
// // }

// // function updateCharts(data) {
// //     if(!volumeChartInstance || !methodChartInstance) return;

// //     // 1. Update Payment Methods
// //     let cash = 0, gcash = 0, bank = 0;
// //     data.forEach(t => {
// //         const m = (t.paymentMethod || '').toLowerCase();
// //         if(m.includes('gcash')) gcash++;
// //         else if(m.includes('bank')) bank++;
// //         else cash++;
// //     });
    
// //     methodChartInstance.data.datasets[0].data = [cash, gcash, bank];
// //     methodChartInstance.update();

// //     // 2. Update Volume (Recent 5)
// //     const recent = data.slice(0, 5).reverse();
// //     volumeChartInstance.data.labels = recent.map(t => t.orderId);
// //     volumeChartInstance.data.datasets[0].data = recent.map(t => t.totalAmount);
// //     volumeChartInstance.update();
// // }



// import { 
//     db, collection, query, onSnapshot, doc, updateDoc, getDoc, orderBy 
// } from './firebase.js';

// let allTransactions = [];
// let volumeChartInstance = null;
// let methodChartInstance = null;
// let currentTransactionId = null; 
// let pendingVoidId = null; 

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Initialize UI
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') document.body.classList.add('dark-mode');

//     initCharts();
//     setupFilters(); 

//     // 2. FETCH DATA
//     console.log("Starting data fetch...");
//     const q = query(collection(db, "transactions"), orderBy("date", "desc")); 
    
//     onSnapshot(q, (snapshot) => {
//         allTransactions = [];
//         snapshot.forEach((doc) => {
//             const data = doc.data();
            
//             // Fix Date Logic
//             let cleanDate;
//             if (data.date && typeof data.date.toDate === 'function') {
//                 cleanDate = data.date.toDate(); 
//             } else {
//                 cleanDate = new Date(data.date); 
//             }

//             // Fix Total Logic
//             const cleanTotal = data.total || data.totalAmount || data.subtotal || 0;

//             allTransactions.push({ 
//                 id: doc.id, 
//                 ...data, 
//                 dateObj: cleanDate,
//                 finalTotal: cleanTotal 
//             });
//         });
        
//         console.log("Data loaded:", allTransactions.length);
//         applyFilters(); 
//     });
// });

// // ==========================================
// //  UI HELPERS (TOAST & CONFIRM)
// // ==========================================

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     if(!container) return;

//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
    
//     let icon = 'check-circle';
//     if(type === 'error') icon = 'times-circle';
//     if(type === 'warning') icon = 'exclamation-triangle';

//     toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
    
//     container.appendChild(toast);
//     setTimeout(() => toast.classList.add('show'), 10);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }

// // Global Confirm Modal Logic
// window.openConfirmModal = function(msg, actionCallback) {
//     const modal = document.getElementById('confirmModal');
//     const msgEl = document.getElementById('confirmMessage');
//     const btn = document.getElementById('btnConfirmAction');

//     if(msgEl) msgEl.innerText = msg;
//     if(modal) modal.style.display = 'flex';

//     // Remove old listeners
//     const newBtn = btn.cloneNode(true);
//     btn.parentNode.replaceChild(newBtn, btn);

//     newBtn.addEventListener('click', async () => {
//         setBtnLoading(newBtn, true);
//         await actionCallback();
//         setBtnLoading(newBtn, false);
//         window.closeConfirmModal();
//     });
// };

// window.closeConfirmModal = function() {
//     document.getElementById('confirmModal').style.display = 'none';
// };

// // ==========================================
// //  FILTER LOGIC
// // ==========================================

// function setupFilters() {
//     const applyBtn = document.getElementById('applyFilterBtn');
//     const resetBtn = document.getElementById('resetFilterBtn');
    
//     if(applyBtn) applyBtn.addEventListener('click', applyFilters);
//     if(resetBtn) resetBtn.addEventListener('click', resetFilters);
    
//     const search = document.getElementById('searchInput');
//     const status = document.getElementById('statusFilter');
//     const method = document.getElementById('methodFilter');

//     if(search) search.addEventListener('keyup', applyFilters);
//     if(status) status.addEventListener('change', applyFilters);
//     if(method) method.addEventListener('change', applyFilters);
// }

// function resetFilters() {
//     document.getElementById('searchInput').value = '';
//     document.getElementById('statusFilter').value = 'all';
//     document.getElementById('methodFilter').value = 'all';
//     document.getElementById('startDate').value = '';
//     document.getElementById('endDate').value = '';
//     applyFilters();
// }

// function applyFilters() {
//     const term = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
//     const status = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all';
//     const method = document.getElementById('methodFilter') ? document.getElementById('methodFilter').value : 'all';
//     const startVal = document.getElementById('startDate') ? document.getElementById('startDate').value : '';
//     const endVal = document.getElementById('endDate') ? document.getElementById('endDate').value : '';

//     const filtered = allTransactions.filter(t => {
//         // Search
//         const orderId = (t.orderId || '').toLowerCase();
//         const custName = (t.customer || '').toLowerCase();
//         const matchesTerm = orderId.includes(term) || custName.includes(term);

//         // Status (Smart Check)
//         let matchesStatus = true;
//         if (status !== 'all') {
//             const dbStatus = (t.status || '').toLowerCase();
//             const filterStatus = status.toLowerCase();
//             if (filterStatus === 'paid') {
//                 matchesStatus = (dbStatus === 'paid' || dbStatus === 'completed');
//             } else {
//                 matchesStatus = (dbStatus === filterStatus);
//             }
//         }

//         // Method
//         const tMethod = (t.method || t.paymentMethod || '').toLowerCase();
//         const matchesMethod = (method === 'all') ? true : tMethod.includes(method.toLowerCase());

//         // Date
//         let matchesDate = true;
//         if (startVal || endVal) {
//             const tDate = t.dateObj; 
//             if (startVal) {
//                 const startDate = new Date(startVal);
//                 startDate.setHours(0, 0, 0, 0);
//                 if (tDate < startDate) matchesDate = false;
//             }
//             if (endVal) {
//                 const endDate = new Date(endVal);
//                 endDate.setHours(23, 59, 59, 999);
//                 if (tDate > endDate) matchesDate = false;
//             }
//         }
//         return matchesTerm && matchesStatus && matchesMethod && matchesDate;
//     });
//     updateDashboard(filtered);
// }

// // ==========================================
// //  DASHBOARD & TABLE
// // ==========================================

// function updateDashboard(data) {
//     const activeData = data.filter(t => t.status !== 'Void');
//     const totalSales = activeData.reduce((sum, t) => sum + (Number(t.finalTotal) || 0), 0);
//     const totalCount = activeData.length;
//     const avgOrder = totalCount > 0 ? totalSales / totalCount : 0;

//     const salesEl = document.getElementById('totalSalesDisplay');
//     const countEl = document.getElementById('totalCountDisplay');
//     const avgEl = document.getElementById('avgOrderDisplay');

//     if(salesEl) salesEl.innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
//     if(countEl) countEl.innerText = totalCount;
//     if(avgEl) avgEl.innerText = '₱' + avgOrder.toLocaleString(undefined, {minimumFractionDigits: 2});

//     updateCharts(activeData); 
//     renderTable(data); 
// }

// function renderTable(data) {
//     const tbody = document.getElementById('transactionsTableBody');
//     if(!tbody) return;
//     tbody.innerHTML = '';
    
//     document.getElementById('showingText').innerText = `Showing ${data.length} entries`;

//     if(data.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No transactions found</td></tr>`;
//         return;
//     }

//     data.forEach(t => {
//         const statusText = t.status || 'Completed';
//         let badgeStyle = 'background:#d1fae5; color:#065f46;'; 
//         if(statusText === 'Partial') badgeStyle = 'background:#fef3c7; color:#92400e;'; 
//         if(statusText === 'Void') badgeStyle = 'background:#fee2e2; color:#b91c1c;'; 

//         const dateStr = t.dateObj.toLocaleDateString();
//         const timeStr = t.dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td><span class="id-pill" style="font-weight:600;">${t.orderId}</span></td>
//             <td>${dateStr} <div style="font-size:11px; color:var(--text-grey);">${timeStr}</div></td>
//             <td>${t.customer || 'Walk-in'}</td>
//             <td style="font-weight: 600;">₱${Number(t.finalTotal).toLocaleString()}</td>
//             <td><span style="padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; ${badgeStyle}">${statusText}</span></td>
//             <td style="text-transform: capitalize;">${t.method || t.paymentMethod || '-'}</td>
//             <td>
//                 <button class="action-btn" onclick="window.openDetails('${t.id}')" style="background:none; border:none; cursor:pointer; color:var(--text-grey); font-size: 16px;">
//                     <i class="fas fa-eye"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(row);
//     });
// }

// // ==========================================
// //  CHARTS (POPPING EFFECT ADDED)
// // ==========================================

// function initCharts() {
//     const ctxVol = document.getElementById('volumeChart');
//     if(ctxVol) {
//         volumeChartInstance = new Chart(ctxVol.getContext('2d'), {
//             type: 'bar',
//             data: { labels: [], datasets: [{ label: 'Sales (₱)', data: [], backgroundColor: '#ff4e00', borderRadius: 4 }] },
//             options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display: false} }, scales: { y: { beginAtZero: true } } }
//         });
//     }
    
//     // --- THIS IS THE UPDATED CHART ---
//     const ctxMethod = document.getElementById('methodChart');
//     if(ctxMethod) {
//         methodChartInstance = new Chart(ctxMethod.getContext('2d'), {
//             type: 'doughnut', 
//             data: { 
//                 labels: ['Cash', 'GCash', 'NFC'], 
//                 datasets: [{ 
//                     data: [0, 0, 0], 
//                     backgroundColor: ['#ed9119', '#1cc88a', '#667eea'],
//                     hoverOffset: 25,
//                     borderWidth: 2,
//                     borderColor: '#ffffff'
//                 }] 
//             },
//             options: { 
//                 responsive: true, 
//                 maintainAspectRatio: false,
//                 layout: {
//                     padding: 20 // <--- Prevents cropping when popped
//                 },
//                 plugins: {
//                     legend: {
//                         position: 'bottom',
//                         labels: { padding: 20 }
//                     }
//                 }
//             }
//         });
//     }
// }

// function updateCharts(data) {
//     if(!volumeChartInstance || !methodChartInstance) return;
//     let cash = 0, gcash = 0, nfc = 0;
//     data.forEach(t => {
//         const m = (t.method || t.paymentMethod || '').toLowerCase();
//         if(m.includes('gcash')) gcash++;
//         else if(m.includes('nfc')) nfc++;
//         else cash++;
//     });
//     methodChartInstance.data.datasets[0].data = [cash, gcash, nfc];
//     methodChartInstance.update();

//     const chartData = [...data].reverse().slice(-10);
//     volumeChartInstance.data.labels = chartData.map(t => t.dateObj.toLocaleDateString(undefined, {month:'short', day:'numeric'}));
//     volumeChartInstance.data.datasets[0].data = chartData.map(t => t.finalTotal);
//     volumeChartInstance.update();
// }

// // ==========================================
// //  MODALS
// // ==========================================

// window.openDetails = function(id) {
//     currentTransactionId = id;
//     const t = allTransactions.find(x => x.id === id);
//     if(!t) return;
    
//     const modal = document.getElementById('detailsModal');
//     const body = document.getElementById('modalBody');
//     const footer = document.querySelector('#detailsModal .modal-footer');

//     let itemsHtml = '';
//     if(t.items) t.items.forEach(item => {
//         itemsHtml += `
//             <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; border-bottom:1px dashed #eee; padding-bottom:8px;">
//                 <span>${item.qty}x ${item.name}</span>
//                 <span>₱${(item.price * item.qty).toLocaleString()}</span>
//             </div>`;
//     });

//     body.innerHTML = `
//         <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
//             <div><p class="label">Order ID</p><p class="value">${t.orderId}</p></div>
//             <div><p class="label">Date</p><p class="value">${t.dateObj.toLocaleString()}</p></div>
//             <div><p class="label">Customer</p><p class="value">${t.customer || 'Walk-in'}</p></div>
//             <div><p class="label">Method</p><p class="value" style="text-transform:capitalize;">${t.method || t.paymentMethod || '-'}</p></div>
//         </div>
        
//         <div style="margin-bottom: 15px;">
//              <p class="label">Status</p>
//              <span style="font-weight:bold; font-size: 16px; color: var(--primary);">${t.status || 'Completed'}</span>
//         </div>

//         <h4 style="margin-bottom:10px; color:var(--navy);">Items</h4>
//         <div style="background: #f8f9fc; padding: 15px; border-radius: 8px;">
//             ${itemsHtml}
//             <div style="display:flex; justify-content:space-between; margin-top:10px; font-weight:700; font-size:1.1em;">
//                 <span>Total Amount</span>
//                 <span>₱${Number(t.finalTotal).toLocaleString()}</span>
//             </div>
//              <div style="display:flex; justify-content:space-between; margin-top:5px; color:#e74a3b; display:${(t.balance > 0 && t.status !== 'Void') ? 'flex' : 'none'}">
//                 <span>Balance Due</span>
//                 <span>₱${Number(t.balance || 0).toLocaleString()}</span>
//             </div>
//         </div>
//     `;

//     let left = `<button class="btn-secondary" onclick="closeDetailsModal()">Close</button>`;
//     if (t.status !== 'Void') left += `<button class="btn-secondary" onclick="window.printTransaction()"><i class="fas fa-print"></i> Print</button>`;
    
//     let right = '';
//     if (t.status === 'Partial' && t.balance > 0) right += `<button class="btn-settle" onclick="window.openSettleModal()">Settle Balance</button>`;
//     if (t.status !== 'Void') right += `<button class="btn-void" onclick="window.voidTransaction('${t.id}')">Void Order</button>`;

//     footer.innerHTML = `<div class="footer-group">${left}</div><div class="footer-group">${right}</div>`;
//     modal.style.display = 'flex';
// };

// window.closeDetailsModal = function() { document.getElementById('detailsModal').style.display = 'none'; };
// window.printTransaction = function() { window.print(); };

// // ==========================================
// //  SETTLE & VOID (WITH LOADING & TOASTS)
// // ==========================================

// window.openSettleModal = function() {
//     const t = allTransactions.find(x => x.id === currentTransactionId);
//     if(!t) return;
//     document.getElementById('settleBalanceDisplay').innerText = '₱' + Number(t.balance).toLocaleString();
//     document.getElementById('settleAmountInput').value = t.balance; 
//     document.getElementById('settleModal').style.display = 'flex';
// };

// window.closeSettleModal = function() { document.getElementById('settleModal').style.display = 'none'; };

// window.confirmSettlement = async function() {
//     const btn = document.querySelector('#settleModal .btn-confirm');
//     const t = allTransactions.find(x => x.id === currentTransactionId);
//     if(!t) return;
//     const amount = parseFloat(document.getElementById('settleAmountInput').value);
    
//     if(isNaN(amount) || amount <= 0) { showToast("Invalid amount", "error"); return; }
//     if(amount > t.balance) { showToast("Amount exceeds balance", "error"); return; }

//     setBtnLoading(btn, true);

//     try {
//         const newBalance = t.balance - amount;
//         const newStatus = newBalance <= 0 ? 'Completed' : 'Partial'; 
        
//         await updateDoc(doc(db, "transactions", currentTransactionId), {
//             balance: newBalance,
//             cashReceived: (t.cashReceived || 0) + amount,
//             status: newStatus
//         });
        
//         showToast("Payment Settled Successfully!", "success");
//         closeSettleModal(); 
//         closeDetailsModal();
//     } catch(e) { 
//         console.error(e); 
//         showToast("Error updating payment", "error");
//     } finally {
//         setBtnLoading(btn, false);
//     }
// };

// window.voidTransaction = async function(id) {
//     pendingVoidId = id;
//     window.openConfirmModal("Are you sure you want to VOID this order? Items will return to stock and sales will be deducted.", executeVoid);
// };

// async function executeVoid() {
//     const id = pendingVoidId;
//     const t = allTransactions.find(x => x.id === id);
//     if(!t) return;

//     try {
//         if(t.items && t.items.length > 0) {
//             for (let item of t.items) {
//                 const productRef = doc(db, "products", item.id);
//                 const productSnap = await getDoc(productRef);
//                 if (productSnap.exists()) {
//                     await updateDoc(productRef, { quantity: Number(productSnap.data().quantity || 0) + Number(item.qty || 0) });
//                 }
//             }
//         }
//         await updateDoc(doc(db, "transactions", id), { status: 'Void' });
        
//         showToast("Order Voided Successfully", "success");
//         closeDetailsModal(); 
//     } catch(e) { 
//         console.error(e); 
//         showToast("Error voiding order", "error");
//     }
// }

// function setBtnLoading(btn, isLoading) {
//     if(!btn) return;
//     if(isLoading) {
//         btn.dataset.originalText = btn.innerHTML;
//         btn.disabled = true;
//         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
//     } else {
//         btn.disabled = false;
//         if(btn.dataset.originalText) {
//             btn.innerHTML = btn.dataset.originalText;
//         }
//     }
// }









import { 
    db, collection, query, onSnapshot, doc, updateDoc, getDoc, orderBy 
} from './firebase.js';

let allTransactions = [];
let volumeChartInstance = null;
let methodChartInstance = null;
let currentTransactionId = null; 
let pendingVoidId = null; 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI
    const dateEl = document.getElementById('currentDate');
    if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');

    initCharts();
    setupFilters(); 

    // 2. FETCH DATA
    console.log("Starting data fetch...");
    const q = query(collection(db, "transactions"), orderBy("date", "desc")); 
    
    onSnapshot(q, (snapshot) => {
        allTransactions = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // Fix Date Logic
            let cleanDate;
            if (data.date && typeof data.date.toDate === 'function') {
                cleanDate = data.date.toDate(); 
            } else {
                cleanDate = new Date(data.date); 
            }

            // Fix Total Logic
            const cleanTotal = data.total || data.totalAmount || data.subtotal || 0;

            allTransactions.push({ 
                id: doc.id, 
                ...data, 
                dateObj: cleanDate,
                finalTotal: cleanTotal 
            });
        });
        
        console.log("Data loaded:", allTransactions.length);
        applyFilters(); 
    });
});

// ==========================================
//  UI HELPERS (TOAST & CONFIRM)
// ==========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if(!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'check-circle';
    if(type === 'error') icon = 'times-circle';
    if(type === 'warning') icon = 'exclamation-triangle';

    toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global Confirm Modal Logic
window.openConfirmModal = function(msg, actionCallback) {
    const modal = document.getElementById('confirmModal');
    const msgEl = document.getElementById('confirmMessage');
    const btn = document.getElementById('btnConfirmAction');

    if(msgEl) msgEl.innerText = msg;
    if(modal) modal.style.display = 'flex';

    // Remove old listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', async () => {
        setBtnLoading(newBtn, true);
        await actionCallback();
        setBtnLoading(newBtn, false);
        window.closeConfirmModal();
    });
};

window.closeConfirmModal = function() {
    document.getElementById('confirmModal').style.display = 'none';
};

// ==========================================
//  FILTER LOGIC
// ==========================================

function setupFilters() {
    const applyBtn = document.getElementById('applyFilterBtn');
    const resetBtn = document.getElementById('resetFilterBtn');
    
    if(applyBtn) applyBtn.addEventListener('click', applyFilters);
    if(resetBtn) resetBtn.addEventListener('click', resetFilters);
    
    const search = document.getElementById('searchInput');
    const status = document.getElementById('statusFilter');
    const method = document.getElementById('methodFilter');

    if(search) search.addEventListener('keyup', applyFilters);
    if(status) status.addEventListener('change', applyFilters);
    if(method) method.addEventListener('change', applyFilters);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('methodFilter').value = 'all';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    applyFilters();
}

function applyFilters() {
    const term = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
    const status = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all';
    const method = document.getElementById('methodFilter') ? document.getElementById('methodFilter').value : 'all';
    const startVal = document.getElementById('startDate') ? document.getElementById('startDate').value : '';
    const endVal = document.getElementById('endDate') ? document.getElementById('endDate').value : '';

    const filtered = allTransactions.filter(t => {
        // Search
        const orderId = (t.orderId || '').toLowerCase();
        const custName = (t.customer || '').toLowerCase();
        const matchesTerm = orderId.includes(term) || custName.includes(term);

        // Status (Smart Check)
        let matchesStatus = true;
        if (status !== 'all') {
            const dbStatus = (t.status || '').toLowerCase();
            const filterStatus = status.toLowerCase();
            if (filterStatus === 'paid') {
                matchesStatus = (dbStatus === 'paid' || dbStatus === 'completed');
            } else {
                matchesStatus = (dbStatus === filterStatus);
            }
        }

        // Method
        const tMethod = (t.method || t.paymentMethod || '').toLowerCase();
        const matchesMethod = (method === 'all') ? true : tMethod.includes(method.toLowerCase());

        // Date
        let matchesDate = true;
        if (startVal || endVal) {
            const tDate = t.dateObj; 
            if (startVal) {
                const startDate = new Date(startVal);
                startDate.setHours(0, 0, 0, 0);
                if (tDate < startDate) matchesDate = false;
            }
            if (endVal) {
                const endDate = new Date(endVal);
                endDate.setHours(23, 59, 59, 999);
                if (tDate > endDate) matchesDate = false;
            }
        }
        return matchesTerm && matchesStatus && matchesMethod && matchesDate;
    });
    updateDashboard(filtered);
}

// ==========================================
//  DASHBOARD & TABLE
// ==========================================

function updateDashboard(data) {
    const activeData = data.filter(t => t.status !== 'Void');
    const totalSales = activeData.reduce((sum, t) => sum + (Number(t.finalTotal) || 0), 0);
    const totalCount = activeData.length;
    const avgOrder = totalCount > 0 ? totalSales / totalCount : 0;

    const salesEl = document.getElementById('totalSalesDisplay');
    const countEl = document.getElementById('totalCountDisplay');
    const avgEl = document.getElementById('avgOrderDisplay');

    if(salesEl) salesEl.innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
    if(countEl) countEl.innerText = totalCount;
    if(avgEl) avgEl.innerText = '₱' + avgOrder.toLocaleString(undefined, {minimumFractionDigits: 2});

    updateCharts(activeData); 
    renderTable(data); 
}

function renderTable(data) {
    const tbody = document.getElementById('transactionsTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    document.getElementById('showingText').innerText = `Showing ${data.length} entries`;

    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">No transactions found</td></tr>`;
        return;
    }

    data.forEach(t => {
        const statusText = t.status || 'Completed';
        let badgeStyle = 'background:#d1fae5; color:#065f46;'; 
        if(statusText === 'Partial') badgeStyle = 'background:#fef3c7; color:#92400e;'; 
        if(statusText === 'Void') badgeStyle = 'background:#fee2e2; color:#b91c1c;'; 

        const dateStr = t.dateObj.toLocaleDateString();
        const timeStr = t.dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="id-pill" style="font-weight:600;">${t.orderId}</span></td>
            <td>${dateStr} <div style="font-size:11px; color:var(--text-grey);">${timeStr}</div></td>
            <td>${t.customer || 'Walk-in'}</td>
            <td style="font-weight: 600;">₱${Number(t.finalTotal).toLocaleString()}</td>
            <td><span style="padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; ${badgeStyle}">${statusText}</span></td>
            <td style="text-transform: capitalize;">${t.method || t.paymentMethod || '-'}</td>
            <td>
                <button class="action-btn" onclick="window.openDetails('${t.id}')" style="background:none; border:none; cursor:pointer; color:var(--text-grey); font-size: 16px;">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ==========================================
//  CHARTS (POPPING EFFECT ADDED)
// ==========================================

function initCharts() {
    const ctxVol = document.getElementById('volumeChart');
    if(ctxVol) {
        volumeChartInstance = new Chart(ctxVol.getContext('2d'), {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Sales (₱)', data: [], backgroundColor: '#ff4e00', borderRadius: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display: false} }, scales: { y: { beginAtZero: true } } }
        });
    }
    
    const ctxMethod = document.getElementById('methodChart');
    if(ctxMethod) {
        methodChartInstance = new Chart(ctxMethod.getContext('2d'), {
            type: 'doughnut', 
            data: { 
                labels: ['Cash', 'GCash', 'NFC'], 
                datasets: [{ 
                    data: [0, 0, 0], 
                    backgroundColor: ['#ed9119', '#1cc88a', '#667eea'],
                    hoverOffset: 25,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                layout: {
                    padding: 20
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20 }
                    }
                }
            }
        });
    }
}

function updateCharts(data) {
    if(!volumeChartInstance || !methodChartInstance) return;
    let cash = 0, gcash = 0, nfc = 0;
    data.forEach(t => {
        const m = (t.method || t.paymentMethod || '').toLowerCase();
        if(m.includes('gcash')) gcash++;
        else if(m.includes('nfc')) nfc++;
        else cash++;
    });
    methodChartInstance.data.datasets[0].data = [cash, gcash, nfc];
    methodChartInstance.update();

    const chartData = [...data].reverse().slice(-10);
    volumeChartInstance.data.labels = chartData.map(t => t.dateObj.toLocaleDateString(undefined, {month:'short', day:'numeric'}));
    volumeChartInstance.data.datasets[0].data = chartData.map(t => t.finalTotal);
    volumeChartInstance.update();
}

// ==========================================
//  MODALS
// ==========================================

window.openDetails = function(id) {
    currentTransactionId = id;
    const t = allTransactions.find(x => x.id === id);
    if(!t) return;
    
    const modal = document.getElementById('detailsModal');
    const body = document.getElementById('modalBody');
    const footer = document.querySelector('#detailsModal .modal-footer');

    let itemsHtml = '';
    if(t.items) t.items.forEach(item => {
        itemsHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; border-bottom:1px dashed #eee; padding-bottom:8px;">
                <span>${item.qty}x ${item.name}</span>
                <span>₱${(item.price * item.qty).toLocaleString()}</span>
            </div>`;
    });

    body.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div><p class="label">Order ID</p><p class="value">${t.orderId}</p></div>
            <div><p class="label">Date</p><p class="value">${t.dateObj.toLocaleString()}</p></div>
            <div><p class="label">Customer</p><p class="value">${t.customer || 'Walk-in'}</p></div>
            <div><p class="label">Contact</p><p class="value">${t.contact || '-'}</p></div>
            <div><p class="label">Method</p><p class="value" style="text-transform:capitalize;">${t.method || t.paymentMethod || '-'}</p></div>
        </div>
        
        <div style="margin-bottom: 15px;">
             <p class="label">Status</p>
             <span style="font-weight:bold; font-size: 16px; color: var(--primary);">${t.status || 'Completed'}</span>
        </div>

        <h4 style="margin-bottom:10px; color:var(--navy);">Items</h4>
        <div style="background: #f8f9fc; padding: 15px; border-radius: 8px;">
            ${itemsHtml}
            <div style="display:flex; justify-content:space-between; margin-top:10px; font-weight:700; font-size:1.1em;">
                <span>Total Amount</span>
                <span>₱${Number(t.finalTotal).toLocaleString()}</span>
            </div>
             <div style="display:flex; justify-content:space-between; margin-top:5px; color:#e74a3b; display:${(t.balance > 0 && t.status !== 'Void') ? 'flex' : 'none'}">
                <span>Balance Due</span>
                <span>₱${Number(t.balance || 0).toLocaleString()}</span>
            </div>
        </div>
    `;

    // CHANGED: Removed "Void Order" button — only Close, Print, and Settle Balance remain
    let left = `<button class="btn-secondary" onclick="closeDetailsModal()">Close</button>`;
    if (t.status !== 'Void') left += `<button class="btn-secondary" onclick="window.printTransaction()"><i class="fas fa-print"></i> Print</button>`;
    
    let right = '';
    if (t.status === 'Partial' && t.balance > 0) right += `<button class="btn-settle" onclick="window.openSettleModal()">Settle Balance</button>`;

    footer.innerHTML = `<div class="footer-group">${left}</div><div class="footer-group">${right}</div>`;
    modal.style.display = 'flex';
};

window.closeDetailsModal = function() { document.getElementById('detailsModal').style.display = 'none'; };
window.printTransaction = function() { window.print(); };

// ==========================================
//  SETTLE & VOID (WITH LOADING & TOASTS)
// ==========================================

window.openSettleModal = function() {
    const t = allTransactions.find(x => x.id === currentTransactionId);
    if(!t) return;
    document.getElementById('settleBalanceDisplay').innerText = '₱' + Number(t.balance).toLocaleString();
    document.getElementById('settleAmountInput').value = t.balance; 
    document.getElementById('settleModal').style.display = 'flex';
};

window.closeSettleModal = function() { document.getElementById('settleModal').style.display = 'none'; };

window.confirmSettlement = async function() {
    const btn = document.querySelector('#settleModal .btn-confirm');
    const t = allTransactions.find(x => x.id === currentTransactionId);
    if(!t) return;
    const amount = parseFloat(document.getElementById('settleAmountInput').value);
    
    if(isNaN(amount) || amount <= 0) { showToast("Invalid amount", "error"); return; }
    if(amount > t.balance) { showToast("Amount exceeds balance", "error"); return; }

    setBtnLoading(btn, true);

    try {
        const newBalance = t.balance - amount;
        const newStatus = newBalance <= 0 ? 'Completed' : 'Partial'; 
        
        await updateDoc(doc(db, "transactions", currentTransactionId), {
            balance: newBalance,
            cashReceived: (t.cashReceived || 0) + amount,
            status: newStatus
        });
        
        showToast("Payment Settled Successfully!", "success");
        closeSettleModal(); 
        closeDetailsModal();
    } catch(e) { 
        console.error(e); 
        showToast("Error updating payment", "error");
    } finally {
        setBtnLoading(btn, false);
    }
};

window.voidTransaction = async function(id) {
    pendingVoidId = id;
    window.openConfirmModal("Are you sure you want to VOID this order? Items will return to stock and sales will be deducted.", executeVoid);
};

async function executeVoid() {
    const id = pendingVoidId;
    const t = allTransactions.find(x => x.id === id);
    if(!t) return;

    try {
        if(t.items && t.items.length > 0) {
            for (let item of t.items) {
                const productRef = doc(db, "products", item.id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    await updateDoc(productRef, { quantity: Number(productSnap.data().quantity || 0) + Number(item.qty || 0) });
                }
            }
        }
        await updateDoc(doc(db, "transactions", id), { status: 'Void' });
        
        showToast("Order Voided Successfully", "success");
        closeDetailsModal(); 
    } catch(e) { 
        console.error(e); 
        showToast("Error voiding order", "error");
    }
}

function setBtnLoading(btn, isLoading) {
    if(!btn) return;
    if(isLoading) {
        btn.dataset.originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    } else {
        btn.disabled = false;
        if(btn.dataset.originalText) {
            btn.innerHTML = btn.dataset.originalText;
        }
    }
}