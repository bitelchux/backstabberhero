import { getContext } from "../dependencies/kontra";

const writeText = (font, text, x, y, scale = 1, amplitude = 0, tick = 0) => {
  text = "" + text;

  x = x === -1 ? -128 : x;
  x = x < 0 ? Math.abs(x) - (text.length * 8 * scale) / 2 : x;

  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i) - 65;

    if (code != -33) {
      if (code === -32) {
        code = 46;
      }
      if (code < 0) {
        code += 47;
      }
      getContext().drawImage(
        font,
        code * 8,
        0,
        8,
        8,
        x + i * 8 * scale,
        y + amplitude * Math.sin(tick / 9 + i / 3),
        scale * 8,
        scale * 8
      );
    }
  }
};

export default writeText;
