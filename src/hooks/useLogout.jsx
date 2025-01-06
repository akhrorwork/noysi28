import toast from "react-hot-toast";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../app/features/userSlice";
export function useLogout() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const logout = async () => {
    dispatch(setIsPending(true));
    let ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      online: false,
    });
    signOut(auth)
      .then(() => {
        toast.success("See you again");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        dispatch(setIsPending(false));
      });
  };

  return { logout };
}
