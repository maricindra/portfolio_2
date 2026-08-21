document.addEventListener("DOMContentLoaded", () => {
  const typingElements = document.querySelectorAll(".typing");
  
  // Guarda os textos originais e limpa os elementos
  const elementsData = Array.from(typingElements).map(el => {
    const text = el.textContent.trim();
    el.textContent = "";
    return { element: el, text: text };
  });

  const typeSpeed = 17;     // Velocidade de digitação (ms = milisegundos | 1000 ms = 1 Segundo)
  const backSpeed = 4;     // Velocidade de apagamento ( em ms)
  const delayAfterType = 30000; // Tempo de espera após digitar tudo ( em ms)
  const delayAfterDelete = 0; // Tempo de espera após apagar tudo (em ms)

  // Função para digitar uma frase
  function typeEffect(dataIndex, charIndex, callback) {
    const { element, text } = elementsData[dataIndex];

    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      setTimeout(() => typeEffect(dataIndex, charIndex + 1, callback), typeSpeed);
    } else {
      callback(); // Concluiu a digitação do elemento atual
    }
  }

  // Função para apagar uma frase
  function eraseEffect(dataIndex, charIndex, callback) {
    const { element } = elementsData[dataIndex];

    if (charIndex > 0) {
      element.textContent = element.textContent.substring(0, charIndex - 1);
      setTimeout(() => eraseEffect(dataIndex, charIndex - 1, callback), backSpeed);
    } else {
      callback(); // Concluiu o apagamento do elemento atual
    }
  }

  // Controla o fluxo de digitar todos os elementos em sequência
  function startTypingSequence(index) {
    if (index < elementsData.length) {
      typeEffect(index, 0, () => {
        startTypingSequence(index + 1);
      });
    } else {
      // Quando todos forem digitados, aguarda e inicia o apagamento do último ao primeiro
      setTimeout(() => startErasingSequence(elementsData.length - 1), delayAfterType);
    }
  }

  // Controla o fluxo de apagar todos os elementos em sequência inversa
  function startErasingSequence(index) {
    if (index >= 0) {
      eraseEffect(index, elementsData[index].text.length, () => {
        startErasingSequence(index - 1);
      });
    } else {
      // Quando tudo for apagado, aguarda e reinicia o loop
      setTimeout(() => startTypingSequence(0), delayAfterDelete);
    }
  }

  // Inicia o loop infinito
  startTypingSequence(0);
});