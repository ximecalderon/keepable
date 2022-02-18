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



const Store = (function () {
  const initialCards = [
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


function cardsView() {
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

  const template = `
    ${Store.cards.map(renderCard).join("")}
  `;

  return {
    toString() {
      return template
    },
    // addListeners(){ 
    // }
  }
}



const Module = (function() {
  const template = ``;

  return {
    toString() {
      return template
    },
    addListeners(){}
  }
})

const formView = (function() {
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
    //  addListeners(){}
  }
})();


const Layout = (function() {
  const template = `
  ${formView}
  <section class="card-container">
  
  </section>
  `;

  return {
    toString() {
      return template
    },
    // addListeners(){
    // }
  };
})


let App = DOMHandler("#main");
mainView = Layout();
App.load(mainView);

let Cards = DOMHandler(".card-container");
const cartas = cardsView();
Cards.load(cartas);


