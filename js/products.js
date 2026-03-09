







// import { 
//     db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
// } from './firebase.js';

// let allProducts = [];
// let allCategories = [];

// const defaultCategories = [
//     { id: 'lechon', name: 'Whole Lechon', color: '#ff4e00', icon: 'fas fa-piggy-bank' },
//     { id: 'belly', name: 'Lechon Belly', color: '#ffc400', icon: 'fas fa-bacon' },
//     { id: 'meals', name: 'Value Meals', color: '#4caf50', icon: 'fas fa-utensils' },
//     { id: 'extras', name: 'Extras/Drinks', color: '#2196f3', icon: 'fas fa-wine-bottle' }
// ];

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Date
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // 2. Categories
//     const catQ = query(collection(db, "categories"));
//     onSnapshot(catQ, (snapshot) => {
//         allCategories = [];
//         snapshot.forEach((doc) => allCategories.push({ id: doc.id, ...doc.data() }));
//         if (allCategories.length === 0) allCategories = defaultCategories;
//         setupCategoryDropdowns();
//         renderProducts(allProducts);
//         updateStats();
//     });
    
//     // 3. Products
//     const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
//     onSnapshot(q, (snapshot) => {
//         allProducts = [];
//         snapshot.forEach((doc) => allProducts.push({ id: doc.id, ...doc.data() }));
//         renderProducts(allProducts);
//         updateStats();
//     });

//     // 4. Filters
//     document.getElementById('searchInput')?.addEventListener('keyup', filterProducts);
//     document.getElementById('categoryFilter')?.addEventListener('change', filterProducts);
//     document.getElementById('statusFilter')?.addEventListener('change', filterProducts);
// });

// // --- UI HELPERS ---

// // Toast Notification Function
// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
    
//     const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
//     toast.innerHTML = `
//         <i class="fas ${icon} toast-icon"></i>
//         <span class="toast-msg">${message}</span>
//     `;
    
//     container.appendChild(toast);
    
//     // Remove after 3 seconds
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         toast.style.transform = 'translateX(100%)';
//         toast.style.transition = 'all 0.3s ease';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }

// // --- RENDER ---
// function renderProducts(products) {
//     const grid = document.getElementById('productsGrid');
//     if(!grid) return;
//     grid.innerHTML = '';

//     if (products.length === 0) {
//         grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:30px;color:#aaa;">No products found.</p>';
//         return;
//     }

//     products.forEach(p => {
//         const cat = allCategories.find(c => c.id === p.category) || { name: p.category, color: '#ccc', icon: 'fas fa-box' };
        
//         let headerContent = '';
//         if (p.image && p.image.trim() !== "") {
//             headerContent = `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
//                              <div class="fallback-icon-box" style="display:none; background:${cat.color}20; color:${cat.color}">
//                                 <i class="${cat.icon}"></i>
//                              </div>`;
//         } else {
//             headerContent = `<div class="fallback-icon-box" style="background:${cat.color}20; color:${cat.color}">
//                                 <i class="${cat.icon}"></i>
//                              </div>`;
//         }

//         const qty = p.quantity || 0;
//         const qtyColor = qty < 10 ? '#f44336' : '#8d97ad'; 

//         const card = document.createElement('div');
//         card.className = 'product-card';
//         card.innerHTML = `
//             <div class="card-header-area">
//                 ${headerContent}
//                 <div class="card-badges">
//                     ${p.kls ? `<span class="badge-kls">${p.kls}</span>` : '<span></span>'}
//                     <div class="status-dot ${p.active ? 'active' : 'inactive'}"></div>
//                 </div>
//             </div>
//             <div class="product-body">
//                 <span class="product-cat" style="color:${cat.color}">${cat.name}</span>
//                 <h4 class="product-title">${p.name}</h4>
//                 <div class="price-row">
//                     <span class="price">₱${parseFloat(p.price).toLocaleString()}</span>
//                     <span class="qty" style="color:${qtyColor}; font-size:12px; font-weight:600;">Qty: ${qty}</span>
//                 </div>
//             </div>
//             <div class="product-footer">
//                 <button class="btn-action btn-edit" onclick="window.editProduct('${p.id}')"><i class="fas fa-edit"></i> Edit</button>
//                 <button class="btn-action btn-delete" onclick="window.deleteProduct('${p.id}', '${p.name.replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>
//             </div>
//         `;
//         grid.appendChild(card);
//     });
// }

// function updateStats() {
//     const totalEl = document.getElementById('total-products-count');
//     const catEl = document.getElementById('total-categories-count');
//     if(totalEl) totalEl.innerText = allProducts.length;
//     if(catEl) catEl.innerText = allCategories.length;
// }

// function setupCategoryDropdowns() {
//     const filter = document.getElementById('categoryFilter');
//     const modalSelect = document.getElementById('prodCategory');
//     if(!filter || !modalSelect) return;

//     filter.innerHTML = '<option value="all">All Categories</option>';
//     modalSelect.innerHTML = ''; 

//     allCategories.forEach(c => {
//         filter.innerHTML += `<option value="${c.id}">${c.name}</option>`;
//         modalSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
//     });
// }

// function filterProducts() {
//     const search = document.getElementById('searchInput').value.toLowerCase();
//     const cat = document.getElementById('categoryFilter').value;
//     const stat = document.getElementById('statusFilter').value;

//     const filtered = allProducts.filter(p => {
//         const matchSearch = p.name.toLowerCase().includes(search);
//         const matchCat = cat === 'all' || p.category === cat;
//         const isActive = p.active === true || p.active === "true"; 
//         const matchStat = stat === 'all' || (stat === 'active' ? isActive : !isActive);
//         return matchSearch && matchCat && matchStat;
//     });
//     renderProducts(filtered);
// }

// // --- CRUD PRODUCTS ---

// window.saveProduct = async function() {
//     const id = document.getElementById('editProductId').value;
//     const name = document.getElementById('prodName').value;
//     const price = parseFloat(document.getElementById('prodPrice').value);
//     const quantity = parseInt(document.getElementById('prodQuantity').value || 0);
//     const category = document.getElementById('prodCategory').value;
//     const image = document.getElementById('prodImage').value;
//     const kls = document.getElementById('prodKls').value;
//     const status = document.getElementById('prodStatus').value === "true";

//     if(!name || !price) { 
//         showToast("Name and Price are required", "error"); 
//         return; 
//     }

//     const data = { name, price, quantity, category, image, kls, active: status, updatedAt: new Date() };

