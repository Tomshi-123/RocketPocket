import { Link } from "expo-router";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import { GenericItem } from "../types/ObjectCard";

export default function ObjectCard({ item }: { item: GenericItem }) {
  const card = (
    <Pressable style={{ marginBottom: 18 }}>
      <View style={styles.card}>
        {item.image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.imageOverlay} />
          </View>
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Ingen bild</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.icon} {item.subtitle}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  if (!item.path) {
    return card;
  }

  return (
    <Link
      href={{ pathname: item.path as any, params: { id: String(item.id) } }}
      asChild
    >
      {card}
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceTranslucent,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primaryNeon,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 7, 18, 0.1)",
  },
  placeholderImage: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceAlt,
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  content: {
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: 0.4,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  badge: {
    backgroundColor: "rgba(0, 242, 255, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 242, 255, 0.2)",
  },
  badgeText: {
    color: COLORS.primaryNeon,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
