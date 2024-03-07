import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

import * as themes from "../theme-output";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const animations = createAnimations({
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    delay: 0,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
    delay: 0,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    delay: 0,
  },
  slowest: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 350,
    delay: 0,
  },
});

export const config = createTamagui({
  themes,
  animations,
  defaultTheme: "light",
  shorthands,
  tokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  type TamaguiCustomConfig = Conf;
}
