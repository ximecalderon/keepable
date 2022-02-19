// DOM Handler
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
  const idGenerator = (() => {
    let id = 0;

    return {
      next: () => ++id,
    };
  })();

  let initialCards = [
    {
      id: idGenerator.next(),
      title: "Note 1",
      description: "Desc 1",
      class: "pink-100-bg",
    },
    {
      id: idGenerator.next(),
      title: "Note 2",
      description: "Desc 2",
      class: "blue-200-bg",
    },
    {
      id: idGenerator.next(),
      title: "Note 7",
      description: "Desc 7",
      class: "cyan-100-bg",
    },
  ];

  /*********************** */
  const trashCards = [
    {
      id: idGenerator.next(),
      title: "Note 3",
      description: "Desc 3",
      class: "pink-100-bg",
    },
    {
      id: idGenerator.next(),
      title: "Note 4",
      description: "Desc 4",
      class: "blue-200-bg",
    },
  ];
  /*********************** */

  return {
    cards: JSON.parse(localStorage.getItem("cards")) || initialCards,
    trashCards: JSON.parse(localStorage.getItem("trashCards")) || trashCards,
    createCard(card) {
      card.id = idGenerator.next()
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
    restoreCard(id) {
      const trashCard = this.trashCards.find((trashCard) => trashCard.id == id)
      this.trashCards.splice(this.trashCards.indexOf(trashCard), 1);
      this.cards.push(trashCard);

      localStorage.setItem("cards", JSON.stringify(this.cards));
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    deleteCard(id) {
      const index = this.trashCards.findIndex((trashCard) => trashCard.id == id);
      this.trashCards.splice(index, 1);

      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    }
  };
})();

// NotesView
function CardsView() {
  const renderCard = (card) => {
    return `
    <div class="card__content ${card.class}" data-id="${card.id}">
      <div class="card__text">
        <p class="heading">${card.title}</p>
        <p>${card.description}</p>
      </div>
      <div class="card__icon">
        <div class="card__icon--custom">
          <section class="palette__container ds-none card-palette" data-id="${card.id}">
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
          </section>
          <a href="#" class="to-white" id="cardsPalette" data-id="${card.id}"
            ><img
              src="assets/icons/palette.svg"
              alt="icon-color"
              class="center"
              data-id="${card.id}"
          /></a>
        </div>
        <div class="card__icon--custom js-delete" data-id="${card.id}">
          <a href="#" class="to-white" id="superespecial" 
            ><img src="assets/icons/trash_gray.svg" alt="icon-trash" data-id="${card.id}"
          /></a>
        </div>
      </div>
    </div>
    `;
  }

  const template = `
    ${Store.cards.map(renderCard).join("")}
  `;

  const listenPaletteCard = () => {
    const cardContainer = document.querySelector(".card-container");
    const paletteOpenerCards = cardContainer.querySelectorAll("#cardsPalette");
    const allPalettes = document.querySelectorAll(".palette__container");
    paletteOpenerCards.forEach((note) => {
      
      note.addEventListener("click", (event) =>{
        event.preventDefault();
        for(let singlePalette of allPalettes){
          if (!(singlePalette.classList[1] == "ds-none") && !(singlePalette.classList[singlePalette.classList.length-1] == "ds-none")) {
            singlePalette.classList.toggle("ds-none");
          } else {
            continue;
          }
        }

        const id = event.target.dataset.id;
        chosenCard = document.querySelector(`[data-id="${id}"]`);
        const chosenPalette = chosenCard.querySelector(".palette__container");
        chosenPalette.classList.toggle("ds-none");
      });
    }) 
  };

  // const colorSelectorCard = () => {
  //   const form = document.querySelector("#form");
  //   const palette = document.querySelector(".palette__container");
  //   palette.addEventListener("click", function (event) {
  //     let target = event.target;
  //     if (target.tagName != 'DIV') return;
  //     if (form.classList.length != 0) form.classList.remove(`${form.classList[0]}`);
  //     form.classList.add(`${target.classList[1]}`);
  //     palette.classList.toggle("ds-none")
  //   });
  // };

  const listenTrash = () => {
    const trashNotesList = document.querySelectorAll("#superespecial");
    trashNotesList.forEach((Note) => {
      Note.addEventListener("click", (event) => {
        event.preventDefault();
        const id = event.target.dataset.id;
        Store.trashCard(id);
        Cards.load(CardsView());
      });
    })
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      listenPaletteCard();
      listenTrash();
    }
  }
}

