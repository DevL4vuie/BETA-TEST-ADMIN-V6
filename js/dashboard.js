



// // js/dashboard.js
// import { 
//     db, collection, query, orderBy, onSnapshot, getDocs, auth 
// } from './firebase.js';
// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// let salesChart = null;
// let categoryChart = null;
// let peakHoursChart = null;
// let productCategoryMap = {}; 

// console.log("⚠️ DASHBOARD SCRIPT LOADED ⚠️");

// document.addEventListener('DOMContentLoaded', async () => {
//     // 1. Set Date
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // 2. Init UI
//     initDarkMode();
//     setupProfileDropdown();
    
//     // 3. Init Data
//     initCharts();
//     await loadProductCategories();

//     // 4. Listen for Realtime Transactions
//     console.log("Listening for transactions...");
//     const q = query(collection(db, "transactions"), orderBy("date", "asc"));
    
//     onSnapshot(q, (snapshot) => {
//         console.log(`Snapshot received! Found ${snapshot.size} documents.`);
        
//         const transactions = [];
//         snapshot.forEach((doc) => {
//             const data = doc.data();
//             // Fix Date Object
//             if (data.date && data.date.toDate) data.date = data.date.toDate();
//             else if (data.date) data.date = new Date(data.date);
            
//             // Add ID for debugging
//             data.docId = doc.id;
//             transactions.push(data);
//         });
        
//         updateDashboard(transactions);
//     }, (error) => {
//         console.error("Error getting transactions:", error);
//         alert("Error connecting to database. Check console.");
//     });
        
//     // 5. Update Profile Name
//     const username = localStorage.getItem('userName') || 'Administrator';
//     const role = localStorage.getItem('userRole') || 'Admin';
//     if(username) document.getElementById('display-name').innerText = username;
//     if(role) document.getElementById('display-role').innerText = role.toUpperCase();
// });

// // --- DATA FUNCTIONS ---

// async function loadProductCategories() {
//     try {
//         const catSnapshot = await getDocs(collection(db, "categories"));
//         const catNameMap = {};
//         catSnapshot.forEach(doc => {
//             const d = doc.data();
//             catNameMap[d.id] = d.name;
//         });

//         const prodSnapshot = await getDocs(collection(db, "products"));
//         prodSnapshot.forEach(doc => {
//             const d = doc.data();
//             const catName = catNameMap[d.category] || d.category || "General";
//             productCategoryMap[doc.id] = catName;
//             productCategoryMap[d.name] = catName; 
//         });
//     } catch (e) {
//         console.error("Error mapping categories:", e);
//     }
// }

// // --- *** THE IMPORTANT FIX *** ---
// // REPLACE your updateDashboard function with this CORRECTED version
// function updateDashboard(data) {
//     console.log("--- STARTING CALCULATION (FIXED) ---");

//     // VISUAL CHECK: Turn text GREEN to prove the fix is applied
//     const salesEl = document.getElementById('stat-total-sales');
//     if (salesEl) salesEl.style.color = "#2e7d32"; // Dark Green

//     let totalSales = 0;
//     let totalOrders = 0;
    
//     const salesByDate = {};
//     const categoryCounts = {};
//     const hoursCounts = new Array(24).fill(0);

//     data.forEach((t, index) => {
//         try {
//             // --- *** THE FIX IS HERE *** ---
//             // We now look for 'amountPaid' first, because that is what is in your DB
//             let amount = 0;

//             if (t.amountPaid !== undefined) {
//                 amount = Number(t.amountPaid);
//             } 
//             else if (t.totalAmount !== undefined) {
//                 amount = Number(t.totalAmount);
//             }
//             else if (t.total !== undefined) {
//                 amount = Number(t.total);
//             }
//             // Fallback: If no total found, sum up the items manually
//             else if (t.items && Array.isArray(t.items)) {
//                 t.items.forEach(item => {
//                     amount += (Number(item.price) || 0) * (Number(item.qty) || 1);
//                 });
//             }

//             // Debug: Print the first one so we can see if it worked
//             if (index === 0) console.log("First Order Amount Found:", amount);

//             // 2. Add to totals
//             totalSales += amount;
//             totalOrders++;

//             // 3. Charts Logic
//             if (t.date && typeof t.date.getMonth === 'function') {
//                 const dateKey = t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//                 salesByDate[dateKey] = (salesByDate[dateKey] || 0) + amount;
                
//                 const hour = t.date.getHours();
//                 if (!isNaN(hour)) hoursCounts[hour]++;
//             }

//             // 4. Categories
//             if(t.items && Array.isArray(t.items)) {
//                 t.items.forEach(item => {
//                     // Try to handle lowercase/uppercase mismatch
//                     let catName = "Others";
//                     if (item.category) catName = item.category;
//                     else if (productCategoryMap[item.id]) catName = productCategoryMap[item.id];
//                     else if (productCategoryMap[item.name]) catName = productCategoryMap[item.name];
                    
