

`use strict`;

// Application Dependencies
const express = require('express');
const unirest = require('unirest');

// Load environment variables from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

//Application Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//Set the view engine for server side templating
app.set('view engine', 'ejs');

//API routes - rendering the search form
app.get('/', (request, response) => response.render('index'));
app.get('/get-id', getProductId);

// Catch-all error handler
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Helper Functions
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong')
}

function Ingredients (response) {
  this.ingredients_id = response.products.id;
}

function getProductId (request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?maxCalories=5000&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=0&minCarbs=0&minFat=0&minProtein=0&number=3&offset=0&query=${request.query.search}`;

  return unirest.get(url)
    .header('X-Mashape-Key', 'process.env.FOOD_API_KEY')
    .header('Accept', 'application/json')
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    })
    .then(apiResponse => apiResponse.body.map(ingredient => new Ingredients(ingredient)))
    .then(result => response.render())
    // .catch(error => handleError(error, response));
}

unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=banana+milk+sugar+pineapple&number=3&ranking=1")
.header("X-Mashape-Key", "wbhi6grFr8mshx3O5F5ZxYqD6fSEp1ZXkAujsnPiZGi50hvt0N")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
