export async function getExpeditionDetail(id: string): Promise<Expedition> {
  const url = `${API_BASE_V23}expeditions/${id}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API svarade med fel: ${response.status}`);
  }

  return (await response.json()) as Expedition;
}
import { Launch, LaunchDetail } from "../types/Launch";
import { Expedition } from "../types/Expeditions";

const API_BASE = "https://ll.thespacedevs.com/2.2.0/";
const API_BASE_V23 = "https://ll.thespacedevs.com/2.3.0/";

type LaunchListItem = {
  id: string;
  name: string;
  net: string;
  image?: string | null;
  lsp_name?: string | null;
};

export async function getLaunches(): Promise<Launch[]> {
  const url = `${API_BASE}launch/upcoming/?limit=5&mode=list&ordering=net`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API svarade med fel: ${response.status}`);
  }

  const data = await response.json();
  return (data.results as LaunchListItem[]).map((item) => ({
    id: item.id,
    name: item.name,
    net: item.net,
    image: item.image ?? null,
    company: item.lsp_name ?? null,
  }));
}

export async function getLaunchDetail(id: string): Promise<LaunchDetail> {
  const url = `${API_BASE}launch/${id}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API svarade med fel: ${response.status}`);
  }

  return (await response.json()) as LaunchDetail;
}

export async function getExpeditions(): Promise<Expedition[]> {
  const url = `${API_BASE_V23}expeditions/?limit=10`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API svarade med fel: ${response.status}`);
  }

  const data = await response.json();
  return (data.results as Expedition[]).map((item) => ({
    ...item,
    company: item.mission_patches?.[0]?.agency?.name ?? null,
  }));
}
