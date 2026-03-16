import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { getExpeditions } from "../../services/api";
import { COLORS } from "../../theme/colors";
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
      style={{
        flex: 1,
        backgroundColor: COLORS.appBackground,
        paddingHorizontal: 14,
      }}
    >
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={COLORS.primaryNeon} size="large" />
        </View>
      ) : (
        <FlatList
          data={expeditions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: COLORS.border,
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
                    backgroundColor: COLORS.surfaceAlt,
                  }}
                />
              ) : null}
              <View style={{ padding: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: COLORS.textPrimary,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ marginTop: 4, color: COLORS.textSecondary }}>
                  {item.start ? item.start.split("T")[0] : "Okänt startdatum"}
                </Text>
                {item.spacestation?.name ? (
                  <Text style={{ marginTop: 6, color: COLORS.accentNeon }}>
                    {item.spacestation.name}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
