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

    _addToTable(task) {
        let row = this._tableAgenda.insertRow(-1),
            cell = row.insertCell(0);

        cell.appendChild(document.createTextNode(task.name));
        cell = row.insertCell(1);
        cell.appendChild(document.createTextNode(task.getStringDueDate()));
        cell = row.insertCell(2);
        cell.appendChild(document.createTextNode(task.getDaysLeft()));
        cell = row.insertCell(3);
        this._giveAtribbutesEdit(task, cell);
        this._giveAtribbutesDelete(task, cell);

        this._numberTasks++;
    }

    _giveAtribbutesEdit(task, cell) {
        let editButton = document.createElement("input");
        cell.appendChild(editButton);

        editButton.type = "button";
        editButton.value = "Edit";
        editButton.className = "btn";
        editButton.id = "btnEdit";
    }
    
    _giveAtribbutesDelete(task, cell) {
        let deleteButton = document.createElement("input");
        cell.appendChild(deleteButton);

        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.className = "btn";
        deleteButton.id = "btnDelete";

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