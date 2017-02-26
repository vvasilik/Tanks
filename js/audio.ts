export default function initAudio() {
    let holder = document.querySelector(".js-sounds");
    let start = holder.querySelector(".js-sound-start");

    (<HTMLMediaElement>start).play();
}