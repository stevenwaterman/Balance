import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  browserLocalPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  type User,
} from "firebase/auth";

export function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDgmBSpuzMuyZ2z_Dd5KSwwPRRHNvDw5so",
    authDomain: "balance-scores.firebaseapp.com",
    projectId: "balance-scores",
    storageBucket: "balance-scores.appspot.com",
    messagingSenderId: "900673448207",
    appId: "1:900673448207:web:dd5f173851b0edcb7a767a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

export async function loginWithGoogle(): Promise<User | undefined> {
  const auth = getAuth();
  return setPersistence(auth, browserLocalPersistence)
    .then(async () => {
      if (auth.currentUser !== null) return auth.currentUser;

      const redirectResult = await getRedirectResult(auth);
      if (redirectResult !== null) return redirectResult.user;

      await signInWithRedirect(auth, new GoogleAuthProvider());
    });
}