//     try {
//         if(id) {
//             await updateDoc(doc(db, "products", id), data);
//             showToast("Product updated successfully!");
//         } else {
//             data.createdAt = new Date();
//             await addDoc(collection(db, "products"), data);
//             showToast("Product added successfully!");
//         }
//         window.closeModal('productModal');
//     } catch(e) {
//         showToast("Error saving: " + e.message, "error");
//     }
// };

// window.editProduct = function(id) {
//     const p = allProducts.find(x => x.id === id);
//     if(!p) return;
//     document.getElementById('editProductId').value = p.id;
//     document.getElementById('modalTitle').innerText = "Edit Product";
//     document.getElementById('prodName').value = p.name;
//     document.getElementById('prodPrice').value = p.price;
//     document.getElementById('prodQuantity').value = p.quantity || 0;
//     document.getElementById('prodCategory').value = p.category;
//     document.getElementById('prodStatus').value = p.active ? "true" : "false";
//     document.getElementById('prodImage').value = p.image || "";
//     document.getElementById('prodKls').value = p.kls || "";
//     window.openProductModal();
// };

// // Open Delete Modal (Instead of Alert)
// window.deleteProduct = function(id, name) {
//     document.getElementById('deleteTargetId').value = id;
//     document.getElementById('deleteProductName').innerText = name;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// // Confirm Delete Action
// window.confirmDeleteAction = async function() {
//     const id = document.getElementById('deleteTargetId').value;
//     try {
//         await deleteDoc(doc(db, "products", id));
//         showToast("Product deleted successfully");
//         window.closeModal('deleteModal');
//     } catch(e) {
//         showToast("Delete failed: " + e.message, "error");
//     }
// };

// // --- CRUD CATEGORIES ---

// window.saveCategory = async function() {
//     const name = document.getElementById('catName').value;
//     const color = document.getElementById('catColor').value;
//     const icon = document.getElementById('catIcon').value;

//     if(!name) { showToast("Category name required", "error"); return; }
    
//     // Simple ID gen
//     const id = name.toLowerCase().replace(/\s+/g, '-');

//     try {
//         await addDoc(collection(db, "categories"), {
//             id: id, name: name, color: color, icon: icon
//         });
//         showToast("Category added!");
//         window.closeModal('categoryModal');
//     } catch(e) {
//         showToast("Error: " + e.message, "error");
//     }
// };

// // --- MODAL UTILS ---
// window.openProductModal = function() {
//     if(document.getElementById('modalTitle').innerText !== "Edit Product") {
//         document.getElementById('productForm').reset();
//         document.getElementById('editProductId').value = "";
//     }
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.openCategoryModal = function() {
//     document.getElementById('categoryForm').reset();
//     document.getElementById('categoryModal').style.display = 'flex';
// };

// window.closeModal = function(id) {
//     document.getElementById(id).style.display = 'none';
//     if(id === 'productModal') {
//         setTimeout(() => {
//             document.getElementById('modalTitle').innerText = "Add New Product";
//             document.getElementById('productForm').reset();
//         }, 200);
//     }
// };






// import { 
//     db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
// } from './firebase.js';

// let allProducts = [];
// let allCategories = [];

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Date
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // 2. Load Data
//     loadCategories();
//     loadProducts();
// });

// // --- LOAD DATA ---
// function loadCategories() {
//     const q = query(collection(db, "categories"), orderBy("name", "asc"));
//     onSnapshot(q, (snapshot) => {
//         allCategories = [];
//         const select = document.getElementById('prodCategory');
//         if(select) select.innerHTML = '<option value="" disabled selected>Select Category</option>';

//         snapshot.forEach(docSnap => {
//             const data = docSnap.data();
//             allCategories.push({ id: docSnap.id, ...data });
//             if(select) select.innerHTML += `<option value="${data.name}">${data.name}</option>`;
//         });
//     });
// }

// function loadProducts() {
//     const q = query(collection(db, "products"));
//     onSnapshot(q, (snapshot) => {
//         allProducts = [];
//         const grid = document.getElementById('productsGrid');
//         if(!grid) return;
//         grid.innerHTML = '';

//         snapshot.forEach(docSnap => {
//             allProducts.push({ id: docSnap.id, ...docSnap.data() });
//         });

//         if (allProducts.length === 0) {
//             grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888;">No products found.</p>`;
//             return;
//         }

//         allProducts.forEach(prod => {
//             const catObj = allCategories.find(c => c.name === prod.category) || { color: '#888', icon: 'fa-box' };
//             const card = `
//                 <div class="product-card">
//                     <div class="card-image">
//                         ${prod.image ? `<img src="${prod.image}" alt="${prod.name}">` : 
//                         `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:40px;"><i class="fas ${catObj.icon || 'fa-image'}"></i></div>`}
//                     </div>
//                     <div class="card-body">
//                         <div class="card-category" style="color:${catObj.color}">
//                             <i class="fas ${catObj.icon || 'fa-tag'}"></i> ${prod.category}
//                         </div>
//                         <div class="card-title">${prod.name}</div>
//                         <div class="card-desc">${prod.description || 'No description.'}</div>
                        
//                         <div class="card-footer">
//                             <div class="price-tag">₱${parseFloat(prod.price || 0).toFixed(2)}</div>
//                             <div class="card-actions">
//                                 <button class="action-btn edit-btn" onclick="window.editProduct('${prod.id}')"><i class="fas fa-pen"></i></button>
//                                 <button class="action-btn delete-btn" onclick="window.deleteProduct('${prod.id}', '${prod.name}')"><i class="fas fa-trash"></i></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             grid.innerHTML += card;
//         });
//     });
// }

// // --- PRODUCT ACTIONS ---

// window.handleProductSubmit = async function(e) {
//     e.preventDefault();
//     const id = document.getElementById('editProductId').value;
//     const name = document.getElementById('prodName').value;
//     const category = document.getElementById('prodCategory').value;
//     const price = parseFloat(document.getElementById('prodPrice').value);
//     const desc = document.getElementById('prodDesc').value;
    
//     // Simple Image Handler (In real app, use Storage)
//     const imgPreview = document.querySelector('#imagePreview img');
//     const image = imgPreview ? imgPreview.src : null;

//     const data = {
//         name, category, price, description: desc, image,
//         lastUpdated: new Date()
//     };

//     try {
//         if (id) {
//             await updateDoc(doc(db, "products", id), data);
//             showToast("Product updated");
//         } else {
//             // Also init inventory fields for new product
//             data.stock = 0;
//             data.lowStockAlert = 5;
//             await addDoc(collection(db, "products"), data);
//             showToast("Product added");
//         }
//         window.closeModal('productModal');
//     } catch (err) {
//         showToast(err.message, "error");
//     }
// };

// window.saveCategory = async function() {
//     const name = document.getElementById('catName').value;
//     const color = document.getElementById('catColor').value;
//     const icon = document.getElementById('catIcon').value;

//     if(!name) { showToast("Category name required", "error"); return; }
    
//     const id = name.toLowerCase().replace(/\s+/g, '-');

//     try {
//         await addDoc(collection(db, "categories"), {
//             id: id, name: name, color: color, icon: icon
//         });
//         showToast("Category added!");
//         window.closeModal('categoryModal');
//     } catch(e) {
//         showToast("Error: " + e.message, "error");
//     }
// };

// window.editProduct = function(id) {
//     const prod = allProducts.find(p => p.id === id);
//     if (!prod) return;

//     document.getElementById('editProductId').value = prod.id;
//     document.getElementById('prodName').value = prod.name;
//     document.getElementById('prodCategory').value = prod.category;
//     document.getElementById('prodPrice').value = prod.price;
//     document.getElementById('prodDesc').value = prod.description || '';
    
//     const preview = document.getElementById('imagePreview');
//     if (prod.image) {
//         preview.innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
//     } else {
//         preview.innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to upload image</span>`;
//     }

//     document.getElementById('modalTitle').innerText = "Edit Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.deleteProduct = function(id, name) {
//     document.getElementById('deleteTargetId').value = id;
//     document.getElementById('deleteProductName').innerText = name;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// window.confirmDelete = async function() {
//     const id = document.getElementById('deleteTargetId').value;
//     try {
//         await deleteDoc(doc(db, "products", id));
//         showToast("Product deleted");
//         window.closeModal('deleteModal');
//     } catch (e) {
//         showToast(e.message, "error");
//     }
// };

// // --- UTILS ---

// window.openProductModal = function() {
//     document.getElementById('productForm').reset();
//     document.getElementById('editProductId').value = "";
//     document.getElementById('imagePreview').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to upload image</span>`;
//     document.getElementById('modalTitle').innerText = "Add New Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.openCategoryModal = function() {
//     document.getElementById('categoryForm').reset();
//     document.getElementById('categoryModal').style.display = 'flex';
// };

// window.closeModal = function(id) {
//     document.getElementById(id).style.display = 'none';
// };

// // NEW: Logout Modal Function
// window.openLogoutModal = function() {
//     const modal = document.getElementById('logoutModal');
//     if(modal) modal.style.display = 'flex';
// };

// window.previewImage = function(input) {
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             document.getElementById('imagePreview').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// };

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }






