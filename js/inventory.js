// // import { 
// //     collection, 
// //     addDoc, 
// //     setDoc, 
// //     updateDoc, 
// //     deleteDoc, 
// //     doc, 
// //     onSnapshot, 
// //     query, 
// //     where, 
// //     orderBy 
// // } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // import { db } from './firebase.js';

// // // --- CONFIGURATION ---
// // const COLLECTION_NAME = "inventory";
// // const CATEGORY_COLLECTION = "categories";
// // const LOGS_COLLECTION = "inventory_logs";
// // let inventoryData = [];
// // let categoryData = []; 

// // // Variables for Custom Modals
// // let currentEditCatId = null;
// // let currentDeleteCatId = null;

// // // --- INITIALIZATION ---
// // document.addEventListener('DOMContentLoaded', () => {
// //     console.log("Inventory System Started...");

// //     // 1. Inject Custom Modals (Edit/Delete UI)
// //     injectCategoryModals();

// //     // 2. Set Date
// //     const dateEl = document.getElementById('currentDate');
// //     if(dateEl) {
// //         dateEl.innerText = new Date().toLocaleDateString('en-US', { 
// //             weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
// //         });
// //     }

// //     // 3. Load Data
// //     loadCategories();
// //     loadInventory();
    
// //     // 4. Setup Listeners
// //     setupEventListeners();
// // });

// // // ============================================================
// // // 1. DATA LOADING & DISPLAY
// // // ============================================================

// // function loadInventory() {
// //     const q = query(collection(db, COLLECTION_NAME));
    
// //     onSnapshot(q, (snapshot) => {
// //         inventoryData = [];
// //         snapshot.forEach((doc) => {
// //             inventoryData.push({ id: doc.id, ...doc.data() });
// //         });
// //         updateDashboardStats(inventoryData);
// //         filterAndRender(); 
// //     }, (error) => {
// //         console.error("Error loading inventory:", error);
// //     });
// // }

// // function loadCategories() {
// //     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
// //     onSnapshot(q, (snapshot) => {
// //         categoryData = [];
// //         const filterSelect = document.getElementById('categoryFilter');
// //         const modalSelect = document.getElementById('itemCategory');
// //         const managerList = document.getElementById('categoryListBody');
        
// //         let optionsHTML = '<option value="all">All Categories</option>';
// //         let modalHTML = '<option value="" disabled selected>Select Category</option>';
// //         let listHTML = '';

// //         if (snapshot.empty && managerList) {
// //             managerList.innerHTML = '<tr><td style="text-align:center; padding:15px; color:#888;">No categories yet.</td></tr>';
// //         }

// //         snapshot.forEach(doc => {
// //             const cat = { id: doc.id, ...doc.data() };
// //             categoryData.push(cat);

// //             // Populate Dropdowns
// //             optionsHTML += `<option value="${cat.name}">${cat.name}</option>`;
// //             modalHTML += `<option value="${cat.id}">${cat.name}</option>`;

// //             // Populate Manager List 
// //             const safeName = cat.name.replace(/'/g, "\\'"); 
            
// //             // Buttons aligned to the right, slightly closer to text
// //             listHTML += `
// //                 <tr style="border-bottom: 1px solid #f0f0f0;">
// //                     <td style="padding: 12px 10px;">
// //                         <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                            
// //                             <span style="font-weight: 500; font-size: 15px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 15px;">${cat.name}</span>
                            
// //                             <div style="display: flex; gap: 8px; flex-shrink: 0; margin-right: 45px;"> 
// //                                 <button onclick="openEditCatModal('${cat.id}', '${safeName}')" 
// //                                         title="Edit Name"
// //                                         style="color: #3498db; border: none; background: #eaf6ff; width:32px; height:32px; border-radius:6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
// //                                     <i class="fas fa-pencil-alt" style="font-size: 14px;"></i>
// //                                 </button>

// //                                 <button onclick="openDeleteCatModal('${cat.id}')" 
// //                                         title="Delete Category"
// //                                         style="color: #e74a3b; border: none; background: #fee2e2; width:32px; height:32px; border-radius:6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
// //                                     <i class="fas fa-trash" style="font-size: 14px;"></i>
// //                                 </button>
// //                             </div>

// //                         </div>
// //                     </td>
// //                 </tr>
// //             `;
// //         });

// //         if(filterSelect) filterSelect.innerHTML = optionsHTML;
// //         if(modalSelect) modalSelect.innerHTML = modalHTML;
// //         if(managerList && !snapshot.empty) managerList.innerHTML = listHTML; 
// //     });
// // }

// // function updateDashboardStats(data) {
// //     const totalItems = data.length;
// //     const lowStockCount = data.filter(item => (Number(item.currentStock)||0) <= (Number(item.minimumStock)||0)).length;
// //     const totalValue = data.reduce((sum, item) => sum + ((Number(item.currentStock)||0) * (Number(item.unitCost)||0)), 0);

// //     const elTotal = document.getElementById('stat-total-items');
// //     const elLow = document.getElementById('stat-low-stock');
// //     const elValue = document.getElementById('stat-total-value');

// //     if(elTotal) elTotal.innerText = totalItems;
// //     if(elLow) elLow.innerText = lowStockCount;
// //     if(elValue) elValue.innerText = '₱' + totalValue.toLocaleString(undefined, {minimumFractionDigits: 2});
// // }

// // // ============================================================
// // // 2. CSV EXPORT (NEW)
// // // ============================================================

// // function exportToCSV() {
// //     if (inventoryData.length === 0) {
// //         showToast("No data to export", "error");
// //         return;
// //     }

// //     // Define Headers
// //     let csvContent = "data:text/csv;charset=utf-8,";
// //     csvContent += "Name,Category,Current Stock,Unit,Cost (PHP),Total Value,Status,Last Restocked,Description\n";

// //     // Loop through data rows
// //     inventoryData.forEach(item => {
// //         const stock = Number(item.currentStock) || 0;
// //         const cost = Number(item.unitCost) || 0;
// //         const totalVal = stock * cost;
// //         const lastRestock = item.lastRestocked ? new Date(item.lastRestocked.seconds * 1000).toLocaleDateString() : '-';

// //         // Escape commas in text fields to prevent CSV breaking
// //         const name = (item.name || "").replace(/,/g, " ");
// //         const cat = (item.categoryName || "Uncategorized").replace(/,/g, " ");
// //         const desc = (item.description || "").replace(/,/g, " ");

// //         const row = [
// //             name,
// //             cat,
// //             stock,
// //             item.unit || "",
// //             cost.toFixed(2),
// //             totalVal.toFixed(2),
// //             item.status || "Unknown",
// //             lastRestock,
// //             desc
// //         ].join(",");

// //         csvContent += row + "\n";
// //     });

// //     // Create Download Link
// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.setAttribute("href", encodedUri);
// //     link.setAttribute("download", "Inventory_Report_" + new Date().toISOString().split('T')[0] + ".csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);

// //     showToast("Export Downloaded!");
// // }

// // // ============================================================
// // // 3. UI HELPERS & INJECTION
// // // ============================================================

// // function injectCategoryModals() {
// //     const modalHTML = `
// //     <style>
// //         .custom-ui-overlay {
// //             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
// //             background: rgba(0,0,0,0.5); z-index: 9999; display: none;
// //             justify-content: center; align-items: center;
// //         }
// //         .custom-ui-box {
// //             background: white; width: 90%; max-width: 400px; padding: 25px;
// //             border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
// //             text-align: center; font-family: sans-serif;
// //         }
// //         .custom-ui-title { margin-top: 0; font-size: 18px; color: #333; margin-bottom: 15px;}
// //         .custom-ui-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; }
// //         .custom-ui-btns { display: flex; justify-content: center; gap: 10px; }
// //         .btn-ui { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
// //         .btn-ui-save { background: #27ae60; color: white; }
// //         .btn-ui-del { background: #c0392b; color: white; }
// //         .btn-ui-cancel { background: #ecf0f1; color: #7f8c8d; }
// //     </style>

// //     <div id="ui-edit-cat-modal" class="custom-ui-overlay">
// //         <div class="custom-ui-box">
// //             <h3 class="custom-ui-title">Edit Category Name</h3>
// //             <input type="text" id="ui-edit-cat-input" class="custom-ui-input" placeholder="Enter new name...">
// //             <div class="custom-ui-btns">
// //                 <button onclick="closeCustomUI()" class="btn-ui btn-ui-cancel">Cancel</button>
// //                 <button onclick="confirmEditCategory()" class="btn-ui btn-ui-save">Save Changes</button>
// //             </div>
// //         </div>
// //     </div>

// //     <div id="ui-delete-cat-modal" class="custom-ui-overlay">
// //         <div class="custom-ui-box">
// //             <div style="color: #e74a3b; font-size: 40px; margin-bottom: 10px;"><i class="fas fa-exclamation-circle"></i></div>
// //             <h3 class="custom-ui-title">Delete this Category?</h3>
// //             <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
// //                 Items in this category will become <b>"Uncategorized"</b>. This action cannot be undone.
// //             </p>
// //             <div class="custom-ui-btns">
// //                 <button onclick="closeCustomUI()" class="btn-ui btn-ui-cancel">Cancel</button>
// //                 <button onclick="confirmDeleteCategory()" class="btn-ui btn-ui-del">Yes, Delete</button>
// //             </div>
// //         </div>
// //     </div>
// //     `;
// //     document.body.insertAdjacentHTML('beforeend', modalHTML);
// // }

// // function closeCustomUI() {
// //     document.getElementById('ui-edit-cat-modal').style.display = 'none';
// //     document.getElementById('ui-delete-cat-modal').style.display = 'none';
// //     currentEditCatId = null;
// //     currentDeleteCatId = null;
// // }

// // // ============================================================
// // // 4. CATEGORY ACTIONS
// // // ============================================================

// // window.openEditCatModal = function(id, currentName) {
// //     currentEditCatId = id;
// //     const input = document.getElementById('ui-edit-cat-input');
// //     input.value = currentName;
// //     document.getElementById('ui-edit-cat-modal').style.display = 'flex';
// //     input.focus();
// // }

// // window.confirmEditCategory = async function() {
// //     const newName = document.getElementById('ui-edit-cat-input').value.trim();
// //     if (!newName) { showToast("Name cannot be empty", "error"); return; }
    
// //     try {
// //         await updateDoc(doc(db, CATEGORY_COLLECTION, currentEditCatId), { name: newName });
// //         showToast("Category Updated");
// //         closeCustomUI();
// //     } catch (error) {
// //         console.error("Edit Error", error);
// //         showToast("Update failed", "error");
// //     }
// // }

// // window.openDeleteCatModal = function(id) {
// //     currentDeleteCatId = id;
// //     document.getElementById('ui-delete-cat-modal').style.display = 'flex';
// // }

// // window.confirmDeleteCategory = async function() {
// //     try {
// //         await deleteDoc(doc(db, CATEGORY_COLLECTION, currentDeleteCatId));
// //         showToast("Category Deleted");
// //         closeCustomUI();
// //     } catch (error) {
// //         console.error("Delete Error", error);
// //         showToast("Delete failed", "error");
// //     }
// // }

// // async function addCategory() {
// //     const input = document.getElementById('newCategoryInput');
// //     const btn = document.getElementById('btnAddCategory');
// //     const name = input.value.trim();

// //     if(!name) { showToast("Enter a category name", "error"); return; }
// //     setLoading(btn, true);

// //     try {
// //         await addDoc(collection(db, CATEGORY_COLLECTION), { name: name, createdAt: new Date() });
// //         input.value = ''; 
// //         showToast("Category Added");
// //     } catch (error) {
// //         showToast("Failed to add category", "error");
// //     } finally {
// //         setLoading(btn, false);
// //     }
// // }

// // // ============================================================
// // // 5. ITEM MANAGEMENT & TABLE RENDERING
// // // ============================================================

// // function setupEventListeners() {
// //     const searchInput = document.getElementById('searchInput');
// //     const catFilter = document.getElementById('categoryFilter');
// //     if(searchInput) searchInput.addEventListener('input', filterAndRender);
// //     if(catFilter) catFilter.addEventListener('change', filterAndRender);
// // }

// // function filterAndRender() {
// //     const searchInput = document.getElementById('searchInput');
// //     const catFilter = document.getElementById('categoryFilter');
// //     const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
// //     const selectedCat = catFilter ? catFilter.value : "all";

// //     const filteredData = inventoryData.filter(item => {
// //         const matchesSearch = item.name.toLowerCase().includes(searchTerm);
// //         const matchesCat = selectedCat === "all" || item.categoryName === selectedCat;
// //         return matchesSearch && matchesCat;
// //     });
// //     renderTable(filteredData);
// // }

// // function renderTable(data) {
// //     const tbody = document.getElementById('inventoryTableBody');
// //     if(!tbody) return;
// //     tbody.innerHTML = '';

// //     if (data.length === 0) {
// //         tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No items found.</td></tr>';
// //         return;
// //     }
    
// //     // Sort recently updated first
// //     data.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));

// //     data.forEach(item => {
// //         const stock = Number(item.currentStock) || 0;
// //         const minStock = Number(item.minimumStock) || 0;
// //         const cost = Number(item.unitCost) || 0;

// //         let statusBadge = stock === 0 ? '<span class="status-badge out">Out of Stock</span>' 
// //                         : (stock <= minStock ? '<span class="status-badge low">Low Stock</span>' 
// //                         : '<span class="status-badge good">In Stock</span>');

// //         const lastRestock = item.lastRestocked 
// //             ? new Date(item.lastRestocked.seconds * 1000).toLocaleDateString() : '-';

// //         const tr = document.createElement('tr');
// //         tr.innerHTML = `
// //             <td>
// //                 <strong>${item.name}</strong>
// //                 <div style="font-size:11px; color:#888;">${item.description || ''}</div>
// //             </td>
// //             <td>${item.categoryName || 'Uncategorized'}</td>
// //             <td>${stock} ${item.unit || ''}</td>
// //             <td>₱${cost.toLocaleString()}</td>
// //             <td>${statusBadge}</td>
// //             <td>${lastRestock}</td>
// //             <td>
// //                 <div class="actions">
// //                     <button onclick="window.editItem('${item.id}')" class="btn-icon edit"><i class="fas fa-edit"></i></button>
// //                     <button onclick="window.viewHistory('${item.id}')" class="btn-icon"><i class="fas fa-history"></i></button>
// //                     <button onclick="window.askDelete('${item.id}')" class="btn-icon delete"><i class="fas fa-trash"></i></button>
// //                 </div>
// //             </td>
// //         `;
// //         tbody.appendChild(tr);
// //     });
// // }

// // // ============================================================
// // // 6. SAVE / EDIT / DELETE ITEMS
// // // ============================================================

// // async function saveItem(e) {
// //     e.preventDefault();
// //     const saveBtn = document.getElementById('btnSave') || document.querySelector('#itemForm button[type="submit"]');
// //     setLoading(saveBtn, true);

// //     const idInput = document.getElementById('itemId'); 
// //     const nameInput = document.getElementById('itemName');
// //     const catSelect = document.getElementById('itemCategory');
// //     const stockInput = document.getElementById('itemStock');
// //     const minStockInput = document.getElementById('itemMinStock');
// //     const priceInput = document.getElementById('itemPrice'); 
// //     const unitInput = document.getElementById('itemUnit');
// //     const descInput = document.getElementById('itemDesc');
    
// //     let categoryName = catSelect.selectedIndex > -1 ? catSelect.options[catSelect.selectedIndex].text : "Uncategorized";
// //     const newStock = Number(stockInput.value);
// //     const docId = idInput.value; 

// //     const itemData = {
// //         name: nameInput.value,
// //         categoryId: catSelect.value,
// //         categoryName: categoryName,
// //         currentStock: newStock,
// //         minimumStock: Number(minStockInput.value),
// //         unitCost: Number(priceInput.value),
// //         unit: unitInput.value,
// //         description: descInput.value,
// //         status: newStock > 0 ? "In Stock" : "Out of Stock",
// //         isActive: true,
// //         updatedAt: new Date()
// //     };

// //     try {
// //         if (docId) {
// //             const oldItem = inventoryData.find(i => i.id === docId);
// //             const stockDiff = newStock - (oldItem ? Number(oldItem.currentStock) : 0);
// //             if (stockDiff > 0) itemData.lastRestocked = new Date(); 
// //             await updateDoc(doc(db, COLLECTION_NAME, docId), itemData);
// //             if (stockDiff !== 0) await recordLog(docId, itemData.name, stockDiff > 0 ? "Stock In (Edit)" : "Stock Out (Edit)", stockDiff, newStock);
// //             showToast("Item updated successfully");
// //         } else {
// //             const newId = "inv_" + Date.now();
// //             itemData.id = newId;
// //             itemData.createdAt = new Date();
// //             itemData.lastRestocked = newStock > 0 ? new Date() : null;
// //             await setDoc(doc(db, COLLECTION_NAME, newId), itemData);
// //             await recordLog(newId, itemData.name, "Item Created", newStock, newStock);
// //             showToast("Item added successfully");
// //         }
// //         closeModal();
// //     } catch (error) {
// //         showToast("Error saving: " + error.message, "error");
// //     } finally {
// //         setLoading(saveBtn, false);
// //     }
// // }

// // async function recordLog(itemId, itemName, action, change, remaining) {
// //     try {
// //         await addDoc(collection(db, LOGS_COLLECTION), {
// //             itemId, itemName, action, changeAmount: Number(change), 
// //             remainingStock: Number(remaining), timestamp: new Date(), user: "Admin" 
// //         });
// //     } catch (e) { console.error("Log failed", e); }
// // }

// // function openModal() {
// //     document.getElementById('itemForm').reset();
// //     document.getElementById('itemId').value = ''; 
// //     document.getElementById('modalTitle').innerText = 'Add New Item';
// //     document.getElementById('itemModal').style.display = 'flex';
// // }

// // function editItem(id) {
// //     const item = inventoryData.find(i => i.id === id);
// //     if (!item) return;
// //     document.getElementById('itemId').value = item.id;
// //     document.getElementById('itemName').value = item.name;
// //     document.getElementById('itemStock').value = item.currentStock;
// //     document.getElementById('itemMinStock').value = item.minimumStock;
// //     document.getElementById('itemPrice').value = item.unitCost;
// //     document.getElementById('itemUnit').value = item.unit;
// //     document.getElementById('itemDesc').value = item.description;
// //     const catSelect = document.getElementById('itemCategory');
// //     if(catSelect) catSelect.value = item.categoryId || ""; 
// //     document.getElementById('modalTitle').innerText = 'Edit Item';
// //     document.getElementById('itemModal').style.display = 'flex';
// // }

// // function closeModal() {
// //     document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
// // }

// // function askDelete(id) {
// //     document.getElementById('deleteItemId').value = id;
// //     document.getElementById('deleteModal').style.display = 'flex';
// // }

// // async function confirmDelete() {
// //     const id = document.getElementById('deleteItemId').value;
// //     if(!id) return;
// //     const delBtn = document.getElementById('btnConfirmDelete'); 
// //     setLoading(delBtn, true);
// //     try {
// //         await deleteDoc(doc(db, COLLECTION_NAME, id));
// //         showToast("Item Deleted");
// //         closeModal();
// //     } catch(e) { showToast("Delete failed", "error"); }
// //     finally { setLoading(delBtn, false); }
// // }

