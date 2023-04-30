const express = require('express')
const app = express()
const cors = require('cors') 
const MongoClient = require('mongodb').MongoClient

let db, collection

const url = "mongodb+srv://alinainch:Veggie123@cluster0.olzdjfg.mongodb.net/?retryWrites=true&w=majority"
const dbName = "demo"

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!")
    });
});

app.use(cors())

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/js/main.js', (request, response)=>{
    response.sendFile(__dirname + '/js/main.js')
})
app.get('/css/style.css', (request, response)=>{
  response.sendFile(__dirname + '/css/style.css')
})

//http request to get new endpoint. 
app.get('/history', (request, response)=>{
  db.collection('history').find().toArray((err, result) => {
    if (err) return console.log(err)
    response.json({result: result})
  })
})

app.get('/palindrome/:word',(request,response)=>{
    const userInput = request.params.word.toLowerCase().trim()
    const strReverse = userInput.split('').reverse().join('')
    const status = userInput === strReverse ? 'Palindrome' : 'Not a palindrome'
    const objToJson = {
      status: status //dynamic. the second status is from the tern operator 
    }
    //store this in db before sending the json object to the client
    // db.push({word: userInput, status: status})
    db.collection('history').insertOne({word: userInput, status: status}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      response.json(objToJson)
    })
    
})


