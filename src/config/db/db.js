const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "Mongo DB connected successfully",
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.log("Error while connecting mongoDB", error.message);
  }
};

module.exports = connectDB;