// // function setLoading(btn, isLoading) {
// //     if (!btn) return;
// //     btn.disabled = isLoading;
// //     isLoading ? btn.classList.add('btn-loading') : btn.classList.remove('btn-loading');
// // }

// // function showToast(msg, type='success') {
// //     const c = document.getElementById('toast-container');
// //     if(!c) return;
// //     const t = document.createElement('div');
// //     t.className = `toast ${type}`;
// //     t.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${msg}</span>`;
// //     t.style.borderLeft = type === 'success' ? '5px solid #2e7d32' : '5px solid #c62828';
// //     c.appendChild(t);
// //     setTimeout(() => t.remove(), 3000);
// // }

// // // ============================================================
// // // 7. EXPORTS
// // // ============================================================
// // window.openModal = openModal;
// // window.closeModal = closeModal;
// // window.saveItem = saveItem;
// // window.editItem = editItem;
// // window.askDelete = askDelete;
// // window.confirmDelete = confirmDelete;
// // window.openCategoryModal = () => document.getElementById('categoryModal').style.display = 'flex';
// // window.addCategory = addCategory;
// // window.closeCustomUI = closeCustomUI;

// // // Added Export Function
// // window.exportToCSV = exportToCSV;
// // window.exportCSV = exportToCSV; // Safety alias in case your HTML calls exportCSV()



// // import {
// //     collection,
// //     addDoc,
// //     updateDoc,
// //     deleteDoc,
// //     doc,
// //     onSnapshot,
// //     query,
// //     orderBy,
// //     where
// // } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// // import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { db } from './firebase.js';

// // const auth = getAuth();
// // const COLLECTION_NAME = "inventory";
// // const CATEGORY_COLLECTION = "categories";

// // let inventoryData = [];
// // let categoryData = [];
// // let currentStatusFilter = "all";
// // let currentArchiveTab = 'items'; // Default to items
// // document.addEventListener("DOMContentLoaded", () => {
// //     // Set Date
// //     const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //     document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

// //     loadCategories();
// //     loadInventory();
// //     setupListeners();
// // });

// // // ================= LOGOUT LOGIC =================
// // window.handleLogout = function() {
// //     Swal.fire({
// //         title: 'Logout?',
// //         text: "Are you sure you want to sign out?",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#e74c3c',
// //         confirmButtonText: 'Yes, Logout'
// //     }).then((result) => {
// //         if (result.isConfirmed) {
// //             signOut(auth).then(() => {
// //                 window.location.href = "index.html"; // Redirect to login
// //             }).catch((error) => {
// //                 Swal.fire('Error', error.message, 'error');
// //             });
// //         }
// //     });
// // };

// // // ================= LOAD DATA =================
// // function loadInventory() {
// //     // We get ALL items, then filter client-side for active/archived for speed
// //     const q = query(collection(db, COLLECTION_NAME));
// //     onSnapshot(q, (snapshot) => {
// //         inventoryData = [];
// //         snapshot.forEach(docSnap => {
// //             inventoryData.push({ id: docSnap.id, ...docSnap.data() });
// //         });
// //         updateDashboardStats();
// //         filterAndRender(); // Updates Main Table
// //         renderArchiveTable(); // Updates Archive Table if open
// //     });
// // }
// // // ================= LOAD CATEGORIES (UPDATED) =================
// // function loadCategories() {
// //     // Sort by name alphabetically
// //     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
// //     onSnapshot(q, (snapshot) => {
// //         categoryData = [];
// //         const filter = document.getElementById("categoryFilter");
// //         const select = document.getElementById("itemCategory");
// //         const list = document.getElementById("categoryList");

// //         // Default Options
// //         let filterHTML = `<option value="all">All Categories</option>`;
// //         let selectHTML = `<option value="">Select Category</option>`;
// //         let listHTML = "";

// //         snapshot.forEach(docSnap => {
// //             const cat = { id: docSnap.id, ...docSnap.data() };
            
// //             // FILTER: Only show categories that are NOT archived
// //             if (cat.status !== 'archived') {
// //                 categoryData.push(cat);

// //                 // Add to "Filter" Dropdown
// //                 filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
                
// //                 // Add to "Add Item" Dropdown
// //                 selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
                
// //                 // Add to "Manage Categories" List
// //                 listHTML += `
// //                     <li>
// //                         <span>${cat.name}</span>
// //                         <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive Category">
// //                             <i class="fas fa-box-archive"></i>
// //                         </button>
// //                     </li>
// //                 `;
// //             }
// //         });

// //         if (filter) filter.innerHTML = filterHTML;
// //         if (select) select.innerHTML = selectHTML;
// //         if (list) list.innerHTML = listHTML;
// //     });
// // }

// // // ================= ARCHIVE CATEGORY (REPLACES DELETE) =================
// // window.archiveCategory = function(id) {
// //     Swal.fire({
// //         title: 'Archive Category?',
// //         text: "This will hide the category from the list.",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#f39c12',
// //         confirmButtonText: 'Yes, Archive it'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             try {
// //                 // Update status to 'archived' instead of deleting
// //                 await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
// //                     status: 'archived',
// //                     updatedAt: new Date()
// //                 });
                
// //                 Swal.fire({
// //                     icon: 'success',
// //                     title: 'Archived!',
// //                     text: 'Category has been moved to archives.',
// //                     timer: 1500,
// //                     showConfirmButton: false
// //                 });
// //             } catch (error) {
// //                 Swal.fire('Error', error.message, 'error');
// //             }
// //         }
// //     });
// // };
// // // Note: You can delete the old window.deleteCategory function entirely.




// // // ================= DASHBOARD & STATS =================
// // function updateDashboardStats() {
// //     const activeItems = inventoryData.filter(i => i.status !== 'archived');

// //     // Counts remain global
// //     const total = activeItems.length;
    
// //     const low = activeItems.filter(i => {
// //         const stock = parseFloat(i.currentStock) || 0;
// //         const min = parseFloat(i.minimumStock) || 0;
// //         return stock <= min && stock > 0;
// //     }).length;

// //     const today = new Date();
// //     const next7 = new Date();
// //     next7.setDate(today.getDate() + 7);

// //     const expiring = activeItems.filter(i => {
// //         if (!i.expiryDate) return false;
// //         const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
// //         return d <= next7 && d >= today;
// //     }).length;

// //     document.getElementById("stat-total-items").innerText = total;
// //     document.getElementById("stat-low-stock").innerText = low;
// //     document.getElementById("stat-expiring").innerText = expiring;
    
// //     // Formatting: ₱1,200.50


// // }




// // // ================= FILTER & RENDER MAIN TABLE =================
// // window.filterStatus = function(type) {
// //     currentStatusFilter = type;
// //     filterAndRender();
// // };

// // function filterAndRender() {
// //     const search = document.getElementById("searchInput").value.toLowerCase();
// //     const cat = document.getElementById("categoryFilter").value;
    
// //     // Default: Show only items that are NOT archived
// //     let filtered = inventoryData.filter(item => item.status !== 'archived');

// //     filtered = filtered.filter(item => {
// //         const matchSearch = item.name.toLowerCase().includes(search);
// //         const matchCat = cat === "all" || item.categoryName === cat;
        
// //         let matchStatus = true;
// //         const stock = Number(item.currentStock) || 0;
// //         const min = Number(item.minimumStock) || 0;

// //         if (currentStatusFilter === "low") {
// //             matchStatus = stock <= min && stock > 0;
// //         } else if (currentStatusFilter === "expiring") {
// //             // Re-using logic from stats for consistency
// //              if (!item.expiryDate) return false;
// //              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //              const today = new Date();
// //              const next7 = new Date();
// //              next7.setDate(today.getDate() + 7);
// //              matchStatus = d <= next7 && d >= today;
// //         }
        
// //         return matchSearch && matchCat && matchStatus;
// //     });

// //     // --- ADD THIS BLOCK TO FIX THE MATCHING PROBLEM ---
// //     // Calculate Total Value based on the FILTERED list, not the global list
// //     const currentViewValue = filtered.reduce((sum, i) => {
// //         const stock = parseFloat(i.currentStock) || 0;
// //         const cost = parseFloat(i.unitCost) || 0;
// //         return sum + (stock * cost);
// //     }, 0);

// //     document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
// //         minimumFractionDigits: 2, 
// //         maximumFractionDigits: 2
// //     });
// //     // --------------------------------------------------

// //     renderTable(filtered);
// // }


// // function renderTable(data) {
// //     const tbody = document.getElementById("inventoryTableBody");
// //     tbody.innerHTML = "";

// //     if (data.length === 0) {
// //         tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
// //         return;
// //     }

// //     data.forEach(item => {
// //         const stock = Number(item.currentStock) || 0;
// //         const min = Number(item.minimumStock) || 0;
// //         const cost = Number(item.unitCost) || 0;
        
// //         // Calculate the total value for this specific row
// //         const rowTotal = stock * cost;

// //         // Status Badge Logic
// //         let statusBadge = '';
// //         if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
// //         else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
// //         else statusBadge = '<span class="badge badge-good">Good</span>';

// //         // Check for expiring
// //         if(item.expiryDate) {
// //              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //              const today = new Date();
// //              const next7 = new Date(); next7.setDate(today.getDate() + 7);
// //              if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
// //         }

// //         const tr = document.createElement("tr");
// //         tr.innerHTML = `
// //             <td><strong>${item.name}</strong></td>
// //             <td>${item.categoryName || "-"}</td>
// //             <td>${stock} ${item.unit || ''}</td>
// //             <td>₱${cost.toLocaleString()}</td>
            
// //             <td style="font-weight: bold; color: #2c3e50;">
// //                 ₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}
// //             </td>

// //             <td>${statusBadge}</td>
// //             <td>
// //                 <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
// //                     <i class="fas fa-edit"></i>
// //                 </button>
// //                 <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
// //                     <i class="fas fa-box-archive"></i>
// //                 </button>
// //             </td>
// //         `;
// //         tbody.appendChild(tr);
// //     });
// // }



// // // ================= RENDER ARCHIVE TABLE =================
// // function renderArchiveTable() {
// //     const tbody = document.getElementById("archiveTableBody");
// //     tbody.innerHTML = "";

// //     const archived = inventoryData.filter(i => i.status === 'archived');

// //     if (archived.length === 0) {
// //         tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
// //         return;
// //     }

// //     archived.forEach(item => {
// //         const tr = document.createElement("tr");
// //         tr.innerHTML = `
// //             <td><strong>${item.name}</strong></td>
// //             <td>${item.categoryName || "-"}</td>
// //             <td>${item.currentStock}</td>
// //             <td>
// //                 <div class="action-cell">
// //                     <button class="btn-primary btn-sm" onclick="window.restoreItem('${item.id}')" style="background:#27ae60;">
// //                         <i class="fas fa-undo"></i> Restore
// //                     </button>
// //                     <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently">
// //                         <i class="fas fa-trash"></i>
// //                     </button>
// //                 </div>
// //             </td>
// //         `;
// //         tbody.appendChild(tr);
// //     });
// // }



// // // ================= ADD / EDIT LOGIC =================
// // window.saveItem = async function(e) {
// //     e.preventDefault();
    
// //     const id = document.getElementById("itemId").value;
// //     const name = document.getElementById("itemName").value.trim();
// //     const select = document.getElementById("itemCategory");
    
// //     // Duplicate check (Client side optimization)
// //     const duplicate = inventoryData.find(i => 
// //         i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
// //     );

// //     if (duplicate) {
// //         return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
// //     }

// //     const data = {
// //         name,
// //         categoryId: select.value,
// //         categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
// //         currentStock: Number(document.getElementById("itemStock").value),
// //         minimumStock: Number(document.getElementById("itemMinStock").value),
// //         unitCost: Number(document.getElementById("itemPrice").value),
// //         unit: document.getElementById("itemUnit").value,
// //         description: document.getElementById("itemDesc").value,
// //         status: 'active', // Default status
// //         updatedAt: new Date()
// //     };

// //     const expiry = document.getElementById("itemExpiry").value;
// //     if (expiry) data.expiryDate = new Date(expiry);

// //     try {
// //         if (id) {
// //             await updateDoc(doc(db, COLLECTION_NAME, id), data);
// //             Swal.fire('Success', 'Item updated successfully', 'success');
// //         } else {
// //             data.createdAt = new Date();
// //             await addDoc(collection(db, COLLECTION_NAME), data);
// //             Swal.fire('Success', 'Item added successfully', 'success');
// //         }
// //         window.closeModal();
// //         document.getElementById("itemForm").reset();
// //     } catch (error) {
// //         Swal.fire('Error', error.message, 'error');
// //     }
// // };

// // window.editItem = function(id) {
// //     const item = inventoryData.find(i => i.id === id);
// //     if (!item) return;

// //     document.getElementById("modalTitle").innerText = "Edit Item";
// //     document.getElementById("itemId").value = item.id;
// //     document.getElementById("itemName").value = item.name;
// //     document.getElementById("itemCategory").value = item.categoryId || "";
// //     document.getElementById("itemStock").value = item.currentStock;
// //     document.getElementById("itemMinStock").value = item.minimumStock;
// //     document.getElementById("itemPrice").value = item.unitCost;
// //     document.getElementById("itemUnit").value = item.unit;
// //     document.getElementById("itemDesc").value = item.description || "";

// //     if (item.expiryDate) {
// //         const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //         document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
// //     } else {
// //         document.getElementById("itemExpiry").value = "";
// //     }

// //     document.getElementById("itemModal").style.display = "flex";
// // };

// // // ================= ARCHIVE / RESTORE / DELETE =================
// // window.archiveItem = function(id) {
// //     Swal.fire({
// //         title: 'Archive Item?',
// //         text: "This will move the item to the inactive archive list.",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#f39c12',
// //         confirmButtonText: 'Yes, Archive it'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
// //             Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
// //         }
// //     });
// // };

// // window.restoreItem = async function(id) {
// //     await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
// //     Swal.fire('Restored!', 'Item is now active.', 'success');
// //     renderArchiveTable(); // Refresh archive view
// // };

// // window.permanentDelete = function(id) {
// //     Swal.fire({
// //         title: 'Delete Permanently?',
// //         text: "You won't be able to revert this!",
// //         icon: 'error',
// //         showCancelButton: true,
// //         confirmButtonColor: '#d33',
// //         confirmButtonText: 'Yes, delete it!'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await deleteDoc(doc(db, COLLECTION_NAME, id));
// //             Swal.fire('Deleted!', 'Item has been deleted.', 'success');
// //         }
// //     });
// // };




// // // ================= CATEGORY MANAGEMENT =================
// // window.addCategory = async function() {
// //     const input = document.getElementById("newCategoryInput");
// //     const name = input.value.trim();
// //     if (!name) return;

// //     await addDoc(collection(db, CATEGORY_COLLECTION), { name });
// //     input.value = "";
// //     Swal.fire({
// //         icon: 'success',
// //         title: 'Category Added',
// //         toast: true,
// //         position: 'top-end',
// //         showConfirmButton: false,
// //         timer: 1500
// //     });
// // };

// // window.deleteCategory = function(id) {
// //     Swal.fire({
// //         title: 'Delete Category?',
// //         text: "Make sure no items are using this category first.",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonText: 'Delete'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
// //         }
// //     });
// // };
// // // ================= CATEGORY MANAGEMENT =================
// // window.addCategory = async function() {
// //     const input = document.getElementById("newCategoryInput");
// //     const name = input.value.trim();

// //     if (!name) return Swal.fire('Error', 'Category name required', 'warning');

// //     // DUPLICATE CHECK (Case Insensitive)
// //     const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());

// //     if (exists) {
// //         return Swal.fire('Error', 'This category already exists!', 'error');
// //     }

// //     try {
// //         await addDoc(collection(db, CATEGORY_COLLECTION), { 
// //             name: name,
// //             createdAt: new Date() 
// //         });
        
// //         input.value = ""; // Clear input
        
// //         Swal.fire({
// //             icon: 'success',
// //             title: 'Category Added',
// //             toast: true,
// //             position: 'top-end',
// //             showConfirmButton: false,
// //             timer: 1500
// //         });
// //     } catch (error) {
// //         Swal.fire('Error', error.message, 'error');
// //     }
// // };




// // // ================= MODAL HELPERS =================
// // window.openModal = () => {
// //     document.getElementById("itemForm").reset();
// //     document.getElementById("itemId").value = "";
// //     document.getElementById("modalTitle").innerText = "Add New Item";
// //     document.getElementById("itemModal").style.display = "flex";
// // };

// // window.openCategoryModal = () => document.getElementById("categoryModal").style.display = "flex";
// // window.openArchiveModal = () => {
// //     document.getElementById("archiveModal").style.display = "flex";
// //     renderArchiveTable();
// // };

// // window.closeModal = () => {
// //     document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
// // };

// // function setupListeners() {
// //     document.getElementById("searchInput").addEventListener("input", filterAndRender);
// //     document.getElementById("categoryFilter").addEventListener("change", filterAndRender);
    
// //     // Close modal if clicking outside
// //     window.onclick = function(event) {
// //         if (event.target.classList.contains('modal')) {
// //             window.closeModal();
// //         }
// //     };
// // }


// import {
//     collection,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//     onSnapshot,
//     query,
//     orderBy,
//     where
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { db } from './firebase.js';

// const auth = getAuth();
// const COLLECTION_NAME = "inventory";
// const CATEGORY_COLLECTION = "categories";

// // Global Variables
// let inventoryData = [];
// let categoryData = [];
// let currentStatusFilter = "all";

// // Toggle States
// let currentArchiveTab = 'items'; // Default to items in Archive Modal
// let showArchivedCats = false;    // Default to hiding archived in Category Manager

// document.addEventListener("DOMContentLoaded", () => {
//     // Set Date
//     const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

//     loadCategories();
//     loadInventory();
//     setupListeners();
// });

// // ================= LOGOUT LOGIC =================
// window.handleLogout = function() {
//     Swal.fire({
//         title: 'Logout?',
//         text: "Are you sure you want to sign out?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#e74c3c',
//         confirmButtonText: 'Yes, Logout'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             signOut(auth).then(() => {
//                 window.location.href = "index.html";
//             }).catch((error) => {
//                 Swal.fire('Error', error.message, 'error');
//             });
//         }
//     });
// };

// // ================= EXPORT FUNCTION (INJECTED) =================
// window.exportToCSV = function() {
//     if (inventoryData.length === 0) {
//         Swal.fire("Info", "No data to export.", "info");
//         return;
//     }

//     // Define CSV Headers
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Name,Category,Stock,Unit,Cost,Total Value,Status,Expiry Date\n";

//     // Loop through data and format for CSV
//     inventoryData.forEach(item => {
//         if (item.status === 'archived') return; // Skip archived items if desired

//         const stock = item.currentStock || 0;
//         const cost = item.unitCost || 0;
//         const total = stock * cost;
        
//         // Format Expiry Date
//         let expiry = "";
//         if (item.expiryDate) {
//             const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//             expiry = d.toLocaleDateString();
//         }

//         // Escape commas in names/descriptions to prevent CSV breaking
//         const name = `"${item.name.replace(/"/g, '""')}"`; 
//         const category = `"${(item.categoryName || "").replace(/"/g, '""')}"`;

//         const row = [
//             name,
//             category,
//             stock,
//             item.unit || "",
//             cost.toFixed(2),
//             total.toFixed(2),
//             item.status,
//             expiry
//         ].join(",");

//         csvContent += row + "\r\n";
//     });

//     // Create Download Link
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };

