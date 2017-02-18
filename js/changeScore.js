import showScore from "./score"

let score = 0;

export default function changeScore() {
    score++;
    showScore(score);
}