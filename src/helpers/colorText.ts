const colorWrap = (r: number, g: number, b: number, string: string) => {
  return `\u001b[38;2;${r};${g};${b}m${string}\u001b[m`;
};

export default colorWrap;
