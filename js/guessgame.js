'use strict'

let startButton = document.querySelector("#startBtn");
let guessButton = document.querySelector("#checkNumberBtn");
let messageField = document.querySelector("#message");
let userGuessField = document.querySelector("#userGuessNumber");
let container=document.querySelector(".container");
guessButton.disabled;
let randomNumber = 0;

/* The code block `startButton.addEventListener("click", function () { ... })` is an event listener
that listens for a click event on the `startButton` element. When the button is clicked, the code
inside the event listener is executed. In this case, it generates a random number between 0 and 9
using `Math.random()` and `Math.floor()`, and assigns it to the `randomNumber` variable. It also
logs the generated number to the console. */
startButton.addEventListener("click", function () {
  randomNumber = Math.floor((Math.random() * 10));
  console.log("start game " + randomNumber);
  container.style["background-color"] = "#f0f0f0";
});

/* The code block inside the `guessButton.addEventListener("click", () => { ... })` is an event
listener that listens for a click event on the `guessButton` element. When the button is clicked,
the code inside the event listener is executed. */
guessButton.addEventListener("click", () => {
  let givenNumber = userGuessField.value;
  console.log("Given number " + givenNumber);

  if (givenNumber > randomNumber) {
    messageField.textContent="Too high";
  } else if (givenNumber < randomNumber) {
    messageField.textContent="Too low";
  } else {
    console.log(container);
    messageField.textContent="You won";
    container.style["background-color"] = "#0F0";
  }
});
