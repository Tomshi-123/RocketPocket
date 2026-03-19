import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FollowedLaunch } from "../types/Launch";

const STORAGE_KEY = "rocketpocket:followed-launches";

function getTimeOrMax(dateValue: string): number {
  const parsed = Date.parse(dateValue);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function sortByNet(items: FollowedLaunch[]): FollowedLaunch[] {
  return [...items].sort((a, b) => getTimeOrMax(a.net) - getTimeOrMax(b.net));
}

function toFollowedLaunchArray(raw: unknown): FollowedLaunch[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter((item): item is FollowedLaunch => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const candidate = item as Partial<FollowedLaunch>;
    return (
      typeof candidate.id === "string" &&
      typeof candidate.name === "string" &&
      typeof candidate.net === "string"
    );
  });
}

export function useFollowedLaunches() {
  const [followedLaunches, setFollowedLaunches] = useState<FollowedLaunch[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const save = useCallback(async (next: FollowedLaunch[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      setFollowedLaunches(sortByNet(toFollowedLaunchArray(parsed)));
    } catch {
      setFollowedLaunches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const followLaunch = useCallback(
    async (launch: FollowedLaunch) => {
      setFollowedLaunches((prev) => {
        if (prev.some((item) => item.id === launch.id)) {
          return prev;
        }

        const next = sortByNet([...prev, launch]);
        void save(next);
        return next;
      });
    },
    [save],
  );

  const unfollowLaunch = useCallback(
    async (id: string) => {
      setFollowedLaunches((prev) => {
        const next = prev.filter((item) => item.id !== id);
        void save(next);
        return next;
      });
    },
    [save],
  );

  const toggleFollowLaunch = useCallback(
    async (launch: FollowedLaunch) => {
      if (followedLaunches.some((item) => item.id === launch.id)) {
        await unfollowLaunch(launch.id);
        return;
      }

      await followLaunch(launch);
    },
    [followLaunch, followedLaunches, unfollowLaunch],
  );

  const isFollowing = useCallback(
    (id: string) => followedLaunches.some((item) => item.id === id),
    [followedLaunches],
  );

  return {
    followedLaunches,
    loading,
    isFollowing,
    followLaunch,
    unfollowLaunch,
    toggleFollowLaunch,
    refresh: load,
  };
}
