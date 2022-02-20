const trashView = function () {
  const renderCard = (card) => {
    return `<div class="card__content ${card.class}">
  <div class="card__text">
    <p class="heading">${card.title}</p>
    <p>${card.description}</p>
  </div>

  <div class="card__icon">
    <div class="card__icon--custom js-trash">
    <a href="#" class="to-white" id="js-trashs"
    ><img src="assets/icons/trash_gray.svg" alt="icon-trash" data-id="${card.id}"
  /></a>
    </div>
    <div class="card__icon--custom" data-id="${card.id}">
      <a href="#" class="js-restore"><img src="assets/icons/arrow.svg" alt="icon-color" 
      class="center" data-id="${card.id}"></a>
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
    const trashNotes = document.querySelectorAll("#js-trashs");
    const containerMessage = document.querySelector(".card-container");

    if (trashNotes.length == 0) {
      containerMessage.classList.add("full-height")
      containerMessage.innerHTML = "<h1 class='content-lg white centered'>No notes in trash</h1>"
    } else {
      containerMessage.classList.remove("full-height")
    }

    trashNotes.forEach((Note) => {
      Note.addEventListener("click", (event) => {
        event.preventDefault();

        const id = event.target.dataset.id;
        console.log(id);
        console.log(event.target);
        console.log(event.target.dataset.id);
        Store.deleteCard(id);
        App.load(trashView());
      });
    })
  };

  const restore = () => {
    const restoreList = document.querySelectorAll(".js-restore");
    restoreList.forEach((Note) => {
      Note.addEventListener("click", (event) => {
        event.preventDefault();

        const id = event.target.dataset.id;
        Store.restoreCard(id);
        App.load(trashView())
      });
    })
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