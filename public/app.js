'use strict';

console.log('in app.js');

let mainNav = document.getElementById('js-navigation');
let bookmark = document.getElementById('js-bookmark');

let navBarToggle = document.getElementById('js-navbar-toggle');
let bookmarkToggle = document.getElementById('js-bookmark-toggle');

navBarToggle.addEventListener('click', function(){
  mainNav.classList.toggle('active');
});
bookmarkToggle.addEventListener('click', function(){
  bookmark.classList.toggle('active');
});