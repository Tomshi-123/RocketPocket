import { ActivityIndicator, FlatList, View } from "react-native";
import ObjectCard from "../../components/ObjectCard";
import SpaceBackground from "../../components/SpaceBackground";
import { useLaunches } from "../../hooks/useLaunches";
import { COLORS } from "../../theme/colors";

export default function HomeTab() {
  const { launches, loading } = useLaunches();

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
            data={launches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ObjectCard item={item} />}
            contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
          />
        )}
      </View>
    </SpaceBackground>
  );
}
