import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAKC7-cMMvDDfyyM2bV0-wHePePzfCUoRo",
    authDomain: "genesis-9986f.firebaseapp.com",
    projectId: "genesis-9986f",
    storageBucket: "genesis-9986f.appspot.com",
    messagingSenderId: "108977786773",
    appId: "1:108977786773:web:bde30987154e827892309c",
    measurementId: "G-K5DQSCK1GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Save Genesis content to Firestore
export const saveGenesis = async (content: string) => {
    try {
        const docRef = await addDoc(collection(db, "genesis"), {
            content,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        console.log("Genesis saved with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving genesis: ", error);
        throw error;
    }
}; 