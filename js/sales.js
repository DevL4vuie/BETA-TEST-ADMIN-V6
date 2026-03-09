// // sales.js - Sales Monitoring with Firebase Firestore



// // Import from your provided firebase.js file
// import { db, collection, onSnapshot, query, orderBy } from './firebase.js';

// let salesData = [];
// let filteredSalesData = [];

// document.addEventListener('DOMContentLoaded', function() {
//     initSalesMonitoring();
//     setCurrentDate();
    
//     // START LISTENING TO FIREBASE
//     setupRealtimeListener();
    
//     setupSalesListeners();
//     setupEnhancedListeners();
//     initCharts(); 
// });

// function initSalesMonitoring() {
//     const now = new Date();
//     const startInput = document.getElementById('customStartDate');
//     const endInput = document.getElementById('customEndDate');
//     if(startInput) startInput.value = formatDate(now);
//     if(endInput) endInput.value = formatDate(now);
// }

// function setCurrentDate() {
//     const now = new Date();
//     const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
//     const dateDisplay = document.getElementById('currentDate');
//     if(dateDisplay) dateDisplay.textContent = now.toLocaleDateString('en-US', options);
// }

// function formatDate(date) {
//     let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
//     return [year, month, day].join('-');
// }

// // --- FIREBASE REALTIME LISTENER ---
// function setupRealtimeListener() {
//     // We assume the collection is named 'transactions' based on your 'transactions.html' nav link.
//     // If your POS saves to 'orders' or 'sales', change 'transactions' to that name.
//     const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    
//     onSnapshot(q, (snapshot) => {
//         salesData = [];
//         snapshot.forEach((doc) => {
//             const data = doc.data();
            
//             // Handle Timestamp if date is a Firestore Timestamp object
//             let dateVal = data.date;
//             if (data.date && data.date.toDate) {
//                 dateVal = data.date.toDate().toISOString();
//             }

//             salesData.push({
//                 id: doc.id,
//                 orderId: data.orderId || doc.id,
//                 customer: data.customerName || data.customer || 'Walk-in',
//                 date: dateVal || new Date().toISOString(),
//                 items: Array.isArray(data.items) ? data.items.map(i => i.name).join(', ') : (data.items || 'No Items'),
//                 amount: parseFloat(data.totalAmount || data.amount || 0),
//                 status: data.status || 'Completed',
//                 method: data.paymentMethod || data.method || 'Cash'
//             });
//         });

//         // Update UI
//         filteredSalesData = [...salesData];
//         renderTable(filteredSalesData);
//         updateSummaryCards(filteredSalesData);
//         updateTotalCustomers();
//         // updateCharts(filteredSalesData); // Optional: if you implement dynamic charts
//     }, (error) => {
//         console.error("Error getting documents: ", error);
//         showToast("Error fetching data: " + error.message, 'error');
//     });
// }

// function setupSalesListeners() {
//     const filterBtn = document.getElementById('applyFilterBtn');
//     if(filterBtn) filterBtn.addEventListener('click', filterSales);
    
//     const searchInput = document.getElementById('tableSearch');
//     if(searchInput) {
//         searchInput.addEventListener('keyup', function() {
//             const term = this.value.toLowerCase();
//             const searchResults = filteredSalesData.filter(item => 
//                 String(item.orderId).toLowerCase().includes(term) || 
//                 String(item.customer).toLowerCase().includes(term)
//             );
//             renderTable(searchResults);
//         });
//     }
// }

// function filterSales() {
//     const startVal = document.getElementById('customStartDate').value;
//     const endVal = document.getElementById('customEndDate').value;
//     if (!startVal || !endVal) return;
    
//     const startDate = new Date(startVal); startDate.setHours(0,0,0,0);
//     const endDate = new Date(endVal); endDate.setHours(23,59,59,999);
    
//     filteredSalesData = salesData.filter(item => {
//         const itemDate = new Date(item.date);
//         return itemDate >= startDate && itemDate <= endDate;
//     });
    
//     renderTable(filteredSalesData);
//     updateSummaryCards(filteredSalesData);
//     updateTotalCustomers();
//     showToast('Filter applied successfully', 'success');
// }

// function renderTable(data) {
//     const tbody = document.getElementById('salesTableBody');
//     tbody.innerHTML = '';
    
//     if (data.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No records found</td></tr>';
//         document.getElementById('showingText').innerText = 'Showing 0 entries';
//         return;
//     }
    
//     data.forEach(t => {
//         const tr = document.createElement('tr');
//         const dateStr = new Date(t.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
//         const statusClass = t.status.toLowerCase();
        
//         tr.innerHTML = `
//             <td style="font-weight:600; color: #ff4e00;">${t.orderId}</td>
//             <td>${dateStr}</td>
//             <td>${t.customer}</td>
//             <td>${t.items}</td>
//             <td style="font-weight:600;">₱${t.amount.toLocaleString()}</td>
//             <td><span class="status-badge ${statusClass}">${t.status}</span></td>
//             <td>
//                 <button class="action-btn view-details-btn" data-id="${t.id}" title="View Details">
//                     <i class="fas fa-eye"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
//     document.getElementById('showingText').innerText = `Showing ${data.length} entries`;
// }

