import removeBullet from "./removeBullet"
import changeScore from "./changeScore"
import isEmptyCell from "./helpers/isEmptyCell"

export default function moveBullet(App, bullet) {
    let {x, y} = bullet;
    let cellInfo;
    let score = 0;

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
                if (cellInfo.category === "tanks") changeScore(score);

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