import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { tabsScreenOptions } from "../../theme/navigation";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        ...tabsScreenOptions,
        sceneStyle: { backgroundColor: COLORS.appBackground },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Launches",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="rocket-launch-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expeditions"
        options={{
          title: "Expeditions",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-search-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Following",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
