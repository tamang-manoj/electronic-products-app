import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBV7eLxqhpYqDcTDoUx2XIyiAgamFlw_cI",
  authDomain: "electronicproducts-c4550.firebaseapp.com",
  projectId: "electronicproducts-c4550",
  storageBucket: "electronicproducts-c4550.appspot.com",
  messagingSenderId: "360792104623",
  appId: "1:360792104623:web:3341badab07f93ed723e5a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
