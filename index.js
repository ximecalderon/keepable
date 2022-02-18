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


function createCard() {
  const template = `<div class="card__content">
  <div class="card__text">
    <p class="heading">This is the title</p>
    <p>This is the body for the note</p>
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
  </div>`;

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
