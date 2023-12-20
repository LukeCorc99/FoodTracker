const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Parse incoming JSON requests
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

// Connect to MongoDB using async/await
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://LukeCorcoran:AVI23AVI@cluster0.ozbe7un.mongodb.net/');
}

// Define the schema for the 'food' collection
const foodSchema = new mongoose.Schema({
  foodName: String,
  ingredients: [
    {
      name: String,
      calories: Number,
      protein: Number,
    },
  ],
});

// Create a model for the 'food' collection
const foodModel = mongoose.model('food', foodSchema);

// Define the schema for the 'dayfoods' collection
const dailyFoodSchema = new mongoose.Schema({
  foodName: String,
  ingredients: [
    {
      name: String,
      calories: Number,
      protein: Number,
    },
  ],
});

// Create a model for the 'dayfoods' collection
const dailyFoodModel = mongoose.model('dayfoods', dailyFoodSchema);

// Handle DELETE request to delete a food item by ID
app.delete('/api/foods/:id', async (req, res) => {
  let food = await foodModel.findByIdAndDelete(req.params.id);
  res.send(food);
});

// Handle PUT request to update a food item by ID
app.put('/api/foods/:id', async (req, res) => {
  let food = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(food);
});

// Handle POST request to create a new food item
app.post('/api/foods', (req, res) => {
  foodModel.create({
    foodName: req.body.foodName,
    ingredients: req.body.ingredients,
  })
    .then(() => {
      res.send("Food Created");
    })
    .catch(() => {
      res.send("Food NOT Created");
    });
});

// Handle GET request for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Handle GET request to retrieve all food items
app.get('/api/foods', async (req, res) => {
  let foods = await foodModel.find({});
  res.json(foods);
});

// Handle GET request to retrieve a specific food item by ID
app.get('/api/foods/:identifier', async (req, res) => {
  let food = await foodModel.findById(req.params.identifier);
  res.send(food);
});

// Handle DELETE request to delete a daily food item by ID
app.delete('/api/dayfoods/:id', async (req, res) => {
  let food = await dailyFoodModel.findByIdAndDelete(req.params.id);
  res.send(food);
});

// Handle PUT request to update a daily food item by ID
app.put('/api/dayfoods/:id', async (req, res) => {
  let food = await dailyFoodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(food);
});

// Handle POST request to create a new daily food item
app.post('/api/dayfoods', (req, res) => {
  dailyFoodModel.create({
    foodName: req.body.foodName,
    ingredients: req.body.ingredients,
  })
    .then((createdDailyFood) => {
      res.send(createdDailyFood);
    })
    .catch(() => {
      res.send("Daily Food NOT Created");
    });
});

// Handle GET request to retrieve all daily food items
app.get('/api/dayfoods', async (req, res) => {
  let foods = await dailyFoodModel.find({});
  res.json(foods);
});

// Handle GET request to retrieve a specific daily food item by ID
app.get('/api/dayfoods/:identifier', async (req, res) => {
  let food = await dailyFoodModel.findById(req.params.identifier);
  res.send(food);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
