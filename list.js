export default class List {
    constructor(tableAgenda) {
        this._tableAgenda = tableAgenda;
        this._agenda = null;
    }

    set agenda(agenda) {
        this._agenda = agenda;
    } 
}