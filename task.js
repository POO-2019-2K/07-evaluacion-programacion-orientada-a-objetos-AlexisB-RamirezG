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

    get daysLeft() {
        return this._daysLeft;
    }

    set name(name) {
        this._name = name;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    set daysLeft(daysLeft) {
        this._daysLeft = daysLeft;
    }

    getStringDueDate() {
        let date =
            this._dueDate.getDate() +
            "/" +
            this._dueDate.getMonth() +
            "/" +
            this._dueDate.getFullYear();

        return date;
    }

    getDaysLeft() {
        let day = 24 * 60 * 60 * 1000;
        let differenceMs = this._dueDate - new Date();
        let daysLeft = Math.trunc(differenceMs / day);
        if ((differenceMs / day) < 0 && (differenceMs / day) > -1) {
            return 0;
        }
        daysLeft++;

        return daysLeft;
    }

    getDueDateForDate() {
        let date = this._dueDate.getFullYear() + "-" + this._get2NumberDigit(this._dueDate.getMonth()) + "-" + this._get2NumberDigit(this._dueDate.getDate());
    
        return date;
    }

    _get2NumberDigit(number) {
        if (number < 10) {
            return "0" + number;
        }

        return number;
    }
}