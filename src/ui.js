export const newUserBtn = document.getElementById("createUserBtn");
export const logoutBtn = document.getElementById("logoutBtn");
export const signupForm = document.getElementById("signUp");
export const loginForm = document.getElementById("loginForm");
export const userMail = document.getElementById("userMail");
export const userPass = document.getElementById("userPass");
export const loginBtn = document.getElementById("loginBtn");
export const tasksDiv = document.getElementById("tasksDiv");
export const loggedUserHeader = document.getElementById("loggedUser");
export const taskName = document.getElementById("taskName");
export const taskDue = document.getElementById("taskDue");
export const addTaskBtn = document.getElementById("addTaskBtn");
export const newUserMail = document.getElementById("newUserMail");
export const newUserPass = document.getElementById("newUserPassword");
export const signInWithGoogle = document.getElementById("signInWithGoogle");
export const newUserName = document.getElementById("newUserName");
export const goToDashboard = document.getElementById("goToDashboard");

export function onLogin(user) {
  const authorizedElements = document.querySelectorAll(".auth");
  const unauthorizedElements = document.querySelectorAll(".noauth");

  authorizedElements.forEach((element) => {
    element.hidden = false;
  });

  unauthorizedElements.forEach((element) => {
    element.hidden = true;
  });
}

export function onLogout() {
  const authorizedElements = document.querySelectorAll(".auth");
  const unauthorizedElements = document.querySelectorAll(".noauth");

  authorizedElements.forEach((element) => {
    element.hidden = true;
  });

  unauthorizedElements.forEach((element) => {
    element.hidden = false;
  });
}
