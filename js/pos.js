
// // // //NEW CODE WITH CYD ALAS DOS NA
// // // // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // // // import { 
// // // //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, rtdb, ref, set
// // // // } from './firebase.js';

// // // // let products = [];
// // // // let cart = [];
// // // // let currentPaymentMethod = 'Cash'; 

// // // // document.addEventListener('DOMContentLoaded', () => {
// // // //     initTheme();
// // // //     generateOrderID();
    
// // // //     // --- CHECK LOGIN STATUS ---
// // // //     const userRole = localStorage.getItem('userRole'); 
// // // //     const logoutBtn = document.getElementById('logout-sidebar-item');
// // // //     if (userRole && userRole.toLowerCase() === 'cashier') {
// // // //         if(logoutBtn) logoutBtn.style.display = 'block';
// // // //     } else {
// // // //         if(logoutBtn) logoutBtn.style.display = 'none';
// // // //     }

// // // //     // --- DISPLAY DATE ---
// // // //     const dateEl = document.getElementById('currentDate');
// // // //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// // // //     // --- LOAD CATEGORIES ---
// // // //     onSnapshot(collection(db, "categories"), (snapshot) => {
// // // //         const tabs = document.getElementById('categoryTabs');
// // // //         if(tabs) {
// // // //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// // // //             snapshot.forEach(doc => {
// // // //                 const data = doc.data();
// // // //                 // FIX 1: Use data.name instead of doc.id to match products' category field
// // // //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// // // //             });
// // // //         }
// // // //     });

// // // //     // --- LOAD PRODUCTS ---
// // // //     onSnapshot(collection(db, "products"), (snapshot) => {
// // // //         products = [];
// // // //         snapshot.forEach(doc => {
// // // //             const data = doc.data();
// // // //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// // // //             products.push({ 
// // // //                 id: doc.id, 
// // // //                 ...data,
// // // //                 quantity: isNaN(stockVal) ? 0 : stockVal
// // // //             });
// // // //         });
// // // //         renderProducts(products);
// // // //     });

// // // //     // --- SEARCH BAR ---
// // // //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// // // //         const term = e.target.value.toLowerCase();
// // // //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// // // //         renderProducts(filtered);
// // // //     });

// // // //     // --- PAYMENT INPUT LISTENER ---
// // // //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // // // });

// // // // // =========================================================
// // // // // UI FUNCTIONS
// // // // // =========================================================

// // // // function initTheme() {
// // // //     if (localStorage.getItem('theme') === 'dark') {
// // // //         document.body.classList.add('dark-mode');
// // // //     }
// // // // }

// // // // window.openLogoutModal = function() {
// // // //     document.getElementById('logoutModal').style.display = 'flex';
// // // // };
// // // // window.closeLogoutModal = function() {
// // // //     document.getElementById('logoutModal').style.display = 'none';
// // // // };
// // // // window.confirmLogout = async function() {
// // // //     try {
// // // //         await signOut(auth);
// // // //         localStorage.removeItem('userRole');
// // // //         localStorage.removeItem('userName');
// // // //         window.location.href = 'index.html';
// // // //     } catch (error) {
// // // //         console.error("Logout Error:", error);
// // // //     }
// // // // };

// // // // function renderProducts(list) {
// // // //     const grid = document.getElementById('productsGrid');
// // // //     if(!grid) return;
// // // //     grid.innerHTML = '';
    
// // // //     if (list.length === 0) {
// // // //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// // // //         return;
// // // //     }

// // // //     list.forEach(p => {
// // // //         const qty = Number(p.quantity || p.stock || 0);
// // // //         const isOOS = qty <= 0;
        
// // // //         const card = document.createElement('div');
// // // //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// // // //         card.onclick = () => !isOOS && addToCart(p);
        
// // // //         const displayPrice = parseFloat(p.price || p.cost || 0);
// // // //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// // // //         const imageHtml = imgUrl 
// // // //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// // // //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// // // //         card.innerHTML = `
// // // //             ${imageHtml}
// // // //             <div class="product-info">
// // // //                 <div>
// // // //                     <h4>${p.name}</h4>
// // // //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// // // //                 </div>
// // // //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// // // //             </div>
// // // //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// // // //         `;
// // // //         grid.appendChild(card);
// // // //     });
// // // // }

// // // // window.filterProducts = function(catId, btn) {
// // // //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// // // //     if (btn) btn.classList.add('active');
// // // //     // FIX 1: Filter by category name (matches Firestore product's category field)
// // // //     const filtered = (catId === 'all') 
// // // //         ? products 
// // // //         : products.filter(p => 
// // // //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// // // //             (p.categoryId || '') === catId
// // // //         );
// // // //     renderProducts(filtered);
// // // // };

// // // // // =========================================================
// // // // // CART LOGIC
// // // // // =========================================================

// // // // function addToCart(product) {
// // // //     const existing = cart.find(i => i.id === product.id);
// // // //     const currentQty = existing ? existing.qty : 0;
// // // //     const productStock = Number(product.quantity || product.stock || 0);
    
// // // //     if (currentQty + 1 > productStock) {
// // // //         showToast("Not enough stock!", "error");
// // // //         return;
// // // //     }
// // // //     const priceToUse = parseFloat(product.price || product.cost || 0);

// // // //     if (existing) {
// // // //         existing.qty++;
// // // //     } else {
// // // //         cart.push({
// // // //             id: product.id,
// // // //             name: product.name,
// // // //             price: priceToUse,
// // // //             qty: 1
// // // //         });
// // // //     }
// // // //     renderCart();
// // // // }

// // // // function renderCart() {
// // // //     const container = document.getElementById('cartItems');
// // // //     if(!container) return;
// // // //     container.innerHTML = '';
// // // //     if (cart.length === 0) {
// // // //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// // // //         updateTotals(0);
// // // //         return;
// // // //     }
// // // //     let total = 0;
// // // //     cart.forEach((item, index) => {
// // // //         const itemTotal = item.price * item.qty;
// // // //         total += itemTotal;
// // // //         const div = document.createElement('div');
// // // //         div.className = 'cart-item';
// // // //         div.innerHTML = `
// // // //             <div class="item-info">
// // // //                 <h4>${item.name}</h4>
// // // //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// // // //             </div>
// // // //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// // // //             <div class="item-actions">
// // // //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// // // //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// // // //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// // // //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// // // //             </div>
// // // //         `;
// // // //         container.appendChild(div);
// // // //     });
// // // //     updateTotals(total);
// // // // }

// // // // window.updateQty = function(index, change) {
// // // //     const item = cart[index];
// // // //     const product = products.find(p => p.id === item.id);
// // // //     if (change === 1) {
// // // //         const productStock = Number(product.quantity || product.stock || 0);
// // // //         if (item.qty + 1 > productStock) {
// // // //             showToast("Max stock reached", "error");
// // // //             return;
// // // //         }
// // // //         item.qty++;
// // // //     } else {
// // // //         if (item.qty > 1) item.qty--;
// // // //         else cart.splice(index, 1);
// // // //     }
// // // //     renderCart();
// // // // };

// // // // window.removeItem = function(index) {
// // // //     cart.splice(index, 1);
// // // //     renderCart();
// // // // };

// // // // window.clearCart = function() {
// // // //     if(cart.length === 0) return;
// // // //     document.getElementById('clearOrderModal').style.display = 'flex';
// // // // };
// // // // window.closeClearModal = function() {
// // // //     document.getElementById('clearOrderModal').style.display = 'none';
// // // // };
// // // // window.confirmClearOrder = function() {
// // // //     cart = [];
// // // //     renderCart();
// // // //     window.closeClearModal();
// // // //     showToast("Order cleared", "success");
// // // // };

// // // // // FIX 2: updateTotals now updates ALL cart footer displays + modal
// // // // function updateTotals(subtotal) {
// // // //     const total = subtotal;
// // // //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// // // //     // Cart footer
// // // //     const subtotalEl = document.getElementById('subtotalDisplay');
// // // //     const vatEl = document.getElementById('vatDisplay');
// // // //     const totalEl = document.getElementById('totalDisplay');
// // // //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// // // //     if(vatEl) vatEl.innerText = fmt(0);
// // // //     if(totalEl) totalEl.innerText = fmt(total);

// // // //     // Payment modal total (set dataset.value for calculateChange to use)
// // // //     const modalTotal = document.getElementById('modalTotalAmount');
// // // //     if(modalTotal) {
// // // //         modalTotal.dataset.value = total;
// // // //         modalTotal.innerText = fmt(total);
// // // //     }
// // // // }

// // // // // =========================================================
// // // // // PAYMENT MODAL
// // // // // =========================================================

// // // // window.openPaymentModal = function() {
// // // //     if (cart.length === 0) {
// // // //         showToast("Cart is empty!", "error");
// // // //         return;
// // // //     }
// // // //     document.getElementById('paymentModal').style.display = 'flex';
// // // //     document.getElementById('amountPaid').value = '';
// // // //     document.getElementById('changeAmount').innerText = '₱0.00';
// // // //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// // // //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // // //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// // // //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // // // };
// // // // window.closePaymentModal = function() {
// // // //     document.getElementById('paymentModal').style.display = 'none';
// // // // };

// // // // // window.setPaymentMethod = function(method, btn) {
// // // // //     currentPaymentMethod = method;
// // // // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // // // //     btn.classList.add('active');
    
// // // // //     const cashDiv = document.getElementById('cash-payment-section');
// // // // //     const digitalDiv = document.getElementById('digital-payment-section');
// // // // //     const qrDiv = document.getElementById('qr-code-section');
    
// // // // //     if (method === 'Cash') {
// // // // //         if(cashDiv) cashDiv.style.display = 'block';
// // // // //         if(digitalDiv) digitalDiv.style.display = 'none';
// // // // //         if(qrDiv) qrDiv.style.display = 'none';
// // // // //     } else {
// // // // //         if(cashDiv) cashDiv.style.display = 'none';
// // // // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // // // //         if(qrDiv) qrDiv.style.display = 'flex';
// // // // //     }
// // // // // };

// // // // window.setPaymentMethod = function(method, btn) {
// // // //     currentPaymentMethod = method;
// // // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // // //     btn.classList.add('active');
    
// // // //     const cashDiv = document.getElementById('cash-payment-section');
// // // //     const digitalDiv = document.getElementById('digital-payment-section');
// // // //     const nfcDiv = document.getElementById('nfc-payment-section');
// // // //     const qrDiv = document.getElementById('qr-code-section');
    
// // // //     // Hide all sections first
// // // //     if(cashDiv) cashDiv.style.display = 'none';
// // // //     if(digitalDiv) digitalDiv.style.display = 'none';
// // // //     if(nfcDiv) nfcDiv.style.display = 'none';
// // // //     if(qrDiv) qrDiv.style.display = 'none';
    
// // // //     // Show relevant section
// // // //     if (method === 'Cash') {
// // // //         if(cashDiv) cashDiv.style.display = 'block';
// // // //     } else if (method === 'NFC') {
// // // //         if(nfcDiv) nfcDiv.style.display = 'block';
// // // //         startNFCListening(); // Start listening for ESP32
// // // //     } else {
// // // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // // //         if(qrDiv) qrDiv.style.display = 'flex';
// // // //     }
// // // // };




// // // // let nfcListenerInterval = null;

// // // // function startNFCListening() {
// // // //     // Show "waiting" status
// // // //     const nfcStatus = document.getElementById('nfcStatus');
// // // //     if(nfcStatus) {
// // // //         nfcStatus.style.display = 'block';
// // // //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for tap...';
// // // //     }
    
// // // //     // Poll backend for NFC payment signal from ESP32
// // // //     nfcListenerInterval = setInterval(async () => {
// // // //         try {
// // // //             const response = await fetch('/api/nfc-payment-status'); // Your backend endpoint
// // // //             const data = await response.json();
            
// // // //             if(data.status === 'processing') {
// // // //                 // Show processing animation
// // // //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// // // //             } else if(data.status === 'success') {
// // // //                 // Payment confirmed!
// // // //                 clearInterval(nfcListenerInterval);
// // // //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle" style="color:#4caf50"></i> Payment successful!';
                
// // // //                 // Auto-complete the payment
// // // //                 setTimeout(() => {
// // // //                     processNFCPayment(data);
// // // //                 }, 1000);
// // // //             }
// // // //         } catch(err) {
// // // //             console.error('NFC polling error:', err);
// // // //         }
// // // //     }, 1000); // Check every second
// // // // }

// // // // function stopNFCListening() {
// // // //     if(nfcListenerInterval) {
// // // //         clearInterval(nfcListenerInterval);
// // // //         nfcListenerInterval = null;
// // // //     }
// // // // }

// // // // async function processNFCPayment(nfcData) {
// // // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // // //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // // //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// // // //     const orderId = document.getElementById('orderNumber').innerText;
    
// // // //     const orderData = {
// // // //         date: new Date().toISOString(),
// // // //         orderId: orderId,
// // // //         customer: custName,
// // // //         contact: custPhone,
// // // //         items: cart,
// // // //         total: total,
// // // //         method: 'NFC',
// // // //         cashReceived: total, // NFC always exact amount
// // // //         change: 0,
// // // //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// // // //         cashier: localStorage.getItem('userName') || 'Staff'
// // // //     };
    
// // // //     try {
// // // //         // Save transaction
// // // //         await addDoc(collection(db, "transactions"), orderData);
        
// // // //         // Send to kitchen
// // // //         await sendToKitchen(orderId, cart);
        
// // // //         // Reduce stock
// // // //         for (let item of cart) {
// // // //             const productRef = doc(db, "products", item.id);
// // // //             const prodSnap = products.find(p => p.id === item.id);
// // // //             if(prodSnap) {
// // // //                 const currentStock = Number(prodSnap.quantity || 0);
// // // //                 await updateDoc(productRef, { quantity: currentStock - item.qty });
// // // //             }
// // // //         }
        
// // // //         showReceipt(orderData);
// // // //         window.closePaymentModal();
        
// // // //         cart = [];
// // // //         renderCart();
// // // //         generateOrderID();
// // // //         showToast("NFC Payment Successful!", "success");
        
// // // //     } catch(err) {
// // // //         console.error(err);
// // // //         showToast("Transaction Failed", "error");
// // // //     }
// // // // }

// // // // // Update closePaymentModal to stop NFC listening
// // // // const originalClosePaymentModal = window.closePaymentModal;
// // // // window.closePaymentModal = function() {
// // // //     stopNFCListening();
// // // //     originalClosePaymentModal();
// // // // };




// // // // window.setCash = function(amount) {
// // // //     const input = document.getElementById('amountPaid');
// // // //     const currentVal = parseFloat(input.value) || 0;
// // // //     input.value = currentVal + amount;
// // // //     calculateChange();
// // // // };

// // // // function calculateChange() {
// // // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // // //     const input = document.getElementById('amountPaid');
// // // //     const paid = parseFloat(input.value || 0);
// // // //     const change = paid - total;
// // // //     const changeEl = document.getElementById('changeAmount');
    
// // // //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// // // //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // // // }

// // // // // =========================================================
// // // // // PROCESS FULL PAYMENT
// // // // // =========================================================

// // // // window.processPayment = async function() {
// // // //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// // // //     setBtnLoading(payBtn, true);

// // // //     try {
// // // //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // // //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // // //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// // // //         const orderId = document.getElementById('orderNumber').innerText; 
        
// // // //         let paid = 0;
// // // //         let refNum = '-';

// // // //         if (currentPaymentMethod === 'Cash') {
// // // //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// // // //             if (paid < total) {
// // // //                 showToast("Insufficient Cash", "error");
// // // //                 throw new Error("Insufficient Cash"); 
// // // //             }
// // // //         } else {
// // // //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// // // //             refNum = refInput ? refInput.value : '';
// // // //             paid = total; 
// // // //             if (!refNum) {
// // // //                 showToast("Please enter Reference Number", "error");
// // // //                 throw new Error("Missing Reference"); 
// // // //             }
// // // //         }

// // // //         const orderData = {
// // // //             date: new Date().toISOString(),
// // // //             orderId: orderId,
// // // //             customer: custName,
// // // //             contact: custPhone,
// // // //             items: cart,
// // // //             total: total,
// // // //             method: currentPaymentMethod,
// // // //             cashReceived: paid,
// // // //             change: paid - total,
// // // //             reference: refNum,
// // // //             cashier: localStorage.getItem('userName') || 'Staff'
// // // //         };

// // // //         await addDoc(collection(db, "transactions"), orderData);
// // // //         await sendToKitchen(orderId, cart);

// // // //         for (let item of cart) {
// // // //             const productRef = doc(db, "products", item.id);
// // // //             const prodSnap = products.find(p => p.id === item.id); 
// // // //             if(prodSnap) {
// // // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // // //                 const newQty = currentStock - item.qty;
// // // //                 await updateDoc(productRef, { quantity: newQty });
// // // //             }
// // // //         }

// // // //         showReceipt(orderData);
// // // //         window.closePaymentModal();
        
// // // //         cart = [];
// // // //         renderCart();
// // // //         generateOrderID();
// // // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // // //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// // // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// // // //         showToast("Payment Successful!", "success");

// // // //     } catch (err) {
// // // //         console.error(err);
// // // //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// // // //             showToast("Transaction Failed", "error");
// // // //         }
// // // //     } finally {
// // // //         setBtnLoading(payBtn, false);
// // // //     }
// // // // };

// // // // // =========================================================
// // // // // PROCESS DOWNPAYMENT
// // // // // =========================================================

// // // // window.processDownpayment = async function() {
// // // //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// // // //     if (currentPaymentMethod !== 'Cash') {
// // // //         window.openDigitalDPModal();
// // // //         return;
// // // //     }

// // // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // // //     const cashInput = document.getElementById('amountPaid');
// // // //     let cashReceived = 0;
    
// // // //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// // // //     if (isNaN(cashReceived) || cashReceived <= 0) {
// // // //         return showToast('Please enter a valid amount', 'error');
// // // //     }
// // // //     if (cashReceived >= total) {
// // // //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// // // //     }

// // // //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// // // //     setBtnLoading(dpBtn, true);

// // // //     try {
// // // //         await saveDownpayment(cashReceived, 'Cash', '');
// // // //     } catch (e) {
// // // //         console.error(e);
// // // //     } finally {
// // // //         setBtnLoading(dpBtn, false);
// // // //     }
// // // // };

// // // // window.openDigitalDPModal = function() {
// // // //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// // // //     document.getElementById('digi-dp-amount').value = '';
// // // //     const mainRef = document.getElementById('referenceNumber');
// // // //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// // // //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// // // //     document.getElementById('digi-dp-amount').focus();
// // // // };
// // // // window.closeDigitalDPModal = function() {
// // // //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // // // };
// // // // window.confirmDigitalDP = async function() {
// // // //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// // // //     const refVal = document.getElementById('digi-dp-ref').value;
// // // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// // // //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// // // //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// // // //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// // // //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// // // //     setBtnLoading(confirmBtn, true);

// // // //     try {
// // // //         window.closeDigitalDPModal();
// // // //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// // // //     } catch (e) {
// // // //         console.error(e);
// // // //     } finally {
// // // //         setBtnLoading(confirmBtn, false);
// // // //     }
// // // // };

// // // // async function saveDownpayment(amountPaid, method, reference) {
// // // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // // //     const balance = total - amountPaid;
// // // //     const orderId = document.getElementById('orderNumber').innerText; 

// // // //     const orderData = {
// // // //         orderId: orderId,
// // // //         date: new Date().toISOString(),
// // // //         items: cart,
// // // //         total: total,
// // // //         cashReceived: amountPaid,
// // // //         change: 0, 
// // // //         balance: balance,
// // // //         method: method,
// // // //         reference: reference,
// // // //         status: 'Partial',
// // // //         cashier: localStorage.getItem('userName') || 'Staff',
// // // //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// // // //         contact: document.getElementById('customerPhone')?.value || '-'
// // // //     };

// // // //     try {
// // // //         await addDoc(collection(db, "transactions"), orderData); 
// // // //         await sendToKitchen(orderId, cart);

// // // //         for (let item of cart) {
// // // //             const productRef = doc(db, "products", item.id);
// // // //             const prodSnap = products.find(p => p.id === item.id); 
// // // //             if(prodSnap) {
// // // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // // //                 const newQty = currentStock - item.qty;
// // // //                 await updateDoc(productRef, { quantity: newQty });
// // // //             }
// // // //         }

// // // //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// // // //         document.getElementById('paymentModal').style.display = 'none';
// // // //         document.getElementById('receiptModal').style.display = 'flex';
        
// // // //         cart = [];
// // // //         renderCart();
// // // //         generateOrderID();
// // // //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// // // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// // // //         showToast('Downpayment recorded!', 'success');
// // // //     } catch (error) {
// // // //         console.error("Error saving order: ", error);
// // // //         showToast('Error saving order', 'error');
// // // //         throw error; 
// // // //     }
// // // // }

// // // // // =========================================================
// // // // // RECEIPT UTILS
// // // // // =========================================================

// // // // function showReceipt(data) {
// // // //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// // // //     document.getElementById('receiptModal').style.display = 'flex';
// // // // }

// // // // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// // // //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// // // //     document.getElementById('rec-orderId').innerText = data.orderId;
// // // //     document.getElementById('rec-cashier').innerText = data.cashier;
// // // //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// // // //     const itemsDiv = document.getElementById('rec-items');
// // // //     itemsDiv.innerHTML = '';
// // // //     data.items.forEach(item => {
// // // //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// // // //     });

// // // //     document.getElementById('rec-total').innerText = total.toFixed(2);
// // // //     document.getElementById('rec-method').innerText = method;

// // // //     const rowBalance = document.getElementById('row-balance');
// // // //     if(balance > 0) {
// // // //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// // // //         document.getElementById('row-change').style.display = 'none';
// // // //     } else {
// // // //         if(rowBalance) rowBalance.style.display = 'none';
// // // //         document.getElementById('row-change').style.display = 'flex';
// // // //         const change = paid - total;
// // // //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// // // //     }

// // // //     if(method === 'Cash') {
// // // //         document.getElementById('row-cash-paid').style.display = 'flex';
// // // //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// // // //         document.getElementById('row-ref').style.display = 'none';
// // // //     } else {
// // // //         document.getElementById('row-cash-paid').style.display = 'none';
// // // //         document.getElementById('row-change').style.display = 'none';
// // // //         document.getElementById('row-ref').style.display = 'flex';
// // // //         document.getElementById('rec-ref').innerText = refNum;
// // // //     }
// // // // }

// // // // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // // // window.printReceipt = function() { window.print(); };

// // // // function generateOrderID() {
// // // //     const randomId = Math.floor(100000 + Math.random() * 900000);
// // // //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // // // }

// // // // function showToast(msg, type) {
// // // //     const container = document.getElementById('toast-container');
// // // //     const toast = document.createElement('div');
// // // //     toast.className = `toast ${type}`;
// // // //     toast.innerHTML = type === 'success' 
// // // //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// // // //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// // // //     container.appendChild(toast);
// // // //     setTimeout(() => toast.remove(), 3000);
// // // // }

// // // // function setBtnLoading(btn, isLoading) {
// // // //     if(!btn) return;
// // // //     if(isLoading) {
// // // //         btn.dataset.originalText = btn.innerHTML;
// // // //         btn.disabled = true;
// // // //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// // // //     } else {
// // // //         btn.disabled = false;
// // // //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// // // //     }
// // // // }

// // // // // =========================================================
// // // // // SEND TO KITCHEN
// // // // // =========================================================

// // // // async function sendToKitchen(orderId, cartItems) {
// // // //     if (!cartItems || cartItems.length === 0) return;
// // // //     try {
// // // //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// // // //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// // // //             table: orderId,
// // // //             items: itemsString,
// // // //             timestamp: Date.now()
// // // //         });
// // // //         console.log("✅ Sent to Kitchen!");
// // // //     } catch (e) {
// // // //         console.error("❌ Error sending to kitchen:", e);
// // // //     }
// // // // }









// // // //NEW CODE WITH CYD + NFC INTEGRATION (CORRECTED)
// // // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // // import { 
// // //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
// // //     rtdb, ref, set, onValue, remove
// // // } from './firebase.js';

// // // let products = [];
// // // let cart = [];
// // // let currentPaymentMethod = 'Cash';
// // // let nfcListener = null;

// // // document.addEventListener('DOMContentLoaded', () => {
// // //     initTheme();
// // //     generateOrderID();
    
// // //     // --- CHECK LOGIN STATUS ---
// // //     const userRole = localStorage.getItem('userRole'); 
// // //     const logoutBtn = document.getElementById('logout-sidebar-item');
// // //     if (userRole && userRole.toLowerCase() === 'cashier') {
// // //         if(logoutBtn) logoutBtn.style.display = 'block';
// // //     } else {
// // //         if(logoutBtn) logoutBtn.style.display = 'none';
// // //     }

// // //     // --- DISPLAY DATE ---
// // //     const dateEl = document.getElementById('currentDate');
// // //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// // //     // --- LOAD CATEGORIES ---
// // //     onSnapshot(collection(db, "categories"), (snapshot) => {
// // //         const tabs = document.getElementById('categoryTabs');
// // //         if(tabs) {
// // //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// // //             snapshot.forEach(doc => {
// // //                 const data = doc.data();
// // //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// // //             });
// // //         }
// // //     });

// // //     // --- LOAD PRODUCTS ---
// // //     onSnapshot(collection(db, "products"), (snapshot) => {
// // //         products = [];
// // //         snapshot.forEach(doc => {
// // //             const data = doc.data();
// // //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// // //             products.push({ 
// // //                 id: doc.id, 
// // //                 ...data,
// // //                 quantity: isNaN(stockVal) ? 0 : stockVal
// // //             });
// // //         });
// // //         renderProducts(products);
// // //     });

// // //     // --- SEARCH BAR ---
// // //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// // //         const term = e.target.value.toLowerCase();
// // //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// // //         renderProducts(filtered);
// // //     });

// // //     // --- PAYMENT INPUT LISTENER ---
// // //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // // });

// // // // =========================================================
// // // // UI FUNCTIONS
// // // // =========================================================

// // // function initTheme() {
// // //     if (localStorage.getItem('theme') === 'dark') {
// // //         document.body.classList.add('dark-mode');
// // //     }
// // // }

// // // window.openLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'flex';
// // // };
// // // window.closeLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'none';
// // // };
// // // window.confirmLogout = async function() {
// // //     try {
// // //         await signOut(auth);
// // //         localStorage.removeItem('userRole');
// // //         localStorage.removeItem('userName');
// // //         window.location.href = 'index.html';
// // //     } catch (error) {
// // //         console.error("Logout Error:", error);
// // //     }
// // // };

// // // function renderProducts(list) {
// // //     const grid = document.getElementById('productsGrid');
// // //     if(!grid) return;
// // //     grid.innerHTML = '';
    
// // //     if (list.length === 0) {
// // //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// // //         return;
// // //     }

// // //     list.forEach(p => {
// // //         const qty = Number(p.quantity || p.stock || 0);
// // //         const isOOS = qty <= 0;
        
// // //         const card = document.createElement('div');
// // //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// // //         card.onclick = () => !isOOS && addToCart(p);
        
// // //         const displayPrice = parseFloat(p.price || p.cost || 0);
// // //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// // //         const imageHtml = imgUrl 
// // //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// // //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// // //         card.innerHTML = `
// // //             ${imageHtml}
// // //             <div class="product-info">
// // //                 <div>
// // //                     <h4>${p.name}</h4>
// // //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// // //                 </div>
// // //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// // //             </div>
// // //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// // //         `;
// // //         grid.appendChild(card);
// // //     });
// // // }

// // // window.filterProducts = function(catId, btn) {
// // //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// // //     if (btn) btn.classList.add('active');
// // //     const filtered = (catId === 'all') 
// // //         ? products 
// // //         : products.filter(p => 
// // //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// // //             (p.categoryId || '') === catId
// // //         );
// // //     renderProducts(filtered);
// // // };

// // // // =========================================================
// // // // CART LOGIC
// // // // =========================================================

// // // function addToCart(product) {
// // //     const existing = cart.find(i => i.id === product.id);
// // //     const currentQty = existing ? existing.qty : 0;
// // //     const productStock = Number(product.quantity || product.stock || 0);
    
// // //     if (currentQty + 1 > productStock) {
// // //         showToast("Not enough stock!", "error");
// // //         return;
// // //     }
// // //     const priceToUse = parseFloat(product.price || product.cost || 0);

// // //     if (existing) {
// // //         existing.qty++;
// // //     } else {
// // //         cart.push({
// // //             id: product.id,
// // //             name: product.name,
// // //             price: priceToUse,
// // //             qty: 1
// // //         });
// // //     }
// // //     renderCart();
// // // }

// // // function renderCart() {
// // //     const container = document.getElementById('cartItems');
// // //     if(!container) return;
// // //     container.innerHTML = '';
// // //     if (cart.length === 0) {
// // //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// // //         updateTotals(0);
// // //         return;
// // //     }
// // //     let total = 0;
// // //     cart.forEach((item, index) => {
// // //         const itemTotal = item.price * item.qty;
// // //         total += itemTotal;
// // //         const div = document.createElement('div');
// // //         div.className = 'cart-item';
// // //         div.innerHTML = `
// // //             <div class="item-info">
// // //                 <h4>${item.name}</h4>
// // //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// // //             </div>
// // //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// // //             <div class="item-actions">
// // //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// // //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// // //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// // //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// // //             </div>
// // //         `;
// // //         container.appendChild(div);
// // //     });
// // //     updateTotals(total);
// // // }

// // // window.updateQty = function(index, change) {
// // //     const item = cart[index];
// // //     const product = products.find(p => p.id === item.id);
// // //     if (change === 1) {
// // //         const productStock = Number(product.quantity || product.stock || 0);
// // //         if (item.qty + 1 > productStock) {
// // //             showToast("Max stock reached", "error");
// // //             return;
// // //         }
// // //         item.qty++;
// // //     } else {
// // //         if (item.qty > 1) item.qty--;
// // //         else cart.splice(index, 1);
// // //     }
// // //     renderCart();
// // // };

// // // window.removeItem = function(index) {
// // //     cart.splice(index, 1);
// // //     renderCart();
// // // };

// // // window.clearCart = function() {
// // //     if(cart.length === 0) return;
// // //     document.getElementById('clearOrderModal').style.display = 'flex';
// // // };
// // // window.closeClearModal = function() {
// // //     document.getElementById('clearOrderModal').style.display = 'none';
// // // };
// // // window.confirmClearOrder = function() {
// // //     cart = [];
// // //     renderCart();
// // //     window.closeClearModal();
// // //     showToast("Order cleared", "success");
// // // };

// // // function updateTotals(subtotal) {
// // //     const total = subtotal;
// // //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// // //     // Cart footer
// // //     const subtotalEl = document.getElementById('subtotalDisplay');
// // //     const vatEl = document.getElementById('vatDisplay');
// // //     const totalEl = document.getElementById('totalDisplay');
// // //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// // //     if(vatEl) vatEl.innerText = fmt(0);
// // //     if(totalEl) totalEl.innerText = fmt(total);

// // //     // Payment modal total
// // //     const modalTotal = document.getElementById('modalTotalAmount');
// // //     if(modalTotal) {
// // //         modalTotal.dataset.value = total;
// // //         modalTotal.innerText = fmt(total);
// // //     }
// // // }

// // // // =========================================================
// // // // PAYMENT MODAL
// // // // =========================================================

// // // window.openPaymentModal = function() {
// // //     if (cart.length === 0) {
// // //         showToast("Cart is empty!", "error");
// // //         return;
// // //     }
// // //     document.getElementById('paymentModal').style.display = 'flex';
// // //     document.getElementById('amountPaid').value = '';
// // //     document.getElementById('changeAmount').innerText = '₱0.00';
// // //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// // //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// // //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // // };

// // // // Override closePaymentModal to stop NFC listening
// // // const originalClosePaymentModal = window.closePaymentModal;
// // // window.closePaymentModal = function() {
// // //     stopNFCListening();
// // //     if(originalClosePaymentModal) {
// // //         originalClosePaymentModal();
// // //     } else {
// // //         document.getElementById('paymentModal').style.display = 'none';
// // //     }
// // // };

// // // // =========================================================
// // // // PAYMENT METHOD SELECTION + NFC INTEGRATION
// // // // =========================================================

// // // window.setPaymentMethod = function(method, btn) {
// // //     currentPaymentMethod = method;
// // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // //     btn.classList.add('active');
    
