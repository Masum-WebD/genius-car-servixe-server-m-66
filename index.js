const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { get } = require("express/lib/response");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uvhc9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const geniusCollection = client.db("GeniusCar").collection("Service");
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = geniusCollection.find(query);
      const services = await cursor.toArray();
      res.send(services)
    });

    app.get('/service/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectId(id)}
        const service= await geniusCollection.findOne(query);
       res.send(service) 
    });
    //POST
    app.post('/service',async (req, res) => {
        const doc=req.body
        const result = await geniusCollection.insertOne( doc)
        res.send(result)
    });
    //DELEte
    app.delete('/service/:id',async(req,res)=>{
      const id =req.params.id;
      const query={_id:ObjectId(id)}
      const result =await geniusCollection.deleteOne(query)
      res.send(result)
    })


  }
   finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Genius car service");
});

app.listen(port, () => {
  console.log("listening on port:5000");
});
//  DB_USER= dbuser;
// DB_PASS=tLx5GLvcCUgn8Pwz;
