`use strict`;

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client('postgres://localhost:5432/food_app');
client.connect();
client.on('error', err => console.log(err));

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
app.post('/picked-recipe/:id', getOneRecipe); //event handler 
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


function getOneRecipe(request, response) {
  let pickedRecipe = request.params.id;
  console.log( 'this got picked', pickedRecipe);
  let SQL = 'INSERT INTO recipes(recipe_id) VALUES ($1) RETURNING id;';
  let values = [pickedRecipe];

  return client.query(SQL, values)
    .then(results => response.redirect(`/recipes/${results.rows[0].id}`))
    .catch(err => handleError(err, response));
  
}