// function updateSummaryCards(data) {
//     const total = data.filter(i => i.status !== 'Cancelled').reduce((acc, curr) => acc + curr.amount, 0);
//     document.getElementById('stat-total-sales').innerText = '₱' + total.toLocaleString();
//     document.getElementById('stat-total-orders').innerText = data.length;
    
//     const validOrders = data.filter(i => i.status !== 'Cancelled');
//     const avg = validOrders.length ? total / validOrders.length : 0;
//     document.getElementById('stat-avg-order').innerText = '₱' + avg.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
//     document.getElementById('stat-cancelled').innerText = data.filter(i => i.status === 'Cancelled').length;
// }

// function updateTotalCustomers() {
//     const customers = filteredSalesData.map(item => item.customer);
//     const uniqueCustomers = new Set(customers);
//     const displayEl = document.getElementById('stat-total-customers');
//     if (displayEl) displayEl.innerText = uniqueCustomers.size;
// }

// function initCharts() {
//     const ctx1 = document.getElementById('salesTrendChart');
//     if(ctx1) {
//         new Chart(ctx1, {
//             type: 'line',
//             data: { 
//                 labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], 
//                 datasets: [{ label: 'Sales', data: [0,0,0,0,0,0,0], borderColor: '#ff4e00', tension: 0.4 }] 
//             }
//         });
//     }
//     const ctx2 = document.getElementById('topSellingChart');
//     if(ctx2) {
//         new Chart(ctx2, {
//             type: 'doughnut',
//             data: { 
//                 labels: ['Product A','Product B'], 
//                 datasets: [{ data: [50, 50], backgroundColor: ['#ff4e00','#ffc400'] }] 
//             }
//         });
//     }
// }

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
//     toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
// }

// // Export Logic
// window.exportData = function() {
//     const headers = ["Order ID", "Date", "Customer", "Items", "Amount", "Status", "Payment Method"];
//     const rows = filteredSalesData.map(t => {
//         const dateStr = new Date(t.date).toLocaleDateString();
//         return `"${t.orderId}","${dateStr}","${t.customer}","${t.items}",${t.amount},"${t.status}","${t.method}"`;
//     });
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     const fileName = `sales_report_${new Date().toISOString().slice(0,10)}.csv`;
//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     showToast("Export successful!");
// };

// // Modal & Print Listeners
// function setupEnhancedListeners() {
//     const printBtn = document.getElementById('printBtn');
//     if(printBtn) printBtn.addEventListener('click', () => window.print());

//     const modal = document.getElementById('detailsModal');
//     const closeBtn = document.getElementById('closeModalBtn');
//     const footerCloseBtn = document.getElementById('closeModalFooterBtn');
//     const closeModal = () => { if(modal) modal.style.display = 'none'; }
//     if(closeBtn) closeBtn.addEventListener('click', closeModal);
//     if(footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);
//     window.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

//     const printReceiptBtn = document.getElementById('printReceiptBtn');
//     if(printReceiptBtn) {
//         printReceiptBtn.addEventListener('click', () => {
//              document.body.classList.add('printing-modal');
//              window.print();
//              document.body.classList.remove('printing-modal');
//         });
//     }

//     const tbody = document.getElementById('salesTableBody');
//     if(tbody) {
//         tbody.addEventListener('click', (e) => {
//             const btn = e.target.closest('.view-details-btn');
//             if(btn) {
//                 // Use the Firebase Document ID to find the record
//                 const docId = btn.getAttribute('data-id');
//                 openTransactionDetails(docId);
//             }
//         });
//     }
// }

// function openTransactionDetails(docId) {
//     const transaction = salesData.find(t => t.id === docId);
//     if(!transaction) return;
    
//     const modalContent = document.getElementById('modalContent');
//     const modal = document.getElementById('detailsModal');
//     const dateStr = new Date(transaction.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' });
    
//     modalContent.innerHTML = `
//         <div class="detail-row"><span class="detail-label">Order ID</span><span class="detail-value" style="color: #ff4e00;">${transaction.orderId}</span></div>
//         <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-badge ${transaction.status.toLowerCase()}">${transaction.status}</span></span></div>
//         <div class="detail-row"><span class="detail-label">Customer Name</span><span class="detail-value">${transaction.customer}</span></div>
//         <div class="detail-row"><span class="detail-label">Date & Time</span><span class="detail-value">${dateStr}</span></div>
//         <br>
//         <div style="background: #f9f9f9; padding: 15px; border-radius: 10px;">
//             <div class="detail-row" style="border:none;"><span class="detail-label">Items Ordered</span><span class="detail-value">${transaction.items}</span></div>
//             <div class="detail-row" style="border:none; margin-top: 5px;"><span class="detail-label">Payment Method</span><span class="detail-value">${transaction.method}</span></div>
//              <div class="detail-row" style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;"><span class="detail-label" style="font-size: 16px; color: #333;">Total Amount</span><span class="detail-value" style="font-size: 18px; color: #2e7d32;">₱${transaction.amount.toLocaleString()}</span></div>
//         </div>
//     `;
//     modal.style.display = 'flex';
// }





























