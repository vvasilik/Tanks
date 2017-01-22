export function initControls(App, item, moveMainTank, createBullet) {
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
            moveMainTank(item)
        });

        btnRight.addEventListener("click", () => {
            item.direction = App.const.right;
            moveMainTank(item)
        });

        btnTop.addEventListener("click", () => {
            item.direction = App.const.top;
            moveMainTank(item)
        });

        btnBottom.addEventListener("click", () => {
            item.direction = App.const.bottom;
            moveMainTank(item)
        });

        shoot.addEventListener("click", () => {
            createBullet(item.x, item.y, item.direction)
        })
    }
}