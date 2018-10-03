`use strict`;

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

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
app.get('/get-id', getRecipeId);

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

function getRecipeId(request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${request.query.search}&limitLicense=false&number3&ranking=1`;

  console.log('recipe_id');
  return superagent.get(url)
    .set('X-Mashape-Key', process.env.FOOD_API_KEY)
    .set('Accept', 'application/json')
    .then(function (result) {
      console.log(result.status, result.body)
      result.body.map(recipe => new Recipes(recipe))
    })
    .then(searchResult => response.render('pages/searches/recipe', {
      recipeArray: searchResult
    }))
    .catch(error => handleError(error, response));
}
