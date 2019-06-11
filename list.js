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

    printTask(task) {
        console.log(task);
        this._addToTable(task);
    }

    _addToTable(task) {
        let row = this._tableAgenda.insertRow(-1),
            cell = row.insertCell(0),
            editButton = document.createElement("input"),
            deleteButton = document.createElement("input");

        this._giveAtribbutesEdit(editButton, task);
        this._giveAtribbutesDelete(deleteButton, task);

        cell.appendChild(document.createTextNode(task.name));
        cell = row.insertCell(1);
        cell.appendChild(document.createTextNode(task.getStringDueDate()));
        cell = row.insertCell(2);
        cell.appendChild(document.createTextNode(task.getDaysLeft()));
        cell = row.insertCell(3);
        cell.appendChild(editButton);
        cell.appendChild(deleteButton);

        this._numberTasks++;
    }

    _giveAtribbutesEdit(editButton, task) {
        editButton.type = "button";
        editButton.value = "Edit";
        editButton.className = "btn";
        editButton.id = "btnEdit";
    }
    
    _giveAtribbutesDelete(deleteButton, task) {
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
                    
                }
            });
        });
    }
}