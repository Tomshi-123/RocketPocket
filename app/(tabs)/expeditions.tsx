import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import SpaceBackground from "../../components/SpaceBackground";
import { useExpeditions } from "../../hooks/useExpeditions";
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
  const { expeditions, loading } = useExpeditions();

  return (
    <SpaceBackground>
      <View
        style={{
          flex: 1,
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
                  backgroundColor: COLORS.surfaceTranslucent,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: COLORS.borderTranslucent,
                  marginBottom: 14,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 8,
                }}
              >
                {getExpeditionImage(item) ? (
                  <Image
                    source={{ uri: getExpeditionImage(item) }}
                    style={{
                      width: "100%",
                      height: 140,
                    }}
                  />
                ) : null}
                <View style={{ padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: COLORS.textPrimary,
                      letterSpacing: 0.5,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      color: COLORS.accentNeon,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    📅 {item.start ? item.start.split("T")[0] : "Okänt datum"}
                  </Text>
                  {item.spacestation?.name ? (
                    <Text
                      style={{
                        marginTop: 8,
                        color: COLORS.textSecondary,
                        fontSize: 13,
                      }}
                    >
                      🛰️ {item.spacestation.name}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
          />
        )}
      </View>
    </SpaceBackground>
  );
}
