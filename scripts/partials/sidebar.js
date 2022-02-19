function sidebarRender() {
  const renderSidebar = () => {
    return `
    <a href="index.html" class="aside-link" id="notesAnchor">
      <img src="assets/icons/notes.svg" class="notes-icon" />
      <p class="aside-title">Notes</p>
    </a>
    <a href="#" class="aside-link" id="trashAnchor">
      <img src="assets/icons/trash.svg" class="trash-icon" />
      <p class="aside-title">Trash</p>
    </a>
    `
  };

  const listenSidebar = () => {
    const trashAnchor = document.querySelector("#trashAnchor");
    const mainSection = document.querySelector("#main");
    trashAnchor.addEventListener("click", () => {
      mainSection.innerHTML = "";
      let ContentTrash = DOMHandler("#main");
      let trashVi = trashView();
      ContentTrash.load(trashVi);
    });
  };

  return {
    toString() {
      return renderSidebar()
    },
    addListeners() {
      listenSidebar();
    }
  }
};


