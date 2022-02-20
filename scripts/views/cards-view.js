function CardsView() {
  const renderCard = (card) => {
    return `
    <div class="card__content ${card.class}" data-id="${card.id}">
      <div class="card__text" data-id="${card.id}">
        <p class="heading" data-id="${card.id}">${card.title}</p>
        <p data-id="${card.id}">${card.description}</p>
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

  const hideNotes = () => {
    const cardContainer = document.querySelector(".card-container");
    const cardx = cardContainer.querySelectorAll(".card__content");
    if (cardx.length == 0) {
      cardContainer.classList.add('center-vertically')
      cardContainer.innerHTML = "<h1 class='white'>No notes to keep</h1>"
      h1 = document.querySelector("h1")
      h1.classList.add('heading', 'message')
    }
  }

  const listenPaletteCard = () => {
    const cardContainer = document.querySelector(".card-container");
    const paletteOpenerCards = cardContainer.querySelectorAll("#cardsPalette");
    const allPalettes = document.querySelectorAll(".palette__container");
    paletteOpenerCards.forEach((note) => {

      note.addEventListener("click", (event) => {
        event.preventDefault();
        for (let singlePalette of allPalettes) {
          if (!(singlePalette.classList[1] == "ds-none") && !(singlePalette.classList[singlePalette.classList.length - 1] == "ds-none")) {
            singlePalette.classList.toggle("ds-none");
          } else {
            continue;
          }
        }
        const id = event.target.dataset.id;
        chosenCard = document.querySelector(`[data-id="${id}"]`);
        const chosenPalette = chosenCard.querySelector(".palette__container");
        chosenPalette.classList.toggle("ds-none");
        colorSelectorCard();
      });
    })
  };

  const colorSelectorCard = () => {
    const allPalettes2 = document.querySelectorAll(".palette__container");
    let idCard;
    let paletteOpened;
    for (let singlePalette of allPalettes2) {
      if (!(singlePalette.classList[1] == "ds-none") && !(singlePalette.classList[singlePalette.classList.length - 1] == "ds-none")) {
        idCard = singlePalette.dataset.id;
        paletteOpened = singlePalette;
      } else {
        continue;
      }
    }
    let cardToChC = document.querySelector(`[data-id="${idCard}"]`);

    paletteOpened.addEventListener("click", function (event) {
      let target = event.target;
      if (target.tagName != 'DIV') return;
      cardToChC.classList.remove(`${cardToChC.classList[cardToChC.classList.length - 1]}`)
      cardToChC.classList.add(`${target.classList[target.classList.length - 1]}`);
      Store.changeColor(idCard, target.classList[target.classList.length - 1]);
      paletteOpened.classList.toggle("ds-none");
    });
  };

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

  const listenPaletteEditForm = (cardToEd) => {
    const formToEdit = document.querySelector("#form-to-edit");
    const paletteOpener = formToEdit.querySelector("#formPalette");
    const palette = formToEdit.querySelector(".palette__container");
    paletteOpener.addEventListener("click", () =>
      palette.classList.toggle("ds-none")
    );
  };

  const colorSelectorEditForm = (cardToEd) => {
    const formEd = document.querySelector("#form-to-edit");
    const paletteEd = formEd.querySelector(".palette__container");
    paletteEd.addEventListener("click", function (event) {
      let target = event.target;
      console.log(cardToEd.classList[1]);
      if (target.tagName != 'DIV') return;
      formEd.classList.remove(`${cardToEd.classList[1]}`);
      formEd.classList.add(`${target.classList[1]}`);
      paletteEd.classList.toggle("ds-none");
    });
  };



  let submitListener = (idToEdit, card) => {
    let formEdit = document.querySelector("#form-to-edit");
      formEdit.addEventListener("submit", (event) => {
        event.preventDefault();
        let { title, description } = event.target.elements;
        let editedCard = {
          title: title.value,
          description: description.value,
        };

        console.log(formEdit.classList[0]);
        console.log(formEdit.classList[1]);
        Store.editCard(idToEdit, editedCard, formEdit.classList[1]);
 
        Cards.load(CardsView());
        document.location.reload();
      });
    };

  let listenEdit = () => {
    let cardsContent = document.querySelectorAll(".card__text");
    
    cardsContent.forEach((content) => {
      content.addEventListener("click", (event) => {
        let idCardToEd = event.target.dataset.id;
        let cardToEd = document.querySelector(`[data-id="${idCardToEd}"]`);
        let objCardToEdit = Store.cards.find((card) => card.id ==  idCardToEd);
        EditOverlay.load(EditView(objCardToEdit));

        listenPaletteEditForm(cardToEd);
        colorSelectorEditForm(cardToEd);
        submitListener(idCardToEd, objCardToEdit);
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
      hideNotes();
      listenEdit();

    }
  }
}