// sales.js - Fixed Logic to Match Dashboard

import { db, collection, query, orderBy, onSnapshot } from './firebase.js';

let salesData = [];
let filteredSalesData = [];

// Chart Instances
let salesChartInstance = null;
let topSellingChartInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    initSalesMonitoring();
    setCurrentDate();
    initCharts(); // Setup empty charts first
    
    // START LISTENING TO FIREBASE
    setupRealtimeListener();
    setupSalesListeners();
    setupEnhancedListeners();
});

function initSalesMonitoring() {
    // Default to "Today" or leave blank to show all history initially
    // You can uncomment below to default to today's date
    /*
    const now = new Date();
    const startInput = document.getElementById('customStartDate');
    const endInput = document.getElementById('customEndDate');
    if(startInput) startInput.value = formatDate(now);
    if(endInput) endInput.value = formatDate(now);
    */
}

function setCurrentDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
    const dateDisplay = document.getElementById('currentDate');
    if(dateDisplay) dateDisplay.textContent = now.toLocaleDateString('en-US', options);
}

function formatDate(date) {
    let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

// --- HELPER: CLEAN NUMBERS (Matches Dashboard Logic) ---
function parseAmount(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    // Remove commas and currency symbols, then parse
    const cleanStr = String(value).replace(/,/g, '').replace(/₱/g, '').trim();
    return parseFloat(cleanStr) || 0;
}

// --- FIREBASE REALTIME LISTENER ---
function setupRealtimeListener() {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    
    onSnapshot(q, (snapshot) => {
        salesData = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // Handle Timestamp conversion
            let dateVal = data.date;
            if (data.date && data.date.toDate) {
                dateVal = data.date.toDate().toISOString();
            }

            // salesData.push({
            //     id: doc.id,
            //     orderId: data.orderId || doc.id,
            //     customer: data.customerName || data.customer || 'Walk-in',
            //     date: dateVal || new Date().toISOString(),
            //     // Join items array into string for display
            //     itemsDisplay: Array.isArray(data.items) ? data.items.map(i => i.name).join(', ') : (data.items || 'No Items'),
            //     // Keep raw items for charts
            //     rawItems: Array.isArray(data.items) ? data.items : [],
            //     // CRITICAL FIX: Use parseAmount to handle "1,000" strings correctly
            //     amount: parseAmount(data.totalAmount || data.amount || data.total || 0),
            //     status: data.status || 'Completed',
            //     method: data.paymentMethod || data.method || 'Cash'
            // });

salesData.push({
                id: doc.id,
                orderId: data.orderId || doc.id,
                customer: data.customerName || data.customer || 'Walk-in',
                date: dateVal || new Date().toISOString(),
                itemsDisplay: Array.isArray(data.items) ? data.items.map(i => i.name).join(', ') : (data.items || 'No Items'),
                rawItems: Array.isArray(data.items) ? data.items : [],
                
                // --- DATA MAPPING FIXES ---
                // 1. Total Bill
                amount: parseAmount(data.totalAmount || data.amount || data.total || 0),
                // 2. Downpayment (Required for Partial logic)
                cashReceived: parseAmount(data.cashReceived || 0), 
                
                status: data.status || 'Completed',
                method: data.paymentMethod || data.method || 'Cash'
            });


        });

        // Initial Load: Show All Data
        filteredSalesData = [...salesData];
        updateUI(filteredSalesData);
        
    }, (error) => {
        console.error("Error getting documents: ", error);
        showToast("Error fetching data: " + error.message, 'error');
    });
}

// --- UI UPDATER MASTER FUNCTION ---
function updateUI(data) {
    renderTable(data);
    updateSummaryCards(data);
    updateTotalCustomers();
    updateCharts(data); 
}




// --- UPDATED LISTENERS ---
function setupSalesListeners() {
    // 1. Existing Search & Filter Listeners
    const filterBtn = document.getElementById('applyFilterBtn');
    if(filterBtn) filterBtn.addEventListener('click', filterSales);
    
    const searchInput = document.getElementById('tableSearch');
    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const term = this.value.toLowerCase();
            const searchResults = filteredSalesData.filter(item => 
                String(item.orderId).toLowerCase().includes(term) || 
                String(item.customer).toLowerCase().includes(term)
            );
            renderTable(searchResults);
        });
    }

    // 2. NEW: Reset Button Listener
    const resetBtn = document.getElementById('resetFilterBtn');
    if(resetBtn) resetBtn.addEventListener('click', resetFilters);

    // 3. NEW: Quick Filter Buttons (Today, Week, Month)
    document.getElementById('btn-all')?.addEventListener('click', () => applyQuickFilter('all'));
    document.getElementById('btn-today')?.addEventListener('click', () => applyQuickFilter('today'));
    document.getElementById('btn-week')?.addEventListener('click', () => applyQuickFilter('week'));
    document.getElementById('btn-month')?.addEventListener('click', () => applyQuickFilter('month'));
}

