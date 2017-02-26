import moveMainTank from "./moveMainTank"
import initControls from "./controls"
import createBullet from "./createBullet"
import isMobile from "./helpers/isMobile"

export default function MainTank(App, x, y, direction = App.const.top) {
    let isPressedSpace = false;

    this.x = x;
    this.y = y;
    this.direction = direction;

    let avatar = document.createElement("div");
    avatar.className = `main-tank ${direction}`;
    avatar.style.left = `${x * App.variables.point}px`;
    avatar.style.top = `${y * App.variables.point}px`;
    avatar.style.width = `${App.variables.point}px`;
    avatar.style.height = `${App.variables.point}px`;
    App.variables.main.appendChild(avatar);

    this.avatar = avatar;

    App.variables.body.addEventListener("keydown", (e) => {

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
                    }, App.variables.intervalBulletsCreation);

                    createBullet(App, this.x, this.y, this.direction);
                }
                return;
        }

        moveMainTank(App, this);
    });

    if (isMobile()) initControls(App, this, moveMainTank, createBullet);
}