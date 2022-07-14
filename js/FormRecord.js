import Record from "./Record.js";

export default class FormRecord {
  constructor() {
    this._form = document.forms.lancamentos;
    this._dateInput = document.querySelector("#data");
    this._descriptionInput = document.querySelector("#descricao");
    this._valueInput = document.querySelector("#valor");
  }

  isValid() {
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

  getRecord() {
    return new Record({
      date: this._dateInput.value,
      description: this._descriptionInput.value,
      value: this._valueInput.value,
    });
  }

  reset() {
    this._form.reset();
    this._dateInput.focus();
  }
}
