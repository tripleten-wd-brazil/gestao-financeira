import Record from "./Record.js";
import Alert from "./Alert.js";

export default class RecordList {
  constructor(api) {
    this._tbody = document.querySelector("#tbody");
    this._addListener();
    this._api = api;
  }

  add(record) {
    this._persist(record).then((persistedRecord) => {
      record.setId(persistedRecord._id);
      this._addRow(record);
    });
  }

  _addRow(record) {
    this._tbody.append(record.element);
    this._sumUp();
  }

  _getPersistedRecords() {
    return this._api.getAll();
  }

  _persist(record) {
    return this._api.save(record);
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

  async loadData() {
    this._getPersistedRecords().then((records) => {
      records.forEach((recordData) => {
        const record = new Record(recordData);
        this._addRow(record);
      });
      this._sumUp();
    });
  }

  _getRecordIndex(evt) {
    const row = evt.target.closest("tr");
    const idCell = row.querySelector(".id");
    return idCell.textContent;
  }

  _delete(event) {
    if (event.target.classList.contains("btn-delete")) {
      const id = this._getRecordIndex(event);
      this._api.remove(id).then(() => {
        event.target.parentNode.parentNode.remove();
        this._sumUp();
        Alert.show("Seu registro foi removido com sucesso", "danger");
      });
    }
  }

  _addListener() {
    this._tbody.addEventListener("click", this._delete.bind(this));
  }
}