//                     categoryCounts[catName] = (categoryCounts[catName] || 0) + (Number(item.qty) || 1);
//                 });
//             }

//         } catch (err) {
//             console.error(`Error processing transaction at index ${index}:`, err);
//         }
//     });

//     console.log(`Final Calculation -> Sales: ${totalSales} | Orders: ${totalOrders}`);

//     // Update UI elements
//     const ordersEl = document.getElementById('stat-total-orders');
//     const avgEl = document.getElementById('stat-avg-sales');

//     if (salesEl) salesEl.innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
//     if (ordersEl) ordersEl.innerText = totalOrders;
    
//     const avg = totalOrders > 0 ? totalSales / totalOrders : 0;
//     if (avgEl) avgEl.innerText = '₱' + avg.toLocaleString(undefined, {minimumFractionDigits: 2});

//     // Update Charts
//     if (typeof updateSalesChart === "function") updateSalesChart(salesByDate);
//     if (typeof updateCategoryChart === "function") updateCategoryChart(categoryCounts);
//     if (typeof updatePeakHoursChart === "function") updatePeakHoursChart(hoursCounts);
// }

// // --- UI & CHARTS (No changes needed here usually) ---
// window.openProfileModal = function() { console.log("Open profile"); };
// window.openSettingsModal = function() { document.getElementById('settingsModal').style.display = 'flex'; };
// window.confirmLogout = function() { document.getElementById('logoutModal').style.display = 'flex'; };

// window.performLogout = function() {
//     signOut(auth).then(() => {
//         localStorage.clear();
//         window.location.href = 'index.html';
//     }).catch((error) => {
//         console.error("Logout Error:", error);
//     });
// };

// window.closeModals = function() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); };

// window.saveSettings = function() {
//     const toggle = document.getElementById('darkModeSwitch');
//     if (toggle) {
//         if (toggle.checked) {
//             document.body.classList.add('dark-mode');
//             localStorage.setItem('theme', 'dark');
//         } else {
//             document.body.classList.remove('dark-mode');
//             localStorage.setItem('theme', 'light');
//         }
//     }
//     window.closeModals();
// };

// window.onclick = function(event) { if (event.target.classList.contains('modal')) window.closeModals(); };

// function initDarkMode() {
//     const toggle = document.getElementById('darkModeSwitch');
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//         document.body.classList.add('dark-mode');
//         if(toggle) toggle.checked = true;
//     }
//     if(toggle) {
//         toggle.addEventListener('change', (e) => {
//             if(e.target.checked) {
//                 document.body.classList.add('dark-mode');
//                 localStorage.setItem('theme', 'dark');
//             } else {
//                 document.body.classList.remove('dark-mode');
//                 localStorage.setItem('theme', 'light');
//             }
//         });
//     }
// }

// function setupProfileDropdown() {
//     const profile = document.querySelector('.user-profile');
//     if(!profile) return;
//     profile.addEventListener('click', (e) => {
//         e.stopPropagation();
//         profile.classList.toggle('active');
//     });
//     document.addEventListener('click', () => {
//         profile.classList.remove('active');
//     });
// }

// function initCharts() {
//     const ctxSales = document.getElementById('salesTrendChart').getContext('2d');
//     const gradientSales = ctxSales.createLinearGradient(0, 0, 0, 300);
//     gradientSales.addColorStop(0, '#ff4e00');        
//     gradientSales.addColorStop(1, 'rgba(255, 78, 0, 0.3)'); 

//     salesChart = new Chart(ctxSales, {
//         type: 'bar',
//         data: { labels: [], datasets: [{ label: 'Revenue', data: [], backgroundColor: gradientSales, borderRadius: 6, barThickness: 30 }]},
//         options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { borderDash: [5,5] }}, x: { grid: { display: false } } }}
//     });

//     const ctxCat = document.getElementById('categoryChart').getContext('2d');
//     categoryChart = new Chart(ctxCat, {
//         type: 'doughnut',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 data: [], 
//                 backgroundColor: ['#ff4e00', '#ffc400', '#2e7d32', '#2196f3', '#9c27b0', '#607d8b'], 
//                 borderWidth: 0,
//                 hoverOffset: 20 
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             layout: { padding: 20 },
//             plugins: { legend: { position: 'right' } }, 
//             cutout: '70%' 
//         }
//     });

//     const ctxHours = document.getElementById('peakHoursChart').getContext('2d');
//     peakHoursChart = new Chart(ctxHours, {
//     type: 'bar',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 label: 'Transactions', 
//                 data: [], 
//                 backgroundColor: '#1a2b4c', 
//                 borderRadius: 4,
//                 hoverBackgroundColor: '#2c4270',
//                 hoverBorderColor: '#ffffff',
//                 hoverBorderWidth: 2 
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             plugins: { legend: { display: false } }, 
//             scales: { x: { grid: { display: false } }, y: { display: false } }
//         }
//     });
// }

