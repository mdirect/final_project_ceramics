export type FilterGroup = {
  title: string;
  options: string[];
};

export const shopFilters: FilterGroup[] = [
  {
    title: "Shape",
    options: ["Painted image", "Relief", "Three-dimensional"],
  },
  {
    title: "Color",
    options: ["Colourful", "White", "Black", "Yellow", "Green"],
  },
  {
    title: "Paint material",
    options: [
      "Glaze",
      "Engobe",
      "Acrylic",
      "Epoxy resin",
      "Light-reflecting pigment",
    ],
  },
  {
    title: "Suspension",
    options: ["Chain", "Beading wire", "Memory wire", "Decorative cord"],
  },
  {
    title: "Composition",
    options: ["Multi-part jewelry", "Single-piece jewelry"],
  },
  {
    title: "Availability",
    options: ["Regularly", "May be repeated", "Part of collection", "Single piece"],
  },
  {
    title: "Motifs",
    options: [
      "Seal",
      "Bird",
      "Camel",
      "Antelope",
      "Deer",
      "Lizard",
      "Bear",
      "Squirrel",
      "Beetle",
      "Spider",
      "Donkey",
      "Cat",
    ],
  },
];

