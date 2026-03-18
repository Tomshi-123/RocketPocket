import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Filt from "../../components/Filt";
import ObjectCard from "../../components/ObjectCard";
import SpaceBackground from "../../components/SpaceBackground";
import { useFilt } from "../../hooks/useFilt";
import { useLaunches } from "../../hooks/useLaunches";
import { COLORS } from "../../theme/colors";

export default function HomeTab() {
  const { launches, loading, error } = useLaunches();
  const { selectedCompany, setSelectedCompany, companyOptions, filteredItems } =
    useFilt({
      items: launches,
      getCompany: (launch) => launch.company,
      getDate: (launch) => launch.net,
    });

  const renderLaunch = useCallback(
    ({ item }: { item: (typeof filteredItems)[number] }) => (
      <ObjectCard
        item={{
          id: item.id,
          name: item.name,
          image: item.image ?? undefined,
          subtitle: item.net.split("T")[0],
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
          <>
            <Filt
              value={selectedCompany}
              options={companyOptions}
              onChange={setSelectedCompany}
            />

            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={renderLaunch}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
              ListEmptyComponent={
                <Text
                  style={{ color: COLORS.textSecondary, textAlign: "center" }}
                >
                  No launches match this company.
                </Text>
              }
            />
          </>
        )}
      </View>
    </SpaceBackground>
  );
}
