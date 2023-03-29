"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let idNum = 0;

  for (let color of colors) {
    // missing code here ...
    idNum += 1;

    const singleCard = document.createElement('div');
    singleCard.classList.add('singleCard');

    singleCard.setAttribute("idNumber", idNum);
    singleCard.setAttribute("isFlipped", false);
    singleCard.setAttribute("flippedColor", color);
    singleCard.setAttribute("unFlippedColor", "white");

    singleCard.style.backgroundColor = "white";

    singleCard.addEventListener("click", handleCardClick);

    gameBoard.appendChild(singleCard);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  console.log("flipping card to color");
  card.style.backgroundColor = card.getAttribute("flippedColor") ;
  return "";
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  console.log("flipping card back to white");
  card.style.backgroundColor = card.getAttribute("unFlippedColor") ;
  return "";
}

/** Handle clicking on a card: this could be first-card or second-card. */

//global variables
let firstCard = false;
let secondCard = false;


function handleCardClick(evt) {
  console.log("inside the handleClick!")
  //if clicked card is already flipped exit out
let currentDiv = evt.target;

if (currentDiv.getAttribute("isFlipped") === true) {  //  <---getAttribute is new here
  console.log("card is already flipped");
  return "";
}

//check to see if first card is not defined, if so, make the current div, and flip it over
if (!firstCard) {
  console.log("creating first card");
  console.log("logging isFlipped: " + currentDiv.getAttribute("isFlipped"));
  currentDiv.setAttribute("isFlipped", true); // <-- this is new
  firstCard = currentDiv;
  flipCard(currentDiv);
  return "";
}

if (!secondCard){
  console.log("creating second card");
  //if current clicked card has same idNumber as the already saved firstCard IdNumber, exit out, because it means same card has been clicked 2x
  // if (firstCard.idNumber === currentDiv.idNumber) return "";

  currentDiv.setAttribute("isFlipped", true);
  secondCard = currentDiv;
  flipCard(currentDiv);
}
setTimeout(()=> {
if (firstCard.getAttribute("flippedColor") === secondCard.getAttribute("flippedColor")){
  firstCard = false;
  secondCard = false;
  return ""
} else {
  firstCard.setAttribute("isFlipped", false);
  unFlipCard(firstCard);
  secondCard.setAttribute("isFlipped", false);
  unFlipCard(secondCard);
  firstCard = false;
  secondCard = false;
  return "";
}
}, FOUND_MATCH_WAIT_MSECS)


}
