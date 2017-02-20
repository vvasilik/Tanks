import changeScore from "./changeScore"

export default function removeItem(App, cellInfo) {
    App[cellInfo.category].map((item, index) => {
        if (item.avatar === cellInfo.item.avatar) {
            if (cellInfo.category === "tanks") changeScore();

            App[cellInfo.category].splice(index, 1);
            item.avatar.parentNode.removeChild(item.avatar);
        }
    });
}