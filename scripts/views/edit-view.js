function EditView() {
  const renderForm = () => {
    return `
    <form action="" class="ds-none white-bg" id="form-to-edit" style="margin: 1000px 0 0 330px;">
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
      <button type="submit" class="button__custom inherit-bc">Keep it!</button>
    </div>
  </div>
</form>
  `
  };

  const template = `
        ${renderForm}
  `;

  let submitListener = (idToEdit) => {
    let formEdit = document.querySelector("#form-to-edit");
      formEdit.addEventListener("submit", (event) => {
        event.preventDefault();
        let { title, description } = event.target.elements;
        let editedCard = {
          title: title.value,
          description: description.value,
          class: formEdit.classList[0],
        };

        console.log(formEdit.classList[0]);
        Store.editCard(idToEdit, editedCard);
 
        // Sidebar.load(sidebarRender());
        Cards.load(CardsView());

        formEdit.classList.toggle("ds-none");
        // cartas = CardsView();
        // let mainView = Layout();
      });
    };

  let listenEdit = () => {
    
    let cardsContent = document.querySelectorAll(".card__text");
    let formEdit = document.querySelector("#form-to-edit");
    console.log("sddassdasdas");
    cardsContent.forEach((content) => {
      content.addEventListener("click", (event) => {
        console.log("sddassdasdas");


        // let App2 = DOMHandler("#body");
        // let formToEditRender = EditView();
        // App2.load(formToEditRender);


        // let idCardToEd = event.target.dataset.id;
        // let cardToEd = document.querySelector(`[data-id="${idCardToEd}"]`);
        // formEdit.classList.remove(`${formEdit.classList[1]}`)
        // formEdit.classList.add(`${cardToEd.classList[1]}`);
        // console.log(cardToEd.classList[1]);
        // formEdit.classList.toggle("ds-none");
        // submitListener(idCardToEd);
      });
    })
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      listenEdit();
    }
  }
}

