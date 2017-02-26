export default function showScore(score) {
    let timer;
    clearTimeout(timer);
    const box = document.querySelector(".score");
    (<HTMLElement>box).innerText = score;
    box.classList.add("_visible");

    timer = setTimeout(() => box.classList.remove("_visible"), 2000);
}