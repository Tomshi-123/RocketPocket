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
    <View style={{ flex: 1 }}>
      <Text>Upcoming Launches</Text>
      <FlatList
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ObjectCard item={item} />}
      />
    </View>
  );
}
