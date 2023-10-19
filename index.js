const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS_KEY}@cluster0.ltbxnxt.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    client.connect();
    const AssignmentData = client.db("assignmentDB").collection("assignmentdata");




  app.get("/products", async(req, res) =>{
    const cursor = AssignmentData.find();
    const result = await cursor.toArray();
    res.send(result)
  
  })


// product
 



  app.get("/products/:BrandName", async(req, res) =>{
    const Brandname = req.params.BrandName;
    const query ={BrandName: (Brandname)};
    const cursor = AssignmentData.find(query);
    const result = await cursor.toArray();
    res.send(result)
    // console.log(result);
  
  })


 

  app.post("/products", async (req, res) => {
    const productsData = req.body;
    const result = await AssignmentData.insertOne(productsData);
    res.send(result);
    // console.log(productsData);
  });







// put




  app.delete('/products/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await AssignmentData.deleteOne(query);
    res.send(result);
  })






    client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.send("Hello Rabiul new server!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
