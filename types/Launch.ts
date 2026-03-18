export type Launch = {
  id: string;
  name: string;
  net: string;
  image?: string | null;
  company?: string | null;
};

export type LaunchDetail = {
  id: string;
  name: string;
  net: string;
  image: string | null;
  mission?: {
    name?: string | null;
    type?: string | null;
    description?: string | null;
    image?: string | null;
    orbit?: {
      name?: string | null;
      abbrev?: string | null;
    } | null;
  } | null;
};
