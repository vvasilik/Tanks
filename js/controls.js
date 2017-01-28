export default function initControls(App, item, moveMainTank, createBullet) {
    const btnLeft = document.querySelector(".js-controls__left");
    const btnRight = document.querySelector(".js-controls__right");
    const btnTop = document.querySelector(".js-controls__top");
    const btnBottom = document.querySelector(".js-controls__bottom");
    const shoot = document.querySelector(".js-controls__shoot");

    initListeners();

    // -------

    function initListeners() {
        btnLeft.addEventListener("click", () => {
            item.direction = App.const.left;
            moveMainTank(App, item)
        });

        btnRight.addEventListener("click", () => {
            item.direction = App.const.right;
            moveMainTank(App, item)
        });

        btnTop.addEventListener("click", () => {
            item.direction = App.const.top;
            moveMainTank(App, item)
        });

        btnBottom.addEventListener("click", () => {
            item.direction = App.const.bottom;
            moveMainTank(App, item)
        });

        shoot.addEventListener("click", () => {
            createBullet(App, item.x, item.y, item.direction)
        })
    }
}