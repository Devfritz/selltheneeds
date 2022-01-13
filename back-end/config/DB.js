const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log(`connection database successfully to ${db.connection.host} ✔`);
  } catch (error) {
    console.error(`database connection error : ${error.message} 🔥`);
    process.exit(1);
  }
};

module.exports = connectDB;