// // ================= LOAD DATA (INVENTORY FIXED) =================
// function loadInventory() {
//     const q = query(collection(db, COLLECTION_NAME));
//     onSnapshot(q, (snapshot) => {
//         inventoryData = [];
//         snapshot.forEach(docSnap => {
//             // FIX: We put docSnap.data() FIRST.
//             // This ensures the Real Firestore ID (docSnap.id) overwrites any fake 'id' inside the data.
//             inventoryData.push({ ...docSnap.data(), id: docSnap.id });
//         });
//         updateDashboardStats();
//         filterAndRender(); // Updates Main Table
        
//         // If the archive modal is open, refresh it too
//         if(document.getElementById("archiveModal").style.display === "flex"){
//             renderArchiveTable();
//         }
//     });
// }


// // ================= LOAD CATEGORIES (FIXED) =================
// function loadCategories() {
//     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
//     onSnapshot(q, (snapshot) => {
//         categoryData = [];
//         const filter = document.getElementById("categoryFilter");
//         const select = document.getElementById("itemCategory");
        
//         // Default Options
//         let filterHTML = `<option value="all">All Categories</option>`;
//         let selectHTML = `<option value="">Select Category</option>`;

//         snapshot.forEach(docSnap => {
//             // FIX: Put docSnap.data() FIRST, and id: docSnap.id LAST.
//             // This ensures the real Firestore ID overwrites any fake 'id' inside the data.
//             const cat = { ...docSnap.data(), id: docSnap.id }; 
            
//             categoryData.push(cat); 

//             // Only populate Dropdowns with ACTIVE categories
//             if (cat.status !== 'archived') {
//                 filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
//                 selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
//             }
//         });

//         if (filter) filter.innerHTML = filterHTML;
//         if (select) select.innerHTML = selectHTML;

//         // Render the "Manage Categories" list
//         renderCategoryList();
//     });
// }
// // ================= DASHBOARD & STATS =================
// function updateDashboardStats() {
//     const activeItems = inventoryData.filter(i => i.status !== 'archived');
//     const total = activeItems.length;
    
//     const low = activeItems.filter(i => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const min = parseFloat(i.minimumStock) || 0;
//         return stock <= min && stock > 0;
//     }).length;

//     const today = new Date();
//     const next7 = new Date();
//     next7.setDate(today.getDate() + 7);

//     const expiring = activeItems.filter(i => {
//         if (!i.expiryDate) return false;
//         const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
//         return d <= next7 && d >= today;
//     }).length;

//     document.getElementById("stat-total-items").innerText = total;
//     document.getElementById("stat-low-stock").innerText = low;
//     document.getElementById("stat-expiring").innerText = expiring;
// }

// // ================= MAIN TABLE RENDERER =================
// window.filterStatus = function(type) {
//     currentStatusFilter = type;
//     filterAndRender();
// };

// function filterAndRender() {
//     const search = document.getElementById("searchInput").value.toLowerCase();
//     const cat = document.getElementById("categoryFilter").value;
    
//     // Default: Show only items that are NOT archived
//     let filtered = inventoryData.filter(item => item.status !== 'archived');

//     filtered = filtered.filter(item => {
//         const matchSearch = item.name.toLowerCase().includes(search);
//         const matchCat = cat === "all" || item.categoryName === cat;
        
//         let matchStatus = true;
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;

//         if (currentStatusFilter === "low") {
//             matchStatus = stock <= min && stock > 0;
//         } else if (currentStatusFilter === "expiring") {
//              if (!item.expiryDate) return false;
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date();
//              next7.setDate(today.getDate() + 7);
//              matchStatus = d <= next7 && d >= today;
//         }
        
//         return matchSearch && matchCat && matchStatus;
//     });

//     // Calculate Total Value based on current view
//     const currentViewValue = filtered.reduce((sum, i) => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const cost = parseFloat(i.unitCost) || 0;
//         return sum + (stock * cost);
//     }, 0);

//     document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
//         minimumFractionDigits: 2, 
//         maximumFractionDigits: 2
//     });

//     renderTable(filtered);
// }

// function renderTable(data) {
//     const tbody = document.getElementById("inventoryTableBody");
//     tbody.innerHTML = "";

//     if (data.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
//         return;
//     }

//     data.forEach(item => {
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;
//         const cost = Number(item.unitCost) || 0;
//         const rowTotal = stock * cost;

//         // Status Badge Logic
//         let statusBadge = '';
//         if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
//         else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
//         else statusBadge = '<span class="badge badge-good">Good</span>';

//         if(item.expiryDate) {
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date(); next7.setDate(today.getDate() + 7);
//              if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
//         }

//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td><strong>${item.name}</strong></td>
//             <td>${item.categoryName || "-"}</td>
//             <td>${stock} ${item.unit || ''}</td>
//             <td>₱${cost.toLocaleString()}</td>
//             <td style="font-weight: bold; color: #2c3e50;">₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
//             <td>${statusBadge}</td>
//             <td>
//                 <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
//                     <i class="fas fa-edit"></i>
//                 </button>
//                 <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
//                     <i class="fas fa-box-archive"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // ================= ITEM ACTIONS (Add/Edit/Archive) =================
// window.saveItem = async function(e) {
//     e.preventDefault();
    
//     const id = document.getElementById("itemId").value;
//     const name = document.getElementById("itemName").value.trim();
//     const select = document.getElementById("itemCategory");
    
//     // Duplicate check
//     const duplicate = inventoryData.find(i => 
//         i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
//     );

//     if (duplicate) {
//         return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
//     }

//     const data = {
//         name,
//         categoryId: select.value,
//         categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
//         currentStock: Number(document.getElementById("itemStock").value),
//         minimumStock: Number(document.getElementById("itemMinStock").value),
//         unitCost: Number(document.getElementById("itemPrice").value),
//         unit: document.getElementById("itemUnit").value,
//         description: document.getElementById("itemDesc").value,
//         status: 'active',
//         updatedAt: new Date()
//     };

//     const expiry = document.getElementById("itemExpiry").value;
//     if (expiry) data.expiryDate = new Date(expiry);

//     try {
//         if (id) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), data);
//             Swal.fire('Success', 'Item updated successfully', 'success');
//         } else {
//             data.createdAt = new Date();
//             await addDoc(collection(db, COLLECTION_NAME), data);
//             Swal.fire('Success', 'Item added successfully', 'success');
//         }
//         window.closeModal();
//         document.getElementById("itemForm").reset();
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };

// window.editItem = function(id) {
//     const item = inventoryData.find(i => i.id === id);
//     if (!item) return;

//     document.getElementById("modalTitle").innerText = "Edit Item";
//     document.getElementById("itemId").value = item.id;
//     document.getElementById("itemName").value = item.name;
//     document.getElementById("itemCategory").value = item.categoryId || "";
//     document.getElementById("itemStock").value = item.currentStock;
//     document.getElementById("itemMinStock").value = item.minimumStock;
//     document.getElementById("itemPrice").value = item.unitCost;
//     document.getElementById("itemUnit").value = item.unit;
//     document.getElementById("itemDesc").value = item.description || "";

//     if (item.expiryDate) {
//         const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//         document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
//     } else {
//         document.getElementById("itemExpiry").value = "";
//     }

//     document.getElementById("itemModal").style.display = "flex";
// };

// window.archiveItem = function(id) {
//     Swal.fire({
//         title: 'Archive Item?',
//         text: "This will move the item to the inactive archive list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
//             Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
//         }
//     });
// };

// window.restoreItem = async function(id) {
//     await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
//     Swal.fire('Restored!', 'Item is now active.', 'success');
//     renderArchiveTable(); 
// };

// window.permanentDelete = function(id) {
//     Swal.fire({
//         title: 'Delete Permanently?',
//         text: "You won't be able to revert this!",
//         icon: 'error',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, COLLECTION_NAME, id));
//             Swal.fire('Deleted!', 'Item has been deleted.', 'success');
//             renderArchiveTable();
//         }
//     });
// };

// // ================= CATEGORY MANAGEMENT =================

// window.addCategory = async function() {
//     const input = document.getElementById("newCategoryInput");
//     const name = input.value.trim();

//     if (!name) return Swal.fire('Error', 'Category name required', 'warning');

//     const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());
//     if (exists) {
//         return Swal.fire('Error', 'This category already exists!', 'error');
//     }

//     try {
//         await addDoc(collection(db, CATEGORY_COLLECTION), { 
//             name: name,
//             status: 'active',
//             createdAt: new Date() 
//         });
        
//         input.value = "";
//         Swal.fire({ icon: 'success', title: 'Category Added', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };

// window.archiveCategory = function(id) {
//     Swal.fire({
//         title: 'Archive Category?',
//         text: "This will hide the category from the list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
//                     status: 'archived',
//                     updatedAt: new Date()
//                 });
//                 // Note: The list auto-refreshes because of onSnapshot
//             } catch (error) {
//                 Swal.fire('Error', error.message, 'error');
//             }
//         }
//     });
// };

// window.restoreCategory = async function(id) {
//     try {
//         await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
//             status: 'active',
//             updatedAt: new Date()
//         });
//         if(document.getElementById("archiveModal").style.display === 'flex') {
//             renderArchiveTable(); // Refresh archive modal if open
//         }
//         Swal.fire({ icon: 'success', title: 'Category Restored', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
//     } catch (e) {
//         Swal.fire('Error', e.message, 'error');
//     }
// }

// window.permanentDeleteCategory = function(id) {
//     Swal.fire({
//         title: 'Delete Category?',
//         text: "Gone forever!",
//         icon: 'error',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'Delete'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
//             if(document.getElementById("archiveModal").style.display === 'flex') {
//                 renderArchiveTable();
//             }
//         }
//     });
// }

// // Renders the list inside "Manage Categories"
// function renderCategoryList() {
//     const list = document.getElementById("categoryList");
//     if(!list) return;

//     // 1. Inject Toggle Button if missing
//     let toggleBtn = document.getElementById("toggleCatViewBtn");
//     if (!toggleBtn) {
//         const container = list.parentElement; 
//         const btnContainer = document.createElement("div");
//         const btnStyle = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 5px;";
//         btnContainer.style.cssText = btnStyle;
        
//         toggleBtn = document.createElement("button");
//         toggleBtn.id = "toggleCatViewBtn";
//         toggleBtn.className = "btn-secondary"; 
//         toggleBtn.style.cssText = "background: none; border: none; color: #555; cursor: pointer; text-decoration: underline; font-size: 0.9em;";
//         toggleBtn.onclick = toggleCategoryView;
        
//         btnContainer.appendChild(toggleBtn);
//         container.insertBefore(btnContainer, list);
//     }

//     // 2. Update Button Text
//     toggleBtn.innerHTML = showArchivedCats 
//         ? '<i class="fas fa-list"></i> Show Active Categories' 
//         : '<i class="fas fa-archive"></i> Show Archived Categories';

//     // 3. Filter List
//     const visibleCats = categoryData.filter(c => 
//         showArchivedCats ? c.status === 'archived' : c.status !== 'archived'
//     );

//     // 4. Generate HTML
//     let listHTML = "";
//     if (visibleCats.length === 0) {
//         listHTML = `<li style="text-align:center; color:#888; padding:10px;">
//             ${showArchivedCats ? "No archived categories." : "No categories found."}
//         </li>`;
//     } else {
//         visibleCats.forEach(cat => {
//             if (showArchivedCats) {
//                 // ARCHIVED VIEW
//                 listHTML += `
//                     <li style="background: #fff3cd; border-color: #ffeeba;">
//                         <span style="color: #856404;">${cat.name} (Archived)</span>
//                         <div>
//                             <button class="btn-icon-small" onclick="window.restoreCategory('${cat.id}')" title="Restore" style="color: #27ae60; margin-right: 5px;">
//                                 <i class="fas fa-undo"></i>
//                             </button>
//                              <button class="btn-icon-small" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete" style="color: #c0392b;">
//                                 <i class="fas fa-trash"></i>
//                             </button>
//                         </div>
//                     </li>
//                 `;
//             } else {
//                 // ACTIVE VIEW
//                 listHTML += `
//                     <li>
//                         <span>${cat.name}</span>
//                         <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive">
//                             <i class="fas fa-box-archive"></i>
//                         </button>
//                     </li>
//                 `;
//             }
//         });
//     }
//     list.innerHTML = listHTML;
// }

// window.toggleCategoryView = function() {
//     showArchivedCats = !showArchivedCats;
//     renderCategoryList();
// }

// // ================= ARCHIVE MODAL (TABS & TABLE) =================
// // ================= ARCHIVE MODAL (FIXED) =================

// window.openArchiveModal = () => {
//     currentArchiveTab = 'items'; // Default to items
//     document.getElementById("archiveModal").style.display = "flex";
    
//     // Inject Tab Buttons if they don't exist
//     const modalBody = document.querySelector("#archiveModal .modal-body");
//     let tabContainer = document.getElementById("archiveTabs");
    
//     if (!tabContainer && modalBody) {
//         tabContainer = document.createElement("div");
//         tabContainer.id = "archiveTabs";
//         tabContainer.style.cssText = "display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;";
        
//         // Note: Added 'window.' to onclick events to ensure they work in module mode
//         tabContainer.innerHTML = `
//             <button id="tabItems" onclick="window.switchArchiveTab('items')" style="background:none; border:none; font-weight:bold; cursor:pointer; padding: 5px 10px; border-bottom: 3px solid #e74c3c; color: #e74c3c;">Items</button>
//             <button id="tabCats" onclick="window.switchArchiveTab('categories')" style="background:none; border:none; color: #7f8c8d; cursor:pointer; padding: 5px 10px;">Categories</button>
//         `;
        
//         const tableContainer = modalBody.querySelector(".table-responsive");
//         if(tableContainer) modalBody.insertBefore(tabContainer, tableContainer);
//     }
//     renderArchiveTable();
// };

// window.switchArchiveTab = (tab) => {
//     currentArchiveTab = tab;
    
//     // Visual Feedback for Tabs
//     const btnItems = document.getElementById("tabItems");
//     const btnCats = document.getElementById("tabCats");

//     if(btnItems) {
//         btnItems.style.borderBottom = tab === 'items' ? "3px solid #e74c3c" : "none";
//         btnItems.style.color = tab === 'items' ? "#e74c3c" : "#7f8c8d";
//     }
    
//     if(btnCats) {
//         btnCats.style.borderBottom = tab === 'categories' ? "3px solid #e74c3c" : "none";
//         btnCats.style.color = tab === 'categories' ? "#e74c3c" : "#7f8c8d";
//     }
    
//     renderArchiveTable();
// };

// function renderArchiveTable() {
//     const tbody = document.getElementById("archiveTableBody");
//     // Find the closest table, then the thead inside it
//     const table = tbody.closest("table");
//     const thead = table.querySelector("thead tr");
    
//     tbody.innerHTML = "";

//     // --- TAB: ITEMS ---
//     if (currentArchiveTab === 'items') {
//         if (thead) {
//             thead.innerHTML = `<th>Item Name</th><th>Category</th><th>Last Stock</th><th>Actions</th>`;
//         }

//         const archivedItems = inventoryData.filter(i => i.status === 'archived');
        
//         if (archivedItems.length === 0) {
//             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
//             return;
//         }

//         archivedItems.forEach(item => {
//             const tr = document.createElement("tr");
//             tr.innerHTML = `
//                 <td><strong>${item.name}</strong></td>
//                 <td>${item.categoryName || "-"}</td>
//                 <td>${item.currentStock}</td>
//                 <td>
//                     <button class="btn-primary btn-sm" onclick="window.restoreItem('${item.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
//                         <i class="fas fa-undo"></i> Restore
//                     </button>
//                     <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </td>
//             `;
//             tbody.appendChild(tr);
//         });

//     // --- TAB: CATEGORIES ---
//     } else {
//         if (thead) {
//             thead.innerHTML = `<th>Category Name</th><th>Archived Date</th><th>Status</th><th>Actions</th>`;
//         }

//         const archivedCats = categoryData.filter(c => c.status === 'archived');
        
//         if (archivedCats.length === 0) {
//             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived categories found.</td></tr>`;
//             return;
//         }

//         archivedCats.forEach(cat => {
//             const dateStr = cat.updatedAt ? new Date(cat.updatedAt.seconds * 1000).toLocaleDateString() : "-";
//             const tr = document.createElement("tr");
//             tr.innerHTML = `
//                 <td><strong>${cat.name}</strong></td>
//                 <td>${dateStr}</td>
//                 <td><span class="badge" style="background:#fff3cd; color:#856404; padding:2px 8px; border-radius:10px; font-size:0.8em;">Archived</span></td>
//                 <td>
//                     <button class="btn-primary btn-sm" onclick="window.restoreCategory('${cat.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
//                         <i class="fas fa-undo"></i> Restore
//                     </button>
//                     <button class="btn-icon delete" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </td>
//             `;
//             tbody.appendChild(tr);
//         });
//     }
// }



// // ================= MODAL & LISTENER LOGIC =================

// function setupListeners() {
//     // 1. Search & Category Filters
//     const searchInput = document.getElementById("searchInput");
//     if (searchInput) searchInput.addEventListener("keyup", filterAndRender);
    
//     const catFilter = document.getElementById("categoryFilter");
//     if (catFilter) catFilter.addEventListener("change", filterAndRender);

//     // 2. Add New Item Button
//     // We check for both a class '.btn-add' and an ID 'addItemBtn' to be safe
//     const addItemBtn = document.querySelector(".btn-add") || document.getElementById("addItemBtn");
//     if (addItemBtn) {
//         addItemBtn.onclick = () => {
//             document.getElementById("itemForm").reset();
//             document.getElementById("itemId").value = "";
//             document.getElementById("modalTitle").innerText = "Add New Item";
//             document.getElementById("itemModal").style.display = "flex";
//         };
//     }

//     // 3. Manage Categories Button (This was missing!)
//     const manageCatBtn = document.querySelector(".btn-manage-cats") || document.getElementById("manageCatsBtn");
//     if (manageCatBtn) {
//         manageCatBtn.onclick = () => {
//             document.getElementById("categoryModal").style.display = "flex";
//             renderCategoryList(); // Refresh the list when opening
//         };
//     }

//     // 4. Archive Button (If you have a separate button for it)
//     const archiveBtn = document.getElementById("viewArchiveBtn");
//     if (archiveBtn) {
//         archiveBtn.onclick = () => window.openArchiveModal();
//     }

//     // 5. Attach Close Logic to all "X" buttons
//     document.querySelectorAll(".close").forEach(btn => {
//         btn.onclick = () => window.closeModal();
//     });

//     // 6. Form Submit Listener
//     const itemForm = document.getElementById("itemForm");
//     if (itemForm) itemForm.addEventListener("submit", window.saveItem);

//     // 7. Export Button Listener (INJECTED)
//     const exportBtn = document.getElementById("exportBtn");
//     if (exportBtn) {
//         exportBtn.onclick = window.exportToCSV;
//     }
// }

// // Global Close Function
// window.closeModal = function() {
//     // Finds all elements with the class 'modal' and hides them
//     const modals = document.querySelectorAll(".modal");
//     modals.forEach(modal => {
//         modal.style.display = "none";
//     });
// };

// // Close Modal when clicking the dark background
// window.onclick = function(event) {
//     if (event.target.classList.contains("modal")) {
//         window.closeModal();
//     }
// };



