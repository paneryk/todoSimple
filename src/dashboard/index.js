import { initFirebase } from "../firebase/firebase";
import { Dashboard } from "./modules/dashboard";
import { givePostponeOptions } from "./ui";

const services = initFirebase(handleOnAuthStateChange);
let currentDashboard = null;

function initializeApp(currentUser) {
  currentDashboard = new Dashboard(currentUser);
  currentDashboard.initDashboard();
  addListeners();
}

async function handleOnAuthStateChange(user) {
  if (user) {
    console.log("You are loggeddd in as: " + user.uid);
    const currentUser = user;
    initializeApp(currentUser);
    /* initDashboard(user); */
  } else {
    location.href = "../";
  }
}

//DOM ELELEMNTS
const addTaskBtn = document.querySelector("#addTaskBtn");
const postponeAllBtn = document.querySelector("#postponeTasks");

//LISTENERS
async function addListeners() {
  addTaskBtn.addEventListener("click", () => {
    currentDashboard.handleNewTask();
  });
  postponeAllBtn.addEventListener("click", givePostponeOptions);
}
