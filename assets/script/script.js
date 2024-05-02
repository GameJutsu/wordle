// Importing word list
import { words } from "./words.js";

// Consts & vars
const word = words[Math.floor(Math.random() * words.length)];
// const word = "STILL";
const cnt = document.querySelector(".container");
const kbRowsEl = document.getElementsByClassName("kb");
var currRow = 0,
  currSq = 0;
var alpha = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
var cc = {};

// Generating squares
for (var i = 0; i < 6; i++) {
  const dvR = document.createElement("div.row");
  dvR.classList.add("row");
  for (var j = 0; j < 5; j++) {
    const dvSq = document.createElement("div");
    dvSq.classList.add("square");
    dvR.appendChild(dvSq);
  }
  cnt.appendChild(dvR);
}
const squaresEl = document.querySelectorAll(".square");
var currSqEl = squaresEl[currSq];

// Function to create & append a key with given text, row & size
var createKey = (e, i, sz) => {
  const bt = document.createElement("button");
  const h1 = document.createElement("h1");
  h1.textContent = e;
  bt.appendChild(h1);
  bt.classList.add(sz);
  kbRowsEl[i].appendChild(bt);
};

// Function for adding EventListener to keypress/click
var pressKey = (el, src) => {
  el.addEventListener(src, (e) => {
    var val =
      src == "click" ? e.target.textContent.toUpperCase() : e.key.toUpperCase();
    if (currRow <= 5) {
      if (val == "ENTER") {
        if (currSq > currRow * 5 + 4) {
          calculate(currRow);
          currRow++;
        }
      } else if (val == "BACKSPACE" || val == "DEL") {
        currSq = Math.max(currRow * 5, currSq - 1);
        currSqEl = squaresEl[currSq];
        currSqEl.textContent = "";
      } else if (
        currSq <= currRow * 5 + 4 &&
        (src == "click" || e.code === `Key${val}`)
      ) {
        currSqEl.textContent = val;
        currSq++;
        currSqEl = squaresEl[currSq];
      }
    }
  });
};

// Function to initialise keyboard
var initKb = () => {
  // Create keyboard
  console.log(word);
  var currKbRow = 0;
  for (var i = 0; i < 3; i++) {
    if (i == 2) createKey("ENTER", i, "lgKey");
    [...alpha[currKbRow]].forEach((e) => createKey(e, i, "key"));
    if (i == 2) createKey("DEL", i, "lgKey");
    currKbRow++;
  }
  // Add EventListener to keys & keyboard
  const keys = document.querySelectorAll(".key,.lgKey");
  keys.forEach((el) => pressKey(el, "click"));
  pressKey(document.body, "keydown");
};

// Initialising keyboard
initKb();

// Function to calculate a single row
var calculate = function (r) {
  var ans = word.toUpperCase();
  var currWord = "";
  for (var i = currRow * 5; i <= currRow * 5 + 4; i++) {
    currWord += squaresEl[i].textContent.toUpperCase();
  }
  // For exact matching chars
  for (var i = 0; i < 5; i++) {
    if (ans[i] == currWord[i]) {
      squaresEl[currRow * 5 + i].style.backgroundColor = "green";
      cc[currWord[i]] = "green";
      ans = ans.substring(0, i) + "0" + ans.substring(i + 1);
    }
  }
  // For partial & not matching chars
  for (var i = 0; i < 5; i++) {
    if (ans.includes(currWord[i])) {
      squaresEl[currRow * 5 + i].style.backgroundColor = "orange";
      if (cc[currWord[i]] != "green") cc[currWord[i]] = "orange";
      ans = ans.replace(currWord[i], "0");
    } else if (squaresEl[currRow * 5 + i].style.backgroundColor != "green") {
      squaresEl[currRow * 5 + i].style.backgroundColor = "#3a3a3c";
    }
  }
  // For key color calculation
  for (var i = 0; i < 5; i++) {
    var color = squaresEl[currRow * 5 + i].style.backgroundColor;
    if (color == "green") {
      colorKey(currWord[i], "green");
    } else if (color == "orange" && cc[currWord[i]] != "green") {
      colorKey(currWord[i], "orange");
    } else {
      if (cc[currWord[i]] != "orange" && cc[currWord[i]] != "green") {
        colorKey(currWord[i], "#3a3a3c");
      }
    }
  }
  // Win condition
  if (word == currWord) {
    won();
  }
};

// Funtion for win condition
var won = () => {
  currRow = 6;
};

// Function to set a key a specific color
var colorKey = (key, color) => {
  var azKeys = document.querySelectorAll(".key");
  azKeys["QWERTYUIOPASDFGHJKLZXCVBNM".indexOf(key)].style.backgroundColor =
    color;
};
