const MongoClient = require('mongodb').MongoClient;

const connectMongoDB = async (database) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    return client.db(database);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMongoDB;
