import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

export function useAuthWithGoogle() {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GoogleAuthProvider();

  const googleAuth = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      // Add a new document in collection "cities"
      if (!isCanceled) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          id: user.uid,
          online: true,
        });
        console.log(user); // dispatch bor bu yerda
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { googleAuth, isPending };
}