/************************************ */
const trashView = function () {
  const renderCard = (card) => {
    return `<div class="card__content ${card.class}">
  <div class="card__text">
    <p class="heading">${card.title}</p>
    <p>${card.description}</p>
  </div>

  <div class="card__icon">
    <div class="card__icon--custom js-trash" data-id="${card.id}">
    <a href="#" class="to-white"
    ><img src="assets/icons/trash_gray.svg" alt="icon-trash"
  /></a>
    </div>
    <div class="card__icon--custom js-restore" data-id="${card.id}">
      <a href="#"><img src="assets/icons/arrow.svg" alt="icon-color" 
      class="center js-delete"></a>
    </div>
  </div>
  </div>`;
  };


  const template = `
    <section class="card-container">
      ${Store.trashCards.map(renderCard).join("")}
    </section>
  `;

  const trashDelete = () => {
    const trashNotesList = document.querySelector(".js-trash");

    trashNotesList.addEventListener("click", (event) => {
      event.preventDefault();

      const id = event.target.dataset.id;
      Store.deleteCard(id);
      mainSection.load(trashView())
    });
  };

  const restore = () => {
    const trashView = document.querySelector(".js-restore");

    trashView.addEventListener("click", (event) => {
      event.preventDefault();

      const id = event.target.dataset.id;
      Store.restoreCard(id);
      mainSection.load(trashView())
    });
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      trashDelete();
      restore();
    },
  };
}


/******************************************* */

// Module for copy/paste

// const Module = (function () {
//   const template = ``;

//   return {
//     toString() {
//       return template
//     },
//     addListeners() { }
//   }
// })

//Create Input
// const createInput = ({ id, placeholder = "",  }) => {
//   return `
//   <input
//     id="${id}"
//     type="text"
//     placeholder="${placeholder}"
//     class="input__content heading inherit-bc"
//   />
//   `;
// };

// New-note-view
const formView = (function () {
  const template = `
  <form action="" class="white-bg" id="form">
          <div class="input__container padding">
            <div class="full-width">
              <input
                id="title"
                type="text"
                placeholder="Title"
                class="input__content heading inherit-bc"
              />
              <input
                id="description"
                type="text"
                placeholder="Take a note..."
                class="input__content inherit-bc"
              />
            </div>
            <div class="card__footer full-width">
              <div class="card__icon--custom">
                <section class="palette__container ds-none">
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
                </section>
              
                <a href="#" class="form-to-white" id="formPalette"
                  ><img
                    src="/assets/icons/palette.svg"
                    alt="icon-color"
                    class="center"
                /></a>
              </div>
              <!-- <div> -->
              <button type="submit" class="button__custom inherit-bc">Keep it!</button>
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

// Layout

const Layout = (function () {
  const template = `
  ${formView}
  <section class="card-container js-cards">
  </section>
  `;

  const listenPalette = () => {
    const paletteOpener = document.querySelector("#formPalette");
    const palette = document.querySelector(".palette__container");
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
        class: form.classList[0]
      }

      Store.createCard(newCard);
      // Cards = DOMHandler(".card-container");
      // mainView = Layout();
      // App.load(mainView);
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

// Index
let App = DOMHandler("#main");
let mainView = Layout();
App.load(mainView);

let Cards = DOMHandler(".card-container");
Cards.load(CardsView());

//let ContentTrash = DOMHandler(".card-container");
//const trashVi = trashView();
//ContentTrash.load(trashVi);
