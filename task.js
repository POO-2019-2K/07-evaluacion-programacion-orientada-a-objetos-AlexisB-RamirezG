export default class Task {
    constructor(task) {
        this._name = task.name;
        this._dueDate = task.dueDate;
        this._daysLeft = 0;
    }

    get name() {
        return this._name;
    }

    get dueDate() {
        return this._dueDate;
    }

    set name(name) {
        this._name = name;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }
}