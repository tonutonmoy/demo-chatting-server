const express = require('express');

const app = express()

const cors = require('cors')
require("dotenv").config();

// const socket = require('socket.io')

// const PORT = 4047;

const port = process.env.PORT||  5000;


// const bodyParser = require('body-parser');

// app.use(bodyParser.json());



// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['POST,GET,PUT,PATCH', 'DELETE', 'OPTIONS']
// }))



app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {

  res.send('hello')
})


// const server = app.listen(PORT, () => {
//   console.log(PORT, 'is running')
// })




//    socket

// Lr6VeSkJEEtUzsbr





// const io = socket(server, {
//   cors: {
//     origin: "*",


//   }
// });













const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.andsvfa.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("socket");
    const socketUser = database.collection("socket-user");








    //socket code
    // io.on('connection', (socket) => {




    //   socket.on('join_room',async (chat,email) => {

        
    //     const options = { upsert: true };

       



    //     const filter = { userEmail: email };

        


    //     const updateDoc = {
    //       $set: {
    //         chat: chat
    //       },
    //     };

    //     const update= await socketUser.updateOne(filter, updateDoc);

    //     if(update.modifiedCount>0){


    //       const result = await socketUser.findOne({userEmail: email});


    //       if(result){

    //         socket.emit('receive_message',result )
  
    //       }
          
    //     }

    //     console.log(update)

    //     console.log(chat,email)


        

       

       

    //   });

  


    //   socket.on('disconnect', () => {
    //     // console.log('user disconnected');
    //   });


    // });
    // io. end





    // post user data

    app.post('/createUser', async (req, res) => {

      const userData = req?.body


      const result = await socketUser.insertOne(userData)

      console.log(req?.body)

      res.send(result)

    })




    // post chat
    app.post('/postChat', async (req, res) => {


      const email= req?.query?.email;

      const chat= req.body
       
      const options = { upsert: true };

       



      const filter = { userEmail: email };

      


      const updateDoc = {
        $set: {
          chat: chat
        },
      };

      const update= await socketUser.updateOne(filter, updateDoc);


      console.log(update)

     res.send(update)
  
  
  })




    // get userdata
    app.get('/userData', async (req, res) => {


      const email=req?.query?.email
   
      
        console.log(email)

      const result = await socketUser.findOne({userEmail: email})

      console.log(result)

      if(!result){

        return res.send({nei:'nei'})
      }

      res.send(result)

    })

    // alluser data
    app.get('/allUserData', async (req, res) => {


    
   
      
        

      const result = await socketUser.find().toArray()

      // console.log(result)

     

      res.send(result)

    })


    // singleUser data
    app.get('/singleUserData/:id', async (req, res) => {


        const id=req.params.id
   
      console.log(id)
        

      const result = await socketUser.findOne({_id: new ObjectId(id)})

      console.log(id)

     

      res.send(result)

    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
















app.listen(port,()=>{

  console.log(port,'is running')

})