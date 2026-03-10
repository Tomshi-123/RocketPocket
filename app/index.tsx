import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getLaunches } from "../services/api";
import ObjectCard from "../components/ObjectCard";
import { Launch } from "../types/Launch";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e17",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
