export default function (item) {
    item.avatar.classList.add("_explosion");
    setTimeout(() => {
        item && item.avatar.parentNode && item.avatar.parentNode.removeChild(item.avatar);
    }, 300);
}