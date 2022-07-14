import FormRecord from "./FormRecord.js";
import RecordList from "./RecordList.js";
import Alert from "./Alert.js";

function addListeners() {
  const tbody = document.querySelector("#tbody");
  tbody.addEventListener("click", deleteRow);
  const { lancamentos } = document.forms;
  lancamentos.addEventListener("submit", save);
}

const recordList = new RecordList();
const formRecord = new FormRecord();
recordList.loadData();

function save(e) {
  e.preventDefault();
  if (!formRecord.isValid()) {
    return; // early return
  }
  const record = formRecord.getRecord();
  recordList.add(record);
  formRecord.reset();
  Alert.show("Seu registro foi inserido com sucesso");
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
    Alert.show("Seu registro foi removido com sucesso", "danger");
  }
};

function getIndexOfElementEvent(evt) {
  const elementOf = evt.target.closest("tr");
  const arrayElements = Array.from(elementOf.parentElement.children);
  return arrayElements.indexOf(elementOf);
}

addListeners();
