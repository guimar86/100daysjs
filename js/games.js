"use strict";
$("document").ready(function () {
  let gamesList = null;
  let galleryItemsPath = "../resources/games.json";
  let gameCardItem = null;
  let gameCart = [];
  let allGames = [];
  const platforms = new Set();
  const selectElement = document.getElementById("platformSelect");
  const galleryDiv = document.getElementById("gallery");

  //modal
  const modal = $(".modal");
  const overlay = $(".overlay");
  const btnCloseModal = $(".close-modal");

  const closeModal = function () {
    modal.addClass("hidden");
    overlay.addClass("hidden");
    $(".game-img-section").empty();
  };


  //load gallery
  readJSONFile(galleryItemsPath)
    .then((jsonData) => {
      if (jsonData) {
        allGames = jsonData.games;
        jsonData.games.forEach((game) => createGameCard(game));
        fillPlatformSelect();
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

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      return null;
    }
  }

  // Function to create and display a game card in the gallery
  function createGameCard(game) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.classList.add("animate__animated");
    gameCard.classList.add("animate__fadeIn");
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

    gameCard.addEventListener("click", function () {
      addToCart(game);
    });
    platforms.add(game.platform);
    galleryDiv.appendChild(gameCard);
  }

  //dark mode switch control

  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  $("#platformSelect").on("change", function () {
    let selectedValue = $(this).val();
    if (selectedValue == 0) {
      $("#gallery").empty();
      allGames.forEach((game) => createGameCard(game));
      console.log("There are " + allGames.length + " total games!");
    } else {
      let filteredGames = allGames.filter((p) => p.platform === selectedValue);
      console.log(
        "There are " +
          filteredGames.length +
          " for the " +
          selectedValue +
          " platform"
      );
      console.log("There are " + allGames.length + " total games!");
      $("#gallery").empty();
      filteredGames.forEach((game) => createGameCard(game));
    }
  });

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  function addToCart(game) {
    gameCart.push(game.id);
    //console.log("Cart items " + JSON.stringify(gameCart));
    $("#game-title").html(game.name);
    $(".game-img-section").append(
      "<img src='" + game.image + "' alt='" + game.name + "'/>"
    );
    $(".modal").removeClass("hidden");
    $(".overlay").removeClass("hidden");
  }

  function fillPlatformSelect() {
    platforms.forEach((platform) => {
      const optionElement = document.createElement("option");
      optionElement.value = platform;
      optionElement.textContent = platform;
      selectElement.appendChild(optionElement);
    });
  }
  
  btnCloseModal.on("click", closeModal);

  overlay.on("click", closeModal);
});
