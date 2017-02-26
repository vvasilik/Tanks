export default function isEmptyCell(App, x, y, index = false) {
    let res = {
        x: x,
        y: y,
        category: "",
        item: "",
        isEmpty: true
    };

    App.tanks.map((tank) => {
        if (tank.x === x && tank.y === y && tank.avatar.dataset.index !== index) {
            res.category = "tanks";
            res.item = tank;
            res.isEmpty = false;
            return res;
        }
    });

    App.bullets.map((bullet) => {
        if (bullet.x === x && bullet.y === y && bullet.avatar.dataset.index !== index) {
            res.category = "bullets";
            res.item = bullet;
            res.isEmpty = false;
            return res;
        }
    });

    if (App.mainTank.avatar.x === x && App.mainTank.avatar.y === y) {
        res.category = "mainTank";
            res.item = App.mainTank;
            res.isEmpty = false;
            return res;
    }

    return res;
}