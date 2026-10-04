// Helper function to get correct path for public assets.
// Prefixes the path with Vite's BASE_URL so assets resolve under the deploy base.
export const getPublicPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl + cleanPath;
};
