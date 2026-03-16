import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../theme/colors";

type Star = {
  id: number;
  top: `${number}%`;
  left: `${number}%`;
  opacity: number;
  size: number;
};

export default function SpaceBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const stars = useMemo<Star[]>(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%` as `${number}%`,
      left: `${Math.random() * 100}%` as `${number}%`,
      opacity: Math.random() * 0.7 + 0.3,
      size: Math.random() * 2.5 + 1,
    }));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {stars.map((star) => (
          <View
            key={star.id}
            style={[
              styles.star,
              {
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  content: {
    flex: 1,
  },
  star: {
    position: "absolute",
    backgroundColor: "#fff",
  },
});
