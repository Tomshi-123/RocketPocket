import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { Launch } from "../types/Launch";

type ObjectCardProps = {
  item: Launch;
};

export default function ObjectCard({ item }: ObjectCardProps) {
  return (
    <Link
      href={{ pathname: "/launchdetail/[id]", params: { id: String(item.id) } }}
      asChild
    >
      <Pressable>
        <View>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 160 }}
            />
          ) : (
            <Text>Ingen bild</Text>
          )}
          <Text>{item.name}</Text>
          <Text>{item.net}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
