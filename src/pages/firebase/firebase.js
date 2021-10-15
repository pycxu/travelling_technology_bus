import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBZlFaO0zfX4KW8-QJTG4Nq51SiEl-vyQ",
    authDomain: "travelling-technology-bu-3c1b0.firebaseapp.com",
    projectId: "travelling-technology-bu-3c1b0",
    storageBucket: "travelling-technology-bu-3c1b0.appspot.com",
    databaseURL: "https://travelling-technology-bu-3c1b0-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "598859440378",
    appId: "1:598859440378:web:dee689af7bfb2177752943",
    measurementId: "G-37NP12RG67"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;