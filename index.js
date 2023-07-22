const express = require("express")
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors())
app.use(express.json())
//college-server vm64zj9wIAx2HtdK


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ujahhqg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)f
        await client.connect();

        const collegeCollection = client.db("collegeDataBasePortal").collection("colleges");


        app.get("/colleges", async (req, res) => {
            const query = {};
            const result = await collegeCollection.find(query).toArray();
            res.send(result);
        })
        app.get("/college/:id", async (req, res) => {
            const id = req.params.id;
            const query={_id: new ObjectId(id)}
            const result = await collegeCollection.findOne(query)
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("College Portal Server is running")
})
app.listen(port, () => {
    console.log(`Port Is Running On Server ${port}`);
})