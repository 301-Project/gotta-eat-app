'use strict';

console.log('in app.js');

let mainNav = document.getElementById('js-navigation');
let bookmark = document.getElementById('js-bookmark');
let recipe = document.getElementById('js-recipe');


let navBarToggle = document.getElementById('js-navbar-toggle');
let bookmarkToggle = document.getElementById('js-bookmark-toggle');
let recipeToggle = document.getElementById('js-recipe-toggle');

navBarToggle.addEventListener('click', function(){
  mainNav.classList.toggle('active');
});
bookmarkToggle.addEventListener('click', function(){
  bookmark.classList.toggle('active');
});
recipeToggle.addEventListener('click', function(){
  recipe.classList.toggle('active');
});