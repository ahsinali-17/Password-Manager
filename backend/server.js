const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passManager';

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");

    // get all passwords
    app.get('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });
    //save a password in db
    app.post('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
       const insertResult = await collection.insertOne(req.body);
       res.json({"success":true});
    });

    //delete a password from db
    app.delete('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      let password = req.body;
       const insertResult = await collection.deleteOne(password);
       res.json({"success":true});
    });

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    // Handle error, maybe stop the server or perform some fallback action
  });
