import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0f766e",
    secondary: "#334155",
    background: "#f8fafc",
    surface: "#ffffff",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="launchdetail/[id]"
          options={{ title: "Launch Detail" }}
        />
      </Stack>
    </PaperProvider>
  );
}
