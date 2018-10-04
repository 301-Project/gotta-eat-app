# Project 301 Overview - Gotta Eat!
This is a full-stack application that lets a user search the Spoonacular API for recipes based on the ingredients they input They then make a selection from a list of recipes that use those ingredients and may save specific recipes to a PostgreSQL database for later use. 

## Deployment
Users will need to go to https://gotta-eat-app.herokuapp.com/ and start searching for recipes on the home page.

## File Structure

```

├── README.md
├── public
|   └── styles
|       └──
├── server.js
└── views
    ├── index.ejs
    ├── pages
    │   |
    │   │   
    │   │   
    │   ├── error.ejs
    │   └── searches
    │       ├── new.ejs
    │       └── show.ejs
    └── partials
        ├── footer.ejs
        ├── head.ejs
        └── header.ejs
```

## Built With
HTML, CSS, JavaScript, jQuery, node.js, superagent, ejs, postgres, express, dotenv, SQL, 

## Versioning
0.1 Backend proof of life; first API query functionality
0.2 Second API query functionality
0.3 Render recipe details with API object
0.4 SQL database created; user save recipe to db functionality (MVP)
0.5 CSS styling
0.6 Display user recipes
1.0 First functional release

## Sample Data Files
Search Recipe by Ingredient (API Query 1 that return basic recipe information and unique recipe id used in second API query): https://github.com/301-Project/gotta-eat-app/blob/master/data/step-3-search-recipe-by-ingredients.json

Get Recipe (Second API query that uses recipe id selected by user): https://github.com/301-Project/gotta-eat-app/blob/master/data/step-4-get-recipe.json

## Authors
Joyce Liao, Zahra Mohamed, Derrick Hwang and Dave Muench

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
We would like to thank the instructors at Code Fellows for providing instructions and guidance
in the completion of this project. Also a special thanks to Evan Slaton for providing much needed aid in reconstructing our backend code.

At a minimum, your README.md should include the following:

The overall problem domain and how the project solves those problems
Clearly defined database schemas
