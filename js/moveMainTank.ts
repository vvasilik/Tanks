export default function moveMainTank(App, item) {
    switch (item.direction) {
        case App.const.bottom:
            if (item.y + 1 < App.variables.mapHeight) item.y += 1;
            break;

        case App.const.top:
            if (item.y - 1 >= 0) item.y -= 1;
            break;

        case App.const.right:
            if (item.x + 1 < App.variables.mapWidth) item.x += 1;
            break;

        case App.const.left:
            if (item.x - 1 >= 0) item.x -= 1;
            break;

        default: console.log("move tank error");
    }

    item.avatar.style.left = `${item.x * App.variables.point}px`;
    item.avatar.style.top = `${item.y * App.variables.point}px`;
    item.avatar.classList.remove("_left", "_top", "_right", "_bottom");
    item.avatar.classList.add(item.direction);
}