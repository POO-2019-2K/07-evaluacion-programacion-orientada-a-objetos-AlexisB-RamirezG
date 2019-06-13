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
        let editButton = document.createElement("i"),
            divEdit = document.createElement("div");

        divEdit.id = "divEdit";
        divEdit.className = "float-left"
        editButton.classList = "fas fa-pencil-alt";

        divEdit.appendChild(editButton);
        cell.appendChild(divEdit);

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
        let dueDate = task.getDueDateForDate();
        inputDueDate.value = dueDate;

        row.cells[1].innerHTML = "";
        row.cells[1].appendChild(inputDueDate);

        let btnSave = document.createElement("input");
        btnSave.type = "button";
        btnSave.value = "Grabar";
        btnSave.className = "btn btn-success";
        btnSave.addEventListener("click", () => {
            let newEmployee = {
                name: iName.value,
                email: iEmail.value,
                birthday: iDate.value
            };

            this._saveEdit(row, employee, newEmployee);
        });

        let btnCancel = document.createElement("input");
        btnCancel.type = "button";
        btnCancel.value = "Cancelar";
        btnCancel.className = "btn btn-danger";
        btnCancel.addEventListener("click", () => {
            this._cancelEdit(row, employee);
        });

        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnSave);

        row.cells[5].innerHTML = "";
        row.cells[5].appendChild(btnCancel);
    }

    _giveAtribbutesDelete(task, cell) {
        let deleteButton = document.createElement("i"),
            divDelete = document.createElement("div");

        divDelete.id = "divDelete";
        divDelete.classList = "float-right";
        deleteButton.classList = "fas fa-backspace";

        divDelete.appendChild(deleteButton);
        cell.appendChild(divDelete);

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