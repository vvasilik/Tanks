require("../css/style.css");

import {initMap} from "./map"

init();

function init() {
    window.App = {};
    App.tanks = [];
    App.bullets = [];
    App.bulletsIndex = 0;

    App.const = {};
    App.const.left = "_left";
    App.const.top = "_top";
    App.const.right = "_right";
    App.const.bottom = "_bottom";

    const body = document.body;
    const point = 50;
    const interval = 100;
    const intervalBulletsCreation = 300;
    const createTankInterval = 3000;
    const bodyWidth = Math.floor(body.offsetWidth);
    const bodyHeight = Math.floor(body.offsetHeight);
    const mapWidth = (bodyWidth - bodyWidth % point) / point;
    const mapHeight = (bodyHeight - bodyHeight % point) / point;
    const main = document.querySelector(".js-main");
    const minX = 0;
    const minY = 0;
    const maxX = mapWidth - 1;
    const maxY = mapHeight - 1;

    let score = 0;

    initMap({
        width: point * mapWidth,
        height: point * mapHeight,
        holder: main
    });

    createMainTank(minX, minY, App.const.right);

    setInterval(
        moveBullets,
        interval
    );

    setInterval(
        () => {
            let {x, y} = getRandomCell();
            createTank(x, y, App.const.right)
        },
        createTankInterval
    );

// ----------

    function createTank(x, y, direction) {
        App.tanks.push(new Tank(x, y, direction));
    }

    function createMainTank(x, y, direction) {
        App.mainTank = new MainTank(x, y, direction);
    }

    function createBullet(x, y, direction) {
        let cellInfo = isEmptyCell(x, y);

        if (cellInfo.isEmpty) {
            App.bullets.push(new Bullet(x, y, direction));
        }
    }

    function getRandomCell() {
        let x;
        let y;

        while (true) {
            x = Math.floor(Math.random() * (maxX - minX)) + minX;
            y = Math.floor(Math.random() * (maxY - minY)) + minY;

            let cellInfo = isEmptyCell(x, y);

            if (cellInfo.isEmpty) break;
        }

        return {x, y}
    }

    function isEmptyCell(x, y, index) {
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

    function Tank(x, y, direction = App.const.top) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        let avatar = document.createElement("div");
        avatar.className = `computer-tank ${direction}`;
        avatar.style.left = `${x * point}px`;
        avatar.style.top = `${y * point}px`;
        avatar.style.width = `${point}px`;
        avatar.style.height = `${point}px`;
        main.appendChild(avatar);

        this.avatar = avatar;
    }

    function MainTank(x, y, direction = App.const.top) {
        let isPressedSpace = false;
        let timer;

        this.x = x;
        this.y = y;
        this.direction = direction;

        let avatar = document.createElement("div");
        avatar.className = `main-tank ${direction}`;
        avatar.style.left = `${x * point}px`;
        avatar.style.top = `${y * point}px`;
        avatar.style.width = `${point}px`;
        avatar.style.height = `${point}px`;
        main.appendChild(avatar);

        this.avatar = avatar;

        body.addEventListener("keydown", (e) => {


                const code = e.keyCode;

                switch (code) {
                    case 40:
                        this.direction = App.const.bottom;
                        break;

                    case 38:
                        this.direction = App.const.top;
                        break;

                    case 39:
                        this.direction = App.const.right;
                        break;

                    case 37:
                        this.direction = App.const.left;
                        break;

                    case 32:
                        if (!isPressedSpace) {
                            isPressedSpace = true;

                            setTimeout(() => {
                                isPressedSpace = false;
                            }, intervalBulletsCreation);

                            createBullet(this.x, this.y, this.direction);
                        }
                        return;
                }

                moveMainTank(this);
        });
    }

    function Bullet(x, y, direction = App.const.top) {

        switch (direction) {
            case App.const.bottom:
                y = y + 1;
                break;

            case App.const.top:
                y = y - 1;
                break;

            case App.const.right:
                x = x + 1;
                break;

            case App.const.left:
                x = x - 1;
                break;
        }

        this.x = x;
        this.y = y;
        this.direction = direction;

        let avatar = document.createElement("div");
        avatar.className = `bullet ${direction}`;
        avatar.dataset.index = ++App.bulletsIndex;
        avatar.style.left = `${x * point}px`;
        avatar.style.top = `${y * point}px`;
        avatar.style.width = `${point}px`;
        avatar.style.height = `${point}px`;
        main.appendChild(avatar);

        this.avatar = avatar;
    }

    function moveMainTank(item) {
        switch (item.direction) {
            case App.const.bottom:
                if (item.y + 1 < mapHeight) item.y += 1;
                break;

            case App.const.top:
                if (item.y - 1 >= 0) item.y -= 1;
                break;

            case App.const.right:
                if (item.x + 1 < mapWidth) item.x += 1;
                break;

            case App.const.left:
                if (item.x - 1 >= 0) item.x -= 1;
                break;

            default: console.log("move tank error");
        }

        item.avatar.style.left = `${item.x * point}px`;
        item.avatar.style.top = `${item.y * point}px`;
        item.avatar.classList.remove("_left", "_top", "_right", "_bottom");
        item.avatar.classList.add(item.direction);
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
                if (bullet.y + 1 < mapHeight) {
                    bullet.y += 1;
                } else {
                    removeBullet(bullet);
                    return;
                }
                break;

            case App.const.top:
                if (bullet.y - 1 >= 0) {
                    bullet.y -= 1;
                } else {
                    removeBullet(bullet);
                    return;
                }
                break;

            case App.const.right:
                if (bullet.x + 1 < mapWidth) {
                    bullet.x += 1;
                } else {
                    removeBullet(bullet);
                    return;
                }
                break;

            case App.const.left:
                if (bullet.x - 1 >= 0) {
                    bullet.x -= 1;
                } else {
                    removeBullet(bullet);
                    return;
                }
                break;

            default: console.log("move bullet error");
        }

        cellInfo = isEmptyCell(bullet.x, bullet.y, bullet.avatar.dataset.index);

        if (!cellInfo.isEmpty) {
            App[cellInfo.category].map((item, index) => {
                if (item.avatar === cellInfo.item.avatar) {
                    if (cellInfo.category === "tanks") changeScore();

                    App[cellInfo.category].splice(index, 1);
                    item.avatar.parentNode.removeChild(item.avatar);
                }
            });

            setTimeout(() => {
                removeBullet(bullet);
            }, interval)
        }

        requestAnimationFrame(() => {
            bullet.avatar.style.left = `${bullet.x * point}px`;
            bullet.avatar.style.top = `${bullet.y * point}px`;
        });
    }

    function removeBullet(bullet) {
        App.bullets.map((item, index) => {
            if (item.avatar.dataset.index === bullet.avatar.dataset.index) {
                App.bullets.splice(index, 1);
                item.avatar.classList.add("_explosion");
                setTimeout(() => {
                    item.avatar.parentNode.removeChild(item.avatar);
                }, 300);
            }
        })
    }

    function changeScore() {
        score++;
        console.log(score);
    }
}