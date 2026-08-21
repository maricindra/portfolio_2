document.addEventListener("DOMContentLoaded", async () => {
  const elements = Array.from(document.querySelectorAll(".typing")).map(el => {
    const text = el.textContent.trim();
    el.textContent = "";
    return { el, text };
  });

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  while (true) {
    // Digita todos em sequência
    for (const { el, text } of elements) {
      for (let i = 1; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        await sleep(15); // tempo para digitar cada letra 
      }
    }

    await sleep(2000);

    // Apaga todos em sequência inversa
    for (const { el, text } of [...elements].reverse()) {
      for (let i = text.length; i >= 0; i--) {
        el.textContent = text.slice(0, i);
        await sleep(25);
      }
    }

    await sleep(500);
  }
});