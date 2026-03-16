import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ObjectCard from "../../components/ObjectCard";
import { useExpeditions } from "../../hooks/useExpeditions";
import SpaceBackground from "../../components/SpaceBackground";
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
  const { expeditions, loading, error } = useExpeditions();

  const renderExpedition = useCallback(
    ({ item }: { item: Expedition }) => (
      <ObjectCard
        item={{
          id: item.id,
          name: item.name,
          image: getExpeditionImage(item),
          subtitle: item.start ? item.start.split("T")[0] : "Okänt datum",
          icon: "📅",
        }}
      />
    ),
    [],
  );

  return (
    <SpaceBackground>
      <View style={{ flex: 1, paddingHorizontal: 14 }}>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={COLORS.primaryNeon} size="large" />
          </View>
        ) : error ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: COLORS.textPrimary, textAlign: "center" }}>
              {error}
            </Text>
          </View>
        ) : (
          <FlatList
            data={expeditions}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderExpedition}
            contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
          />
        )}
      </View>
    </SpaceBackground>
  );
}