// // //     const cashDiv = document.getElementById('cash-payment-section');
// // //     const digitalDiv = document.getElementById('digital-payment-section');
// // //     const nfcDiv = document.getElementById('nfc-payment-section');
// // //     const qrDiv = document.getElementById('qr-code-section');
    
// // //     // Hide all sections first
// // //     if(cashDiv) cashDiv.style.display = 'none';
// // //     if(digitalDiv) digitalDiv.style.display = 'none';
// // //     if(nfcDiv) nfcDiv.style.display = 'none';
// // //     if(qrDiv) qrDiv.style.display = 'none';
    
// // //     // Show relevant section
// // //     if (method === 'Cash') {
// // //         if(cashDiv) cashDiv.style.display = 'block';
// // //     } else if (method === 'NFC') {
// // //         if(nfcDiv) nfcDiv.style.display = 'block';
        
// // //         // Update amount display
// // //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
// // //         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
// // //         startNFCListening();
// // //     } else {
// // //         // GCash or Bank
// // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // //         if(qrDiv) qrDiv.style.display = 'flex';
// // //     }
// // // };

// // // function startNFCListening() {
// // //     const nfcStatus = document.getElementById('nfcStatus');
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
// // //     if(nfcStatus) {
// // //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for Customer tap...';
// // //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// // //     }
    
// // //     // Write pending payment to RTDB for ESP32-C3 to see
// // //     set(ref(rtdb, 'nfc_payment/pending'), {
// // //         amount: total,
// // //         timestamp: Date.now(),
// // //         status: 'waiting'
// // //     }).catch(err => console.error('RTDB write error:', err));
    
// // //     // Listen for ESP32-C3 confirmation
// // //     const nfcRef = ref(rtdb, 'nfc_payment/status');
// // //     nfcListener = onValue(nfcRef, (snapshot) => {
// // //         const data = snapshot.val();
        
// // //         if (!data) return;
        
// // //         if (data.status === 'processing') {
// // //             if(nfcStatus) {
// // //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// // //             }
// // //         } 
// // //         else if (data.status === 'success') {
// // //             stopNFCListening();
// // //             if(nfcStatus) {
// // //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
// // //                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
// // //             }
            
// // //             // Auto-complete after 1 second
// // //             setTimeout(() => {
// // //                 processNFCPayment(data);
// // //             }, 1000);
// // //         }
// // //         else if (data.status === 'failed') {
// // //             stopNFCListening();
// // //             if(nfcStatus) {
// // //                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
// // //                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
// // //             }
// // //             showToast('NFC Payment Failed', 'error');
// // //         }
// // //     });
// // // }

// // // function stopNFCListening() {
// // //     if(nfcListener) {
// // //         nfcListener(); // Unsubscribe from RTDB listener
// // //         nfcListener = null;
// // //     }
    
// // //     // Clear RTDB nodes
// // //     remove(ref(rtdb, 'nfc_payment/pending')).catch(err => console.log('Cleanup pending:', err));
// // //     remove(ref(rtdb, 'nfc_payment/status')).catch(err => console.log('Cleanup status:', err));
// // // }

// // // async function processNFCPayment(nfcData) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// // //     const orderId = document.getElementById('orderNumber').innerText;
    
// // //     const orderData = {
// // //         date: new Date().toISOString(),
// // //         orderId: orderId,
// // //         customer: custName,
// // //         contact: custPhone,
// // //         items: cart,
// // //         total: total,
// // //         method: 'NFC',
// // //         cashReceived: total,
// // //         change: 0,
// // //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// // //         cashier: localStorage.getItem('userName') || 'Staff',
// // //         status: 'completed'
// // //     };
    
// // //     try {
// // //         // 1. Save transaction to Firestore
// // //         await addDoc(collection(db, "transactions"), orderData);
        
// // //         // 2. Send to kitchen queue (RTDB) - CYD will display this
// // //         await sendToKitchen(orderId, cart);
        
// // //         // 3. Reduce stock
// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id);
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || 0);
// // //                 await updateDoc(productRef, { 
// // //                     quantity: Math.max(0, currentStock - item.qty) 
// // //                 });
// // //             }
// // //         }
        
// // //         // 4. Show receipt and cleanup
// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
        
// // //         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
// // //     } catch(err) {
// // //         console.error("NFC Payment Error:", err);
// // //         showToast("❌ Transaction Failed: " + err.message, "error");
// // //     }
// // // }

// // // // =========================================================
// // // // CASH PAYMENT HELPERS
// // // // =========================================================

// // // window.setCash = function(amount) {
// // //     const input = document.getElementById('amountPaid');
// // //     const currentVal = parseFloat(input.value) || 0;
// // //     input.value = currentVal + amount;
// // //     calculateChange();
// // // };

// // // function calculateChange() {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const input = document.getElementById('amountPaid');
// // //     const paid = parseFloat(input.value || 0);
// // //     const change = paid - total;
// // //     const changeEl = document.getElementById('changeAmount');
    
// // //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// // //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // // }

// // // // =========================================================
// // // // PROCESS FULL PAYMENT
// // // // =========================================================

// // // window.processPayment = async function() {
// // //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// // //     setBtnLoading(payBtn, true);

// // //     try {
// // //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// // //         const orderId = document.getElementById('orderNumber').innerText; 
        
// // //         let paid = 0;
// // //         let refNum = '-';

// // //         if (currentPaymentMethod === 'Cash') {
// // //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// // //             if (paid < total) {
// // //                 showToast("Insufficient Cash", "error");
// // //                 throw new Error("Insufficient Cash"); 
// // //             }
// // //         } else {
// // //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// // //             refNum = refInput ? refInput.value : '';
// // //             paid = total; 
// // //             if (!refNum) {
// // //                 showToast("Please enter Reference Number", "error");
// // //                 throw new Error("Missing Reference"); 
// // //             }
// // //         }

// // //         const orderData = {
// // //             date: new Date().toISOString(),
// // //             orderId: orderId,
// // //             customer: custName,
// // //             contact: custPhone,
// // //             items: cart,
// // //             total: total,
// // //             method: currentPaymentMethod,
// // //             cashReceived: paid,
// // //             change: paid - total,
// // //             reference: refNum,
// // //             cashier: localStorage.getItem('userName') || 'Staff'
// // //         };

// // //         await addDoc(collection(db, "transactions"), orderData);
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// // //         showToast("Payment Successful!", "success");

// // //     } catch (err) {
// // //         console.error(err);
// // //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// // //             showToast("Transaction Failed", "error");
// // //         }
// // //     } finally {
// // //         setBtnLoading(payBtn, false);
// // //     }
// // // };

// // // // =========================================================
// // // // PROCESS DOWNPAYMENT
// // // // =========================================================

// // // window.processDownpayment = async function() {
// // //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// // //     if (currentPaymentMethod !== 'Cash') {
// // //         window.openDigitalDPModal();
// // //         return;
// // //     }

// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const cashInput = document.getElementById('amountPaid');
// // //     let cashReceived = 0;
    
// // //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// // //     if (isNaN(cashReceived) || cashReceived <= 0) {
// // //         return showToast('Please enter a valid amount', 'error');
// // //     }
// // //     if (cashReceived >= total) {
// // //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// // //     }

// // //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// // //     setBtnLoading(dpBtn, true);

// // //     try {
// // //         await saveDownpayment(cashReceived, 'Cash', '');
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(dpBtn, false);
// // //     }
// // // };

// // // window.openDigitalDPModal = function() {
// // //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// // //     document.getElementById('digi-dp-amount').value = '';
// // //     const mainRef = document.getElementById('referenceNumber');
// // //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// // //     document.getElementById('digi-dp-amount').focus();
// // // };
// // // window.closeDigitalDPModal = function() {
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // // };
// // // window.confirmDigitalDP = async function() {
// // //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// // //     const refVal = document.getElementById('digi-dp-ref').value;
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// // //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// // //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// // //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// // //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// // //     setBtnLoading(confirmBtn, true);

// // //     try {
// // //         window.closeDigitalDPModal();
// // //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(confirmBtn, false);
// // //     }
// // // };

// // // async function saveDownpayment(amountPaid, method, reference) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const balance = total - amountPaid;
// // //     const orderId = document.getElementById('orderNumber').innerText; 

// // //     const orderData = {
// // //         orderId: orderId,
// // //         date: new Date().toISOString(),
// // //         items: cart,
// // //         total: total,
// // //         cashReceived: amountPaid,
// // //         change: 0, 
// // //         balance: balance,
// // //         method: method,
// // //         reference: reference,
// // //         status: 'Partial',
// // //         cashier: localStorage.getItem('userName') || 'Staff',
// // //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// // //         contact: document.getElementById('customerPhone')?.value || '-'
// // //     };

// // //     try {
// // //         await addDoc(collection(db, "transactions"), orderData); 
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// // //         document.getElementById('paymentModal').style.display = 'none';
// // //         document.getElementById('receiptModal').style.display = 'flex';
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// // //         showToast('Downpayment recorded!', 'success');
// // //     } catch (error) {
// // //         console.error("Error saving order: ", error);
// // //         showToast('Error saving order', 'error');
// // //         throw error; 
// // //     }
// // // }

// // // // =========================================================
// // // // RECEIPT UTILS
// // // // =========================================================

// // // function showReceipt(data) {
// // //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// // //     document.getElementById('receiptModal').style.display = 'flex';
// // // }

// // // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// // //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// // //     document.getElementById('rec-orderId').innerText = data.orderId;
// // //     document.getElementById('rec-cashier').innerText = data.cashier;
// // //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// // //     const itemsDiv = document.getElementById('rec-items');
// // //     itemsDiv.innerHTML = '';
// // //     data.items.forEach(item => {
// // //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// // //     });

// // //     document.getElementById('rec-total').innerText = total.toFixed(2);
// // //     document.getElementById('rec-method').innerText = method;

// // //     const rowBalance = document.getElementById('row-balance');
// // //     if(balance > 0) {
// // //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// // //         document.getElementById('row-change').style.display = 'none';
// // //     } else {
// // //         if(rowBalance) rowBalance.style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'flex';
// // //         const change = paid - total;
// // //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// // //     }

// // //     if(method === 'Cash') {
// // //         document.getElementById('row-cash-paid').style.display = 'flex';
// // //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// // //         document.getElementById('row-ref').style.display = 'none';
// // //     } else {
// // //         document.getElementById('row-cash-paid').style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'none';
// // //         document.getElementById('row-ref').style.display = 'flex';
// // //         document.getElementById('rec-ref').innerText = refNum;
// // //     }
// // // }

// // // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // // window.printReceipt = function() { window.print(); };

// // // function generateOrderID() {
// // //     const randomId = Math.floor(100000 + Math.random() * 900000);
// // //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // // }

// // // function showToast(msg, type) {
// // //     const container = document.getElementById('toast-container');
// // //     const toast = document.createElement('div');
// // //     toast.className = `toast ${type}`;
// // //     toast.innerHTML = type === 'success' 
// // //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// // //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// // //     container.appendChild(toast);
// // //     setTimeout(() => toast.remove(), 3000);
// // // }

// // // function setBtnLoading(btn, isLoading) {
// // //     if(!btn) return;
// // //     if(isLoading) {
// // //         btn.dataset.originalText = btn.innerHTML;
// // //         btn.disabled = true;
// // //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// // //     } else {
// // //         btn.disabled = false;
// // //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// // //     }
// // // }

// // // // =========================================================
// // // // SEND TO KITCHEN
// // // // =========================================================

// // // async function sendToKitchen(orderId, cartItems) {
// // //     if (!cartItems || cartItems.length === 0) return;
// // //     try {
// // //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// // //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// // //             table: orderId,
// // //             items: itemsString,
// // //             timestamp: Date.now()
// // //         });
// // //         console.log("✅ Sent to Kitchen!");
// // //     } catch (e) {
// // //         console.error("❌ Error sending to kitchen:", e);
// // //     }
// // // }





// // //NEW CODE WITH CYD + NFC INTEGRATION (FIXED - NO MORE STUCK "PAYMENT SUCCESSFUL")
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // import { 
// //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
// //     rtdb, ref, set, onValue, remove
// // } from './firebase.js';

// // let products = [];
// // let cart = [];
// // let currentPaymentMethod = 'Cash';
// // let nfcListener = null;

// // document.addEventListener('DOMContentLoaded', () => {
// //     initTheme();
// //     generateOrderID();
    
// //     const userRole = localStorage.getItem('userRole'); 
// //     const logoutBtn = document.getElementById('logout-sidebar-item');
// //     if (userRole && userRole.toLowerCase() === 'cashier') {
// //         if(logoutBtn) logoutBtn.style.display = 'block';
// //     } else {
// //         if(logoutBtn) logoutBtn.style.display = 'none';
// //     }

// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// //     onSnapshot(collection(db, "categories"), (snapshot) => {
// //         const tabs = document.getElementById('categoryTabs');
// //         if(tabs) {
// //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// //             snapshot.forEach(doc => {
// //                 const data = doc.data();
// //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// //             });
// //         }
// //     });

// //     onSnapshot(collection(db, "products"), (snapshot) => {
// //         products = [];
// //         snapshot.forEach(doc => {
// //             const data = doc.data();
// //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
// //             products.push({ 
// //                 id: doc.id, 
// //                 ...data,
// //                 quantity: isNaN(stockVal) ? 0 : stockVal
// //             });
// //         });
// //         renderProducts(products);
// //     });

// //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// //         const term = e.target.value.toLowerCase();
// //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// //         renderProducts(filtered);
// //     });

// //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // });

// // function initTheme() {
// //     if (localStorage.getItem('theme') === 'dark') {
// //         document.body.classList.add('dark-mode');
// //     }
// // }

// // window.openLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'flex';
// // };
// // window.closeLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'none';
// // };
// // window.confirmLogout = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.removeItem('userRole');
// //         localStorage.removeItem('userName');
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //     }
// // };

// // function renderProducts(list) {
// //     const grid = document.getElementById('productsGrid');
// //     if(!grid) return;
// //     grid.innerHTML = '';
    
// //     if (list.length === 0) {
// //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// //         return;
// //     }

// //     list.forEach(p => {
// //         const qty = Number(p.quantity || p.stock || 0);
// //         const isOOS = qty <= 0;
// //         const card = document.createElement('div');
// //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// //         card.onclick = () => !isOOS && addToCart(p);
// //         const displayPrice = parseFloat(p.price || p.cost || 0);
// //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
// //         const imageHtml = imgUrl 
// //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// //         card.innerHTML = `
// //             ${imageHtml}
// //             <div class="product-info">
// //                 <div>
// //                     <h4>${p.name}</h4>
// //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// //                 </div>
// //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// //             </div>
// //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// //         `;
// //         grid.appendChild(card);
// //     });
// // }

// // window.filterProducts = function(catId, btn) {
// //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// //     if (btn) btn.classList.add('active');
// //     const filtered = (catId === 'all') 
// //         ? products 
// //         : products.filter(p => 
// //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// //             (p.categoryId || '') === catId
// //         );
// //     renderProducts(filtered);
// // };

// // function addToCart(product) {
// //     const existing = cart.find(i => i.id === product.id);
// //     const currentQty = existing ? existing.qty : 0;
// //     const productStock = Number(product.quantity || product.stock || 0);
    
// //     if (currentQty + 1 > productStock) {
// //         showToast("Not enough stock!", "error");
// //         return;
// //     }
// //     const priceToUse = parseFloat(product.price || product.cost || 0);

// //     if (existing) {
// //         existing.qty++;
// //     } else {
// //         cart.push({
// //             id: product.id,
// //             name: product.name,
// //             price: priceToUse,
// //             qty: 1
// //         });
// //     }
// //     renderCart();
// // }

// // function renderCart() {
// //     const container = document.getElementById('cartItems');
// //     if(!container) return;
// //     container.innerHTML = '';
// //     if (cart.length === 0) {
// //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// //         updateTotals(0);
// //         return;
// //     }
// //     let total = 0;
// //     cart.forEach((item, index) => {
// //         const itemTotal = item.price * item.qty;
// //         total += itemTotal;
// //         const div = document.createElement('div');
// //         div.className = 'cart-item';
// //         div.innerHTML = `
// //             <div class="item-info">
// //                 <h4>${item.name}</h4>
// //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// //             </div>
// //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// //             <div class="item-actions">
// //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// //             </div>
// //         `;
// //         container.appendChild(div);
// //     });
// //     updateTotals(total);
// // }

// // window.updateQty = function(index, change) {
// //     const item = cart[index];
// //     const product = products.find(p => p.id === item.id);
// //     if (change === 1) {
// //         const productStock = Number(product.quantity || product.stock || 0);
// //         if (item.qty + 1 > productStock) {
// //             showToast("Max stock reached", "error");
// //             return;
// //         }
// //         item.qty++;
// //     } else {
// //         if (item.qty > 1) item.qty--;
// //         else cart.splice(index, 1);
// //     }
// //     renderCart();
// // };

// // window.removeItem = function(index) {
// //     cart.splice(index, 1);
// //     renderCart();
// // };

// // window.clearCart = function() {
// //     if(cart.length === 0) return;
// //     document.getElementById('clearOrderModal').style.display = 'flex';
// // };
// // window.closeClearModal = function() {
// //     document.getElementById('clearOrderModal').style.display = 'none';
// // };
// // window.confirmClearOrder = function() {
// //     cart = [];
// //     renderCart();
// //     window.closeClearModal();
// //     showToast("Order cleared", "success");
// // };

// // function updateTotals(subtotal) {
// //     const total = subtotal;
// //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// //     const subtotalEl = document.getElementById('subtotalDisplay');
// //     const vatEl = document.getElementById('vatDisplay');
// //     const totalEl = document.getElementById('totalDisplay');
// //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// //     if(vatEl) vatEl.innerText = fmt(0);
// //     if(totalEl) totalEl.innerText = fmt(total);

// //     const modalTotal = document.getElementById('modalTotalAmount');
// //     if(modalTotal) {
// //         modalTotal.dataset.value = total;
// //         modalTotal.innerText = fmt(total);
// //     }
// // }

// // window.openPaymentModal = function() {
// //     if (cart.length === 0) {
// //         showToast("Cart is empty!", "error");
// //         return;
// //     }
// //     document.getElementById('paymentModal').style.display = 'flex';
// //     document.getElementById('amountPaid').value = '';
// //     document.getElementById('changeAmount').innerText = '₱0.00';
// //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // };

// // window.closePaymentModal = function() {
// //     stopNFCListening(); // CRITICAL: Clean up NFC state
// //     document.getElementById('paymentModal').style.display = 'none';
// // };

// // // =========================================================
// // // NFC PAYMENT INTEGRATION (FIXED)
// // // =========================================================

// // window.setPaymentMethod = function(method, btn) {
// //     currentPaymentMethod = method;
// //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// //     btn.classList.add('active');
    
// //     const cashDiv = document.getElementById('cash-payment-section');
// //     const digitalDiv = document.getElementById('digital-payment-section');
// //     const nfcDiv = document.getElementById('nfc-payment-section');
// //     const qrDiv = document.getElementById('qr-code-section');
    
// //     // Stop NFC if switching away from it
// //     if (method !== 'NFC') {
// //         stopNFCListening();
// //     }
    
// //     if(cashDiv) cashDiv.style.display = 'none';
// //     if(digitalDiv) digitalDiv.style.display = 'none';
// //     if(nfcDiv) nfcDiv.style.display = 'none';
// //     if(qrDiv) qrDiv.style.display = 'none';
    
// //     if (method === 'Cash') {
// //         if(cashDiv) cashDiv.style.display = 'block';
// //     } else if (method === 'NFC') {
// //         if(nfcDiv) nfcDiv.style.display = 'block';
        
// //         // Reset NFC UI completely
// //         const nfcStatus = document.getElementById('nfcStatus');
// //         if(nfcStatus) {
// //             nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
// //             nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// //             nfcStatus.style.display = 'block';
// //         }
        
// //         // Update amount display
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
// //         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
// //         // Start fresh NFC session
// //         startNFCListening();
// //     } else {
// //         if(digitalDiv) digitalDiv.style.display = 'block';
// //         if(qrDiv) qrDiv.style.display = 'flex';
// //     }
// // };

// // function startNFCListening() {
// //     const nfcStatus = document.getElementById('nfcStatus');
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
// //     // CRITICAL: Stop any existing listener first
// //     stopNFCListening();
    
// //     if(nfcStatus) {
// //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
// //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// //         nfcStatus.style.display = 'block';
// //     }
    
// //     // Clear old RTDB data first, then write new
// //     Promise.all([
// //         remove(ref(rtdb, 'nfc_payment/pending')),
// //         remove(ref(rtdb, 'nfc_payment/status'))
// //     ]).then(() => {
// //         // Write fresh pending payment
// //         return set(ref(rtdb, 'nfc_payment/pending'), {
// //             amount: total,
// //             timestamp: Date.now(),
// //             status: 'waiting'
// //         });
// //     }).catch(err => console.error('RTDB write error:', err));
    
// //     // Listen for ESP32-C3 confirmation
// //     const nfcRef = ref(rtdb, 'nfc_payment/status');
// //     nfcListener = onValue(nfcRef, (snapshot) => {
// //         const data = snapshot.val();
        
// //         if (!data) return;
        
// //         if (data.status === 'processing') {
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// //             }
// //         } 
// //         else if (data.status === 'success') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
// //                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
// //             }
            
// //             setTimeout(() => {
// //                 processNFCPayment(data);
// //             }, 1000);
// //         }
// //         else if (data.status === 'failed') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
// //                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
// //             }
// //             showToast('NFC Payment Failed', 'error');
// //         }
// //     });
// // }

// // function stopNFCListening() {
// //     if(nfcListener) {
// //         nfcListener(); // Unsubscribe
// //         nfcListener = null;
// //     }
    
// //     // Clear RTDB nodes
// //     Promise.all([
// //         remove(ref(rtdb, 'nfc_payment/pending')),
// //         remove(ref(rtdb, 'nfc_payment/status'))
// //     ]).catch(err => console.log('Cleanup:', err));
    
// //     // Reset UI
// //     const nfcStatus = document.getElementById('nfcStatus');
// //     if(nfcStatus) {
// //         nfcStatus.style.display = 'none';
// //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// //     }
// // }

// // async function processNFCPayment(nfcData) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// //     const orderId = document.getElementById('orderNumber').innerText;
    
// //     const orderData = {
// //         date: new Date().toISOString(),
// //         orderId: orderId,
// //         customer: custName,
// //         contact: custPhone,
// //         items: cart,
// //         total: total,
// //         method: 'NFC',
// //         cashReceived: total,
// //         change: 0,
// //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         status: 'completed'
// //     };
    
// //     try {
// //         await addDoc(collection(db, "transactions"), orderData);
// //         await sendToKitchen(orderId, cart);
        
// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id);
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || 0);
// //                 await updateDoc(productRef, { 
// //                     quantity: Math.max(0, currentStock - item.qty) 
// //                 });
// //             }
// //         }
        
// //         // CRITICAL: Clean up NFC state BEFORE showing receipt
// //         stopNFCListening();
        
// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
        
// //         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
// //     } catch(err) {
// //         console.error("NFC Payment Error:", err);
// //         stopNFCListening();
// //         showToast("❌ Transaction Failed: " + err.message, "error");
// //     }
// // }

// // window.setCash = function(amount) {
// //     const input = document.getElementById('amountPaid');
// //     const currentVal = parseFloat(input.value) || 0;
// //     input.value = currentVal + amount;
// //     calculateChange();
// // };

// // function calculateChange() {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const input = document.getElementById('amountPaid');
// //     const paid = parseFloat(input.value || 0);
// //     const change = paid - total;
// //     const changeEl = document.getElementById('changeAmount');
    
// //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // }

// // window.processPayment = async function() {
// //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// //     setBtnLoading(payBtn, true);

// //     try {
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// //         const orderId = document.getElementById('orderNumber').innerText; 
        
// //         let paid = 0;
// //         let refNum = '-';

// //         if (currentPaymentMethod === 'Cash') {
// //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// //             if (paid < total) {
// //                 showToast("Insufficient Cash", "error");
// //                 throw new Error("Insufficient Cash"); 
// //             }
// //         } else {
// //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// //             refNum = refInput ? refInput.value : '';
// //             paid = total; 
// //             if (!refNum) {
// //                 showToast("Please enter Reference Number", "error");
// //                 throw new Error("Missing Reference"); 
// //             }
// //         }

// //         const orderData = {
// //             date: new Date().toISOString(),
// //             orderId: orderId,
// //             customer: custName,
// //             contact: custPhone,
// //             items: cart,
// //             total: total,
// //             method: currentPaymentMethod,
// //             cashReceived: paid,
// //             change: paid - total,
// //             reference: refNum,
// //             cashier: localStorage.getItem('userName') || 'Staff'
// //         };

// //         await addDoc(collection(db, "transactions"), orderData);
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// //         showToast("Payment Successful!", "success");

// //     } catch (err) {
// //         console.error(err);
// //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// //             showToast("Transaction Failed", "error");
// //         }
// //     } finally {
// //         setBtnLoading(payBtn, false);
// //     }
// // };

// // window.processDownpayment = async function() {
// //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// //     if (currentPaymentMethod !== 'Cash') {
// //         window.openDigitalDPModal();
// //         return;
// //     }

// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const cashInput = document.getElementById('amountPaid');
// //     let cashReceived = 0;
    
// //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// //     if (isNaN(cashReceived) || cashReceived <= 0) {
// //         return showToast('Please enter a valid amount', 'error');
// //     }
// //     if (cashReceived >= total) {
// //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// //     }

// //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// //     setBtnLoading(dpBtn, true);

// //     try {
// //         await saveDownpayment(cashReceived, 'Cash', '');
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(dpBtn, false);
// //     }
// // };

// // window.openDigitalDPModal = function() {
// //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// //     document.getElementById('digi-dp-amount').value = '';
// //     const mainRef = document.getElementById('referenceNumber');
// //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// //     document.getElementById('digi-dp-amount').focus();
// // };
// // window.closeDigitalDPModal = function() {
// //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // };
// // window.confirmDigitalDP = async function() {
// //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// //     const refVal = document.getElementById('digi-dp-ref').value;
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// //     setBtnLoading(confirmBtn, true);

// //     try {
// //         window.closeDigitalDPModal();
// //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(confirmBtn, false);
// //     }
// // };

// // async function saveDownpayment(amountPaid, method, reference) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const balance = total - amountPaid;
// //     const orderId = document.getElementById('orderNumber').innerText; 

// //     const orderData = {
// //         orderId: orderId,
// //         date: new Date().toISOString(),
// //         items: cart,
// //         total: total,
// //         cashReceived: amountPaid,
// //         change: 0, 
// //         balance: balance,
// //         method: method,
// //         reference: reference,
// //         status: 'Partial',
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// //         contact: document.getElementById('customerPhone')?.value || '-'
// //     };

// //     try {
// //         await addDoc(collection(db, "transactions"), orderData); 
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// //         document.getElementById('paymentModal').style.display = 'none';
// //         document.getElementById('receiptModal').style.display = 'flex';
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// //         showToast('Downpayment recorded!', 'success');
// //     } catch (error) {
// //         console.error("Error saving order: ", error);
// //         showToast('Error saving order', 'error');
// //         throw error; 
// //     }
// // }

// // function showReceipt(data) {
// //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// //     document.getElementById('receiptModal').style.display = 'flex';
// // }

// // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// //     document.getElementById('rec-orderId').innerText = data.orderId;
// //     document.getElementById('rec-cashier').innerText = data.cashier;
// //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// //     const itemsDiv = document.getElementById('rec-items');
// //     itemsDiv.innerHTML = '';
// //     data.items.forEach(item => {
// //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// //     });

// //     document.getElementById('rec-total').innerText = total.toFixed(2);
// //     document.getElementById('rec-method').innerText = method;

// //     const rowBalance = document.getElementById('row-balance');
// //     if(balance > 0) {
// //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// //         document.getElementById('row-change').style.display = 'none';
// //     } else {
// //         if(rowBalance) rowBalance.style.display = 'none';
// //         document.getElementById('row-change').style.display = 'flex';
// //         const change = paid - total;
// //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// //     }

// //     if(method === 'Cash') {
// //         document.getElementById('row-cash-paid').style.display = 'flex';
// //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// //         document.getElementById('row-ref').style.display = 'none';
// //     } else {
// //         document.getElementById('row-cash-paid').style.display = 'none';
// //         document.getElementById('row-change').style.display = 'none';
// //         document.getElementById('row-ref').style.display = 'flex';
// //         document.getElementById('rec-ref').innerText = refNum;
// //     }
// // }

// // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // window.printReceipt = function() { window.print(); };

// // function generateOrderID() {
// //     const randomId = Math.floor(100000 + Math.random() * 900000);
// //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // }

// // function showToast(msg, type) {
// //     const container = document.getElementById('toast-container');
// //     const toast = document.createElement('div');
// //     toast.className = `toast ${type}`;
// //     toast.innerHTML = type === 'success' 
// //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// //     container.appendChild(toast);
// //     setTimeout(() => toast.remove(), 3000);
// // }

// // function setBtnLoading(btn, isLoading) {
// //     if(!btn) return;
// //     if(isLoading) {
// //         btn.dataset.originalText = btn.innerHTML;
// //         btn.disabled = true;
// //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// //     } else {
// //         btn.disabled = false;
// //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// //     }
// // }

// // async function sendToKitchen(orderId, cartItems) {
// //     if (!cartItems || cartItems.length === 0) return;
// //     try {
// //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// //             table: orderId,
// //             items: itemsString,
// //             timestamp: Date.now()
// //         });
// //         console.log("✅ Sent to Kitchen!");
// //     } catch (e) {
// //         console.error("❌ Error sending to kitchen:", e);
// //     }
// // }










// // //NEW CODE WITH CYD ALAS DOS NA
// // // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // // import { 
// // //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, rtdb, ref, set
// // // } from './firebase.js';

// // // let products = [];
// // // let cart = [];
// // // let currentPaymentMethod = 'Cash'; 

// // // document.addEventListener('DOMContentLoaded', () => {
// // //     initTheme();
// // //     generateOrderID();
    
// // //     // --- CHECK LOGIN STATUS ---
// // //     const userRole = localStorage.getItem('userRole'); 
// // //     const logoutBtn = document.getElementById('logout-sidebar-item');
// // //     if (userRole && userRole.toLowerCase() === 'cashier') {
// // //         if(logoutBtn) logoutBtn.style.display = 'block';
// // //     } else {
// // //         if(logoutBtn) logoutBtn.style.display = 'none';
// // //     }

// // //     // --- DISPLAY DATE ---
// // //     const dateEl = document.getElementById('currentDate');
// // //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// // //     // --- LOAD CATEGORIES ---
// // //     onSnapshot(collection(db, "categories"), (snapshot) => {
// // //         const tabs = document.getElementById('categoryTabs');
// // //         if(tabs) {
// // //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// // //             snapshot.forEach(doc => {
// // //                 const data = doc.data();
// // //                 // FIX 1: Use data.name instead of doc.id to match products' category field
// // //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// // //             });
// // //         }
// // //     });

// // //     // --- LOAD PRODUCTS ---
// // //     onSnapshot(collection(db, "products"), (snapshot) => {
// // //         products = [];
// // //         snapshot.forEach(doc => {
// // //             const data = doc.data();
// // //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// // //             products.push({ 
// // //                 id: doc.id, 
// // //                 ...data,
// // //                 quantity: isNaN(stockVal) ? 0 : stockVal
// // //             });
// // //         });
// // //         renderProducts(products);
// // //     });

// // //     // --- SEARCH BAR ---
// // //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// // //         const term = e.target.value.toLowerCase();
// // //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// // //         renderProducts(filtered);
// // //     });

// // //     // --- PAYMENT INPUT LISTENER ---
// // //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // // });

// // // // =========================================================
// // // // UI FUNCTIONS
// // // // =========================================================

// // // function initTheme() {
// // //     if (localStorage.getItem('theme') === 'dark') {
// // //         document.body.classList.add('dark-mode');
// // //     }
// // // }

// // // window.openLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'flex';
// // // };
// // // window.closeLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'none';
// // // };
// // // window.confirmLogout = async function() {
// // //     try {
// // //         await signOut(auth);
// // //         localStorage.removeItem('userRole');
// // //         localStorage.removeItem('userName');
// // //         window.location.href = 'index.html';
// // //     } catch (error) {
// // //         console.error("Logout Error:", error);
// // //     }
// // // };

// // // function renderProducts(list) {
// // //     const grid = document.getElementById('productsGrid');
// // //     if(!grid) return;
// // //     grid.innerHTML = '';
    
