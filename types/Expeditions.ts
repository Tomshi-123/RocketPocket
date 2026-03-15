export type Expedition = {
  id: number;
  name: string;
  start: string | null;
  spacestation?: {
    name: string;
    image?: {
      thumbnail_url?: string | null;
    } | null;
  } | null;
  mission_patches?: {
    image_url?: string | null;
  }[];
};
