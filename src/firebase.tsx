
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBxqSVDAmQIQzNNHrRs-BlQ7abeU7roZtQ",
  authDomain: "react-firebase-app-a6cc3.firebaseapp.com",
  projectId: "react-firebase-app-a6cc3",
  storageBucket: "react-firebase-app-a6cc3.appspot.com",
  messagingSenderId: "787047288714",
  appId: "1:787047288714:web:3aead27f3213abe1918273",
  measurementId: "G-QNQCH1SZE7"

};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