// // //     if (list.length === 0) {
// // //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// // //         return;
// // //     }

// // //     list.forEach(p => {
// // //         const qty = Number(p.quantity || p.stock || 0);
// // //         const isOOS = qty <= 0;
        
// // //         const card = document.createElement('div');
// // //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// // //         card.onclick = () => !isOOS && addToCart(p);
        
// // //         const displayPrice = parseFloat(p.price || p.cost || 0);
// // //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// // //         const imageHtml = imgUrl 
// // //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// // //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// // //         card.innerHTML = `
// // //             ${imageHtml}
// // //             <div class="product-info">
// // //                 <div>
// // //                     <h4>${p.name}</h4>
// // //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// // //                 </div>
// // //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// // //             </div>
// // //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// // //         `;
// // //         grid.appendChild(card);
// // //     });
// // // }

// // // window.filterProducts = function(catId, btn) {
// // //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// // //     if (btn) btn.classList.add('active');
// // //     // FIX 1: Filter by category name (matches Firestore product's category field)
// // //     const filtered = (catId === 'all') 
// // //         ? products 
// // //         : products.filter(p => 
// // //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// // //             (p.categoryId || '') === catId
// // //         );
// // //     renderProducts(filtered);
// // // };

// // // // =========================================================
// // // // CART LOGIC
// // // // =========================================================

// // // function addToCart(product) {
// // //     const existing = cart.find(i => i.id === product.id);
// // //     const currentQty = existing ? existing.qty : 0;
// // //     const productStock = Number(product.quantity || product.stock || 0);
    
// // //     if (currentQty + 1 > productStock) {
// // //         showToast("Not enough stock!", "error");
// // //         return;
// // //     }
// // //     const priceToUse = parseFloat(product.price || product.cost || 0);

// // //     if (existing) {
// // //         existing.qty++;
// // //     } else {
// // //         cart.push({
// // //             id: product.id,
// // //             name: product.name,
// // //             price: priceToUse,
// // //             qty: 1
// // //         });
// // //     }
// // //     renderCart();
// // // }

// // // function renderCart() {
// // //     const container = document.getElementById('cartItems');
// // //     if(!container) return;
// // //     container.innerHTML = '';
// // //     if (cart.length === 0) {
// // //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// // //         updateTotals(0);
// // //         return;
// // //     }
// // //     let total = 0;
// // //     cart.forEach((item, index) => {
// // //         const itemTotal = item.price * item.qty;
// // //         total += itemTotal;
// // //         const div = document.createElement('div');
// // //         div.className = 'cart-item';
// // //         div.innerHTML = `
// // //             <div class="item-info">
// // //                 <h4>${item.name}</h4>
// // //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// // //             </div>
// // //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// // //             <div class="item-actions">
// // //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// // //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// // //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// // //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// // //             </div>
// // //         `;
// // //         container.appendChild(div);
// // //     });
// // //     updateTotals(total);
// // // }

// // // window.updateQty = function(index, change) {
// // //     const item = cart[index];
// // //     const product = products.find(p => p.id === item.id);
// // //     if (change === 1) {
// // //         const productStock = Number(product.quantity || product.stock || 0);
// // //         if (item.qty + 1 > productStock) {
// // //             showToast("Max stock reached", "error");
// // //             return;
// // //         }
// // //         item.qty++;
// // //     } else {
// // //         if (item.qty > 1) item.qty--;
// // //         else cart.splice(index, 1);
// // //     }
// // //     renderCart();
// // // };

// // // window.removeItem = function(index) {
// // //     cart.splice(index, 1);
// // //     renderCart();
// // // };

// // // window.clearCart = function() {
// // //     if(cart.length === 0) return;
// // //     document.getElementById('clearOrderModal').style.display = 'flex';
// // // };
// // // window.closeClearModal = function() {
// // //     document.getElementById('clearOrderModal').style.display = 'none';
// // // };
// // // window.confirmClearOrder = function() {
// // //     cart = [];
// // //     renderCart();
// // //     window.closeClearModal();
// // //     showToast("Order cleared", "success");
// // // };

// // // // FIX 2: updateTotals now updates ALL cart footer displays + modal
// // // function updateTotals(subtotal) {
// // //     const total = subtotal;
// // //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// // //     // Cart footer
// // //     const subtotalEl = document.getElementById('subtotalDisplay');
// // //     const vatEl = document.getElementById('vatDisplay');
// // //     const totalEl = document.getElementById('totalDisplay');
// // //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// // //     if(vatEl) vatEl.innerText = fmt(0);
// // //     if(totalEl) totalEl.innerText = fmt(total);

// // //     // Payment modal total (set dataset.value for calculateChange to use)
// // //     const modalTotal = document.getElementById('modalTotalAmount');
// // //     if(modalTotal) {
// // //         modalTotal.dataset.value = total;
// // //         modalTotal.innerText = fmt(total);
// // //     }
// // // }

// // // // =========================================================
// // // // PAYMENT MODAL
// // // // =========================================================

// // // window.openPaymentModal = function() {
// // //     if (cart.length === 0) {
// // //         showToast("Cart is empty!", "error");
// // //         return;
// // //     }
// // //     document.getElementById('paymentModal').style.display = 'flex';
// // //     document.getElementById('amountPaid').value = '';
// // //     document.getElementById('changeAmount').innerText = '₱0.00';
// // //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// // //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// // //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // // };
// // // window.closePaymentModal = function() {
// // //     document.getElementById('paymentModal').style.display = 'none';
// // // };

// // // // window.setPaymentMethod = function(method, btn) {
// // // //     currentPaymentMethod = method;
// // // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // // //     btn.classList.add('active');
    
// // // //     const cashDiv = document.getElementById('cash-payment-section');
// // // //     const digitalDiv = document.getElementById('digital-payment-section');
// // // //     const qrDiv = document.getElementById('qr-code-section');
    
// // // //     if (method === 'Cash') {
// // // //         if(cashDiv) cashDiv.style.display = 'block';
// // // //         if(digitalDiv) digitalDiv.style.display = 'none';
// // // //         if(qrDiv) qrDiv.style.display = 'none';
// // // //     } else {
// // // //         if(cashDiv) cashDiv.style.display = 'none';
// // // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // // //         if(qrDiv) qrDiv.style.display = 'flex';
// // // //     }
// // // // };

// // // window.setPaymentMethod = function(method, btn) {
// // //     currentPaymentMethod = method;
// // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // //     btn.classList.add('active');
    
// // //     const cashDiv = document.getElementById('cash-payment-section');
// // //     const digitalDiv = document.getElementById('digital-payment-section');
// // //     const nfcDiv = document.getElementById('nfc-payment-section');
// // //     const qrDiv = document.getElementById('qr-code-section');
    
// // //     // Hide all sections first
// // //     if(cashDiv) cashDiv.style.display = 'none';
// // //     if(digitalDiv) digitalDiv.style.display = 'none';
// // //     if(nfcDiv) nfcDiv.style.display = 'none';
// // //     if(qrDiv) qrDiv.style.display = 'none';
    
// // //     // Show relevant section
// // //     if (method === 'Cash') {
// // //         if(cashDiv) cashDiv.style.display = 'block';
// // //     } else if (method === 'NFC') {
// // //         if(nfcDiv) nfcDiv.style.display = 'block';
// // //         startNFCListening(); // Start listening for ESP32
// // //     } else {
// // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // //         if(qrDiv) qrDiv.style.display = 'flex';
// // //     }
// // // };




// // // let nfcListenerInterval = null;

// // // function startNFCListening() {
// // //     // Show "waiting" status
// // //     const nfcStatus = document.getElementById('nfcStatus');
// // //     if(nfcStatus) {
// // //         nfcStatus.style.display = 'block';
// // //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for tap...';
// // //     }
    
// // //     // Poll backend for NFC payment signal from ESP32
// // //     nfcListenerInterval = setInterval(async () => {
// // //         try {
// // //             const response = await fetch('/api/nfc-payment-status'); // Your backend endpoint
// // //             const data = await response.json();
            
// // //             if(data.status === 'processing') {
// // //                 // Show processing animation
// // //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// // //             } else if(data.status === 'success') {
// // //                 // Payment confirmed!
// // //                 clearInterval(nfcListenerInterval);
// // //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle" style="color:#4caf50"></i> Payment successful!';
                
// // //                 // Auto-complete the payment
// // //                 setTimeout(() => {
// // //                     processNFCPayment(data);
// // //                 }, 1000);
// // //             }
// // //         } catch(err) {
// // //             console.error('NFC polling error:', err);
// // //         }
// // //     }, 1000); // Check every second
// // // }

// // // function stopNFCListening() {
// // //     if(nfcListenerInterval) {
// // //         clearInterval(nfcListenerInterval);
// // //         nfcListenerInterval = null;
// // //     }
// // // }

// // // async function processNFCPayment(nfcData) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// // //     const orderId = document.getElementById('orderNumber').innerText;
    
// // //     const orderData = {
// // //         date: new Date().toISOString(),
// // //         orderId: orderId,
// // //         customer: custName,
// // //         contact: custPhone,
// // //         items: cart,
// // //         total: total,
// // //         method: 'NFC',
// // //         cashReceived: total, // NFC always exact amount
// // //         change: 0,
// // //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// // //         cashier: localStorage.getItem('userName') || 'Staff'
// // //     };
    
// // //     try {
// // //         // Save transaction
// // //         await addDoc(collection(db, "transactions"), orderData);
        
// // //         // Send to kitchen
// // //         await sendToKitchen(orderId, cart);
        
// // //         // Reduce stock
// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id);
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || 0);
// // //                 await updateDoc(productRef, { quantity: currentStock - item.qty });
// // //             }
// // //         }
        
// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         showToast("NFC Payment Successful!", "success");
        
// // //     } catch(err) {
// // //         console.error(err);
// // //         showToast("Transaction Failed", "error");
// // //     }
// // // }

// // // // Update closePaymentModal to stop NFC listening
// // // const originalClosePaymentModal = window.closePaymentModal;
// // // window.closePaymentModal = function() {
// // //     stopNFCListening();
// // //     originalClosePaymentModal();
// // // };




// // // window.setCash = function(amount) {
// // //     const input = document.getElementById('amountPaid');
// // //     const currentVal = parseFloat(input.value) || 0;
// // //     input.value = currentVal + amount;
// // //     calculateChange();
// // // };

// // // function calculateChange() {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const input = document.getElementById('amountPaid');
// // //     const paid = parseFloat(input.value || 0);
// // //     const change = paid - total;
// // //     const changeEl = document.getElementById('changeAmount');
    
// // //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// // //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // // }

// // // // =========================================================
// // // // PROCESS FULL PAYMENT
// // // // =========================================================

// // // window.processPayment = async function() {
// // //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// // //     setBtnLoading(payBtn, true);

// // //     try {
// // //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// // //         const orderId = document.getElementById('orderNumber').innerText; 
        
// // //         let paid = 0;
// // //         let refNum = '-';

// // //         if (currentPaymentMethod === 'Cash') {
// // //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// // //             if (paid < total) {
// // //                 showToast("Insufficient Cash", "error");
// // //                 throw new Error("Insufficient Cash"); 
// // //             }
// // //         } else {
// // //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// // //             refNum = refInput ? refInput.value : '';
// // //             paid = total; 
// // //             if (!refNum) {
// // //                 showToast("Please enter Reference Number", "error");
// // //                 throw new Error("Missing Reference"); 
// // //             }
// // //         }

// // //         const orderData = {
// // //             date: new Date().toISOString(),
// // //             orderId: orderId,
// // //             customer: custName,
// // //             contact: custPhone,
// // //             items: cart,
// // //             total: total,
// // //             method: currentPaymentMethod,
// // //             cashReceived: paid,
// // //             change: paid - total,
// // //             reference: refNum,
// // //             cashier: localStorage.getItem('userName') || 'Staff'
// // //         };

// // //         await addDoc(collection(db, "transactions"), orderData);
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// // //         showToast("Payment Successful!", "success");

// // //     } catch (err) {
// // //         console.error(err);
// // //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// // //             showToast("Transaction Failed", "error");
// // //         }
// // //     } finally {
// // //         setBtnLoading(payBtn, false);
// // //     }
// // // };

// // // // =========================================================
// // // // PROCESS DOWNPAYMENT
// // // // =========================================================

// // // window.processDownpayment = async function() {
// // //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// // //     if (currentPaymentMethod !== 'Cash') {
// // //         window.openDigitalDPModal();
// // //         return;
// // //     }

// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const cashInput = document.getElementById('amountPaid');
// // //     let cashReceived = 0;
    
// // //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// // //     if (isNaN(cashReceived) || cashReceived <= 0) {
// // //         return showToast('Please enter a valid amount', 'error');
// // //     }
// // //     if (cashReceived >= total) {
// // //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// // //     }

// // //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// // //     setBtnLoading(dpBtn, true);

// // //     try {
// // //         await saveDownpayment(cashReceived, 'Cash', '');
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(dpBtn, false);
// // //     }
// // // };

// // // window.openDigitalDPModal = function() {
// // //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// // //     document.getElementById('digi-dp-amount').value = '';
// // //     const mainRef = document.getElementById('referenceNumber');
// // //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// // //     document.getElementById('digi-dp-amount').focus();
// // // };
// // // window.closeDigitalDPModal = function() {
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // // };
// // // window.confirmDigitalDP = async function() {
// // //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// // //     const refVal = document.getElementById('digi-dp-ref').value;
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// // //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// // //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// // //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// // //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// // //     setBtnLoading(confirmBtn, true);

// // //     try {
// // //         window.closeDigitalDPModal();
// // //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(confirmBtn, false);
// // //     }
// // // };

// // // async function saveDownpayment(amountPaid, method, reference) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const balance = total - amountPaid;
// // //     const orderId = document.getElementById('orderNumber').innerText; 

// // //     const orderData = {
// // //         orderId: orderId,
// // //         date: new Date().toISOString(),
// // //         items: cart,
// // //         total: total,
// // //         cashReceived: amountPaid,
// // //         change: 0, 
// // //         balance: balance,
// // //         method: method,
// // //         reference: reference,
// // //         status: 'Partial',
// // //         cashier: localStorage.getItem('userName') || 'Staff',
// // //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// // //         contact: document.getElementById('customerPhone')?.value || '-'
// // //     };

// // //     try {
// // //         await addDoc(collection(db, "transactions"), orderData); 
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// // //         document.getElementById('paymentModal').style.display = 'none';
// // //         document.getElementById('receiptModal').style.display = 'flex';
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// // //         showToast('Downpayment recorded!', 'success');
// // //     } catch (error) {
// // //         console.error("Error saving order: ", error);
// // //         showToast('Error saving order', 'error');
// // //         throw error; 
// // //     }
// // // }

// // // // =========================================================
// // // // RECEIPT UTILS
// // // // =========================================================

// // // function showReceipt(data) {
// // //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// // //     document.getElementById('receiptModal').style.display = 'flex';
// // // }

// // // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// // //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// // //     document.getElementById('rec-orderId').innerText = data.orderId;
// // //     document.getElementById('rec-cashier').innerText = data.cashier;
// // //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// // //     const itemsDiv = document.getElementById('rec-items');
// // //     itemsDiv.innerHTML = '';
// // //     data.items.forEach(item => {
// // //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// // //     });

// // //     document.getElementById('rec-total').innerText = total.toFixed(2);
// // //     document.getElementById('rec-method').innerText = method;

// // //     const rowBalance = document.getElementById('row-balance');
// // //     if(balance > 0) {
// // //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// // //         document.getElementById('row-change').style.display = 'none';
// // //     } else {
// // //         if(rowBalance) rowBalance.style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'flex';
// // //         const change = paid - total;
// // //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// // //     }

// // //     if(method === 'Cash') {
// // //         document.getElementById('row-cash-paid').style.display = 'flex';
// // //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// // //         document.getElementById('row-ref').style.display = 'none';
// // //     } else {
// // //         document.getElementById('row-cash-paid').style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'none';
// // //         document.getElementById('row-ref').style.display = 'flex';
// // //         document.getElementById('rec-ref').innerText = refNum;
// // //     }
// // // }

// // // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // // window.printReceipt = function() { window.print(); };

// // // function generateOrderID() {
// // //     const randomId = Math.floor(100000 + Math.random() * 900000);
// // //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // // }

// // // function showToast(msg, type) {
// // //     const container = document.getElementById('toast-container');
// // //     const toast = document.createElement('div');
// // //     toast.className = `toast ${type}`;
// // //     toast.innerHTML = type === 'success' 
// // //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// // //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// // //     container.appendChild(toast);
// // //     setTimeout(() => toast.remove(), 3000);
// // // }

// // // function setBtnLoading(btn, isLoading) {
// // //     if(!btn) return;
// // //     if(isLoading) {
// // //         btn.dataset.originalText = btn.innerHTML;
// // //         btn.disabled = true;
// // //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// // //     } else {
// // //         btn.disabled = false;
// // //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// // //     }
// // // }

// // // // =========================================================
// // // // SEND TO KITCHEN
// // // // =========================================================

// // // async function sendToKitchen(orderId, cartItems) {
// // //     if (!cartItems || cartItems.length === 0) return;
// // //     try {
// // //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// // //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// // //             table: orderId,
// // //             items: itemsString,
// // //             timestamp: Date.now()
// // //         });
// // //         console.log("✅ Sent to Kitchen!");
// // //     } catch (e) {
// // //         console.error("❌ Error sending to kitchen:", e);
// // //     }
// // // }









// // //NEW CODE WITH CYD + NFC INTEGRATION (CORRECTED)
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // import { 
// //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
// //     rtdb, ref, set, onValue, remove
// // } from './firebase.js';

// // let products = [];
// // let cart = [];
// // let currentPaymentMethod = 'Cash';
// // let nfcListener = null;

// // document.addEventListener('DOMContentLoaded', () => {
// //     initTheme();
// //     generateOrderID();
    
// //     // --- CHECK LOGIN STATUS ---
// //     const userRole = localStorage.getItem('userRole'); 
// //     const logoutBtn = document.getElementById('logout-sidebar-item');
// //     if (userRole && userRole.toLowerCase() === 'cashier') {
// //         if(logoutBtn) logoutBtn.style.display = 'block';
// //     } else {
// //         if(logoutBtn) logoutBtn.style.display = 'none';
// //     }

// //     // --- DISPLAY DATE ---
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// //     // --- LOAD CATEGORIES ---
// //     onSnapshot(collection(db, "categories"), (snapshot) => {
// //         const tabs = document.getElementById('categoryTabs');
// //         if(tabs) {
// //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// //             snapshot.forEach(doc => {
// //                 const data = doc.data();
// //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// //             });
// //         }
// //     });

// //     // --- LOAD PRODUCTS ---
// //     onSnapshot(collection(db, "products"), (snapshot) => {
// //         products = [];
// //         snapshot.forEach(doc => {
// //             const data = doc.data();
// //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// //             products.push({ 
// //                 id: doc.id, 
// //                 ...data,
// //                 quantity: isNaN(stockVal) ? 0 : stockVal
// //             });
// //         });
// //         renderProducts(products);
// //     });

// //     // --- SEARCH BAR ---
// //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// //         const term = e.target.value.toLowerCase();
// //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// //         renderProducts(filtered);
// //     });

// //     // --- PAYMENT INPUT LISTENER ---
// //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // });

// // // =========================================================
// // // UI FUNCTIONS
// // // =========================================================

// // function initTheme() {
// //     if (localStorage.getItem('theme') === 'dark') {
// //         document.body.classList.add('dark-mode');
// //     }
// // }

// // window.openLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'flex';
// // };
// // window.closeLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'none';
// // };
// // window.confirmLogout = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.removeItem('userRole');
// //         localStorage.removeItem('userName');
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //     }
// // };

// // function renderProducts(list) {
// //     const grid = document.getElementById('productsGrid');
// //     if(!grid) return;
// //     grid.innerHTML = '';
    
// //     if (list.length === 0) {
// //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// //         return;
// //     }

// //     list.forEach(p => {
// //         const qty = Number(p.quantity || p.stock || 0);
// //         const isOOS = qty <= 0;
        
// //         const card = document.createElement('div');
// //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// //         card.onclick = () => !isOOS && addToCart(p);
        
// //         const displayPrice = parseFloat(p.price || p.cost || 0);
// //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// //         const imageHtml = imgUrl 
// //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// //         card.innerHTML = `
// //             ${imageHtml}
// //             <div class="product-info">
// //                 <div>
// //                     <h4>${p.name}</h4>
// //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// //                 </div>
// //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// //             </div>
// //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// //         `;
// //         grid.appendChild(card);
// //     });
// // }

// // window.filterProducts = function(catId, btn) {
// //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// //     if (btn) btn.classList.add('active');
// //     const filtered = (catId === 'all') 
// //         ? products 
// //         : products.filter(p => 
// //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// //             (p.categoryId || '') === catId
// //         );
// //     renderProducts(filtered);
// // };

// // // =========================================================
// // // CART LOGIC
// // // =========================================================

// // function addToCart(product) {
// //     const existing = cart.find(i => i.id === product.id);
// //     const currentQty = existing ? existing.qty : 0;
// //     const productStock = Number(product.quantity || product.stock || 0);
    
// //     if (currentQty + 1 > productStock) {
// //         showToast("Not enough stock!", "error");
// //         return;
// //     }
// //     const priceToUse = parseFloat(product.price || product.cost || 0);

// //     if (existing) {
// //         existing.qty++;
// //     } else {
// //         cart.push({
// //             id: product.id,
// //             name: product.name,
// //             price: priceToUse,
// //             qty: 1
// //         });
// //     }
// //     renderCart();
// // }

// // function renderCart() {
// //     const container = document.getElementById('cartItems');
// //     if(!container) return;
// //     container.innerHTML = '';
// //     if (cart.length === 0) {
// //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// //         updateTotals(0);
// //         return;
// //     }
// //     let total = 0;
// //     cart.forEach((item, index) => {
// //         const itemTotal = item.price * item.qty;
// //         total += itemTotal;
// //         const div = document.createElement('div');
// //         div.className = 'cart-item';
// //         div.innerHTML = `
// //             <div class="item-info">
// //                 <h4>${item.name}</h4>
// //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// //             </div>
// //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// //             <div class="item-actions">
// //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// //             </div>
// //         `;
// //         container.appendChild(div);
// //     });
// //     updateTotals(total);
// // }

// // window.updateQty = function(index, change) {
// //     const item = cart[index];
// //     const product = products.find(p => p.id === item.id);
// //     if (change === 1) {
// //         const productStock = Number(product.quantity || product.stock || 0);
// //         if (item.qty + 1 > productStock) {
// //             showToast("Max stock reached", "error");
// //             return;
// //         }
// //         item.qty++;
// //     } else {
// //         if (item.qty > 1) item.qty--;
// //         else cart.splice(index, 1);
// //     }
// //     renderCart();
// // };

// // window.removeItem = function(index) {
// //     cart.splice(index, 1);
// //     renderCart();
// // };

// // window.clearCart = function() {
// //     if(cart.length === 0) return;
// //     document.getElementById('clearOrderModal').style.display = 'flex';
// // };
// // window.closeClearModal = function() {
// //     document.getElementById('clearOrderModal').style.display = 'none';
// // };
// // window.confirmClearOrder = function() {
// //     cart = [];
// //     renderCart();
// //     window.closeClearModal();
// //     showToast("Order cleared", "success");
// // };

// // function updateTotals(subtotal) {
// //     const total = subtotal;
// //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// //     // Cart footer
// //     const subtotalEl = document.getElementById('subtotalDisplay');
// //     const vatEl = document.getElementById('vatDisplay');
// //     const totalEl = document.getElementById('totalDisplay');
// //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// //     if(vatEl) vatEl.innerText = fmt(0);
// //     if(totalEl) totalEl.innerText = fmt(total);

// //     // Payment modal total
// //     const modalTotal = document.getElementById('modalTotalAmount');
// //     if(modalTotal) {
// //         modalTotal.dataset.value = total;
// //         modalTotal.innerText = fmt(total);
// //     }
// // }

// // // =========================================================
// // // PAYMENT MODAL
// // // =========================================================

// // window.openPaymentModal = function() {
// //     if (cart.length === 0) {
// //         showToast("Cart is empty!", "error");
// //         return;
// //     }
// //     document.getElementById('paymentModal').style.display = 'flex';
// //     document.getElementById('amountPaid').value = '';
// //     document.getElementById('changeAmount').innerText = '₱0.00';
// //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // };

// // // Override closePaymentModal to stop NFC listening
// // const originalClosePaymentModal = window.closePaymentModal;
// // window.closePaymentModal = function() {
// //     stopNFCListening();
// //     if(originalClosePaymentModal) {
// //         originalClosePaymentModal();
// //     } else {
// //         document.getElementById('paymentModal').style.display = 'none';
// //     }
// // };

// // // =========================================================
// // // PAYMENT METHOD SELECTION + NFC INTEGRATION
// // // =========================================================

// // window.setPaymentMethod = function(method, btn) {
// //     currentPaymentMethod = method;
// //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// //     btn.classList.add('active');
    
// //     const cashDiv = document.getElementById('cash-payment-section');
// //     const digitalDiv = document.getElementById('digital-payment-section');
// //     const nfcDiv = document.getElementById('nfc-payment-section');
// //     const qrDiv = document.getElementById('qr-code-section');
    
// //     // Hide all sections first
// //     if(cashDiv) cashDiv.style.display = 'none';
// //     if(digitalDiv) digitalDiv.style.display = 'none';
// //     if(nfcDiv) nfcDiv.style.display = 'none';
// //     if(qrDiv) qrDiv.style.display = 'none';
    
// //     // Show relevant section
// //     if (method === 'Cash') {
// //         if(cashDiv) cashDiv.style.display = 'block';
// //     } else if (method === 'NFC') {
// //         if(nfcDiv) nfcDiv.style.display = 'block';
        
// //         // Update amount display
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
// //         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
// //         startNFCListening();
// //     } else {
// //         // GCash or Bank
// //         if(digitalDiv) digitalDiv.style.display = 'block';
// //         if(qrDiv) qrDiv.style.display = 'flex';
// //     }
// // };

// // function startNFCListening() {
// //     const nfcStatus = document.getElementById('nfcStatus');
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
// //     if(nfcStatus) {
// //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for Customer tap...';
// //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// //     }
    
// //     // Write pending payment to RTDB for ESP32-C3 to see
// //     set(ref(rtdb, 'nfc_payment/pending'), {
// //         amount: total,
// //         timestamp: Date.now(),
// //         status: 'waiting'
// //     }).catch(err => console.error('RTDB write error:', err));
    
// //     // Listen for ESP32-C3 confirmation
// //     const nfcRef = ref(rtdb, 'nfc_payment/status');
// //     nfcListener = onValue(nfcRef, (snapshot) => {
// //         const data = snapshot.val();
        
// //         if (!data) return;
        
// //         if (data.status === 'processing') {
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// //             }
// //         } 
// //         else if (data.status === 'success') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
// //                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
// //             }
            
// //             // Auto-complete after 1 second
// //             setTimeout(() => {
// //                 processNFCPayment(data);
// //             }, 1000);
// //         }
// //         else if (data.status === 'failed') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
// //                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
// //             }
// //             showToast('NFC Payment Failed', 'error');
// //         }
// //     });
// // }

// // function stopNFCListening() {
// //     if(nfcListener) {
// //         nfcListener(); // Unsubscribe from RTDB listener
// //         nfcListener = null;
// //     }
    
// //     // Clear RTDB nodes
// //     remove(ref(rtdb, 'nfc_payment/pending')).catch(err => console.log('Cleanup pending:', err));
// //     remove(ref(rtdb, 'nfc_payment/status')).catch(err => console.log('Cleanup status:', err));
// // }

// // async function processNFCPayment(nfcData) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// //     const orderId = document.getElementById('orderNumber').innerText;
    
// //     const orderData = {
// //         date: new Date().toISOString(),
// //         orderId: orderId,
// //         customer: custName,
// //         contact: custPhone,
// //         items: cart,
// //         total: total,
// //         method: 'NFC',
// //         cashReceived: total,
// //         change: 0,
// //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         status: 'completed'
// //     };
    
// //     try {
// //         // 1. Save transaction to Firestore
// //         await addDoc(collection(db, "transactions"), orderData);
        
// //         // 2. Send to kitchen queue (RTDB) - CYD will display this
// //         await sendToKitchen(orderId, cart);
        
// //         // 3. Reduce stock
// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id);
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || 0);
// //                 await updateDoc(productRef, { 
// //                     quantity: Math.max(0, currentStock - item.qty) 
// //                 });
// //             }
// //         }
        
// //         // 4. Show receipt and cleanup
// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
        
// //         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
// //     } catch(err) {
// //         console.error("NFC Payment Error:", err);
// //         showToast("❌ Transaction Failed: " + err.message, "error");
// //     }
// // }

// // // =========================================================
// // // CASH PAYMENT HELPERS
// // // =========================================================

// // window.setCash = function(amount) {
// //     const input = document.getElementById('amountPaid');
// //     const currentVal = parseFloat(input.value) || 0;
// //     input.value = currentVal + amount;
// //     calculateChange();
// // };

// // function calculateChange() {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const input = document.getElementById('amountPaid');
// //     const paid = parseFloat(input.value || 0);
// //     const change = paid - total;
// //     const changeEl = document.getElementById('changeAmount');
    
// //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // }

// // // =========================================================
// // // PROCESS FULL PAYMENT
// // // =========================================================

// // window.processPayment = async function() {
// //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// //     setBtnLoading(payBtn, true);

// //     try {
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// //         const orderId = document.getElementById('orderNumber').innerText; 
        
// //         let paid = 0;
// //         let refNum = '-';

// //         if (currentPaymentMethod === 'Cash') {
// //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// //             if (paid < total) {
// //                 showToast("Insufficient Cash", "error");
// //                 throw new Error("Insufficient Cash"); 
// //             }
// //         } else {
// //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// //             refNum = refInput ? refInput.value : '';
// //             paid = total; 
// //             if (!refNum) {
// //                 showToast("Please enter Reference Number", "error");
// //                 throw new Error("Missing Reference"); 
// //             }
// //         }

// //         const orderData = {
// //             date: new Date().toISOString(),
// //             orderId: orderId,
// //             customer: custName,
// //             contact: custPhone,
// //             items: cart,
// //             total: total,
// //             method: currentPaymentMethod,
// //             cashReceived: paid,
// //             change: paid - total,
// //             reference: refNum,
// //             cashier: localStorage.getItem('userName') || 'Staff'
// //         };

// //         await addDoc(collection(db, "transactions"), orderData);
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// //         showToast("Payment Successful!", "success");

// //     } catch (err) {
// //         console.error(err);
// //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// //             showToast("Transaction Failed", "error");
// //         }
// //     } finally {
// //         setBtnLoading(payBtn, false);
// //     }
// // };

// // // =========================================================
// // // PROCESS DOWNPAYMENT
// // // =========================================================

// // window.processDownpayment = async function() {
// //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// //     if (currentPaymentMethod !== 'Cash') {
// //         window.openDigitalDPModal();
// //         return;
// //     }

// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const cashInput = document.getElementById('amountPaid');
// //     let cashReceived = 0;
    
// //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// //     if (isNaN(cashReceived) || cashReceived <= 0) {
// //         return showToast('Please enter a valid amount', 'error');
// //     }
// //     if (cashReceived >= total) {
// //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// //     }

// //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// //     setBtnLoading(dpBtn, true);

// //     try {
// //         await saveDownpayment(cashReceived, 'Cash', '');
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(dpBtn, false);
// //     }
// // };

// // window.openDigitalDPModal = function() {
// //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// //     document.getElementById('digi-dp-amount').value = '';
// //     const mainRef = document.getElementById('referenceNumber');
// //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// //     document.getElementById('digi-dp-amount').focus();
// // };
// // window.closeDigitalDPModal = function() {
// //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // };
// // window.confirmDigitalDP = async function() {
// //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// //     const refVal = document.getElementById('digi-dp-ref').value;
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// //     setBtnLoading(confirmBtn, true);

// //     try {
// //         window.closeDigitalDPModal();
// //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(confirmBtn, false);
// //     }
// // };

// // async function saveDownpayment(amountPaid, method, reference) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const balance = total - amountPaid;
// //     const orderId = document.getElementById('orderNumber').innerText; 

// //     const orderData = {
// //         orderId: orderId,
// //         date: new Date().toISOString(),
// //         items: cart,
// //         total: total,
// //         cashReceived: amountPaid,
// //         change: 0, 
// //         balance: balance,
// //         method: method,
// //         reference: reference,
// //         status: 'Partial',
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// //         contact: document.getElementById('customerPhone')?.value || '-'
// //     };

