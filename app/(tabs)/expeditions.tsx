import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { getExpeditions } from "../../services/api";
import { Expedition } from "../../types/Expeditions";

function getExpeditionImage(item: Expedition): string | undefined {
  return (
    item.mission_patches?.[0]?.image_url ??
    item.spacestation?.image?.thumbnail_url ??
    undefined
  );
}

export default function ExpeditionsTab() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExpeditions()
      .then(setExpeditions)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f8fafc", paddingHorizontal: 14 }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "700",
          marginTop: 16,
          marginBottom: 14,
          color: "#0f172a",
        }}
      >
        Expeditions
      </Text>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#0f766e" size="large" />
        </View>
      ) : (
        <FlatList
          data={expeditions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#e2e8f0",
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              {getExpeditionImage(item) ? (
                <Image
                  source={{ uri: getExpeditionImage(item) }}
                  style={{
                    width: "100%",
                    height: 120,
                    backgroundColor: "#f1f5f9",
                  }}
                />
              ) : null}
              <View style={{ padding: 12 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#0f172a" }}
                >
                  {item.name}
                </Text>
                <Text style={{ marginTop: 4, color: "#475569" }}>
                  {item.start ? item.start.split("T")[0] : "Okänt startdatum"}
                </Text>
                {item.spacestation?.name ? (
                  <Text style={{ marginTop: 6, color: "#64748b" }}>
                    {item.spacestation.name}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
