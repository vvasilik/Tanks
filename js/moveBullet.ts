import removeBullet from "./removeBullet"
import removeItem from "./removeItem"
import isEmptyCell from "./helpers/isEmptyCell"

export default function moveBullet(App, bullet) {
    if (bullet.avatar.classList.contains("_explosion")) return false;

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

        removeItem(App, cellInfo);

        //TODO remove bullet some time later
        // setTimeout(() => {
            removeBullet(App, bullet);
        // }, App.variables.interval)
    } else {
        requestAnimationFrame(() => {
            bullet.avatar.style.left = `${bullet.x * App.variables.point}px`;
            bullet.avatar.style.top = `${bullet.y * App.variables.point}px`;
        });
    }
}