// //     try {
// //         await addDoc(collection(db, "transactions"), orderData); 
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// //         document.getElementById('paymentModal').style.display = 'none';
// //         document.getElementById('receiptModal').style.display = 'flex';
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// //         showToast('Downpayment recorded!', 'success');
// //     } catch (error) {
// //         console.error("Error saving order: ", error);
// //         showToast('Error saving order', 'error');
// //         throw error; 
// //     }
// // }

// // // =========================================================
// // // RECEIPT UTILS
// // // =========================================================

// // function showReceipt(data) {
// //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// //     document.getElementById('receiptModal').style.display = 'flex';
// // }

// // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// //     document.getElementById('rec-orderId').innerText = data.orderId;
// //     document.getElementById('rec-cashier').innerText = data.cashier;
// //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// //     const itemsDiv = document.getElementById('rec-items');
// //     itemsDiv.innerHTML = '';
// //     data.items.forEach(item => {
// //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// //     });

// //     document.getElementById('rec-total').innerText = total.toFixed(2);
// //     document.getElementById('rec-method').innerText = method;

// //     const rowBalance = document.getElementById('row-balance');
// //     if(balance > 0) {
// //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// //         document.getElementById('row-change').style.display = 'none';
// //     } else {
// //         if(rowBalance) rowBalance.style.display = 'none';
// //         document.getElementById('row-change').style.display = 'flex';
// //         const change = paid - total;
// //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// //     }

// //     if(method === 'Cash') {
// //         document.getElementById('row-cash-paid').style.display = 'flex';
// //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// //         document.getElementById('row-ref').style.display = 'none';
// //     } else {
// //         document.getElementById('row-cash-paid').style.display = 'none';
// //         document.getElementById('row-change').style.display = 'none';
// //         document.getElementById('row-ref').style.display = 'flex';
// //         document.getElementById('rec-ref').innerText = refNum;
// //     }
// // }

// // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // window.printReceipt = function() { window.print(); };

// // function generateOrderID() {
// //     const randomId = Math.floor(100000 + Math.random() * 900000);
// //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // }

// // function showToast(msg, type) {
// //     const container = document.getElementById('toast-container');
// //     const toast = document.createElement('div');
// //     toast.className = `toast ${type}`;
// //     toast.innerHTML = type === 'success' 
// //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// //     container.appendChild(toast);
// //     setTimeout(() => toast.remove(), 3000);
// // }

// // function setBtnLoading(btn, isLoading) {
// //     if(!btn) return;
// //     if(isLoading) {
// //         btn.dataset.originalText = btn.innerHTML;
// //         btn.disabled = true;
// //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// //     } else {
// //         btn.disabled = false;
// //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// //     }
// // }

// // // =========================================================
// // // SEND TO KITCHEN
// // // =========================================================

// // async function sendToKitchen(orderId, cartItems) {
// //     if (!cartItems || cartItems.length === 0) return;
// //     try {
// //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// //             table: orderId,
// //             items: itemsString,
// //             timestamp: Date.now()
// //         });
// //         console.log("✅ Sent to Kitchen!");
// //     } catch (e) {
// //         console.error("❌ Error sending to kitchen:", e);
// //     }
// // }





// //NEW CODE WITH CYD + NFC INTEGRATION (FIXED - NO MORE STUCK "PAYMENT SUCCESSFUL")
// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { 
//     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
//     rtdb, ref, set, onValue, remove
// } from './firebase.js';

// let products = [];
// let cart = [];
// let currentPaymentMethod = 'Cash';
// let nfcListener = null;

// document.addEventListener('DOMContentLoaded', () => {
//     initTheme();
//     generateOrderID();
    
//     const userRole = localStorage.getItem('userRole'); 
//     const logoutBtn = document.getElementById('logout-sidebar-item');
//     if (userRole && userRole.toLowerCase() === 'cashier') {
//         if(logoutBtn) logoutBtn.style.display = 'block';
//     } else {
//         if(logoutBtn) logoutBtn.style.display = 'none';
//     }

//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     onSnapshot(collection(db, "categories"), (snapshot) => {
//         const tabs = document.getElementById('categoryTabs');
//         if(tabs) {
//             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
//             snapshot.forEach(doc => {
//                 const data = doc.data();
//                 // Only show active categories
//                 if (data.status === 'archived') return;
//                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
//             });
//         }
//     });

//     onSnapshot(collection(db, "products"), (snapshot) => {
//         products = [];
//         snapshot.forEach(doc => {
//             const data = doc.data();
//             // Only show active products in POS
//             if (data.status === 'archived' || data.status === 'inactive') return;
//             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
//             products.push({ 
//                 id: doc.id, 
//                 ...data,
//                 quantity: isNaN(stockVal) ? 0 : stockVal
//             });
//         });
//         renderProducts(products);
//     });

//     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
//         const term = e.target.value.toLowerCase();
//         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
//         renderProducts(filtered);
//     });

//     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// });

// function initTheme() {
//     if (localStorage.getItem('theme') === 'dark') {
//         document.body.classList.add('dark-mode');
//     }
// }

// window.openLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'flex';
// };
// window.closeLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'none';
// };
// window.confirmLogout = async function() {
//     try {
//         await signOut(auth);
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('userName');
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error("Logout Error:", error);
//     }
// };

// function renderProducts(list) {
//     const grid = document.getElementById('productsGrid');
//     if(!grid) return;
//     grid.innerHTML = '';
    
//     if (list.length === 0) {
//         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
//         return;
//     }

//     list.forEach(p => {
//         const qty = Number(p.quantity || p.stock || 0);
//         const isOOS = qty <= 0;
//         const card = document.createElement('div');
//         card.className = `product-card ${isOOS ? 'oos' : ''}`;
//         card.onclick = () => !isOOS && addToCart(p);
//         const displayPrice = parseFloat(p.price || p.cost || 0);
//         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
//         const imageHtml = imgUrl 
//             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
//             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

//         card.innerHTML = `
//             ${imageHtml}
//             <div class="product-info">
//                 <div>
//                     <h4>${p.name}</h4>
//                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
//                 </div>
//                 <span class="price">₱${displayPrice.toLocaleString()}</span>
//             </div>
//             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
//         `;
//         grid.appendChild(card);
//     });
// }

// window.filterProducts = function(catId, btn) {
//     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
//     if (btn) btn.classList.add('active');
//     const filtered = (catId === 'all') 
//         ? products 
//         : products.filter(p => 
//             (p.category || '').toLowerCase() === catId.toLowerCase() ||
//             (p.categoryId || '') === catId
//         );
//     renderProducts(filtered);
// };

// function addToCart(product) {
//     const existing = cart.find(i => i.id === product.id);
//     const currentQty = existing ? existing.qty : 0;
//     const productStock = Number(product.quantity || product.stock || 0);
    
//     if (currentQty + 1 > productStock) {
//         showToast("Not enough stock!", "error");
//         return;
//     }
//     const priceToUse = parseFloat(product.price || product.cost || 0);

//     if (existing) {
//         existing.qty++;
//     } else {
//         cart.push({
//             id: product.id,
//             name: product.name,
//             price: priceToUse,
//             qty: 1
//         });
//     }
//     renderCart();
// }

// function renderCart() {
//     const container = document.getElementById('cartItems');
//     if(!container) return;
//     container.innerHTML = '';
//     if (cart.length === 0) {
//         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
//         updateTotals(0);
//         return;
//     }
//     let total = 0;
//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.qty;
//         total += itemTotal;
//         const div = document.createElement('div');
//         div.className = 'cart-item';
//         div.innerHTML = `
//             <div class="item-info">
//                 <h4>${item.name}</h4>
//                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
//             </div>
//             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
//             <div class="item-actions">
//                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
//                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
//                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
//                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
//             </div>
//         `;
//         container.appendChild(div);
//     });
//     updateTotals(total);
// }

// window.updateQty = function(index, change) {
//     const item = cart[index];
//     const product = products.find(p => p.id === item.id);
//     if (change === 1) {
//         const productStock = Number(product.quantity || product.stock || 0);
//         if (item.qty + 1 > productStock) {
//             showToast("Max stock reached", "error");
//             return;
//         }
//         item.qty++;
//     } else {
//         if (item.qty > 1) item.qty--;
//         else cart.splice(index, 1);
//     }
//     renderCart();
// };

// window.removeItem = function(index) {
//     cart.splice(index, 1);
//     renderCart();
// };

// window.clearCart = function() {
//     if(cart.length === 0) return;
//     document.getElementById('clearOrderModal').style.display = 'flex';
// };
// window.closeClearModal = function() {
//     document.getElementById('clearOrderModal').style.display = 'none';
// };
// window.confirmClearOrder = function() {
//     cart = [];
//     renderCart();
//     window.closeClearModal();
//     showToast("Order cleared", "success");
// };

// function updateTotals(subtotal) {
//     const total = subtotal;
//     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

//     const subtotalEl = document.getElementById('subtotalDisplay');
//     const vatEl = document.getElementById('vatDisplay');
//     const totalEl = document.getElementById('totalDisplay');
//     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
//     if(vatEl) vatEl.innerText = fmt(0);
//     if(totalEl) totalEl.innerText = fmt(total);

//     const modalTotal = document.getElementById('modalTotalAmount');
//     if(modalTotal) {
//         modalTotal.dataset.value = total;
//         modalTotal.innerText = fmt(total);
//     }
// }

// window.openPaymentModal = function() {
//     if (cart.length === 0) {
//         showToast("Cart is empty!", "error");
//         return;
//     }
//     document.getElementById('paymentModal').style.display = 'flex';
//     document.getElementById('amountPaid').value = '';
//     document.getElementById('changeAmount').innerText = '₱0.00';
//     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
//     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
//     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// };

// window.closePaymentModal = function() {
//     stopNFCListening(); // CRITICAL: Clean up NFC state
//     document.getElementById('paymentModal').style.display = 'none';
// };

// // =========================================================
// // NFC PAYMENT INTEGRATION (FIXED)
// // =========================================================

// window.setPaymentMethod = function(method, btn) {
//     currentPaymentMethod = method;
//     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
    
//     const cashDiv = document.getElementById('cash-payment-section');
//     const digitalDiv = document.getElementById('digital-payment-section');
//     const nfcDiv = document.getElementById('nfc-payment-section');
//     const qrDiv = document.getElementById('qr-code-section');
    
//     // Stop NFC if switching away from it
//     if (method !== 'NFC') {
//         stopNFCListening();
//     }
    
//     if(cashDiv) cashDiv.style.display = 'none';
//     if(digitalDiv) digitalDiv.style.display = 'none';
//     if(nfcDiv) nfcDiv.style.display = 'none';
//     if(qrDiv) qrDiv.style.display = 'none';
    
//     if (method === 'Cash') {
//         if(cashDiv) cashDiv.style.display = 'block';
//     } else if (method === 'NFC') {
//         if(nfcDiv) nfcDiv.style.display = 'block';
        
//         // Reset NFC UI completely
//         const nfcStatus = document.getElementById('nfcStatus');
//         if(nfcStatus) {
//             nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
//             nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//             nfcStatus.style.display = 'block';
//         }
        
//         // Update amount display
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
//         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
//         // Start fresh NFC session
//         startNFCListening();
//     } else {
//         if(digitalDiv) digitalDiv.style.display = 'block';
//         if(qrDiv) qrDiv.style.display = 'flex';
//     }
// };

// function startNFCListening() {
//     const nfcStatus = document.getElementById('nfcStatus');
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
//     // CRITICAL: Stop any existing listener first
//     stopNFCListening();
    
//     if(nfcStatus) {
//         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
//         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//         nfcStatus.style.display = 'block';
//     }
    
//     // Clear old RTDB data first, then write new
//     Promise.all([
//         remove(ref(rtdb, 'nfc_payment/pending')),
//         remove(ref(rtdb, 'nfc_payment/status'))
//     ]).then(() => {
//         // Write fresh pending payment
//         return set(ref(rtdb, 'nfc_payment/pending'), {
//             amount: total,
//             timestamp: Date.now(),
//             status: 'waiting'
//         });
//     }).catch(err => console.error('RTDB write error:', err));
    
//     // Listen for ESP32-C3 confirmation
//     const nfcRef = ref(rtdb, 'nfc_payment/status');
//     nfcListener = onValue(nfcRef, (snapshot) => {
//         const data = snapshot.val();
        
//         if (!data) return;
        
//         if (data.status === 'processing') {
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
//             }
//         } 
//         else if (data.status === 'success') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
//                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
//             }
            
//             setTimeout(() => {
//                 processNFCPayment(data);
//             }, 1000);
//         }
//         else if (data.status === 'failed') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
//                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
//             }
//             showToast('NFC Payment Failed', 'error');
//         }
//     });
// }

// function stopNFCListening() {
//     if(nfcListener) {
//         nfcListener(); // Unsubscribe
//         nfcListener = null;
//     }
    
//     // Clear RTDB nodes
//     Promise.all([
//         remove(ref(rtdb, 'nfc_payment/pending')),
//         remove(ref(rtdb, 'nfc_payment/status'))
//     ]).catch(err => console.log('Cleanup:', err));
    
//     // Reset UI
//     const nfcStatus = document.getElementById('nfcStatus');
//     if(nfcStatus) {
//         nfcStatus.style.display = 'none';
//         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//     }
// }

// async function processNFCPayment(nfcData) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const custName = document.getElementById('customerName')?.value || 'Walk-in';
//     const custPhone = document.getElementById('customerPhone')?.value || '-';
//     const orderId = document.getElementById('orderNumber').innerText;
    
//     const orderData = {
//         date: new Date().toISOString(),
//         orderId: orderId,
//         customer: custName,
//         contact: custPhone,
//         items: cart,
//         total: total,
//         method: 'NFC',
//         cashReceived: total,
//         change: 0,
//         reference: nfcData.transactionId || 'NFC-' + Date.now(),
//         cashier: localStorage.getItem('userName') || 'Staff',
//         status: 'completed'
//     };
    
//     try {
//         await addDoc(collection(db, "transactions"), orderData);
//         await sendToKitchen(orderId, cart);
        
//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id);
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || 0);
//                 await updateDoc(productRef, { 
//                     quantity: Math.max(0, currentStock - item.qty) 
//                 });
//             }
//         }
        
//         // CRITICAL: Clean up NFC state BEFORE showing receipt
//         stopNFCListening();
        
//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
        
//         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
//     } catch(err) {
//         console.error("NFC Payment Error:", err);
//         stopNFCListening();
//         showToast("❌ Transaction Failed: " + err.message, "error");
//     }
// }

// window.setCash = function(amount) {
//     const input = document.getElementById('amountPaid');
//     const currentVal = parseFloat(input.value) || 0;
//     input.value = currentVal + amount;
//     calculateChange();
// };

// function calculateChange() {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const input = document.getElementById('amountPaid');
//     const paid = parseFloat(input.value || 0);
//     const change = paid - total;
//     const changeEl = document.getElementById('changeAmount');
    
//     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
//     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// }

// window.processPayment = async function() {
//     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
//     setBtnLoading(payBtn, true);

//     try {
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const custName = document.getElementById('customerName')?.value || 'Walk-in';
//         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
//         const orderId = document.getElementById('orderNumber').innerText; 
        
//         let paid = 0;
//         let refNum = '-';

//         if (currentPaymentMethod === 'Cash') {
//             paid = parseFloat(document.getElementById('amountPaid').value || 0);
//             if (paid < total) {
//                 showToast("Insufficient Cash", "error");
//                 throw new Error("Insufficient Cash"); 
//             }
//         } else {
//             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
//             refNum = refInput ? refInput.value : '';
//             paid = total; 
//             if (!refNum) {
//                 showToast("Please enter Reference Number", "error");
//                 throw new Error("Missing Reference"); 
//             }
//         }

//         const orderData = {
//             date: new Date().toISOString(),
//             orderId: orderId,
//             customer: custName,
//             contact: custPhone,
//             items: cart,
//             total: total,
//             method: currentPaymentMethod,
//             cashReceived: paid,
//             change: paid - total,
//             reference: refNum,
//             cashier: localStorage.getItem('userName') || 'Staff'
//         };

//         await addDoc(collection(db, "transactions"), orderData);
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
//         showToast("Payment Successful!", "success");

//     } catch (err) {
//         console.error(err);
//         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
//             showToast("Transaction Failed", "error");
//         }
//     } finally {
//         setBtnLoading(payBtn, false);
//     }
// };

// window.processDownpayment = async function() {
//     if (cart.length === 0) return showToast('Cart is empty', 'error');

//     if (currentPaymentMethod !== 'Cash') {
//         window.openDigitalDPModal();
//         return;
//     }

//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const cashInput = document.getElementById('amountPaid');
//     let cashReceived = 0;
    
//     if (cashInput) cashReceived = parseFloat(cashInput.value);

//     if (isNaN(cashReceived) || cashReceived <= 0) {
//         return showToast('Please enter a valid amount', 'error');
//     }
//     if (cashReceived >= total) {
//         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
//     }

//     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
//     setBtnLoading(dpBtn, true);

//     try {
//         await saveDownpayment(cashReceived, 'Cash', '');
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(dpBtn, false);
//     }
// };

// window.openDigitalDPModal = function() {
//     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
//     document.getElementById('digi-dp-amount').value = '';
//     const mainRef = document.getElementById('referenceNumber');
//     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
//     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
//     document.getElementById('digi-dp-amount').focus();
// };
// window.closeDigitalDPModal = function() {
//     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// };
// window.confirmDigitalDP = async function() {
//     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
//     const refVal = document.getElementById('digi-dp-ref').value;
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

//     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
//     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
//     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

//     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
//     setBtnLoading(confirmBtn, true);

//     try {
//         window.closeDigitalDPModal();
//         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(confirmBtn, false);
//     }
// };

// async function saveDownpayment(amountPaid, method, reference) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const balance = total - amountPaid;
//     const orderId = document.getElementById('orderNumber').innerText; 

//     const orderData = {
//         orderId: orderId,
//         date: new Date().toISOString(),
//         items: cart,
//         total: total,
//         cashReceived: amountPaid,
//         change: 0, 
//         balance: balance,
//         method: method,
//         reference: reference,
//         status: 'Partial',
//         cashier: localStorage.getItem('userName') || 'Staff',
//         customer: document.getElementById('customerName')?.value || 'Walk-in',
//         contact: document.getElementById('customerPhone')?.value || '-'
//     };

//     try {
//         await addDoc(collection(db, "transactions"), orderData); 
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
//         document.getElementById('paymentModal').style.display = 'none';
//         document.getElementById('receiptModal').style.display = 'flex';
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

//         showToast('Downpayment recorded!', 'success');
//     } catch (error) {
//         console.error("Error saving order: ", error);
//         showToast('Error saving order', 'error');
//         throw error; 
//     }
// }

// function showReceipt(data) {
//     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
//     document.getElementById('receiptModal').style.display = 'flex';
// }

// function prepareReceiptUI(data, total, paid, balance, method, refNum) {
//     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
//     document.getElementById('rec-orderId').innerText = data.orderId;
//     document.getElementById('rec-cashier').innerText = data.cashier;
//     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

//     const itemsDiv = document.getElementById('rec-items');
//     itemsDiv.innerHTML = '';
//     data.items.forEach(item => {
//         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
//     });

//     document.getElementById('rec-total').innerText = total.toFixed(2);
//     document.getElementById('rec-method').innerText = method;

//     const rowBalance = document.getElementById('row-balance');
//     if(balance > 0) {
//         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
//         document.getElementById('row-change').style.display = 'none';
//     } else {
//         if(rowBalance) rowBalance.style.display = 'none';
//         document.getElementById('row-change').style.display = 'flex';
//         const change = paid - total;
//         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
//     }

//     if(method === 'Cash') {
//         document.getElementById('row-cash-paid').style.display = 'flex';
//         document.getElementById('rec-cash').innerText = paid.toFixed(2);
//         document.getElementById('row-ref').style.display = 'none';
//     } else {
//         document.getElementById('row-cash-paid').style.display = 'none';
//         document.getElementById('row-change').style.display = 'none';
//         document.getElementById('row-ref').style.display = 'flex';
//         document.getElementById('rec-ref').innerText = refNum;
//     }
// }

// window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// window.printReceipt = function() { window.print(); };

// function generateOrderID() {
//     const randomId = Math.floor(100000 + Math.random() * 900000);
//     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// }

// function showToast(msg, type) {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = type === 'success' 
//         ? `<i class="fas fa-check-circle"></i> ${msg}` 
//         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
//     container.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
// }

// function setBtnLoading(btn, isLoading) {
//     if(!btn) return;
//     if(isLoading) {
//         btn.dataset.originalText = btn.innerHTML;
//         btn.disabled = true;
//         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
//     } else {
//         btn.disabled = false;
//         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
//     }
// }

// async function sendToKitchen(orderId, cartItems) {
//     if (!cartItems || cartItems.length === 0) return;
//     try {
//         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
//         await set(ref(rtdb, 'kitchen_queue/current_order'), {
//             table: orderId,
//             items: itemsString,
//             timestamp: Date.now()
//         });
//         console.log("✅ Sent to Kitchen!");
//     } catch (e) {
//         console.error("❌ Error sending to kitchen:", e);
//     }
// }









// // //NEW CODE WITH CYD ALAS DOS NA
// // // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // // import { 
// // //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, rtdb, ref, set
// // // } from './firebase.js';

// // // let products = [];
// // // let cart = [];
// // // let currentPaymentMethod = 'Cash'; 

// // // document.addEventListener('DOMContentLoaded', () => {
// // //     initTheme();
// // //     generateOrderID();
    
// // //     // --- CHECK LOGIN STATUS ---
// // //     const userRole = localStorage.getItem('userRole'); 
// // //     const logoutBtn = document.getElementById('logout-sidebar-item');
// // //     if (userRole && userRole.toLowerCase() === 'cashier') {
// // //         if(logoutBtn) logoutBtn.style.display = 'block';
// // //     } else {
// // //         if(logoutBtn) logoutBtn.style.display = 'none';
// // //     }

// // //     // --- DISPLAY DATE ---
// // //     const dateEl = document.getElementById('currentDate');
// // //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// // //     // --- LOAD CATEGORIES ---
// // //     onSnapshot(collection(db, "categories"), (snapshot) => {
// // //         const tabs = document.getElementById('categoryTabs');
// // //         if(tabs) {
// // //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// // //             snapshot.forEach(doc => {
// // //                 const data = doc.data();
// // //                 // FIX 1: Use data.name instead of doc.id to match products' category field
// // //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// // //             });
// // //         }
// // //     });

// // //     // --- LOAD PRODUCTS ---
// // //     onSnapshot(collection(db, "products"), (snapshot) => {
// // //         products = [];
// // //         snapshot.forEach(doc => {
// // //             const data = doc.data();
// // //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// // //             products.push({ 
// // //                 id: doc.id, 
// // //                 ...data,
// // //                 quantity: isNaN(stockVal) ? 0 : stockVal
// // //             });
// // //         });
// // //         renderProducts(products);
// // //     });

// // //     // --- SEARCH BAR ---
// // //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// // //         const term = e.target.value.toLowerCase();
// // //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// // //         renderProducts(filtered);
// // //     });

// // //     // --- PAYMENT INPUT LISTENER ---
// // //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // // });

// // // // =========================================================
// // // // UI FUNCTIONS
// // // // =========================================================

// // // function initTheme() {
// // //     if (localStorage.getItem('theme') === 'dark') {
// // //         document.body.classList.add('dark-mode');
// // //     }
// // // }

// // // window.openLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'flex';
// // // };
// // // window.closeLogoutModal = function() {
// // //     document.getElementById('logoutModal').style.display = 'none';
// // // };
// // // window.confirmLogout = async function() {
// // //     try {
// // //         await signOut(auth);
// // //         localStorage.removeItem('userRole');
// // //         localStorage.removeItem('userName');
// // //         window.location.href = 'index.html';
// // //     } catch (error) {
// // //         console.error("Logout Error:", error);
// // //     }
// // // };

// // // function renderProducts(list) {
// // //     const grid = document.getElementById('productsGrid');
// // //     if(!grid) return;
// // //     grid.innerHTML = '';
    
// // //     if (list.length === 0) {
// // //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// // //         return;
// // //     }

// // //     list.forEach(p => {
// // //         const qty = Number(p.quantity || p.stock || 0);
// // //         const isOOS = qty <= 0;
        
// // //         const card = document.createElement('div');
// // //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// // //         card.onclick = () => !isOOS && addToCart(p);
        
// // //         const displayPrice = parseFloat(p.price || p.cost || 0);
// // //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// // //         const imageHtml = imgUrl 
// // //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// // //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// // //         card.innerHTML = `
// // //             ${imageHtml}
// // //             <div class="product-info">
// // //                 <div>
// // //                     <h4>${p.name}</h4>
// // //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// // //                 </div>
// // //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// // //             </div>
// // //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// // //         `;
// // //         grid.appendChild(card);
// // //     });
// // // }

// // // window.filterProducts = function(catId, btn) {
// // //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// // //     if (btn) btn.classList.add('active');
// // //     // FIX 1: Filter by category name (matches Firestore product's category field)
// // //     const filtered = (catId === 'all') 
// // //         ? products 
// // //         : products.filter(p => 
// // //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// // //             (p.categoryId || '') === catId
// // //         );
// // //     renderProducts(filtered);
// // // };

// // // // =========================================================
// // // // CART LOGIC
// // // // =========================================================

// // // function addToCart(product) {
// // //     const existing = cart.find(i => i.id === product.id);
// // //     const currentQty = existing ? existing.qty : 0;
// // //     const productStock = Number(product.quantity || product.stock || 0);
    
// // //     if (currentQty + 1 > productStock) {
// // //         showToast("Not enough stock!", "error");
// // //         return;
// // //     }
// // //     const priceToUse = parseFloat(product.price || product.cost || 0);

// // //     if (existing) {
// // //         existing.qty++;
// // //     } else {
// // //         cart.push({
// // //             id: product.id,
// // //             name: product.name,
// // //             price: priceToUse,
// // //             qty: 1
// // //         });
// // //     }
// // //     renderCart();
// // // }

// // // function renderCart() {
// // //     const container = document.getElementById('cartItems');
// // //     if(!container) return;
// // //     container.innerHTML = '';
// // //     if (cart.length === 0) {
// // //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// // //         updateTotals(0);
// // //         return;
// // //     }
// // //     let total = 0;
// // //     cart.forEach((item, index) => {
// // //         const itemTotal = item.price * item.qty;
// // //         total += itemTotal;
// // //         const div = document.createElement('div');
// // //         div.className = 'cart-item';
// // //         div.innerHTML = `
// // //             <div class="item-info">
// // //                 <h4>${item.name}</h4>
// // //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// // //             </div>
// // //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// // //             <div class="item-actions">
// // //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// // //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// // //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// // //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// // //             </div>
// // //         `;
// // //         container.appendChild(div);
// // //     });
// // //     updateTotals(total);
// // // }

// // // window.updateQty = function(index, change) {
// // //     const item = cart[index];
// // //     const product = products.find(p => p.id === item.id);
// // //     if (change === 1) {
// // //         const productStock = Number(product.quantity || product.stock || 0);
// // //         if (item.qty + 1 > productStock) {
// // //             showToast("Max stock reached", "error");
// // //             return;
// // //         }
// // //         item.qty++;
// // //     } else {
// // //         if (item.qty > 1) item.qty--;
// // //         else cart.splice(index, 1);
// // //     }
// // //     renderCart();
// // // };

// // // window.removeItem = function(index) {
// // //     cart.splice(index, 1);
// // //     renderCart();
// // // };

// // // window.clearCart = function() {
// // //     if(cart.length === 0) return;
// // //     document.getElementById('clearOrderModal').style.display = 'flex';
// // // };
// // // window.closeClearModal = function() {
// // //     document.getElementById('clearOrderModal').style.display = 'none';
// // // };
// // // window.confirmClearOrder = function() {
// // //     cart = [];
// // //     renderCart();
// // //     window.closeClearModal();
// // //     showToast("Order cleared", "success");
// // // };

// // // // FIX 2: updateTotals now updates ALL cart footer displays + modal
// // // function updateTotals(subtotal) {
// // //     const total = subtotal;
// // //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// // //     // Cart footer
// // //     const subtotalEl = document.getElementById('subtotalDisplay');
// // //     const vatEl = document.getElementById('vatDisplay');
// // //     const totalEl = document.getElementById('totalDisplay');
// // //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// // //     if(vatEl) vatEl.innerText = fmt(0);
// // //     if(totalEl) totalEl.innerText = fmt(total);

// // //     // Payment modal total (set dataset.value for calculateChange to use)
// // //     const modalTotal = document.getElementById('modalTotalAmount');
// // //     if(modalTotal) {
// // //         modalTotal.dataset.value = total;
// // //         modalTotal.innerText = fmt(total);
// // //     }
// // // }

// // // // =========================================================
// // // // PAYMENT MODAL
// // // // =========================================================

// // // window.openPaymentModal = function() {
// // //     if (cart.length === 0) {
// // //         showToast("Cart is empty!", "error");
// // //         return;
// // //     }
// // //     document.getElementById('paymentModal').style.display = 'flex';
// // //     document.getElementById('amountPaid').value = '';
// // //     document.getElementById('changeAmount').innerText = '₱0.00';
// // //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// // //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// // //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // // };
// // // window.closePaymentModal = function() {
// // //     document.getElementById('paymentModal').style.display = 'none';
// // // };

// // // // window.setPaymentMethod = function(method, btn) {
// // // //     currentPaymentMethod = method;
// // // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // // //     btn.classList.add('active');
    
// // // //     const cashDiv = document.getElementById('cash-payment-section');
// // // //     const digitalDiv = document.getElementById('digital-payment-section');
// // // //     const qrDiv = document.getElementById('qr-code-section');
    
// // // //     if (method === 'Cash') {
// // // //         if(cashDiv) cashDiv.style.display = 'block';
// // // //         if(digitalDiv) digitalDiv.style.display = 'none';
// // // //         if(qrDiv) qrDiv.style.display = 'none';
// // // //     } else {
// // // //         if(cashDiv) cashDiv.style.display = 'none';
// // // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // // //         if(qrDiv) qrDiv.style.display = 'flex';
// // // //     }
// // // // };

// // // window.setPaymentMethod = function(method, btn) {
// // //     currentPaymentMethod = method;
// // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // //     btn.classList.add('active');
    
// // //     const cashDiv = document.getElementById('cash-payment-section');
// // //     const digitalDiv = document.getElementById('digital-payment-section');
// // //     const nfcDiv = document.getElementById('nfc-payment-section');
// // //     const qrDiv = document.getElementById('qr-code-section');
    
// // //     // Hide all sections first
// // //     if(cashDiv) cashDiv.style.display = 'none';
// // //     if(digitalDiv) digitalDiv.style.display = 'none';
// // //     if(nfcDiv) nfcDiv.style.display = 'none';
// // //     if(qrDiv) qrDiv.style.display = 'none';
    
// // //     // Show relevant section
// // //     if (method === 'Cash') {
// // //         if(cashDiv) cashDiv.style.display = 'block';
// // //     } else if (method === 'NFC') {
// // //         if(nfcDiv) nfcDiv.style.display = 'block';
// // //         startNFCListening(); // Start listening for ESP32
// // //     } else {
// // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // //         if(qrDiv) qrDiv.style.display = 'flex';
// // //     }
// // // };




// // // let nfcListenerInterval = null;

// // // function startNFCListening() {
// // //     // Show "waiting" status
// // //     const nfcStatus = document.getElementById('nfcStatus');
// // //     if(nfcStatus) {
// // //         nfcStatus.style.display = 'block';
// // //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for tap...';
// // //     }
    
// // //     // Poll backend for NFC payment signal from ESP32
// // //     nfcListenerInterval = setInterval(async () => {
// // //         try {
// // //             const response = await fetch('/api/nfc-payment-status'); // Your backend endpoint
// // //             const data = await response.json();
            
// // //             if(data.status === 'processing') {
// // //                 // Show processing animation
// // //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// // //             } else if(data.status === 'success') {
// // //                 // Payment confirmed!
// // //                 clearInterval(nfcListenerInterval);
// // //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle" style="color:#4caf50"></i> Payment successful!';
                
// // //                 // Auto-complete the payment
// // //                 setTimeout(() => {
// // //                     processNFCPayment(data);
// // //                 }, 1000);
// // //             }
// // //         } catch(err) {
// // //             console.error('NFC polling error:', err);
// // //         }
// // //     }, 1000); // Check every second
// // // }