// function updateSalesChart(salesMap) {
//     const dates = Object.keys(salesMap).slice(-7);
//     const values = dates.map(d => salesMap[d]);
//     salesChart.data.labels = dates;
//     salesChart.data.datasets[0].data = values;
//     salesChart.update();
// }

// function updateCategoryChart(catMap) {
//     const sorted = Object.entries(catMap).sort((a,b) => b[1] - a[1]).slice(0, 6);
//     categoryChart.data.labels = sorted.map(s => s[0]);
//     categoryChart.data.datasets[0].data = sorted.map(s => s[1]);
//     categoryChart.update();
// }

// function updatePeakHoursChart(hoursArr) {
//     const labels = [], data = [];
//     for(let i=8; i<=22; i++) {
//         labels.push(i > 12 ? (i-12)+'PM' : i+'AM');
//         data.push(hoursArr[i]);
//     }
//     peakHoursChart.data.labels = labels;
//     peakHoursChart.data.datasets[0].data = data;
//     peakHoursChart.update();
// }







// import { 
//     db, collection, query, orderBy, onSnapshot, getDocs, auth 
// } from './firebase.js';
// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// let salesChart, categoryChart, peakHoursChart, topProductsChart; // Added topProductsChart
// let productCategoryMap = {}; 
// let allTransactions = []; // Store raw data here for filtering

// console.log("⚠️ DASHBOARD V2 LOADED ⚠️");

// document.addEventListener('DOMContentLoaded', async () => {
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     initDarkMode();
//     setupProfileDropdown();
//     initCharts(); // Initialize all 4 charts
//     await loadProductCategories();

//     // Listen for Realtime Data
//     const q = query(collection(db, "transactions"), orderBy("date", "asc"));
    
//     onSnapshot(q, (snapshot) => {
//         allTransactions = []; // Reset storage
//         snapshot.forEach((doc) => {
//             const data = doc.data();
//             if (data.date && data.date.toDate) data.date = data.date.toDate();
//             else if (data.date) data.date = new Date(data.date);
//             data.docId = doc.id;
//             allTransactions.push(data);
//         });
        
//         // Initial Load: Show All
//         applyFilters(); 
//     }, (error) => {
//         console.error("Error getting transactions:", error);
//     });

//     // Setup Filter UI listeners
//     window.toggleFilterInput = toggleFilterInput;
//     window.applyFilters = applyFilters;
//     window.resetFilters = resetFilters;
// });

// // --- FILTER LOGIC ---
// function toggleFilterInput() {
//     const type = document.getElementById('filter-type').value;
//     document.getElementById('filter-date').style.display = type === 'date' ? 'block' : 'none';
//     document.getElementById('filter-month').style.display = type === 'month' ? 'block' : 'none';
// }

// function resetFilters() {
//     document.getElementById('filter-type').value = 'all';
//     toggleFilterInput();
//     applyFilters();
// }

// function applyFilters() {
//     const type = document.getElementById('filter-type').value;
//     const dateVal = document.getElementById('filter-date').value;
//     const monthVal = document.getElementById('filter-month').value;

//     let filteredData = allTransactions;

//     if (type === 'date' && dateVal) {
//         filteredData = allTransactions.filter(t => {
//             if(!t.date) return false;
//             return t.date.toISOString().split('T')[0] === dateVal;
//         });
//     } else if (type === 'month' && monthVal) {
//         filteredData = allTransactions.filter(t => {
//             if(!t.date) return false;
//             const tMonth = t.date.toISOString().slice(0, 7); // "2024-02"
//             return tMonth === monthVal;
//         });
//     }

//     updateDashboard(filteredData);
// }

// // --- MAIN DASHBOARD LOGIC ---
// function updateDashboard(data) {
//     console.log(`Updating Dashboard with ${data.length} records...`);

//     let totalSales = 0;
//     let totalOrders = 0;
//     let cancelledOrders = 0;
//     const uniqueCustomers = new Set(); // To count unique customers

//     const salesByDate = {};
//     const categoryCounts = {};
//     const productCounts = {}; // New for Top Products
//     const hoursCounts = new Array(24).fill(0);

//     data.forEach((t) => {
//         try {
//             // 1. Check Status (Assume 'status' field exists, or default to completed)
//             // If status is "Cancelled", count it and SKIP adding to sales
//             // const status = (t.status || 'completed').toLowerCase();
//             // if (status === 'cancelled') {
//             //     cancelledOrders++;
//             //     return; // Don't add to sales
//             // }
// // 1. Check Status
//             // FIX: Normalize to lowercase and check ALL invalid statuses
     
     
//             // const status = (t.status || 'completed').toLowerCase();
        
//         // if (status === 'cancelled' || status === 'void' || status === 'refunded') {
//         //     cancelledOrders++; 
//         //     return; // Skip adding to sales
//         // }


