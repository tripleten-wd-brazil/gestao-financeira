const botao = document.querySelector("#submit");
let minhaVar;

function salvar(e) {
  e.preventDefault();
  // destructuring
  const { data, descricao, valor, dataInput } = pegaValoresForm();

  const tbody = document.querySelector("#tbody");
  tbody.innerHTML += `<tr>
    <td>${data}</td>
    <td>${descricao}</td>
    <td class="valor">${valor}</td>
    <td><button class="btn-delete">Deletar</button></td>
  </tr>`;

  // dataInput.value = "";
  // descricaoInput.value = "";
  // valorInput.value = "";

  const buttonsDelete = document.querySelectorAll(".btn-delete");
  buttonsDelete.forEach(adicionaEventoDeletar);

  atualizaTotal();

  // dataInput.focus();
}

function pegaValoresForm() {
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
  totalTd.textContent = total;
}

const adicionaEventoDeletar = (button) => {
  button.addEventListener("click", (event) => {
    event.target.parentNode.parentNode.remove();
    atualizaTotal();
  });
};

botao.addEventListener("click", salvar);
