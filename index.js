const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');

const app = express();


//midllewere
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3vw1ff.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const servicesCollection = client.db('geniusCar').collection('service');
  
        
        // get users
        app.get('/service', async(req, res) =>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        

        app.get('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.send(service);
        });
        

        app.post('/service',async(req,res)=>{
            const newService =req.body;
            const result =await servicesCollection.insertOne(newService);
            res.send(result);
        })

        app.delete('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.deleteOne(query);
            res.send(service);
        });
        
    }
    finally{
  
    }
  }
  
  run().catch(console.dir);
  



app.get('/',(req,res) =>{
    res.send("Running Genius Server")
})

app.listen(port,()=>{
    console.log("listening to port",port)
})