// // // function stopNFCListening() {
// // //     if(nfcListenerInterval) {
// // //         clearInterval(nfcListenerInterval);
// // //         nfcListenerInterval = null;
// // //     }
// // // }

// // // async function processNFCPayment(nfcData) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// // //     const orderId = document.getElementById('orderNumber').innerText;
    
// // //     const orderData = {
// // //         date: new Date().toISOString(),
// // //         orderId: orderId,
// // //         customer: custName,
// // //         contact: custPhone,
// // //         items: cart,
// // //         total: total,
// // //         method: 'NFC',
// // //         cashReceived: total, // NFC always exact amount
// // //         change: 0,
// // //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// // //         cashier: localStorage.getItem('userName') || 'Staff'
// // //     };
    
// // //     try {
// // //         // Save transaction
// // //         await addDoc(collection(db, "transactions"), orderData);
        
// // //         // Send to kitchen
// // //         await sendToKitchen(orderId, cart);
        
// // //         // Reduce stock
// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id);
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || 0);
// // //                 await updateDoc(productRef, { quantity: currentStock - item.qty });
// // //             }
// // //         }
        
// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         showToast("NFC Payment Successful!", "success");
        
// // //     } catch(err) {
// // //         console.error(err);
// // //         showToast("Transaction Failed", "error");
// // //     }
// // // }

// // // // Update closePaymentModal to stop NFC listening
// // // const originalClosePaymentModal = window.closePaymentModal;
// // // window.closePaymentModal = function() {
// // //     stopNFCListening();
// // //     originalClosePaymentModal();
// // // };




// // // window.setCash = function(amount) {
// // //     const input = document.getElementById('amountPaid');
// // //     const currentVal = parseFloat(input.value) || 0;
// // //     input.value = currentVal + amount;
// // //     calculateChange();
// // // };

// // // function calculateChange() {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const input = document.getElementById('amountPaid');
// // //     const paid = parseFloat(input.value || 0);
// // //     const change = paid - total;
// // //     const changeEl = document.getElementById('changeAmount');
    
// // //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// // //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // // }

// // // // =========================================================
// // // // PROCESS FULL PAYMENT
// // // // =========================================================

// // // window.processPayment = async function() {
// // //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// // //     setBtnLoading(payBtn, true);

// // //     try {
// // //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// // //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// // //         const orderId = document.getElementById('orderNumber').innerText; 
        
// // //         let paid = 0;
// // //         let refNum = '-';

// // //         if (currentPaymentMethod === 'Cash') {
// // //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// // //             if (paid < total) {
// // //                 showToast("Insufficient Cash", "error");
// // //                 throw new Error("Insufficient Cash"); 
// // //             }
// // //         } else {
// // //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// // //             refNum = refInput ? refInput.value : '';
// // //             paid = total; 
// // //             if (!refNum) {
// // //                 showToast("Please enter Reference Number", "error");
// // //                 throw new Error("Missing Reference"); 
// // //             }
// // //         }

// // //         const orderData = {
// // //             date: new Date().toISOString(),
// // //             orderId: orderId,
// // //             customer: custName,
// // //             contact: custPhone,
// // //             items: cart,
// // //             total: total,
// // //             method: currentPaymentMethod,
// // //             cashReceived: paid,
// // //             change: paid - total,
// // //             reference: refNum,
// // //             cashier: localStorage.getItem('userName') || 'Staff'
// // //         };

// // //         await addDoc(collection(db, "transactions"), orderData);
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         showReceipt(orderData);
// // //         window.closePaymentModal();
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// // //         showToast("Payment Successful!", "success");

// // //     } catch (err) {
// // //         console.error(err);
// // //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// // //             showToast("Transaction Failed", "error");
// // //         }
// // //     } finally {
// // //         setBtnLoading(payBtn, false);
// // //     }
// // // };

// // // // =========================================================
// // // // PROCESS DOWNPAYMENT
// // // // =========================================================

// // // window.processDownpayment = async function() {
// // //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// // //     if (currentPaymentMethod !== 'Cash') {
// // //         window.openDigitalDPModal();
// // //         return;
// // //     }

// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const cashInput = document.getElementById('amountPaid');
// // //     let cashReceived = 0;
    
// // //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// // //     if (isNaN(cashReceived) || cashReceived <= 0) {
// // //         return showToast('Please enter a valid amount', 'error');
// // //     }
// // //     if (cashReceived >= total) {
// // //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// // //     }

// // //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// // //     setBtnLoading(dpBtn, true);

// // //     try {
// // //         await saveDownpayment(cashReceived, 'Cash', '');
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(dpBtn, false);
// // //     }
// // // };

// // // window.openDigitalDPModal = function() {
// // //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// // //     document.getElementById('digi-dp-amount').value = '';
// // //     const mainRef = document.getElementById('referenceNumber');
// // //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// // //     document.getElementById('digi-dp-amount').focus();
// // // };
// // // window.closeDigitalDPModal = function() {
// // //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // // };
// // // window.confirmDigitalDP = async function() {
// // //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// // //     const refVal = document.getElementById('digi-dp-ref').value;
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// // //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// // //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// // //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// // //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// // //     setBtnLoading(confirmBtn, true);

// // //     try {
// // //         window.closeDigitalDPModal();
// // //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// // //     } catch (e) {
// // //         console.error(e);
// // //     } finally {
// // //         setBtnLoading(confirmBtn, false);
// // //     }
// // // };

// // // async function saveDownpayment(amountPaid, method, reference) {
// // //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// // //     const balance = total - amountPaid;
// // //     const orderId = document.getElementById('orderNumber').innerText; 

// // //     const orderData = {
// // //         orderId: orderId,
// // //         date: new Date().toISOString(),
// // //         items: cart,
// // //         total: total,
// // //         cashReceived: amountPaid,
// // //         change: 0, 
// // //         balance: balance,
// // //         method: method,
// // //         reference: reference,
// // //         status: 'Partial',
// // //         cashier: localStorage.getItem('userName') || 'Staff',
// // //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// // //         contact: document.getElementById('customerPhone')?.value || '-'
// // //     };

// // //     try {
// // //         await addDoc(collection(db, "transactions"), orderData); 
// // //         await sendToKitchen(orderId, cart);

// // //         for (let item of cart) {
// // //             const productRef = doc(db, "products", item.id);
// // //             const prodSnap = products.find(p => p.id === item.id); 
// // //             if(prodSnap) {
// // //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// // //                 const newQty = currentStock - item.qty;
// // //                 await updateDoc(productRef, { quantity: newQty });
// // //             }
// // //         }

// // //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// // //         document.getElementById('paymentModal').style.display = 'none';
// // //         document.getElementById('receiptModal').style.display = 'flex';
        
// // //         cart = [];
// // //         renderCart();
// // //         generateOrderID();
// // //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// // //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// // //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// // //         showToast('Downpayment recorded!', 'success');
// // //     } catch (error) {
// // //         console.error("Error saving order: ", error);
// // //         showToast('Error saving order', 'error');
// // //         throw error; 
// // //     }
// // // }

// // // // =========================================================
// // // // RECEIPT UTILS
// // // // =========================================================

// // // function showReceipt(data) {
// // //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// // //     document.getElementById('receiptModal').style.display = 'flex';
// // // }

// // // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// // //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// // //     document.getElementById('rec-orderId').innerText = data.orderId;
// // //     document.getElementById('rec-cashier').innerText = data.cashier;
// // //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// // //     const itemsDiv = document.getElementById('rec-items');
// // //     itemsDiv.innerHTML = '';
// // //     data.items.forEach(item => {
// // //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// // //     });

// // //     document.getElementById('rec-total').innerText = total.toFixed(2);
// // //     document.getElementById('rec-method').innerText = method;

// // //     const rowBalance = document.getElementById('row-balance');
// // //     if(balance > 0) {
// // //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// // //         document.getElementById('row-change').style.display = 'none';
// // //     } else {
// // //         if(rowBalance) rowBalance.style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'flex';
// // //         const change = paid - total;
// // //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// // //     }

// // //     if(method === 'Cash') {
// // //         document.getElementById('row-cash-paid').style.display = 'flex';
// // //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// // //         document.getElementById('row-ref').style.display = 'none';
// // //     } else {
// // //         document.getElementById('row-cash-paid').style.display = 'none';
// // //         document.getElementById('row-change').style.display = 'none';
// // //         document.getElementById('row-ref').style.display = 'flex';
// // //         document.getElementById('rec-ref').innerText = refNum;
// // //     }
// // // }

// // // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // // window.printReceipt = function() { window.print(); };

// // // function generateOrderID() {
// // //     const randomId = Math.floor(100000 + Math.random() * 900000);
// // //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // // }

// // // function showToast(msg, type) {
// // //     const container = document.getElementById('toast-container');
// // //     const toast = document.createElement('div');
// // //     toast.className = `toast ${type}`;
// // //     toast.innerHTML = type === 'success' 
// // //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// // //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// // //     container.appendChild(toast);
// // //     setTimeout(() => toast.remove(), 3000);
// // // }

// // // function setBtnLoading(btn, isLoading) {
// // //     if(!btn) return;
// // //     if(isLoading) {
// // //         btn.dataset.originalText = btn.innerHTML;
// // //         btn.disabled = true;
// // //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// // //     } else {
// // //         btn.disabled = false;
// // //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// // //     }
// // // }

// // // // =========================================================
// // // // SEND TO KITCHEN
// // // // =========================================================

// // // async function sendToKitchen(orderId, cartItems) {
// // //     if (!cartItems || cartItems.length === 0) return;
// // //     try {
// // //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// // //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// // //             table: orderId,
// // //             items: itemsString,
// // //             timestamp: Date.now()
// // //         });
// // //         console.log("✅ Sent to Kitchen!");
// // //     } catch (e) {
// // //         console.error("❌ Error sending to kitchen:", e);
// // //     }
// // // }









// // //NEW CODE WITH CYD + NFC INTEGRATION (CORRECTED)
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // import { 
// //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
// //     rtdb, ref, set, onValue, remove
// // } from './firebase.js';

// // let products = [];
// // let cart = [];
// // let currentPaymentMethod = 'Cash';
// // let nfcListener = null;

// // document.addEventListener('DOMContentLoaded', () => {
// //     initTheme();
// //     generateOrderID();
    
// //     // --- CHECK LOGIN STATUS ---
// //     const userRole = localStorage.getItem('userRole'); 
// //     const logoutBtn = document.getElementById('logout-sidebar-item');
// //     if (userRole && userRole.toLowerCase() === 'cashier') {
// //         if(logoutBtn) logoutBtn.style.display = 'block';
// //     } else {
// //         if(logoutBtn) logoutBtn.style.display = 'none';
// //     }

// //     // --- DISPLAY DATE ---
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// //     // --- LOAD CATEGORIES ---
// //     onSnapshot(collection(db, "categories"), (snapshot) => {
// //         const tabs = document.getElementById('categoryTabs');
// //         if(tabs) {
// //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// //             snapshot.forEach(doc => {
// //                 const data = doc.data();
// //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// //             });
// //         }
// //     });

// //     // --- LOAD PRODUCTS ---
// //     onSnapshot(collection(db, "products"), (snapshot) => {
// //         products = [];
// //         snapshot.forEach(doc => {
// //             const data = doc.data();
// //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// //             products.push({ 
// //                 id: doc.id, 
// //                 ...data,
// //                 quantity: isNaN(stockVal) ? 0 : stockVal
// //             });
// //         });
// //         renderProducts(products);
// //     });

// //     // --- SEARCH BAR ---
// //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// //         const term = e.target.value.toLowerCase();
// //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// //         renderProducts(filtered);
// //     });

// //     // --- PAYMENT INPUT LISTENER ---
// //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // });

// // // =========================================================
// // // UI FUNCTIONS
// // // =========================================================

// // function initTheme() {
// //     if (localStorage.getItem('theme') === 'dark') {
// //         document.body.classList.add('dark-mode');
// //     }
// // }

// // window.openLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'flex';
// // };
// // window.closeLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'none';
// // };
// // window.confirmLogout = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.removeItem('userRole');
// //         localStorage.removeItem('userName');
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //     }
// // };

// // function renderProducts(list) {
// //     const grid = document.getElementById('productsGrid');
// //     if(!grid) return;
// //     grid.innerHTML = '';
    
// //     if (list.length === 0) {
// //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// //         return;
// //     }

// //     list.forEach(p => {
// //         const qty = Number(p.quantity || p.stock || 0);
// //         const isOOS = qty <= 0;
        
// //         const card = document.createElement('div');
// //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// //         card.onclick = () => !isOOS && addToCart(p);
        
// //         const displayPrice = parseFloat(p.price || p.cost || 0);
// //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// //         const imageHtml = imgUrl 
// //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// //         card.innerHTML = `
// //             ${imageHtml}
// //             <div class="product-info">
// //                 <div>
// //                     <h4>${p.name}</h4>
// //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// //                 </div>
// //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// //             </div>
// //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// //         `;
// //         grid.appendChild(card);
// //     });
// // }

// // window.filterProducts = function(catId, btn) {
// //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// //     if (btn) btn.classList.add('active');
// //     const filtered = (catId === 'all') 
// //         ? products 
// //         : products.filter(p => 
// //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// //             (p.categoryId || '') === catId
// //         );
// //     renderProducts(filtered);
// // };

// // // =========================================================
// // // CART LOGIC
// // // =========================================================

// // function addToCart(product) {
// //     const existing = cart.find(i => i.id === product.id);
// //     const currentQty = existing ? existing.qty : 0;
// //     const productStock = Number(product.quantity || product.stock || 0);
    
// //     if (currentQty + 1 > productStock) {
// //         showToast("Not enough stock!", "error");
// //         return;
// //     }
// //     const priceToUse = parseFloat(product.price || product.cost || 0);

// //     if (existing) {
// //         existing.qty++;
// //     } else {
// //         cart.push({
// //             id: product.id,
// //             name: product.name,
// //             price: priceToUse,
// //             qty: 1
// //         });
// //     }
// //     renderCart();
// // }

// // function renderCart() {
// //     const container = document.getElementById('cartItems');
// //     if(!container) return;
// //     container.innerHTML = '';
// //     if (cart.length === 0) {
// //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// //         updateTotals(0);
// //         return;
// //     }
// //     let total = 0;
// //     cart.forEach((item, index) => {
// //         const itemTotal = item.price * item.qty;
// //         total += itemTotal;
// //         const div = document.createElement('div');
// //         div.className = 'cart-item';
// //         div.innerHTML = `
// //             <div class="item-info">
// //                 <h4>${item.name}</h4>
// //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// //             </div>
// //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// //             <div class="item-actions">
// //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// //             </div>
// //         `;
// //         container.appendChild(div);
// //     });
// //     updateTotals(total);
// // }

// // window.updateQty = function(index, change) {
// //     const item = cart[index];
// //     const product = products.find(p => p.id === item.id);
// //     if (change === 1) {
// //         const productStock = Number(product.quantity || product.stock || 0);
// //         if (item.qty + 1 > productStock) {
// //             showToast("Max stock reached", "error");
// //             return;
// //         }
// //         item.qty++;
// //     } else {
// //         if (item.qty > 1) item.qty--;
// //         else cart.splice(index, 1);
// //     }
// //     renderCart();
// // };

// // window.removeItem = function(index) {
// //     cart.splice(index, 1);
// //     renderCart();
// // };

// // window.clearCart = function() {
// //     if(cart.length === 0) return;
// //     document.getElementById('clearOrderModal').style.display = 'flex';
// // };
// // window.closeClearModal = function() {
// //     document.getElementById('clearOrderModal').style.display = 'none';
// // };
// // window.confirmClearOrder = function() {
// //     cart = [];
// //     renderCart();
// //     window.closeClearModal();
// //     showToast("Order cleared", "success");
// // };

// // function updateTotals(subtotal) {
// //     const total = subtotal;
// //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// //     // Cart footer
// //     const subtotalEl = document.getElementById('subtotalDisplay');
// //     const vatEl = document.getElementById('vatDisplay');
// //     const totalEl = document.getElementById('totalDisplay');
// //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// //     if(vatEl) vatEl.innerText = fmt(0);
// //     if(totalEl) totalEl.innerText = fmt(total);

// //     // Payment modal total
// //     const modalTotal = document.getElementById('modalTotalAmount');
// //     if(modalTotal) {
// //         modalTotal.dataset.value = total;
// //         modalTotal.innerText = fmt(total);
// //     }
// // }

// // // =========================================================
// // // PAYMENT MODAL
// // // =========================================================

// // window.openPaymentModal = function() {
// //     if (cart.length === 0) {
// //         showToast("Cart is empty!", "error");
// //         return;
// //     }
// //     document.getElementById('paymentModal').style.display = 'flex';
// //     document.getElementById('amountPaid').value = '';
// //     document.getElementById('changeAmount').innerText = '₱0.00';
// //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // };

// // // Override closePaymentModal to stop NFC listening
// // const originalClosePaymentModal = window.closePaymentModal;
// // window.closePaymentModal = function() {
// //     stopNFCListening();
// //     if(originalClosePaymentModal) {
// //         originalClosePaymentModal();
// //     } else {
// //         document.getElementById('paymentModal').style.display = 'none';
// //     }
// // };

// // // =========================================================
// // // PAYMENT METHOD SELECTION + NFC INTEGRATION
// // // =========================================================

// // window.setPaymentMethod = function(method, btn) {
// //     currentPaymentMethod = method;
// //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// //     btn.classList.add('active');
    
// //     const cashDiv = document.getElementById('cash-payment-section');
// //     const digitalDiv = document.getElementById('digital-payment-section');
// //     const nfcDiv = document.getElementById('nfc-payment-section');
// //     const qrDiv = document.getElementById('qr-code-section');
    
// //     // Hide all sections first
// //     if(cashDiv) cashDiv.style.display = 'none';
// //     if(digitalDiv) digitalDiv.style.display = 'none';
// //     if(nfcDiv) nfcDiv.style.display = 'none';
// //     if(qrDiv) qrDiv.style.display = 'none';
    
// //     // Show relevant section
// //     if (method === 'Cash') {
// //         if(cashDiv) cashDiv.style.display = 'block';
// //     } else if (method === 'NFC') {
// //         if(nfcDiv) nfcDiv.style.display = 'block';
        
// //         // Update amount display
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
// //         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
// //         startNFCListening();
// //     } else {
// //         // GCash or Bank
// //         if(digitalDiv) digitalDiv.style.display = 'block';
// //         if(qrDiv) qrDiv.style.display = 'flex';
// //     }
// // };

// // function startNFCListening() {
// //     const nfcStatus = document.getElementById('nfcStatus');
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
// //     if(nfcStatus) {
// //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for Customer tap...';
// //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
// //     }
    
// //     // Write pending payment to RTDB for ESP32-C3 to see
// //     set(ref(rtdb, 'nfc_payment/pending'), {
// //         amount: total,
// //         timestamp: Date.now(),
// //         status: 'waiting'
// //     }).catch(err => console.error('RTDB write error:', err));
    
// //     // Listen for ESP32-C3 confirmation
// //     const nfcRef = ref(rtdb, 'nfc_payment/status');
// //     nfcListener = onValue(nfcRef, (snapshot) => {
// //         const data = snapshot.val();
        
// //         if (!data) return;
        
// //         if (data.status === 'processing') {
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// //             }
// //         } 
// //         else if (data.status === 'success') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
// //                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
// //             }
            
// //             // Auto-complete after 1 second
// //             setTimeout(() => {
// //                 processNFCPayment(data);
// //             }, 1000);
// //         }
// //         else if (data.status === 'failed') {
// //             stopNFCListening();
// //             if(nfcStatus) {
// //                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
// //                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
// //             }
// //             showToast('NFC Payment Failed', 'error');
// //         }
// //     });
// // }

// // function stopNFCListening() {
// //     if(nfcListener) {
// //         nfcListener(); // Unsubscribe from RTDB listener
// //         nfcListener = null;
// //     }
    
// //     // Clear RTDB nodes
// //     remove(ref(rtdb, 'nfc_payment/pending')).catch(err => console.log('Cleanup pending:', err));
// //     remove(ref(rtdb, 'nfc_payment/status')).catch(err => console.log('Cleanup status:', err));
// // }

// // async function processNFCPayment(nfcData) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// //     const orderId = document.getElementById('orderNumber').innerText;
    
// //     const orderData = {
// //         date: new Date().toISOString(),
// //         orderId: orderId,
// //         customer: custName,
// //         contact: custPhone,
// //         items: cart,
// //         total: total,
// //         method: 'NFC',
// //         cashReceived: total,
// //         change: 0,
// //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         status: 'completed'
// //     };
    
// //     try {
// //         // 1. Save transaction to Firestore
// //         await addDoc(collection(db, "transactions"), orderData);
        
// //         // 2. Send to kitchen queue (RTDB) - CYD will display this
// //         await sendToKitchen(orderId, cart);
        
// //         // 3. Reduce stock
// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id);
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || 0);
// //                 await updateDoc(productRef, { 
// //                     quantity: Math.max(0, currentStock - item.qty) 
// //                 });
// //             }
// //         }
        
// //         // 4. Show receipt and cleanup
// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
        
// //         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
// //     } catch(err) {
// //         console.error("NFC Payment Error:", err);
// //         showToast("❌ Transaction Failed: " + err.message, "error");
// //     }
// // }

// // // =========================================================
// // // CASH PAYMENT HELPERS
// // // =========================================================

// // window.setCash = function(amount) {
// //     const input = document.getElementById('amountPaid');
// //     const currentVal = parseFloat(input.value) || 0;
// //     input.value = currentVal + amount;
// //     calculateChange();
// // };

// // function calculateChange() {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const input = document.getElementById('amountPaid');
// //     const paid = parseFloat(input.value || 0);
// //     const change = paid - total;
// //     const changeEl = document.getElementById('changeAmount');
    
// //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // }

// // // =========================================================
// // // PROCESS FULL PAYMENT
// // // =========================================================

// // window.processPayment = async function() {
// //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// //     setBtnLoading(payBtn, true);

// //     try {
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// //         const orderId = document.getElementById('orderNumber').innerText; 
        
// //         let paid = 0;
// //         let refNum = '-';

// //         if (currentPaymentMethod === 'Cash') {
// //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// //             if (paid < total) {
// //                 showToast("Insufficient Cash", "error");
// //                 throw new Error("Insufficient Cash"); 
// //             }
// //         } else {
// //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// //             refNum = refInput ? refInput.value : '';
// //             paid = total; 
// //             if (!refNum) {
// //                 showToast("Please enter Reference Number", "error");
// //                 throw new Error("Missing Reference"); 
// //             }
// //         }

// //         const orderData = {
// //             date: new Date().toISOString(),
// //             orderId: orderId,
// //             customer: custName,
// //             contact: custPhone,
// //             items: cart,
// //             total: total,
// //             method: currentPaymentMethod,
// //             cashReceived: paid,
// //             change: paid - total,
// //             reference: refNum,
// //             cashier: localStorage.getItem('userName') || 'Staff'
// //         };

// //         await addDoc(collection(db, "transactions"), orderData);
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// //         showToast("Payment Successful!", "success");

// //     } catch (err) {
// //         console.error(err);
// //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// //             showToast("Transaction Failed", "error");
// //         }
// //     } finally {
// //         setBtnLoading(payBtn, false);
// //     }
// // };

// // // =========================================================
// // // PROCESS DOWNPAYMENT
// // // =========================================================

// // window.processDownpayment = async function() {
// //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// //     if (currentPaymentMethod !== 'Cash') {
// //         window.openDigitalDPModal();
// //         return;
// //     }

// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const cashInput = document.getElementById('amountPaid');
// //     let cashReceived = 0;
    
// //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// //     if (isNaN(cashReceived) || cashReceived <= 0) {
// //         return showToast('Please enter a valid amount', 'error');
// //     }
// //     if (cashReceived >= total) {
// //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// //     }

// //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// //     setBtnLoading(dpBtn, true);

// //     try {
// //         await saveDownpayment(cashReceived, 'Cash', '');
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(dpBtn, false);
// //     }
// // };

// // window.openDigitalDPModal = function() {
// //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// //     document.getElementById('digi-dp-amount').value = '';
// //     const mainRef = document.getElementById('referenceNumber');
// //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// //     document.getElementById('digi-dp-amount').focus();
// // };
// // window.closeDigitalDPModal = function() {
// //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // };
// // window.confirmDigitalDP = async function() {
// //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// //     const refVal = document.getElementById('digi-dp-ref').value;
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// //     setBtnLoading(confirmBtn, true);

// //     try {
// //         window.closeDigitalDPModal();
// //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(confirmBtn, false);
// //     }
// // };

// // async function saveDownpayment(amountPaid, method, reference) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const balance = total - amountPaid;
// //     const orderId = document.getElementById('orderNumber').innerText; 

// //     const orderData = {
// //         orderId: orderId,
// //         date: new Date().toISOString(),
// //         items: cart,
// //         total: total,
// //         cashReceived: amountPaid,
// //         change: 0, 
// //         balance: balance,
// //         method: method,
// //         reference: reference,
// //         status: 'Partial',
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// //         contact: document.getElementById('customerPhone')?.value || '-'
// //     };

// //     try {
// //         await addDoc(collection(db, "transactions"), orderData); 
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// //         document.getElementById('paymentModal').style.display = 'none';
// //         document.getElementById('receiptModal').style.display = 'flex';
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// //         showToast('Downpayment recorded!', 'success');
// //     } catch (error) {
// //         console.error("Error saving order: ", error);
// //         showToast('Error saving order', 'error');
// //         throw error; 
// //     }
// // }

// // // =========================================================
// // // RECEIPT UTILS
// // // =========================================================

// // function showReceipt(data) {
// //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// //     document.getElementById('receiptModal').style.display = 'flex';
// // }

// // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// //     document.getElementById('rec-orderId').innerText = data.orderId;
// //     document.getElementById('rec-cashier').innerText = data.cashier;
// //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// //     const itemsDiv = document.getElementById('rec-items');
// //     itemsDiv.innerHTML = '';
// //     data.items.forEach(item => {
// //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// //     });

// //     document.getElementById('rec-total').innerText = total.toFixed(2);
// //     document.getElementById('rec-method').innerText = method;

// //     const rowBalance = document.getElementById('row-balance');
// //     if(balance > 0) {
// //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// //         document.getElementById('row-change').style.display = 'none';
// //     } else {
// //         if(rowBalance) rowBalance.style.display = 'none';
// //         document.getElementById('row-change').style.display = 'flex';
// //         const change = paid - total;
// //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// //     }

// //     if(method === 'Cash') {
// //         document.getElementById('row-cash-paid').style.display = 'flex';
// //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// //         document.getElementById('row-ref').style.display = 'none';
// //     } else {
// //         document.getElementById('row-cash-paid').style.display = 'none';
// //         document.getElementById('row-change').style.display = 'none';
// //         document.getElementById('row-ref').style.display = 'flex';
// //         document.getElementById('rec-ref').innerText = refNum;
// //     }
// // }

// // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // window.printReceipt = function() { window.print(); };

// // function generateOrderID() {
// //     const randomId = Math.floor(100000 + Math.random() * 900000);
// //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // }

// // function showToast(msg, type) {
// //     const container = document.getElementById('toast-container');
// //     const toast = document.createElement('div');
// //     toast.className = `toast ${type}`;
// //     toast.innerHTML = type === 'success' 
// //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// //     container.appendChild(toast);
// //     setTimeout(() => toast.remove(), 3000);
// // }

// // function setBtnLoading(btn, isLoading) {
// //     if(!btn) return;
// //     if(isLoading) {
// //         btn.dataset.originalText = btn.innerHTML;
// //         btn.disabled = true;
// //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// //     } else {
// //         btn.disabled = false;
// //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// //     }
// // }

// // // =========================================================
// // // SEND TO KITCHEN
// // // =========================================================

// // async function sendToKitchen(orderId, cartItems) {
// //     if (!cartItems || cartItems.length === 0) return;
// //     try {
// //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// //             table: orderId,
// //             items: itemsString,
// //             timestamp: Date.now()
// //         });
// //         console.log("✅ Sent to Kitchen!");
// //     } catch (e) {
// //         console.error("❌ Error sending to kitchen:", e);
// //     }
// // }





// //NEW CODE WITH CYD + NFC INTEGRATION (FIXED - NO MORE STUCK "PAYMENT SUCCESSFUL")
// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { 
//     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
//     rtdb, ref, set, onValue, remove
// } from './firebase.js';

// let products = [];
// let cart = [];
// let currentPaymentMethod = 'Cash';
// let nfcListener = null;

// document.addEventListener('DOMContentLoaded', () => {
//     initTheme();
//     generateOrderID();
    
//     const userRole = localStorage.getItem('userRole'); 
//     const logoutBtn = document.getElementById('logout-sidebar-item');
//     if (userRole && userRole.toLowerCase() === 'cashier') {
//         if(logoutBtn) logoutBtn.style.display = 'block';
//     } else {
//         if(logoutBtn) logoutBtn.style.display = 'none';
//     }

//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     onSnapshot(collection(db, "categories"), (snapshot) => {
//         const tabs = document.getElementById('categoryTabs');
//         if(tabs) {
//             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
//             snapshot.forEach(doc => {
//                 const data = doc.data();
//                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
//             });
//         }
//     });

//     onSnapshot(collection(db, "products"), (snapshot) => {
//         products = [];
//         snapshot.forEach(doc => {
//             const data = doc.data();
//             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
//             products.push({ 
//                 id: doc.id, 
//                 ...data,
//                 quantity: isNaN(stockVal) ? 0 : stockVal
//             });
//         });
//         renderProducts(products);
//     });

//     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
//         const term = e.target.value.toLowerCase();
//         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
//         renderProducts(filtered);
//     });

//     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// });

// function initTheme() {
//     if (localStorage.getItem('theme') === 'dark') {
//         document.body.classList.add('dark-mode');
//     }
// }

// window.openLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'flex';
// };
// window.closeLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'none';
// };
// window.confirmLogout = async function() {
//     try {
//         await signOut(auth);
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('userName');
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error("Logout Error:", error);
//     }
// };

// function renderProducts(list) {
//     const grid = document.getElementById('productsGrid');
//     if(!grid) return;
//     grid.innerHTML = '';
    
//     if (list.length === 0) {
//         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
//         return;
//     }

//     list.forEach(p => {
//         const qty = Number(p.quantity || p.stock || 0);
//         const isOOS = qty <= 0;
//         const card = document.createElement('div');
//         card.className = `product-card ${isOOS ? 'oos' : ''}`;
//         card.onclick = () => !isOOS && addToCart(p);
//         const displayPrice = parseFloat(p.price || p.cost || 0);
//         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
//         const imageHtml = imgUrl 
//             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
//             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

//         card.innerHTML = `
//             ${imageHtml}
//             <div class="product-info">
//                 <div>
//                     <h4>${p.name}</h4>
//                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
//                 </div>
//                 <span class="price">₱${displayPrice.toLocaleString()}</span>
//             </div>
//             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
//         `;
//         grid.appendChild(card);
//     });
// }

// window.filterProducts = function(catId, btn) {
//     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
//     if (btn) btn.classList.add('active');
//     const filtered = (catId === 'all') 
//         ? products 
//         : products.filter(p => 
//             (p.category || '').toLowerCase() === catId.toLowerCase() ||
//             (p.categoryId || '') === catId
//         );
//     renderProducts(filtered);
// };

// function addToCart(product) {
//     const existing = cart.find(i => i.id === product.id);
//     const currentQty = existing ? existing.qty : 0;
//     const productStock = Number(product.quantity || product.stock || 0);
    
//     if (currentQty + 1 > productStock) {
//         showToast("Not enough stock!", "error");
//         return;
//     }
//     const priceToUse = parseFloat(product.price || product.cost || 0);

//     if (existing) {
//         existing.qty++;
//     } else {
//         cart.push({
//             id: product.id,
//             name: product.name,
//             price: priceToUse,
//             qty: 1
//         });
//     }
//     renderCart();
// }

// function renderCart() {
//     const container = document.getElementById('cartItems');
//     if(!container) return;
//     container.innerHTML = '';
//     if (cart.length === 0) {
//         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
//         updateTotals(0);
//         return;
//     }
//     let total = 0;
//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.qty;
//         total += itemTotal;
//         const div = document.createElement('div');
//         div.className = 'cart-item';
//         div.innerHTML = `
//             <div class="item-info">
//                 <h4>${item.name}</h4>
//                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
//             </div>
//             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
//             <div class="item-actions">
//                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
//                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
//                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
//                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
//             </div>
//         `;
//         container.appendChild(div);
//     });
//     updateTotals(total);
// }

