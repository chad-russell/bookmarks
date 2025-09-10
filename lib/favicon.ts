/**
 * Generates a URL to fetch a website's favicon using the Google S2 service.
 * @param url The URL of the website.
 * @returns The URL of the favicon, or a path to a default icon if the URL is invalid.
 */
export const getFaviconUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Using a well-known, reliable favicon service.
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
  } catch (error) {
    // Handle cases where the URL is invalid.
    return "/default-favicon.png"; // A placeholder icon in the public directory.
  }
};
