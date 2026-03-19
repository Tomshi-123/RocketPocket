import { Platform, Text, View, Image, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

interface Props {
  title: string;
  date?: string;
  image?: string | null;
  missionTitle?: string;
  description?: string;
  spacestation?: string;
  patchImage?: string | null;
}

export default function DetailHeader({
  title,
  date,
  image,
  missionTitle,
  description,
  spacestation,
  patchImage,
}: Props) {
  return (
    <View>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 220, borderRadius: 12 }}
        />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {date ? (
        <Text style={{ marginTop: 6, color: COLORS.textSecondary }}>
          {date}
        </Text>
      ) : null}
      {missionTitle ? (
        <Text style={styles.missionTitle}>{missionTitle}</Text>
      ) : null}
      <Text style={{ marginTop: 8, color: COLORS.textBody }}>
        {description ?? "Ingen beskrivning."}
      </Text>
      {spacestation ? (
        <Text style={styles.spacestation}>Rymdstation: {spacestation}</Text>
      ) : null}
      {patchImage ? (
        <Image
          source={{ uri: patchImage }}
          style={{ width: 120, height: 120, borderRadius: 12, marginTop: 12 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
    color: COLORS.textPrimary,
    ...Platform.select({
      web: { textShadow: "0 0 12px rgba(0, 242, 255, 0.9)" },
      default: {
        textShadowColor: COLORS.primaryNeon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
      },
    }),
  },
  missionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.accentNeon,
    ...Platform.select({
      web: { textShadow: "0 0 8px rgba(0, 255, 157, 0.9)" },
      default: {
        textShadowColor: COLORS.accentNeon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      },
    }),
  },
  spacestation: {
    marginTop: 8,
    color: COLORS.accentNeon,
    fontWeight: "600",
    ...Platform.select({
      web: { textShadow: "0 0 8px rgba(0, 255, 157, 0.9)" },
      default: {
        textShadowColor: COLORS.accentNeon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      },
    }),
  },
});
