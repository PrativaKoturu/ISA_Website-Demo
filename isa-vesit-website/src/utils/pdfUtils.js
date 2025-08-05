/**
 * Converts Google Drive sharing links to direct download/embed links
 * @param {string} driveUrl - The Google Drive sharing URL
 * @returns {string} - Direct download URL or original URL if not a Drive link
 */
export const convertDriveLinkToDirectLink = (driveUrl) => {
  if (!driveUrl) return '';

  // If it's already a local file, return as is
  if (driveUrl.startsWith('/') || driveUrl.startsWith('./') || driveUrl.includes('localhost')) {
    return driveUrl;
  }

  // Check if it's a Google Drive link
  const driveRegex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/file\/d\/|docs\.google\.com\/.*\/d\/)([a-zA-Z0-9-_]+)/;
  const match = driveUrl.match(driveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    // Return the direct download link
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // If it's not a Drive link, return as is
  return driveUrl;
};

/**
 * Gets the direct download link for Google Drive files
 * @param {string} driveUrl - The Google Drive sharing URL
 * @returns {string} - Direct download URL
 */
export const getDriveDownloadLink = (driveUrl) => {
  if (!driveUrl) return '';

  const driveRegex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/file\/d\/|docs\.google\.com\/.*\/d\/)([a-zA-Z0-9-_]+)/;
  const match = driveUrl.match(driveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    // Return the direct download link
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return driveUrl;
};

/**
 * Checks if a URL is a Google Drive link
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it's a Drive link
 */
export const isGoogleDriveLink = (url) => {
  if (!url) return false;
  return /(?:drive\.google\.com|docs\.google\.com)/.test(url);
};

/**
 * Gets the embed URL for Google Drive files (works better for PDFs)
 * @param {string} driveUrl - The Google Drive sharing URL
 * @returns {string} - Embed URL
 */
export const getDriveEmbedLink = (driveUrl) => {
  if (!driveUrl) return '';

  const driveRegex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/file\/d\/|docs\.google\.com\/.*\/d\/)([a-zA-Z0-9-_]+)/;
  const match = driveUrl.match(driveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    // Return the embed link that works well with iframes
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return driveUrl;
};

/**
 * Creates a proxy URL to bypass CORS restrictions
 * @param {string} url - The original URL
 * @returns {string} - Proxied URL
 */
export const createProxyUrl = (url) => {
  if (!url) return '';
  
  // List of CORS proxy services (use with caution in production)
  const proxies = [
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/'
  ];
  
  // Use the first proxy
  return `${proxies[0]}${encodeURIComponent(url)}`;
};

/**
 * Attempts to load PDF with fallback methods
 * @param {string} originalUrl - The original PDF URL
 * @returns {Promise<string>} - Working URL or error
 */
export const getWorkingPdfUrl = async (originalUrl) => {
  if (!originalUrl) return '';

  // Try different URL formats
  const urlsToTry = [
    originalUrl,
    convertDriveLinkToDirectLink(originalUrl),
    createProxyUrl(convertDriveLinkToDirectLink(originalUrl))
  ];

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      console.log(`Failed to load ${url}:`, error.message);
    }
  }

  // If all fail, return the original URL
  return originalUrl;
};