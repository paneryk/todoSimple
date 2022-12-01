import { getUserData } from "../../firebase/firestore";
import { renderTaskList, getOverdues, getTodays, addTask } from "./tasks.js";
import List from "list.js";

export class Dashboard {
  constructor(user) {
    this.userData = getUserData(user.uid);
  }

  //TO BE SPLIT INTO SEPARATE FUNCTIONALITIES - SHOULD NOT BE ANY DOM MANIPULATION IN HERE - MOVE IT TO INDEX.JS
  async initDashboard() {
    const userData = await this.userData;
    const overdueTaskList = document.querySelector("#overdueTaskList");
    const todaysList = document.querySelector(".taskList");

    const overdueTasks = await getOverdues(userData.tasks);
    const todaysTasks = await getTodays(userData.tasks);

    overdueTaskList.append(
      await renderTaskList(userData.tasks, userData.settings.dateFormat)
    );
    Dashboard.createSortableList("overdueTaskList", [
      "task-title",
      "task-due hidden",
      "task-tag",
    ]);

    todaysList.append(
      await renderTaskList(todaysTasks, userData.settings.dateFormat)
    );
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
}
