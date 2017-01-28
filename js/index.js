require("../css/style.css");

import App from "./app"
import initMap from "./map"
import MainTank from "./mainTank"
import Tank from "./tank"
import removeBullet from "./removeBullet"
import {getRandomCell, isEmptyCell, isMobile} from "./helpers/indexHelpers"
import showScore from "./score"

init();

function init() {
    let score = 0;
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
            moveBullet(bullet);
        })
    }

    function moveBullet(bullet) {
        let {x, y} = bullet;
        let cellInfo;

        switch (bullet.direction) {
            case App.const.bottom:
                if (bullet.y + 1 < App.variables.mapHeight) {
                    bullet.y += 1;
                } else {
                    removeBullet(App, bullet);
                    return;
                }
                break;

            case App.const.top:
                if (bullet.y - 1 >= 0) {
                    bullet.y -= 1;
                } else {
                    removeBullet(App, bullet);
                    return;
                }
                break;

            case App.const.right:
                if (bullet.x + 1 < App.variables.mapWidth) {
                    bullet.x += 1;
                } else {
                    removeBullet(App, bullet);
                    return;
                }
                break;

            case App.const.left:
                if (bullet.x - 1 >= 0) {
                    bullet.x -= 1;
                } else {
                    removeBullet(App, bullet);
                    return;
                }
                break;

            default: console.log("move bullet error");
        }

        cellInfo = isEmptyCell(App, bullet.x, bullet.y, bullet.avatar.dataset.index);

        if (!cellInfo.isEmpty) {
            App[cellInfo.category].map((item, index) => {
                if (item.avatar === cellInfo.item.avatar) {
                    if (cellInfo.category === "tanks") changeScore();

                    App[cellInfo.category].splice(index, 1);
                    item.avatar.parentNode.removeChild(item.avatar);
                }
            });

            setTimeout(() => {
                removeBullet(App, bullet);
            }, App.variables.interval)
        }

        requestAnimationFrame(() => {
            bullet.avatar.style.left = `${bullet.x * App.variables.point}px`;
            bullet.avatar.style.top = `${bullet.y * App.variables.point}px`;
        });
    }

    function changeScore() {
        score++;
        showScore(score);
    }
}