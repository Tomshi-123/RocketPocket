import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SpaceBackground from "../../components/SpaceBackground";
import { getExpeditionDetail } from "../../services/api";
import { COLORS } from "../../theme/colors";
import { Expedition } from "../../types/Expeditions";

export default function ExpeditionDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [expedition, setExpedition] = useState<Expedition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setExpedition(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    getExpeditionDetail(id)
      .then((data) => setExpedition(data))
      .catch(() => {
        setExpedition(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SpaceBackground>
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primaryNeon} size="large" />
        </View>
      </SpaceBackground>
    );
  }

  if (!expedition) {
    return (
      <SpaceBackground>
        <View style={styles.centered}>
          <Text style={{ color: COLORS.textPrimary }}>
            Could not load expedition.
          </Text>
        </View>
      </SpaceBackground>
    );
  }

  const image =
    expedition.mission_patches?.[0]?.image_url ??
    expedition.spacestation?.image?.thumbnail_url;

  return (
    <SpaceBackground>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 220, borderRadius: 12 }}
          />
        ) : null}
        <Text style={styles.title}>{expedition.name}</Text>
        <Text style={{ marginTop: 6, color: COLORS.textSecondary }}>
          {expedition.start ? expedition.start.split("T")[0] : "Unknown date"}
        </Text>
        {expedition.company ? (
          <Text style={styles.company}>Company: {expedition.company}</Text>
        ) : null}
        {expedition.spacestation?.name ? (
          <Text style={styles.spacestation}>
            Spacestation: {expedition.spacestation.name}
          </Text>
        ) : null}
        {expedition.mission_patches?.length ? (
          <Text style={styles.patchTitle}>Mission Patch</Text>
        ) : null}
        {expedition.mission_patches?.[0]?.image_url ? (
          <Image
            source={{ uri: expedition.mission_patches[0].image_url }}
            style={{ width: 120, height: 120, borderRadius: 12, marginTop: 12 }}
          />
        ) : null}
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  company: {
    marginTop: 12,
    color: COLORS.primaryNeon,
    fontWeight: "600",
    ...Platform.select({
      web: { textShadow: "0 0 6px rgba(0, 242, 255, 0.9)" },
      default: {
        textShadowColor: COLORS.primaryNeon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
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
  patchTitle: {
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
});
