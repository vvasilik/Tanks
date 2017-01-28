import isEmptyCell from "./helpers/isEmptyCell"
import Bullet from "./Bullet"

export default function createBullet(App, x, y, direction) {
    let cellInfo = isEmptyCell(App, x, y);

    if (cellInfo.isEmpty) {
        App.bullets.push(new Bullet(App, x, y, direction));
    }
}