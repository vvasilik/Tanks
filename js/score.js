export default function showScore(score) {
    clearTimeout(timer);
    const box = document.querySelector(".score");
    box.innerText = score;
    box.classList.add("_visible");

    let timer = setTimeout(() => box.classList.remove("_visible"), 2000);
}