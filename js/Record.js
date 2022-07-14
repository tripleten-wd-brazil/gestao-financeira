export default class Record {
  constructor({ date, description, value }) {
    this.date = date;
    this.description = description;
    this.value = parseFloat(value).toFixed(2);
  }
}
