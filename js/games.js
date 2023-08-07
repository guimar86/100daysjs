"use strict";

let gamesList = [];
let galleryItemsPath = "../resources/games.json";
let platformFilterList = [];
let genreFilterList=[];
let platformSearch = document.querySelector("#platformSearch");
let genreSearch = document.querySelector("#genreSearch");

//load gallery
readJSONFile(galleryItemsPath)
  .then((jsonData) => {
    if (jsonData) {
      //check if filter is filled
      jsonData.games.forEach((game) => createGameCard(game));
    }
  })
  .catch((error) => {
    console.error("Error reading JSON file:", error);
  });

async function readJSONFile(url) {
  try {
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    gamesList = await response.json();
    platformFilterList = fillPlatformFilterList(gamesList);
    genreFilterList=fillGenreSearchList(gamesList);
    return gamesList;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return null;
  }
}

const fillPlatformFilterList = function (gameList) {
  console.log(gamesList);
  platformFilterList = gamesList.games.map((property) => property.platform);
  platformFilterList = [...new Set(platformFilterList)];
  platformFilterList.forEach((f) => {
    const option = document.createElement("option");
    option.value = f;
    option.text = f;
    platformSearch.appendChild(option);
  });
  return platformFilterList;
};


const fillGenreSearchList = function (gameList) {
  console.log(gamesList);
  genreFilterList = gamesList.games.map((property) => property.genre);
  genreFilterList = [...new Set(genreFilterList)];
  genreFilterList.forEach((f) => {
    const option = document.createElement("option");
    option.value = f;
    option.text = f;
    genreSearch.appendChild(option);
  });
  return platformFilterList;
};



// Function to create and display a game card in the gallery
function createGameCard(game) {
  const galleryDiv = document.getElementById("gallery");

  const gameCard = document.createElement("div");
  gameCard.classList.add("game-card");

  const image = document.createElement("img");
  image.src = game.image;
  gameCard.appendChild(image);

  const title = document.createElement("h3");
  title.textContent = game.name;
  gameCard.appendChild(title);

  const platform = document.createElement("p");
  platform.textContent = `Platform: ${game.platform}`;
  gameCard.appendChild(platform);

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${game.genre}`;
  gameCard.appendChild(genre);

  const price = document.createElement("p");
  price.textContent = `Price: $${game.price}`;
  gameCard.appendChild(price);

  const releaseDate = document.createElement("p");
  releaseDate.textContent = `Release Date: ${game.release_date}`;
  gameCard.appendChild(releaseDate);

  galleryDiv.appendChild(gameCard);
}
