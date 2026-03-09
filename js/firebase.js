// // // // js/firebase.js
// // // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// // // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// // // import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // // // Your web app's Firebase configuration
// // // const firebaseConfig = {
// // //     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
// // //     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
// // //     projectId: "pos-and-sales-monitoring",
// // //     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
// // //     messagingSenderId: "516453934117",
// // //     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
// // //     measurementId: "G-FT1G64DB9N"
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);
// // // const db = getFirestore(app);

// // // // Export 'db' so other scripts (dashboard.js, pos.js) can use it
// // // export { app, analytics, db };


// // // js/firebase.js
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// // import { 
// //     getFirestore, 
// //     collection, 
// //     getDocs, 
// //     addDoc, 
// //     updateDoc, 
// //     deleteDoc, 
// //     doc,
// //     query,
// //     where,
// //     orderBy,
// //     onSnapshot
// // } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// // // Add Storage for product images
// // import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// // const firebaseConfig = {
// //     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
// //     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
// //     projectId: "pos-and-sales-monitoring",
// //     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
// //     messagingSenderId: "516453934117",
// //     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
// //     measurementId: "G-FT1G64DB9N"
// // };

// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // const db = getFirestore(app);
// // const storage = getStorage(app);

// // // Export all necessary functions
// // export { 
// //     app, 
// //     analytics, 
// //     db, 
// //     storage, 
// //     collection, 
// //     getDocs, 
// //     addDoc, 
// //     updateDoc, 
// //     deleteDoc, 
// //     doc, 
// //     query, 
// //     where, 
// //     orderBy, 
// //     onSnapshot,
// //     ref,
// //     uploadBytes,
// //     getDownloadURL
// // };






// //finale code above


// // js/firebase.js
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// // // Added Authentication Import
// // import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// // import { 
// //     getFirestore, 
// //     collection, 
// //     getDocs, 
// //     addDoc, 
// //     updateDoc, 
// //     deleteDoc, 
// //     doc,
// //     getDoc, // Added getDoc for Auth checks
// //     query,
// //     where,
// //     orderBy,
// //     onSnapshot,
// //     setDoc
// // } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// // import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// // const firebaseConfig = {
// //     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
// //     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
// //     projectId: "pos-and-sales-monitoring",
// //     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
// //     messagingSenderId: "516453934117",
// //     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
// //     measurementId: "G-FT1G64DB9N"
// // };

// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // const db = getFirestore(app);
// // const storage = getStorage(app);
// // const auth = getAuth(app); // Initialize Auth

// // // Export all necessary functions
// // export { 
// //     app, 
// //     analytics, 
// //     db, 
// //     storage, 
// //     auth, // Export Auth
// //     collection, 
// //     getDocs, 
// //     addDoc, 
// //     updateDoc, 
// //     deleteDoc, 
// //     doc, 
// //     getDoc,
// //     query, 
// //     where, 
// //     orderBy, 
// //     onSnapshot,
// //     ref,
// //     uploadBytes,
// //     getDownloadURL,
// //     setDoc
    
// // };
// // js/firebase.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { 
//     getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, where, orderBy, onSnapshot, setDoc
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // Alias 'ref' from storage to avoid conflict with Realtime Database
// import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// // 🔥 ADDED: Realtime Database for the ESP32 Screen
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
//     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
//     projectId: "pos-and-sales-monitoring",
//     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
//     messagingSenderId: "516453934117",
//     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
//     measurementId: "G-FT1G64DB9N",
//     // Matches your Arduino DATABASE_URL
//     databaseURL: "https://pos-and-sales-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app);

// // 🔥 Initialize Realtime Database
// const rtdb = getDatabase(app);

// // Export everything needed for pos.js and other scripts
// export { 
//     app, 
//     analytics, 
//     db, 
//     storage, 
//     auth, 
//     rtdb,      // Export for ESP32 communication
//     ref,       // Realtime Database ref
//     set,       // Realtime Database set
//     collection, 
//     getDocs, 
//     addDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc, 
//     getDoc,
//     query, 
//     where, 
//     orderBy, 
//     onSnapshot,
//     sRef,      // Storage ref
//     uploadBytes,
//     getDownloadURL,
//     setDoc
// };




















// // // js/firebase.js
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// // import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // // Your web app's Firebase configuration
// // const firebaseConfig = {
// //     apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
// //     authDomain: "pos-and-sales-monitoring.firebaseapp.com",
// //     projectId: "pos-and-sales-monitoring",
// //     storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
// //     messagingSenderId: "516453934117",
// //     appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
// //     measurementId: "G-FT1G64DB9N"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // const db = getFirestore(app);

// // // Export 'db' so other scripts (dashboard.js, pos.js) can use it
// // export { app, analytics, db };


// // js/firebase.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// import { 
//     getFirestore, 
//     collection, 
//     getDocs, 
//     addDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc,
//     query,
//     where,
//     orderBy,
//     onSnapshot
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// // Add Storage for product images
// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// // Export all necessary functions
// export { 
//     app, 
//     analytics, 
//     db, 
//     storage, 
//     collection, 
//     getDocs, 
//     addDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc, 
//     query, 
//     where, 
//     orderBy, 
//     onSnapshot,
//     ref,
//     uploadBytes,
//     getDownloadURL
// };






//finale code above


// js/firebase.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
// // Added Authentication Import
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { 
//     getFirestore, 
//     collection, 
//     getDocs, 
//     addDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc,
//     getDoc, // Added getDoc for Auth checks
//     query,
//     where,
//     orderBy,
//     onSnapshot,
//     setDoc
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app); // Initialize Auth

// // Export all necessary functions
// export { 
//     app, 
//     analytics, 
//     db, 
//     storage, 
//     auth, // Export Auth
//     collection, 
//     getDocs, 
//     addDoc, 
//     updateDoc, 
//     deleteDoc, 
//     doc, 
//     getDoc,
//     query, 
//     where, 
//     orderBy, 
//     onSnapshot,
//     ref,
//     uploadBytes,
//     getDownloadURL,
//     setDoc
    
// };
// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { 
    getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, where, orderBy, onSnapshot, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Alias 'ref' from storage to avoid conflict with Realtime Database
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// 🔥 ADDED: Realtime Database for the ESP32 Screen
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvsn9hLvi4Tq9mLvoo1-YL1uzbB_ntL7s",
    authDomain: "pos-and-sales-monitoring.firebaseapp.com",
    projectId: "pos-and-sales-monitoring",
    storageBucket: "pos-and-sales-monitoring.firebasestorage.app",
    messagingSenderId: "516453934117",
    appId: "1:516453934117:web:1783067b8aa6b37373cbcc",
    measurementId: "G-FT1G64DB9N",
    // Matches your Arduino DATABASE_URL
    databaseURL: "https://pos-and-sales-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// 🔥 Initialize Realtime Database
const rtdb = getDatabase(app);

// Export everything needed for pos.js and other scripts
export { 
    app, 
    analytics, 
    db, 
    storage, 
    auth, 
    rtdb,      // Export for ESP32 communication
    ref,       // Realtime Database ref
    set,       // Realtime Database set
    onValue,   // Realtime Database listener
    remove,    // Realtime Database delete
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDoc,
    query, 
    where, 
    orderBy, 
    onSnapshot,
    sRef,      // Storage ref
    uploadBytes,
    getDownloadURL,
    setDoc
};