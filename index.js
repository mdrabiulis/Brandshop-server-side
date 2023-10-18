const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS_KEY}@cluster0.ltbxnxt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

 async function run() {
  try {
    await client.connect();

    const CoffeesData = client.db("rabiulDB").collection("coffeesdata");
    const CoffeesFollows = client.db("rabiulDB").collection("coffeesFllows");



   

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
     }
  }
  run().catch(console.dir);
  
  app.get("/", (req, res) => {
    res.send("Hello Rabiul!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
