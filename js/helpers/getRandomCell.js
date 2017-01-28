import isEmptyCell from "./isEmptyCell"

export default function getRandomCell(App) {
    let x;
    let y;

    while (true) {
        x = Math.floor(Math.random() * (App.variables.maxX - App.variables.minX)) + App.variables.minX;
        y = Math.floor(Math.random() * (App.variables.maxY - App.variables.minY)) + App.variables.minY;

        let cellInfo = isEmptyCell(App, x, y);

        if (cellInfo.isEmpty) break;
    }

    return {x, y}
}