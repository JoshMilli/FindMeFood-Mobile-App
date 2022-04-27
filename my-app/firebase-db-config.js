import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import "firebase/auth"



const firebaseConfig = {
  apiKey: "*****************************************",
  authDomain: "*****************************************",
  projectId: "*****************************************",
  storageBucket: "*****************************************",
  messagingSenderId: "*****************************************",
  appId: "*****************************************"
};

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