// window.updateQty = function(index, change) {
//     const item = cart[index];
//     const product = products.find(p => p.id === item.id);
//     if (change === 1) {
//         const productStock = Number(product.quantity || product.stock || 0);
//         if (item.qty + 1 > productStock) {
//             showToast("Max stock reached", "error");
//             return;
//         }
//         item.qty++;
//     } else {
//         if (item.qty > 1) item.qty--;
//         else cart.splice(index, 1);
//     }
//     renderCart();
// };

// window.removeItem = function(index) {
//     cart.splice(index, 1);
//     renderCart();
// };

// window.clearCart = function() {
//     if(cart.length === 0) return;
//     document.getElementById('clearOrderModal').style.display = 'flex';
// };
// window.closeClearModal = function() {
//     document.getElementById('clearOrderModal').style.display = 'none';
// };
// window.confirmClearOrder = function() {
//     cart = [];
//     renderCart();
//     window.closeClearModal();
//     showToast("Order cleared", "success");
// };

// function updateTotals(subtotal) {
//     const total = subtotal;
//     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

//     const subtotalEl = document.getElementById('subtotalDisplay');
//     const vatEl = document.getElementById('vatDisplay');
//     const totalEl = document.getElementById('totalDisplay');
//     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
//     if(vatEl) vatEl.innerText = fmt(0);
//     if(totalEl) totalEl.innerText = fmt(total);

//     const modalTotal = document.getElementById('modalTotalAmount');
//     if(modalTotal) {
//         modalTotal.dataset.value = total;
//         modalTotal.innerText = fmt(total);
//     }
// }

// window.openPaymentModal = function() {
//     if (cart.length === 0) {
//         showToast("Cart is empty!", "error");
//         return;
//     }
//     document.getElementById('paymentModal').style.display = 'flex';
//     document.getElementById('amountPaid').value = '';
//     document.getElementById('changeAmount').innerText = '₱0.00';
//     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
//     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
//     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// };

// window.closePaymentModal = function() {
//     stopNFCListening(); // CRITICAL: Clean up NFC state
//     document.getElementById('paymentModal').style.display = 'none';
// };

// // =========================================================
// // NFC PAYMENT INTEGRATION (FIXED)
// // =========================================================

// window.setPaymentMethod = function(method, btn) {
//     currentPaymentMethod = method;
//     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
    
//     const cashDiv = document.getElementById('cash-payment-section');
//     const digitalDiv = document.getElementById('digital-payment-section');
//     const nfcDiv = document.getElementById('nfc-payment-section');
//     const qrDiv = document.getElementById('qr-code-section');
    
//     // Stop NFC if switching away from it
//     if (method !== 'NFC') {
//         stopNFCListening();
//     }
    
//     if(cashDiv) cashDiv.style.display = 'none';
//     if(digitalDiv) digitalDiv.style.display = 'none';
//     if(nfcDiv) nfcDiv.style.display = 'none';
//     if(qrDiv) qrDiv.style.display = 'none';
    
//     if (method === 'Cash') {
//         if(cashDiv) cashDiv.style.display = 'block';
//     } else if (method === 'NFC') {
//         if(nfcDiv) nfcDiv.style.display = 'block';
        
//         // Reset NFC UI completely
//         const nfcStatus = document.getElementById('nfcStatus');
//         if(nfcStatus) {
//             nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
//             nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//             nfcStatus.style.display = 'block';
//         }
        
//         // Update amount display
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
//         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
//         // Start fresh NFC session
//         startNFCListening();
//     } else {
//         if(digitalDiv) digitalDiv.style.display = 'block';
//         if(qrDiv) qrDiv.style.display = 'flex';
//     }
// };

// function startNFCListening() {
//     const nfcStatus = document.getElementById('nfcStatus');
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
//     // CRITICAL: Stop any existing listener first
//     stopNFCListening();
    
//     if(nfcStatus) {
//         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
//         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//         nfcStatus.style.display = 'block';
//     }
    
//     // Clear old RTDB data first, then write new
//     Promise.all([
//         remove(ref(rtdb, 'nfc_payment/pending')),
//         remove(ref(rtdb, 'nfc_payment/status'))
//     ]).then(() => {
//         // Write fresh pending payment
//         return set(ref(rtdb, 'nfc_payment/pending'), {
//             amount: total,
//             timestamp: Date.now(),
//             status: 'waiting'
//         });
//     }).catch(err => console.error('RTDB write error:', err));
    
//     // Listen for ESP32-C3 confirmation
//     const nfcRef = ref(rtdb, 'nfc_payment/status');
//     nfcListener = onValue(nfcRef, (snapshot) => {
//         const data = snapshot.val();
        
//         if (!data) return;
        
//         if (data.status === 'processing') {
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
//             }
//         } 
//         else if (data.status === 'success') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
//                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
//             }
            
//             setTimeout(() => {
//                 processNFCPayment(data);
//             }, 1000);
//         }
//         else if (data.status === 'failed') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
//                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
//             }
//             showToast('NFC Payment Failed', 'error');
//         }
//     });
// }

// function stopNFCListening() {
//     if(nfcListener) {
//         nfcListener(); // Unsubscribe
//         nfcListener = null;
//     }
    
//     // Clear RTDB nodes
//     Promise.all([
//         remove(ref(rtdb, 'nfc_payment/pending')),
//         remove(ref(rtdb, 'nfc_payment/status'))
//     ]).catch(err => console.log('Cleanup:', err));
    
//     // Reset UI
//     const nfcStatus = document.getElementById('nfcStatus');
//     if(nfcStatus) {
//         nfcStatus.style.display = 'none';
//         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//     }
// }

// async function processNFCPayment(nfcData) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const custName = document.getElementById('customerName')?.value || 'Walk-in';
//     const custPhone = document.getElementById('customerPhone')?.value || '-';
//     const orderId = document.getElementById('orderNumber').innerText;
    
//     const orderData = {
//         date: new Date().toISOString(),
//         orderId: orderId,
//         customer: custName,
//         contact: custPhone,
//         items: cart,
//         total: total,
//         method: 'NFC',
//         cashReceived: total,
//         change: 0,
//         reference: nfcData.transactionId || 'NFC-' + Date.now(),
//         cashier: localStorage.getItem('userName') || 'Staff',
//         status: 'completed'
//     };
    
//     try {
//         await addDoc(collection(db, "transactions"), orderData);
//         await sendToKitchen(orderId, cart);
        
//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id);
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || 0);
//                 await updateDoc(productRef, { 
//                     quantity: Math.max(0, currentStock - item.qty) 
//                 });
//             }
//         }
        
//         // CRITICAL: Clean up NFC state BEFORE showing receipt
//         stopNFCListening();
        
//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
        
//         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
//     } catch(err) {
//         console.error("NFC Payment Error:", err);
//         stopNFCListening();
//         showToast("❌ Transaction Failed: " + err.message, "error");
//     }
// }

// window.setCash = function(amount) {
//     const input = document.getElementById('amountPaid');
//     const currentVal = parseFloat(input.value) || 0;
//     input.value = currentVal + amount;
//     calculateChange();
// };

// function calculateChange() {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const input = document.getElementById('amountPaid');
//     const paid = parseFloat(input.value || 0);
//     const change = paid - total;
//     const changeEl = document.getElementById('changeAmount');
    
//     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
//     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// }

// window.processPayment = async function() {
//     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
//     setBtnLoading(payBtn, true);

//     try {
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const custName = document.getElementById('customerName')?.value || 'Walk-in';
//         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
//         const orderId = document.getElementById('orderNumber').innerText; 
        
//         let paid = 0;
//         let refNum = '-';

//         if (currentPaymentMethod === 'Cash') {
//             paid = parseFloat(document.getElementById('amountPaid').value || 0);
//             if (paid < total) {
//                 showToast("Insufficient Cash", "error");
//                 throw new Error("Insufficient Cash"); 
//             }
//         } else {
//             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
//             refNum = refInput ? refInput.value : '';
//             paid = total; 
//             if (!refNum) {
//                 showToast("Please enter Reference Number", "error");
//                 throw new Error("Missing Reference"); 
//             }
//         }

//         const orderData = {
//             date: new Date().toISOString(),
//             orderId: orderId,
//             customer: custName,
//             contact: custPhone,
//             items: cart,
//             total: total,
//             method: currentPaymentMethod,
//             cashReceived: paid,
//             change: paid - total,
//             reference: refNum,
//             cashier: localStorage.getItem('userName') || 'Staff'
//         };

//         await addDoc(collection(db, "transactions"), orderData);
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
//         showToast("Payment Successful!", "success");

//     } catch (err) {
//         console.error(err);
//         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
//             showToast("Transaction Failed", "error");
//         }
//     } finally {
//         setBtnLoading(payBtn, false);
//     }
// };

// window.processDownpayment = async function() {
//     if (cart.length === 0) return showToast('Cart is empty', 'error');

//     if (currentPaymentMethod !== 'Cash') {
//         window.openDigitalDPModal();
//         return;
//     }

//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const cashInput = document.getElementById('amountPaid');
//     let cashReceived = 0;
    
//     if (cashInput) cashReceived = parseFloat(cashInput.value);

//     if (isNaN(cashReceived) || cashReceived <= 0) {
//         return showToast('Please enter a valid amount', 'error');
//     }
//     if (cashReceived >= total) {
//         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
//     }

//     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
//     setBtnLoading(dpBtn, true);

//     try {
//         await saveDownpayment(cashReceived, 'Cash', '');
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(dpBtn, false);
//     }
// };

// window.openDigitalDPModal = function() {
//     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
//     document.getElementById('digi-dp-amount').value = '';
//     const mainRef = document.getElementById('referenceNumber');
//     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
//     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
//     document.getElementById('digi-dp-amount').focus();
// };
// window.closeDigitalDPModal = function() {
//     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// };
// window.confirmDigitalDP = async function() {
//     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
//     const refVal = document.getElementById('digi-dp-ref').value;
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

//     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
//     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
//     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

//     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
//     setBtnLoading(confirmBtn, true);

//     try {
//         window.closeDigitalDPModal();
//         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(confirmBtn, false);
//     }
// };

// async function saveDownpayment(amountPaid, method, reference) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const balance = total - amountPaid;
//     const orderId = document.getElementById('orderNumber').innerText; 

//     const orderData = {
//         orderId: orderId,
//         date: new Date().toISOString(),
//         items: cart,
//         total: total,
//         cashReceived: amountPaid,
//         change: 0, 
//         balance: balance,
//         method: method,
//         reference: reference,
//         status: 'Partial',
//         cashier: localStorage.getItem('userName') || 'Staff',
//         customer: document.getElementById('customerName')?.value || 'Walk-in',
//         contact: document.getElementById('customerPhone')?.value || '-'
//     };

//     try {
//         await addDoc(collection(db, "transactions"), orderData); 
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
//         document.getElementById('paymentModal').style.display = 'none';
//         document.getElementById('receiptModal').style.display = 'flex';
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

//         showToast('Downpayment recorded!', 'success');
//     } catch (error) {
//         console.error("Error saving order: ", error);
//         showToast('Error saving order', 'error');
//         throw error; 
//     }
// }

// function showReceipt(data) {
//     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
//     document.getElementById('receiptModal').style.display = 'flex';
// }

// function prepareReceiptUI(data, total, paid, balance, method, refNum) {
//     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
//     document.getElementById('rec-orderId').innerText = data.orderId;
//     document.getElementById('rec-cashier').innerText = data.cashier;
//     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

//     const itemsDiv = document.getElementById('rec-items');
//     itemsDiv.innerHTML = '';
//     data.items.forEach(item => {
//         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
//     });

//     document.getElementById('rec-total').innerText = total.toFixed(2);
//     document.getElementById('rec-method').innerText = method;

//     const rowBalance = document.getElementById('row-balance');
//     if(balance > 0) {
//         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
//         document.getElementById('row-change').style.display = 'none';
//     } else {
//         if(rowBalance) rowBalance.style.display = 'none';
//         document.getElementById('row-change').style.display = 'flex';
//         const change = paid - total;
//         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
//     }

//     if(method === 'Cash') {
//         document.getElementById('row-cash-paid').style.display = 'flex';
//         document.getElementById('rec-cash').innerText = paid.toFixed(2);
//         document.getElementById('row-ref').style.display = 'none';
//     } else {
//         document.getElementById('row-cash-paid').style.display = 'none';
//         document.getElementById('row-change').style.display = 'none';
//         document.getElementById('row-ref').style.display = 'flex';
//         document.getElementById('rec-ref').innerText = refNum;
//     }
// }

// window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// window.printReceipt = function() { window.print(); };

// function generateOrderID() {
//     const randomId = Math.floor(100000 + Math.random() * 900000);
//     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// }

// function showToast(msg, type) {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = type === 'success' 
//         ? `<i class="fas fa-check-circle"></i> ${msg}` 
//         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
//     container.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
// }

// function setBtnLoading(btn, isLoading) {
//     if(!btn) return;
//     if(isLoading) {
//         btn.dataset.originalText = btn.innerHTML;
//         btn.disabled = true;
//         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
//     } else {
//         btn.disabled = false;
//         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
//     }
// }

// async function sendToKitchen(orderId, cartItems) {
//     if (!cartItems || cartItems.length === 0) return;
//     try {
//         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
//         await set(ref(rtdb, 'kitchen_queue/current_order'), {
//             table: orderId,
//             items: itemsString,
//             timestamp: Date.now()
//         });
//         console.log("✅ Sent to Kitchen!");
//     } catch (e) {
//         console.error("❌ Error sending to kitchen:", e);
//     }
// }










// //NEW CODE WITH CYD ALAS DOS NA
// // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// // import { 
// //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, rtdb, ref, set
// // } from './firebase.js';

// // let products = [];
// // let cart = [];
// // let currentPaymentMethod = 'Cash'; 

// // document.addEventListener('DOMContentLoaded', () => {
// //     initTheme();
// //     generateOrderID();
    
// //     // --- CHECK LOGIN STATUS ---
// //     const userRole = localStorage.getItem('userRole'); 
// //     const logoutBtn = document.getElementById('logout-sidebar-item');
// //     if (userRole && userRole.toLowerCase() === 'cashier') {
// //         if(logoutBtn) logoutBtn.style.display = 'block';
// //     } else {
// //         if(logoutBtn) logoutBtn.style.display = 'none';
// //     }

// //     // --- DISPLAY DATE ---
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// //     // --- LOAD CATEGORIES ---
// //     onSnapshot(collection(db, "categories"), (snapshot) => {
// //         const tabs = document.getElementById('categoryTabs');
// //         if(tabs) {
// //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
// //             snapshot.forEach(doc => {
// //                 const data = doc.data();
// //                 // FIX 1: Use data.name instead of doc.id to match products' category field
// //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
// //             });
// //         }
// //     });

// //     // --- LOAD PRODUCTS ---
// //     onSnapshot(collection(db, "products"), (snapshot) => {
// //         products = [];
// //         snapshot.forEach(doc => {
// //             const data = doc.data();
// //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
// //             products.push({ 
// //                 id: doc.id, 
// //                 ...data,
// //                 quantity: isNaN(stockVal) ? 0 : stockVal
// //             });
// //         });
// //         renderProducts(products);
// //     });

// //     // --- SEARCH BAR ---
// //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
// //         const term = e.target.value.toLowerCase();
// //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
// //         renderProducts(filtered);
// //     });

// //     // --- PAYMENT INPUT LISTENER ---
// //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// // });

// // // =========================================================
// // // UI FUNCTIONS
// // // =========================================================

// // function initTheme() {
// //     if (localStorage.getItem('theme') === 'dark') {
// //         document.body.classList.add('dark-mode');
// //     }
// // }

// // window.openLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'flex';
// // };
// // window.closeLogoutModal = function() {
// //     document.getElementById('logoutModal').style.display = 'none';
// // };
// // window.confirmLogout = async function() {
// //     try {
// //         await signOut(auth);
// //         localStorage.removeItem('userRole');
// //         localStorage.removeItem('userName');
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error("Logout Error:", error);
// //     }
// // };

// // function renderProducts(list) {
// //     const grid = document.getElementById('productsGrid');
// //     if(!grid) return;
// //     grid.innerHTML = '';
    
// //     if (list.length === 0) {
// //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
// //         return;
// //     }

// //     list.forEach(p => {
// //         const qty = Number(p.quantity || p.stock || 0);
// //         const isOOS = qty <= 0;
        
// //         const card = document.createElement('div');
// //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
// //         card.onclick = () => !isOOS && addToCart(p);
        
// //         const displayPrice = parseFloat(p.price || p.cost || 0);
// //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
// //         const imageHtml = imgUrl 
// //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
// //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

// //         card.innerHTML = `
// //             ${imageHtml}
// //             <div class="product-info">
// //                 <div>
// //                     <h4>${p.name}</h4>
// //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
// //                 </div>
// //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
// //             </div>
// //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
// //         `;
// //         grid.appendChild(card);
// //     });
// // }

// // window.filterProducts = function(catId, btn) {
// //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
// //     if (btn) btn.classList.add('active');
// //     // FIX 1: Filter by category name (matches Firestore product's category field)
// //     const filtered = (catId === 'all') 
// //         ? products 
// //         : products.filter(p => 
// //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
// //             (p.categoryId || '') === catId
// //         );
// //     renderProducts(filtered);
// // };

// // // =========================================================
// // // CART LOGIC
// // // =========================================================

// // function addToCart(product) {
// //     const existing = cart.find(i => i.id === product.id);
// //     const currentQty = existing ? existing.qty : 0;
// //     const productStock = Number(product.quantity || product.stock || 0);
    
// //     if (currentQty + 1 > productStock) {
// //         showToast("Not enough stock!", "error");
// //         return;
// //     }
// //     const priceToUse = parseFloat(product.price || product.cost || 0);

// //     if (existing) {
// //         existing.qty++;
// //     } else {
// //         cart.push({
// //             id: product.id,
// //             name: product.name,
// //             price: priceToUse,
// //             qty: 1
// //         });
// //     }
// //     renderCart();
// // }

// // function renderCart() {
// //     const container = document.getElementById('cartItems');
// //     if(!container) return;
// //     container.innerHTML = '';
// //     if (cart.length === 0) {
// //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
// //         updateTotals(0);
// //         return;
// //     }
// //     let total = 0;
// //     cart.forEach((item, index) => {
// //         const itemTotal = item.price * item.qty;
// //         total += itemTotal;
// //         const div = document.createElement('div');
// //         div.className = 'cart-item';
// //         div.innerHTML = `
// //             <div class="item-info">
// //                 <h4>${item.name}</h4>
// //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
// //             </div>
// //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
// //             <div class="item-actions">
// //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
// //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
// //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
// //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
// //             </div>
// //         `;
// //         container.appendChild(div);
// //     });
// //     updateTotals(total);
// // }

// // window.updateQty = function(index, change) {
// //     const item = cart[index];
// //     const product = products.find(p => p.id === item.id);
// //     if (change === 1) {
// //         const productStock = Number(product.quantity || product.stock || 0);
// //         if (item.qty + 1 > productStock) {
// //             showToast("Max stock reached", "error");
// //             return;
// //         }
// //         item.qty++;
// //     } else {
// //         if (item.qty > 1) item.qty--;
// //         else cart.splice(index, 1);
// //     }
// //     renderCart();
// // };

// // window.removeItem = function(index) {
// //     cart.splice(index, 1);
// //     renderCart();
// // };

// // window.clearCart = function() {
// //     if(cart.length === 0) return;
// //     document.getElementById('clearOrderModal').style.display = 'flex';
// // };
// // window.closeClearModal = function() {
// //     document.getElementById('clearOrderModal').style.display = 'none';
// // };
// // window.confirmClearOrder = function() {
// //     cart = [];
// //     renderCart();
// //     window.closeClearModal();
// //     showToast("Order cleared", "success");
// // };

// // // FIX 2: updateTotals now updates ALL cart footer displays + modal
// // function updateTotals(subtotal) {
// //     const total = subtotal;
// //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

// //     // Cart footer
// //     const subtotalEl = document.getElementById('subtotalDisplay');
// //     const vatEl = document.getElementById('vatDisplay');
// //     const totalEl = document.getElementById('totalDisplay');
// //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
// //     if(vatEl) vatEl.innerText = fmt(0);
// //     if(totalEl) totalEl.innerText = fmt(total);

// //     // Payment modal total (set dataset.value for calculateChange to use)
// //     const modalTotal = document.getElementById('modalTotalAmount');
// //     if(modalTotal) {
// //         modalTotal.dataset.value = total;
// //         modalTotal.innerText = fmt(total);
// //     }
// // }

// // // =========================================================
// // // PAYMENT MODAL
// // // =========================================================

// // window.openPaymentModal = function() {
// //     if (cart.length === 0) {
// //         showToast("Cart is empty!", "error");
// //         return;
// //     }
// //     document.getElementById('paymentModal').style.display = 'flex';
// //     document.getElementById('amountPaid').value = '';
// //     document.getElementById('changeAmount').innerText = '₱0.00';
// //     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
// //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
// //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// // };
// // window.closePaymentModal = function() {
// //     document.getElementById('paymentModal').style.display = 'none';
// // };

// // // window.setPaymentMethod = function(method, btn) {
// // //     currentPaymentMethod = method;
// // //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// // //     btn.classList.add('active');
    
// // //     const cashDiv = document.getElementById('cash-payment-section');
// // //     const digitalDiv = document.getElementById('digital-payment-section');
// // //     const qrDiv = document.getElementById('qr-code-section');
    
// // //     if (method === 'Cash') {
// // //         if(cashDiv) cashDiv.style.display = 'block';
// // //         if(digitalDiv) digitalDiv.style.display = 'none';
// // //         if(qrDiv) qrDiv.style.display = 'none';
// // //     } else {
// // //         if(cashDiv) cashDiv.style.display = 'none';
// // //         if(digitalDiv) digitalDiv.style.display = 'block';
// // //         if(qrDiv) qrDiv.style.display = 'flex';
// // //     }
// // // };

// // window.setPaymentMethod = function(method, btn) {
// //     currentPaymentMethod = method;
// //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
// //     btn.classList.add('active');
    
// //     const cashDiv = document.getElementById('cash-payment-section');
// //     const digitalDiv = document.getElementById('digital-payment-section');
// //     const nfcDiv = document.getElementById('nfc-payment-section');
// //     const qrDiv = document.getElementById('qr-code-section');
    
// //     // Hide all sections first
// //     if(cashDiv) cashDiv.style.display = 'none';
// //     if(digitalDiv) digitalDiv.style.display = 'none';
// //     if(nfcDiv) nfcDiv.style.display = 'none';
// //     if(qrDiv) qrDiv.style.display = 'none';
    
// //     // Show relevant section
// //     if (method === 'Cash') {
// //         if(cashDiv) cashDiv.style.display = 'block';
// //     } else if (method === 'NFC') {
// //         if(nfcDiv) nfcDiv.style.display = 'block';
// //         startNFCListening(); // Start listening for ESP32
// //     } else {
// //         if(digitalDiv) digitalDiv.style.display = 'block';
// //         if(qrDiv) qrDiv.style.display = 'flex';
// //     }
// // };




// // let nfcListenerInterval = null;

// // function startNFCListening() {
// //     // Show "waiting" status
// //     const nfcStatus = document.getElementById('nfcStatus');
// //     if(nfcStatus) {
// //         nfcStatus.style.display = 'block';
// //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for tap...';
// //     }
    
// //     // Poll backend for NFC payment signal from ESP32
// //     nfcListenerInterval = setInterval(async () => {
// //         try {
// //             const response = await fetch('/api/nfc-payment-status'); // Your backend endpoint
// //             const data = await response.json();
            
// //             if(data.status === 'processing') {
// //                 // Show processing animation
// //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
// //             } else if(data.status === 'success') {
// //                 // Payment confirmed!
// //                 clearInterval(nfcListenerInterval);
// //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle" style="color:#4caf50"></i> Payment successful!';
                
// //                 // Auto-complete the payment
// //                 setTimeout(() => {
// //                     processNFCPayment(data);
// //                 }, 1000);
// //             }
// //         } catch(err) {
// //             console.error('NFC polling error:', err);
// //         }
// //     }, 1000); // Check every second
// // }

// // function stopNFCListening() {
// //     if(nfcListenerInterval) {
// //         clearInterval(nfcListenerInterval);
// //         nfcListenerInterval = null;
// //     }
// // }

// // async function processNFCPayment(nfcData) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //     const custPhone = document.getElementById('customerPhone')?.value || '-';
// //     const orderId = document.getElementById('orderNumber').innerText;
    
// //     const orderData = {
// //         date: new Date().toISOString(),
// //         orderId: orderId,
// //         customer: custName,
// //         contact: custPhone,
// //         items: cart,
// //         total: total,
// //         method: 'NFC',
// //         cashReceived: total, // NFC always exact amount
// //         change: 0,
// //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
// //         cashier: localStorage.getItem('userName') || 'Staff'
// //     };
    
// //     try {
// //         // Save transaction
// //         await addDoc(collection(db, "transactions"), orderData);
        
// //         // Send to kitchen
// //         await sendToKitchen(orderId, cart);
        
// //         // Reduce stock
// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id);
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || 0);
// //                 await updateDoc(productRef, { quantity: currentStock - item.qty });
// //             }
// //         }
        
// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         showToast("NFC Payment Successful!", "success");
        
// //     } catch(err) {
// //         console.error(err);
// //         showToast("Transaction Failed", "error");
// //     }
// // }

// // // Update closePaymentModal to stop NFC listening
// // const originalClosePaymentModal = window.closePaymentModal;
// // window.closePaymentModal = function() {
// //     stopNFCListening();
// //     originalClosePaymentModal();
// // };




// // window.setCash = function(amount) {
// //     const input = document.getElementById('amountPaid');
// //     const currentVal = parseFloat(input.value) || 0;
// //     input.value = currentVal + amount;
// //     calculateChange();
// // };

// // function calculateChange() {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const input = document.getElementById('amountPaid');
// //     const paid = parseFloat(input.value || 0);
// //     const change = paid - total;
// //     const changeEl = document.getElementById('changeAmount');
    
// //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
// //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// // }

// // // =========================================================
// // // PROCESS FULL PAYMENT
// // // =========================================================

// // window.processPayment = async function() {
// //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
// //     setBtnLoading(payBtn, true);

// //     try {
// //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
// //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
// //         const orderId = document.getElementById('orderNumber').innerText; 
        
// //         let paid = 0;
// //         let refNum = '-';

// //         if (currentPaymentMethod === 'Cash') {
// //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
// //             if (paid < total) {
// //                 showToast("Insufficient Cash", "error");
// //                 throw new Error("Insufficient Cash"); 
// //             }
// //         } else {
// //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
// //             refNum = refInput ? refInput.value : '';
// //             paid = total; 
// //             if (!refNum) {
// //                 showToast("Please enter Reference Number", "error");
// //                 throw new Error("Missing Reference"); 
// //             }
// //         }

// //         const orderData = {
// //             date: new Date().toISOString(),
// //             orderId: orderId,
// //             customer: custName,
// //             contact: custPhone,
// //             items: cart,
// //             total: total,
// //             method: currentPaymentMethod,
// //             cashReceived: paid,
// //             change: paid - total,
// //             reference: refNum,
// //             cashier: localStorage.getItem('userName') || 'Staff'
// //         };

// //         await addDoc(collection(db, "transactions"), orderData);
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         showReceipt(orderData);
// //         window.closePaymentModal();
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
// //         showToast("Payment Successful!", "success");

// //     } catch (err) {
// //         console.error(err);
// //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
// //             showToast("Transaction Failed", "error");
// //         }
// //     } finally {
// //         setBtnLoading(payBtn, false);
// //     }
// // };

// // // =========================================================
// // // PROCESS DOWNPAYMENT
// // // =========================================================

// // window.processDownpayment = async function() {
// //     if (cart.length === 0) return showToast('Cart is empty', 'error');

// //     if (currentPaymentMethod !== 'Cash') {
// //         window.openDigitalDPModal();
// //         return;
// //     }

// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const cashInput = document.getElementById('amountPaid');
// //     let cashReceived = 0;
    
// //     if (cashInput) cashReceived = parseFloat(cashInput.value);

// //     if (isNaN(cashReceived) || cashReceived <= 0) {
// //         return showToast('Please enter a valid amount', 'error');
// //     }
// //     if (cashReceived >= total) {
// //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
// //     }

// //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
// //     setBtnLoading(dpBtn, true);

// //     try {
// //         await saveDownpayment(cashReceived, 'Cash', '');
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(dpBtn, false);
// //     }
// // };

// // window.openDigitalDPModal = function() {
// //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
// //     document.getElementById('digi-dp-amount').value = '';
// //     const mainRef = document.getElementById('referenceNumber');
// //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
// //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
// //     document.getElementById('digi-dp-amount').focus();
// // };
// // window.closeDigitalDPModal = function() {
// //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// // };
// // window.confirmDigitalDP = async function() {
// //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
// //     const refVal = document.getElementById('digi-dp-ref').value;
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

// //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
// //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
// //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

// //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
// //     setBtnLoading(confirmBtn, true);

// //     try {
// //         window.closeDigitalDPModal();
// //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
// //     } catch (e) {
// //         console.error(e);
// //     } finally {
// //         setBtnLoading(confirmBtn, false);
// //     }
// // };

// // async function saveDownpayment(amountPaid, method, reference) {
// //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
// //     const balance = total - amountPaid;
// //     const orderId = document.getElementById('orderNumber').innerText; 

// //     const orderData = {
// //         orderId: orderId,
// //         date: new Date().toISOString(),
// //         items: cart,
// //         total: total,
// //         cashReceived: amountPaid,
// //         change: 0, 
// //         balance: balance,
// //         method: method,
// //         reference: reference,
// //         status: 'Partial',
// //         cashier: localStorage.getItem('userName') || 'Staff',
// //         customer: document.getElementById('customerName')?.value || 'Walk-in',
// //         contact: document.getElementById('customerPhone')?.value || '-'
// //     };

// //     try {
// //         await addDoc(collection(db, "transactions"), orderData); 
// //         await sendToKitchen(orderId, cart);

// //         for (let item of cart) {
// //             const productRef = doc(db, "products", item.id);
// //             const prodSnap = products.find(p => p.id === item.id); 
// //             if(prodSnap) {
// //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
// //                 const newQty = currentStock - item.qty;
// //                 await updateDoc(productRef, { quantity: newQty });
// //             }
// //         }

// //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
// //         document.getElementById('paymentModal').style.display = 'none';
// //         document.getElementById('receiptModal').style.display = 'flex';
        
// //         cart = [];
// //         renderCart();
// //         generateOrderID();
// //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
// //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
// //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

// //         showToast('Downpayment recorded!', 'success');
// //     } catch (error) {
// //         console.error("Error saving order: ", error);
// //         showToast('Error saving order', 'error');
// //         throw error; 
// //     }
// // }

// // // =========================================================
// // // RECEIPT UTILS
// // // =========================================================

// // function showReceipt(data) {
// //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
// //     document.getElementById('receiptModal').style.display = 'flex';
// // }

// // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
// //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
// //     document.getElementById('rec-orderId').innerText = data.orderId;
// //     document.getElementById('rec-cashier').innerText = data.cashier;
// //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

// //     const itemsDiv = document.getElementById('rec-items');
// //     itemsDiv.innerHTML = '';
// //     data.items.forEach(item => {
// //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
// //     });

// //     document.getElementById('rec-total').innerText = total.toFixed(2);
// //     document.getElementById('rec-method').innerText = method;

// //     const rowBalance = document.getElementById('row-balance');
// //     if(balance > 0) {
// //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
// //         document.getElementById('row-change').style.display = 'none';
// //     } else {
// //         if(rowBalance) rowBalance.style.display = 'none';
// //         document.getElementById('row-change').style.display = 'flex';
// //         const change = paid - total;
// //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
// //     }

// //     if(method === 'Cash') {
// //         document.getElementById('row-cash-paid').style.display = 'flex';
// //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
// //         document.getElementById('row-ref').style.display = 'none';
// //     } else {
// //         document.getElementById('row-cash-paid').style.display = 'none';
// //         document.getElementById('row-change').style.display = 'none';
// //         document.getElementById('row-ref').style.display = 'flex';
// //         document.getElementById('rec-ref').innerText = refNum;
// //     }
// // }

// // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// // window.printReceipt = function() { window.print(); };

