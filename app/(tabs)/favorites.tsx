import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ObjectCard from "../../components/ObjectCard";
import SpaceBackground from "../../components/SpaceBackground";
import { useFollowedLaunches } from "../../hooks/useFollowedLaunches";
import { COLORS } from "../../theme/colors";
import { FollowedLaunch } from "../../types/Launch";

function formatCountdown(net: string, now: Date): string {
  const launchTime = Date.parse(net);

  if (Number.isNaN(launchTime)) {
    return "Invalid date";
  }

  const diffMs = launchTime - now.getTime();

  if (diffMs <= 0) {
    return "Launch has passed";
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}min left`;
}

export default function FavoritesTab() {
  const { followedLaunches, loading, unfollowLaunch } = useFollowedLaunches();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const renderFavorite = useCallback(
    ({ item }: { item: FollowedLaunch }) => (
      <View style={styles.itemWrap}>
        <ObjectCard
          item={{
            id: item.id,
            name: item.name,
            image: item.image ?? undefined,
            subtitle: item.net.split("T")[0],
            icon: "🚀",
            path: "/launchdetail/[id]",
          }}
        />
        <View style={styles.row}>
          <View style={styles.countdownBadge}>
            <Text style={styles.countdownText}>
              ⏳ {formatCountdown(item.net, now)}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              void unfollowLaunch(item.id);
            }}
            style={styles.unfollowButton}
          >
            <Text style={styles.unfollowText}>Unfollow</Text>
          </Pressable>
        </View>
      </View>
    ),
    [now, unfollowLaunch],
  );

  return (
    <SpaceBackground>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={COLORS.primaryNeon} size="large" />
          </View>
        ) : (
          <FlatList
            data={followedLaunches}
            keyExtractor={(item) => item.id}
            renderItem={renderFavorite}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                You're not following any launches yet.
              </Text>
            }
          />
        )}
      </View>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  itemWrap: {
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -12,
    marginBottom: 18,
    gap: 10,
  },
  countdownBadge: {
    flex: 1,
    backgroundColor: "rgba(0, 255, 157, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 157, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countdownText: {
    color: COLORS.accentNeon,
    fontSize: 12,
    fontWeight: "700",
  },
  unfollowButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderNeon,
    backgroundColor: "rgba(0, 242, 255, 0.10)",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  unfollowText: {
    color: COLORS.primaryNeon,
    fontWeight: "700",
    fontSize: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 48,
    fontSize: 14,
  },
});
