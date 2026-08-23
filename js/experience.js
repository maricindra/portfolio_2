document.addEventListener("DOMContentLoaded", function () {
  const sideSlider = document.querySelector(".s-side-slider");
  if (!sideSlider) return;

  // Função para tentar capturar a instância do Swiper até estar pronta
  function initCustomSlider() {
    const swiperInstance = sideSlider.querySelector(".swiper-container")?.swiper 
                        || sideSlider.querySelector(".swiper")?.swiper;

    if (!swiperInstance) {
      setTimeout(initCustomSlider, 50); // Tenta novamente em 50ms
      return;
    }

    const barContainer = document.querySelector(".s-bar");
    const changingWidgets = document.querySelectorAll(".s-changing-widget");
    const totalSlides = swiperInstance.slides.length;

    // Renderiza as "bolinhas" da navegação
    if (barContainer) {
      barContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("s-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => swiperInstance.slideToLoop(i)); // slideToLoop para lidar com modo loop
        barContainer.appendChild(dot);
      }
    }

    const dots = barContainer ? barContainer.querySelectorAll(".s-dot") : [];

    function updateActiveSlide(index) {
      // Sincroniza widgets de texto/título/botão
      changingWidgets.forEach((widget) => {
        const children = Array.from(widget.children);
        children.forEach((child, i) => {
          child.classList.toggle("active", i === index);
        });
      });

      // Atualiza os pontos de navegação
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    // Evento de troca de slide
    swiperInstance.on("slideChange", function () {
      const activeIndex = swiperInstance.realIndex; // realIndex para carrossel com loop
      updateActiveSlide(activeIndex);
    });

    // Inicializa o primeiro slide
    updateActiveSlide(swiperInstance.realIndex || 0);
  }

  initCustomSlider();
});