// // import {
// //     collection,
// //     addDoc,
// //     updateDoc,
// //     deleteDoc,
// //     doc,
// //     onSnapshot,
// //     query,
// //     orderBy,
// //     where
// // } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// // import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { db } from './firebase.js';

// // const auth = getAuth();
// // const COLLECTION_NAME = "inventory";
// // const CATEGORY_COLLECTION = "categories";

// // // Global Variables
// // let inventoryData = [];
// // let categoryData = [];
// // let currentStatusFilter = "all";

// // // Toggle States
// // let currentArchiveTab = 'items'; // Default to items in Archive Modal
// // let showArchivedCats = false;    // Default to hiding archived in Category Manager

// // document.addEventListener("DOMContentLoaded", () => {
// //     // Set Date
// //     const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //     document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

// //     loadCategories();
// //     loadInventory();
// //     setupListeners();
// // });

// // // ================= LOGOUT LOGIC =================
// // window.handleLogout = function() {
// //     Swal.fire({
// //         title: 'Logout?',
// //         text: "Are you sure you want to sign out?",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#e74c3c',
// //         confirmButtonText: 'Yes, Logout'
// //     }).then((result) => {
// //         if (result.isConfirmed) {
// //             signOut(auth).then(() => {
// //                 window.location.href = "index.html";
// //             }).catch((error) => {
// //                 Swal.fire('Error', error.message, 'error');
// //             });
// //         }
// //     });
// // };


// // // ================= LOAD DATA (INVENTORY FIXED) =================
// // function loadInventory() {
// //     const q = query(collection(db, COLLECTION_NAME));
// //     onSnapshot(q, (snapshot) => {
// //         inventoryData = [];
// //         snapshot.forEach(docSnap => {
// //             // FIX: We put docSnap.data() FIRST.
// //             // This ensures the Real Firestore ID (docSnap.id) overwrites any fake 'id' inside the data.
// //             inventoryData.push({ ...docSnap.data(), id: docSnap.id });
// //         });
// //         updateDashboardStats();
// //         filterAndRender(); // Updates Main Table
        
// //         // If the archive modal is open, refresh it too
// //         if(document.getElementById("archiveModal").style.display === "flex"){
// //             renderArchiveTable();
// //         }
// //     });
// // }


// // // ================= LOAD CATEGORIES (FIXED) =================
// // function loadCategories() {
// //     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
// //     onSnapshot(q, (snapshot) => {
// //         categoryData = [];
// //         const filter = document.getElementById("categoryFilter");
// //         const select = document.getElementById("itemCategory");
        
// //         // Default Options
// //         let filterHTML = `<option value="all">All Categories</option>`;
// //         let selectHTML = `<option value="">Select Category</option>`;

// //         snapshot.forEach(docSnap => {
// //             // FIX: Put docSnap.data() FIRST, and id: docSnap.id LAST.
// //             // This ensures the real Firestore ID overwrites any fake 'id' inside the data.
// //             const cat = { ...docSnap.data(), id: docSnap.id }; 
            
// //             categoryData.push(cat); 

// //             // Only populate Dropdowns with ACTIVE categories
// //             if (cat.status !== 'archived') {
// //                 filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
// //                 selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
// //             }
// //         });

// //         if (filter) filter.innerHTML = filterHTML;
// //         if (select) select.innerHTML = selectHTML;

// //         // Render the "Manage Categories" list
// //         renderCategoryList();
// //     });
// // }
// // // ================= DASHBOARD & STATS =================
// // function updateDashboardStats() {
// //     const activeItems = inventoryData.filter(i => i.status !== 'archived');
// //     const total = activeItems.length;
    
// //     const low = activeItems.filter(i => {
// //         const stock = parseFloat(i.currentStock) || 0;
// //         const min = parseFloat(i.minimumStock) || 0;
// //         return stock <= min && stock > 0;
// //     }).length;

// //     const today = new Date();
// //     const next7 = new Date();
// //     next7.setDate(today.getDate() + 7);

// //     const expiring = activeItems.filter(i => {
// //         if (!i.expiryDate) return false;
// //         const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
// //         return d <= next7 && d >= today;
// //     }).length;

// //     document.getElementById("stat-total-items").innerText = total;
// //     document.getElementById("stat-low-stock").innerText = low;
// //     document.getElementById("stat-expiring").innerText = expiring;
// // }

// // // ================= MAIN TABLE RENDERER =================
// // window.filterStatus = function(type) {
// //     currentStatusFilter = type;
// //     filterAndRender();
// // };

// // function filterAndRender() {
// //     const search = document.getElementById("searchInput").value.toLowerCase();
// //     const cat = document.getElementById("categoryFilter").value;
    
// //     // Default: Show only items that are NOT archived
// //     let filtered = inventoryData.filter(item => item.status !== 'archived');

// //     filtered = filtered.filter(item => {
// //         const matchSearch = item.name.toLowerCase().includes(search);
// //         const matchCat = cat === "all" || item.categoryName === cat;
        
// //         let matchStatus = true;
// //         const stock = Number(item.currentStock) || 0;
// //         const min = Number(item.minimumStock) || 0;

// //         if (currentStatusFilter === "low") {
// //             matchStatus = stock <= min && stock > 0;
// //         } else if (currentStatusFilter === "expiring") {
// //              if (!item.expiryDate) return false;
// //              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //              const today = new Date();
// //              const next7 = new Date();
// //              next7.setDate(today.getDate() + 7);
// //              matchStatus = d <= next7 && d >= today;
// //         }
        
// //         return matchSearch && matchCat && matchStatus;
// //     });

// //     // Calculate Total Value based on current view
// //     const currentViewValue = filtered.reduce((sum, i) => {
// //         const stock = parseFloat(i.currentStock) || 0;
// //         const cost = parseFloat(i.unitCost) || 0;
// //         return sum + (stock * cost);
// //     }, 0);

// //     document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
// //         minimumFractionDigits: 2, 
// //         maximumFractionDigits: 2
// //     });

// //     renderTable(filtered);
// // }

// // function renderTable(data) {
// //     const tbody = document.getElementById("inventoryTableBody");
// //     tbody.innerHTML = "";

// //     if (data.length === 0) {
// //         tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
// //         return;
// //     }

// //     data.forEach(item => {
// //         const stock = Number(item.currentStock) || 0;
// //         const min = Number(item.minimumStock) || 0;
// //         const cost = Number(item.unitCost) || 0;
// //         const rowTotal = stock * cost;

// //         // Status Badge Logic
// //         let statusBadge = '';
// //         if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
// //         else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
// //         else statusBadge = '<span class="badge badge-good">Good</span>';

// //         if(item.expiryDate) {
// //              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //              const today = new Date();
// //              const next7 = new Date(); next7.setDate(today.getDate() + 7);
// //              if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
// //         }

// //         const tr = document.createElement("tr");
// //         tr.innerHTML = `
// //             <td><strong>${item.name}</strong></td>
// //             <td>${item.categoryName || "-"}</td>
// //             <td>${stock} ${item.unit || ''}</td>
// //             <td>₱${cost.toLocaleString()}</td>
// //             <td style="font-weight: bold; color: #2c3e50;">₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
// //             <td>${statusBadge}</td>
// //             <td>
// //                 <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
// //                     <i class="fas fa-edit"></i>
// //                 </button>
// //                 <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
// //                     <i class="fas fa-box-archive"></i>
// //                 </button>
// //             </td>
// //         `;
// //         tbody.appendChild(tr);
// //     });
// // }

// // // ================= ITEM ACTIONS (Add/Edit/Archive) =================
// // window.saveItem = async function(e) {
// //     e.preventDefault();
    
// //     const id = document.getElementById("itemId").value;
// //     const name = document.getElementById("itemName").value.trim();
// //     const select = document.getElementById("itemCategory");
    
// //     // Duplicate check
// //     const duplicate = inventoryData.find(i => 
// //         i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
// //     );

// //     if (duplicate) {
// //         return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
// //     }

// //     const data = {
// //         name,
// //         categoryId: select.value,
// //         categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
// //         currentStock: Number(document.getElementById("itemStock").value),
// //         minimumStock: Number(document.getElementById("itemMinStock").value),
// //         unitCost: Number(document.getElementById("itemPrice").value),
// //         unit: document.getElementById("itemUnit").value,
// //         description: document.getElementById("itemDesc").value,
// //         status: 'active',
// //         updatedAt: new Date()
// //     };

// //     const expiry = document.getElementById("itemExpiry").value;
// //     if (expiry) data.expiryDate = new Date(expiry);

// //     try {
// //         if (id) {
// //             await updateDoc(doc(db, COLLECTION_NAME, id), data);
// //             Swal.fire('Success', 'Item updated successfully', 'success');
// //         } else {
// //             data.createdAt = new Date();
// //             await addDoc(collection(db, COLLECTION_NAME), data);
// //             Swal.fire('Success', 'Item added successfully', 'success');
// //         }
// //         window.closeModal();
// //         document.getElementById("itemForm").reset();
// //     } catch (error) {
// //         Swal.fire('Error', error.message, 'error');
// //     }
// // };

// // window.editItem = function(id) {
// //     const item = inventoryData.find(i => i.id === id);
// //     if (!item) return;

// //     document.getElementById("modalTitle").innerText = "Edit Item";
// //     document.getElementById("itemId").value = item.id;
// //     document.getElementById("itemName").value = item.name;
// //     document.getElementById("itemCategory").value = item.categoryId || "";
// //     document.getElementById("itemStock").value = item.currentStock;
// //     document.getElementById("itemMinStock").value = item.minimumStock;
// //     document.getElementById("itemPrice").value = item.unitCost;
// //     document.getElementById("itemUnit").value = item.unit;
// //     document.getElementById("itemDesc").value = item.description || "";

// //     if (item.expiryDate) {
// //         const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
// //         document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
// //     } else {
// //         document.getElementById("itemExpiry").value = "";
// //     }

// //     document.getElementById("itemModal").style.display = "flex";
// // };

// // window.archiveItem = function(id) {
// //     Swal.fire({
// //         title: 'Archive Item?',
// //         text: "This will move the item to the inactive archive list.",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#f39c12',
// //         confirmButtonText: 'Yes, Archive it'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
// //             Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
// //         }
// //     });
// // };

// // window.restoreItem = async function(id) {
// //     await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
// //     Swal.fire('Restored!', 'Item is now active.', 'success');
// //     renderArchiveTable(); 
// // };

// // window.permanentDelete = function(id) {
// //     Swal.fire({
// //         title: 'Delete Permanently?',
// //         text: "You won't be able to revert this!",
// //         icon: 'error',
// //         showCancelButton: true,
// //         confirmButtonColor: '#d33',
// //         confirmButtonText: 'Yes, delete it!'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await deleteDoc(doc(db, COLLECTION_NAME, id));
// //             Swal.fire('Deleted!', 'Item has been deleted.', 'success');
// //             renderArchiveTable();
// //         }
// //     });
// // };

// // // ================= CATEGORY MANAGEMENT =================

// // window.addCategory = async function() {
// //     const input = document.getElementById("newCategoryInput");
// //     const name = input.value.trim();

// //     if (!name) return Swal.fire('Error', 'Category name required', 'warning');

// //     const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());
// //     if (exists) {
// //         return Swal.fire('Error', 'This category already exists!', 'error');
// //     }

// //     try {
// //         await addDoc(collection(db, CATEGORY_COLLECTION), { 
// //             name: name,
// //             status: 'active',
// //             createdAt: new Date() 
// //         });
        
// //         input.value = "";
// //         Swal.fire({ icon: 'success', title: 'Category Added', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
// //     } catch (error) {
// //         Swal.fire('Error', error.message, 'error');
// //     }
// // };

// // window.archiveCategory = function(id) {
// //     Swal.fire({
// //         title: 'Archive Category?',
// //         text: "This will hide the category from the list.",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#f39c12',
// //         confirmButtonText: 'Yes, Archive it'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             try {
// //                 await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
// //                     status: 'archived',
// //                     updatedAt: new Date()
// //                 });
// //                 // Note: The list auto-refreshes because of onSnapshot
// //             } catch (error) {
// //                 Swal.fire('Error', error.message, 'error');
// //             }
// //         }
// //     });
// // };

// // window.restoreCategory = async function(id) {
// //     try {
// //         await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
// //             status: 'active',
// //             updatedAt: new Date()
// //         });
// //         if(document.getElementById("archiveModal").style.display === 'flex') {
// //             renderArchiveTable(); // Refresh archive modal if open
// //         }
// //         Swal.fire({ icon: 'success', title: 'Category Restored', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
// //     } catch (e) {
// //         Swal.fire('Error', e.message, 'error');
// //     }
// // }

// // window.permanentDeleteCategory = function(id) {
// //     Swal.fire({
// //         title: 'Delete Category?',
// //         text: "Gone forever!",
// //         icon: 'error',
// //         showCancelButton: true,
// //         confirmButtonColor: '#d33',
// //         confirmButtonText: 'Delete'
// //     }).then(async (result) => {
// //         if (result.isConfirmed) {
// //             await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
// //             if(document.getElementById("archiveModal").style.display === 'flex') {
// //                 renderArchiveTable();
// //             }
// //         }
// //     });
// // }

// // // Renders the list inside "Manage Categories"
// // function renderCategoryList() {
// //     const list = document.getElementById("categoryList");
// //     if(!list) return;

// //     // 1. Inject Toggle Button if missing
// //     let toggleBtn = document.getElementById("toggleCatViewBtn");
// //     if (!toggleBtn) {
// //         const container = list.parentElement; 
// //         const btnContainer = document.createElement("div");
// //         btnContainer.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 5px;";
        
// //         toggleBtn = document.createElement("button");
// //         toggleBtn.id = "toggleCatViewBtn";
// //         toggleBtn.className = "btn-secondary"; 
// //         toggleBtn.style.cssText = "background: none; border: none; color: #555; cursor: pointer; text-decoration: underline; font-size: 0.9em;";
// //         toggleBtn.onclick = toggleCategoryView;
        
// //         btnContainer.appendChild(toggleBtn);
// //         container.insertBefore(btnContainer, list);
// //     }

// //     // 2. Update Button Text
// //     toggleBtn.innerHTML = showArchivedCats 
// //         ? '<i class="fas fa-list"></i> Show Active Categories' 
// //         : '<i class="fas fa-archive"></i> Show Archived Categories';

// //     // 3. Filter List
// //     const visibleCats = categoryData.filter(c => 
// //         showArchivedCats ? c.status === 'archived' : c.status !== 'archived'
// //     );

// //     // 4. Generate HTML
// //     let listHTML = "";
// //     if (visibleCats.length === 0) {
// //         listHTML = `<li style="text-align:center; color:#888; padding:10px;">
// //             ${showArchivedCats ? "No archived categories." : "No categories found."}
// //         </li>`;
// //     } else {
// //         visibleCats.forEach(cat => {
// //             if (showArchivedCats) {
// //                 // ARCHIVED VIEW
// //                 listHTML += `
// //                     <li style="background: #fff3cd; border-color: #ffeeba;">
// //                         <span style="color: #856404;">${cat.name} (Archived)</span>
// //                         <div>
// //                             <button class="btn-icon-small" onclick="window.restoreCategory('${cat.id}')" title="Restore" style="color: #27ae60; margin-right: 5px;">
// //                                 <i class="fas fa-undo"></i>
// //                             </button>
// //                              <button class="btn-icon-small" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete" style="color: #c0392b;">
// //                                 <i class="fas fa-trash"></i>
// //                             </button>
// //                         </div>
// //                     </li>
// //                 `;
// //             } else {
// //                 // ACTIVE VIEW
// //                 listHTML += `
// //                     <li>
// //                         <span>${cat.name}</span>
// //                         <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive">
// //                             <i class="fas fa-box-archive"></i>
// //                         </button>
// //                     </li>
// //                 `;
// //             }
// //         });
// //     }
// //     list.innerHTML = listHTML;
// // }

// // window.toggleCategoryView = function() {
// //     showArchivedCats = !showArchivedCats;
// //     renderCategoryList();
// // }

// // // ================= ARCHIVE MODAL (TABS & TABLE) =================
// // // ================= ARCHIVE MODAL (FIXED) =================

// // window.openArchiveModal = () => {
// //     currentArchiveTab = 'items'; // Default to items
// //     document.getElementById("archiveModal").style.display = "flex";
    
// //     // Inject Tab Buttons if they don't exist
// //     const modalBody = document.querySelector("#archiveModal .modal-body");
// //     let tabContainer = document.getElementById("archiveTabs");
    
// //     if (!tabContainer && modalBody) {
// //         tabContainer = document.createElement("div");
// //         tabContainer.id = "archiveTabs";
// //         tabContainer.style.cssText = "display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;";
        
// //         // Note: Added 'window.' to onclick events to ensure they work in module mode
// //         tabContainer.innerHTML = `
// //             <button id="tabItems" onclick="window.switchArchiveTab('items')" style="background:none; border:none; font-weight:bold; cursor:pointer; padding: 5px 10px; border-bottom: 3px solid #e74c3c; color: #e74c3c;">Items</button>
// //             <button id="tabCats" onclick="window.switchArchiveTab('categories')" style="background:none; border:none; color: #7f8c8d; cursor:pointer; padding: 5px 10px;">Categories</button>
// //         `;
        
// //         const tableContainer = modalBody.querySelector(".table-responsive");
// //         if(tableContainer) modalBody.insertBefore(tabContainer, tableContainer);
// //     }
// //     renderArchiveTable();
// // };

// // window.switchArchiveTab = (tab) => {
// //     currentArchiveTab = tab;
    
// //     // Visual Feedback for Tabs
// //     const btnItems = document.getElementById("tabItems");
// //     const btnCats = document.getElementById("tabCats");

// //     if(btnItems) {
// //         btnItems.style.borderBottom = tab === 'items' ? "3px solid #e74c3c" : "none";
// //         btnItems.style.color = tab === 'items' ? "#e74c3c" : "#7f8c8d";
// //     }
    
// //     if(btnCats) {
// //         btnCats.style.borderBottom = tab === 'categories' ? "3px solid #e74c3c" : "none";
// //         btnCats.style.color = tab === 'categories' ? "#e74c3c" : "#7f8c8d";
// //     }
    
// //     renderArchiveTable();
// // };

// // function renderArchiveTable() {
// //     const tbody = document.getElementById("archiveTableBody");
// //     // Find the closest table, then the thead inside it
// //     const table = tbody.closest("table");
// //     const thead = table.querySelector("thead tr");
    
// //     tbody.innerHTML = "";

// //     // --- TAB: ITEMS ---
// //     if (currentArchiveTab === 'items') {
// //         if (thead) {
// //             thead.innerHTML = `<th>Item Name</th><th>Category</th><th>Last Stock</th><th>Actions</th>`;
// //         }

// //         const archivedItems = inventoryData.filter(i => i.status === 'archived');
        
// //         if (archivedItems.length === 0) {
// //             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
// //             return;
// //         }

// //         archivedItems.forEach(item => {
// //             const tr = document.createElement("tr");
// //             tr.innerHTML = `
// //                 <td><strong>${item.name}</strong></td>
// //                 <td>${item.categoryName || "-"}</td>
// //                 <td>${item.currentStock}</td>
// //                 <td>
// //                     <button class="btn-primary btn-sm" onclick="window.restoreItem('${item.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
// //                         <i class="fas fa-undo"></i> Restore
// //                     </button>
// //                     <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
// //                         <i class="fas fa-trash"></i>
// //                     </button>
// //                 </td>
// //             `;
// //             tbody.appendChild(tr);
// //         });