// import { 
//     db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
// } from './firebase.js';

// let allProducts = [];
// let allCategories = [];
// let allInventory = []; 

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Date Display
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // 2. Load Data
//     loadCategories();
//     loadInventoryItems();
//     loadProducts();
// });

// // ============================================================
// // 1. LOAD DATA
// // ============================================================

// function loadInventoryItems() {
//     const q = query(collection(db, "inventory"), orderBy("name"));
//     onSnapshot(q, (snapshot) => {
//         allInventory = [];
//         snapshot.forEach(docSnap => {
//             allInventory.push({ id: docSnap.id, ...docSnap.data() });
//         });
//     });
// }

// function loadCategories() {
//     const q = query(collection(db, "categories"), orderBy("name", "asc"));
//     onSnapshot(q, (snapshot) => {
//         allCategories = [];
//         const select = document.getElementById('prodCategory');
//         let optionsHTML = '<option value="" disabled selected>Select Category</option>';

//         snapshot.forEach(docSnap => {
//             const data = docSnap.data();
//             allCategories.push({ id: docSnap.id, ...data });
//             optionsHTML += `<option value="${data.name}">${data.name}</option>`;
//         });

//         if(select) select.innerHTML = optionsHTML;
//     });
// }

// function loadProducts() {
//     const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
//     onSnapshot(q, (snapshot) => {
//         allProducts = [];
//         const grid = document.getElementById('productsGrid');
//         if(!grid) return;
//         grid.innerHTML = '';

//         snapshot.forEach(docSnap => {
//             allProducts.push({ id: docSnap.id, ...docSnap.data() });
//         });

//         if (allProducts.length === 0) {
//             grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888; padding: 40px;">No products found.</p>`;
//             return;
//         }

//         allProducts.forEach(prod => {
//             const catObj = allCategories.find(c => c.name === prod.category) || { color: '#888', icon: 'fa-box' };
            
//             // Badge Logic
//             let recipeBadge = '';
//             if (prod.ingredients && prod.ingredients.length > 0) {
//                 const count = prod.ingredients.length;
//                 recipeBadge = `
//                     <div style="font-size:11px; color:#27ae60; margin-top:8px; display:inline-flex; align-items:center; gap:5px; background:#e8f8f5; padding:4px 8px; border-radius:4px;">
//                         <i class="fas fa-link" style="font-size:10px;"></i> 
//                         <span>Linked to ${count} Item${count > 1 ? 's' : ''}</span>
//                     </div>`;
//             }

//             const card = `
//                 <div class="product-card">
//                     <div class="card-image">
//                         ${prod.image ? `<img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==';">` : 
//                         `<div class="placeholder-img"><i class="fas ${catObj.icon || 'fa-image'}"></i></div>`}
//                     </div>
//                     <div class="card-body">
//                         <div class="card-category" style="color:${catObj.color};">
//                             <i class="fas ${catObj.icon || 'fa-tag'}"></i> ${prod.category}
//                         </div>
//                         <div class="card-title">${prod.name}</div>
//                         <div class="card-desc">${prod.description || 'No description.'}</div>
                        
//                         ${recipeBadge}

//                         <div class="card-footer">
//                             <div class="price-tag">₱${parseFloat(prod.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
//                             <div class="card-actions">
//                                 <button class="action-btn edit-btn" onclick="window.editProduct('${prod.id}')"><i class="fas fa-pen"></i></button>
//                                 <button class="action-btn delete-btn" onclick="window.deleteProduct('${prod.id}', '${prod.name}')"><i class="fas fa-trash"></i></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             grid.innerHTML += card;
//         });
//     });
// }

// // ============================================================
// // 2. RECIPE / INGREDIENT LOGIC
// // ============================================================

// window.addIngredientRow = function(data = null) {
//     const container = document.getElementById('ingredients-container');
    
//     const div = document.createElement('div');
//     div.className = 'recipe-row';
//     div.style.cssText = "display: flex; gap: 10px; margin-bottom: 8px; align-items: center;";
    
//     // Create Inventory Select Options
//     let options = `<option value="" disabled selected>Select Item</option>`;
//     allInventory.forEach(item => {
//         options += `<option value="${item.id}">${item.name} (${item.unit})</option>`;
//     });