// --- NEW FUNCTION: RESET ---
function resetFilters() {
    // Clear Date Inputs
    document.getElementById('customStartDate').value = '';
    document.getElementById('customEndDate').value = '';
    
    // Reset Data to Full List
    filteredSalesData = [...salesData];
    
    // Reset UI Highlights
    setActiveButton('btn-all');
    
    // Update Screen
    updateUI(filteredSalesData);
    showToast('Filters reset. Showing all history.', 'info');
}

// --- NEW FUNCTION: QUICK FILTERS ---
function applyQuickFilter(type) {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    // Helper to highlight the active button
    setActiveButton(`btn-${type}`);

    if (type === 'all') {
        resetFilters(); // Re-use reset logic
        return;
    }

    if (type === 'today') {
        // Start and End are both Today
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999);
    } 
    else if (type === 'week') {
        // Get Monday of current week
        const day = now.getDay() || 7; // Get current day number, make Sunday (0) -> 7
        if (day !== 1) startDate.setHours(-24 * (day - 1));
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999);
    } 
    else if (type === 'month') {
        // First day of current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate.setHours(23,59,59,999);
    }

    // Set the inputs visually (optional, but good UX)
    document.getElementById('customStartDate').value = formatDate(startDate);
    document.getElementById('customEndDate').value = formatDate(endDate);

    // Apply the filter logic
    filteredSalesData = salesData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    updateUI(filteredSalesData);
    showToast(`Showing data for: ${type.charAt(0).toUpperCase() + type.slice(1)}`);
}

// Helper to switch active CSS class
function setActiveButton(id) {
    document.querySelectorAll('.q-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(id);
    if(btn) btn.classList.add('active');
}




function filterSales() {
    const startVal = document.getElementById('customStartDate').value;
    const endVal = document.getElementById('customEndDate').value;
    
    if (!startVal || !endVal) {
        showToast("Please select start and end dates", "info");
        return;
    }
    
    const startDate = new Date(startVal); startDate.setHours(0,0,0,0);
    const endDate = new Date(endVal); endDate.setHours(23,59,59,999);
    
    filteredSalesData = salesData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });
    
    updateUI(filteredSalesData);
    showToast('Filter applied successfully', 'success');
}

