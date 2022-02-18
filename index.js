function DOMHandler(parentSelector) {
  let parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent not found");

  return {
    load(module) {
      parent.innerHTML = module;
      module.addListeners();
    },
  };
};

// Store

const Store = (function () {
  let initialCards = [
    {
      title: "Note 1",
      description: "Desc 1",
      class: "pink-100-bg",
    },
    {
      title: "Note 2",
      description: "Desc 2",
      class: "blue-200-bg",
    },
  ];

  let trashCards = [
    {
      title: "Note 3",
      description: "Desc 1",
      class: "pink-100-bg",
    }
  ];

  return {
    cards: JSON.parse(localStorage.getItem("cards")) || initialCards,
    trashCards: JSON.parse(localStorage.getItem("trashCards")) || trashCards,
    createCard(card) {
      this.cards.push(card);
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
    trashCard(id) {
      const card = this.cards.find((card) => card.id == id);
      this.cards.splice(this.cards.indexOf(card), 1);
      this.trashCards.push(card);
      localStorage.setItem("cards", JSON.stringify(this.cards));
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    restoreCard(trashCard) {
      const index = this.trashCards.indexOf(trashCard);
      this.trashCards.splice(index, 1);
      this.cards.push(card);
      localStorage.setItem("cards", JSON.stringify(this.cards));
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    deleteCard(trashCard) {
      const index = this.cards.indexOf(trashCard);
      this.trashCards.splice(index, 1);
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
  };
})();

// Cards/Notes view

const CardsView = (function cardsView() {
  const renderCard = (card) => {
    return `
    <div class="card__content ${card.class}">
      <div class="card__text">
        <p class="heading">${card.title}</p>
        <p>${card.description}</p>
      </div>

      <div class="card__icon">
        <div class="card__icon--custom">
          <a href="#" class="to-white"
            ><img
              src="assets/icons/palette.svg"
              alt="icon-color"
              class="center"
          /></a>
        </div>
        <div class="card__icon--custom js-delete">
          <a href="#" class="to-white"
            ><img src="assets/icons/trash_gray.svg" alt="icon-trash"
          /></a>
        </div>
      </div>
    </div>
    `;
  }

  const template = `
    ${Store.cards.map(renderCard).join("")}
  `;

  const listenTrash = () => {
    const trashNotesList = document.querySelector(".js-cards");

    trashNotesList.addEventListener("click", (event) => {
      event.preventDefault();
      // if (!event.target.classList.contains("js-delete")) return;

      const id = event.target.dataset.id;
      Store.trashCard(id);
      Cards.load(CardsView)
    });
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      listenTrash();
    }
  }
})();



const Module = (function () {
  const template = ``;

  return {
    toString() {
      return template
    },
    addListeners() { }
  }
})

const formView = (function () {
  const template = `
  <form action="" class="#">
          <div class="input__container padding">
            <div class="full-width">
              <input
                type="text"
                placeholder="Title"
                class="input__content heading"
              />
              <input
                type="text"
                placeholder="Take a note..."
                class="input__content"
              />
            </div>
            <div class="card__footer full-width">
              <div class="card__icon--custom">
                <div class="palette__container ds-none">
                <div class="palette__color white-bg gray-border"></div>
                <div class="palette__color red-100-bg"></div>
                <div class="palette__color yellow-200-bg"></div>
                <div class="palette__color yellow-100-bg"></div>
                <div class="palette__color green-100-bg"></div>
                <div class="palette__color cyan-100-bg"></div>
                <div class="palette__color blue-100-bg"></div>
                <div class="palette__color blue-200-bg"></div>
                <div class="palette__color purple-200-bg"></div>
                <div class="palette__color pink-100-bg"></div>
              </div>
                <a href="#" class="to-white"
                  ><img
                    src="/assets/icons/palette.svg"
                    alt="icon-color"
                    class="center"
                /></a>
              </div>
              <!-- <div> -->
              <button type="submit" class="button__custom">Keep it!</button>
              <!-- </div> -->
            </div>
          </div>
        </form>
  `;



  return {
    toString() {
      return template
    },
    addListeners() {
    }
  }
})();


const Layout = (function () {
  const template = `
  ${formView}
  <section class="card-container js-cards">
  </section>
  `;

  const listenPalette = () => {
    const paletteOpener = document.querySelector(".to-white");
    const palette = document.querySelector(".palette__container");
    paletteOpener.addEventListener("click", () =>
      palette.classList.toggle("ds-none")
    );
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      listenPalette();
    }
  };
})


let App = DOMHandler("#main");
mainView = Layout();
App.load(mainView);

let Cards = DOMHandler(".card-container");
Cards.load(CardsView);


