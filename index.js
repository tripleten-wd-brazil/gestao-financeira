function addListeners() {
  const tbody = document.querySelector("#tbody");
  tbody.addEventListener("click", deleteRow);
  const { lancamentos } = document.forms;
  lancamentos.addEventListener("submit", save);
}

function save(e) {
  e.preventDefault();
  const isValid = validateForm();
  if (!isValid) {
    return; // early return
  }
  const { data, descricao, valor, dataInput } = getValuesFromForm();

  addRow(data, descricao, valor);
  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.push({
    data,
    descricao,
    valor,
  });
  localStorage.setItem("records", JSON.stringify(records));

  document.forms.lancamentos.reset();
  sumUp();
  dataInput.focus();
  showAlert("Seu registro foi inserido com sucesso");
}

function addRow(data, descricao, valor) {
  const tbody = document.querySelector("#tbody");
  const row = document.querySelector("#template-row").content.cloneNode(true);
  const dataCell = row.querySelector(".data");
  const descricaoCell = row.querySelector(".descricao");
  const valorCell = row.querySelector(".valor");
  dataCell.textContent = data;
  descricaoCell.textContent = descricao;
  valorCell.textContent = parseFloat(valor).toFixed(2);
  tbody.append(row);
}

function loadData() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.forEach(({ data, descricao, valor }) =>
    addRow(data, descricao, valor)
  );
  sumUp();
}

loadData();

function getValuesFromForm() {
  const dataInput = document.querySelector("#data");
  const descricaoInput = document.querySelector("#descricao");
  const valorInput = document.querySelector("#valor");

  const data = dataInput.value;
  const descricao = descricaoInput.value;
  const valor = valorInput.value;

  return { data, descricao, valor, dataInput };
}

function validateForm() {
  const isValidData = validateInput("data");
  const isValidDescricao = validateInput("descricao", "Descrição obrigatória");
  const isValidValor = validateInput("valor");

  return isValidData && isValidDescricao && isValidValor;
}

function validateInput(inputName, errorMessage = "Campo Obrigatório") {
  const input = document.querySelector(`#${inputName}`);
  const divError = document.querySelector(`.form__error_${inputName}`);
  const isValid = input.checkValidity();
  divError.textContent = isValid ? "" : errorMessage;
  return isValid;
}

function sumUp() {
  const tdsValor = document.querySelectorAll(".valor");
  const total = Array.from(tdsValor).reduce(
    (acc, tdValor) => (acc += parseFloat(tdValor.textContent)),
    0
  );

  const totalTd = document.querySelector("#total");
  totalTd.textContent = total.toFixed(2);
}

const deleteRow = (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const index = getIndexOfElementEvent(event);
    event.target.parentNode.parentNode.remove();
    const records = JSON.parse(localStorage.getItem("records"));
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    sumUp();
    showAlert("Seu registro foi removido com sucesso", "danger");
  }
};

function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", `alert_${type}`);
  alertDiv.textContent = message;
  const alertContainer = document.querySelector(".alert-container");
  alertContainer.append(alertDiv);
  setTimeout(() => {
    alertDiv.remove();
  }, 1000 * 3);
}

function getIndexOfElementEvent(evt) {
  const elementOf = evt.target.closest("tr");
  const arrayElements = Array.from(elementOf.parentElement.children);
  return arrayElements.indexOf(elementOf);
}

addListeners();
