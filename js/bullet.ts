import {IObject} from "./Interfaces/IObject";
import isEmptyCell from "./helpers/isEmptyCell"
import removeItem from "./removeItem"
import removeBullet from "./removeBullet"
import makeExplore from "./makeExplore"

export default class Bullet implements IObject {
    public x: number;
    public y: number;
    public direction: string;
    public avatar: Element;

    constructor(App, x, y, direction = App.const.top) {
        let {newX, newY} = this.getCoords(App, x, y, direction);

        this.x = newX;
        this.y = newY;
        this.direction = direction;
        this.avatar = this.createAvatar(App, direction, newX, newY);
        this.exploreIfUnemptyCell(App, newX, newY);
    }

    private getCoords(App, x:number, y:number, direction:string) {
        let newX = x;
        let newY = y;

        switch (direction) {
            case App.const.bottom:
                newY = y + 1;
                break;

            case App.const.top:
                newY = y - 1;
                break;

            case App.const.right:
                newX = x + 1;
                break;

            case App.const.left:
                newX = x - 1;
                break;
        }

        return {newX, newY}
    }

    private createAvatar(App, direction:string, x:number, y:number) {
        let avatar = document.createElement("div");
        avatar.className = `bullet ${direction}`;
        avatar.dataset["index"] = `${++App.bulletsIndex}`;
        avatar.style.left = `${x * App.variables.point}px`;
        avatar.style.top = `${y * App.variables.point}px`;
        avatar.style.width = `${App.variables.point}px`;
        avatar.style.height = `${App.variables.point}px`;
        App.variables.main.appendChild(avatar);

        return avatar;
    }

    private exploreIfUnemptyCell(App, x:number, y:number) {
        let cellInfo = isEmptyCell(App, x, y);

        if (!cellInfo.isEmpty) {
            removeItem(App, cellInfo);
            makeExplore(this);
        }
    }
}