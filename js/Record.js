export default class Record {
  constructor({ date, description, value }) {
    this._date = date;
    this._description = description;
    this._value = parseFloat(value).toFixed(2);
    this.element = this._generateHtmlElement();
  }

  _generateHtmlElement() {
    const row = document.querySelector("#template-row").content.cloneNode(true);
    const dataCell = row.querySelector(".data");
    const descricaoCell = row.querySelector(".descricao");
    const valorCell = row.querySelector(".valor");
    dataCell.textContent = this._date;
    descricaoCell.textContent = this._description;
    valorCell.textContent = this._value;
    return row;
  }

  toJSON() {
    return {
      date: this._date,
      description: this._description,
      value: this._value,
    };
  }
}
