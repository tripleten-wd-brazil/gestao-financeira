import Record from "./Record.js";
import Alert from "./Alert.js";

export default class FormRecord {
  constructor(recordList) {
    this._recordList = recordList;
    this._form = document.forms.lancamentos;
    this._dateInput = document.querySelector("#data");
    this._descriptionInput = document.querySelector("#descricao");
    this._valueInput = document.querySelector("#valor");
    this._addListener();
  }

  _isValid() {
    const isValidData = this._validateInput("data");
    const isValidDescricao = this._validateInput(
      "descricao",
      "Descrição obrigatória"
    );
    const isValidValor = this._validateInput("valor");

    return isValidData && isValidDescricao && isValidValor;
  }

  _validateInput(inputName, errorMessage = "Campo Obrigatório") {
    const input = document.querySelector(`#${inputName}`);
    const divError = document.querySelector(`.form__error_${inputName}`);
    const isValid = input.checkValidity();
    divError.textContent = isValid ? "" : errorMessage;
    return isValid;
  }

  _getRecord() {
    return new Record({
      date: this._dateInput.value,
      description: this._descriptionInput.value,
      value: this._valueInput.value,
    });
  }

  _reset() {
    this._form.reset();
    this._dateInput.focus();
  }

  _save(event) {
    event.preventDefault();
    if (!this._isValid()) return;

    const record = this._getRecord();
    this._recordList.add(record);
    this._reset();
    Alert.show("Seu registro foi inserido com sucesso");
  }

  _addListener() {
    this._form.addEventListener("submit", (event) => this._save(event));
  }
}
