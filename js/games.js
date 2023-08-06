"use strict";

let gamesList = null;
let galleryItemsPath="../resources/games.json";


//load gallery
readJSONFile(galleryItemsPath)
.then((jsonData) => {
  if (jsonData) {
    jsonData.games.forEach((game) => createGameCard(game));
  }
})
.catch((error) => {
  console.error('Error reading JSON file:', error);
});


async function readJSONFile(url) {
    try {
      const response = await fetch(url);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      return null;
    }
  }

  // Function to create and display a game card in the gallery
function createGameCard(game) {
    const galleryDiv = document.getElementById('gallery');
  
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
  
    const image = document.createElement('img');
    image.src = game.image;
    gameCard.appendChild(image);
  
    const title = document.createElement('h3');
    title.textContent = game.name;
    gameCard.appendChild(title);
  
    const platform = document.createElement('p');
    platform.textContent = `Platform: ${game.platform}`;
    gameCard.appendChild(platform);
  
    const genre = document.createElement('p');
    genre.textContent = `Genre: ${game.genre}`;
    gameCard.appendChild(genre);
  
    const price = document.createElement('p');
    price.textContent = `Price: $${game.price}`;
    gameCard.appendChild(price);
  
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${game.release_date}`;
    gameCard.appendChild(releaseDate);
  
    galleryDiv.appendChild(gameCard);
  }