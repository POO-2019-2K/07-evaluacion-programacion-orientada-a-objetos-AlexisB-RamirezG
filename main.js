import Task from "./task.js";
import Agenda from "./agenda.js";
import List from "./list.js";

class Main {
    constructor() {
        let tableAgenda = document.querySelector("#agenda");
        let list = new List(tableAgenda);
        let agenda = new Agenda(); 

        list.agenda = agenda;

        
    }
}

let main = new Main(); 