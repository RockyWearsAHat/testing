const colorWrap = (r, g, b, string) => {
    return `\u001b[38;2;${r};${g};${b}m${string}\u001b[m`;
};
export default colorWrap;
//# sourceMappingURL=colorText.js.map