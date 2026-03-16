import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { COLORS } from "../theme/colors";
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
      <Pressable style={{ marginBottom: 14 }}>
        <View
          style={{
            backgroundColor: COLORS.surface,
            borderRadius: 14,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 170 }}
            />
          ) : (
            <View
              style={{
                height: 120,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.surfaceAlt,
              }}
            >
              <Text style={{ color: COLORS.textSecondary }}>Ingen bild</Text>
            </View>
          )}
          <View style={{ padding: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: COLORS.textPrimary,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ marginTop: 4, color: COLORS.textSecondary }}>
              {item.net}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
