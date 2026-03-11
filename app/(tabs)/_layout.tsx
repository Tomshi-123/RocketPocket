import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: "700" },
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 8,
        },
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
    </Tabs>
  );
}