//         // // 2. Get Amount (Using your fixed logic)
//         // let amount = 0;
//         // if (t.amountPaid !== undefined) amount = Number(t.amountPaid);
//         // else if (t.totalAmount !== undefined) amount = Number(t.totalAmount);
//         // else if (t.total !== undefined) amount = Number(t.total);
//         // else if (t.items && Array.isArray(t.items)) {
//         //     t.items.forEach(item => amount += (Number(item.price) || 0) * (Number(item.qty) || 1));
//         // }



//         // 1. Check Status (Standardized Check)
//             const status = (t.status || 'completed').toLowerCase();
            
//             // IGNORE these statuses completely for sales calculation
//             if (status === 'cancelled' || status === 'void' || status === 'refunded') {
//                 cancelledOrders++; 
//                 return; // Skip adding to sales
//             }

//             // 2. Get Amount (Handles Partial vs Full Payment)
//             let amount = 0;

//             if (status === 'partial') {
//                 // If Partial, ONLY count the cash received (Downpayment)
//                 amount = Number(t.cashReceived || 0);
//             } else {
//                 // If Completed, count the Full Amount
//                 // Check your various field names in order of preference
//                 if (t.amountPaid !== undefined) amount = Number(t.amountPaid);
//                 else if (t.totalAmount !== undefined) amount = Number(t.totalAmount);
//                 else if (t.total !== undefined) amount = Number(t.total);
//                 else if (t.items && Array.isArray(t.items)) {
//                     // Fallback to calculating from items if no total is saved
//                     t.items.forEach(item => amount += (Number(item.price) || 0) * (Number(item.qty) || 1));
//                 }
//             }

//             // 3. Add to Totals
//             totalSales += amount;
//             totalOrders++;

//             // 4. Count Customer (Try 'customerName', 'customer', or 'orderId')
//             // Using orderId as fallback ensures "1 order = 1 customer" if no name provided
//             const custName = t.customerName || t.customer || t.orderId; 
//             if(custName) uniqueCustomers.add(custName);

//             // 5. Chart Data: Dates & Hours
//             if (t.date) {
//                 const dateKey = t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//                 salesByDate[dateKey] = (salesByDate[dateKey] || 0) + amount;
//                 const hour = t.date.getHours();
//                 if (!isNaN(hour)) hoursCounts[hour]++;
//             }

//             // 6. Chart Data: Categories & Products
//             if(t.items && Array.isArray(t.items)) {
//                 t.items.forEach(item => {
//                     const qty = Number(item.qty) || 1;
                    
//                     // Category
//                     let catName = item.category || productCategoryMap[item.id] || productCategoryMap[item.name] || "General";
//                     categoryCounts[catName] = (categoryCounts[catName] || 0) + qty;

//                     // Product (for new chart)
//                     const prodName = item.name || "Unknown Item";
//                     productCounts[prodName] = (productCounts[prodName] || 0) + qty;
//                 });
//             }

//         } catch (err) { console.error(err); }
//     });

//     // Update Text Stats
//     document.getElementById('stat-total-sales').innerText = '₱' + totalSales.toLocaleString(undefined, {minimumFractionDigits: 2});
//     document.getElementById('stat-total-orders').innerText = totalOrders;
//     document.getElementById('stat-cancelled').innerText = cancelledOrders;
//     document.getElementById('stat-total-customers').innerText = uniqueCustomers.size;

//     const avg = totalOrders > 0 ? totalSales / totalOrders : 0;
//     document.getElementById('stat-avg-sales').innerText = '₱' + avg.toLocaleString(undefined, {minimumFractionDigits: 2});

//     // Update Charts
//     updateSalesChart(salesByDate);
//     updateCategoryChart(categoryCounts);
//     updatePeakHoursChart(hoursCounts);
//     updateTopProductsChart(productCounts); // Call new chart function
// }

// // --- CHART INITIALIZATION ---
// function initCharts() {
//     // 1. Sales Chart
//    const ctxSales = document.getElementById('salesTrendChart').getContext('2d');
//     const gradientSales = ctxSales.createLinearGradient(0, 0, 0, 300);
//     gradientSales.addColorStop(0, '#ff4e00');        
//     gradientSales.addColorStop(1, 'rgba(255, 78, 0, 0.1)'); 

//     salesChart = new Chart(ctxSales, {
//         type: 'bar',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 label: 'Revenue', 
//                 data: [], 
//                 backgroundColor: gradientSales, 
//                 borderRadius: 4,
//                 barThickness: 25 // Slimmer bars for compact view
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             plugins: { legend: { display: false } }, 
//             scales: { 
//                 y: { beginAtZero: true, grid: { borderDash: [5,5] }, ticks: { font: { size: 10 } } }, 
//                 x: { grid: { display: false }, ticks: { font: { size: 10 } } } 
//             } 
//         }
//     });

