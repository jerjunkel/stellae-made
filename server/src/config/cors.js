import cors from "cors";
const whitelist = [
  "http://localhost:",
  "https://manage.telidesk.com",
  "https://signup.telidesk.com",
];
let options = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "development" && !origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Options"],
};

module.exports = (app) => {
  app.use(cors(options));
};
