import makeExplore from "./makeExplore"

export default function removeBullet(App, bullet) {
    App.bullets.map((item, index) => {
        if (item.avatar.dataset.index === bullet.avatar.dataset.index) {
            App.bullets.splice(index, 1);
            makeExplore(item);
        }
    })
}