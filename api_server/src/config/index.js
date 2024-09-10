import "dotenv/config";

export default {
  API_KEY: process.env.API_KEY,
  API_ENDPOINT: process.env.API_ENDPOINT,
  PORT: process.env.PORT || 5000,
  ENV: process.env.ENVIRONMENT || "development",
};
