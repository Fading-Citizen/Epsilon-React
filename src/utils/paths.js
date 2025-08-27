/**
 * Utility function to get the correct asset path for deployment
 * @param {string} path - The asset path starting with '/'
 * @returns {string} - The correctly formatted path for the current environment
 */
export const getAssetPath = (path) => {
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return path;
  }
  
  // In production (GitHub Pages), prepend the base path
  const basePath = import.meta.env.BASE_URL || '/Epsilon-React/';
  return `${basePath}${path.startsWith('/') ? path.slice(1) : path}`;
};

/**
 * Get the base URL for the application
 * @returns {string} - The base URL
 */
export const getBaseUrl = () => {
  return import.meta.env.BASE_URL || '/';
};
