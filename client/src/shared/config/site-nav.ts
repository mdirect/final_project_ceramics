export type NavItem = {
  label: string;
  href: string;
};

export const topNav: NavItem[] = [
  { label: "WE", href: "/we" },
  { label: "SHOP", href: "/shop" },
  { label: "PRESTIGE", href: "/prestige" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACTS", href: "/contacts" },
  { label: "POLICY", href: "/policy" },
];

export const sideNav: NavItem[] = [
  { label: "Sign in", href: "/signin" },
  { label: "Cart", href: "/cart" },
];

