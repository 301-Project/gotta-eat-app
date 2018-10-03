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

// app.get('/get-recipe', getRecipe);
app.get('/render-recipe', (request, response) => response.render('pages/searches/inventory'));

// Catch-all error handler
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Helper Functions
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong')
}

function Recipes(response) {
  this.recipe_id = response.id;
  this.recipe_title = response.title;
  this.recipe_image = response.image;
  this.used_ingredient_count = response.usedIngredientCount;
  this.missed_ingredient_count = response.missedIngredientCount;
}

function getProductId(request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${request.query.search}&limitLicense=false&number3&ranking=1`;
  return unirest.get(url)
    .header('X-Mashape-Key', process.env.FOOD_API_KEY)
    .header('Accept', 'application/json')
    .end(function (result) {
      console.log(result.status, result.body.map(element => element.id))
      result.body.map(recipe => {
        let idArray = new Recipes(recipe)
        console.log(idArray); // TODO: Delete this console log when completed
        return idArray;
      })
    })
}