// // function generateOrderID() {
// //     const randomId = Math.floor(100000 + Math.random() * 900000);
// //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// // }

// // function showToast(msg, type) {
// //     const container = document.getElementById('toast-container');
// //     const toast = document.createElement('div');
// //     toast.className = `toast ${type}`;
// //     toast.innerHTML = type === 'success' 
// //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
// //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
// //     container.appendChild(toast);
// //     setTimeout(() => toast.remove(), 3000);
// // }

// // function setBtnLoading(btn, isLoading) {
// //     if(!btn) return;
// //     if(isLoading) {
// //         btn.dataset.originalText = btn.innerHTML;
// //         btn.disabled = true;
// //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
// //     } else {
// //         btn.disabled = false;
// //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
// //     }
// // }

// // // =========================================================
// // // SEND TO KITCHEN
// // // =========================================================

// // async function sendToKitchen(orderId, cartItems) {
// //     if (!cartItems || cartItems.length === 0) return;
// //     try {
// //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
// //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
// //             table: orderId,
// //             items: itemsString,
// //             timestamp: Date.now()
// //         });
// //         console.log("✅ Sent to Kitchen!");
// //     } catch (e) {
// //         console.error("❌ Error sending to kitchen:", e);
// //     }
// // }









// //NEW CODE WITH CYD + NFC INTEGRATION (CORRECTED)
// import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { 
//     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
//     rtdb, ref, set, onValue, remove
// } from './firebase.js';

// let products = [];
// let cart = [];
// let currentPaymentMethod = 'Cash';
// let nfcListener = null;

// document.addEventListener('DOMContentLoaded', () => {
//     initTheme();
//     generateOrderID();
    
//     // --- CHECK LOGIN STATUS ---
//     const userRole = localStorage.getItem('userRole'); 
//     const logoutBtn = document.getElementById('logout-sidebar-item');
//     if (userRole && userRole.toLowerCase() === 'cashier') {
//         if(logoutBtn) logoutBtn.style.display = 'block';
//     } else {
//         if(logoutBtn) logoutBtn.style.display = 'none';
//     }

//     // --- DISPLAY DATE ---
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // --- LOAD CATEGORIES ---
//     onSnapshot(collection(db, "categories"), (snapshot) => {
//         const tabs = document.getElementById('categoryTabs');
//         if(tabs) {
//             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
//             snapshot.forEach(doc => {
//                 const data = doc.data();
//                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
//             });
//         }
//     });

//     // --- LOAD PRODUCTS ---
//     onSnapshot(collection(db, "products"), (snapshot) => {
//         products = [];
//         snapshot.forEach(doc => {
//             const data = doc.data();
//             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            
//             products.push({ 
//                 id: doc.id, 
//                 ...data,
//                 quantity: isNaN(stockVal) ? 0 : stockVal
//             });
//         });
//         renderProducts(products);
//     });

//     // --- SEARCH BAR ---
//     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
//         const term = e.target.value.toLowerCase();
//         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
//         renderProducts(filtered);
//     });

//     // --- PAYMENT INPUT LISTENER ---
//     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
// });

// // =========================================================
// // UI FUNCTIONS
// // =========================================================

// function initTheme() {
//     if (localStorage.getItem('theme') === 'dark') {
//         document.body.classList.add('dark-mode');
//     }
// }

// window.openLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'flex';
// };
// window.closeLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'none';
// };
// window.confirmLogout = async function() {
//     try {
//         await signOut(auth);
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('userName');
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error("Logout Error:", error);
//     }
// };

// function renderProducts(list) {
//     const grid = document.getElementById('productsGrid');
//     if(!grid) return;
//     grid.innerHTML = '';
    
//     if (list.length === 0) {
//         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
//         return;
//     }

//     list.forEach(p => {
//         const qty = Number(p.quantity || p.stock || 0);
//         const isOOS = qty <= 0;
        
//         const card = document.createElement('div');
//         card.className = `product-card ${isOOS ? 'oos' : ''}`;
//         card.onclick = () => !isOOS && addToCart(p);
        
//         const displayPrice = parseFloat(p.price || p.cost || 0);
//         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        
//         const imageHtml = imgUrl 
//             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
//             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

//         card.innerHTML = `
//             ${imageHtml}
//             <div class="product-info">
//                 <div>
//                     <h4>${p.name}</h4>
//                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
//                 </div>
//                 <span class="price">₱${displayPrice.toLocaleString()}</span>
//             </div>
//             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
//         `;
//         grid.appendChild(card);
//     });
// }

// window.filterProducts = function(catId, btn) {
//     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
//     if (btn) btn.classList.add('active');
//     const filtered = (catId === 'all') 
//         ? products 
//         : products.filter(p => 
//             (p.category || '').toLowerCase() === catId.toLowerCase() ||
//             (p.categoryId || '') === catId
//         );
//     renderProducts(filtered);
// };

// // =========================================================
// // CART LOGIC
// // =========================================================

// function addToCart(product) {
//     const existing = cart.find(i => i.id === product.id);
//     const currentQty = existing ? existing.qty : 0;
//     const productStock = Number(product.quantity || product.stock || 0);
    
//     if (currentQty + 1 > productStock) {
//         showToast("Not enough stock!", "error");
//         return;
//     }
//     const priceToUse = parseFloat(product.price || product.cost || 0);

//     if (existing) {
//         existing.qty++;
//     } else {
//         cart.push({
//             id: product.id,
//             name: product.name,
//             price: priceToUse,
//             qty: 1
//         });
//     }
//     renderCart();
// }

// function renderCart() {
//     const container = document.getElementById('cartItems');
//     if(!container) return;
//     container.innerHTML = '';
//     if (cart.length === 0) {
//         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
//         updateTotals(0);
//         return;
//     }
//     let total = 0;
//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.qty;
//         total += itemTotal;
//         const div = document.createElement('div');
//         div.className = 'cart-item';
//         div.innerHTML = `
//             <div class="item-info">
//                 <h4>${item.name}</h4>
//                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
//             </div>
//             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
//             <div class="item-actions">
//                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
//                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
//                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
//                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
//             </div>
//         `;
//         container.appendChild(div);
//     });
//     updateTotals(total);
// }

// window.updateQty = function(index, change) {
//     const item = cart[index];
//     const product = products.find(p => p.id === item.id);
//     if (change === 1) {
//         const productStock = Number(product.quantity || product.stock || 0);
//         if (item.qty + 1 > productStock) {
//             showToast("Max stock reached", "error");
//             return;
//         }
//         item.qty++;
//     } else {
//         if (item.qty > 1) item.qty--;
//         else cart.splice(index, 1);
//     }
//     renderCart();
// };

// window.removeItem = function(index) {
//     cart.splice(index, 1);
//     renderCart();
// };

// window.clearCart = function() {
//     if(cart.length === 0) return;
//     document.getElementById('clearOrderModal').style.display = 'flex';
// };
// window.closeClearModal = function() {
//     document.getElementById('clearOrderModal').style.display = 'none';
// };
// window.confirmClearOrder = function() {
//     cart = [];
//     renderCart();
//     window.closeClearModal();
//     showToast("Order cleared", "success");
// };

// function updateTotals(subtotal) {
//     const total = subtotal;
//     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

//     // Cart footer
//     const subtotalEl = document.getElementById('subtotalDisplay');
//     const vatEl = document.getElementById('vatDisplay');
//     const totalEl = document.getElementById('totalDisplay');
//     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
//     if(vatEl) vatEl.innerText = fmt(0);
//     if(totalEl) totalEl.innerText = fmt(total);

//     // Payment modal total
//     const modalTotal = document.getElementById('modalTotalAmount');
//     if(modalTotal) {
//         modalTotal.dataset.value = total;
//         modalTotal.innerText = fmt(total);
//     }
// }

// // =========================================================
// // PAYMENT MODAL
// // =========================================================

// window.openPaymentModal = function() {
//     if (cart.length === 0) {
//         showToast("Cart is empty!", "error");
//         return;
//     }
//     document.getElementById('paymentModal').style.display = 'flex';
//     document.getElementById('amountPaid').value = '';
//     document.getElementById('changeAmount').innerText = '₱0.00';
//     document.getElementById('changeAmount').style.color = 'var(--navy)';
    
//     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
//     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
// };

// // Override closePaymentModal to stop NFC listening
// const originalClosePaymentModal = window.closePaymentModal;
// window.closePaymentModal = function() {
//     stopNFCListening();
//     if(originalClosePaymentModal) {
//         originalClosePaymentModal();
//     } else {
//         document.getElementById('paymentModal').style.display = 'none';
//     }
// };

// // =========================================================
// // PAYMENT METHOD SELECTION + NFC INTEGRATION
// // =========================================================

// window.setPaymentMethod = function(method, btn) {
//     currentPaymentMethod = method;
//     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
    
//     const cashDiv = document.getElementById('cash-payment-section');
//     const digitalDiv = document.getElementById('digital-payment-section');
//     const nfcDiv = document.getElementById('nfc-payment-section');
//     const qrDiv = document.getElementById('qr-code-section');
    
//     // Hide all sections first
//     if(cashDiv) cashDiv.style.display = 'none';
//     if(digitalDiv) digitalDiv.style.display = 'none';
//     if(nfcDiv) nfcDiv.style.display = 'none';
//     if(qrDiv) qrDiv.style.display = 'none';
    
//     // Show relevant section
//     if (method === 'Cash') {
//         if(cashDiv) cashDiv.style.display = 'block';
//     } else if (method === 'NFC') {
//         if(nfcDiv) nfcDiv.style.display = 'block';
        
//         // Update amount display
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
//         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
//         startNFCListening();
//     } else {
//         // GCash or Bank
//         if(digitalDiv) digitalDiv.style.display = 'block';
//         if(qrDiv) qrDiv.style.display = 'flex';
//     }
// };

// function startNFCListening() {
//     const nfcStatus = document.getElementById('nfcStatus');
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
//     if(nfcStatus) {
//         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for Customer tap...';
//         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
//     }
    
//     // Write pending payment to RTDB for ESP32-C3 to see
//     set(ref(rtdb, 'nfc_payment/pending'), {
//         amount: total,
//         timestamp: Date.now(),
//         status: 'waiting'
//     }).catch(err => console.error('RTDB write error:', err));
    
//     // Listen for ESP32-C3 confirmation
//     const nfcRef = ref(rtdb, 'nfc_payment/status');
//     nfcListener = onValue(nfcRef, (snapshot) => {
//         const data = snapshot.val();
        
//         if (!data) return;
        
//         if (data.status === 'processing') {
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
//             }
//         } 
//         else if (data.status === 'success') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
//                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
//             }
            
//             // Auto-complete after 1 second
//             setTimeout(() => {
//                 processNFCPayment(data);
//             }, 1000);
//         }
//         else if (data.status === 'failed') {
//             stopNFCListening();
//             if(nfcStatus) {
//                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
//                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
//             }
//             showToast('NFC Payment Failed', 'error');
//         }
//     });
// }

// function stopNFCListening() {
//     if(nfcListener) {
//         nfcListener(); // Unsubscribe from RTDB listener
//         nfcListener = null;
//     }
    
//     // Clear RTDB nodes
//     remove(ref(rtdb, 'nfc_payment/pending')).catch(err => console.log('Cleanup pending:', err));
//     remove(ref(rtdb, 'nfc_payment/status')).catch(err => console.log('Cleanup status:', err));
// }

// async function processNFCPayment(nfcData) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const custName = document.getElementById('customerName')?.value || 'Walk-in';
//     const custPhone = document.getElementById('customerPhone')?.value || '-';
//     const orderId = document.getElementById('orderNumber').innerText;
    
//     const orderData = {
//         date: new Date().toISOString(),
//         orderId: orderId,
//         customer: custName,
//         contact: custPhone,
//         items: cart,
//         total: total,
//         method: 'NFC',
//         cashReceived: total,
//         change: 0,
//         reference: nfcData.transactionId || 'NFC-' + Date.now(),
//         cashier: localStorage.getItem('userName') || 'Staff',
//         status: 'completed'
//     };
    
//     try {
//         // 1. Save transaction to Firestore
//         await addDoc(collection(db, "transactions"), orderData);
        
//         // 2. Send to kitchen queue (RTDB) - CYD will display this
//         await sendToKitchen(orderId, cart);
        
//         // 3. Reduce stock
//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id);
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || 0);
//                 await updateDoc(productRef, { 
//                     quantity: Math.max(0, currentStock - item.qty) 
//                 });
//             }
//         }
        
//         // 4. Show receipt and cleanup
//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
        
//         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
//     } catch(err) {
//         console.error("NFC Payment Error:", err);
//         showToast("❌ Transaction Failed: " + err.message, "error");
//     }
// }

// // =========================================================
// // CASH PAYMENT HELPERS
// // =========================================================

// window.setCash = function(amount) {
//     const input = document.getElementById('amountPaid');
//     const currentVal = parseFloat(input.value) || 0;
//     input.value = currentVal + amount;
//     calculateChange();
// };

// function calculateChange() {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const input = document.getElementById('amountPaid');
//     const paid = parseFloat(input.value || 0);
//     const change = paid - total;
//     const changeEl = document.getElementById('changeAmount');
    
//     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
//     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
// }

// // =========================================================
// // PROCESS FULL PAYMENT
// // =========================================================

// window.processPayment = async function() {
//     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
//     setBtnLoading(payBtn, true);

//     try {
//         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//         const custName = document.getElementById('customerName')?.value || 'Walk-in';
//         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
//         const orderId = document.getElementById('orderNumber').innerText; 
        
//         let paid = 0;
//         let refNum = '-';

//         if (currentPaymentMethod === 'Cash') {
//             paid = parseFloat(document.getElementById('amountPaid').value || 0);
//             if (paid < total) {
//                 showToast("Insufficient Cash", "error");
//                 throw new Error("Insufficient Cash"); 
//             }
//         } else {
//             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
//             refNum = refInput ? refInput.value : '';
//             paid = total; 
//             if (!refNum) {
//                 showToast("Please enter Reference Number", "error");
//                 throw new Error("Missing Reference"); 
//             }
//         }

//         const orderData = {
//             date: new Date().toISOString(),
//             orderId: orderId,
//             customer: custName,
//             contact: custPhone,
//             items: cart,
//             total: total,
//             method: currentPaymentMethod,
//             cashReceived: paid,
//             change: paid - total,
//             reference: refNum,
//             cashier: localStorage.getItem('userName') || 'Staff'
//         };

//         await addDoc(collection(db, "transactions"), orderData);
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         showReceipt(orderData);
//         window.closePaymentModal();
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
//         showToast("Payment Successful!", "success");

//     } catch (err) {
//         console.error(err);
//         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
//             showToast("Transaction Failed", "error");
//         }
//     } finally {
//         setBtnLoading(payBtn, false);
//     }
// };

// // =========================================================
// // PROCESS DOWNPAYMENT
// // =========================================================

// window.processDownpayment = async function() {
//     if (cart.length === 0) return showToast('Cart is empty', 'error');

//     if (currentPaymentMethod !== 'Cash') {
//         window.openDigitalDPModal();
//         return;
//     }

//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const cashInput = document.getElementById('amountPaid');
//     let cashReceived = 0;
    
//     if (cashInput) cashReceived = parseFloat(cashInput.value);

//     if (isNaN(cashReceived) || cashReceived <= 0) {
//         return showToast('Please enter a valid amount', 'error');
//     }
//     if (cashReceived >= total) {
//         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
//     }

//     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
//     setBtnLoading(dpBtn, true);

//     try {
//         await saveDownpayment(cashReceived, 'Cash', '');
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(dpBtn, false);
//     }
// };

// window.openDigitalDPModal = function() {
//     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
//     document.getElementById('digi-dp-amount').value = '';
//     const mainRef = document.getElementById('referenceNumber');
//     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
//     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
//     document.getElementById('digi-dp-amount').focus();
// };
// window.closeDigitalDPModal = function() {
//     document.getElementById('digitalDownpaymentModal').style.display = 'none';
// };
// window.confirmDigitalDP = async function() {
//     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
//     const refVal = document.getElementById('digi-dp-ref').value;
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

//     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
//     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
//     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

//     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
//     setBtnLoading(confirmBtn, true);

//     try {
//         window.closeDigitalDPModal();
//         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         setBtnLoading(confirmBtn, false);
//     }
// };

// async function saveDownpayment(amountPaid, method, reference) {
//     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
//     const balance = total - amountPaid;
//     const orderId = document.getElementById('orderNumber').innerText; 

//     const orderData = {
//         orderId: orderId,
//         date: new Date().toISOString(),
//         items: cart,
//         total: total,
//         cashReceived: amountPaid,
//         change: 0, 
//         balance: balance,
//         method: method,
//         reference: reference,
//         status: 'Partial',
//         cashier: localStorage.getItem('userName') || 'Staff',
//         customer: document.getElementById('customerName')?.value || 'Walk-in',
//         contact: document.getElementById('customerPhone')?.value || '-'
//     };

//     try {
//         await addDoc(collection(db, "transactions"), orderData); 
//         await sendToKitchen(orderId, cart);

//         for (let item of cart) {
//             const productRef = doc(db, "products", item.id);
//             const prodSnap = products.find(p => p.id === item.id); 
//             if(prodSnap) {
//                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
//                 const newQty = currentStock - item.qty;
//                 await updateDoc(productRef, { quantity: newQty });
//             }
//         }

//         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
//         document.getElementById('paymentModal').style.display = 'none';
//         document.getElementById('receiptModal').style.display = 'flex';
        
//         cart = [];
//         renderCart();
//         generateOrderID();
//         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
//         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
//         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

//         showToast('Downpayment recorded!', 'success');
//     } catch (error) {
//         console.error("Error saving order: ", error);
//         showToast('Error saving order', 'error');
//         throw error; 
//     }
// }

// // =========================================================
// // RECEIPT UTILS
// // =========================================================

// function showReceipt(data) {
//     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
//     document.getElementById('receiptModal').style.display = 'flex';
// }

// function prepareReceiptUI(data, total, paid, balance, method, refNum) {
//     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
//     document.getElementById('rec-orderId').innerText = data.orderId;
//     document.getElementById('rec-cashier').innerText = data.cashier;
//     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;

//     const itemsDiv = document.getElementById('rec-items');
//     itemsDiv.innerHTML = '';
//     data.items.forEach(item => {
//         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
//     });

//     document.getElementById('rec-total').innerText = total.toFixed(2);
//     document.getElementById('rec-method').innerText = method;

//     const rowBalance = document.getElementById('row-balance');
//     if(balance > 0) {
//         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
//         document.getElementById('row-change').style.display = 'none';
//     } else {
//         if(rowBalance) rowBalance.style.display = 'none';
//         document.getElementById('row-change').style.display = 'flex';
//         const change = paid - total;
//         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
//     }

//     if(method === 'Cash') {
//         document.getElementById('row-cash-paid').style.display = 'flex';
//         document.getElementById('rec-cash').innerText = paid.toFixed(2);
//         document.getElementById('row-ref').style.display = 'none';
//     } else {
//         document.getElementById('row-cash-paid').style.display = 'none';
//         document.getElementById('row-change').style.display = 'none';
//         document.getElementById('row-ref').style.display = 'flex';
//         document.getElementById('rec-ref').innerText = refNum;
//     }
// }

// window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
// window.printReceipt = function() { window.print(); };

// function generateOrderID() {
//     const randomId = Math.floor(100000 + Math.random() * 900000);
//     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
// }

// function showToast(msg, type) {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = type === 'success' 
//         ? `<i class="fas fa-check-circle"></i> ${msg}` 
//         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
//     container.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
// }

// function setBtnLoading(btn, isLoading) {
//     if(!btn) return;
//     if(isLoading) {
//         btn.dataset.originalText = btn.innerHTML;
//         btn.disabled = true;
//         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
//     } else {
//         btn.disabled = false;
//         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
//     }
// }

// // =========================================================
// // SEND TO KITCHEN
// // =========================================================

// async function sendToKitchen(orderId, cartItems) {
//     if (!cartItems || cartItems.length === 0) return;
//     try {
//         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
//         await set(ref(rtdb, 'kitchen_queue/current_order'), {
//             table: orderId,
//             items: itemsString,
//             timestamp: Date.now()
//         });
//         console.log("✅ Sent to Kitchen!");
//     } catch (e) {
//         console.error("❌ Error sending to kitchen:", e);
//     }
// }





    // //NEW CODE WITH CYD + NFC INTEGRATION (FIXED - NO MORE STUCK "PAYMENT SUCCESSFUL")
    // import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    // import { 
    //     db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
    //     rtdb, ref, set, onValue, remove
    // } from './firebase.js';

    // let products = [];
    // let cart = [];
    // let currentPaymentMethod = 'Cash';
    // let nfcListener = null;

    // document.addEventListener('DOMContentLoaded', () => {
    //     initTheme();
    //     generateOrderID();
        
    //     const userRole = localStorage.getItem('userRole'); 
    //     const logoutBtn = document.getElementById('logout-sidebar-item');
    //     if (userRole && userRole.toLowerCase() === 'cashier') {
    //         if(logoutBtn) logoutBtn.style.display = 'block';
    //     } else {
    //         if(logoutBtn) logoutBtn.style.display = 'none';
    //     }

    //     const dateEl = document.getElementById('currentDate');
    //     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    //     onSnapshot(collection(db, "categories"), (snapshot) => {
    //         const tabs = document.getElementById('categoryTabs');
    //         if(tabs) {
    //             tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
    //             snapshot.forEach(doc => {
    //                 const data = doc.data();
    //                 // Only show active categories
    //                 if (data.status === 'archived') return;
    //                 tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
    //             });
    //         }
    //     });

    //     onSnapshot(collection(db, "products"), (snapshot) => {
    //         products = [];
    //         snapshot.forEach(doc => {
    //             const data = doc.data();
    //             // Only show active products in POS
    //             if (data.status === 'archived' || data.status === 'inactive') return;
    //             const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
    //             products.push({ 
    //                 id: doc.id, 
    //                 ...data,
    //                 quantity: isNaN(stockVal) ? 0 : stockVal
    //             });
    //         });
    //         renderProducts(products);
    //     });

    //     document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
    //         const term = e.target.value.toLowerCase();
    //         const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    //         renderProducts(filtered);
    //     });

    //     document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
    // });

    // function initTheme() {
    //     if (localStorage.getItem('theme') === 'dark') {
    //         document.body.classList.add('dark-mode');
    //     }
    // }

    // window.openLogoutModal = function() {
    //     document.getElementById('logoutModal').style.display = 'flex';
    // };
    // window.closeLogoutModal = function() {
    //     document.getElementById('logoutModal').style.display = 'none';
    // };
    // window.confirmLogout = async function() {
    //     try {
    //         await signOut(auth);
    //         localStorage.removeItem('userRole');
    //         localStorage.removeItem('userName');
    //         window.location.href = 'index.html';
    //     } catch (error) {
    //         console.error("Logout Error:", error);
    //     }
    // };

    // function renderProducts(list) {
    //     const grid = document.getElementById('productsGrid');
    //     if(!grid) return;
    //     grid.innerHTML = '';
        
    //     if (list.length === 0) {
    //         grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
    //         return;
    //     }

    //     list.forEach(p => {
    //         const qty = Number(p.quantity || p.stock || 0);
    //         const isOOS = qty <= 0;
    //         const card = document.createElement('div');
    //         card.className = `product-card ${isOOS ? 'oos' : ''}`;
    //         card.onclick = () => !isOOS && addToCart(p);
    //         const displayPrice = parseFloat(p.price || p.cost || 0);
    //         const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
    //         const imageHtml = imgUrl 
    //             ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
    //             : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

    //         card.innerHTML = `
    //             ${imageHtml}
    //             <div class="product-info">
    //                 <div>
    //                     <h4>${p.name}</h4>
    //                     <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
    //                 </div>
    //                 <span class="price">₱${displayPrice.toLocaleString()}</span>
    //             </div>
    //             ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
    //         `;
    //         grid.appendChild(card);
    //     });
    // }

    // window.filterProducts = function(catId, btn) {
    //     document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
    //     if (btn) btn.classList.add('active');
    //     const filtered = (catId === 'all') 
    //         ? products 
    //         : products.filter(p => 
    //             (p.category || '').toLowerCase() === catId.toLowerCase() ||
    //             (p.categoryId || '') === catId
    //         );
    //     renderProducts(filtered);
    // };

    // function addToCart(product) {
    //     const existing = cart.find(i => i.id === product.id);
    //     const currentQty = existing ? existing.qty : 0;
    //     const productStock = Number(product.quantity || product.stock || 0);
        
    //     if (currentQty + 1 > productStock) {
    //         showToast("Not enough stock!", "error");
    //         return;
    //     }
    //     const priceToUse = parseFloat(product.price || product.cost || 0);

    //     if (existing) {
    //         existing.qty++;
    //     } else {
    //         cart.push({
    //             id: product.id,
    //             name: product.name,
    //             price: priceToUse,
    //             qty: 1
    //         });
    //     }
    //     renderCart();
    // }

    // function renderCart() {
    //     const container = document.getElementById('cartItems');
    //     if(!container) return;
    //     container.innerHTML = '';
    //     if (cart.length === 0) {
    //         container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
    //         updateTotals(0);
    //         return;
    //     }
    //     let total = 0;
    //     cart.forEach((item, index) => {
    //         const itemTotal = item.price * item.qty;
    //         total += itemTotal;
    //         const div = document.createElement('div');
    //         div.className = 'cart-item';
    //         div.innerHTML = `
    //             <div class="item-info">
    //                 <h4>${item.name}</h4>
    //                 <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
    //             </div>
    //             <div class="item-total">₱${itemTotal.toLocaleString()}</div>
    //             <div class="item-actions">
    //                 <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
    //                 <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
    //                 <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
    //                 <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
    //             </div>
    //         `;
    //         container.appendChild(div);
    //     });
    //     updateTotals(total);
    // }

    // window.updateQty = function(index, change) {
    //     const item = cart[index];
    //     const product = products.find(p => p.id === item.id);
    //     if (change === 1) {
    //         const productStock = Number(product.quantity || product.stock || 0);
    //         if (item.qty + 1 > productStock) {
    //             showToast("Max stock reached", "error");
    //             return;
    //         }
    //         item.qty++;
    //     } else {
    //         if (item.qty > 1) item.qty--;
    //         else cart.splice(index, 1);
    //     }
    //     renderCart();
    // };

    // window.removeItem = function(index) {
    //     cart.splice(index, 1);
    //     renderCart();
    // };

    // window.clearCart = function() {
    //     if(cart.length === 0) return;
    //     document.getElementById('clearOrderModal').style.display = 'flex';
    // };
    // window.closeClearModal = function() {
    //     document.getElementById('clearOrderModal').style.display = 'none';
    // };
    // window.confirmClearOrder = function() {
    //     cart = [];
    //     renderCart();
    //     window.closeClearModal();
    //     showToast("Order cleared", "success");
    // };

    // function updateTotals(subtotal) {
    //     const total = subtotal;
    //     const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

    //     const subtotalEl = document.getElementById('subtotalDisplay');
    //     const vatEl = document.getElementById('vatDisplay');
    //     const totalEl = document.getElementById('totalDisplay');
    //     if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
    //     if(vatEl) vatEl.innerText = fmt(0);
    //     if(totalEl) totalEl.innerText = fmt(total);

    //     const modalTotal = document.getElementById('modalTotalAmount');
    //     if(modalTotal) {
    //         modalTotal.dataset.value = total;
    //         modalTotal.innerText = fmt(total);
    //     }
    // }

    // window.openPaymentModal = function() {
    //     if (cart.length === 0) {
    //         showToast("Cart is empty!", "error");
    //         return;
    //     }
    //     document.getElementById('paymentModal').style.display = 'flex';
    //     document.getElementById('amountPaid').value = '';
    //     document.getElementById('changeAmount').innerText = '₱0.00';
    //     document.getElementById('changeAmount').style.color = 'var(--navy)';
        
    //     if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
    //     if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
    //     if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
    // };

    // window.openQRModal = function() {
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //     const label = document.getElementById('qrAmountLabel');
    //     if(label) label.innerText = '₱' + total.toLocaleString(undefined, { minimumFractionDigits: 2 });
    //     document.getElementById('qrModal').style.display = 'flex';
    // };

    // window.closeQRModal = function() {
    //     document.getElementById('qrModal').style.display = 'none';
    // };

    // window.closePaymentModal = function() {
    //     stopNFCListening(); // CRITICAL: Clean up NFC state
    //     window.closeQRModal(); // Also close QR if open
    //     document.getElementById('paymentModal').style.display = 'none';
    // };

    // // =========================================================
    // // NFC PAYMENT INTEGRATION (FIXED)
    // // =========================================================

    // window.setPaymentMethod = function(method, btn) {
    //     currentPaymentMethod = method;
    //     document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    //     btn.classList.add('active');
        
    //     const cashDiv = document.getElementById('cash-payment-section');
    //     const digitalDiv = document.getElementById('digital-payment-section');
    //     const nfcDiv = document.getElementById('nfc-payment-section');
        
    //     // Stop NFC if switching away from it
    //     if (method !== 'NFC') stopNFCListening();
    //     // Close QR if switching away from GCash
    //     if (method !== 'GCash') window.closeQRModal();
        
    //     if(cashDiv) cashDiv.style.display = 'none';
    //     if(digitalDiv) digitalDiv.style.display = 'none';
    //     if(nfcDiv) nfcDiv.style.display = 'none';
        
    //     if (method === 'Cash') {
    //         if(cashDiv) cashDiv.style.display = 'block';
    //     } else if (method === 'NFC') {
    //         if(nfcDiv) nfcDiv.style.display = 'block';
            
    //         // Reset NFC UI completely
    //         const nfcStatus = document.getElementById('nfcStatus');
    //         if(nfcStatus) {
    //             nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
    //             nfcStatus.style.background = 'rgba(255,255,255,0.2)';
    //             nfcStatus.style.display = 'block';
    //         }
            
    //         // Update amount display
    //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //         const nfcAmountEl = document.getElementById('nfcAmountDisplay');
    //         if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
            
    //         // Start fresh NFC session
    //         startNFCListening();
    //     } else {
    //         // GCash — show digital section with QR
    //         if(digitalDiv) digitalDiv.style.display = 'block';
    //     }
    // };

    // function startNFCListening() {
    //     const nfcStatus = document.getElementById('nfcStatus');
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
        
    //     // CRITICAL: Stop any existing listener first
    //     stopNFCListening();
        
    //     if(nfcStatus) {
    //         nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
    //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
    //         nfcStatus.style.display = 'block';
    //     }
        
    //     // Clear old RTDB data first, then write new
    //     Promise.all([
    //         remove(ref(rtdb, 'nfc_payment/pending')),
    //         remove(ref(rtdb, 'nfc_payment/status'))
    //     ]).then(() => {
    //         // Write fresh pending payment
    //         return set(ref(rtdb, 'nfc_payment/pending'), {
    //             amount: total,
    //             timestamp: Date.now(),
    //             status: 'waiting'
    //         });
    //     }).catch(err => console.error('RTDB write error:', err));
        
    //     // Listen for ESP32-C3 confirmation
    //     const nfcRef = ref(rtdb, 'nfc_payment/status');
    //     nfcListener = onValue(nfcRef, (snapshot) => {
    //         const data = snapshot.val();
            
    //         if (!data) return;
            
    //         if (data.status === 'processing') {
    //             if(nfcStatus) {
    //                 nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
    //             }
    //         } 
    //         else if (data.status === 'success') {
    //             stopNFCListening();
    //             if(nfcStatus) {
    //                 nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
    //                 nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
    //             }
                
    //             setTimeout(() => {
    //                 processNFCPayment(data);
    //             }, 1000);
    //         }
    //         else if (data.status === 'failed') {
    //             stopNFCListening();
    //             if(nfcStatus) {
    //                 nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
    //                 nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
    //             }
    //             showToast('NFC Payment Failed', 'error');
    //         }
    //     });
    // }

    // function stopNFCListening() {
    //     if(nfcListener) {
    //         nfcListener(); // Unsubscribe
    //         nfcListener = null;
    //     }
        
    //     // Clear RTDB nodes
    //     Promise.all([
    //         remove(ref(rtdb, 'nfc_payment/pending')),
    //         remove(ref(rtdb, 'nfc_payment/status'))
    //     ]).catch(err => console.log('Cleanup:', err));
        
    //     // Reset UI
    //     const nfcStatus = document.getElementById('nfcStatus');
    //     if(nfcStatus) {
    //         nfcStatus.style.display = 'none';
    //         nfcStatus.style.background = 'rgba(255,255,255,0.2)';
    //     }
    // }

    // async function processNFCPayment(nfcData) {
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //     const custName = document.getElementById('customerName')?.value || 'Walk-in';
    //     const custPhone = document.getElementById('customerPhone')?.value || '-';
    //     const orderId = document.getElementById('orderNumber').innerText;
        
    //     const orderData = {
    //         date: new Date().toISOString(),
    //         orderId: orderId,
    //         customer: custName,
    //         contact: custPhone,
    //         items: cart,
    //         total: total,
    //         method: 'NFC',
    //         cashReceived: total,
    //         change: 0,
    //         reference: nfcData.transactionId || 'NFC-' + Date.now(),
    //         cashier: localStorage.getItem('userName') || 'Staff',
    //         status: 'completed'
    //     };
        
    //     try {
    //         await addDoc(collection(db, "transactions"), orderData);
    //         await sendToKitchen(orderId, cart);
            
    //         for (let item of cart) {
    //             const productRef = doc(db, "products", item.id);
    //             const prodSnap = products.find(p => p.id === item.id);
    //             if(prodSnap) {
    //                 const currentStock = Number(prodSnap.quantity || 0);
    //                 await updateDoc(productRef, { 
    //                     quantity: Math.max(0, currentStock - item.qty) 
    //                 });
    //             }
    //         }
            
    //         // CRITICAL: Clean up NFC state BEFORE showing receipt
    //         stopNFCListening();
            
    //         showReceipt(orderData);
    //         window.closePaymentModal();
            
    //         cart = [];
    //         renderCart();
    //         generateOrderID();
            
    //         showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
            
    //     } catch(err) {
    //         console.error("NFC Payment Error:", err);
    //         stopNFCListening();
    //         showToast("❌ Transaction Failed: " + err.message, "error");
    //     }
    // }

    // window.setCash = function(amount) {
    //     const input = document.getElementById('amountPaid');
    //     const currentVal = parseFloat(input.value) || 0;
    //     input.value = currentVal + amount;
    //     calculateChange();
    // };

    // function calculateChange() {
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //     const input = document.getElementById('amountPaid');
    //     const paid = parseFloat(input.value || 0);
    //     const change = paid - total;
    //     const changeEl = document.getElementById('changeAmount');
        
    //     changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
    //     changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
    // }

    // window.processPayment = async function() {
    //     const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
    //     setBtnLoading(payBtn, true);

    //     try {
    //         const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //         const custName = document.getElementById('customerName')?.value || 'Walk-in';
    //         const custPhone = document.getElementById('customerPhone')?.value || '-'; 
    //         const orderId = document.getElementById('orderNumber').innerText; 
            
    //         let paid = 0;
    //         let refNum = '-';

    //         if (currentPaymentMethod === 'Cash') {
    //             paid = parseFloat(document.getElementById('amountPaid').value || 0);
    //             if (paid < total) {
    //                 showToast("Insufficient Cash", "error");
    //                 throw new Error("Insufficient Cash"); 
    //             }
    //         } else {
    //             const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
    //             refNum = refInput ? refInput.value : '';
    //             paid = total; 
    //             if (!refNum) {
    //                 showToast("Please enter Reference Number", "error");
    //                 throw new Error("Missing Reference"); 
    //             }
    //         }

    //         const orderData = {
    //             date: new Date().toISOString(),
    //             orderId: orderId,
    //             customer: custName,
    //             contact: custPhone,
    //             items: cart,
    //             total: total,
    //             method: currentPaymentMethod,
    //             cashReceived: paid,
    //             change: paid - total,
    //             reference: refNum,
    //             cashier: localStorage.getItem('userName') || 'Staff'
    //         };

    //         await addDoc(collection(db, "transactions"), orderData);
    //         await sendToKitchen(orderId, cart);

    //         for (let item of cart) {
    //             const productRef = doc(db, "products", item.id);
    //             const prodSnap = products.find(p => p.id === item.id); 
    //             if(prodSnap) {
    //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
    //                 const newQty = currentStock - item.qty;
    //                 await updateDoc(productRef, { quantity: newQty });
    //             }
    //         }

    //         showReceipt(orderData);
    //         window.closePaymentModal();
            
    //         cart = [];
    //         renderCart();
    //         generateOrderID();
    //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
    //         if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
    //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
            
    //         showToast("Payment Successful!", "success");

    //     } catch (err) {
    //         console.error(err);
    //         if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
    //             showToast("Transaction Failed", "error");
    //         }
    //     } finally {
    //         setBtnLoading(payBtn, false);
    //     }
    // };

    // window.processDownpayment = async function() {
    //     if (cart.length === 0) return showToast('Cart is empty', 'error');

    //     if (currentPaymentMethod !== 'Cash') {
    //         window.openDigitalDPModal();
    //         return;
    //     }

    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //     const cashInput = document.getElementById('amountPaid');
    //     let cashReceived = 0;
        
    //     if (cashInput) cashReceived = parseFloat(cashInput.value);

    //     if (isNaN(cashReceived) || cashReceived <= 0) {
    //         return showToast('Please enter a valid amount', 'error');
    //     }
    //     if (cashReceived >= total) {
    //         return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
    //     }

    //     const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
    //     setBtnLoading(dpBtn, true);

    //     try {
    //         await saveDownpayment(cashReceived, 'Cash', '');
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         setBtnLoading(dpBtn, false);
    //     }
    // };

    // window.openDigitalDPModal = function() {
    //     document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
    //     document.getElementById('digi-dp-amount').value = '';
    //     const mainRef = document.getElementById('referenceNumber');
    //     document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
    //     document.getElementById('digitalDownpaymentModal').style.display = 'flex';
    //     document.getElementById('digi-dp-amount').focus();
    // };
    // window.closeDigitalDPModal = function() {
    //     document.getElementById('digitalDownpaymentModal').style.display = 'none';
    // };
    // window.confirmDigitalDP = async function() {
    //     const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
    //     const refVal = document.getElementById('digi-dp-ref').value;
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

    //     if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
    //     if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
    //     if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

    //     const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
    //     setBtnLoading(confirmBtn, true);

    //     try {
    //         window.closeDigitalDPModal();
    //         await saveDownpayment(amountVal, currentPaymentMethod, refVal);
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         setBtnLoading(confirmBtn, false);
    //     }
    // };

    // async function saveDownpayment(amountPaid, method, reference) {
    //     const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    //     const balance = total - amountPaid;
    //     const orderId = document.getElementById('orderNumber').innerText; 

    //     const orderData = {
    //         orderId: orderId,
    //         date: new Date().toISOString(),
    //         items: cart,
    //         total: total,
    //         cashReceived: amountPaid,
    //         change: 0, 
    //         balance: balance,
    //         method: method,
    //         reference: reference,
    //         status: 'Partial',
    //         cashier: localStorage.getItem('userName') || 'Staff',
    //         customer: document.getElementById('customerName')?.value || 'Walk-in',
    //         contact: document.getElementById('customerPhone')?.value || '-'
    //     };

    //     try {
    //         await addDoc(collection(db, "transactions"), orderData); 
    //         await sendToKitchen(orderId, cart);

    //         for (let item of cart) {
    //             const productRef = doc(db, "products", item.id);
    //             const prodSnap = products.find(p => p.id === item.id); 
    //             if(prodSnap) {
    //                 const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
    //                 const newQty = currentStock - item.qty;
    //                 await updateDoc(productRef, { quantity: newQty });
    //             }
    //         }

    //         prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
    //         document.getElementById('paymentModal').style.display = 'none';
    //         document.getElementById('receiptModal').style.display = 'flex';
            
    //         cart = [];
    //         renderCart();
    //         generateOrderID();
    //         if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
    //         if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
    //         if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

    //         showToast('Downpayment recorded!', 'success');
    //     } catch (error) {
    //         console.error("Error saving order: ", error);
    //         showToast('Error saving order', 'error');
    //         throw error; 
    //     }
    // }

    // function showReceipt(data) {
    //     prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
    //     document.getElementById('receiptModal').style.display = 'flex';
    // }

    // function prepareReceiptUI(data, total, paid, balance, method, refNum) {
    //     document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
    //     document.getElementById('rec-orderId').innerText = data.orderId;
    //     document.getElementById('rec-cashier').innerText = data.cashier;
    //     if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;
    //     if(document.getElementById('rec-contact')) document.getElementById('rec-contact').innerText = data.contact || '-';
    //     const itemsDiv = document.getElementById('rec-items');
    //     itemsDiv.innerHTML = '';
    //     data.items.forEach(item => {
    //         itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
    //     });

    //     document.getElementById('rec-total').innerText = total.toFixed(2);
    //     document.getElementById('rec-method').innerText = method;

    //     const rowBalance = document.getElementById('row-balance');
    //     if(balance > 0) {
    //         if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
    //         document.getElementById('row-change').style.display = 'none';
    //     } else {
    //         if(rowBalance) rowBalance.style.display = 'none';
    //         document.getElementById('row-change').style.display = 'flex';
    //         const change = paid - total;
    //         document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
    //     }

    //     if(method === 'Cash') {
    //         document.getElementById('row-cash-paid').style.display = 'flex';
    //         document.getElementById('rec-cash').innerText = paid.toFixed(2);
    //         document.getElementById('row-ref').style.display = 'none';
    //     } else {
    //         document.getElementById('row-cash-paid').style.display = 'none';
    //         document.getElementById('row-change').style.display = 'none';
    //         document.getElementById('row-ref').style.display = 'flex';
    //         document.getElementById('rec-ref').innerText = refNum;
    //     }
    // }

    // window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
    // window.printReceipt = function() { window.print(); };

    // function generateOrderID() {
    //     const randomId = Math.floor(100000 + Math.random() * 900000);
    //     document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
    // }

    // function showToast(msg, type) {
    //     const container = document.getElementById('toast-container');
    //     const toast = document.createElement('div');
    //     toast.className = `toast ${type}`;
    //     toast.innerHTML = type === 'success' 
    //         ? `<i class="fas fa-check-circle"></i> ${msg}` 
    //         : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
    //     container.appendChild(toast);
    //     setTimeout(() => toast.remove(), 3000);
    // }

    // function setBtnLoading(btn, isLoading) {
    //     if(!btn) return;
    //     if(isLoading) {
    //         btn.dataset.originalText = btn.innerHTML;
    //         btn.disabled = true;
    //         btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    //     } else {
    //         btn.disabled = false;
    //         if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
    //     }
    // }

    // async function sendToKitchen(orderId, cartItems) {
    //     if (!cartItems || cartItems.length === 0) return;
    //     try {
    //         const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
    //         await set(ref(rtdb, 'kitchen_queue/current_order'), {
    //             table: orderId,
    //             items: itemsString,
    //             timestamp: Date.now()
    //         });
    //         console.log("✅ Sent to Kitchen!");
    //     } catch (e) {
    //         console.error("❌ Error sending to kitchen:", e);
    //     }
    // }
















    //NEW CODE WITH CYD + NFC INTEGRATION (FIXED - NO MORE STUCK "PAYMENT SUCCESSFUL")
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    db, auth, collection, addDoc, updateDoc, doc, onSnapshot, 
    rtdb, ref, set, onValue, remove
} from './firebase.js';

