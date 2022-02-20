function EditView(card) {
  const renderForm = () => {
    return `
    <form action="" class=" edit-form ${card.class}" id="form-to-edit">
    <div class="input__container padding">
      <div class="full-width">
        <input
          id="title"
          type="text"
          value="${card.title}"
          placeholder="Title"
          class="input__content heading inherit-bc"
        />
        <input
          id="description"
          type="text"
          value="${card.description}"
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
  <div class="edit-bg">
    <div class="form-container">
      ${renderForm()}
    </div>
  </div>
  `;

  const listenPaletteEditForm = () => {
    const formToEdit = document.querySelector("#form-to-edit");
    const paletteOpener = formToEdit.querySelector("#formPalette");
    const palette = formToEdit.querySelector(".palette__container");
    paletteOpener.addEventListener("click", () =>
      palette.classList.toggle("ds-none")
    );
  };

  const colorSelectorEditForm = () => {
    const formEd = document.querySelector("#form-to-edit");
    const paletteEd = formEd.querySelector(".palette__container");
    paletteEd.addEventListener("click", function (event) {
      let target = event.target;
      if (target.tagName != 'DIV') return;
      if (formEd.classList.length != 0) formEd.classList.remove(`${formEd.classList[0]}`);
      formEd.classList.add(`${target.classList[1]}`);
      paletteEd.classList.toggle("ds-none");
    });
  };

  return {
    toString() {
      return template
    },
    addListeners() {
      // listenPaletteEditForm();
      // colorSelectorEditForm();
    }
  }
}

