const express = require('express');
const path = require('path');
const cron = require('node-cron');
const MongoClient = require('mongodb').MongoClient;

const getSwellnetData = require('./scrapers/swellnet/swellnet-scraper');

const app = express();
const port = process.env.PORT || '8002';

app.get('/', (req, res) => {
  res.status(200).send('Surf forecast backend');
});

// Testing

getSwellnetData().then(res => {
  console.log(res);
});

//

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

// Mongo Testing
// async () => {
//   await client.connect(err => {
//     const collection = client
//       .db('surf-forecast-db')
//       .collection('swellnet-forecast-data-aus');

//     collection.insertOne({ name: 'liam' });
//     client.close();
//   });
// };

async () => {
  const uri =
    'mongodb+srv://lswift:year1172@cluster0-olbqt.mongodb.net/test?retryWrites=true&w=majority';

  const client = new MongoClient(uri, {
    seNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const collection = client
      .db('surf-forecast-db')
      .collection('swellnet-forecast-data-aus');

    await collection.insertOne({ name: 'liam' });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

//

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
