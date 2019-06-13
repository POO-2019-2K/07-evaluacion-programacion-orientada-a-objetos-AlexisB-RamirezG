import Task from "./task.js";

export default class List {
    constructor(tableAgenda) {
        this._tableAgenda = tableAgenda;
        this._agenda = null;
        this._numberTasks = 0;
    }

    set agenda(agenda) {
        this._agenda = agenda;
    }

    printSaved() {
        this._clearTable();
        this._agenda.tasks.forEach((e, index) => {
            this._addToTable(new Task(e));
        });
    }

    _clearTable() {
        for (let i = 0; i < this._numberTasks; i++) {
            this._tableAgenda.deleteRow(-1);
        }
        this._numberTasks = 0;
    }

    printTask() {
        this._agenda.sortByDaysLeft();
        this.printSaved();
        Swal.fire({
            type: "success",
            title: "Success!",
            text: "The task has been registered!"
        });
    }

    printByDL() {
        this._agenda.sortByDaysLeft();
        this.printSaved();
    }

    printByName() {
        this._agenda.sortByName();
        this.printSaved();
    }

    _addToTable(task) {
        let row = this._tableAgenda.insertRow(-1),
            cell = row.insertCell(0);

        cell.appendChild(document.createTextNode(task.name));
        cell = row.insertCell(1);
        cell.appendChild(document.createTextNode(task.getStringDueDate()));
        cell = row.insertCell(2);
        cell.appendChild(document.createTextNode(task.getDaysLeft()));
        cell = row.insertCell(3);
        this._giveAtribbutesEdit(task, cell, row);
        this._giveAtribbutesDelete(task, cell);

        this._numberTasks++;
    }

    _giveAtribbutesEdit(task, cell, row) {
        let editIcon = document.createElement("i"),
            editButton = document.createElement("div");

        editButton.id = "divEdit";
        editButton.className = "float-left"
        editIcon.classList = "fas fa-pencil-alt";

        editButton.appendChild(editIcon);
        cell.appendChild(editButton);

        editButton.addEventListener("click", () => {
            this._editRow(task, row);
        });
    }

    _editRow(task, row) {
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = task.name;

        row.cells[0].innerHTML = "";
        row.cells[0].appendChild(inputName);

        let inputDueDate = document.createElement("input");
        inputDueDate.type = "date";
        inputDueDate.value = task.getDueDateForDate();

        row.cells[1].innerHTML = "";
        row.cells[1].appendChild(inputDueDate);

        let saveIcon = document.createElement("i"),
            saveButton = document.createElement("div");

        saveButton.id = "divSave";
        saveButton.classList = "float-left";
        saveIcon.classList = "fas fa-save";

        saveButton.appendChild(saveIcon);
        saveButton.addEventListener("click", () => {
            let editedTask = {
                name: inputName.value,
                dueDate: inputDueDate.value
            }

            this._agenda.saveEdit(task, editedTask);
            this._agenda.getTasks();
            this._agenda.sortByDaysLeft();
            this.printSaved();
            Swal.fire({
                type: "success",
                title: "Changes have been changed!",
            });
        });

        let cancelIcon = document.createElement("i"),
            cancelButton = document.createElement("div");

        cancelButton.id = "divCancel";
        cancelButton.classList = "float-right";
        cancelIcon.classList = "fas fa-window-close";

        cancelButton.appendChild(cancelIcon);
        cancelButton.addEventListener("click", () => {
            this.printSaved();
        });

        row.cells[3].innerHTML = "";
        row.cells[3].appendChild(saveButton);
        row.cells[3].appendChild(cancelButton);
    }

    _giveAtribbutesDelete(task, cell) {
        let deleteIcon = document.createElement("i"),
            deleteButton = document.createElement("div");

        deleteButton.id = "divDelete";
        deleteButton.classList = "float-right";
        deleteIcon.classList = "fas fa-backspace";

        deleteButton.appendChild(deleteIcon);
        cell.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            window.Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.value) {
                    this._agenda.deleteTask(task);
                    this.printSaved();
                    window.Swal.fire({
                        type: "success",
                        title: "Task deleted!",
                    });
                }
            });
        });
    }
}