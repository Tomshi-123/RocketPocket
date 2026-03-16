import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { appTheme } from "../theme/paperTheme";
import { COLORS } from "../theme/colors";

export default function RootLayout() {
  return (
    <PaperProvider theme={appTheme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.appBackground },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="launchdetail/[id]"
          options={{ title: "Launch Detail" }}
        />
      </Stack>
    </PaperProvider>
  );
}
