export const routes = {
  home: "/",
  we: "/we",
  shop: "/shop",
  prestige: "/prestige",
  projects: "/projects",
  events: "/events",
  contacts: "/contacts",
  policy: "/policy",
  signin: "/signin",
  cart: "/cart",
  collection: (slug: string) => `/collections/${slug}`,
  product: (id: string) => `/products/${id}`,
  projectPerson: (person: string) => `/projects/${person}`,
};

