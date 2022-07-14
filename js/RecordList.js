import Record from "./Record.js";

export default class RecordList {
  add(record) {
    this._addRow(record);
    this._persist(record);
  }

  _addRow(record) {
    const tbody = document.querySelector("#tbody");
    const row = document.querySelector("#template-row").content.cloneNode(true);
    const dataCell = row.querySelector(".data");
    const descricaoCell = row.querySelector(".descricao");
    const valorCell = row.querySelector(".valor");
    dataCell.textContent = record.date;
    descricaoCell.textContent = record.description;
    valorCell.textContent = record.value;
    tbody.append(row);
    this._sumUp();
  }

  _getPersistedRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
  }

  _persist(record) {
    const records = this._getPersistedRecords();
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));
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
}
