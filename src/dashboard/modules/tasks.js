const DASHBOARD_TASKS = document.getElementById("tasks");

export function renderTasks(userData) {
  const TASK_TEMPLATE =
    '<div class="task-container">' +
    '<div class="task-title">cos</div>' +
    '<div class="due">due</div>' +
    "</div>";

  const tasks = userData.tasks;

  for (let i = 0; i < tasks.length; i++) {
    const container = document.createElement("div");
    container.innerHTML = TASK_TEMPLATE;
    DASHBOARD_TASKS.append(container);

    const taskTitle = container.querySelector(".task-title");
    taskTitle.textContent = tasks[i].title;
    const taskDue = container.querySelector(".due");
    taskDue.textContent = tasks[i].due;
  }
}
