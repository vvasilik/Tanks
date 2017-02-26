export default function isMobile() {
    return 'ontouchstart' in window;
}