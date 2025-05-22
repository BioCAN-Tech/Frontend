// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfGyWxBB91iYUMnHS8RV4vkOzTLTZM7gg",
  authDomain: "biocan-ai-4126e.firebaseapp.com",
  projectId: "biocan-ai-4126e",
  storageBucket: "biocan-ai-4126e.firebasestorage.app",
  messagingSenderId: "505345175475",
  appId: "1:505345175475:web:bb0993f19ba0e27429e5c6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
