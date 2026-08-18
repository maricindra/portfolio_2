/* ==========================================================================
   Alternador de Cores do Tema (Skin Switcher)
   ========================================================================== */

// 1. Abrir e Fechar o Painel
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
if (styleSwitcherToggle) {
  styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
  });
}

// Fechar o painel ao rolar a página
window.addEventListener("scroll", () => {
  const switcher = document.querySelector(".style-switcher");
  if (switcher && switcher.classList.contains("open")) {
    switcher.classList.remove("open");
  }
});

// 2. Trocar de Cor
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

// 3. Tema Claro / Escuro (Day / Night)
const dayNight = document.querySelector(".day-night");

if (dayNight) {
  dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
  });

  window.addEventListener("load", () => {
    if (document.body.classList.contains("dark")) {
      dayNight.querySelector("i").classList.add("fa-sun");
    } else {
      dayNight.querySelector("i").classList.add("fa-moon");
    }
  });
}

// 4. Efeito Hover nos Cards
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    // Remove a classe 'active' de todos os cards
    cards.forEach((c) => c.classList.remove('active'));
    
    // Adiciona a classe 'active' apenas no card em que o mouse entrou
    card.classList.add('active');
  });
});