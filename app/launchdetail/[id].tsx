import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SpaceBackground from "../../components/SpaceBackground";
import { useFollowedLaunches } from "../../hooks/useFollowedLaunches";
import { getLaunchDetail } from "../../services/api";
import { COLORS } from "../../theme/colors";
import { FollowedLaunch, LaunchDetail } from "../../types/Launch";

export default function LaunchDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingFollow, setSavingFollow] = useState(false);
  const { isFollowing, toggleFollowLaunch } = useFollowedLaunches();

  useEffect(() => {
    if (!id) {
      setLaunch(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getLaunchDetail(id)
      .then((data) => setLaunch(data))
      .catch(() => {
        setLaunch(null);
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

  if (!launch) {
    return (
      <SpaceBackground>
        <View style={styles.centered}>
          <Text style={{ color: COLORS.textPrimary }}>
            Could not load launch.
          </Text>
        </View>
      </SpaceBackground>
    );
  }

  const image = launch.mission?.image ?? launch.image;
  const following = isFollowing(launch.id);

  async function onToggleFollow() {
    if (!launch) return;

    const followItem: FollowedLaunch = {
      id: launch.id,
      name: launch.name,
      net: launch.net,
      image: image ?? null,
    };

    setSavingFollow(true);
    try {
      await toggleFollowLaunch(followItem);
    } finally {
      setSavingFollow(false);
    }
  }

  return (
    <SpaceBackground>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 220, borderRadius: 12 }}
          />
        ) : null}
        <Text
          style={styles.title}
        >
          {launch.name}
        </Text>
        <Text style={{ marginTop: 6, color: COLORS.textSecondary }}>
          {launch.net}
        </Text>
        <Pressable
          onPress={() => {
            void onToggleFollow();
          }}
          disabled={savingFollow}
          style={[
            styles.followButton,
            savingFollow && styles.followButtonDisabled,
          ]}
        >
          <Text style={styles.followButtonText}>
            {savingFollow
              ? "Saving..."
              : following
                ? "Following · remove"
                : "Follow launch"}
          </Text>
        </Pressable>
        <Text
          style={styles.missionTitle}
        >
          {launch.mission?.name ?? "Mission"}
        </Text>
        <Text style={{ marginTop: 8, color: COLORS.textBody }}>
          {launch.mission?.description ?? "No description."}
        </Text>
        {launch.mission?.orbit?.name ? (
          <Text style={styles.orbit}>Orbit: {launch.mission.orbit.name}</Text>
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
  followButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderNeon,
    backgroundColor: "rgba(0, 242, 255, 0.12)",
  },
  followButtonDisabled: {
    opacity: 0.6,
  },
  followButtonText: {
    color: COLORS.primaryNeon,
    fontSize: 12,
    fontWeight: "700",
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
  orbit: {
    marginTop: 12,
    color: COLORS.primaryNeon,
    ...Platform.select({
      web: { textShadow: "0 0 6px rgba(0, 242, 255, 0.9)" },
      default: {
        textShadowColor: COLORS.primaryNeon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
      },
    }),
  },
});
