import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
  Text,
} from "react-native";
import SpaceBackground from "../../components/SpaceBackground";
import { useFollowedLaunches } from "../../hooks/useFollowedLaunches";
import { getLaunchDetail } from "../../services/api";
import { COLORS } from "../../theme/colors";
import { LaunchDetail } from "../../types/Launch";
import DetailHeader from "../../components/DetailHeader";

export default function LaunchDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingFollow, setSavingFollow] = useState(false);
  const { isFollowing, toggleFollowLaunch } = useFollowedLaunches();

  const onToggleFollow = async () => {
    if (!launch) return;
    setSavingFollow(true);
    try {
      await toggleFollowLaunch({
        id: launch.id,
        name: launch.name,
        net: launch.net,
        image: launch.image ?? null,
      });
    } finally {
      setSavingFollow(false);
    }
  };
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={COLORS.primaryNeon} size="large" />
        </View>
      </SpaceBackground>
    );
  }

  if (!launch) {
    return (
      <SpaceBackground>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.primaryNeon }}>
            Ingen data om uppskjutningen.
          </Text>
        </View>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <DetailHeader
          title={launch.name}
          date={launch.net}
          image={launch.image ?? null}
          missionTitle={launch.mission?.name ?? "Mission"}
          description={launch.mission?.description ?? "No description."}
        />
        <Pressable
          onPress={onToggleFollow}
          disabled={savingFollow}
          style={{
            marginTop: 12,
            alignSelf: "flex-start",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: COLORS.borderNeon,
            backgroundColor: savingFollow
              ? "rgba(0, 242, 255, 0.12)"
              : "rgba(0, 242, 255, 0.12)",
            opacity: savingFollow ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: COLORS.primaryNeon,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {savingFollow
              ? "Saving..."
              : isFollowing(launch.id)
                ? "Following · remove"
                : "Follow launch"}
          </Text>
        </Pressable>
        {launch.mission && launch.mission.orbit && launch.mission.orbit.name ? (
          <Text style={{ marginTop: 12, color: COLORS.primaryNeon }}>
            Orbit: {launch.mission.orbit.name}
          </Text>
        ) : null}
      </ScrollView>
    </SpaceBackground>
  );
}
