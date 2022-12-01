import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { initializedServices } from "./firebase.js";
import { sub, add } from "date-fns";

/* 
FIRESTORE BELOW
*/

export async function isNewUser(currentUserID) {
  const { firestore } = initializedServices;
  const docRef = doc(firestore, "users", currentUserID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return false;
  } else {
    return true;
  }
}

export async function createInitialDb(userID, userName, userPhoto) {
  const { firestore } = initializedServices;
  const tasks = await createInitialTasks();
  const tags = await createInitialTags();

  await setDoc(doc(firestore, "users", userID), {
    name: userName,
    id: userID,
    picture: null,
    tasks: tasks,
    tags: tags,
    settings: {
      dateFormat: "dd/MM/yyyy",
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

async function createInitialTasks() {
  const todayDate = new Date();
  const tomorrowDate = add(new Date(), { days: 1 });
  const yesterdayDate = sub(new Date(), { days: 1 });

  const initialTasks = [
    {
      id: 1,
      status: false,
      due: todayDate,
      title: "Kupić kurtkę",
      description: "Jakiś opis kurtki, którą chcę",
      tags: [
        {
          id: 1,
          editable: 0,
          name: "critical",
          color: "red",
        },
      ],
    },
    {
      id: 2,
      status: false,
      due: tomorrowDate,
      title: "Ugotować obiad",
      description: "Opis obiadu, jaki mam ugotować",
      tags: [
        {
          id: 1,
          editable: 0,
          name: "critical",
          color: "red",
        },
      ],
    },
    {
      id: 3,
      status: false,
      due: yesterdayDate,
      title: "Spakować się na narty",
      description: null,
      tags: [
        {
          id: 2,
          editable: 0,
          name: "regular",
          color: "black",
        },
      ],
    },
    {
      id: 4,
      status: false,
      due: todayDate,
      title: "Zamówić prezenty",
      description: "Prezenty dla całej rodziny na święta",
      tags: [
        {
          id: 1,
          editable: 0,
          name: "critical",
          color: "red",
        },
      ],
    },
    {
      id: 5,
      status: false,
      due: tomorrowDate,
      title: "Skończyć ten moduł aplikacji",
      description: "Czyli wyświetlanie tasków oraz ich dodawanie",
      tags: [
        {
          id: 1,
          editable: 0,
          name: "critical",
          color: "red",
        },
      ],
    },
    {
      id: 6,
      status: false,
      due: yesterdayDate,
      title: "Jakiś randomowy overdue",
      description: "coś, co miałem zrobić wczoraj",
      tags: [
        {
          id: 1,
          editable: 0,
          name: "critical",
          color: "red",
        },
      ],
    },
  ];
  return initialTasks;
}

async function createInitialTags() {
  const initialTags = [
    {
      id: 1,
      editable: 0,
      name: "critical",
      color: "red",
    },
    {
      id: 2,
      editable: 0,
      name: "regular",
      color: "black",
    },
  ];
  return initialTags;
}
