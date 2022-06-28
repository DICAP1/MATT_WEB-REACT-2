export function getConfig() {
  if (process.env.REACT_APP_PUBLIC_APP_ENV === 'prod') {
    return {
      API_URL: process.env.REACT_APP_PUBLIC_API_URL_PROD,
    };
  }
  console.log('im here', process.env.REACT_APP_PUBLIC_API_URL_DEV)
  return {
    API_URL: process.env.REACT_APP_PUBLIC_API_URL_DEV,
  };
}
