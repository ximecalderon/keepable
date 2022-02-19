let App = DOMHandler("#main");
let mainView = Layout();
App.load(mainView);

let Sidebar = DOMHandler(".aside");
Sidebar.load(sidebarRender());

let Cards = DOMHandler(".card-section");
Cards.load(CardsView());
