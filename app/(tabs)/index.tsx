import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import ObjectCard from "../../components/ObjectCard";
import { getLaunches } from "../../services/api";
import { COLORS } from "../../theme/colors";
import { Launch } from "../../types/Launch";

export default function HomeTab() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaunches()
      .then(setLaunches)
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
          data={launches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ObjectCard item={item} />}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
