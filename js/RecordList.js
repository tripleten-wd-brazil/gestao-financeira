import Record from "./Record.js";
import Alert from "./Alert.js";

export default class RecordList {
  constructor() {
    this._tbody = document.querySelector("#tbody");
    this._addListener();
  }

  add(record) {
    this._addRow(record);
    this._addToLocalStorage(record);
  }

  _addRow(record) {
    this._tbody.append(record.element);
    this._sumUp();
  }

  _getPersistedRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
  }

  _persist(records) {
    localStorage.setItem("records", JSON.stringify(records));
  }

  _addToLocalStorage(record) {
    const records = this._getPersistedRecords();
    records.push(record);
    this._persist(records);
  }

  _sumUp() {
    const tdsValor = document.querySelectorAll(".valor");
    const total = Array.from(tdsValor).reduce(
      (acc, tdValor) => (acc += parseFloat(tdValor.textContent)),
      0
    );

    const totalTd = document.querySelector("#total");
    totalTd.textContent = total.toFixed(2);
  }

  loadData() {
    const records = this._getPersistedRecords();
    records.forEach((recordData) => {
      const record = new Record(recordData);
      this._addRow(record);
    });
    this._sumUp();
  }

  _getRecordIndex(evt) {
    const elementOf = evt.target.closest("tr");
    const arrayElements = Array.from(elementOf.parentElement.children);
    return arrayElements.indexOf(elementOf);
  }

  _delete(event) {
    if (event.target.classList.contains("btn-delete")) {
      const index = this._getRecordIndex(event);
      event.target.parentNode.parentNode.remove();
      const records = this._getPersistedRecords();
      records.splice(index, 1);
      this._persist(records);
      this._sumUp();
      Alert.show("Seu registro foi removido com sucesso", "danger");
    }
  }

  _addListener() {
    this._tbody.addEventListener("click", this._delete.bind(this));
  }
}
