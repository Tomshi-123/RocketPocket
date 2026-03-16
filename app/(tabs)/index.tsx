import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ObjectCard from "../../components/ObjectCard";
import SpaceBackground from "../../components/SpaceBackground";
import { useLaunches } from "../../hooks/useLaunches";
import { COLORS } from "../../theme/colors";

export default function HomeTab() {
  const { launches, loading, error } = useLaunches();

  const renderLaunch = useCallback(
    ({ item }: { item: (typeof launches)[number] }) => (
      <ObjectCard
        item={{
          id: item.id,
          name: item.name,
          image: item.image ?? undefined,
          subtitle: item.net,
          icon: "🚀",
          path: "/launchdetail/[id]",
        }}
      />
    ),
    [],
  );

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
            data={launches}
            keyExtractor={(item) => item.id}
            renderItem={renderLaunch}
            contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
          />
        )}
      </View>
    </SpaceBackground>
  );
}
