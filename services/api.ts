import { Launch } from "../types/Launch";
import { Expedition } from "../types/Expeditions";

const API_BASE = "https://ll.thespacedevs.com/2.2.0/";
const API_BASE_V23 = "https://ll.thespacedevs.com/2.3.0/";

export async function getLaunches(): Promise<Launch[]> {
  try {
    // Hämtar launches från API:et
    const url = `${API_BASE}launch/upcoming/?limit=5&mode=list&ordering=net`;

    const response = await fetch(url);

    // Kontroll
    if (!response.ok) {
      throw new Error(`API svarade med fel: ${response.status}`);
    }

    const data = await response.json();

    console.log("Hämtade launches:", data);

    if (data.results.length > 0) {
      console.log("Nästa raket heter:", data.results[0].name);
      console.log("Datum:", data.results[0].net);
    }

    return data.results as Launch[];
  } catch (error: any) {
    console.error("Kunde inte hämta launches:", error.message);
    return [];
  }
}

export async function getExpeditions(): Promise<Expedition[]> {
  try {
    const url = `${API_BASE_V23}expeditions/?limit=10`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API svarade med fel: ${response.status}`);
    }

    const data = await response.json();
    return data.results as Expedition[];
  } catch (error: any) {
    console.error("Kunde inte hämta expeditions:", error.message);
    return [];
  }
}
