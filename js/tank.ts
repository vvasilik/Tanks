import {IObject} from "./Interfaces/IObject";

export default class Tank implements IObject {
    public x: number;
    public y: number;
    public direction: string;
    public avatar: Element;

    constructor(App, x, y, direction = App.const.top) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.avatar = this.createAvatar(App, direction, x, y);   
    }

    private createAvatar(App, direction:string, x:number, y:number): Element {
        let avatar = document.createElement("div");
        avatar.className = `computer-tank ${direction}`;
        avatar.style.left = `${x * App.variables.point}px`;
        avatar.style.top = `${y * App.variables.point}px`;
        avatar.style.width = `${App.variables.point}px`;
        avatar.style.height = `${App.variables.point}px`;
        App.variables.main.appendChild(avatar);

        return avatar;
    }
}