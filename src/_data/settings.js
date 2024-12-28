export default () => {
  console.log(">> Running settings.js");
  return {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    environment: process.env.NODE_ENV || "PRD",
    now: new Date(),
  };
};
