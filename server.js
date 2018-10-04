`use strict`;

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
// Load environment variables from .env file
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));


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
app.post('/picked-recipe/:id', getOneRecipe);
app.post('/recipes', addRecipe);

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
  let recipeArray = [];

  return superagent.get(url)
    .set('X-Mashape-Key', process.env.FOOD_API_KEY)
    .set('Accept', 'application/json')

    .then(apiResponse => {
      recipeArray = apiResponse.body.map(element => {
        let summary = new Recipes(element);
        return summary;

      });
      return recipeArray;
    })
    .then(searchResult => response.render('pages/searches/recipe', {
      recipeArray: searchResult
    }))
    .catch(error => handleError(error, response));
}

function Resultrecipe(response) {
  this.result_title = response.title || 'the girl has no name';
  this.result_image = response.image || 'no image available';
  this.result_url = response.spoonacularSourceUrl || 'no source';
  this.diets = response.diets || 'No dietary restriction available';
}

function getOneRecipe(request, response) {
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${request.params.id}/information?includeNutrition=false`
  
  return superagent.get(url)
    .set('X-Mashape-Key', process.env.FOOD_API_KEY)
    .set('X-Mashape-Host', 'spoonacular-recipe-food-nutrition-v1.p.mashape.com')
    .then(apiResponse => {
      return new Resultrecipe(apiResponse.body);
    })
    .then(searchResult => response.render('pages/searches/result', {
      recipeResultObject: searchResult
    }))
    .catch(error => handleError(error, response));
}

function addRecipe(request, response) {
  let { result_title, result_image, result_url, diets} = request.body;

  let SQL = 'INSERT INTO recipes(result_title, result_image, result_url, diets) VALUES ($1, $2, $3, $4);';

  let values = [result_title, result_image, result_url, diets];
  client.query(SQL, values)
    .catch(error => handleError(error, response))
}