//     // 2. Category Chart (Doughnut) - FIXED POP UP
//     const ctxCat = document.getElementById('categoryChart').getContext('2d');
//     categoryChart = new Chart(ctxCat, {
//         type: 'doughnut',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 data: [], 
//                 backgroundColor: ['#ff4e00', '#ffc400', '#2e7d32', '#2196f3', '#9c27b0'], 
//                 borderWidth: 0,
//                 hoverOffset: 15 // The "Pop Up" effect
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             layout: {
//                 padding: 10 // <--- ADDS ROOM FOR THE POP UP
//             },
//             plugins: { 
//                 legend: { 
//                     position: 'left', // Move to left to save vertical space
//                     labels: { boxWidth: 12, font: { size: 11 } }
//                 },
//                 tooltip: { enabled: true } // Ensure tooltips are on
//             }, 
//             cutout: '65%' 
//         }
//     });

//     // 3. Peak Hours Chart
//     const ctxHours = document.getElementById('peakHoursChart').getContext('2d');
//     peakHoursChart = new Chart(ctxHours, {
//         type: 'bar',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 label: 'Orders', 
//                 data: [], 
//                 backgroundColor: '#1a2b4c', 
//                 borderRadius: 4,
//                 hoverBackgroundColor: '#ff4e00'
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             plugins: { legend: { display: false } }, 
//             scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { display: false } }
//         }
//     });

//     // 4. Top Products Chart (Pie) - FIXED POP UP
//     const ctxProd = document.getElementById('topProductsChart').getContext('2d');
//     topProductsChart = new Chart(ctxProd, {
//         type: 'pie',
//         data: { 
//             labels: [], 
//             datasets: [{ 
//                 data: [], 
//                 backgroundColor: ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#00bcd4'], 
//                 borderWidth: 2,
//                 borderColor: '#ffffff',
//                 hoverOffset: 15 // The "Pop Up" effect
//             }]
//         },
//         options: { 
//             responsive: true, 
//             maintainAspectRatio: false, 
//             layout: {
//                 padding: 10 // <--- ADDS ROOM FOR THE POP UP
//             },
//             plugins: { 
//                 legend: { 
//                     position: 'left', // Move to left to save vertical space
//                     labels: { boxWidth: 12, font: { size: 11 } }
//                 } 
//             } 
//         }
//     });
// }

// function updateSalesChart(salesMap) {
//     const dates = Object.keys(salesMap);
//     const values = dates.map(d => salesMap[d]);
//     salesChart.data.labels = dates;
//     salesChart.data.datasets[0].data = values;
//     salesChart.update();
// }

// function updateCategoryChart(catMap) {
//     const sorted = Object.entries(catMap).sort((a,b) => b[1] - a[1]).slice(0, 5);
//     categoryChart.data.labels = sorted.map(s => s[0]);
//     categoryChart.data.datasets[0].data = sorted.map(s => s[1]);
//     categoryChart.update();
// }

// function updatePeakHoursChart(hoursArr) {
//     const labels = [];
//     const data = [];
//     for(let i=8; i<=22; i++) {
//         labels.push(i > 12 ? (i-12)+'PM' : i+'AM');
//         data.push(hoursArr[i]);
//     }
//     peakHoursChart.data.labels = labels;
//     peakHoursChart.data.datasets[0].data = data;
//     peakHoursChart.update();
// }

// function updateTopProductsChart(prodMap) {
//     // Sort by quantity sold, take top 5
//     const sorted = Object.entries(prodMap).sort((a,b) => b[1] - a[1]).slice(0, 5);
//     topProductsChart.data.labels = sorted.map(s => s[0]);
//     topProductsChart.data.datasets[0].data = sorted.map(s => s[1]);
//     topProductsChart.update();
// }

// // --- HELPER FUNCTIONS ---
// async function loadProductCategories() {
//     try {
//         const prodSnapshot = await getDocs(collection(db, "products"));
//         prodSnapshot.forEach(doc => {
//             const d = doc.data();
//             productCategoryMap[doc.id] = d.category || "General";
//             productCategoryMap[d.name] = d.category || "General"; 
//         });
//     } catch (e) { console.error("Error mapping categories:", e); }
// }

// function initDarkMode() { /* same as before */ }
// function setupProfileDropdown() { /* same as before */ }
// window.openProfileModal = function() { console.log("Open profile"); };
// window.openSettingsModal = function() { document.getElementById('settingsModal').style.display = 'flex'; };
// window.confirmLogout = function() { document.getElementById('logoutModal').style.display = 'flex'; };
// window.performLogout = function() { signOut(auth).then(() => { localStorage.clear(); window.location.href = 'index.html'; }); };
// window.closeModals = function() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); };
// window.saveSettings = function() { window.closeModals(); };
// window.onclick = function(event) { if (event.target.classList.contains('modal')) window.closeModals(); };

// // ==========================================
// // 🔴 PASTE AT THE BOTTOM OF BOTH FILES 🔴
// // ==========================================

// function getTransactionValue(t) {
//     // 1. Sanitize Status
//     const status = (t.status || 'completed').toLowerCase();

//     // 2. Ignore Bad Orders
//     if (status === 'cancelled' || status === 'void' || status === 'refunded') {
//         return 0;
//     }

//     // 3. Helper to clean numbers (turns "1,000" into 1000)
//     const parse = (val) => {
//         if (typeof val === 'number') return val;
//         if (!val) return 0;
//         return parseFloat(String(val).replace(/,/g, '').replace(/₱/g, '').trim()) || 0;
//     };

//     // 4. Logic: Partial = Downpayment Only
//     if (status === 'partial') {
//         return parse(t.cashReceived);
//     }

//     // 5. Logic: Completed = Full Amount (Strict Priority Order)
//     // We check fields in this specific order to ensure consistency
//     if (t.totalAmount !== undefined && t.totalAmount !== null) return parse(t.totalAmount);
//     if (t.total !== undefined && t.total !== null) return parse(t.total);
//     if (t.amount !== undefined && t.amount !== null) return parse(t.amount);
//     if (t.amountPaid !== undefined && t.amountPaid !== null) return parse(t.amountPaid);

//     // 6. Fallback: Calculate from items if total is missing
//     if (t.items && Array.isArray(t.items)) {
//         return t.items.reduce((sum, item) => sum + (parse(item.price) * parse(item.qty || 1)), 0);
//     }

//     return 0;
// }





import { 
    db, collection, query, orderBy, onSnapshot, getDocs, auth 
} from './firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

let salesChart, categoryChart, peakHoursChart, topProductsChart, inquiryChart;
let productCategoryMap = {}; 
let allTransactions = [];

console.log("⚠️ DASHBOARD V2 LOADED ⚠️");

document.addEventListener('DOMContentLoaded', async () => {
    const dateEl = document.getElementById('currentDate');
    if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    initDarkMode();
    setupProfileDropdown();
    initCharts();
    await loadProductCategories();

    // ── Transactions listener ──────────────────────────────────
    const q = query(collection(db, "transactions"), orderBy("date", "asc"));
    onSnapshot(q, (snapshot) => {
        allTransactions = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.date && data.date.toDate) data.date = data.date.toDate();
            else if (data.date) data.date = new Date(data.date);
            data.docId = doc.id;
            allTransactions.push(data);
        });
        applyFilters(); 
    }, (error) => {
        console.error("Error getting transactions:", error);
    });

    // ── Inquiries listener — fixes the 0 count issue ───────────
    listenToInquiries();

    window.toggleFilterInput = toggleFilterInput;
    window.applyFilters = applyFilters;
    window.resetFilters = resetFilters;
});

