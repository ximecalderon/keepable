const Layout = (function () {
  const template = `
  ${formView}
  <section class="card-section js-cards">
  </section>
  `;

  const listenPalette = () => {
    const form = document.querySelector("#form");
    const paletteOpener = document.querySelector("#formPalette");
    const palette = form.querySelector(".palette__container");
    paletteOpener.addEventListener("click", () =>
      palette.classList.toggle("ds-none")
    );
  };

  const colorSelector = () => {
    const form = document.querySelector("#form");
    const palette = document.querySelector(".palette__container");
    palette.addEventListener("click", function (event) {
      let target = event.target;
      if (target.tagName != 'DIV') return;
      if (form.classList.length != 0) form.classList.remove(`${form.classList[0]}`);
      form.classList.add(`${target.classList[1]}`);
      palette.classList.toggle("ds-none")
    });
  };

  const submitListener = () => {
    const form = document.querySelector("#form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const { title, description } = event.target.elements;
      const newCard = {
        title: title.value,
        description: description.value,
        class: form.classList[0],
        pin: false,
      }

      Store.createCard(newCard);
      cartas = CardsView();
      Cards.load(cartas);
    });
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      listenPalette();
      colorSelector();
      submitListener();
    }
  };
})