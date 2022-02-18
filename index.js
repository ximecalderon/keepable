function DOMHandler(parentSelector) {
  let parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent not found");

  return {
    load(module) {
      parent.innerHTML = module;
      // module.addListeners();
    },
  };
};

let App = DOMHandler(".card-container");

const Store = (function () {
  const initialCards = [
    {
      title: "Note 1",
      description: "Desc 1",
      class: "pink-100-bg",
    },
    {
      category: "Note 2",
      description: "Desc 2",
      class: "blue-200-bg",
    },
  ];

  return {
    cards: JSON.parse(localStorage.getItem("cards")) || initialCards,
    createCard(card) {
      this.cards.push(card);
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
    deleteCard(card) {
      const index = this.cards.indexOf(card);
      this.cards.splice(index, 1);
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
  };
})();


function createCard() {
  const renderCard = (card) => {
    return `<div class="card__content ${card.class}">
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
    <div class="card__icon--custom">
      <a href="#" class="to-white"
        ><img src="assets/icons/trash_gray.svg" alt="icon-trash"
      /></a>
    </div>
  </div>
  </div>`
  }


  const template = `${Store.cards.map(renderCard).join("")}`;

  return {
    toString() {
      return template
    },
    // addListeners(){ 
    // }
  }
}

const Card = createCard();
App.load(Card);

const Module = (function() {
  const template = ``;

  return {
    toString() {
      return template
    },
    addListeners(){}
  }
})