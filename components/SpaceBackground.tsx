import React, { useMemo } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { COLORS } from "../theme/colors";

type Star = {
  id: number;
  top: `${number}%`;
  left: `${number}%`;
  opacity: number;
  size: number;
  color: string;
};

const { width } = Dimensions.get("window");

export default function SpaceBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const stars = useMemo<Star[]>(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%` as `${number}%`,
      left: `${Math.random() * 100}%` as `${number}%`,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.8 ? COLORS.primaryNeon : "#fff",
    }));
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.nebulasContainer, { pointerEvents: "none" }]}>
        <View
          style={[
            styles.nebula,
            {
              top: -width * 0.4,
              left: -width * 0.2,
              backgroundColor: COLORS.primaryNeon,
              width: width * 1.2,
              height: width * 1.2,
              opacity: 0.03,
            },
          ]}
        />
        <View
          style={[
            styles.nebula,
            {
              bottom: -width * 0.2,
              right: -width * 0.4,
              backgroundColor: COLORS.accentNeon,
              width: width * 1.2,
              height: width * 1.2,
              opacity: 0.02,
            },
          ]}
        />
      </View>

      <View style={[styles.starsContainer, { pointerEvents: "none" }]}>
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
                backgroundColor: star.color,
              },
            ]}
          />
        ))}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  nebulasContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  nebula: {
    position: "absolute",
    borderRadius: 999,
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  star: {
    position: "absolute",
  },
  // noPointerEvents style removed; use pointerEvents prop directly
});
