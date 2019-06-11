export default class List {
    constructor(tableAgenda) {
        this._tableAgenda = tableAgenda;
        this._agenda = null;
    }

    set agenda(agenda) {
        this._agenda = agenda;
    } 

    addToList(task) {
        this._addToTable(task);
    }

    _addToTable(task) {
        let row = this._tableAgenda.insertRow(-1),
            cell = row.insertCell(0),
            deleteButton = document.createElement("input");

        this._deleteButtonAtributes(deleteButton, contact);

        cell.appendChild(document.createTextNode(contact.name));
        cell = row.insertCell(1);
        cell.appendChild(document.createTextNode(contact.stringBD));
        cell = row.insertCell(2);
        cell.appendChild(document.createTextNode(contact.email));
        cell = row.insertCell(3);
        cell.appendChild(document.createTextNode(contact.age));
        cell = row.insertCell(4);
        cell.appendChild(deleteButton);

        this._numberContacts++;
    }
}