//     div.innerHTML = `
//         <select class="form-input ing-select" style="flex: 1;">
//             ${options}
//         </select>
//         <input type="hidden" class="ing-qty" value="1">
//         <button type="button" onclick="this.parentElement.remove()" class="btn-remove-ing" title="Remove Ingredient">
//             <i class="fas fa-trash"></i>
//         </button>
//     `;

//     container.appendChild(div);

//     if (data) {
//         div.querySelector('.ing-select').value = data.inventoryId;
//     }
// }

// // ============================================================
// // 3. IMAGE HANDLERS (NEW)
// // ============================================================

// window.toggleImageMode = function(mode) {
//     const btnFile = document.getElementById('btn-mode-file');
//     const btnUrl = document.getElementById('btn-mode-url');
//     const containerFile = document.getElementById('container-file');
//     const containerUrl = document.getElementById('container-url');

//     if (mode === 'file') {
//         btnFile.classList.add('active');
//         btnUrl.classList.remove('active');
//         containerFile.style.display = 'flex';
//         containerUrl.style.display = 'none';
//     } else {
//         btnFile.classList.remove('active');
//         btnUrl.classList.add('active');
//         containerFile.style.display = 'none';
//         containerUrl.style.display = 'block';
//     }
// }

// window.previewImageFromFile = function(input) {
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             // Display preview
//             document.getElementById('imagePreviewFile').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
//             // Save to hidden field
//             document.getElementById('finalImageSrc').value = e.target.result;
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }

// window.previewImageFromUrl = function(url) {
//     if(url.trim() !== "") {
//         document.getElementById('imagePreviewUrl').innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src=''; this.parentElement.innerHTML='<i class=\\'fas fa-exclamation-triangle\\'></i><span>Broken Link</span>';">`;
//         document.getElementById('finalImageSrc').value = url;
//     } else {
//         document.getElementById('imagePreviewUrl').innerHTML = `<i class="fas fa-link"></i><span>Preview will appear here</span>`;
//         document.getElementById('finalImageSrc').value = "";
//     }
// }

// // ============================================================
// // 4. ACTIONS
// // ============================================================

// window.handleProductSubmit = async function(e) {
//     e.preventDefault();
//     const btn = document.getElementById('btnSaveProduct');
//     btn.disabled = true;
//     btn.innerText = "Saving...";

//     const id = document.getElementById('editProductId').value;
//     const name = document.getElementById('prodName').value;
//     const category = document.getElementById('prodCategory').value;
//     const price = parseFloat(document.getElementById('prodPrice').value);
//     const desc = document.getElementById('prodDesc').value;
//     const image = document.getElementById('finalImageSrc').value; // Get from hidden field
    
//     // Ingredients
//     const ingredients = [];
//     document.querySelectorAll('.recipe-row').forEach(row => {
//         const invId = row.querySelector('.ing-select').value;
//         const qty = parseFloat(row.querySelector('.ing-qty').value) || 1; 
//         if(invId) ingredients.push({ inventoryId: invId, quantity: qty });
//     });

//     const data = {
//         name, category, price, description: desc, image,
//         ingredients: ingredients,
//         updatedAt: new Date()
//     };

//     try {
//         if (id) {
//             await updateDoc(doc(db, "products", id), data);
//             showToast("Product updated successfully");
//         } else {
//             data.createdAt = new Date();
//             data.active = true;
//             data.stock = 0; 
//             await addDoc(collection(db, "products"), data);
//             showToast("Product added successfully");
//         }
//         window.closeModal('productModal');
//     } catch (err) {
//         showToast("Error: " + err.message, "error");
//         console.error(err);
//     } finally {
//         btn.disabled = false;
//         btn.innerText = "Save Product";
//     }
// };

// window.handleCategorySubmit = async function(e) {
//     e.preventDefault();
//     const name = document.getElementById('catName').value.trim();
//     const color = document.getElementById('catColor').value;
//     const icon = document.getElementById('catIcon').value;

//     if(!name) { showToast("Category name required", "error"); return; }
    
//     const id = name.toLowerCase().replace(/\s+/g, '-'); 

//     try {
//         await addDoc(collection(db, "categories"), {
//             id: id, name: name, color: color, icon: icon
//         });
//         showToast("Category added!");
//         window.closeModal('categoryModal');
//     } catch(e) {
//         showToast("Error: " + e.message, "error");
//     }
// };

// window.editProduct = function(id) {
//     const prod = allProducts.find(p => p.id === id);
//     if (!prod) return;

//     document.getElementById('editProductId').value = prod.id;
//     document.getElementById('prodName').value = prod.name;
//     document.getElementById('prodCategory').value = prod.category;
//     document.getElementById('prodPrice').value = prod.price;
//     document.getElementById('prodDesc').value = prod.description || '';
//     document.getElementById('finalImageSrc').value = prod.image || "";
    
//     // Ingredients
//     document.getElementById('ingredients-container').innerHTML = ''; 
//     if (prod.ingredients && Array.isArray(prod.ingredients)) {
//         prod.ingredients.forEach(ing => {
//             window.addIngredientRow(ing);
//         });
//     }

//     // IMAGE LOGIC (Determine Mode)
//     // If it starts with 'http', it's likely a URL. Otherwise it's empty or a file (Base64)
//     const isUrl = prod.image && prod.image.startsWith('http');
    
//     if (isUrl) {
//         window.toggleImageMode('url');
//         document.getElementById('productImageUrl').value = prod.image;
//         document.getElementById('imagePreviewUrl').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
//     } else {
//         window.toggleImageMode('file');
//         // Reset URL input
//         document.getElementById('productImageUrl').value = "";
        
//         if (prod.image) {
//              document.getElementById('imagePreviewFile').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
//         } else {
//              document.getElementById('imagePreviewFile').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to Upload</span>`;
//         }
//     }

//     document.getElementById('modalTitle').innerText = "Edit Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.deleteProduct = function(id, name) {
//     document.getElementById('deleteTargetId').value = id;
//     document.getElementById('deleteProductName').innerText = name;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// window.confirmDelete = async function() {
//     const id = document.getElementById('deleteTargetId').value;
//     if(!id) return;

//     try {
//         await deleteDoc(doc(db, "products", id));
//         showToast("Product deleted");
//         window.closeModal('deleteModal');
//     } catch (e) {
//         showToast(e.message, "error");
//     }
// };

// // ============================================================
// // 5. UI UTILITIES
// // ============================================================

// window.openProductModal = function() {
//     document.getElementById('productForm').reset();
//     document.getElementById('editProductId').value = "";
//     document.getElementById('finalImageSrc').value = "";
    
