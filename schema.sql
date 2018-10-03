 DROP TABLE IF EXISTS recipes;

CREATE TABLE IF NOT EXISTS recipes ( 
  id SERIAL PRIMARY KEY, 
  recipe_title VARCHAR(255),
  recipe_image VARCHAR(255),  
  recipe_id VARCHAR (255) 
);

