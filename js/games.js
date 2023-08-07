"use strict";

let gamesList = [];
let galleryItemsPath = "../resources/games.json";
let platformFilterList = [];
let genreFilterList = [];
let platformSearch = document.querySelector("#platformSearch");
let genreSearch = document.querySelector("#genreSearch");
const galleryDiv = document.getElementById("gallery");

//load gallery
readJSONFile(galleryItemsPath)
  .then((jsonData) => {
    if (jsonData) {
      gamesList = jsonData.games;
      platformFilterList = fillPlatformFilterList(gamesList);
      genreFilterList = fillGenreSearchList(gamesList);
      updateGallery();
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

    return await response.json();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return null;
  }
}

const fillPlatformFilterList = function (gameList) {
  platformFilterList = gameList.map((property) => property.platform);
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
  genreFilterList = gameList.map((property) => property.genre);
  genreFilterList = [...new Set(genreFilterList)];
  genreFilterList.forEach((f) => {
    const option = document.createElement("option");
    option.value = f;
    option.text = f;
    genreSearch.appendChild(option);
  });
  return genreFilterList;
};

// Function to create and display a game card in the gallery
function createGameCard(game) {
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

function updateGallery() {
  galleryDiv.innerHTML = "";
  const platformFilterValue = platformSearch.value;
  const genreFilterValue = genreSearch.value;

  const filteredGames = gamesList.filter(
    (game) =>
      (platformFilterValue === "0" || game.platform === platformFilterValue) &&
      (genreFilterValue === "0" || game.genre === genreFilterValue)
  );

  filteredGames.forEach((game) => createGameCard(game));
}

platformSearch.addEventListener("change", updateGallery);
genreSearch.addEventListener("change", updateGallery);