let products = [];
let cart = [];
let currentPaymentMethod = 'Cash';
let nfcListener = null;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    generateOrderID();
    
    const userRole = localStorage.getItem('userRole'); 
    const logoutBtn = document.getElementById('logout-sidebar-item');
    if (userRole && userRole.toLowerCase() === 'cashier') {
        if(logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if(logoutBtn) logoutBtn.style.display = 'none';
    }

    const dateEl = document.getElementById('currentDate');
    if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    onSnapshot(collection(db, "categories"), (snapshot) => {
        const tabs = document.getElementById('categoryTabs');
        if(tabs) {
            tabs.innerHTML = '<button class="active" onclick="window.filterProducts(\'all\', this)">All</button>';
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.status === 'archived') return;
                tabs.innerHTML += `<button onclick="window.filterProducts('${data.name}', this)">${data.name}</button>`;
            });
        }
    });

    onSnapshot(collection(db, "products"), (snapshot) => {
        products = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.status === 'archived' || data.status === 'inactive') return;
            const stockVal = data.quantity !== undefined ? Number(data.quantity) : Number(data.stock || 0);
            products.push({ 
                id: doc.id, 
                ...data,
                quantity: isNaN(stockVal) ? 0 : stockVal
            });
        });
        renderProducts(products);
    });

    document.getElementById('productSearch')?.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    document.getElementById('amountPaid')?.addEventListener('input', calculateChange);
});

function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

window.openLogoutModal = function() {
    document.getElementById('logoutModal').style.display = 'flex';
};
window.closeLogoutModal = function() {
    document.getElementById('logoutModal').style.display = 'none';
};
window.confirmLogout = async function() {
    try {
        await signOut(auth);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    if (list.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-grey);">No products found.</p>';
        return;
    }

    list.forEach(p => {
        const qty = Number(p.quantity || p.stock || 0);
        const isOOS = qty <= 0;
        const card = document.createElement('div');
        card.className = `product-card ${isOOS ? 'oos' : ''}`;
        card.onclick = () => !isOOS && addToCart(p);
        const displayPrice = parseFloat(p.price || p.cost || 0);
        const imgUrl = p.imageUrl || p.image || p.img || p.photoURL || '';
        const imageHtml = imgUrl 
            ? `<div class="card-image-box"><img src="${imgUrl}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div class="prod-icon-fallback" style="display:none"><i class="fas fa-utensils"></i></div></div>`
            : `<div class="card-image-box"><div class="prod-icon-fallback"><i class="fas fa-utensils"></i></div></div>`;

        card.innerHTML = `
            ${imageHtml}
            ${p.description ? `<p class="product-desc">${p.description}</p>` : ''}
            <div class="product-info">
                <div>
                    <h4>${p.name}</h4>
                    <p class="stock">Stock: ${qty} ${p.unit || 'pcs'}</p>
                </div>
                <span class="price">₱${displayPrice.toLocaleString()}</span>
            </div>
            ${isOOS ? '<div class="oos-overlay">Out of Stock</div>' : ''}
        `;
        grid.appendChild(card);
    });

}

window.filterProducts = function(catId, btn) {
    document.querySelectorAll('.category-tabs button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const filtered = (catId === 'all') 
        ? products 
        : products.filter(p => 
            (p.category || '').toLowerCase() === catId.toLowerCase() ||
            (p.categoryId || '') === catId
        );
    renderProducts(filtered);
};

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    const currentQty = existing ? existing.qty : 0;
    const productStock = Number(product.quantity || product.stock || 0);
    
    if (currentQty + 1 > productStock) {
        showToast("Not enough stock!", "error");
        return;
    }
    const priceToUse = parseFloat(product.price || product.cost || 0);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: priceToUse,
            qty: 1
        });
    }
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    if(!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-basket"></i><p>No items added yet</p></div>`;
        updateTotals(0);
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>₱${item.price.toLocaleString()} x ${item.qty}</p>
            </div>
            <div class="item-total">₱${itemTotal.toLocaleString()}</div>
            <div class="item-actions">
                <button onclick="window.updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                <span style="font-size:12px; font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
                <button onclick="window.updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                <button class="remove" onclick="window.removeItem(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        container.appendChild(div);
    });
    updateTotals(total);
}

window.updateQty = function(index, change) {
    const item = cart[index];
    const product = products.find(p => p.id === item.id);
    if (change === 1) {
        const productStock = Number(product.quantity || product.stock || 0);
        if (item.qty + 1 > productStock) {
            showToast("Max stock reached", "error");
            return;
        }
        item.qty++;
    } else {
        if (item.qty > 1) item.qty--;
        else cart.splice(index, 1);
    }
    renderCart();
};

window.removeItem = function(index) {
    cart.splice(index, 1);
    renderCart();
};

window.clearCart = function() {
    if(cart.length === 0) return;
    document.getElementById('clearOrderModal').style.display = 'flex';
};
window.closeClearModal = function() {
    document.getElementById('clearOrderModal').style.display = 'none';
};
window.confirmClearOrder = function() {
    cart = [];
    renderCart();
    window.closeClearModal();
    showToast("Order cleared", "success");
};

function updateTotals(subtotal) {
    const total = subtotal;
    const fmt = (n) => '₱' + n.toLocaleString(undefined, {minimumFractionDigits: 2});

    const subtotalEl = document.getElementById('subtotalDisplay');
    const vatEl = document.getElementById('vatDisplay');
    const totalEl = document.getElementById('totalDisplay');
    if(subtotalEl) subtotalEl.innerText = fmt(subtotal);
    if(vatEl) vatEl.innerText = fmt(0);
    if(totalEl) totalEl.innerText = fmt(total);

    const modalTotal = document.getElementById('modalTotalAmount');
    if(modalTotal) {
        modalTotal.dataset.value = total;
        modalTotal.innerText = fmt(total);
    }
}

window.openPaymentModal = function() {
    if (cart.length === 0) {
        showToast("Cart is empty!", "error");
        return;
    }
    document.getElementById('paymentModal').style.display = 'flex';
    document.getElementById('amountPaid').value = '';
    document.getElementById('changeAmount').innerText = '₱0.00';
    document.getElementById('changeAmount').style.color = 'var(--navy)';
    
    if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
    if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = ''; 
    if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
};

window.openQRModal = function() {
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    const label = document.getElementById('qrAmountLabel');
    if(label) label.innerText = '₱' + total.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('qrModal').style.display = 'flex';
};

window.closeQRModal = function() {
    document.getElementById('qrModal').style.display = 'none';
};

window.closePaymentModal = function() {
    stopNFCListening();
    window.closeQRModal();
    document.getElementById('paymentModal').style.display = 'none';
};

// =========================================================
// NFC PAYMENT INTEGRATION (FIXED)
// =========================================================

window.setPaymentMethod = function(method, btn) {
    currentPaymentMethod = method;
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const cashDiv = document.getElementById('cash-payment-section');
    const digitalDiv = document.getElementById('digital-payment-section');
    const nfcDiv = document.getElementById('nfc-payment-section');
    
    if (method !== 'NFC') stopNFCListening();
    if (method !== 'GCash') window.closeQRModal();
    
    if(cashDiv) cashDiv.style.display = 'none';
    if(digitalDiv) digitalDiv.style.display = 'none';
    if(nfcDiv) nfcDiv.style.display = 'none';
    
    if (method === 'Cash') {
        if(cashDiv) cashDiv.style.display = 'block';
    } else if (method === 'NFC') {
        if(nfcDiv) nfcDiv.style.display = 'block';
        
        const nfcStatus = document.getElementById('nfcStatus');
        if(nfcStatus) {
            nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
            nfcStatus.style.background = 'rgba(255,255,255,0.2)';
            nfcStatus.style.display = 'block';
        }
        
        const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
        const nfcAmountEl = document.getElementById('nfcAmountDisplay');
        if(nfcAmountEl) nfcAmountEl.innerText = total.toLocaleString(undefined, {minimumFractionDigits: 2});
        
        startNFCListening();
    } else {
        if(digitalDiv) digitalDiv.style.display = 'block';
    }
};

function startNFCListening() {
    const nfcStatus = document.getElementById('nfcStatus');
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    
    stopNFCListening();
    
    if(nfcStatus) {
        nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting for ESP32-C3 tap...';
        nfcStatus.style.background = 'rgba(255,255,255,0.2)';
        nfcStatus.style.display = 'block';
    }
    
    Promise.all([
        remove(ref(rtdb, 'nfc_payment/pending')),
        remove(ref(rtdb, 'nfc_payment/status'))
    ]).then(() => {
        return set(ref(rtdb, 'nfc_payment/pending'), {
            amount: total,
            timestamp: Date.now(),
            status: 'waiting'
        });
    }).catch(err => console.error('RTDB write error:', err));
    
    const nfcRef = ref(rtdb, 'nfc_payment/status');
    nfcListener = onValue(nfcRef, (snapshot) => {
        const data = snapshot.val();
        
        if (!data) return;
        
        if (data.status === 'processing') {
            if(nfcStatus) {
                nfcStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing payment...';
            }
        } 
        else if (data.status === 'success') {
            stopNFCListening();
            if(nfcStatus) {
                nfcStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment Successful!';
                nfcStatus.style.background = 'rgba(76, 175, 80, 0.3)';
            }
            
            setTimeout(() => {
                processNFCPayment(data);
            }, 1000);
        }
        else if (data.status === 'failed') {
            stopNFCListening();
            if(nfcStatus) {
                nfcStatus.innerHTML = '<i class="fas fa-times-circle"></i> Payment Failed';
                nfcStatus.style.background = 'rgba(244, 67, 54, 0.3)';
            }
            showToast('NFC Payment Failed', 'error');
        }
    });
}

function stopNFCListening() {
    if(nfcListener) {
        nfcListener();
        nfcListener = null;
    }
    
    Promise.all([
        remove(ref(rtdb, 'nfc_payment/pending')),
        remove(ref(rtdb, 'nfc_payment/status'))
    ]).catch(err => console.log('Cleanup:', err));
    
    const nfcStatus = document.getElementById('nfcStatus');
    if(nfcStatus) {
        nfcStatus.style.display = 'none';
        nfcStatus.style.background = 'rgba(255,255,255,0.2)';
    }
}

async function processNFCPayment(nfcData) {
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    const custName = document.getElementById('customerName')?.value || 'Walk-in';
    const custPhone = document.getElementById('customerPhone')?.value || '-';
    const orderId = document.getElementById('orderNumber').innerText;
    
    const orderData = {
        date: new Date().toISOString(),
        orderId: orderId,
        customer: custName,
        contact: custPhone,
        items: cart,
        total: total,
        method: 'NFC',
        cashReceived: total,
        change: 0,
        reference: nfcData.transactionId || 'NFC-' + Date.now(),
        cashier: localStorage.getItem('userName') || 'Staff',
        status: 'completed'
    };
    
    try {
        await addDoc(collection(db, "transactions"), orderData);
        await sendToKitchen(orderId, cart);
        
        for (let item of cart) {
            const productRef = doc(db, "products", item.id);
            const prodSnap = products.find(p => p.id === item.id);
            if(prodSnap) {
                const currentStock = Number(prodSnap.quantity || 0);
                await updateDoc(productRef, { 
                    quantity: Math.max(0, currentStock - item.qty) 
                });
            }
        }
        
        stopNFCListening();
        
        showReceipt(orderData);
        window.closePaymentModal();
        
        cart = [];
        renderCart();
        generateOrderID();
        
        showToast("✅ NFC Payment Complete - Order sent to kitchen!", "success");
        
    } catch(err) {
        console.error("NFC Payment Error:", err);
        stopNFCListening();
        showToast("❌ Transaction Failed: " + err.message, "error");
    }
}

window.setCash = function(amount) {
    const input = document.getElementById('amountPaid');
    const currentVal = parseFloat(input.value) || 0;
    input.value = currentVal + amount;
    calculateChange();
};

function calculateChange() {
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    const input = document.getElementById('amountPaid');
    const paid = parseFloat(input.value || 0);
    const change = paid - total;
    const changeEl = document.getElementById('changeAmount');
    
    changeEl.innerText = '₱' + change.toLocaleString(undefined, {minimumFractionDigits: 2});
    changeEl.style.color = change >= 0 ? 'var(--navy)' : '#f44336';
}

window.processPayment = async function() {
    const payBtn = document.querySelector('button[onclick="window.processPayment()"]');
    setBtnLoading(payBtn, true);

    try {
        const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
        const custName = document.getElementById('customerName')?.value || 'Walk-in';
        const custPhone = document.getElementById('customerPhone')?.value || '-'; 
        const orderId = document.getElementById('orderNumber').innerText; 
        
        let paid = 0;
        let refNum = '-';

        if (currentPaymentMethod === 'Cash') {
            paid = parseFloat(document.getElementById('amountPaid').value || 0);
            if (paid < total) {
                showToast("Insufficient Cash", "error");
                throw new Error("Insufficient Cash"); 
            }
        } else {
            const refInput = document.getElementById('referenceNumber') || document.getElementById('payment-reference');
            refNum = refInput ? refInput.value : '';
            paid = total; 
            if (!refNum) {
                showToast("Please enter Reference Number", "error");
                throw new Error("Missing Reference"); 
            }
        }

        const orderData = {
            date: new Date().toISOString(),
            orderId: orderId,
            customer: custName,
            contact: custPhone,
            items: cart,
            total: total,
            method: currentPaymentMethod,
            cashReceived: paid,
            change: paid - total,
            reference: refNum,
            cashier: localStorage.getItem('userName') || 'Staff'
        };

        await addDoc(collection(db, "transactions"), orderData);
        await sendToKitchen(orderId, cart);

        for (let item of cart) {
            const productRef = doc(db, "products", item.id);
            const prodSnap = products.find(p => p.id === item.id); 
            if(prodSnap) {
                const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
                const newQty = currentStock - item.qty;
                await updateDoc(productRef, { quantity: newQty });
            }
        }

        showReceipt(orderData);
        window.closePaymentModal();
        
        cart = [];
        renderCart();
        generateOrderID();
        if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
        if(document.getElementById('customerPhone')) document.getElementById('customerPhone').value = '';
        if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';
        
        showToast("Payment Successful!", "success");

    } catch (err) {
        console.error(err);
        if(err.message !== "Insufficient Cash" && err.message !== "Missing Reference") {
            showToast("Transaction Failed", "error");
        }
    } finally {
        setBtnLoading(payBtn, false);
    }
};

window.processDownpayment = async function() {
    if (cart.length === 0) return showToast('Cart is empty', 'error');

    if (currentPaymentMethod !== 'Cash') {
        window.openDigitalDPModal();
        return;
    }

    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    const cashInput = document.getElementById('amountPaid');
    let cashReceived = 0;
    
    if (cashInput) cashReceived = parseFloat(cashInput.value);

    if (isNaN(cashReceived) || cashReceived <= 0) {
        return showToast('Please enter a valid amount', 'error');
    }
    if (cashReceived >= total) {
        return showToast('Amount covers full bill. Please use "Complete Payment".', 'warning');
    }

    const dpBtn = document.querySelector('button[onclick="window.processDownpayment()"]');
    setBtnLoading(dpBtn, true);

    try {
        await saveDownpayment(cashReceived, 'Cash', '');
    } catch (e) {
        console.error(e);
    } finally {
        setBtnLoading(dpBtn, false);
    }
};

window.openDigitalDPModal = function() {
    document.getElementById('lbl-digi-method').innerText = currentPaymentMethod;
    document.getElementById('digi-dp-amount').value = '';
    const mainRef = document.getElementById('referenceNumber');
    document.getElementById('digi-dp-ref').value = mainRef ? mainRef.value : '';
    document.getElementById('digitalDownpaymentModal').style.display = 'flex';
    document.getElementById('digi-dp-amount').focus();
};
window.closeDigitalDPModal = function() {
    document.getElementById('digitalDownpaymentModal').style.display = 'none';
};
window.confirmDigitalDP = async function() {
    const amountVal = parseFloat(document.getElementById('digi-dp-amount').value);
    const refVal = document.getElementById('digi-dp-ref').value;
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);

    if (isNaN(amountVal) || amountVal <= 0) return showToast("Please enter a valid amount", "error");
    if (amountVal >= total) return showToast("Amount covers full bill. Use 'Complete Payment'", "warning");
    if (!refVal.trim()) return showToast("Reference Number is required for Digital payments", "error");

    const confirmBtn = document.querySelector('#digitalDownpaymentModal button.btn-primary');
    setBtnLoading(confirmBtn, true);

    try {
        window.closeDigitalDPModal();
        await saveDownpayment(amountVal, currentPaymentMethod, refVal);
    } catch (e) {
        console.error(e);
    } finally {
        setBtnLoading(confirmBtn, false);
    }
};

async function saveDownpayment(amountPaid, method, reference) {
    const total = parseFloat(document.getElementById('modalTotalAmount').dataset.value || 0);
    const balance = total - amountPaid;
    const orderId = document.getElementById('orderNumber').innerText; 

    const orderData = {
        orderId: orderId,
        date: new Date().toISOString(),
        items: cart,
        total: total,
        cashReceived: amountPaid,
        change: 0, 
        balance: balance,
        method: method,
        reference: reference,
        status: 'Partial',
        cashier: localStorage.getItem('userName') || 'Staff',
        customer: document.getElementById('customerName')?.value || 'Walk-in',
        contact: document.getElementById('customerPhone')?.value || '-'
    };

    try {
        await addDoc(collection(db, "transactions"), orderData); 
        await sendToKitchen(orderId, cart);

        for (let item of cart) {
            const productRef = doc(db, "products", item.id);
            const prodSnap = products.find(p => p.id === item.id); 
            if(prodSnap) {
                const currentStock = Number(prodSnap.quantity || prodSnap.stock || 0);
                const newQty = currentStock - item.qty;
                await updateDoc(productRef, { quantity: newQty });
            }
        }

        prepareReceiptUI(orderData, total, amountPaid, balance, method, reference);
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('receiptModal').style.display = 'flex';
        
        cart = [];
        renderCart();
        generateOrderID();
        if(document.getElementById('amountPaid')) document.getElementById('amountPaid').value = '';
        if(document.getElementById('customerName')) document.getElementById('customerName').value = '';
        if(document.getElementById('referenceNumber')) document.getElementById('referenceNumber').value = '';

        showToast('Downpayment recorded!', 'success');
    } catch (error) {
        console.error("Error saving order: ", error);
        showToast('Error saving order', 'error');
        throw error; 
    }
}

function showReceipt(data) {
    prepareReceiptUI(data, data.total, data.cashReceived, 0, data.method, data.reference);
    document.getElementById('receiptModal').style.display = 'flex';
}

function prepareReceiptUI(data, total, paid, balance, method, refNum) {
    document.getElementById('rec-date').innerText = new Date(data.date).toLocaleString();
    document.getElementById('rec-orderId').innerText = data.orderId;
    document.getElementById('rec-cashier').innerText = data.cashier;
    if(document.getElementById('rec-customer')) document.getElementById('rec-customer').innerText = data.customer;
    if(document.getElementById('rec-contact')) document.getElementById('rec-contact').innerText = data.contact || '-';

    const itemsDiv = document.getElementById('rec-items');
    itemsDiv.innerHTML = '';
    data.items.forEach(item => {
        itemsDiv.innerHTML += `<div class="rec-item-row"><span>${item.qty}x ${item.name}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>`;
    });

    document.getElementById('rec-total').innerText = total.toFixed(2);
    document.getElementById('rec-method').innerText = method;

    const rowBalance = document.getElementById('row-balance');
    if(balance > 0) {
        if(rowBalance) { rowBalance.style.display = 'flex'; document.getElementById('rec-balance').innerText = balance.toFixed(2); }
        document.getElementById('row-change').style.display = 'none';
    } else {
        if(rowBalance) rowBalance.style.display = 'none';
        document.getElementById('row-change').style.display = 'flex';
        const change = paid - total;
        document.getElementById('rec-change').innerText = (change > 0 ? change : 0).toFixed(2);
    }

    if(method === 'Cash') {
        document.getElementById('row-cash-paid').style.display = 'flex';
        document.getElementById('rec-cash').innerText = paid.toFixed(2);
        document.getElementById('row-ref').style.display = 'none';
    } else {
        document.getElementById('row-cash-paid').style.display = 'none';
        document.getElementById('row-change').style.display = 'none';
        document.getElementById('row-ref').style.display = 'flex';
        document.getElementById('rec-ref').innerText = refNum;
    }
}

window.closeReceiptModal = function() { document.getElementById('receiptModal').style.display = 'none'; };
window.printReceipt = function() { window.print(); };

function generateOrderID() {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('orderNumber').innerText = `#ORD-${randomId}`;
}

function showToast(msg, type) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = type === 'success' 
        ? `<i class="fas fa-check-circle"></i> ${msg}` 
        : `<i class="fas fa-exclamation-circle"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setBtnLoading(btn, isLoading) {
    if(!btn) return;
    if(isLoading) {
        btn.dataset.originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    } else {
        btn.disabled = false;
        if(btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
    }
}

async function sendToKitchen(orderId, cartItems) {
    if (!cartItems || cartItems.length === 0) return;
    try {
        const itemsString = cartItems.map(item => `${item.qty}x ${item.name}`).join("\n");
        await set(ref(rtdb, 'kitchen_queue/current_order'), {
            table: orderId,
            items: itemsString,
            timestamp: Date.now()
        });
        console.log("✅ Sent to Kitchen!");
    } catch (e) {
        console.error("❌ Error sending to kitchen:", e);
    }
}