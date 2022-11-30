import { initializeApp } from "firebase/app";
import {
  initFirebase,
} from "./firebase/firebase";
import {
  getUserData
} from "./firebase/firestore";
import {
  newUserWithEmailAndPass,
  logoutEvent,
  loginWithProvider,
  loginWithEmailAndPass,
} from "./firebase/auth";
import {
  newUserMail,
  newUserBtn,
  newUserPass,
  onLogin,
  onLogout,
  logoutBtn,
  signInWithGoogle,
  userMail,
  userPass,
  loginBtn,
  newUserName,
  goToDashboard,
} from "./ui";

let loggedUser = null;

// Initialize Auth, Firestore and set an Auth observer as handleAuthStateChange
const services = initFirebase(handleAuthStateChange); //services = {auth, firestore(db)}

// Dom listeners
newUserBtn.onclick = signUpWithEmailAndPass;
logoutBtn.onclick = logoutEvent;
loginBtn.onclick = signInWithEmailAndPass;
signInWithGoogle.onclick = function () {
  loginWithProvider("google");
};
goToDashboard.onclick = function () {
  location.href = "./dashboard/";
};

// App functionalities
function signUpWithEmailAndPass() {
  const email = newUserMail.value;
  const pass = newUserPass.value;
  const name = newUserName.value;
  newUserWithEmailAndPass(email, pass, name);
}

function signInWithEmailAndPass() {
  const email = userMail.value;
  const pass = userPass.value;
  loginWithEmailAndPass(email, pass);
  console.log(services);
}

// Initiated by firebase.js

export async function handleSignupError(message) {
  console.log(message);
}

// Auth state change observer
async function handleAuthStateChange(user) {
  if (user) {
    console.log("You are loggeddd in as: " + user.uid);
    onLogin(user);
    loggedUser = await getUserData(user.uid);
    console.log(loggedUser);
  } else {
    console.log("You are logged out");
    onLogout();
  }
}
