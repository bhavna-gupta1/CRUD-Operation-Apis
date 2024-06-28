const mongoose = require("mongoose");

const mongourl = "mongodb://localhost:27017/hotel";

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to database");
});

db.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from database");
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = db;
