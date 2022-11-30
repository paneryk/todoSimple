import { initFirebase } from "../firebase/firebase";
import { getUserData } from "../firebase/firestore";
import { renderTasks } from "./modules/tasks";

const services = initFirebase(handleOnAuthStateChange);

async function initDashboard(user) {
  const userData = await getUserData(user.uid);

  /*  renderNavbar(userData);

    renderTasks(userData);

    renderSidebar(userData); */
  renderTasks(userData);
  showSettings(userData);
}

async function showSettings(userData) {
  console.log(userData);
}

async function handleOnAuthStateChange(user) {
  if (user) {
    console.log("You are loggeddd in as: " + user.uid);
    initDashboard(user);
  } else {
    location.href = "../";
  }
}