//     // Reset Image UI
//     window.toggleImageMode('file');
//     document.getElementById('imagePreviewFile').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to Upload</span>`;
//     document.getElementById('imagePreviewUrl').innerHTML = `<i class="fas fa-link"></i><span>Preview</span>`;
    
//     document.getElementById('ingredients-container').innerHTML = '';
//     document.getElementById('modalTitle').innerText = "Add New Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.openCategoryModal = function() {
//     document.getElementById('categoryForm').reset();
//     document.getElementById('categoryModal').style.display = 'flex';
// };

// window.closeModal = function(id) {
//     document.getElementById(id).style.display = 'none';
// };

// window.openLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'flex';
// };

// window.toggleImageMode = toggleImageMode;
// window.previewImageFromFile = previewImageFromFile;
// window.previewImageFromUrl = previewImageFromUrl;

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }
// /* ============================================================
//    INJECT THIS AT THE BOTTOM OF js/products.js
//    (This fixes the "Add Product" button not clicking)
//    ============================================================ */
// window.openProductModal = openProductModal;
// window.closeModal = closeModal;
// window.handleProductSubmit = handleProductSubmit;
// window.toggleImageMode = toggleImageMode;
// window.previewImageFromFile = previewImageFromFile;
// window.previewImageFromUrl = previewImageFromUrl;
// window.openCategoryModal = openCategoryModal;
// window.handleCategorySubmit = handleCategorySubmit;
// window.confirmDelete = confirmDelete; 
// window.openLogoutModal = openLogoutModal;









// import { 
//     db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
// } from './firebase.js';

// let allProducts = [];
// let allCategories = [];
// let allInventory = []; 

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Date Display
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//     // 2. Load Data
//     loadCategories();
//     loadInventoryItems();
//     loadProducts();
// });

// // ============================================================
// // 1. LOAD DATA
// // ============================================================

// function loadInventoryItems() {
//     const q = query(collection(db, "inventory"), orderBy("name"));
//     onSnapshot(q, (snapshot) => {
//         allInventory = [];
//         snapshot.forEach(docSnap => {
//             allInventory.push({ id: docSnap.id, ...docSnap.data() });
//         });
//     });
// }

// function loadCategories() {
//     const q = query(collection(db, "categories"), orderBy("name", "asc"));
//     onSnapshot(q, (snapshot) => {
//         allCategories = [];
//         const select = document.getElementById('prodCategory');
//         let optionsHTML = '<option value="" disabled selected>Select Category</option>';

//         snapshot.forEach(docSnap => {
//             const data = docSnap.data();
//             allCategories.push({ id: docSnap.id, ...data });
//             optionsHTML += `<option value="${data.name}">${data.name}</option>`;
//         });

//         if(select) select.innerHTML = optionsHTML;
//     });
// }

// function loadProducts() {
//     const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
//     onSnapshot(q, (snapshot) => {
//         allProducts = [];
//         const grid = document.getElementById('productsGrid');
//         if(!grid) return;
//         grid.innerHTML = '';

//         snapshot.forEach(docSnap => {
//             allProducts.push({ id: docSnap.id, ...docSnap.data() });
//         });

//         if (allProducts.length === 0) {
//             grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888; padding: 40px;">No products found.</p>`;
//             return;
//         }

//         allProducts.forEach(prod => {
//             const catObj = allCategories.find(c => c.name === prod.category) || { color: '#888', icon: 'fa-box' };
            
//             // Stock Level Badge Logic
//             const stockQty = prod.quantity || 0;
//             const stockColor = stockQty < 5 ? '#e74c3c' : '#27ae60';

//             // Recipe Link Badge Logic
//             let recipeBadge = '';
//             if (prod.ingredients && prod.ingredients.length > 0) {
//                 const count = prod.ingredients.length;
//                 recipeBadge = `
//                     <div style="font-size:11px; color:#27ae60; margin-top:8px; display:inline-flex; align-items:center; gap:5px; background:#e8f8f5; padding:4px 8px; border-radius:4px;">
//                         <i class="fas fa-link" style="font-size:10px;"></i> 
//                         <span>Linked to ${count} Item${count > 1 ? 's' : ''}</span>
//                     </div>`;
//             }

//             const card = `
//                 <div class="product-card">
//                     <div class="card-image">
//                         ${prod.image ? `<img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==';">` : 
//                         `<div class="placeholder-img"><i class="fas ${catObj.icon || 'fa-image'}"></i></div>`}
//                     </div>
//                     <div class="card-body">
//                         <div style="display: flex; justify-content: space-between; align-items: center;">
//                             <div class="card-category" style="color:${catObj.color};">
//                                 <i class="fas ${catObj.icon || 'fa-tag'}"></i> ${prod.category}
//                             </div>
//                             <span style="font-size: 11px; font-weight: bold; color: ${stockColor}">
//                                 Stock: ${stockQty}
//                             </span>
//                         </div>
//                         <div class="card-title">${prod.name}</div>
//                         <div class="card-desc">${prod.description || 'No description.'}</div>
                        
//                         ${recipeBadge}

//                         <div class="card-footer">
//                             <div class="price-tag">₱${parseFloat(prod.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
//                             <div class="card-actions">
//                                 <button class="action-btn edit-btn" onclick="window.editProduct('${prod.id}')"><i class="fas fa-pen"></i></button>
//                                 <button class="action-btn delete-btn" onclick="window.deleteProduct('${prod.id}', '${prod.name}')"><i class="fas fa-trash"></i></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             grid.innerHTML += card;
//         });
//     });
// }

// // ============================================================
// // 2. RECIPE / INGREDIENT LOGIC
// // ============================================================

// window.addIngredientRow = function(data = null) {
//     const container = document.getElementById('ingredients-container');
    
//     const div = document.createElement('div');
//     div.className = 'recipe-row';
//     div.style.cssText = "display: flex; gap: 10px; margin-bottom: 8px; align-items: center;";
    
//     let options = `<option value="" disabled selected>Select Item</option>`;
//     allInventory.forEach(item => {
//         options += `<option value="${item.id}">${item.name} (${item.unit})</option>`;
//     });

//     div.innerHTML = `
//         <select class="form-input ing-select" style="flex: 1;">
//             ${options}
//         </select>
//         <input type="hidden" class="ing-qty" value="1">
//         <button type="button" onclick="this.parentElement.remove()" class="btn-remove-ing" title="Remove Ingredient">
//             <i class="fas fa-trash"></i>
//         </button>
//     `;

//     container.appendChild(div);

//     if (data) {
//         div.querySelector('.ing-select').value = data.inventoryId;
//     }
// }

// // ============================================================
// // 3. IMAGE HANDLERS
// // ============================================================

