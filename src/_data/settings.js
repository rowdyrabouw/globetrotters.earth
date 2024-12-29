export default () => {
  console.log(">> Running settings.js");
  return {
    now: new Date(),
    environment: process.env.NODE_ENV || "PRD",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    firestoreApiKey: process.env.FIREBASE_API_KEY,
    firestoreAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firestoreProjectId: process.env.FIREBASE_PROJECT_ID,
    firestoreStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firestoreMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firestoreAppId: process.env.FIREBASE_APP_ID,
  };
};
