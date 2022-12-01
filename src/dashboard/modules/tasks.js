import { format, isPast, isToday } from "date-fns";

//RETURNS AN ARRAY OF OVERDUE TASKS
export function getOverdues(tasksArray) {
  const overdues = tasksArray.filter((task) => {
    if (isPast(task.due.toDate()) && !isToday(task.due.toDate())) return true;
  });
  return overdues;
}

//RETURNS AN ARRAY OF TODAY'S DUE TASKS
export function getTodays(tasksArray) {
  const overdues = tasksArray.filter((task) => {
    if (isToday(task.due.toDate())) return true;
  });
  return overdues;
}

//RENDERS A LIST OF TASKS TO BE APPENDED TO REQUIRED ELEMENT
export async function renderTaskList(tasks, formatting) {
  const taskList = document.createElement("ul");
  taskList.className = "taskList";
  taskList.className += " list";

  const templateLi = `
    <input type="checkbox" class="task-status">
    <span class="task-title"></span>
    <span class="task-tags"></span>
    <span class="task-due hidden"></span>
    <span class="task-due visible"></span>
    <span class="task-due-icon"></span>`;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const list = document.createElement("li");
    list.dataset.id = task.id;
    list.innerHTML = templateLi;
    taskList.append(list);

    const taskStatus = list.querySelector(".task-status");
    taskStatus.checked = task.status;

    const taskTitle = list.querySelector(".task-title");
    taskTitle.textContent = task.title;

    let taskTags = list.querySelector(".task-tags");
    taskTags.innerHTML = renderTags(task.tags);

    const taskDueHidden = list.querySelector(".task-due.hidden");
    taskDueHidden.textContent = format(task.due.toDate(), "yyyy/MM/dd"); // taskDue.textContent = format(task.due.toDate(), formatting);

    const taskDue = list.querySelector(".task-due.visible");
    taskDue.textContent = format(task.due.toDate(), formatting);
  }

  return taskList;
}

//RENDERS A LIST OF TAGS TO BE DISPLAYED IN A TASK <LI>
function renderTags(tagArray) {
  const tags = tagArray;
  let tagTemplate = "";
  for (let i = 0; i < tags.length; i++) {
    tagTemplate += `<span class="task-tag" style="color: ${tags[i].color}"> #${tags[i].name} </span>`;
  }
  return tagTemplate;
}

//TO BE CONTINUED - INITIATES A FIRESTORE DATA SUBMISSION
export async function addTask(userData, newTaskData) {
  console.log(userData);
  console.log(newTaskData);
}