// //     // --- TAB: CATEGORIES ---
// //     } else {
// //         if (thead) {
// //             thead.innerHTML = `<th>Category Name</th><th>Archived Date</th><th>Status</th><th>Actions</th>`;
// //         }

// //         const archivedCats = categoryData.filter(c => c.status === 'archived');
        
// //         if (archivedCats.length === 0) {
// //             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived categories found.</td></tr>`;
// //             return;
// //         }

// //         archivedCats.forEach(cat => {
// //             const dateStr = cat.updatedAt ? new Date(cat.updatedAt.seconds * 1000).toLocaleDateString() : "-";
// //             const tr = document.createElement("tr");
// //             tr.innerHTML = `
// //                 <td><strong>${cat.name}</strong></td>
// //                 <td>${dateStr}</td>
// //                 <td><span class="badge" style="background:#fff3cd; color:#856404; padding:2px 8px; border-radius:10px; font-size:0.8em;">Archived</span></td>
// //                 <td>
// //                     <button class="btn-primary btn-sm" onclick="window.restoreCategory('${cat.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
// //                         <i class="fas fa-undo"></i> Restore
// //                     </button>
// //                     <button class="btn-icon delete" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
// //                         <i class="fas fa-trash"></i>
// //                     </button>
// //                 </td>
// //             `;
// //             tbody.appendChild(tr);
// //         });


        
// //     }




    
// // }



// // // ================= MODAL & LISTENER LOGIC =================

// // function setupListeners() {
// //     // 1. Search & Category Filters
// //     const searchInput = document.getElementById("searchInput");
// //     if (searchInput) searchInput.addEventListener("keyup", filterAndRender);
    
// //     const catFilter = document.getElementById("categoryFilter");
// //     if (catFilter) catFilter.addEventListener("change", filterAndRender);

// //     // 2. Add New Item Button
// //     // We check for both a class '.btn-add' and an ID 'addItemBtn' to be safe
// //     const addItemBtn = document.querySelector(".btn-add") || document.getElementById("addItemBtn");
// //     if (addItemBtn) {
// //         addItemBtn.onclick = () => {
// //             document.getElementById("itemForm").reset();
// //             document.getElementById("itemId").value = "";
// //             document.getElementById("modalTitle").innerText = "Add New Item";
// //             document.getElementById("itemModal").style.display = "flex";
// //         };
// //     }

// //     // 3. Manage Categories Button (This was missing!)
// //     const manageCatBtn = document.querySelector(".btn-manage-cats") || document.getElementById("manageCatsBtn");
// //     if (manageCatBtn) {
// //         manageCatBtn.onclick = () => {
// //             document.getElementById("categoryModal").style.display = "flex";
// //             renderCategoryList(); // Refresh the list when opening
// //         };
// //     }

// //     // 4. Archive Button (If you have a separate button for it)
// //     const archiveBtn = document.getElementById("viewArchiveBtn");
// //     if (archiveBtn) {
// //         archiveBtn.onclick = () => window.openArchiveModal();
// //     }

// //     // 5. Attach Close Logic to all "X" buttons
// //     document.querySelectorAll(".close").forEach(btn => {
// //         btn.onclick = () => window.closeModal();
// //     });

// //     // 6. Form Submit Listener
// //     const itemForm = document.getElementById("itemForm");
// //     if (itemForm) itemForm.addEventListener("submit", window.saveItem);
// // }

// // // Global Close Function
// // window.closeModal = function() {
// //     // Finds all elements with the class 'modal' and hides them
// //     const modals = document.querySelectorAll(".modal");
// //     modals.forEach(modal => {
// //         modal.style.display = "none";
// //     });
// // };

// // // Close Modal when clicking the dark background
// // window.onclick = function(event) {
// //     if (event.target.classList.contains("modal")) {
// //         window.closeModal();
// //     }
// // };







// import { 
//     collection, 
//     addDoc, 
//     setDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc, 
//     onSnapshot, 
//     query, 
//     where, 
//     orderBy 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// import { db } from './firebase.js';

// // --- CONFIGURATION ---
// const COLLECTION_NAME = "inventory";
// const CATEGORY_COLLECTION = "categories";
// const LOGS_COLLECTION = "inventory_logs";
// let inventoryData = [];
// let categoryData = []; 

// // Variables for Custom Modals
// let currentEditCatId = null;
// let currentDeleteCatId = null;

// // --- INITIALIZATION ---
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("Inventory System Started...");

//     // 1. Inject Custom Modals (Edit/Delete UI)
//     injectCategoryModals();

//     // 2. Set Date
//     const dateEl = document.getElementById('currentDate');
//     if(dateEl) {
//         dateEl.innerText = new Date().toLocaleDateString('en-US', { 
//             weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
//         });
//     }

//     // 3. Load Data
//     loadCategories();
//     loadInventory();
    
//     // 4. Setup Listeners
//     setupEventListeners();
// });

// // ============================================================
// // 1. DATA LOADING & DISPLAY
// // ============================================================

// function loadInventory() {
//     const q = query(collection(db, COLLECTION_NAME));
    
//     onSnapshot(q, (snapshot) => {
//         inventoryData = [];
//         snapshot.forEach((doc) => {
//             inventoryData.push({ id: doc.id, ...doc.data() });
//         });
//         updateDashboardStats(inventoryData);
//         filterAndRender(); 
//     }, (error) => {
//         console.error("Error loading inventory:", error);
//     });
// }

// function loadCategories() {
//     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
//     onSnapshot(q, (snapshot) => {
//         categoryData = [];
//         const filterSelect = document.getElementById('categoryFilter');
//         const modalSelect = document.getElementById('itemCategory');
//         const managerList = document.getElementById('categoryListBody');
        
//         let optionsHTML = '<option value="all">All Categories</option>';
//         let modalHTML = '<option value="" disabled selected>Select Category</option>';
//         let listHTML = '';

//         if (snapshot.empty && managerList) {
//             managerList.innerHTML = '<tr><td style="text-align:center; padding:15px; color:#888;">No categories yet.</td></tr>';
//         }

//         snapshot.forEach(doc => {
//             const cat = { id: doc.id, ...doc.data() };
//             categoryData.push(cat);

//             // Populate Dropdowns
//             optionsHTML += `<option value="${cat.name}">${cat.name}</option>`;
//             modalHTML += `<option value="${cat.id}">${cat.name}</option>`;

//             // Populate Manager List 
//             const safeName = cat.name.replace(/'/g, "\\'"); 
            
//             // Buttons aligned to the right, slightly closer to text
//             listHTML += `
//                 <tr style="border-bottom: 1px solid #f0f0f0;">
//                     <td style="padding: 12px 10px;">
//                         <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                            
//                             <span style="font-weight: 500; font-size: 15px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 15px;">${cat.name}</span>
                            
//                             <div style="display: flex; gap: 8px; flex-shrink: 0; margin-right: 45px;"> 
//                                 <button onclick="openEditCatModal('${cat.id}', '${safeName}')" 
//                                         title="Edit Name"
//                                         style="color: #3498db; border: none; background: #eaf6ff; width:32px; height:32px; border-radius:6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
//                                     <i class="fas fa-pencil-alt" style="font-size: 14px;"></i>
//                                 </button>

//                                 <button onclick="openDeleteCatModal('${cat.id}')" 
//                                         title="Delete Category"
//                                         style="color: #e74a3b; border: none; background: #fee2e2; width:32px; height:32px; border-radius:6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
//                                     <i class="fas fa-trash" style="font-size: 14px;"></i>
//                                 </button>
//                             </div>

//                         </div>
//                     </td>
//                 </tr>
//             `;
//         });

//         if(filterSelect) filterSelect.innerHTML = optionsHTML;
//         if(modalSelect) modalSelect.innerHTML = modalHTML;
//         if(managerList && !snapshot.empty) managerList.innerHTML = listHTML; 
//     });
// }

// function updateDashboardStats(data) {
//     const totalItems = data.length;
//     const lowStockCount = data.filter(item => (Number(item.currentStock)||0) <= (Number(item.minimumStock)||0)).length;
//     const totalValue = data.reduce((sum, item) => sum + ((Number(item.currentStock)||0) * (Number(item.unitCost)||0)), 0);

//     const elTotal = document.getElementById('stat-total-items');
//     const elLow = document.getElementById('stat-low-stock');
//     const elValue = document.getElementById('stat-total-value');

//     if(elTotal) elTotal.innerText = totalItems;
//     if(elLow) elLow.innerText = lowStockCount;
//     if(elValue) elValue.innerText = '₱' + totalValue.toLocaleString(undefined, {minimumFractionDigits: 2});
// }

// // ============================================================
// // 2. CSV EXPORT (NEW)
// // ============================================================

// function exportToCSV() {
//     if (inventoryData.length === 0) {
//         showToast("No data to export", "error");
//         return;
//     }

//     // Define Headers
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Name,Category,Current Stock,Unit,Cost (PHP),Total Value,Status,Last Restocked,Description\n";

//     // Loop through data rows
//     inventoryData.forEach(item => {
//         const stock = Number(item.currentStock) || 0;
//         const cost = Number(item.unitCost) || 0;
//         const totalVal = stock * cost;
//         const lastRestock = item.lastRestocked ? new Date(item.lastRestocked.seconds * 1000).toLocaleDateString() : '-';

//         // Escape commas in text fields to prevent CSV breaking
//         const name = (item.name || "").replace(/,/g, " ");
//         const cat = (item.categoryName || "Uncategorized").replace(/,/g, " ");
//         const desc = (item.description || "").replace(/,/g, " ");

//         const row = [
//             name,
//             cat,
//             stock,
//             item.unit || "",
//             cost.toFixed(2),
//             totalVal.toFixed(2),
//             item.status || "Unknown",
//             lastRestock,
//             desc
//         ].join(",");

//         csvContent += row + "\n";
//     });

//     // Create Download Link
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "Inventory_Report_" + new Date().toISOString().split('T')[0] + ".csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     showToast("Export Downloaded!");
// }

// // ============================================================
// // 3. UI HELPERS & INJECTION
// // ============================================================

// function injectCategoryModals() {
//     const modalHTML = `
//     <style>
//         .custom-ui-overlay {
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: rgba(0,0,0,0.5); z-index: 9999; display: none;
//             justify-content: center; align-items: center;
//         }
//         .custom-ui-box {
//             background: white; width: 90%; max-width: 400px; padding: 25px;
//             border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//             text-align: center; font-family: sans-serif;
//         }
//         .custom-ui-title { margin-top: 0; font-size: 18px; color: #333; margin-bottom: 15px;}
//         .custom-ui-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; }
//         .custom-ui-btns { display: flex; justify-content: center; gap: 10px; }
//         .btn-ui { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
//         .btn-ui-save { background: #27ae60; color: white; }
//         .btn-ui-del { background: #c0392b; color: white; }
//         .btn-ui-cancel { background: #ecf0f1; color: #7f8c8d; }
//     </style>

//     <div id="ui-edit-cat-modal" class="custom-ui-overlay">
//         <div class="custom-ui-box">
//             <h3 class="custom-ui-title">Edit Category Name</h3>
//             <input type="text" id="ui-edit-cat-input" class="custom-ui-input" placeholder="Enter new name...">
//             <div class="custom-ui-btns">
//                 <button onclick="closeCustomUI()" class="btn-ui btn-ui-cancel">Cancel</button>
//                 <button onclick="confirmEditCategory()" class="btn-ui btn-ui-save">Save Changes</button>
//             </div>
//         </div>
//     </div>

//     <div id="ui-delete-cat-modal" class="custom-ui-overlay">
//         <div class="custom-ui-box">
//             <div style="color: #e74a3b; font-size: 40px; margin-bottom: 10px;"><i class="fas fa-exclamation-circle"></i></div>
//             <h3 class="custom-ui-title">Delete this Category?</h3>
//             <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
//                 Items in this category will become <b>"Uncategorized"</b>. This action cannot be undone.
//             </p>
//             <div class="custom-ui-btns">
//                 <button onclick="closeCustomUI()" class="btn-ui btn-ui-cancel">Cancel</button>
//                 <button onclick="confirmDeleteCategory()" class="btn-ui btn-ui-del">Yes, Delete</button>
//             </div>
//         </div>
//     </div>
//     `;
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
// }

// function closeCustomUI() {
//     document.getElementById('ui-edit-cat-modal').style.display = 'none';
//     document.getElementById('ui-delete-cat-modal').style.display = 'none';
//     currentEditCatId = null;
//     currentDeleteCatId = null;
// }

// // ============================================================
// // 4. CATEGORY ACTIONS
// // ============================================================

// window.openEditCatModal = function(id, currentName) {
//     currentEditCatId = id;
//     const input = document.getElementById('ui-edit-cat-input');
//     input.value = currentName;
//     document.getElementById('ui-edit-cat-modal').style.display = 'flex';
//     input.focus();
// }

// window.confirmEditCategory = async function() {
//     const newName = document.getElementById('ui-edit-cat-input').value.trim();
//     if (!newName) { showToast("Name cannot be empty", "error"); return; }
    
//     try {
//         await updateDoc(doc(db, CATEGORY_COLLECTION, currentEditCatId), { name: newName });
//         showToast("Category Updated");
//         closeCustomUI();
//     } catch (error) {
//         console.error("Edit Error", error);
//         showToast("Update failed", "error");
//     }
// }

// window.openDeleteCatModal = function(id) {
//     currentDeleteCatId = id;
//     document.getElementById('ui-delete-cat-modal').style.display = 'flex';
// }

// window.confirmDeleteCategory = async function() {
//     try {
//         await deleteDoc(doc(db, CATEGORY_COLLECTION, currentDeleteCatId));
//         showToast("Category Deleted");
//         closeCustomUI();
//     } catch (error) {
//         console.error("Delete Error", error);
//         showToast("Delete failed", "error");
//     }
// }

// async function addCategory() {
//     const input = document.getElementById('newCategoryInput');
//     const btn = document.getElementById('btnAddCategory');
//     const name = input.value.trim();

//     if(!name) { showToast("Enter a category name", "error"); return; }
//     setLoading(btn, true);

//     try {
//         await addDoc(collection(db, CATEGORY_COLLECTION), { name: name, createdAt: new Date() });
//         input.value = ''; 
//         showToast("Category Added");
//     } catch (error) {
//         showToast("Failed to add category", "error");
//     } finally {
//         setLoading(btn, false);
//     }
// }

// // ============================================================
// // 5. ITEM MANAGEMENT & TABLE RENDERING
// // ============================================================

// function setupEventListeners() {
//     const searchInput = document.getElementById('searchInput');
//     const catFilter = document.getElementById('categoryFilter');
//     if(searchInput) searchInput.addEventListener('input', filterAndRender);
//     if(catFilter) catFilter.addEventListener('change', filterAndRender);
// }

// function filterAndRender() {
//     const searchInput = document.getElementById('searchInput');
//     const catFilter = document.getElementById('categoryFilter');
//     const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
//     const selectedCat = catFilter ? catFilter.value : "all";

//     const filteredData = inventoryData.filter(item => {
//         const matchesSearch = item.name.toLowerCase().includes(searchTerm);
//         const matchesCat = selectedCat === "all" || item.categoryName === selectedCat;
//         return matchesSearch && matchesCat;
//     });
//     renderTable(filteredData);
// }

// function renderTable(data) {
//     const tbody = document.getElementById('inventoryTableBody');
//     if(!tbody) return;
//     tbody.innerHTML = '';

//     if (data.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No items found.</td></tr>';
//         return;
//     }
    
//     // Sort recently updated first
//     data.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));

//     data.forEach(item => {
//         const stock = Number(item.currentStock) || 0;
//         const minStock = Number(item.minimumStock) || 0;
//         const cost = Number(item.unitCost) || 0;

//         let statusBadge = stock === 0 ? '<span class="status-badge out">Out of Stock</span>' 
//                         : (stock <= minStock ? '<span class="status-badge low">Low Stock</span>' 
//                         : '<span class="status-badge good">In Stock</span>');

//         const lastRestock = item.lastRestocked 
//             ? new Date(item.lastRestocked.seconds * 1000).toLocaleDateString() : '-';

//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>
//                 <strong>${item.name}</strong>
//                 <div style="font-size:11px; color:#888;">${item.description || ''}</div>
//             </td>
//             <td>${item.categoryName || 'Uncategorized'}</td>
//             <td>${stock} ${item.unit || ''}</td>
//             <td>₱${cost.toLocaleString()}</td>
//             <td>${statusBadge}</td>
//             <td>${lastRestock}</td>
//             <td>
//                 <div class="actions">
//                     <button onclick="window.editItem('${item.id}')" class="btn-icon edit"><i class="fas fa-edit"></i></button>
//                     <button onclick="window.viewHistory('${item.id}')" class="btn-icon"><i class="fas fa-history"></i></button>
//                     <button onclick="window.askDelete('${item.id}')" class="btn-icon delete"><i class="fas fa-trash"></i></button>
//                 </div>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // ============================================================
// // 6. SAVE / EDIT / DELETE ITEMS
// // ============================================================

// async function saveItem(e) {
//     e.preventDefault();
//     const saveBtn = document.getElementById('btnSave') || document.querySelector('#itemForm button[type="submit"]');
//     setLoading(saveBtn, true);

//     const idInput = document.getElementById('itemId'); 
//     const nameInput = document.getElementById('itemName');
//     const catSelect = document.getElementById('itemCategory');
//     const stockInput = document.getElementById('itemStock');
//     const minStockInput = document.getElementById('itemMinStock');
//     const priceInput = document.getElementById('itemPrice'); 
//     const unitInput = document.getElementById('itemUnit');
//     const descInput = document.getElementById('itemDesc');
    
//     let categoryName = catSelect.selectedIndex > -1 ? catSelect.options[catSelect.selectedIndex].text : "Uncategorized";
//     const newStock = Number(stockInput.value);
//     const docId = idInput.value; 

//     const itemData = {
//         name: nameInput.value,
//         categoryId: catSelect.value,
//         categoryName: categoryName,
//         currentStock: newStock,
//         minimumStock: Number(minStockInput.value),
//         unitCost: Number(priceInput.value),
//         unit: unitInput.value,
//         description: descInput.value,
//         status: newStock > 0 ? "In Stock" : "Out of Stock",
//         isActive: true,
//         updatedAt: new Date()
//     };

//     try {
//         if (docId) {
//             const oldItem = inventoryData.find(i => i.id === docId);
//             const stockDiff = newStock - (oldItem ? Number(oldItem.currentStock) : 0);
//             if (stockDiff > 0) itemData.lastRestocked = new Date(); 
//             await updateDoc(doc(db, COLLECTION_NAME, docId), itemData);
//             if (stockDiff !== 0) await recordLog(docId, itemData.name, stockDiff > 0 ? "Stock In (Edit)" : "Stock Out (Edit)", stockDiff, newStock);
//             showToast("Item updated successfully");
//         } else {
//             const newId = "inv_" + Date.now();
//             itemData.id = newId;
//             itemData.createdAt = new Date();
//             itemData.lastRestocked = newStock > 0 ? new Date() : null;
//             await setDoc(doc(db, COLLECTION_NAME, newId), itemData);
//             await recordLog(newId, itemData.name, "Item Created", newStock, newStock);
//             showToast("Item added successfully");
//         }
//         closeModal();
//     } catch (error) {
//         showToast("Error saving: " + error.message, "error");
//     } finally {
//         setLoading(saveBtn, false);
//     }
// }

