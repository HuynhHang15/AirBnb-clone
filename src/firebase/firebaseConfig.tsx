// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQwLhvZ1IE-Gcdce1WI3daAMOV1vTzKEw",
  authDomain: "airbnb-clone-40678.firebaseapp.com",
  projectId: "airbnb-clone-40678",
  storageBucket: "airbnb-clone-40678.appspot.com",
  messagingSenderId: "1071792819479",
  appId: "1:1071792819479:web:936d2a2616b9f4e4dc3b52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

// const toggleWishlist = async (idRoom: string) => {
//   try {
//     const user = auth.currentUser;
//     const dispatch = useDispatch()
//     if (!user) {
//       signInWithGoogle();
//     } else {
//       const docRef = doc(db, "wishlist", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const wishlist = docSnap.data().wishlist
//         const updatedWishlist = wishlist.includes(idRoom)
//         ? wishlist.filter((id: any) => id !== idRoom)
//         : [...wishlist, idRoom];

//       await updateDoc(docRef, { wishlist: updatedWishlist });
//         dispatch(setWishlist(updatedWishlist))
//       } else {
//         await setDoc(doc(db, "wishlist", user.uid), {
//           wishlist: [idRoom],
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

export { auth, db, signInWithGoogle, logout };
