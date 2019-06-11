import Task from "./task.js";
import Agenda from "./agenda.js";
import List from "./list.js";

class Main {
    constructor() {
        let tableAgenda = document.querySelector("#agenda");
        let list = new List(tableAgenda);
        let agenda = new Agenda(); 

        console.log(agenda.getTasks());
        
        list.agenda = agenda;

        document.querySelector("#btnAdd").addEventListener("click", () => {
            let form = document.querySelector("#form");

            if(form.checkValidity() === true) {
                let name = document.querySelector("#name").value
                let date = document.querySelector("#date").value;
                date = date.split("-");
                let dueDate = new Date(date[0], date[1]-1, date[2]);
                console.log(dueDate);
                let objTask = {
                    name,
                    dueDate
                }

                let found = agenda.findTask(objTask);
                if (found >= 0) {
                    window.Swal.fire({
                        type: "error",
                        title: "Can't add task!",
                        text: "This task has been already registered.",
                    });
                    return;
                }
                
                let task = new Task(objTask),
                sDueDate = task.getStringDueDate(),
                dL = task.getDaysLeft();
                
                let taskToTable = agenda.addTask(objTask, sDueDate, dL);
                list.printTask(taskToTable);
            }

            form.classList.add("was-validated");
        })
    }
}

let main = new Main(); 