function renderTable(data) {
    const tbody = document.getElementById('salesTableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No records found</td></tr>';
        document.getElementById('showingText').innerText = 'Showing 0 entries';
        return;
    }
    
    data.forEach(t => {
        const tr = document.createElement('tr');
        const dateStr = new Date(t.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
        const statusClass = t.status.toLowerCase();
        
// ... inside renderTable(data) ...
            tr.innerHTML = `
                <td style="font-weight:600; color: #ff4e00;">${t.orderId}</td>
                <td>${dateStr}</td>
                <td>${t.customer}</td>
                <td style="font-size: 13px; max-width: 200px; ...">${t.itemsDisplay}</td>
                <td style="font-weight:600;">₱${t.amount.toLocaleString()}</td>
                <td><span class="status-badge ${statusClass}">${t.status}</span></td>
                <td>${t.method}</td>
                
                <td>
                    <button class="action-btn view-details-btn" data-id="${t.id}" title="View Receipt">
                    
                    </button>
                </td>
            `;
        tbody.appendChild(tr);
    });
    document.getElementById('showingText').innerText = `Showing ${data.length} entries`;
}

// function updateSummaryCards(data) {
//     const validOrders = data.filter(i => i.status !== 'Cancelled');
    
//     // 1. Total Sales
//     const total = validOrders.reduce((acc, curr) => acc + curr.amount, 0);
//     document.getElementById('stat-total-sales').innerText = '₱' + total.toLocaleString(undefined, {minimumFractionDigits: 2});
    
//     // 2. Total Orders
//     document.getElementById('stat-total-orders').innerText = data.length; // Count all, or switch to validOrders.length if you prefer
    
//     // 3. Avg Order Value
//     const avg = validOrders.length ? total / validOrders.length : 0;
//     document.getElementById('stat-avg-order').innerText = '₱' + avg.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
function updateSummaryCards(data) {
    // 1. Total Sales (Updated to match Dashboard Logic)
    let total = 0;
    
    // We also create a list of "Valid Orders" for other stats (Avg Order, Highest Sale)
    const validOrders = [];

    data.forEach(t => {
        const status = (t.status || '').toLowerCase();

        // A. FILTER: Ignore Void, Cancelled, Refunded
        if (status === 'cancelled' || status === 'void' || status === 'refunded') return;

        validOrders.push(t); // Keep track of valid orders

        // B. MATH: Handle Partial vs Full Payment
        if (status === 'partial') {
            // If Partial, add ONLY the cash received (Downpayment)
            total += (t.cashReceived || 0);
        } else {
            // If Completed, add the Full Amount
            total += (t.amount || 0);
        }
    });

    // document.getElementById('stat-total-sales').innerText = '₱' + total.toLocaleString(undefined, {minimumFractionDigits: 2});
    
    // 2. Total Orders
    document.getElementById('stat-total-orders').innerText = validOrders.length; 
    
    // 3. Avg Order Value (Based on valid orders)
    const avg = validOrders.length ? total / validOrders.length : 0;
    document.getElementById('stat-avg-order').innerText = '₱' + avg.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // ... (Keep your existing Cancelled Count and Highest Sale logic below) ...

    // 4. Cancelled
    // document.getElementById('stat-cancelled').innerText = data.filter(i => i.status === 'Cancelled').length;
    // Count 'Cancelled', 'Void', and 'Refunded' all together

    const cancelledCount = filteredSalesData.filter(i => {
    const s = (i.status || '').toLowerCase();
    return s === 'cancelled' || s === 'void' || s === 'refunded';
}).length;




document.getElementById('stat-cancelled').innerText = cancelledCount;

    // 5. Highest Sale (New Logic)
    let maxSale = 0;
    validOrders.forEach(order => {
        if(order.amount > maxSale) maxSale = order.amount;
    });
    const highestSaleEl = document.getElementById('stat-highest-sale'); // Ensure this ID exists in HTML
    if(highestSaleEl) highestSaleEl.innerText = '₱' + maxSale.toLocaleString(undefined, {minimumFractionDigits: 2});
}

function updateTotalCustomers() {
    const customers = filteredSalesData.map(item => item.customer);
    const uniqueCustomers = new Set(customers);
    const displayEl = document.getElementById('stat-total-customers');
    if (displayEl) displayEl.innerText = uniqueCustomers.size;
}

// --- CHARTS LOGIC ---
function initCharts() {
    // 1. Trend Chart
    const ctx1 = document.getElementById('salesTrendChart');
    if(ctx1) {
        salesChartInstance = new Chart(ctx1, {
            type: 'line',
            data: { 
                labels: [], 
                datasets: [{ 
                    label: 'Sales', 
                    data: [], 
                    borderColor: '#ff4e00',
                    backgroundColor: 'rgba(255, 78, 0, 0.1)',
                    fill: true,
                    tension: 0.4 
                }] 
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, grid: { borderDash: [5,5] } }
                }
            }
        });
    }

    // 2. Top Products Chart
    const ctx2 = document.getElementById('topSellingChart');
    if(ctx2) {
        topSellingChartInstance = new Chart(ctx2, {
            type: 'doughnut',
            data: { 
                labels: [], 
                datasets: [{ 
                    data: [], 
                    backgroundColor: ['#ff4e00','#ffc400', '#2e7d32', '#1976d2', '#7b1fa2'],
                    borderWidth: 0
                }] 
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { usePointStyle: true, font: {size: 11} } } }
            }
        });
    }
}

function updateCharts(data) {
    if(!salesChartInstance || !topSellingChartInstance) return;

    const validData = data.filter(d => d.status !== 'Cancelled');

    // --- A. Sales Trend (Group by Date) ---
    const salesMap = {};
    validData.forEach(t => {
        // Format date as "Jan 1"
        const d = new Date(t.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        salesMap[d] = (salesMap[d] || 0) + t.amount;
    });

    // Sort by date (simple approach assumes current year context or sorted input)
    // Since Firebase data came in Date Descending, we reverse for chart (Oldest -> Newest)
    const sortedDates = Object.keys(salesMap).reverse(); 
    const sortedValues = sortedDates.map(date => salesMap[date]);

    salesChartInstance.data.labels = sortedDates;
    salesChartInstance.data.datasets[0].data = sortedValues;
    salesChartInstance.update();

    // --- B. Top Selling Products ---
    const productCount = {};
    validData.forEach(t => {
        if(t.rawItems && Array.isArray(t.rawItems)) {
            t.rawItems.forEach(item => {
                const name = item.name || 'Unknown';
                const qty = parseInt(item.qty || 1);
                productCount[name] = (productCount[name] || 0) + qty;
            });
        }
    });

    // Sort Top 5
    const sortedProducts = Object.entries(productCount)
        .sort((a,b) => b[1] - a[1])
        .slice(0, 5);
    
    topSellingChartInstance.data.labels = sortedProducts.map(p => p[0]);
    topSellingChartInstance.data.datasets[0].data = sortedProducts.map(p => p[1]);
    topSellingChartInstance.update();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}



function setupEnhancedListeners() {
    // 1. MAIN PRINT BUTTON (Header)
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        // Remove old listeners to prevent duplicates
        const newBtn = printBtn.cloneNode(true);
        printBtn.parentNode.replaceChild(newBtn, printBtn);
        
        newBtn.addEventListener('click', function() {
            window.print();
        });
    } else {
        console.error("Print button (id='printBtn') not found!");
    }

    // 2. MODAL LISTENERS (Close & Print Receipt)
    const modal = document.getElementById('detailsModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const footerCloseBtn = document.getElementById('closeModalFooterBtn');

    const closeModal = () => { if(modal) modal.style.display = 'none'; };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);
    
    // Close on click outside
    window.addEventListener('click', (e) => { 
        if(e.target === modal) closeModal(); 
    });

    // Modal Print Receipt
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    if(printReceiptBtn) {
        printReceiptBtn.addEventListener('click', () => {
             document.body.classList.add('printing-modal');
             window.print();
             setTimeout(() => {
                 document.body.classList.remove('printing-modal');
             }, 500); // Small delay to ensure print dialog catches the class
        });
    }

    // Table "View Details" Buttons
    const tbody = document.getElementById('salesTableBody');
    if(tbody) {
        tbody.addEventListener('click', (e) => {
            // Handle clicking the icon or the button itself
            const btn = e.target.closest('.view-details-btn');
            if(btn) {
                const docId = btn.getAttribute('data-id');
                openTransactionDetails(docId);
            }
        });
    }
}



