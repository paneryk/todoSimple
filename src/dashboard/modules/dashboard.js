import { getUserData } from "../../firebase/firestore";
import { renderTaskList, getOverdues, getTodays, addTask } from "./tasks.js";
import List from "list.js";
import { format} from "date-fns";

export class Dashboard {
  constructor(user) {
    this.userData = getUserData(user.uid);
    this.userTasks = this.userData.tasks;
    this.todayDate = format(new Date(), "dd/MM/yyyy");
  }

  //TO BE SPLIT INTO SEPARATE FUNCTIONALITIES - SHOULD NOT BE ANY DOM MANIPULATION IN HERE - MOVE IT TO INDEX.JS
  async initDashboard() {
    const userData = await this.userData;
    const overdueTaskList = document.querySelector("#overdueTaskList");
    const todaysList = document.querySelector("#todayTaskList");

    const overdueTasks = await getOverdues(userData.tasks);
    const todaysTasks = await getTodays(userData.tasks);

    const overdueRenderedList = await renderTaskList(
      userData.tasks,
      userData.settings.dateFormat
    );
    const overdueStatusCheckboxes =
      overdueRenderedList.querySelectorAll(".task-status");
    overdueStatusCheckboxes.forEach((element) =>
      element.addEventListener("input", (event) => {
        this.statusChange(event);
      })
    );
    overdueTaskList.append(overdueRenderedList);

    const todaysRenderedList = await renderTaskList(
      todaysTasks,
      userData.settings.dateFormat
    );
    todaysList.append(todaysRenderedList);

    Dashboard.createSortableList("overdueTasks", ["task-due hidden"]);
    Dashboard.createSortableList("todayTasks", ["task-due hidden"]);
  }

  static createSortableList(listName, valueNames) {
    //valueNames = [ 'task-title', 'task-due hidden' ] AND listName = name of the div containing the <ul>
    var options = {
      valueNames,
    };

    const sortableList = new List(listName, options);
  }

  //ALSO HERE - NO DOM MANIPULATION - IT NEEDS TO GO TO INDEX.JS
  async handleNewTask() {
    const userData = await this.userData;
    const newTaskName = document.querySelector("#taskName").value;
    const newTaskDue = document.querySelector("#taskDue").value;
    const newTaskTags = document.querySelector("#taskTags").value;
    const newTaskDesc = document.querySelector("#taskDescription").value;
    const newTaskData = {
      newTaskName,
      newTaskDue,
      newTaskTags,
      newTaskDesc,
    };
    addTask(userData, newTaskData);
  }

  statusChange(event) {
    const status = event.target.checked ? true : false; //true = completed
    const taskLI = event.target.parentElement.parentElement;
    const taskID = taskLI.dataset.id;
    const taskName = taskLI.querySelector(".task-title");

    if (status) {
      taskName.classList.add("completed");
      taskLI.classList.add("completed");
    } else {
      taskName.classList.remove("completed");
      taskLI.classList.remove("completed");
    }
  }
}
