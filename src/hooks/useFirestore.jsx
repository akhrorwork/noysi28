import {
  collection,
  addDoc,
  doc,
  updateDoc,
  documentId,
} from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";
import { useState } from "react";

function useFirestore(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = async (data) => {
    setIsPending(true);
    try {
      await addDoc(collection(db, collectionName), data);
      toast.success("Project added ");
    } catch (error) {
      toast.success(error.code);
      setError(error.code);
    } finally {
      setIsPending(false);
    }
  };

  const deleteDocument = async () => {
    setIsPending(true);

    setIsPending(false);
  };

  const updateDocument = async (document, id) => {
    setIsPending(true);
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, documentId);
    setIsPending(false);
  };

  return { addDocument, deleteDocument, updateDocument, isPending, error };
}

export { useFirestore };
