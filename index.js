function addListeners() {
  const tbody = document.querySelector("#tbody");
  tbody.addEventListener("click", deleteRow);
  const { lancamentos } = document.forms;
  lancamentos.addEventListener("submit", save);
}

function save(e) {
  e.preventDefault();
  const { data, descricao, valor, dataInput } = getValuesFromForm();

  const tbody = document.querySelector("#tbody");
  const row = document.querySelector("#template-row").content.cloneNode(true);
  const dataCell = row.querySelector(".data");
  const descricaoCell = row.querySelector(".descricao");
  const valorCell = row.querySelector(".valor");
  dataCell.textContent = data;
  descricaoCell.textContent = descricao;
  valorCell.textContent = parseFloat(valor).toFixed(2);
  tbody.append(row);
  document.forms.lancamentos.reset();
  atualizaTotal();
  dataInput.focus();
  showAlert("Seu registro foi inserido com sucesso");
}

function getValuesFromForm() {
  const dataInput = document.querySelector("#data");
  const descricaoInput = document.querySelector("#descricao");
  const valorInput = document.querySelector("#valor");

  const data = dataInput.value;
  const descricao = descricaoInput.value;
  const valor = valorInput.value;

  return { data, descricao, valor, dataInput };
}

function atualizaTotal() {
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
    event.target.parentNode.parentNode.remove();
    atualizaTotal();
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

addListeners();
