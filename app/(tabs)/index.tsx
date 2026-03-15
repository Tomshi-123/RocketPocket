import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ObjectCard from "../../components/ObjectCard";
import { getLaunches } from "../../services/api";
import { Launch } from "../../types/Launch";

export default function HomeTab() {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    getLaunches().then(setLaunches);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc", paddingHorizontal: 14 }}>
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
        Upcoming Launches
      </Text>
      <FlatList
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ObjectCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
