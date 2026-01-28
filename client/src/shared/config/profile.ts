export type ProfileSection = {
  title: string;
  description: string;
  slug?: string;
  cta?: string;
};

export const profileSections: ProfileSection[] = [
  {
    title: "Order history",
    description: "View your previous orders",
    slug: "orders",
    cta: "Open",
  },
  {
    title: "Discount coupons",
    description: "Ability to send coupons to customers",
    slug: "coupons",
    cta: "Open",
  },
  {
    title: "Message history",
    description: "Ability to view the history of inquiries and responses",
    slug: "messages",
    cta: "Open",
  },
  {
    title: "Secret floor",
    description:
      "Section where you can upload texts and photos, edited by the administrator",
    slug: "secret-floor",
    cta: "Open",
  },
  {
    title: "Catalogs",
    description: "Uploaded as electronic magazines",
    slug: "catalogs",
    cta: "Open",
  },
];
