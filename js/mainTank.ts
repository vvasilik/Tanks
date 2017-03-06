import sounds from "./sounds"
import {IObject} from "./Interfaces/IObject";
import moveMainTank from "./moveMainTank";
import initControls from "./controls";
import createBullet from "./createBullet";
import isMobile from "./helpers/isMobile";

export default class MainTank implements IObject {
    public x: number;
    public y: number;
    public direction: string;
    public avatar: Element;

    constructor(App, x:number, y:number, direction:string = App.const.top) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.avatar = this.createAvatar(App, direction, x, y);
        this.initListeners(App);
        this.initTankControls(App);
    }

    private createAvatar(App, direction:string, x:number, y:number) {
        let avatar = document.createElement("div");
        avatar.className = `main-tank ${direction}`;
        avatar.style.left = `${x * App.variables.point}px`;
        avatar.style.top = `${y * App.variables.point}px`;
        avatar.style.width = `${App.variables.point}px`;
        avatar.style.height = `${App.variables.point}px`;
        App.variables.main.appendChild(avatar);

        return avatar;
    }

    private initTankControls(App) {
        if (isMobile()) initControls(App, this, moveMainTank, createBullet);
    }

    private initListeners(App) {
        let isPressedSpace = false;

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
                        sounds.tankFiree();
                    }
                    return;
            }

            moveMainTank(App, this);
        });
    }
}