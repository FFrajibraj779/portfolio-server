const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrjyghr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const projectCollection = client.db("Portfolio").collection("projectData");

async function portfolio (){

    try{
               app.get('/projectdata', async(req, res)=>{
                 const query = {}
                 const data = await projectCollection.find(query).toArray();
                 res.send(data);
                 console.log(data);
               })

           app.get('/projectdata/:id', async(req, res)=>{
                       const id = req.params.id; 
                       const query = {_id:ObjectId(id)};
                       const data = await projectCollection.findOne(query);
                       res.send(data)
                    console.log(data);
           })

    }

    catch{

    }
}

portfolio();





app.get('/', (req, res)=>{
    res.send('md rajikul islam server')
})

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
})