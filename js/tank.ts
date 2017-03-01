
export default function Tank(App, x, y, direction = App.const.top) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    let avatar = document.createElement("div");
    avatar.className = `computer-tank ${direction}`;
    avatar.style.left = `${x * App.variables.point}px`;
    avatar.style.top = `${y * App.variables.point}px`;
    avatar.style.width = `${App.variables.point}px`;
    avatar.style.height = `${App.variables.point}px`;
    App.variables.main.appendChild(avatar);

    this.avatar = avatar;
}