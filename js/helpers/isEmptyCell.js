export default function isEmptyCell(App, x, y, index) {
    let res = {
        x: x,
        y: y,
        isEmpty: true
    };

    App.tanks.map((tank) => {
        if (tank.x === x && tank.y === y && tank.avatar.dataset.index !== index) {
            res = {
                x: x,
                y: y,
                category: "tanks",
                item: tank,
                isEmpty: false
            }
        }
    });

    App.bullets.map((bullet) => {
        if (bullet.x === x && bullet.y === y && bullet.avatar.dataset.index !== index) {
            res = {
                x: x,
                y: y,
                category: "bullets",
                item: bullet,
                isEmpty: false
            }
        }
    });

    if (App.mainTank.avatar.x === x && App.mainTank.avatar.y === y) {
        res = {
            x: x,
            y: y,
            category: "mainTank",
            item: App.mainTank,
            isEmpty: false
        };
    }

    return res;
}