// window.toggleImageMode = function(mode) {
//     const btnFile = document.getElementById('btn-mode-file');
//     const btnUrl = document.getElementById('btn-mode-url');
//     const containerFile = document.getElementById('container-file');
//     const containerUrl = document.getElementById('container-url');

//     if (mode === 'file') {
//         btnFile.classList.add('active');
//         btnUrl.classList.remove('active');
//         containerFile.style.display = 'flex';
//         containerUrl.style.display = 'none';
//     } else {
//         btnFile.classList.remove('active');
//         btnUrl.classList.add('active');
//         containerFile.style.display = 'none';
//         containerUrl.style.display = 'block';
//     }
// }

// window.previewImageFromFile = function(input) {
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             document.getElementById('imagePreviewFile').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
//             document.getElementById('finalImageSrc').value = e.target.result;
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }

// window.previewImageFromUrl = function(url) {
//     if(url.trim() !== "") {
//         document.getElementById('imagePreviewUrl').innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src=''; this.parentElement.innerHTML='<i class=\\'fas fa-exclamation-triangle\\'></i><span>Broken Link</span>';">`;
//         document.getElementById('finalImageSrc').value = url;
//     } else {
//         document.getElementById('imagePreviewUrl').innerHTML = `<i class="fas fa-link"></i><span>Preview will appear here</span>`;
//         document.getElementById('finalImageSrc').value = "";
//     }
// }

// // ============================================================
// // 4. ACTIONS
// // ============================================================

// window.handleProductSubmit = async function(e) {
//     e.preventDefault();
//     const btn = document.getElementById('btnSaveProduct');
//     btn.disabled = true;
//     btn.innerText = "Saving...";

//     const id = document.getElementById('editProductId').value;
//     const name = document.getElementById('prodName').value;
//     const category = document.getElementById('prodCategory').value;
//     const price = parseFloat(document.getElementById('prodPrice').value);
//     const quantity = parseInt(document.getElementById('prodQuantity').value) || 0; // NEW: Capturing quantity
//     const desc = document.getElementById('prodDesc').value;
//     const image = document.getElementById('finalImageSrc').value;
    
//     const ingredients = [];
//     document.querySelectorAll('.recipe-row').forEach(row => {
//         const invId = row.querySelector('.ing-select').value;
//         const qty = parseFloat(row.querySelector('.ing-qty').value) || 1; 
//         if(invId) ingredients.push({ inventoryId: invId, quantity: qty });
//     });

//     const data = {
//         name, category, price, quantity, // NEW: Added quantity
//         description: desc, image,
//         ingredients: ingredients,
//         updatedAt: new Date()
//     };

//     try {
//         if (id) {
//             await updateDoc(doc(db, "products", id), data);
//             showToast("Product updated successfully");
//         } else {
//             data.createdAt = new Date();
//             data.active = true;
//             await addDoc(collection(db, "products"), data);
//             showToast("Product added successfully");
//         }
//         window.closeModal('productModal');
//     } catch (err) {
//         showToast("Error: " + err.message, "error");
//         console.error(err);
//     } finally {
//         btn.disabled = false;
//         btn.innerText = "Save Product";
//     }
// };

// window.handleCategorySubmit = async function(e) {
//     e.preventDefault();
//     const name = document.getElementById('catName').value.trim();
//     const color = document.getElementById('catColor').value;
//     const icon = document.getElementById('catIcon').value;

//     if(!name) { showToast("Category name required", "error"); return; }
//     const id = name.toLowerCase().replace(/\s+/g, '-'); 

//     try {
//         await addDoc(collection(db, "categories"), { id: id, name: name, color: color, icon: icon });
//         showToast("Category added!");
//         window.closeModal('categoryModal');
//     } catch(e) {
//         showToast("Error: " + e.message, "error");
//     }
// };

// window.editProduct = function(id) {
//     const prod = allProducts.find(p => p.id === id);
//     if (!prod) return;

//     document.getElementById('editProductId').value = prod.id;
//     document.getElementById('prodName').value = prod.name;
//     document.getElementById('prodCategory').value = prod.category;
//     document.getElementById('prodPrice').value = prod.price;
//     document.getElementById('prodQuantity').value = prod.quantity || 0; // NEW: Loading quantity
//     document.getElementById('prodDesc').value = prod.description || '';
//     document.getElementById('finalImageSrc').value = prod.image || "";
    
//     document.getElementById('ingredients-container').innerHTML = ''; 
//     if (prod.ingredients && Array.isArray(prod.ingredients)) {
//         prod.ingredients.forEach(ing => { window.addIngredientRow(ing); });
//     }

//     const isUrl = prod.image && prod.image.startsWith('http');
//     if (isUrl) {
//         window.toggleImageMode('url');
//         document.getElementById('productImageUrl').value = prod.image;
//         document.getElementById('imagePreviewUrl').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
//     } else {
//         window.toggleImageMode('file');
//         document.getElementById('productImageUrl').value = "";
//         if (prod.image) {
//              document.getElementById('imagePreviewFile').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
//         } else {
//              document.getElementById('imagePreviewFile').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to Upload</span>`;
//         }
//     }

//     document.getElementById('modalTitle').innerText = "Edit Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.deleteProduct = function(id, name) {
//     document.getElementById('deleteTargetId').value = id;
//     document.getElementById('deleteProductName').innerText = name;
//     document.getElementById('deleteModal').style.display = 'flex';
// };

// window.confirmDelete = async function() {
//     const id = document.getElementById('deleteTargetId').value;
//     if(!id) return;
//     try {
//         await deleteDoc(doc(db, "products", id));
//         showToast("Product deleted");
//         window.closeModal('deleteModal');
//     } catch (e) {
//         showToast(e.message, "error");
//     }
// };

// // ============================================================
// // 5. UI UTILITIES
// // ============================================================

// window.openProductModal = function() {
//     document.getElementById('productForm').reset();
//     document.getElementById('editProductId').value = "";
//     document.getElementById('finalImageSrc').value = "";
//     document.getElementById('prodQuantity').value = 0; // NEW: Reset quantity
    
//     window.toggleImageMode('file');
//     document.getElementById('imagePreviewFile').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to Upload</span>`;
//     document.getElementById('imagePreviewUrl').innerHTML = `<i class="fas fa-link"></i><span>Preview</span>`;
    
//     document.getElementById('ingredients-container').innerHTML = '';
//     document.getElementById('modalTitle').innerText = "Add New Product";
//     document.getElementById('productModal').style.display = 'flex';
// };

// window.openCategoryModal = function() {
//     document.getElementById('categoryForm').reset();
//     document.getElementById('categoryModal').style.display = 'flex';
// };

// window.closeModal = function(id) {
//     document.getElementById(id).style.display = 'none';
// };