function openTransactionDetails(docId) {
    const transaction = salesData.find(t => t.id === docId);
    if(!transaction) return;
    
    const modalContent = document.getElementById('modalContent');
    const modal = document.getElementById('detailsModal');
    const dateStr = new Date(transaction.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' });
    
    modalContent.innerHTML = `
        <div class="detail-row"><span class="detail-label">Order ID</span><span class="detail-value" style="color: #ff4e00;">${transaction.orderId}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-badge ${transaction.status.toLowerCase()}">${transaction.status}</span></span></div>
        <div class="detail-row"><span class="detail-label">Customer Name</span><span class="detail-value">${transaction.customer}</span></div>
        <div class="detail-row"><span class="detail-label">Date & Time</span><span class="detail-value">${dateStr}</span></div>
        <br>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 10px;">
            <div class="detail-row" style="border:none;"><span class="detail-label">Items Ordered</span><span class="detail-value">${transaction.itemsDisplay}</span></div>
            <div class="detail-row" style="border:none; margin-top: 5px;"><span class="detail-label">Payment Method</span><span class="detail-value">${transaction.method}</span></div>
             <div class="detail-row" style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;"><span class="detail-label" style="font-size: 16px; color: #333;">Total Amount</span><span class="detail-value" style="font-size: 18px; color: #2e7d32;">₱${transaction.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
        </div>
    `;
    modal.style.display = 'flex';
}

// Export Global Function
window.exportData = function() {
    const headers = ["Order ID", "Date", "Customer", "Items", "Amount", "Status", "Payment Method"];
    const rows = filteredSalesData.map(t => {
        const dateStr = new Date(t.date).toLocaleDateString();
        // Escape quotes for CSV
        const safeItems = t.itemsDisplay.replace(/"/g, '""'); 
        return `"${t.orderId}","${dateStr}","${t.customer}","${safeItems}",${t.amount},"${t.status}","${t.method}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const fileName = `sales_report_${new Date().toISOString().slice(0,10)}.csv`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export successful!");
};





// ==========================================
// 🔴 PASTE AT THE BOTTOM OF BOTH FILES 🔴
// ==========================================

function getTransactionValue(t) {
    // 1. Sanitize Status
    const status = (t.status || 'completed').toLowerCase();

    // 2. Ignore Bad Orders
    if (status === 'cancelled' || status === 'void' || status === 'refunded') {
        return 0;
    }

    // 3. Helper to clean numbers (turns "1,000" into 1000)
    const parse = (val) => {
        if (typeof val === 'number') return val;
        if (!val) return 0;
        return parseFloat(String(val).replace(/,/g, '').replace(/₱/g, '').trim()) || 0;
    };

    // 4. Logic: Partial = Downpayment Only
    if (status === 'partial') {
        return parse(t.cashReceived);
    }

    // 5. Logic: Completed = Full Amount (Strict Priority Order)
    // We check fields in this specific order to ensure consistency
    if (t.totalAmount !== undefined && t.totalAmount !== null) return parse(t.totalAmount);
    if (t.total !== undefined && t.total !== null) return parse(t.total);
    if (t.amount !== undefined && t.amount !== null) return parse(t.amount);
    if (t.amountPaid !== undefined && t.amountPaid !== null) return parse(t.amountPaid);

    // 6. Fallback: Calculate from items if total is missing
    if (t.items && Array.isArray(t.items)) {
        return t.items.reduce((sum, item) => sum + (parse(item.price) * parse(item.qty || 1)), 0);
    }

    return 0;
}







// import { 
//     db, collection, query, orderBy, onSnapshot 
// } from './firebase.js';

// let allTransactions = [];
// let displayedData = []; // To track data for export
// let salesChartInstance = null;
// let topSellingChartInstance = null;

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Dark Mode
//     initTheme();

//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     initCharts();

//     const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    
//     onSnapshot(q, (snapshot) => {
//         allTransactions = [];
//         snapshot.forEach((doc) => {
//             const data = doc.data();
//             if (data.date && data.date.toDate) {
//                 data.date = data.date.toDate();
//             } else if (data.date) {
//                 data.date = new Date(data.date);
//             }
//             allTransactions.push({ id: doc.id, ...data });
//         });

//         // Initialize displayed data
//         displayedData = allTransactions;
//         updateDashboard(allTransactions);
        
//         if(allTransactions.length > 0 && !document.querySelector('.toast')) {
//             showToast("Sales data updated", "success");
//         }
//     }, (error) => {
//         console.error(error);
//         showToast("Error loading data", "error");
//     });

//     document.getElementById('applyFilterBtn')?.addEventListener('click', applyDateFilter);
//     document.getElementById('tableSearch')?.addEventListener('keyup', filterTable);
// });

// // --- THEME INIT ---
// function initTheme() {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//         document.body.classList.add('dark-mode');
//     }
// }

// function updateDashboard(data) {
//     calculateStats(data);
//     updateTable(data);
//     updateCharts(data);
// }

// function calculateStats(data) {
//     let totalSales = 0;
//     let totalOrders = data.length;
//     let cancelledOrders = 0;

//     data.forEach(t => {
//         const status = (t.status || 'completed').toLowerCase();
//         if (status !== 'cancelled' && status !== 'void') {
//             totalSales += parseFloat(t.totalAmount || 0);
//         } else {
//             cancelledOrders++;
//         }
//     });

//     const validOrders = totalOrders - cancelledOrders;
//     const avgOrder = validOrders > 0 ? (totalSales / validOrders) : 0;

//     document.getElementById('stat-total-sales').innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
//     document.getElementById('stat-total-orders').innerText = totalOrders;
//     document.getElementById('stat-avg-order').innerText = '₱' + avgOrder.toLocaleString(undefined, {minimumFractionDigits: 2});
//     document.getElementById('stat-cancelled').innerText = cancelledOrders;
// }

// function updateTable(data) {
//     const tbody = document.getElementById('salesTableBody');
//     tbody.innerHTML = '';

//     if (data.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color:var(--text-grey);">No transactions found</td></tr>';
//         document.getElementById('showingText').innerText = 'Showing 0 entries';
//         return;
//     }

//     const displayData = data.slice(0, 20);

//     displayData.forEach(t => {
//         const dateStr = t.date ? t.date.toLocaleDateString() + ' ' + t.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--';
        
//         let itemsSummary = '';
//         if(t.items && t.items.length > 0) {
//             itemsSummary = t.items.map(i => `${i.name} (x${i.qty})`).join(', ');
//             if(itemsSummary.length > 40) itemsSummary = itemsSummary.substring(0, 40) + '...';
//         } else {
//             itemsSummary = 'No items';
//         }

//         const status = t.status || 'Completed';
//         let statusClass = 'completed';
//         if(status.toLowerCase() === 'cancelled') statusClass = 'cancelled';
//         if(status.toLowerCase() === 'pending') statusClass = 'pending';

//         const row = `
//             <tr>
//                 <td style="font-weight:600; color: var(--primary);">#${t.orderId || t.id.substr(0,6)}</td>
//                 <td>${dateStr}</td>
//                 <td style="color:var(--text-grey); font-size:12px;">${itemsSummary}</td>
//                 <td style="font-weight:700;">₱${parseFloat(t.totalAmount || 0).toLocaleString()}</td>
//                 <td><span class="status ${statusClass}">${status}</span></td>
//                 <td>
//                     <button class="btn-icon" onclick="window.viewTransaction('${t.id}')"><i class="fas fa-eye"></i></button>
//                 </td>
//             </tr>
//         `;
//         tbody.innerHTML += row;
//     });

//     document.getElementById('showingText').innerText = `Showing ${displayData.length} of ${data.length} recent entries`;
// }

// function initCharts() {
//     const ctxTrend = document.getElementById('salesTrendChart').getContext('2d');
//     const gradient = ctxTrend.createLinearGradient(0, 0, 0, 300);
//     gradient.addColorStop(0, '#ff4e00');        
//     gradient.addColorStop(1, 'rgba(255, 78, 0, 0.4)'); 

//     salesChartInstance = new Chart(ctxTrend, {
//         type: 'bar', 
//         data: {
//             labels: [], 
//             datasets: [{
//                 label: 'Revenue',
//                 data: [],
//                 backgroundColor: gradient,
//                 borderRadius: 8,       
//                 borderSkipped: false,  
//                 barThickness: 25,      
//                 hoverBackgroundColor: '#e64a19'
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: { legend: { display: false } },
//             scales: {
//                 y: { 
//                     beginAtZero: true, 
//                     grid: { borderDash: [5,5], color: '#f0f0f0' },
//                     ticks: { font: { family: 'Poppins', size: 11 } }
//                 },
//                 x: { 
//                     grid: { display: false },
//                     ticks: { font: { family: 'Poppins', size: 11 } }
//                 }
//             },
//             animation: { duration: 1000, easing: 'easeOutQuart' }
//         }
//     });

//     const ctxTop = document.getElementById('topSellingChart').getContext('2d');
//     topSellingChartInstance = new Chart(ctxTop, {
//         type: 'doughnut',
//         data: {
//             labels: [],
//             datasets: [{
//                 data: [],
//                 backgroundColor: ['#ff4e00', '#ffc400', '#2e7d32', '#2196f3', '#9c27b0'],
//                 borderWidth: 0,
//                 hoverOffset: 6
//             }]
//         },
//         options: {
//             responsive: true, maintainAspectRatio: false,
//             plugins: { 
//                 legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 11, family: 'Poppins' } } }
//             },
//             cutout: '70%',
//             animation: { animateScale: true, animateRotate: true }
//         }
//     });
// }

// function updateCharts(data) {
//     const salesMap = {};
//     data.forEach(t => {
//         if((t.status||'').toLowerCase() === 'cancelled') return;
//         const d = t.date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}); 
//         salesMap[d] = (salesMap[d] || 0) + parseFloat(t.totalAmount || 0);
//     });

//     const dateObjs = Object.keys(salesMap).map(k => {
//         return { key: k, val: salesMap[k], date: new Date(k + ", " + new Date().getFullYear()) };
//     }).sort((a,b) => a.date - b.date);

//     const recentData = dateObjs.slice(-7);
    
//     if(salesChartInstance) {
//         salesChartInstance.data.labels = recentData.map(i => i.key);
//         salesChartInstance.data.datasets[0].data = recentData.map(i => i.val);
//         salesChartInstance.update();
//     }

//     const productCount = {};
//     data.forEach(t => {
//         if((t.status||'').toLowerCase() === 'cancelled') return;
//         if(t.items && Array.isArray(t.items)) {
//             t.items.forEach(item => {
//                 const name = item.name;
//                 const qty = item.qty || 0;
//                 productCount[name] = (productCount[name] || 0) + qty;
//             });
//         }
//     });

//     const sortedProducts = Object.entries(productCount)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 5);

//     const labels = sortedProducts.map(p => p[0]);
//     const values = sortedProducts.map(p => p[1]);

//     if(topSellingChartInstance) {
//         topSellingChartInstance.data.labels = labels;
//         topSellingChartInstance.data.datasets[0].data = values;
//         topSellingChartInstance.update();
//     }
// }

// function filterTable() {
//     const term = document.getElementById('tableSearch').value.toLowerCase();
//     const filtered = allTransactions.filter(t => 
//         (t.orderId && t.orderId.toLowerCase().includes(term))
//     );
//     // Table filtering doesn't update export data generally, but we could if we wanted.
//     // For now, let's keep export tied to the date filter/main dashboard view.
//     updateTable(filtered);
// }

// function applyDateFilter() {
//     const startVal = document.getElementById('customStartDate').value;
//     const endVal = document.getElementById('customEndDate').value;

//     if (!startVal || !endVal) {
//         showToast("Please select both start and end dates", "error");
//         return;
//     }
    
//     const startDate = new Date(startVal);
//     const endDate = new Date(endVal);
//     endDate.setHours(23, 59, 59);

//     if (startDate > endDate) {
//         showToast("Start date cannot be after end date", "error");
//         return;
//     }

//     const filtered = allTransactions.filter(t => t.date >= startDate && t.date <= endDate);
    
//     displayedData = filtered; // Update export set
//     updateDashboard(filtered);
//     showToast(`Filter applied: ${filtered.length} records found`);
// }

// window.viewTransaction = function(id) {
//     showToast(`Viewing transaction ${id.substring(0,6)}`);
// };

// // --- EXPORT FUNCTION ---
// window.exportData = function() {
//     if (!displayedData || displayedData.length === 0) {
//         showToast("No data to export", "error");
//         return;
//     }

//     showToast("Generating CSV...", "info");

//     const headers = ["Order ID", "Date", "Customer", "Items", "Total Amount", "Status", "Payment Method"];
    
//     // Map data to CSV rows
//     const rows = displayedData.map(t => {
//         // Handle fields safely
//         const orderId = t.orderId || t.id || 'N/A';
//         const dateStr = t.date ? t.date.toLocaleString().replace(',', '') : ''; // Remove commas for CSV safety
//         const customer = t.customer || 'Walk-in';
        
//         // Format Items: "Item A (x2); Item B (x1)"
//         let itemsStr = '';
//         if(t.items && Array.isArray(t.items)) {
//             itemsStr = t.items.map(i => `${i.name} (x${i.qty})`).join('; ');
//         }
//         // Escape quotes in item string if any
//         itemsStr = itemsStr.replace(/"/g, '""');

//         const amount = t.totalAmount || 0;
//         const status = t.status || 'Completed';
//         const method = t.method || t.paymentMethod || 'Cash';

//         // Return row as CSV string
//         return `"${orderId}","${dateStr}","${customer}","${itemsStr}",${amount},"${status}","${method}"`;
//     });

//     // Combine headers and rows
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    
//     // Download logic
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     const fileName = `sales_report_${new Date().toISOString().slice(0,10)}.csv`;
//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     showToast("Export successful!");
// };

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     const icon = type === 'success' ? 'fa-check-circle' : (type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle');
//     toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span class="toast-msg">${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         toast.style.transform = 'translateX(100%)';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }