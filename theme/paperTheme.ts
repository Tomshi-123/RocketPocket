import { MD3DarkTheme } from "react-native-paper";
import { COLORS } from "./colors";

export const appTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: COLORS.primaryNeon,
    secondary: COLORS.accentNeon,
    background: COLORS.appBackground,
    surface: COLORS.surface,
    scrim: "rgba(0,0,0,0.5)",
  },
};
