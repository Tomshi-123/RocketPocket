import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { LaunchDetail } from "../../types/Launch";

const API_BASE = "https://ll.thespacedevs.com/2.2.0/";

export default function LaunchDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}launch/${id}/`)
      .then((response) => response.json())
      .then((data) => setLaunch(data as LaunchDetail))
      .catch(() => {
        setLaunch(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#0f766e" size="large" />
      </View>
    );
  }

  if (!launch) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Kunde inte ladda launch.</Text>
      </View>
    );
  }

  const image = launch.mission?.image ?? launch.image;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Launch Detail",
        }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 220 }}
          />
        ) : null}
        <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 12 }}>
          {launch.name}
        </Text>
        <Text style={{ marginTop: 6 }}>{launch.net}</Text>
        <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
          {launch.mission?.name ?? "Mission"}
        </Text>
        <Text style={{ marginTop: 8 }}>
          {launch.mission?.description ?? "Ingen beskrivning."}
        </Text>
        {launch.mission?.orbit?.name ? (
          <Text style={{ marginTop: 12 }}>
            Orbit: {launch.mission.orbit.name}
          </Text>
        ) : null}
      </ScrollView>
    </>
  );
}
