export default function Bullet(App, x, y, direction = App.const.top) {

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
    avatar.style.left = `${x * App.variables.point}px`;
    avatar.style.top = `${y * App.variables.point}px`;
    avatar.style.width = `${App.variables.point}px`;
    avatar.style.height = `${App.variables.point}px`;
    App.variables.main.appendChild(avatar);

    this.avatar = avatar;
}