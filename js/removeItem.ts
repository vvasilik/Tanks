import sounds from "./sounds"
import changeScore from "./changeScore"

export default function removeItem(App, cellInfo) {
    App[cellInfo.category].map((item, index) => {
        if (item.avatar === cellInfo.item.avatar) {
            if (cellInfo.category === "tanks") {
                sounds.tankExplore();
                changeScore();
            };

            App[cellInfo.category].splice(index, 1);
            item && item.avatar.parentNode && item.avatar.parentNode.removeChild(item.avatar);
        }
    });
}