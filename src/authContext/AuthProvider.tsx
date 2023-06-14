import { auth, db } from "@/firebase/firebaseConfig";
import { setWishlist } from "@/redux/wishlistSlice";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: any) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getWishlist = async () => {
      if (user && user.uid) {
        const wishlistRef = doc(db, "wishlist", user.uid);
        const wishlistDoc = await getDoc(wishlistRef);
        if (wishlistDoc.exists()) {
          dispatch(setWishlist(wishlistDoc.data().items));
        }
      }
    };
    getWishlist();
  }, [user]);
  return <div>{children}</div>;
};

export default AuthProvider;