// async function recordLog(itemId, itemName, action, change, remaining) {
//     try {
//         await addDoc(collection(db, LOGS_COLLECTION), {
//             itemId, itemName, action, changeAmount: Number(change), 
//             remainingStock: Number(remaining), timestamp: new Date(), user: "Admin" 
//         });
//     } catch (e) { console.error("Log failed", e); }
// }

// function openModal() {
//     document.getElementById('itemForm').reset();
//     document.getElementById('itemId').value = ''; 
//     document.getElementById('modalTitle').innerText = 'Add New Item';
//     document.getElementById('itemModal').style.display = 'flex';
// }

// function editItem(id) {
//     const item = inventoryData.find(i => i.id === id);
//     if (!item) return;
//     document.getElementById('itemId').value = item.id;
//     document.getElementById('itemName').value = item.name;
//     document.getElementById('itemStock').value = item.currentStock;
//     document.getElementById('itemMinStock').value = item.minimumStock;
//     document.getElementById('itemPrice').value = item.unitCost;
//     document.getElementById('itemUnit').value = item.unit;
//     document.getElementById('itemDesc').value = item.description;
//     const catSelect = document.getElementById('itemCategory');
//     if(catSelect) catSelect.value = item.categoryId || ""; 
//     document.getElementById('modalTitle').innerText = 'Edit Item';
//     document.getElementById('itemModal').style.display = 'flex';
// }

// function closeModal() {
//     document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
// }

// function askDelete(id) {
//     document.getElementById('deleteItemId').value = id;
//     document.getElementById('deleteModal').style.display = 'flex';
// }

// async function confirmDelete() {
//     const id = document.getElementById('deleteItemId').value;
//     if(!id) return;
//     const delBtn = document.getElementById('btnConfirmDelete'); 
//     setLoading(delBtn, true);
//     try {
//         await deleteDoc(doc(db, COLLECTION_NAME, id));
//         showToast("Item Deleted");
//         closeModal();
//     } catch(e) { showToast("Delete failed", "error"); }
//     finally { setLoading(delBtn, false); }
// }

// function setLoading(btn, isLoading) {
//     if (!btn) return;
//     btn.disabled = isLoading;
//     isLoading ? btn.classList.add('btn-loading') : btn.classList.remove('btn-loading');
// }

// function showToast(msg, type='success') {
//     const c = document.getElementById('toast-container');
//     if(!c) return;
//     const t = document.createElement('div');
//     t.className = `toast ${type}`;
//     t.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${msg}</span>`;
//     t.style.borderLeft = type === 'success' ? '5px solid #2e7d32' : '5px solid #c62828';
//     c.appendChild(t);
//     setTimeout(() => t.remove(), 3000);
// }

// // ============================================================
// // 7. EXPORTS
// // ============================================================
// window.openModal = openModal;
// window.closeModal = closeModal;
// window.saveItem = saveItem;
// window.editItem = editItem;
// window.askDelete = askDelete;
// window.confirmDelete = confirmDelete;
// window.openCategoryModal = () => document.getElementById('categoryModal').style.display = 'flex';
// window.addCategory = addCategory;
// window.closeCustomUI = closeCustomUI;

// // Added Export Function
// window.exportToCSV = exportToCSV;
// window.exportCSV = exportToCSV; // Safety alias in case your HTML calls exportCSV()



// import {
//     collection,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//     onSnapshot,
//     query,
//     orderBy,
//     where
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { db } from './firebase.js';

// const auth = getAuth();
// const COLLECTION_NAME = "inventory";
// const CATEGORY_COLLECTION = "categories";

// let inventoryData = [];
// let categoryData = [];
// let currentStatusFilter = "all";
// let currentArchiveTab = 'items'; // Default to items
// document.addEventListener("DOMContentLoaded", () => {
//     // Set Date
//     const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

//     loadCategories();
//     loadInventory();
//     setupListeners();
// });

// // ================= LOGOUT LOGIC =================
// window.handleLogout = function() {
//     Swal.fire({
//         title: 'Logout?',
//         text: "Are you sure you want to sign out?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#e74c3c',
//         confirmButtonText: 'Yes, Logout'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             signOut(auth).then(() => {
//                 window.location.href = "index.html"; // Redirect to login
//             }).catch((error) => {
//                 Swal.fire('Error', error.message, 'error');
//             });
//         }
//     });
// };

// // ================= LOAD DATA =================
// function loadInventory() {
//     // We get ALL items, then filter client-side for active/archived for speed
//     const q = query(collection(db, COLLECTION_NAME));
//     onSnapshot(q, (snapshot) => {
//         inventoryData = [];
//         snapshot.forEach(docSnap => {
//             inventoryData.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         updateDashboardStats();
//         filterAndRender(); // Updates Main Table
//         renderArchiveTable(); // Updates Archive Table if open
//     });
// }
// // ================= LOAD CATEGORIES (UPDATED) =================
// function loadCategories() {
//     // Sort by name alphabetically
//     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
//     onSnapshot(q, (snapshot) => {
//         categoryData = [];
//         const filter = document.getElementById("categoryFilter");
//         const select = document.getElementById("itemCategory");
//         const list = document.getElementById("categoryList");

//         // Default Options
//         let filterHTML = `<option value="all">All Categories</option>`;
//         let selectHTML = `<option value="">Select Category</option>`;
//         let listHTML = "";

//         snapshot.forEach(docSnap => {
//             const cat = { id: docSnap.id, ...docSnap.data() };
            
//             // FILTER: Only show categories that are NOT archived
//             if (cat.status !== 'archived') {
//                 categoryData.push(cat);

//                 // Add to "Filter" Dropdown
//                 filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
                
//                 // Add to "Add Item" Dropdown
//                 selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
                
//                 // Add to "Manage Categories" List
//                 listHTML += `
//                     <li>
//                         <span>${cat.name}</span>
//                         <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive Category">
//                             <i class="fas fa-box-archive"></i>
//                         </button>
//                     </li>
//                 `;
//             }
//         });

//         if (filter) filter.innerHTML = filterHTML;
//         if (select) select.innerHTML = selectHTML;
//         if (list) list.innerHTML = listHTML;
//     });
// }

// // ================= ARCHIVE CATEGORY (REPLACES DELETE) =================
// window.archiveCategory = function(id) {
//     Swal.fire({
//         title: 'Archive Category?',
//         text: "This will hide the category from the list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 // Update status to 'archived' instead of deleting
//                 await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
//                     status: 'archived',
//                     updatedAt: new Date()
//                 });
                
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Archived!',
//                     text: 'Category has been moved to archives.',
//                     timer: 1500,
//                     showConfirmButton: false
//                 });
//             } catch (error) {
//                 Swal.fire('Error', error.message, 'error');
//             }
//         }
//     });
// };
// // Note: You can delete the old window.deleteCategory function entirely.




// // ================= DASHBOARD & STATS =================
// function updateDashboardStats() {
//     const activeItems = inventoryData.filter(i => i.status !== 'archived');

//     // Counts remain global
//     const total = activeItems.length;
    
//     const low = activeItems.filter(i => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const min = parseFloat(i.minimumStock) || 0;
//         return stock <= min && stock > 0;
//     }).length;

//     const today = new Date();
//     const next7 = new Date();
//     next7.setDate(today.getDate() + 7);

//     const expiring = activeItems.filter(i => {
//         if (!i.expiryDate) return false;
//         const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
//         return d <= next7 && d >= today;
//     }).length;

//     document.getElementById("stat-total-items").innerText = total;
//     document.getElementById("stat-low-stock").innerText = low;
//     document.getElementById("stat-expiring").innerText = expiring;
    
//     // Formatting: ₱1,200.50


// }




// // ================= FILTER & RENDER MAIN TABLE =================
// window.filterStatus = function(type) {
//     currentStatusFilter = type;
//     filterAndRender();
// };

// function filterAndRender() {
//     const search = document.getElementById("searchInput").value.toLowerCase();
//     const cat = document.getElementById("categoryFilter").value;
    
//     // Default: Show only items that are NOT archived
//     let filtered = inventoryData.filter(item => item.status !== 'archived');

//     filtered = filtered.filter(item => {
//         const matchSearch = item.name.toLowerCase().includes(search);
//         const matchCat = cat === "all" || item.categoryName === cat;
        
//         let matchStatus = true;
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;

//         if (currentStatusFilter === "low") {
//             matchStatus = stock <= min && stock > 0;
//         } else if (currentStatusFilter === "expiring") {
//             // Re-using logic from stats for consistency
//              if (!item.expiryDate) return false;
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date();
//              next7.setDate(today.getDate() + 7);
//              matchStatus = d <= next7 && d >= today;
//         }
        
//         return matchSearch && matchCat && matchStatus;
//     });

//     // --- ADD THIS BLOCK TO FIX THE MATCHING PROBLEM ---
//     // Calculate Total Value based on the FILTERED list, not the global list
//     const currentViewValue = filtered.reduce((sum, i) => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const cost = parseFloat(i.unitCost) || 0;
//         return sum + (stock * cost);
//     }, 0);

//     document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
//         minimumFractionDigits: 2, 
//         maximumFractionDigits: 2
//     });
//     // --------------------------------------------------

//     renderTable(filtered);
// }


// function renderTable(data) {
//     const tbody = document.getElementById("inventoryTableBody");
//     tbody.innerHTML = "";

//     if (data.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
//         return;
//     }

//     data.forEach(item => {
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;
//         const cost = Number(item.unitCost) || 0;
        
//         // Calculate the total value for this specific row
//         const rowTotal = stock * cost;

//         // Status Badge Logic
//         let statusBadge = '';
//         if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
//         else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
//         else statusBadge = '<span class="badge badge-good">Good</span>';

//         // Check for expiring
//         if(item.expiryDate) {
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date(); next7.setDate(today.getDate() + 7);
//              if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
//         }

//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td><strong>${item.name}</strong></td>
//             <td>${item.categoryName || "-"}</td>
//             <td>${stock} ${item.unit || ''}</td>
//             <td>₱${cost.toLocaleString()}</td>
            
//             <td style="font-weight: bold; color: #2c3e50;">
//                 ₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}
//             </td>

//             <td>${statusBadge}</td>
//             <td>
//                 <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
//                     <i class="fas fa-edit"></i>
//                 </button>
//                 <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
//                     <i class="fas fa-box-archive"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }



// // ================= RENDER ARCHIVE TABLE =================
// function renderArchiveTable() {
//     const tbody = document.getElementById("archiveTableBody");
//     tbody.innerHTML = "";

//     const archived = inventoryData.filter(i => i.status === 'archived');

//     if (archived.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
//         return;
//     }

//     archived.forEach(item => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td><strong>${item.name}</strong></td>
//             <td>${item.categoryName || "-"}</td>
//             <td>${item.currentStock}</td>
//             <td>
//                 <div class="action-cell">
//                     <button class="btn-primary btn-sm" onclick="window.restoreItem('${item.id}')" style="background:#27ae60;">
//                         <i class="fas fa-undo"></i> Restore
//                     </button>
//                     <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </div>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }



// // ================= ADD / EDIT LOGIC =================
// window.saveItem = async function(e) {
//     e.preventDefault();
    
//     const id = document.getElementById("itemId").value;
//     const name = document.getElementById("itemName").value.trim();
//     const select = document.getElementById("itemCategory");
    
//     // Duplicate check (Client side optimization)
//     const duplicate = inventoryData.find(i => 
//         i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
//     );

//     if (duplicate) {
//         return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
//     }

//     const data = {
//         name,
//         categoryId: select.value,
//         categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
//         currentStock: Number(document.getElementById("itemStock").value),
//         minimumStock: Number(document.getElementById("itemMinStock").value),
//         unitCost: Number(document.getElementById("itemPrice").value),
//         unit: document.getElementById("itemUnit").value,
//         description: document.getElementById("itemDesc").value,
//         status: 'active', // Default status
//         updatedAt: new Date()
//     };

//     const expiry = document.getElementById("itemExpiry").value;
//     if (expiry) data.expiryDate = new Date(expiry);

//     try {
//         if (id) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), data);
//             Swal.fire('Success', 'Item updated successfully', 'success');
//         } else {
//             data.createdAt = new Date();
//             await addDoc(collection(db, COLLECTION_NAME), data);
//             Swal.fire('Success', 'Item added successfully', 'success');
//         }
//         window.closeModal();
//         document.getElementById("itemForm").reset();
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };

// window.editItem = function(id) {
//     const item = inventoryData.find(i => i.id === id);
//     if (!item) return;

//     document.getElementById("modalTitle").innerText = "Edit Item";
//     document.getElementById("itemId").value = item.id;
//     document.getElementById("itemName").value = item.name;
//     document.getElementById("itemCategory").value = item.categoryId || "";
//     document.getElementById("itemStock").value = item.currentStock;
//     document.getElementById("itemMinStock").value = item.minimumStock;
//     document.getElementById("itemPrice").value = item.unitCost;
//     document.getElementById("itemUnit").value = item.unit;
//     document.getElementById("itemDesc").value = item.description || "";

//     if (item.expiryDate) {
//         const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//         document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
//     } else {
//         document.getElementById("itemExpiry").value = "";
//     }

//     document.getElementById("itemModal").style.display = "flex";
// };

// // ================= ARCHIVE / RESTORE / DELETE =================
// window.archiveItem = function(id) {
//     Swal.fire({
//         title: 'Archive Item?',
//         text: "This will move the item to the inactive archive list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
//             Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
//         }
//     });
// };

// window.restoreItem = async function(id) {
//     await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
//     Swal.fire('Restored!', 'Item is now active.', 'success');
//     renderArchiveTable(); // Refresh archive view
// };

// window.permanentDelete = function(id) {
//     Swal.fire({
//         title: 'Delete Permanently?',
//         text: "You won't be able to revert this!",
//         icon: 'error',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, COLLECTION_NAME, id));
//             Swal.fire('Deleted!', 'Item has been deleted.', 'success');
//         }
//     });
// };




// // ================= CATEGORY MANAGEMENT =================
// window.addCategory = async function() {
//     const input = document.getElementById("newCategoryInput");
//     const name = input.value.trim();
//     if (!name) return;

//     await addDoc(collection(db, CATEGORY_COLLECTION), { name });
//     input.value = "";
//     Swal.fire({
//         icon: 'success',
//         title: 'Category Added',
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1500
//     });
// };

// window.deleteCategory = function(id) {
//     Swal.fire({
//         title: 'Delete Category?',
//         text: "Make sure no items are using this category first.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Delete'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
//         }
//     });
// };
// // ================= CATEGORY MANAGEMENT =================
// window.addCategory = async function() {
//     const input = document.getElementById("newCategoryInput");
//     const name = input.value.trim();

//     if (!name) return Swal.fire('Error', 'Category name required', 'warning');

//     // DUPLICATE CHECK (Case Insensitive)
//     const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());

//     if (exists) {
//         return Swal.fire('Error', 'This category already exists!', 'error');
//     }

//     try {
//         await addDoc(collection(db, CATEGORY_COLLECTION), { 
//             name: name,
//             createdAt: new Date() 
//         });
        
//         input.value = ""; // Clear input
        
//         Swal.fire({
//             icon: 'success',
//             title: 'Category Added',
//             toast: true,
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };




// // ================= MODAL HELPERS =================
// window.openModal = () => {
//     document.getElementById("itemForm").reset();
//     document.getElementById("itemId").value = "";
//     document.getElementById("modalTitle").innerText = "Add New Item";
//     document.getElementById("itemModal").style.display = "flex";
// };

// window.openCategoryModal = () => document.getElementById("categoryModal").style.display = "flex";
// window.openArchiveModal = () => {
//     document.getElementById("archiveModal").style.display = "flex";
//     renderArchiveTable();
// };

// window.closeModal = () => {
//     document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
// };

// function setupListeners() {
//     document.getElementById("searchInput").addEventListener("input", filterAndRender);
//     document.getElementById("categoryFilter").addEventListener("change", filterAndRender);
    
//     // Close modal if clicking outside
//     window.onclick = function(event) {
//         if (event.target.classList.contains('modal')) {
//             window.closeModal();
//         }
//     };
// }


import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { db } from './firebase.js';

const auth = getAuth();
const COLLECTION_NAME = "inventory";
const CATEGORY_COLLECTION = "categories";

// Global Variables
let inventoryData = [];
let categoryData = [];
let currentStatusFilter = "all";

// Toggle States
let currentArchiveTab = 'items'; // Default to items in Archive Modal
let showArchivedCats = false;    // Default to hiding archived in Category Manager

document.addEventListener("DOMContentLoaded", () => {
    // Set Date
    const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

    loadCategories();
    loadInventory();
    setupListeners();
});

// ================= LOGOUT LOGIC =================
window.handleLogout = function() {
    Swal.fire({
        title: 'Logout?',
        text: "Are you sure you want to sign out?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'Yes, Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            signOut(auth).then(() => {
                window.location.href = "index.html";
            }).catch((error) => {
                Swal.fire('Error', error.message, 'error');
            });
        }
    });
};

