import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { config } from "./firebaseConfig";

/*
INITIALIZE AUTH AND FIRESTORE + SET AN AUTH OBSERVER AS A CALLBACK FUNCTION OF INITFIREBASE
*/

let initializedServices; // {auth, db(firestore)}

async function initializeServices() {
  if (getApps().length < 1) {
    const firebaseApp = initializeApp(config);
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    return { firestore, auth };
  } else {
    return initializedServices;
  }
}

function monitorAuthState(callback) {
  const { auth } = initializedServices;
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function initFirebase(callback) {
  const services = await initializeServices();
  const { auth } = services;
  initializedServices = services;
  monitorAuthState(callback);
  return services; // {firestore(db), auth(getAuth())}
}

export { initializedServices };
