import { initFirebase } from "../firebase/firebase";
import { getUserData } from "../firebase/firestore";
import { renderTaskList, getOverdues, getTodays, addTask } from "./modules/tasks";
import List from "list.js";
import { Dashboard } from "./modules/dashboard";

const services = initFirebase(handleOnAuthStateChange);
let currentDashboard = null;

async function handleOnAuthStateChange(user) {
  if (user) {
    console.log("You are loggeddd in as: " + user.uid);
    const currentUser = user;
    currentDashboard = new Dashboard(currentUser);
    currentDashboard.initDashboard();
    addListeners();
    /* initDashboard(user); */
  } else {
    location.href = "../";
  }
}

//DOM ELELEMNTS
const addTaskBtn = document.querySelector("#addTaskBtn");


//LISTENERS
async function addListeners() {
  addTaskBtn.addEventListener("click", () => {currentDashboard.handleNewTask()});
}