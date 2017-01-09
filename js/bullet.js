export function Bullet(position = [0, 0], direction = "_top") {
    this.position = {};
    this.position.x = position[0];
    this.position.y = position[1];
    this.direction = direction;
}