const Store = (function () {
  const idGenerator = (() => {
    let id = 0;

    return {
      next: () => ++id,
    };
  })();

  const moveObj = (objID, fromArray, toArray) => {
    const obj = fromArray.find((obj) => obj.id == objID);

    fromArray.splice(fromArray.indexOf(obj), 1);
    toArray.push(obj);
  };

  let initialCards = [
    {
      id: idGenerator.next(),
      title: "Note 1",
      description: "Desc 1",
      class: "pink-100-bg",
      pin: true,
    },
    {
      id: idGenerator.next(),
      title: "Note 2",
      description: "Desc 2",
      class: "blue-200-bg",
      pin: false,
    },
    {
      id: idGenerator.next(),
      title: "Note 7",
      description: "Desc 7",
      class: "cyan-100-bg",
      pin: false,
    },
  ];

  /*********************** */
  let trashCards = [
    {
      id: idGenerator.next(),
      title: "Note 3",
      description: "Desc 3",
      class: "pink-100-bg",
      pin: true,
    },
    {
      id: idGenerator.next(),
      title: "Note 4",
      description: "Desc 4",
      class: "blue-200-bg",
      pin: false,
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
    editCard(id, editedCard, classFF) {
      let card = this.cards.find((card) => card.id == id);
      card.title = editedCard.title;
      card.description = editedCard.description;
      card.class = classFF;

      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
    trashCard(id) {
      moveObj(id, this.cards, this.trashCards);

      localStorage.setItem("cards", JSON.stringify(this.cards));
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    restoreCard(id) {
      moveObj(id, this.trashCards, this.cards);

      localStorage.setItem("cards", JSON.stringify(this.cards));
      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    deleteCard(id) {
      const index = this.trashCards.findIndex((trashCard) => trashCard.id == id);
      this.trashCards.splice(index, 1);

      localStorage.setItem("trashCards", JSON.stringify(this.trashCards));
    },
    changeColor(id, newClass) {
      const card = this.cards.find((card) => card.id == id);
      card.class = newClass;

      localStorage.setItem("cards", JSON.stringify(this.cards));
    },
    togglePin(id) {
      const card = this.cards.find((card) => card.id == id);
      card.pin = !card.pin;

      localStorage.setItem("cards", JSON.stringify(this.cards));
    }
  };
})();