// ══════════════════════════════════════════════════════════════
//  INQUIRIES — live count + bar chart by day
// ══════════════════════════════════════════════════════════════
function listenToInquiries() {
    try {
        const q = query(collection(db, "inquiries"), orderBy("date", "desc"));
        onSnapshot(q, (snapshot) => {
            let total   = 0;
            let pending = 0;
            const byDay = {}; // { "Feb 23": 3, "Feb 22": 1, ... }

            snapshot.forEach(d => {
                const data = d.data();
                if (data.archived) return; // skip archived

                total++;
                if ((data.status || 'pending') === 'pending') pending++;

                // Build per-day count for the chart
                let dateObj = null;
                if (data.date && data.date.toDate) dateObj = data.date.toDate();
                else if (data.date) dateObj = new Date(data.date);

                if (dateObj && !isNaN(dateObj)) {
                    const key = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    byDay[key] = (byDay[key] || 0) + 1;
                }
            });

            // Update stat card
            const totalEl   = document.getElementById('stat-total-inquiries');
            const pendingEl = document.getElementById('stat-pending-inquiries');
            if (totalEl)   totalEl.textContent  = total;
            if (pendingEl) pendingEl.textContent = pending > 0 ? `${pending} pending` : '';

            // Update bar chart — sort by date ascending
            updateInquiryChart(byDay);
        }, err => {
            console.warn('Inquiry listener error:', err);
        });
    } catch(e) {
        console.warn('Could not start inquiry listener:', e);
    }
}

function updateInquiryChart(byDay) {
    if (!inquiryChart) return;

    // Sort the keys chronologically
    const sorted = Object.entries(byDay).sort((a, b) => {
        return new Date(a[0] + ' 2026') - new Date(b[0] + ' 2026');
    });

    // Keep last 14 days max so chart isn't cramped
    const recent = sorted.slice(-14);

    inquiryChart.data.labels = recent.map(e => e[0]);
    inquiryChart.data.datasets[0].data = recent.map(e => e[1]);
    inquiryChart.update();
}

// ══════════════════════════════════════════════════════════════
//  FILTER LOGIC
// ══════════════════════════════════════════════════════════════
function toggleFilterInput() {
    const type = document.getElementById('filter-type').value;
    document.getElementById('filter-date').style.display  = type === 'date'  ? 'block' : 'none';
    document.getElementById('filter-month').style.display = type === 'month' ? 'block' : 'none';
}

