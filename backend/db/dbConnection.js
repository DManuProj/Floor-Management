const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      (MONGODB_URL =
        "mongodb+srv://dmw:123ZXCvbn@floorcluster.mqzjl.mongodb.net/?retryWrites=true&w=majority&appName=FloorCluster"),
      {}
    );
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed" + error);
  }
};

module.exports = dbConnection;
