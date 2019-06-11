export default class Agenda {
    constructor() {
        this._tasks = [];

        //localStorage.removeItem("tasks");
    }

    getTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        this._tasks = tasks;
        return tasks;
    }

    findTask(task) {
        let foundAt = -1;
        if(this._tasks === null) {
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

    addTask(task, sDueDate, dL) {
        let objTask = {
            name: task.name,
            dueDate: task.dueDate,
            sDueDate,
            dL
        };
        this._tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(this._tasks));
        return objTask;
    }

    getTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(tasks);
        if(tasks === null) {
            this._tasks = [];
            return this._tasks;
        }
        this._tasks = tasks;
        return this._tasks;
    }
}