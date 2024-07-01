const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001;
require('dotenv').config()



// MIDDLEWARE -> connects express to the front end
app.use(cors())
app.use(express.json())

/*
user: ralao
password: 08101997
*/

// MONGODB CONFIGURATION

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@restaurant-cluster.8goitjw.mongodb.net/?appName=restaurant-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() { // main function to connect to MongoDB
  try {
    await client.connect();

    //database & collections
    const menuCollections = client.db("restaurant-client").collection("menu")
    const cartCollections = client.db("restaurant-client").collection("cartItems")

    //all menu items operations
    app.get("/menu", async(req, res) => {
      const  result = await menuCollections.find().toArray();
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    /*await client.close();*/
}
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello developers!')
})

app.listen(port, () => {
  console.log(`Restaurant application listening on port ${port}`)
})
