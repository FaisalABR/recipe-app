// https://api.edamam.com/search?q=pizza&app_id=877880bf&app_key=4574e52887ec3096c57f9abbd7982f01 api

const search = document.querySelector(".search-bar ");
const find = document.querySelector(".find");
const cards = document.querySelector(".cards");
const result = document.querySelector(".result");
const APP_ID = "877880bf";
const API_KEY = "4574e52887ec3096c57f9abbd7982f01";

//RECIPE ELEMENT
const viewRecipe = document.querySelector(".view-recipe");
const ingredients = document.querySelector(".ingredient-list");

find.addEventListener("click", function (e) {
  e.preventDefault();
  fetchRecipe(search.value);

  result.innerText = `All result for ${search.value}`;
  search.value = "";
});

viewRecipe.addEventListener("click", function () {
  fetchRecipe();
});

async function fetchRecipe(searchValue) {
  await fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${API_KEY}&to=20`
  )
    .then((response) => response.json())
    .then((data) => {
      generateHTML(data.hits);
      generateNewPage(data.hits);
    });
}

function generateNewPage(data) {
  let generatedNewPage = "";
  data.map((e) => {
    generateNewPage = `
    <li>${e.ingedient}</li>
    `;
  });
}

function generateHTML(data) {
  let generatedHTML = "";
  data.map(
    (e) =>
      (generatedHTML += `
    <div class="card">
       <img src="${e.recipe.image}" alt="" />
       <div class="food-name">${e.recipe.label}</div>
       <div class="calories">${e.recipe.calories.toFixed(2)} Cal</div>
       <div class="health-label">Health: ${e.recipe.healthLabels[0]},${
        e.recipe.healthLabels[1]
      }, and ${e.recipe.healthLabels[2]}</div>
      <a href="${
        e.recipe.url
      }" class="view-recipe" target="recipePage.html">View Recipe</a>
    </div>
    `)
  );
  cards.innerHTML = generatedHTML;
}
