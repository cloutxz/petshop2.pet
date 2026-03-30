// Script do projeto Fase 2
// Objetivos:
// 1. Atualizar relógio da página (função temporal)
// 2. Atualizar ano automaticamente no rodapé
// 3. Definir data mínima do agendamento
// 4. Validar formulário e montar resumo dinâmico

document.addEventListener("DOMContentLoaded", function () {
  atualizarAno();
  iniciarRelogio();
  configurarDataMinima();
  configurarFormulario();
});

// Atualiza o ano do rodapé
function atualizarAno() {
  const yearElements = document.querySelectorAll("#currentYear");
  const currentYear = new Date().getFullYear();

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });
}

// Exibe data e hora atual na página inicial
function iniciarRelogio() {
  const clock = document.getElementById("clock");

  if (!clock) return;

  function renderClock() {
    const agora = new Date();
    clock.textContent = "Data e hora atuais: " + agora.toLocaleString("pt-BR");
  }

  renderClock();
  setInterval(renderClock, 1000);
}

// Define o dia atual como data mínima para o agendamento
function configurarDataMinima() {
  const campoData = document.getElementById("dataAgendamento");

  if (!campoData) return;

  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  const dd = String(hoje.getDate()).padStart(2, "0");

  campoData.min = `${yyyy}-${mm}-${dd}`;
}

// Validação do formulário e resumo dinâmico
function configurarFormulario() {
  const form = document.getElementById("agendamentoForm");
  const resumo = document.getElementById("resumoAgendamento");

  if (!form || !resumo) return;

  // Atualiza o resumo conforme o usuário preenche o formulário
  form.addEventListener("input", atualizarResumo);
  form.addEventListener("change", atualizarResumo);

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert("Agendamento realizado com sucesso! Este projeto é apenas demonstrativo.");
    }

    form.classList.add("was-validated");
    atualizarResumo();
  });

  function atualizarResumo() {
    const nomeCliente = document.getElementById("nomeCliente")?.value || "-";
    const nomePet = document.getElementById("nomePet")?.value || "-";
    const servico = document.getElementById("servico")?.value || "-";
    const metodo = document.getElementById("metodo")?.value || "-";
    const data = document.getElementById("dataAgendamento")?.value || "-";
    const hora = document.getElementById("horaAgendamento")?.value || "-";

    resumo.innerHTML = `
      <h2 class="h4">Resumo do agendamento</h2>
      <p><strong>Cliente:</strong> ${nomeCliente}</p>
      <p><strong>Pet:</strong> ${nomePet}</p>
      <p><strong>Serviço:</strong> ${servico}</p>
      <p><strong>Forma de atendimento:</strong> ${metodo}</p>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Horário:</strong> ${hora}</p>
    `;
  }
}
