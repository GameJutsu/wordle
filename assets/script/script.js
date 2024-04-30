var word = "TIGER";
var rows = document.querySelectorAll(".row");
var squares = document.querySelectorAll(".square");
var currRow = 0,
  currSq = 0;
var currSqEl = squares[currSq];

document.body.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (currRow <= 5) {
    if (currSq > currRow * 5 + 4 && e.key === "Enter") {
      calculate(currRow);
      currRow++;
    } else if (
      currSq <= currRow * 5 + 4 &&
      e.code === `Key${e.key.toUpperCase()}`
    ) {
      currSqEl.textContent = e.key;
      currSq++;
      currSqEl = squares[currSq];
    } else if (e.key === "Backspace") {
      console.log("del");
      currSq = Math.max(currRow * 5, currSq - 1);
      currSqEl = squares[currSq];
      currSqEl.textContent = "";
    }
  }
});

var calculate = function (r) {
  var ans = word.toUpperCase();
  var currWord = "";
  for (var i = currRow * 5; i <= currRow * 5 + 4; i++) {
    currWord += squares[i].textContent.toUpperCase();
  }
  console.log(currWord);
  for (var i = 0; i < 5; i++) {
    if (ans[i] == currWord[i]) {
      squares[currRow * 5 + i].style.backgroundColor = "green";
      ans = ans.slice(0, i) + "0" + ans.slice(i + 1);
    }
  }
  console.log(ans);
  for (var i = 0; i < 5; i++) {
    if (ans.includes(currWord[i])) {
      squares[currRow * 5 + i].style.backgroundColor = "orange";
      ans = ans.replace(currWord[i], "");
      console.log(ans);
    }
  }
  if (ans == currWord) {
    won();
  }
};

var won = () => {
  console.log("won");
  currRow = 6;
};
