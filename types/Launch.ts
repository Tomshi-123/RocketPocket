export type Launch = {
  id: string;
  name: string;
  net: string;
  image?: string | null;
};

export type LaunchDetail = {
  id: string;
  name: string;
  net: string;
  image: string | null;

  missionName: string | null;
  missionType: string | null;
  missionDescription: string | null;
  missionImage: string | null;

  orbitName: string | null;
  orbitAbbrev: string | null;
};