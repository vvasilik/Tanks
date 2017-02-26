import App from "./app"
import initAudio from "./audio"
import initMap from "./map"
import MainTank from "./mainTank"
import Tank from "./tank"
import moveBullet from "./moveBullet"
import {getRandomCell, isMobile} from "./helpers/indexHelpers"

init();

function init() {
    initAudio();

    if (isMobile()) App.variables.body.classList.add("_mobile");

    initMap({
        width: App.variables.point * App.variables.mapWidth,
        height: App.variables.point * App.variables.mapHeight,
        holder: App.variables.main
    });

    createMainTank(App.variables.minX, App.variables.minY, App.const.right);

    setInterval(
        moveBullets,
        App.variables.interval
    );

    setInterval(
        () => {
            let {x, y} = getRandomCell(App);
            createTank(x, y, App.const.right)
        },
        App.variables.createTankInterval
    );

// ----------

    function createTank(x, y, direction) {
        App.tanks.push(new Tank(App, x, y, direction));
    }

    function createMainTank(x, y, direction) {
        App.mainTank = new MainTank(App, x, y, direction);
    }

    function moveBullets() {
        App.bullets.map((bullet) => {
            moveBullet(App, bullet);
        })
    }
}