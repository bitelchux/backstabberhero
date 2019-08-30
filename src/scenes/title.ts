import { GameLoop, keyPressed } from "../dependencies/kontra.js";
import { zzfx } from "../dependencies/zzfx";
import { GetFlash } from "../functions/getFlash";
import writeText from "../functions/writeText";
import { levelSelectScene } from "./levelSelect";
import { GetState } from "../functions/state";

export const Title = () => {
  let tick = 0;
  let amplitude = 100;
  let heroOpacity = 0;
  let state = -1;
  let { context, assets, font } = GetState();
  window["playMusic"]();

  let loop = GameLoop({
    update: () => {
      if (amplitude > 0) {
        amplitude--;
      } else if (heroOpacity < 100) {
        heroOpacity++;
      }
      if (keyPressed("z")) {
        zzfx(1, 0.1, 568, 0.5, 0.9, 1.5, 0, 4.5, 0.69);
        if (state == 1) {
          loop.stop();
          levelSelectScene();
          state = 2;
        }
      } else {
        state = 1;
      }
    },
    render: () => {
      context.drawImage(assets.gfx8colors, 64, 0, 32, 32, 0, 120, 120, 120);
      writeText(font, "BACKSTABBER", -1, 50, 2, amplitude, tick++);
      context.globalAlpha = heroOpacity / 100;
      writeText(assets.font, "HERO", -1, 85 - heroOpacity / 5, 5.5);
      context.globalAlpha = (0.4 * heroOpacity) / 100;
      writeText(assets.font, "HERO", -130, 85 + 3 - heroOpacity / 5, 5);
      context.globalAlpha = 1;
      if (heroOpacity === 100 && GetFlash(tick / 9)) {
        writeText(assets.font, "PRESS Z TO STAB", 75, 110, 1);
      }
    }
  });
  loop.start();
};
