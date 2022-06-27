export function getConfig() {
  if (process.env.PUBLIC_APP_ENV === 'prod') {
    return {
      API_URL: process.env.PUBLIC_API_URL_PROD,
    };
  }

  return {
    API_URL: process.env.PUBLIC_API_URL_DEV,
  };
}
