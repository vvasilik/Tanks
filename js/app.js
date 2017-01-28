import isMobile from "./helpers/isMobile";

let App = {};
App.tanks = [];
App.bullets = [];
App.bulletsIndex = 0;

App.const = {};
App.const.left = "_left";
App.const.top = "_top";
App.const.right = "_right";
App.const.bottom = "_bottom";

App.variables = {};
App.variables.body = document.body;
App.variables.point = 50;
App.variables.interval = 100;
App.variables.intervalBulletsCreation = 300;
App.variables.createTankInterval = 3000;
App.variables.bodyWidth = Math.floor(App.variables.body.offsetWidth);
App.variables.bodyHeight = isMobile() ? Math.floor(App.variables.body.offsetHeight) - 60 : Math.floor(App.variables.body.offsetHeight);
App.variables.mapWidth = (App.variables.bodyWidth - App.variables.bodyWidth % App.variables.point) / App.variables.point;
App.variables.mapHeight = (App.variables.bodyHeight - App.variables.bodyHeight % App.variables.point) / App.variables.point;
App.variables.main = document.querySelector(".js-main");
App.variables.minX = 0;
App.variables.minY = 0;
App.variables.maxX = App.variables.mapWidth - 1;
App.variables.maxY = App.variables.mapHeight - 1;

export default App;