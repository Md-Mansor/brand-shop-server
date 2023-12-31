const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;





// middleware
app.use(cors());
app.use(express.json());

// automotive
// oTGYkuHKrfAHDmXa






const uri = "mongodb+srv://automotive:oTGYkuHKrfAHDmXa@cluster0.wyk3bvm.mongodb.net/?retryWrites=true&w=majority";

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
        // await client.connect();

        const brandCollection = client.db('brandDB').collection('brand')
        const dataCollection = client.db('brandDB').collection('data')

        app.get('/brand', async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/brand', async (req, res) => {
            const newBrand = req.body;
            // console.log(newBrand);
            const result = await brandCollection.insertOne(newBrand);
            res.send(result);
        })

        // get data
        app.get('/data', async (req, res) => {
            const cursor = dataCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/data', async (req, res) => {
            const newData = req.body;
            const result = await dataCollection.insertOne(newData);
            res.send(result);
        })

        app.get('/data/:id', async (req, res) => {
            const id = req.params.id;
            console.log('req for this brand product: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await dataCollection.findOne(query)
            res.send(result)
        })


        // Connect the client to the server	(optional starting in v4.7)

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('auto server is running')
})


app.listen(port, () => {
    console.log(`server is running at port:${port}`);
})