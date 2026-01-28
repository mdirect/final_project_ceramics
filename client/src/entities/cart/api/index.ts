export const cartApi = {
  get: "/cart",
  add: "/cart",
  update: (productId: number) => `/cart/${productId}`,
  remove: (productId: number) => `/cart/${productId}`,
  clear: "/cart",
};

