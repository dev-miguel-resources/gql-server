const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("DB CONNECTION ERR", err);
    process.exit(1);
  }
};

module.exports = connectDB;
