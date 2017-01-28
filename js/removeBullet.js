export default function removeBullet(App, bullet) {
    App.bullets.map((item, index) => {
        if (item.avatar.dataset.index === bullet.avatar.dataset.index) {
            App.bullets.splice(index, 1);
            item.avatar.classList.add("_explosion");
            setTimeout(() => {
                item.avatar.parentNode.removeChild(item.avatar);
            }, 300);
        }
    })
}