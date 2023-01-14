import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyADmyhmafiAJPZFtcIGc44HIDMX3CI6UDw",
	authDomain: "music-app-40b6e.firebaseapp.com",
	projectId: "music-app-40b6e",
	storageBucket: "music-app-40b6e.appspot.com",
	messagingSenderId: "112040352803",
	appId: "1:112040352803:web:30e6055d47d6d09af52596"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)