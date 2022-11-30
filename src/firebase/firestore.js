import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { initializedServices } from "./firebase.js";

/* 
FIRESTORE BELOW
*/

async function isNewUser(currentUserID) {
  const { firestore } = initializedServices;
  const docRef = doc(firestore, "users", currentUserID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return false;
  } else {
    return true;
  }
}

async function createInitialDb(userID, userName, userPhoto) {
  const { firestore } = initializedServices;

  await setDoc(doc(firestore, "users", userID), {
    name: userName,
    id: userID,
    picture: null,
    tasks: [],
    tags: [],
    settings: {
      dateFormat: "yyyy-mm-dd",
      theme: "bright",
      weekStart: "Monday",
    },
  });

  if (!!userPhoto) {
    const reference = doc(firestore, "users", userID);
    await updateDoc(reference, {
      picture: userPhoto,
    });
  }
}

export async function getUserData(uid) {
  const { firestore } = initializedServices;
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    //No document
  }
}
