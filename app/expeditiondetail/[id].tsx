import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import SpaceBackground from "../../components/SpaceBackground";
import { getExpeditionDetail } from "../../services/api";
import { COLORS } from "../../theme/colors";
import { Expedition } from "../../types/Expeditions";
import DetailHeader from "../../components/DetailHeader";

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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={COLORS.primaryNeon} size="large" />
        </View>
      </SpaceBackground>
    );
  }

  if (!expedition) {
    return (
      <SpaceBackground>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View>
            <DetailHeader
              title="Expedition"
              description="Kunde inte ladda expedition."
            />
          </View>
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
        <DetailHeader
          title={expedition.name}
          date={
            expedition.start ? expedition.start.split("T")[0] : "Okänd datum"
          }
          image={image}
          missionTitle={"Expedition"}
          description={undefined}
          spacestation={expedition.spacestation?.name}
          patchImage={expedition.mission_patches?.[0]?.image_url ?? null}
        />
      </ScrollView>
    </SpaceBackground>
  );
}
