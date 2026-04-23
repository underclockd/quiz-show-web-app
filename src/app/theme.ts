import type { CSSProperties } from "react";

type ThemeVariables = CSSProperties & Record<`--${string}`, string>;

export const themeColors = {
    blue: "rgb(11, 20, 127)",
    light: "rgb(25, 45, 190)",
    dark: "rgb(5, 10, 60)",
    gold: "rgb(250, 184, 91)",
    white: "#ffffff",
    black: "#000000",
} as const;

export const themeVariables: ThemeVariables = {
    "--jeopardy-blue": themeColors.blue,
    "--jeopardy-light": themeColors.light,
    "--jeopardy-dark": themeColors.dark,
    "--jeopardy-gold": themeColors.gold,
    "--jeopardy-white": themeColors.white,
    "--jeopardy-black": themeColors.black,
};