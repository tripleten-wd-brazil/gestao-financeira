const botao = document.querySelector("#submit");
botao.addEventListener("click", function (e) {
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
    <td>${valor}</td>
  </tr>`;

  dataInput.value = "";
  descricaoInput.value = "";
  valorInput.value = "";

  dataInput.focus();
});
