export type TagGroup =
  | "shape"
  | "color"
  | "material"
  | "suspension"
  | "composition"
  | "availability"
  | "motif";

export type Tag = {
  id: string;
  label: string;
  group?: TagGroup;
};