// ================= EXPORT FUNCTION (INJECTED) =================
window.exportToCSV = function() {
    if (inventoryData.length === 0) {
        Swal.fire("Info", "No data to export.", "info");
        return;
    }

    // Define CSV Headers
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Category,Stock,Unit,Cost,Total Value,Status,Expiry Date\n";

    // Loop through data and format for CSV
    inventoryData.forEach(item => {
        if (item.status === 'archived') return; // Skip archived items if desired

        const stock = item.currentStock || 0;
        const cost = item.unitCost || 0;
        const total = stock * cost;
        
        // Format Expiry Date
        let expiry = "";
        if (item.expiryDate) {
            const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
            expiry = d.toLocaleDateString();
        }

        // Escape commas in names/descriptions to prevent CSV breaking
        const name = `"${item.name.replace(/"/g, '""')}"`; 
        const category = `"${(item.categoryName || "").replace(/"/g, '""')}"`;

        const row = [
            name,
            category,
            stock,
            item.unit || "",
            cost.toFixed(2),
            total.toFixed(2),
            item.status,
            expiry
        ].join(",");

        csvContent += row + "\r\n";
    });

    // Create Download Link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ================= LOAD DATA (INVENTORY FIXED) =================
function loadInventory() {
    const q = query(collection(db, COLLECTION_NAME));
    onSnapshot(q, (snapshot) => {
        inventoryData = [];
        snapshot.forEach(docSnap => {
            // FIX: We put docSnap.data() FIRST.
            // This ensures the Real Firestore ID (docSnap.id) overwrites any fake 'id' inside the data.
            inventoryData.push({ ...docSnap.data(), id: docSnap.id });
        });
        updateDashboardStats();
        filterAndRender(); // Updates Main Table
        
        // If the archive modal is open, refresh it too
        if(document.getElementById("archiveModal").style.display === "flex"){
            renderArchiveTable();
        }
    });
}


// ================= LOAD CATEGORIES (FIXED) =================
function loadCategories() {
    const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
    onSnapshot(q, (snapshot) => {
        categoryData = [];
        const filter = document.getElementById("categoryFilter");
        const select = document.getElementById("itemCategory");
        
        // Default Options
        let filterHTML = `<option value="all">All Categories</option>`;
        let selectHTML = `<option value="">Select Category</option>`;

        snapshot.forEach(docSnap => {
            // FIX: Put docSnap.data() FIRST, and id: docSnap.id LAST.
            // This ensures the real Firestore ID overwrites any fake 'id' inside the data.
            const cat = { ...docSnap.data(), id: docSnap.id }; 
            
            categoryData.push(cat); 

            // Only populate Dropdowns with ACTIVE categories
            if (cat.status !== 'archived') {
                filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
                selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
            }
        });

        if (filter) filter.innerHTML = filterHTML;
        if (select) select.innerHTML = selectHTML;

        // Render the "Manage Categories" list
        renderCategoryList();
    });
}
// ================= DASHBOARD & STATS =================
function updateDashboardStats() {
    const activeItems = inventoryData.filter(i => i.status !== 'archived');
    const total = activeItems.length;
    
    const low = activeItems.filter(i => {
        const stock = parseFloat(i.currentStock) || 0;
        const min = parseFloat(i.minimumStock) || 0;
        return stock <= min && stock > 0;
    }).length;

    const today = new Date();
    const next7 = new Date();
    next7.setDate(today.getDate() + 7);

    const expiring = activeItems.filter(i => {
        if (!i.expiryDate) return false;
        const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
        return d <= next7 && d >= today;
    }).length;

    document.getElementById("stat-total-items").innerText = total;
    document.getElementById("stat-low-stock").innerText = low;
    document.getElementById("stat-expiring").innerText = expiring;
}

// ================= MAIN TABLE RENDERER =================
window.filterStatus = function(type) {
    currentStatusFilter = type;
    filterAndRender();
};

function filterAndRender() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const cat = document.getElementById("categoryFilter").value;
    
    // Default: Show only items that are NOT archived
    let filtered = inventoryData.filter(item => item.status !== 'archived');

    filtered = filtered.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search);
        const matchCat = cat === "all" || item.categoryName === cat;
        
        let matchStatus = true;
        const stock = Number(item.currentStock) || 0;
        const min = Number(item.minimumStock) || 0;

        if (currentStatusFilter === "low") {
            matchStatus = stock <= min && stock > 0;
        } else if (currentStatusFilter === "expiring") {
             if (!item.expiryDate) return false;
             const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
             const today = new Date();
             const next7 = new Date();
             next7.setDate(today.getDate() + 7);
             matchStatus = d <= next7 && d >= today;
        }
        
        return matchSearch && matchCat && matchStatus;
    });

    // Calculate Total Value based on current view
    const currentViewValue = filtered.reduce((sum, i) => {
        const stock = parseFloat(i.currentStock) || 0;
        const cost = parseFloat(i.unitCost) || 0;
        return sum + (stock * cost);
    }, 0);

    document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
    });

    renderTable(filtered);
}