function resetFilters() {
    document.getElementById('filter-type').value = 'all';
    toggleFilterInput();
    applyFilters();
}

function applyFilters() {
    const type     = document.getElementById('filter-type').value;
    const dateVal  = document.getElementById('filter-date').value;
    const monthVal = document.getElementById('filter-month').value;

    let filteredData = allTransactions;

    if (type === 'date' && dateVal) {
        filteredData = allTransactions.filter(t => {
            if (!t.date) return false;
            return t.date.toISOString().split('T')[0] === dateVal;
        });
    } else if (type === 'month' && monthVal) {
        filteredData = allTransactions.filter(t => {
            if (!t.date) return false;
            return t.date.toISOString().slice(0, 7) === monthVal;
        });
    }

    updateDashboard(filteredData);
}

// ══════════════════════════════════════════════════════════════
//  MAIN DASHBOARD LOGIC
// ══════════════════════════════════════════════════════════════
function updateDashboard(data) {
    console.log(`Updating Dashboard with ${data.length} records...`);

    let totalSales = 0, totalOrders = 0, cancelledOrders = 0;
    const uniqueCustomers = new Set();
    const salesByDate = {}, categoryCounts = {}, productCounts = {};
    const hoursCounts = new Array(24).fill(0);

    data.forEach((t) => {
        try {
            const status = (t.status || 'completed').toLowerCase();
            if (status === 'cancelled' || status === 'void' || status === 'refunded') {
                cancelledOrders++;
                return;
            }

            let amount = 0;
            if (status === 'partial') {
                amount = Number(t.cashReceived || 0);
            } else {
                if      (t.amountPaid  !== undefined) amount = Number(t.amountPaid);
                else if (t.totalAmount !== undefined) amount = Number(t.totalAmount);
                else if (t.total       !== undefined) amount = Number(t.total);
                else if (t.items && Array.isArray(t.items)) {
                    t.items.forEach(item => amount += (Number(item.price) || 0) * (Number(item.qty) || 1));
                }
            }

            totalSales  += amount;
            totalOrders++;

            const custName = t.customerName || t.customer || t.orderId;
            if (custName) uniqueCustomers.add(custName);

            if (t.date) {
                const dateKey = t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                salesByDate[dateKey] = (salesByDate[dateKey] || 0) + amount;
                const hour = t.date.getHours();
                if (!isNaN(hour)) hoursCounts[hour]++;
            }

            if (t.items && Array.isArray(t.items)) {
                t.items.forEach(item => {
                    const qty     = Number(item.qty) || 1;
                    const catName = item.category || productCategoryMap[item.id] || productCategoryMap[item.name] || "General";
                    categoryCounts[catName] = (categoryCounts[catName] || 0) + qty;
                    const prodName = item.name || "Unknown Item";
                    productCounts[prodName]  = (productCounts[prodName]  || 0) + qty;
                });
            }
        } catch (err) { console.error(err); }
    });

    document.getElementById('stat-total-sales').innerText     = '₱' + totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('stat-total-orders').innerText    = totalOrders;
    document.getElementById('stat-cancelled').innerText       = cancelledOrders;
    document.getElementById('stat-total-customers').innerText = uniqueCustomers.size;

    const avg = totalOrders > 0 ? totalSales / totalOrders : 0;
    document.getElementById('stat-avg-sales').innerText = '₱' + avg.toLocaleString(undefined, { minimumFractionDigits: 2 });

    updateSalesChart(salesByDate);
    updateCategoryChart(categoryCounts);
    updatePeakHoursChart(hoursCounts);
    updateTopProductsChart(productCounts);
}