// window.openLogoutModal = function() {
//     document.getElementById('logoutModal').style.display = 'flex';
// };

// function showToast(message, type = 'success') {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }

// // Global Exports
// window.openProductModal = openProductModal;
// window.closeModal = closeModal;
// window.handleProductSubmit = handleProductSubmit;
// window.toggleImageMode = toggleImageMode;
// window.previewImageFromFile = previewImageFromFile;
// window.previewImageFromUrl = previewImageFromUrl;
// window.openCategoryModal = openCategoryModal;
// window.handleCategorySubmit = handleCategorySubmit;
// window.confirmDelete = confirmDelete; 
// window.openLogoutModal = openLogoutModal;























import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { db } from './firebase.js';

// --- GLOBAL VARIABLES ---
let allProducts = [];
let allCategories = [];
let allInventory = []; 
let isArchiveView = false; // Tracks if we are looking at Archives or Active items

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Product Page Loaded");
    
    // Set Date
    const dateEl = document.getElementById('currentDate');
    if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Load Data
    loadCategories();
    loadInventoryItems(); // For Recipe Dropdown
    loadProducts();       // Main Data
});

// ============================================================
// 1. DATA LOADING
// ============================================================

function loadProducts() {
    // IMPORTANT: Pointing to "products" collection
    const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
    
    onSnapshot(q, (snapshot) => {
        allProducts = [];
        snapshot.forEach(docSnap => {
            allProducts.push({ id: docSnap.id, ...docSnap.data() });
        });
        console.log("Products Loaded:", allProducts.length);
        renderGrid();
    }, (error) => {
        console.error("Error loading products:", error);
        document.getElementById('productsGrid').innerHTML = `<p class="error">Error loading data: ${error.message}</p>`;
    });
}

function loadCategories() {
    const q = query(collection(db, "categories"), orderBy("name"));
    onSnapshot(q, (snapshot) => {
        allCategories = [];
        const select = document.getElementById('prodCategory');
        let optionsHTML = '<option value="" disabled selected>Select Category</option>';

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            allCategories.push({ id: docSnap.id, ...data });
            optionsHTML += `<option value="${data.name}">${data.name}</option>`;
        });

        if(select) select.innerHTML = optionsHTML;
        renderGrid(); // Re-render to apply category colors
    });
}

function loadInventoryItems() {
    // Loads ingredients for the Recipe section
    const q = query(collection(db, "inventory"), orderBy("name"));
    onSnapshot(q, (snapshot) => {
        allInventory = [];
        snapshot.forEach(docSnap => {
            allInventory.push({ id: docSnap.id, ...docSnap.data() });
        });
    });
}

// ============================================================
// 2. RENDERING & FILTERING
// ============================================================

window.toggleArchiveView = function() {
    isArchiveView = !isArchiveView;
    
    const btn = document.getElementById('btnToggleArchive');
    const pageTitle = document.getElementById('pageTitle');
    const addBtn = document.getElementById('btnAddProduct');

    if (isArchiveView) {
        // Switch to Archive Mode
        btn.innerHTML = `<i class="fas fa-arrow-left"></i> <span>Back to Menu</span>`;
        btn.classList.add('active-archive-btn');
        pageTitle.innerText = "Archived Products";
        addBtn.style.display = 'none'; // Hide Add button
    } else {
        // Switch to Active Mode
        btn.innerHTML = `<i class="fas fa-archive"></i> <span>View Archives</span>`;
        btn.classList.remove('active-archive-btn');
        pageTitle.innerText = "Product Management";
        addBtn.style.display = 'flex';
    }
    
    renderGrid();
}

