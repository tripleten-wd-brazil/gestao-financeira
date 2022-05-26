const botao = document.querySelector("#submit");
let minhaVar;

const salvar = function (e) {
  e.preventDefault();
  const dataInput = document.querySelector("#data");
  const descricaoInput = document.querySelector("#descricao");
  const valorInput = document.querySelector("#valor");

  const data = dataInput.value;
  const descricao = descricaoInput.value;
  const valor = valorInput.value;

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
  const buttons = Array.from(buttonsDelete);
  // forEach
  // map
  // filter

  const tdsValor = document.querySelectorAll(".valor");
  let total = 0;
  for (let i = 0; i < tdsValor.length; i++) {
    const valorAtual = tdsValor[i].textContent;
    total += parseFloat(valorAtual);
  }

  const totalTd = document.querySelector("#total");
  totalTd.textContent = total;

  dataInput.focus();
};

botao.addEventListener("click", salvar);
