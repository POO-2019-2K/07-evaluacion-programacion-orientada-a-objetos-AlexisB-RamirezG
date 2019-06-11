import Task from "./task.js";

export default class Agenda {
    constructor() {
        this._tasks = [];

        //localStorage.removeItem("tasks");
    }

    get tasks() {
        return this._tasks;
    }

    getTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks === null) {
            this._tasks = [];
            return this._tasks;
        }
        this._tasks = tasks;
        this._tasks.forEach((e, index) => {
            e.dueDate = new Date(e.dueDate);
            this._getData(new Task (e), index);
        });
        return this._tasks;
    }

    _getData(e, index) {
        e.daysLeft = e.getDaysLeft();
        let objTask = {
            name: e.name,
            dueDate: e.dueDate,
            daysLeft: e.daysLeft
        }
        this._tasks.splice(index, 1, objTask);
    }

    sortByDaysLeft() {
        this.getTasks();
        this._tasks.sort(function (a, b) {
            return a.daysLeft - b.daysLeft;
        });
        return this._contacts;
    }

    sortByName() {
        this.getTasks();
        this._tasks.sort(function (a, b) {
            let nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return this._tasks;
    }

    findTask(task) {
        let foundAt = -1;
        if (this._tasks === null) {
            return foundAt;
        }
        this._tasks.forEach((e, index) => {
            if (e.name === task.name && e.email === task.email) {
                foundAt = index;
                return;
            }
        });

        return foundAt;
    }

    addTask(task, dL) {
        let objTask = {
            name: task.name,
            dueDate: task.dueDate,
            daysLeft: dL
        };
        this._tasks.push(objTask);
        localStorage.setItem("tasks", JSON.stringify(this._tasks));
        console.log(this._tasks);
    }

    deleteTask(task) {
        let index = this.findTask(task);
        this._tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this._tasks));
    }
}