window.filterProducts = function() {
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('productsGrid');
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    
    if(!grid) return;
    grid.innerHTML = '';

    // 1. Filter Logic
    const filtered = allProducts.filter(prod => {
        const prodStatus = prod.status || 'active'; // Default to active if undefined
        
        // Show Archived only if isArchiveView is true
        if (isArchiveView && prodStatus !== 'archived') return false;
        // Show Active only if isArchiveView is false
        if (!isArchiveView && prodStatus === 'archived') return false;

        // Search Filter
        return prod.name.toLowerCase().includes(searchVal);
    });

    // 2. Empty State
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>${isArchiveView ? "No archived products." : "No products found."}</p>
            </div>`;
        return;
    }

    // 3. Render Cards
    filtered.forEach(prod => {
        const catObj = allCategories.find(c => c.name === prod.category) || { color: '#888', icon: 'fa-box' };
        const stockQty = prod.quantity || 0;
        
        // Action Buttons change based on view
        let buttonsHTML = '';
        if (isArchiveView) {
            // Archive View: Restore or Delete Forever
            buttonsHTML = `
                <button class="action-btn restore-btn" onclick="window.askRestore('${prod.id}', '${prod.name}')" title="Restore">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="action-btn delete-btn" onclick="window.askDelete('${prod.id}', '${prod.name}')" title="Delete Forever">
                    <i class="fas fa-trash"></i>
                </button>
            `;
        } else {
            // Active View: Edit or Archive
            buttonsHTML = `
                <button class="action-btn edit-btn" onclick="window.editProduct('${prod.id}')" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="action-btn archive-btn" onclick="window.askArchive('${prod.id}', '${prod.name}')" title="Archive">
                    <i class="fas fa-archive"></i>
                </button>
            `;
        }

        const card = `
            <div class="product-card">
                <div class="card-image">
                    ${prod.image ? `<img src="${prod.image}" alt="${prod.name}">` : 
                    `<div class="placeholder-img"><i class="fas ${catObj.icon || 'fa-image'}"></i></div>`}
                </div>
                <div class="card-body">
                    <div class="card-header-row">
                        <span class="card-category">
                            <i class="fas ${catObj.icon || 'fa-tag'}"></i> ${prod.category}
                        </span>
                        <span class="stock-badge ${stockQty < 5 ? 'low' : 'good'}">Stock: ${stockQty}</span>
                    </div>
                    <div class="card-title">${prod.name}</div>
                    <div class="card-desc">${prod.description || 'No description.'}</div>
                    
                    <div class="card-footer">
                        <div class="price-tag">₱${parseFloat(prod.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                        <div class="card-actions">
                            ${buttonsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// ============================================================
// 3. ACTIONS (Add, Edit, Archive, Restore, Delete)
// ============================================================

// --- SAVE (ADD/EDIT) ---
window.handleProductSubmit = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSaveProduct');
    btn.disabled = true;
    btn.innerText = "Saving...";

    const id = document.getElementById('editProductId').value;
    
    // Gather Data
    const data = {
        name: document.getElementById('prodName').value,
        category: document.getElementById('prodCategory').value,
        price: parseFloat(document.getElementById('prodPrice').value),
        quantity: parseInt(document.getElementById('prodQuantity').value) || 0,
        description: document.getElementById('prodDesc').value,
        image: document.getElementById('finalImageSrc').value,
        updatedAt: new Date()
    };

    // Gather Ingredients
    const ingredients = [];
    document.querySelectorAll('.recipe-row').forEach(row => {
        const invId = row.querySelector('.ing-select').value;
        const qty = parseFloat(row.querySelector('.ing-qty').value) || 1; 
        if(invId) ingredients.push({ inventoryId: invId, quantity: qty });
    });
    data.ingredients = ingredients;

    try {
        if (id) {
            // Edit Existing
            await updateDoc(doc(db, "products", id), data);
            showToast("Product updated");
        } else {
            // Add New
            data.createdAt = new Date();
            data.status = 'active'; // Default status
            await addDoc(collection(db, "products"), data);
            showToast("Product added");
        }
        window.closeModal('productModal');
    } catch (err) {
        showToast("Error: " + err.message, "error");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerText = "Save Product";
    }
};

// --- ARCHIVE ---
window.askArchive = function(id, name) {
    document.getElementById('archiveTargetId').value = id;
    document.getElementById('archiveProductName').innerText = name;
    document.getElementById('archiveModal').style.display = 'flex';
};

window.confirmArchive = async function() {
    const id = document.getElementById('archiveTargetId').value;
    try {
        await updateDoc(doc(db, "products", id), { status: 'archived' });
        showToast("Product Archived");
        window.closeModal('archiveModal');
    } catch(e) { showToast(e.message, "error"); }
};

// --- RESTORE ---
window.askRestore = function(id, name) {
    document.getElementById('restoreTargetId').value = id;
    document.getElementById('restoreProductName').innerText = name;
    document.getElementById('restoreModal').style.display = 'flex';
};

window.confirmRestore = async function() {
    const id = document.getElementById('restoreTargetId').value;
    try {
        await updateDoc(doc(db, "products", id), { status: 'active' });
        showToast("Product Restored");
        window.closeModal('restoreModal');
    } catch(e) { showToast(e.message, "error"); }
};

// --- PERMANENT DELETE ---
window.askDelete = function(id, name) {
    document.getElementById('deleteTargetId').value = id;
    document.getElementById('deleteProductName').innerText = name;
    document.getElementById('deleteModal').style.display = 'flex';
};

window.confirmDelete = async function() {
    const id = document.getElementById('deleteTargetId').value;
    try {
        await deleteDoc(doc(db, "products", id));
        showToast("Product Deleted Permanently");
        window.closeModal('deleteModal');
    } catch(e) { showToast(e.message, "error"); }
};

// --- EDIT PREP ---
window.editProduct = function(id) {
    const prod = allProducts.find(p => p.id === id);
    if (!prod) return;

    // Fill Form
    document.getElementById('editProductId').value = prod.id;
    document.getElementById('prodName').value = prod.name;
    document.getElementById('prodCategory').value = prod.category;
    document.getElementById('prodPrice').value = prod.price;
    document.getElementById('prodQuantity').value = prod.quantity || 0;
    document.getElementById('prodDesc').value = prod.description || '';
    document.getElementById('finalImageSrc').value = prod.image || "";

    // Fill Ingredients
    document.getElementById('ingredients-container').innerHTML = ''; 
    if (prod.ingredients && Array.isArray(prod.ingredients)) {
        prod.ingredients.forEach(ing => { window.addIngredientRow(ing); });
    }

    // Preview Image
    if (prod.image && prod.image.startsWith('http')) {
        window.toggleImageMode('url');
        document.getElementById('productImageUrl').value = prod.image;
        document.getElementById('imagePreviewUrl').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
        window.toggleImageMode('file');
        // If it's base64 or other, just show preview
        if(prod.image) document.getElementById('imagePreviewFile').innerHTML = `<img src="${prod.image}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    document.getElementById('modalTitle').innerText = "Edit Product";
    document.getElementById('productModal').style.display = 'flex';
};

// ============================================================
// 4. UTILITIES (Modals, Images, Toasts)
// ============================================================

window.openProductModal = function() {
    document.getElementById('productForm').reset();
    document.getElementById('editProductId').value = "";
    document.getElementById('finalImageSrc').value = "";
    document.getElementById('ingredients-container').innerHTML = '';
    
    // Reset Image Preview
    window.toggleImageMode('file');
    document.getElementById('imagePreviewFile').innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click to Upload</span>`;
    
    document.getElementById('modalTitle').innerText = "Add New Product";
    document.getElementById('productModal').style.display = 'flex';
};

window.addIngredientRow = function(data = null) {
    const container = document.getElementById('ingredients-container');
    const div = document.createElement('div');
    div.className = 'recipe-row';
    div.innerHTML = `
        <select class="form-input ing-select">
            <option value="" disabled selected>Select Item</option>
            ${allInventory.map(i => `<option value="${i.id}">${i.name} (${i.unit})</option>`).join('')}
        </select>
        <input type="number" class="form-input ing-qty" value="1" min="0.1" step="0.1" placeholder="Qty">
        <button type="button" onclick="this.parentElement.remove()" class="btn-remove-ing"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(div);
    if (data) {
        div.querySelector('.ing-select').value = data.inventoryId;
        div.querySelector('.ing-qty').value = data.quantity;
    }
}

window.toggleImageMode = function(mode) {
    if (mode === 'file') {
        document.getElementById('btn-mode-file').classList.add('active');
        document.getElementById('btn-mode-url').classList.remove('active');
        document.getElementById('container-file').style.display = 'flex';
        document.getElementById('container-url').style.display = 'none';
    } else {
        document.getElementById('btn-mode-file').classList.remove('active');
        document.getElementById('btn-mode-url').classList.add('active');
        document.getElementById('container-file').style.display = 'none';
        document.getElementById('container-url').style.display = 'block';
    }
}

window.previewImageFromFile = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreviewFile').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
            document.getElementById('finalImageSrc').value = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

window.previewImageFromUrl = function(url) {
    if(url.trim() !== "") {
        document.getElementById('imagePreviewUrl').innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:cover;">`;
        document.getElementById('finalImageSrc').value = url;
    }
}

window.closeModal = (id) => document.getElementById(id).style.display = 'none';

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// Export functions to window
Object.assign(window, {
    openProductModal, closeModal, handleProductSubmit, toggleImageMode,
    previewImageFromFile, previewImageFromUrl, addIngredientRow, editProduct,
    askArchive, confirmArchive, askRestore, confirmRestore, askDelete, confirmDelete,
    toggleArchiveView, filterProducts
});