import {
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import { initializedServices } from "./firebase.js";
/*
AUTHORIZATION
*/

export function newUserWithEmailAndPass(mail, pass, name) {
  const { auth } = initializedServices;
  createUserWithEmailAndPassword(auth, mail, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      createInitialDb(user.uid, name);
    })
    .catch(async (error) => {
      const errorMessage = error.code;
      if (errorMessage == "auth/email-already-in-use") {
        handleEmailInUse(auth, mail);
      }
    });
}

async function handleEmailInUse(auth, mail) {
  let message = "This e-mail is registered";
  const providers = await fetchSignInMethodsForEmail(auth, mail).then(
    (result) => {
      return result;
    }
  );

  if (providers.some((element) => element === "google.com")) {
    message += ", try signing in with Google";
  }
  console.log(message);
}

export function logoutEvent() {
  const { auth } = initializedServices;
  signOut(auth)
    .then(console.log("Signed out"))
    .catch((error) => console.log(error.message));
}

export function loginWithProvider(provider) {
  if (provider === "google") {
    console.log("trying");
    const provider = new GoogleAuthProvider();
    const { auth } = initializedServices;
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        if (await isNewUser(user.uid)) {
          createInitialDb(user.uid, user.displayName, user.photoURL);
        }
      })
      .catch((error) => {
        console.log(error.code);
      });
  }
}

export function loginWithEmailAndPass(email, pass) {
  const { auth } = initializedServices;
  signInWithEmailAndPassword(auth, email, pass)
    .then(console.log("Signed in with password"))
    .catch((error) => {
      console.log(error.message);
    });
}
