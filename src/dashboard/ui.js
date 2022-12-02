import hoursToMilliseconds from "date-fns/esm/fp/hoursToMilliseconds/index.js";

const postponeTodayBtn = document.querySelector("#postponeToday");
const postponeTomorrowBtn = document.querySelector("#postponeTomorrow");
const postponeAllBtn = document.querySelector("#postponeTasks");

export function givePostponeOptions() {
  showPostponeOptionsButtons();

  window.addEventListener("click", hideOnClick);
}

function showPostponeOptionsButtons() {
  postponeAllBtn.classList.add("hide");
  postponeTodayBtn.classList.add("show");
  postponeTodayBtn.classList.remove("invisible");
  postponeTomorrowBtn.classList.add("show");
  postponeTomorrowBtn.classList.remove("invisible");
}

function hidePostponeOptionsButtons() {
  postponeAllBtn.classList.remove("hide");
  postponeTodayBtn.classList.remove("show");
  postponeTodayBtn.classList.add("invisible");
  postponeTomorrowBtn.classList.remove("show");
  postponeTomorrowBtn.classList.add("invisible");
  window.removeEventListener("click", hideOnClick);
}

function hideOnClick(event) {
  if (
    event.target !== postponeTodayBtn &&
    event.target !== postponeTomorrowBtn &&
    event.target !== postponeAllBtn
  ) {
    hidePostponeOptionsButtons();
  }
}
