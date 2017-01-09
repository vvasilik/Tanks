export function initMap(options) {
    const {width, height} = options;
    const map = document.createElement("div");
    map.className = "map";
    map.style.width = `${width}px`;
    map.style.height= `${height}px`;

    options.holder.appendChild(map);
}