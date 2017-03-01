import isMobile from "./helpers/isMobile";
import {IApp} from "./Interfaces/IApp";

const body = document.body;
const point = 50;
const bodyWidth = Math.floor(body.offsetWidth);
const bodyHeight = isMobile() ? Math.floor(body.offsetHeight) - 60 : Math.floor(body.offsetHeight);
const mapWidth = (bodyWidth - bodyWidth % point) / point;
const mapHeight = (bodyHeight - bodyHeight % point) / point;


let App: IApp = {
    tanks: [],
    bullets: [],
    bulletsIndex: 0,
    mainTank: {
        x: 0,
        y: 0,
        direction: ""
    },

    const: {
        left: "_left",
        top: "_top",
        right: "_right",
        bottom: "_bottom"
    },

    variables: {
        body: body,
        point: 50,
        interval: 100,
        intervalBulletsCreation: 300,
        createTankInterval: 3000,
        main: document.querySelector(".js-main"),
        minX: 0,
        minY: 0,
        bodyWidth: bodyWidth,
        bodyHeight: bodyHeight,
        mapWidth: mapWidth,
        mapHeight: mapHeight,
        maxX: mapWidth - 1,
        maxY: mapHeight - 1
    }
};

export default App;