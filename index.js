const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o4muq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("freewill");
        const serviceCollection = database.collection("services");

        // Get Api
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();

            res.send(services);
        })

        /* 
            https://i.ibb.co/PmN9Zzw/animal-Shelter.png
https://i.ibb.co/jTfZbyn/babySit.png
https://i.ibb.co/FxxqjLX/bird-House.png

https://i.ibb.co/d22Nc2v/clean-Water.png
https://i.ibb.co/tcKVsXj/clearn-Park.png
https://i.ibb.co/mHPVN43/cloth-Swap.png
https://i.ibb.co/J5Zh4NX/drive-Safety.png
https://i.ibb.co/FxYL62v/extra-Volunteer.png
https://i.ibb.co/MV8ngtR/food-Charity.png
https://i.ibb.co/9V4F3Ks/good-Education.png
https://i.ibb.co/WGyC5qd/ITHelp.png
https://i.ibb.co/nchrRk0/library-Books.png
https://i.ibb.co/7r1XGV2/music-Lessons.png
https://i.ibb.co/9ZXYXX6/newBooks.png
https://i.ibb.co/9TSPbDW/refuse-Shelter.png
https://i.ibb.co/5jkmj3b/river-Clean.png
https://i.ibb.co/zXm31vm/school-Suffiles.png
https://i.ibb.co/6grmNcF/study-Group.png
https://i.ibb.co/GVPKNqR/stuffed-Animals.png
https://i.ibb.co/2SV5snR/vote-Register.png
        */

        app.post('/services', async (req, res) => {
            const services = req.body;
            const result = await serviceCollection.insertOne(services);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
};
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Welcome to FreeWill Server');
});

app.listen(port, () => {
    console.log('Listening port', port);
});