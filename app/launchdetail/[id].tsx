import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { LaunchDetail } from "../../types/Launch";

const API_BASE = "https://ll.thespacedevs.com/2.2.0/";

export default function LaunchDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}launch/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setLaunch({
          id: String(data.id),
          name: data.name ?? "",
          net: data.net ?? "",
          image: data.image ?? null,
          missionName: data.mission?.name ?? null,
          missionType: data.mission?.type ?? null,
          missionDescription: data.mission?.description ?? null,
          missionImage: data.mission?.image ?? null,
          orbitName: data.mission?.orbit?.name ?? null,
          orbitAbbrev: data.mission?.orbit?.abbrev ?? null,
        });
      })
      .catch(() => {
        setLaunch(null);
      });
  }, [id]);

  if (!launch) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  const image = launch.missionImage ?? launch.image;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      {image ? (
        <Image source={{ uri: image }} style={{ width: "100%", height: 220 }} />
      ) : null}
      <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 12 }}>
        {launch.name}
      </Text>
      <Text style={{ marginTop: 6 }}>{launch.net}</Text>
      <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
        {launch.missionName ?? "Mission"}
      </Text>
      <Text style={{ marginTop: 8 }}>
        {launch.missionDescription ?? "Ingen beskrivning."}
      </Text>
      {launch.orbitName ? (
        <Text style={{ marginTop: 12 }}>Orbit: {launch.orbitName}</Text>
      ) : null}
    </ScrollView>
  );
}
