 DROP TABLE IF EXISTS recipes;

CREATE TABLE  recipes ( 
  id SERIAL PRIMARY KEY, 
  result_title VARCHAR(255),
  result_image VARCHAR(255),  
  result_url VARCHAR (255), 
  diets VARCHAR (255) 
);