// ══════════════════════════════════════════════════════════════
//  CHART INITIALIZATION
// ══════════════════════════════════════════════════════════════
function initCharts() {
    // 1. Sales Trend
    const ctxSales = document.getElementById('salesTrendChart').getContext('2d');
    const gradientSales = ctxSales.createLinearGradient(0, 0, 0, 300);
    gradientSales.addColorStop(0, '#ff4e00');
    gradientSales.addColorStop(1, 'rgba(255,78,0,0.1)');
    salesChart = new Chart(ctxSales, {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Revenue', data: [], backgroundColor: gradientSales, borderRadius: 4, barThickness: 25 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { borderDash: [5,5] }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
    });

    // 2. Category Doughnut
    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctxCat, {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: ['#ff4e00','#ffc400','#2e7d32','#2196f3','#9c27b0'], borderWidth: 0, hoverOffset: 15 }] },
        options: { responsive: true, maintainAspectRatio: false, layout: { padding: 10 }, plugins: { legend: { position: 'left', labels: { boxWidth: 12, font: { size: 11 } } }, tooltip: { enabled: true } }, cutout: '65%' }
    });

    // 3. Peak Hours
    const ctxHours = document.getElementById('peakHoursChart').getContext('2d');
    peakHoursChart = new Chart(ctxHours, {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Orders', data: [], backgroundColor: '#1a2b4c', borderRadius: 4, hoverBackgroundColor: '#ff4e00' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { display: false } } }
    });

    // 4. Top Products Pie
    const ctxProd = document.getElementById('topProductsChart').getContext('2d');
    topProductsChart = new Chart(ctxProd, {
        type: 'pie',
        data: { labels: [], datasets: [{ data: [], backgroundColor: ['#e91e63','#9c27b0','#673ab7','#3f51b5','#00bcd4'], borderWidth: 2, borderColor: '#ffffff', hoverOffset: 15 }] },
        options: { responsive: true, maintainAspectRatio: false, layout: { padding: 10 }, plugins: { legend: { position: 'left', labels: { boxWidth: 12, font: { size: 11 } } } } }
    });

    // 5. ✅ NEW — Inquiries per Day bar chart
    const ctxInq = document.getElementById('inquiryChart').getContext('2d');
    inquiryChart = new Chart(ctxInq, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Inquiries',
                data: [],
                backgroundColor: 'rgba(0,121,107,0.75)',
                hoverBackgroundColor: '#00796b',
                borderRadius: 6,
                barThickness: 22,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.parsed.y} inquir${ctx.parsed.y === 1 ? 'y' : 'ies'}`
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { borderDash: [5,5] } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// ══════════════════════════════════════════════════════════════
//  CHART UPDATE FUNCTIONS
// ══════════════════════════════════════════════════════════════
function updateSalesChart(salesMap) {
    const dates = Object.keys(salesMap);
    salesChart.data.labels = dates;
    salesChart.data.datasets[0].data = dates.map(d => salesMap[d]);
    salesChart.update();
}

function updateCategoryChart(catMap) {
    const sorted = Object.entries(catMap).sort((a,b) => b[1]-a[1]).slice(0,5);
    categoryChart.data.labels = sorted.map(s => s[0]);
    categoryChart.data.datasets[0].data = sorted.map(s => s[1]);
    categoryChart.update();
}

function updatePeakHoursChart(hoursArr) {
    const labels = [], data = [];
    for (let i = 8; i <= 22; i++) {
        labels.push(i > 12 ? (i-12)+'PM' : i+'AM');
        data.push(hoursArr[i]);
    }
    peakHoursChart.data.labels = labels;
    peakHoursChart.data.datasets[0].data = data;
    peakHoursChart.update();
}

function updateTopProductsChart(prodMap) {
    const sorted = Object.entries(prodMap).sort((a,b) => b[1]-a[1]).slice(0,5);
    topProductsChart.data.labels = sorted.map(s => s[0]);
    topProductsChart.data.datasets[0].data = sorted.map(s => s[1]);
    topProductsChart.update();
}

// ══════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════
async function loadProductCategories() {
    try {
        const snap = await getDocs(collection(db, "products"));
        snap.forEach(doc => {
            const d = doc.data();
            productCategoryMap[doc.id] = d.category || "General";
            productCategoryMap[d.name] = d.category || "General";
        });
    } catch (e) { console.error("Error mapping categories:", e); }
}

function initDarkMode() { /* same as before */ }
function setupProfileDropdown() { /* same as before */ }

window.openProfileModal  = function() { console.log("Open profile"); };
window.openSettingsModal = function() { document.getElementById('settingsModal').style.display = 'flex'; };
window.confirmLogout     = function() { document.getElementById('logoutModal').style.display = 'flex'; };
window.performLogout     = function() { signOut(auth).then(() => { localStorage.clear(); window.location.href = 'index.html'; }); };
window.closeModals       = function() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); };
window.saveSettings      = function() { window.closeModals(); };
window.onclick           = function(e) { if (e.target.classList.contains('modal')) window.closeModals(); };

function getTransactionValue(t) {
    const status = (t.status || 'completed').toLowerCase();
    if (status === 'cancelled' || status === 'void' || status === 'refunded') return 0;
    const parse = (val) => {
        if (typeof val === 'number') return val;
        if (!val) return 0;
        return parseFloat(String(val).replace(/,/g, '').replace(/₱/g, '').trim()) || 0;
    };
    if (status === 'partial') return parse(t.cashReceived);
    if (t.totalAmount !== undefined && t.totalAmount !== null) return parse(t.totalAmount);
    if (t.total       !== undefined && t.total       !== null) return parse(t.total);
    if (t.amount      !== undefined && t.amount      !== null) return parse(t.amount);
    if (t.amountPaid  !== undefined && t.amountPaid  !== null) return parse(t.amountPaid);
    if (t.items && Array.isArray(t.items)) return t.items.reduce((sum, item) => sum + (parse(item.price) * parse(item.qty || 1)), 0);
    return 0;
}