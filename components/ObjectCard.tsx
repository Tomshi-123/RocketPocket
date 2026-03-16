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
            backgroundColor: COLORS.surfaceTranslucent,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: COLORS.borderTranslucent,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 8,
          }}
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 180 }}
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
          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.textPrimary,
                letterSpacing: 0.5,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginTop: 6,
                color: COLORS.accentNeon,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              🚀 {item.net}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