function renderTable(data) {
    const tbody = document.getElementById("inventoryTableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const stock = Number(item.currentStock) || 0;
        const min = Number(item.minimumStock) || 0;
        const cost = Number(item.unitCost) || 0;
        const rowTotal = stock * cost;

        // Status Badge Logic
        let statusBadge = '';
        if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
        else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
        else statusBadge = '<span class="badge badge-good">Good</span>';

        if(item.expiryDate) {
             const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
             const today = new Date();
             const next7 = new Date(); next7.setDate(today.getDate() + 7);
             if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.categoryName || "-"}</td>
            <td>${stock} ${item.unit || ''}</td>
            <td>₱${cost.toLocaleString()}</td>
            <td style="font-weight: bold; color: #2c3e50;">₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
                    <i class="fas fa-box-archive"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ================= ITEM ACTIONS (Add/Edit/Archive) =================
window.saveItem = async function(e) {
    e.preventDefault();
    
    const id = document.getElementById("itemId").value;
    const name = document.getElementById("itemName").value.trim();
    const select = document.getElementById("itemCategory");
    
    // Duplicate check
    const duplicate = inventoryData.find(i => 
        i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
    );

    if (duplicate) {
        return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
    }

    const data = {
        name,
        categoryId: select.value,
        categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
        currentStock: Number(document.getElementById("itemStock").value),
        minimumStock: Number(document.getElementById("itemMinStock").value),
        unitCost: Number(document.getElementById("itemPrice").value),
        unit: document.getElementById("itemUnit").value,
        description: document.getElementById("itemDesc").value,
        status: 'active',
        updatedAt: new Date()
    };

    const expiry = document.getElementById("itemExpiry").value;
    if (expiry) data.expiryDate = new Date(expiry);

    try {
        if (id) {
            await updateDoc(doc(db, COLLECTION_NAME, id), data);
            Swal.fire('Success', 'Item updated successfully', 'success');
        } else {
            data.createdAt = new Date();
            await addDoc(collection(db, COLLECTION_NAME), data);
            Swal.fire('Success', 'Item added successfully', 'success');
        }
        window.closeModal();
        document.getElementById("itemForm").reset();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

window.editItem = function(id) {
    const item = inventoryData.find(i => i.id === id);
    if (!item) return;

    document.getElementById("modalTitle").innerText = "Edit Item";
    document.getElementById("itemId").value = item.id;
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.categoryId || "";
    document.getElementById("itemStock").value = item.currentStock;
    document.getElementById("itemMinStock").value = item.minimumStock;
    document.getElementById("itemPrice").value = item.unitCost;
    document.getElementById("itemUnit").value = item.unit;
    document.getElementById("itemDesc").value = item.description || "";

    if (item.expiryDate) {
        const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
        document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
    } else {
        document.getElementById("itemExpiry").value = "";
    }

    document.getElementById("itemModal").style.display = "flex";
};

window.archiveItem = function(id) {
    Swal.fire({
        title: 'Archive Item?',
        text: "This will move the item to the inactive archive list.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f39c12',
        confirmButtonText: 'Yes, Archive it'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
            Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
        }
    });
};

window.restoreItem = async function(id) {
    await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
    Swal.fire('Restored!', 'Item is now active.', 'success');
    renderArchiveTable(); 
};

window.permanentDelete = function(id) {
    Swal.fire({
        title: 'Delete Permanently?',
        text: "You won't be able to revert this!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
            renderArchiveTable();
        }
    });
};

// ================= CATEGORY MANAGEMENT =================

window.addCategory = async function() {
    const input = document.getElementById("newCategoryInput");
    const name = input.value.trim();

    if (!name) return Swal.fire('Error', 'Category name required', 'warning');

    const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        return Swal.fire('Error', 'This category already exists!', 'error');
    }

    try {
        await addDoc(collection(db, CATEGORY_COLLECTION), { 
            name: name,
            status: 'active',
            createdAt: new Date() 
        });
        
        input.value = "";
        Swal.fire({ icon: 'success', title: 'Category Added', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

window.archiveCategory = function(id) {
    Swal.fire({
        title: 'Archive Category?',
        text: "This will hide the category from the list.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f39c12',
        confirmButtonText: 'Yes, Archive it'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
                    status: 'archived',
                    updatedAt: new Date()
                });
                // Note: The list auto-refreshes because of onSnapshot
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    });
};

window.restoreCategory = async function(id) {
    try {
        await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
            status: 'active',
            updatedAt: new Date()
        });
        if(document.getElementById("archiveModal").style.display === 'flex') {
            renderArchiveTable(); // Refresh archive modal if open
        }
        Swal.fire({ icon: 'success', title: 'Category Restored', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
    } catch (e) {
        Swal.fire('Error', e.message, 'error');
    }
}

window.permanentDeleteCategory = function(id) {
    Swal.fire({
        title: 'Delete Category?',
        text: "Gone forever!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
            if(document.getElementById("archiveModal").style.display === 'flex') {
                renderArchiveTable();
            }
        }
    });
}

// Renders the list inside "Manage Categories"
function renderCategoryList() {
    const list = document.getElementById("categoryList");
    if(!list) return;

    // 1. Inject Toggle Button if missing
    let toggleBtn = document.getElementById("toggleCatViewBtn");
    if (!toggleBtn) {
        const container = list.parentElement; 
        const btnContainer = document.createElement("div");
        const btnStyle = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 5px;";
        btnContainer.style.cssText = btnStyle;
        
        toggleBtn = document.createElement("button");
        toggleBtn.id = "toggleCatViewBtn";
        toggleBtn.className = "btn-secondary"; 
        toggleBtn.style.cssText = "background: none; border: none; color: #555; cursor: pointer; text-decoration: underline; font-size: 0.9em;";
        toggleBtn.onclick = toggleCategoryView;
        
        btnContainer.appendChild(toggleBtn);
        container.insertBefore(btnContainer, list);
    }

    // 2. Update Button Text
    toggleBtn.innerHTML = showArchivedCats 
        ? '<i class="fas fa-list"></i> Show Active Categories' 
        : '<i class="fas fa-archive"></i> Show Archived Categories';

    // 3. Filter List
    const visibleCats = categoryData.filter(c => 
        showArchivedCats ? c.status === 'archived' : c.status !== 'archived'
    );

    // 4. Generate HTML
    let listHTML = "";
    if (visibleCats.length === 0) {
        listHTML = `<li style="text-align:center; color:#888; padding:10px;">
            ${showArchivedCats ? "No archived categories." : "No categories found."}
        </li>`;
    } else {
        visibleCats.forEach(cat => {
            if (showArchivedCats) {
                // ARCHIVED VIEW
                listHTML += `
                    <li style="background: #fff3cd; border-color: #ffeeba;">
                        <span style="color: #856404;">${cat.name} (Archived)</span>
                        <div>
                            <button class="btn-icon-small" onclick="window.restoreCategory('${cat.id}')" title="Restore" style="color: #27ae60; margin-right: 5px;">
                                <i class="fas fa-undo"></i>
                            </button>
                             <button class="btn-icon-small" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete" style="color: #c0392b;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                `;
            } else {
                // ACTIVE VIEW
                listHTML += `
                    <li>
                        <span>${cat.name}</span>
                        <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive">
                            <i class="fas fa-box-archive"></i>
                        </button>
                    </li>
                `;
            }
        });
    }
    list.innerHTML = listHTML;
}

window.toggleCategoryView = function() {
    showArchivedCats = !showArchivedCats;
    renderCategoryList();
}

// ================= ARCHIVE MODAL (TABS & TABLE) =================
// ================= ARCHIVE MODAL (FIXED) =================

window.openArchiveModal = () => {
    currentArchiveTab = 'items'; // Default to items
    document.getElementById("archiveModal").style.display = "flex";
    
    // Inject Tab Buttons if they don't exist
    const modalBody = document.querySelector("#archiveModal .modal-body");
    let tabContainer = document.getElementById("archiveTabs");
    
    if (!tabContainer && modalBody) {
        tabContainer = document.createElement("div");
        tabContainer.id = "archiveTabs";
        tabContainer.style.cssText = "display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;";
        
        // Note: Added 'window.' to onclick events to ensure they work in module mode
        tabContainer.innerHTML = `
            <button id="tabItems" onclick="window.switchArchiveTab('items')" style="background:none; border:none; font-weight:bold; cursor:pointer; padding: 5px 10px; border-bottom: 3px solid #e74c3c; color: #e74c3c;">Items</button>
            <button id="tabCats" onclick="window.switchArchiveTab('categories')" style="background:none; border:none; color: #7f8c8d; cursor:pointer; padding: 5px 10px;">Categories</button>
        `;
        
        const tableContainer = modalBody.querySelector(".table-responsive");
        if(tableContainer) modalBody.insertBefore(tabContainer, tableContainer);
    }
    renderArchiveTable();
};

window.switchArchiveTab = (tab) => {
    currentArchiveTab = tab;
    
    // Visual Feedback for Tabs
    const btnItems = document.getElementById("tabItems");
    const btnCats = document.getElementById("tabCats");

    if(btnItems) {
        btnItems.style.borderBottom = tab === 'items' ? "3px solid #e74c3c" : "none";
        btnItems.style.color = tab === 'items' ? "#e74c3c" : "#7f8c8d";
    }
    
    if(btnCats) {
        btnCats.style.borderBottom = tab === 'categories' ? "3px solid #e74c3c" : "none";
        btnCats.style.color = tab === 'categories' ? "#e74c3c" : "#7f8c8d";
    }
    
    renderArchiveTable();
};

function renderArchiveTable() {
    const tbody = document.getElementById("archiveTableBody");
    // Find the closest table, then the thead inside it
    const table = tbody.closest("table");
    const thead = table.querySelector("thead tr");
    
    tbody.innerHTML = "";

    // --- TAB: ITEMS ---
    if (currentArchiveTab === 'items') {
        if (thead) {
            thead.innerHTML = `<th>Item Name</th><th>Category</th><th>Last Stock</th><th>Actions</th>`;
        }

        const archivedItems = inventoryData.filter(i => i.status === 'archived');
        
        if (archivedItems.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
            return;
        }

        archivedItems.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.categoryName || "-"}</td>
                <td>${item.currentStock}</td>
                <td style="white-space:nowrap">
                    <div class="archive-actions">
                        <button class="btn-restore-sm" onclick="window.restoreItem('${item.id}')">
                            <i class="fas fa-undo"></i> Restore
                        </button>
                        <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

    // --- TAB: CATEGORIES ---
    } else {
        if (thead) {
            thead.innerHTML = `<th>Category Name</th><th>Archived Date</th><th>Status</th><th>Actions</th>`;
        }

        const archivedCats = categoryData.filter(c => c.status === 'archived');
        
        if (archivedCats.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived categories found.</td></tr>`;
            return;
        }

        archivedCats.forEach(cat => {
            const dateStr = cat.updatedAt ? new Date(cat.updatedAt.seconds * 1000).toLocaleDateString() : "-";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${cat.name}</strong></td>
                <td>${dateStr}</td>
                <td><span class="badge" style="background:#fff3cd; color:#856404; padding:2px 8px; border-radius:10px; font-size:0.8em;">Archived</span></td>
                <td style="white-space:nowrap">
                    <div class="archive-actions">
                        <button class="btn-restore-sm" onclick="window.restoreCategory('${cat.id}')">
                            <i class="fas fa-undo"></i> Restore
                        </button>
                        <button class="btn-icon delete" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete Permanently">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}



// ================= MODAL & LISTENER LOGIC =================

function setupListeners() {
    // 1. Search & Category Filters
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.addEventListener("keyup", filterAndRender);
    
    const catFilter = document.getElementById("categoryFilter");
    if (catFilter) catFilter.addEventListener("change", filterAndRender);

    // 2. Add New Item Button
    // We check for both a class '.btn-add' and an ID 'addItemBtn' to be safe
    const addItemBtn = document.querySelector(".btn-add") || document.getElementById("addItemBtn");
    if (addItemBtn) {
        addItemBtn.onclick = () => {
            document.getElementById("itemForm").reset();
            document.getElementById("itemId").value = "";
            document.getElementById("modalTitle").innerText = "Add New Item";
            document.getElementById("itemModal").style.display = "flex";
        };
    }

    // 3. Manage Categories Button (This was missing!)
    const manageCatBtn = document.querySelector(".btn-manage-cats") || document.getElementById("manageCatsBtn");
    if (manageCatBtn) {
        manageCatBtn.onclick = () => {
            document.getElementById("categoryModal").style.display = "flex";
            renderCategoryList(); // Refresh the list when opening
        };
    }

    // 4. Archive Button (If you have a separate button for it)
    const archiveBtn = document.getElementById("viewArchiveBtn");
    if (archiveBtn) {
        archiveBtn.onclick = () => window.openArchiveModal();
    }

    // 5. Attach Close Logic to all "X" buttons
    document.querySelectorAll(".close").forEach(btn => {
        btn.onclick = () => window.closeModal();
    });

    // 6. Form Submit Listener
    const itemForm = document.getElementById("itemForm");
    if (itemForm) itemForm.addEventListener("submit", window.saveItem);

    // 7. Export Button Listener (INJECTED)
    const exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
        exportBtn.onclick = window.exportToCSV;
    }
}

// Global Close Function
window.closeModal = function() {
    // Finds all elements with the class 'modal' and hides them
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        modal.style.display = "none";
    });
};

// Close Modal ONLY when clicking the dark backdrop directly —
// clicks inside modal-content never bubble up and close the modal.
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            window.closeModal();
        }
    });
});



// import {
//     collection,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//     onSnapshot,
//     query,
//     orderBy,
//     where
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { db } from './firebase.js';

// const auth = getAuth();
// const COLLECTION_NAME = "inventory";
// const CATEGORY_COLLECTION = "categories";

// // Global Variables
// let inventoryData = [];
// let categoryData = [];
// let currentStatusFilter = "all";

// // Toggle States
// let currentArchiveTab = 'items'; // Default to items in Archive Modal
// let showArchivedCats = false;    // Default to hiding archived in Category Manager

// document.addEventListener("DOMContentLoaded", () => {
//     // Set Date
//     const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-US', dateOpts);

//     loadCategories();
//     loadInventory();
//     setupListeners();
// });

// // ================= LOGOUT LOGIC =================
// window.handleLogout = function() {
//     Swal.fire({
//         title: 'Logout?',
//         text: "Are you sure you want to sign out?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#e74c3c',
//         confirmButtonText: 'Yes, Logout'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             signOut(auth).then(() => {
//                 window.location.href = "index.html";
//             }).catch((error) => {
//                 Swal.fire('Error', error.message, 'error');
//             });
//         }
//     });
// };


// // ================= LOAD DATA (INVENTORY FIXED) =================
// function loadInventory() {
//     const q = query(collection(db, COLLECTION_NAME));
//     onSnapshot(q, (snapshot) => {
//         inventoryData = [];
//         snapshot.forEach(docSnap => {
//             // FIX: We put docSnap.data() FIRST.
//             // This ensures the Real Firestore ID (docSnap.id) overwrites any fake 'id' inside the data.
//             inventoryData.push({ ...docSnap.data(), id: docSnap.id });
//         });
//         updateDashboardStats();
//         filterAndRender(); // Updates Main Table
        
//         // If the archive modal is open, refresh it too
//         if(document.getElementById("archiveModal").style.display === "flex"){
//             renderArchiveTable();
//         }
//     });
// }


// // ================= LOAD CATEGORIES (FIXED) =================
// function loadCategories() {
//     const q = query(collection(db, CATEGORY_COLLECTION), orderBy("name"));
    
//     onSnapshot(q, (snapshot) => {
//         categoryData = [];
//         const filter = document.getElementById("categoryFilter");
//         const select = document.getElementById("itemCategory");
        
//         // Default Options
//         let filterHTML = `<option value="all">All Categories</option>`;
//         let selectHTML = `<option value="">Select Category</option>`;

//         snapshot.forEach(docSnap => {
//             // FIX: Put docSnap.data() FIRST, and id: docSnap.id LAST.
//             // This ensures the real Firestore ID overwrites any fake 'id' inside the data.
//             const cat = { ...docSnap.data(), id: docSnap.id }; 
            
//             categoryData.push(cat); 

//             // Only populate Dropdowns with ACTIVE categories
//             if (cat.status !== 'archived') {
//                 filterHTML += `<option value="${cat.name}">${cat.name}</option>`;
//                 selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
//             }
//         });

//         if (filter) filter.innerHTML = filterHTML;
//         if (select) select.innerHTML = selectHTML;

//         // Render the "Manage Categories" list
//         renderCategoryList();
//     });
// }
// // ================= DASHBOARD & STATS =================
// function updateDashboardStats() {
//     const activeItems = inventoryData.filter(i => i.status !== 'archived');
//     const total = activeItems.length;
    
//     const low = activeItems.filter(i => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const min = parseFloat(i.minimumStock) || 0;
//         return stock <= min && stock > 0;
//     }).length;

//     const today = new Date();
//     const next7 = new Date();
//     next7.setDate(today.getDate() + 7);

//     const expiring = activeItems.filter(i => {
//         if (!i.expiryDate) return false;
//         const d = new Date(i.expiryDate.seconds ? i.expiryDate.seconds * 1000 : i.expiryDate);
//         return d <= next7 && d >= today;
//     }).length;

//     document.getElementById("stat-total-items").innerText = total;
//     document.getElementById("stat-low-stock").innerText = low;
//     document.getElementById("stat-expiring").innerText = expiring;
// }

// // ================= MAIN TABLE RENDERER =================
// window.filterStatus = function(type) {
//     currentStatusFilter = type;
//     filterAndRender();
// };

// function filterAndRender() {
//     const search = document.getElementById("searchInput").value.toLowerCase();
//     const cat = document.getElementById("categoryFilter").value;
    
//     // Default: Show only items that are NOT archived
//     let filtered = inventoryData.filter(item => item.status !== 'archived');

//     filtered = filtered.filter(item => {
//         const matchSearch = item.name.toLowerCase().includes(search);
//         const matchCat = cat === "all" || item.categoryName === cat;
        
//         let matchStatus = true;
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;

//         if (currentStatusFilter === "low") {
//             matchStatus = stock <= min && stock > 0;
//         } else if (currentStatusFilter === "expiring") {
//              if (!item.expiryDate) return false;
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date();
//              next7.setDate(today.getDate() + 7);
//              matchStatus = d <= next7 && d >= today;
//         }
        
//         return matchSearch && matchCat && matchStatus;
//     });

//     // Calculate Total Value based on current view
//     const currentViewValue = filtered.reduce((sum, i) => {
//         const stock = parseFloat(i.currentStock) || 0;
//         const cost = parseFloat(i.unitCost) || 0;
//         return sum + (stock * cost);
//     }, 0);

//     document.getElementById("stat-total-value").innerText = "₱" + currentViewValue.toLocaleString('en-US', {
//         minimumFractionDigits: 2, 
//         maximumFractionDigits: 2
//     });

//     renderTable(filtered);
// }

// function renderTable(data) {
//     const tbody = document.getElementById("inventoryTableBody");
//     tbody.innerHTML = "";

//     if (data.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="7" class="text-center">No active items found.</td></tr>`;
//         return;
//     }

//     data.forEach(item => {
//         const stock = Number(item.currentStock) || 0;
//         const min = Number(item.minimumStock) || 0;
//         const cost = Number(item.unitCost) || 0;
//         const rowTotal = stock * cost;

//         // Status Badge Logic
//         let statusBadge = '';
//         if (stock === 0) statusBadge = '<span class="badge badge-out">Out of Stock</span>';
//         else if (stock <= min) statusBadge = '<span class="badge badge-low">Low Stock</span>';
//         else statusBadge = '<span class="badge badge-good">Good</span>';

//         if(item.expiryDate) {
//              const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//              const today = new Date();
//              const next7 = new Date(); next7.setDate(today.getDate() + 7);
//              if(d <= next7) statusBadge += ' <span class="badge badge-exp">Expiring</span>';
//         }

//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td><strong>${item.name}</strong></td>
//             <td>${item.categoryName || "-"}</td>
//             <td>${stock} ${item.unit || ''}</td>
//             <td>₱${cost.toLocaleString()}</td>
//             <td style="font-weight: bold; color: #2c3e50;">₱${rowTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
//             <td>${statusBadge}</td>
//             <td>
//                 <button class="btn-action edit" onclick="window.editItem('${item.id}')" title="Edit">
//                     <i class="fas fa-edit"></i>
//                 </button>
//                 <button class="btn-action archive" onclick="window.archiveItem('${item.id}')" title="Archive">
//                     <i class="fas fa-box-archive"></i>
//                 </button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // ================= ITEM ACTIONS (Add/Edit/Archive) =================
// window.saveItem = async function(e) {
//     e.preventDefault();
    
//     const id = document.getElementById("itemId").value;
//     const name = document.getElementById("itemName").value.trim();
//     const select = document.getElementById("itemCategory");
    
//     // Duplicate check
//     const duplicate = inventoryData.find(i => 
//         i.name.toLowerCase() === name.toLowerCase() && i.id !== id && i.status !== 'archived'
//     );

//     if (duplicate) {
//         return Swal.fire('Error', 'Item name already exists in active inventory.', 'error');
//     }

//     const data = {
//         name,
//         categoryId: select.value,
//         categoryName: select.options[select.selectedIndex]?.text || "Uncategorized",
//         currentStock: Number(document.getElementById("itemStock").value),
//         minimumStock: Number(document.getElementById("itemMinStock").value),
//         unitCost: Number(document.getElementById("itemPrice").value),
//         unit: document.getElementById("itemUnit").value,
//         description: document.getElementById("itemDesc").value,
//         status: 'active',
//         updatedAt: new Date()
//     };

//     const expiry = document.getElementById("itemExpiry").value;
//     if (expiry) data.expiryDate = new Date(expiry);

//     try {
//         if (id) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), data);
//             Swal.fire('Success', 'Item updated successfully', 'success');
//         } else {
//             data.createdAt = new Date();
//             await addDoc(collection(db, COLLECTION_NAME), data);
//             Swal.fire('Success', 'Item added successfully', 'success');
//         }
//         window.closeModal();
//         document.getElementById("itemForm").reset();
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };

// window.editItem = function(id) {
//     const item = inventoryData.find(i => i.id === id);
//     if (!item) return;

//     document.getElementById("modalTitle").innerText = "Edit Item";
//     document.getElementById("itemId").value = item.id;
//     document.getElementById("itemName").value = item.name;
//     document.getElementById("itemCategory").value = item.categoryId || "";
//     document.getElementById("itemStock").value = item.currentStock;
//     document.getElementById("itemMinStock").value = item.minimumStock;
//     document.getElementById("itemPrice").value = item.unitCost;
//     document.getElementById("itemUnit").value = item.unit;
//     document.getElementById("itemDesc").value = item.description || "";

//     if (item.expiryDate) {
//         const d = new Date(item.expiryDate.seconds ? item.expiryDate.seconds * 1000 : item.expiryDate);
//         document.getElementById("itemExpiry").value = d.toISOString().split("T")[0];
//     } else {
//         document.getElementById("itemExpiry").value = "";
//     }

//     document.getElementById("itemModal").style.display = "flex";
// };

// window.archiveItem = function(id) {
//     Swal.fire({
//         title: 'Archive Item?',
//         text: "This will move the item to the inactive archive list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'archived' });
//             Swal.fire('Archived!', 'Item has been moved to archives.', 'success');
//         }
//     });
// };

// window.restoreItem = async function(id) {
//     await updateDoc(doc(db, COLLECTION_NAME, id), { status: 'active' });
//     Swal.fire('Restored!', 'Item is now active.', 'success');
//     renderArchiveTable(); 
// };

// window.permanentDelete = function(id) {
//     Swal.fire({
//         title: 'Delete Permanently?',
//         text: "You won't be able to revert this!",
//         icon: 'error',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, COLLECTION_NAME, id));
//             Swal.fire('Deleted!', 'Item has been deleted.', 'success');
//             renderArchiveTable();
//         }
//     });
// };

// // ================= CATEGORY MANAGEMENT =================

// window.addCategory = async function() {
//     const input = document.getElementById("newCategoryInput");
//     const name = input.value.trim();

//     if (!name) return Swal.fire('Error', 'Category name required', 'warning');

//     const exists = categoryData.some(c => c.name.toLowerCase() === name.toLowerCase());
//     if (exists) {
//         return Swal.fire('Error', 'This category already exists!', 'error');
//     }

//     try {
//         await addDoc(collection(db, CATEGORY_COLLECTION), { 
//             name: name,
//             status: 'active',
//             createdAt: new Date() 
//         });
        
//         input.value = "";
//         Swal.fire({ icon: 'success', title: 'Category Added', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
//     } catch (error) {
//         Swal.fire('Error', error.message, 'error');
//     }
// };

// window.archiveCategory = function(id) {
//     Swal.fire({
//         title: 'Archive Category?',
//         text: "This will hide the category from the list.",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f39c12',
//         confirmButtonText: 'Yes, Archive it'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
//                     status: 'archived',
//                     updatedAt: new Date()
//                 });
//                 // Note: The list auto-refreshes because of onSnapshot
//             } catch (error) {
//                 Swal.fire('Error', error.message, 'error');
//             }
//         }
//     });
// };

// window.restoreCategory = async function(id) {
//     try {
//         await updateDoc(doc(db, CATEGORY_COLLECTION, id), { 
//             status: 'active',
//             updatedAt: new Date()
//         });
//         if(document.getElementById("archiveModal").style.display === 'flex') {
//             renderArchiveTable(); // Refresh archive modal if open
//         }
//         Swal.fire({ icon: 'success', title: 'Category Restored', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
//     } catch (e) {
//         Swal.fire('Error', e.message, 'error');
//     }
// }

// window.permanentDeleteCategory = function(id) {
//     Swal.fire({
//         title: 'Delete Category?',
//         text: "Gone forever!",
//         icon: 'error',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'Delete'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
//             if(document.getElementById("archiveModal").style.display === 'flex') {
//                 renderArchiveTable();
//             }
//         }
//     });
// }

// // Renders the list inside "Manage Categories"
// function renderCategoryList() {
//     const list = document.getElementById("categoryList");
//     if(!list) return;

//     // 1. Inject Toggle Button if missing
//     let toggleBtn = document.getElementById("toggleCatViewBtn");
//     if (!toggleBtn) {
//         const container = list.parentElement; 
//         const btnContainer = document.createElement("div");
//         btnContainer.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 5px;";
        
//         toggleBtn = document.createElement("button");
//         toggleBtn.id = "toggleCatViewBtn";
//         toggleBtn.className = "btn-secondary"; 
//         toggleBtn.style.cssText = "background: none; border: none; color: #555; cursor: pointer; text-decoration: underline; font-size: 0.9em;";
//         toggleBtn.onclick = toggleCategoryView;
        
//         btnContainer.appendChild(toggleBtn);
//         container.insertBefore(btnContainer, list);
//     }

//     // 2. Update Button Text
//     toggleBtn.innerHTML = showArchivedCats 
//         ? '<i class="fas fa-list"></i> Show Active Categories' 
//         : '<i class="fas fa-archive"></i> Show Archived Categories';

//     // 3. Filter List
//     const visibleCats = categoryData.filter(c => 
//         showArchivedCats ? c.status === 'archived' : c.status !== 'archived'
//     );

//     // 4. Generate HTML
//     let listHTML = "";
//     if (visibleCats.length === 0) {
//         listHTML = `<li style="text-align:center; color:#888; padding:10px;">
//             ${showArchivedCats ? "No archived categories." : "No categories found."}
//         </li>`;
//     } else {
//         visibleCats.forEach(cat => {
//             if (showArchivedCats) {
//                 // ARCHIVED VIEW
//                 listHTML += `
//                     <li style="background: #fff3cd; border-color: #ffeeba;">
//                         <span style="color: #856404;">${cat.name} (Archived)</span>
//                         <div>
//                             <button class="btn-icon-small" onclick="window.restoreCategory('${cat.id}')" title="Restore" style="color: #27ae60; margin-right: 5px;">
//                                 <i class="fas fa-undo"></i>
//                             </button>
//                              <button class="btn-icon-small" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete" style="color: #c0392b;">
//                                 <i class="fas fa-trash"></i>
//                             </button>
//                         </div>
//                     </li>
//                 `;
//             } else {
//                 // ACTIVE VIEW
//                 listHTML += `
//                     <li>
//                         <span>${cat.name}</span>
//                         <button class="btn-icon-small" onclick="window.archiveCategory('${cat.id}')" title="Archive">
//                             <i class="fas fa-box-archive"></i>
//                         </button>
//                     </li>
//                 `;
//             }
//         });
//     }
//     list.innerHTML = listHTML;
// }

// window.toggleCategoryView = function() {
//     showArchivedCats = !showArchivedCats;
//     renderCategoryList();
// }

// // ================= ARCHIVE MODAL (TABS & TABLE) =================
// // ================= ARCHIVE MODAL (FIXED) =================

// window.openArchiveModal = () => {
//     currentArchiveTab = 'items'; // Default to items
//     document.getElementById("archiveModal").style.display = "flex";
    
//     // Inject Tab Buttons if they don't exist
//     const modalBody = document.querySelector("#archiveModal .modal-body");
//     let tabContainer = document.getElementById("archiveTabs");
    
//     if (!tabContainer && modalBody) {
//         tabContainer = document.createElement("div");
//         tabContainer.id = "archiveTabs";
//         tabContainer.style.cssText = "display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;";
        
//         // Note: Added 'window.' to onclick events to ensure they work in module mode
//         tabContainer.innerHTML = `
//             <button id="tabItems" onclick="window.switchArchiveTab('items')" style="background:none; border:none; font-weight:bold; cursor:pointer; padding: 5px 10px; border-bottom: 3px solid #e74c3c; color: #e74c3c;">Items</button>
//             <button id="tabCats" onclick="window.switchArchiveTab('categories')" style="background:none; border:none; color: #7f8c8d; cursor:pointer; padding: 5px 10px;">Categories</button>
//         `;
        
//         const tableContainer = modalBody.querySelector(".table-responsive");
//         if(tableContainer) modalBody.insertBefore(tabContainer, tableContainer);
//     }
//     renderArchiveTable();
// };

// window.switchArchiveTab = (tab) => {
//     currentArchiveTab = tab;
    
//     // Visual Feedback for Tabs
//     const btnItems = document.getElementById("tabItems");
//     const btnCats = document.getElementById("tabCats");

//     if(btnItems) {
//         btnItems.style.borderBottom = tab === 'items' ? "3px solid #e74c3c" : "none";
//         btnItems.style.color = tab === 'items' ? "#e74c3c" : "#7f8c8d";
//     }
    
//     if(btnCats) {
//         btnCats.style.borderBottom = tab === 'categories' ? "3px solid #e74c3c" : "none";
//         btnCats.style.color = tab === 'categories' ? "#e74c3c" : "#7f8c8d";
//     }
    
//     renderArchiveTable();
// };

// function renderArchiveTable() {
//     const tbody = document.getElementById("archiveTableBody");
//     // Find the closest table, then the thead inside it
//     const table = tbody.closest("table");
//     const thead = table.querySelector("thead tr");
    
//     tbody.innerHTML = "";

//     // --- TAB: ITEMS ---
//     if (currentArchiveTab === 'items') {
//         if (thead) {
//             thead.innerHTML = `<th>Item Name</th><th>Category</th><th>Last Stock</th><th>Actions</th>`;
//         }

//         const archivedItems = inventoryData.filter(i => i.status === 'archived');
        
//         if (archivedItems.length === 0) {
//             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived items found.</td></tr>`;
//             return;
//         }

//         archivedItems.forEach(item => {
//             const tr = document.createElement("tr");
//             tr.innerHTML = `
//                 <td><strong>${item.name}</strong></td>
//                 <td>${item.categoryName || "-"}</td>
//                 <td>${item.currentStock}</td>
//                 <td>
//                     <button class="btn-primary btn-sm" onclick="window.restoreItem('${item.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
//                         <i class="fas fa-undo"></i> Restore
//                     </button>
//                     <button class="btn-icon delete" onclick="window.permanentDelete('${item.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </td>
//             `;
//             tbody.appendChild(tr);
//         });

//     // --- TAB: CATEGORIES ---
//     } else {
//         if (thead) {
//             thead.innerHTML = `<th>Category Name</th><th>Archived Date</th><th>Status</th><th>Actions</th>`;
//         }

//         const archivedCats = categoryData.filter(c => c.status === 'archived');
        
//         if (archivedCats.length === 0) {
//             tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No archived categories found.</td></tr>`;
//             return;
//         }

//         archivedCats.forEach(cat => {
//             const dateStr = cat.updatedAt ? new Date(cat.updatedAt.seconds * 1000).toLocaleDateString() : "-";
//             const tr = document.createElement("tr");
//             tr.innerHTML = `
//                 <td><strong>${cat.name}</strong></td>
//                 <td>${dateStr}</td>
//                 <td><span class="badge" style="background:#fff3cd; color:#856404; padding:2px 8px; border-radius:10px; font-size:0.8em;">Archived</span></td>
//                 <td>
//                     <button class="btn-primary btn-sm" onclick="window.restoreCategory('${cat.id}')" style="background:#27ae60; padding: 5px 10px; border:none; color:white; border-radius:4px; cursor:pointer;">
//                         <i class="fas fa-undo"></i> Restore
//                     </button>
//                     <button class="btn-icon delete" onclick="window.permanentDeleteCategory('${cat.id}')" title="Delete Permanently" style="margin-left:5px; color:#c0392b; background:none; border:none; cursor:pointer;">
//                         <i class="fas fa-trash"></i>
//                     </button>
//                 </td>
//             `;
//             tbody.appendChild(tr);
//         });


        
//     }




    
// }



// // ================= MODAL & LISTENER LOGIC =================

// function setupListeners() {
//     // 1. Search & Category Filters
//     const searchInput = document.getElementById("searchInput");
//     if (searchInput) searchInput.addEventListener("keyup", filterAndRender);
    
//     const catFilter = document.getElementById("categoryFilter");
//     if (catFilter) catFilter.addEventListener("change", filterAndRender);

//     // 2. Add New Item Button
//     // We check for both a class '.btn-add' and an ID 'addItemBtn' to be safe
//     const addItemBtn = document.querySelector(".btn-add") || document.getElementById("addItemBtn");
//     if (addItemBtn) {
//         addItemBtn.onclick = () => {
//             document.getElementById("itemForm").reset();
//             document.getElementById("itemId").value = "";
//             document.getElementById("modalTitle").innerText = "Add New Item";
//             document.getElementById("itemModal").style.display = "flex";
//         };
//     }

//     // 3. Manage Categories Button (This was missing!)
//     const manageCatBtn = document.querySelector(".btn-manage-cats") || document.getElementById("manageCatsBtn");
//     if (manageCatBtn) {
//         manageCatBtn.onclick = () => {
//             document.getElementById("categoryModal").style.display = "flex";
//             renderCategoryList(); // Refresh the list when opening
//         };
//     }

//     // 4. Archive Button (If you have a separate button for it)
//     const archiveBtn = document.getElementById("viewArchiveBtn");
//     if (archiveBtn) {
//         archiveBtn.onclick = () => window.openArchiveModal();
//     }

//     // 5. Attach Close Logic to all "X" buttons
//     document.querySelectorAll(".close").forEach(btn => {
//         btn.onclick = () => window.closeModal();
//     });

//     // 6. Form Submit Listener
//     const itemForm = document.getElementById("itemForm");
//     if (itemForm) itemForm.addEventListener("submit", window.saveItem);
// }

// // Global Close Function
// window.closeModal = function() {
//     // Finds all elements with the class 'modal' and hides them
//     const modals = document.querySelectorAll(".modal");
//     modals.forEach(modal => {
//         modal.style.display = "none";
//     });
// };

// // Close Modal when clicking the dark background
// window.onclick = function(event) {
//     if (event.target.classList.contains("modal")) {
//         window.closeModal();
//     }
// };