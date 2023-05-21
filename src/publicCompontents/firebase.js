import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr5OTJlDZ4yrKs_dcNFOtYVaf1lZ4DRM8",
  authDomain: "chat-demo-b0db2.firebaseapp.com",
  projectId: "chat-demo-b0db2",
  storageBucket: "chat-demo-b0db2.appspot.com",
  messagingSenderId: "725721845191",
  appId: "1:725721845191:web:00cfd571dd961f633f1de2",
  measurementId: "G-8R4TV0NRCY"
};

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const storage=getStorage();
  export const db = getFirestore();