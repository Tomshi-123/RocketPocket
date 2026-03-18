import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Filt from "../../components/Filt";
import ObjectCard from "../../components/ObjectCard";
import { useFilt } from "../../hooks/useFilt";
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
  const { selectedCompany, setSelectedCompany, companyOptions, filteredItems } =
    useFilt({
      items: expeditions,
      getCompany: (expedition) => expedition.company,
      getDate: (expedition) => expedition.start,
    });

  const renderExpedition = useCallback(
    ({ item }: { item: Expedition }) => (
      <ObjectCard
        item={{
          id: item.id,
          name: item.name,
          image: getExpeditionImage(item),
          subtitle: item.start ? item.start.split("T")[0] : "Unknown date",
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
          <>
            <Filt
              value={selectedCompany}
              options={companyOptions}
              onChange={setSelectedCompany}
            />

            <FlatList
              data={filteredItems}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderExpedition}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
              ListEmptyComponent={
                <Text
                  style={{ color: COLORS.textSecondary, textAlign: "center" }}
                >
                  No expeditions match this company.
                </Text>
              }
            />
          </>
        )}
      </View>
    </SpaceBackground>
  );
}
