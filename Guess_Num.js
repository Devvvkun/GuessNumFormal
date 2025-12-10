const guessedNum = parseInt(Math.random() * 100 + 1);
console.log(guessedNum);

let userGuess = document.getElementById("input");

let submit = document.getElementById("btn");

let oldGuess = document.getElementById("oldNum");

let attempt = document.getElementById("attempt");

let oldGuessLi = [];

let startGame = true;

let userAttempt = 1;

let attemptRem = 11;

let restartbtn = document.createElement("button");
restartbtn.textContent = "Restart Game";
restartbtn.style.backgroundColor="violet";
restartbtn.style.color="white";
restartbtn.style.fontWeight="bold";
restartbtn.style.borderRadius="15px";
restartbtn.style.marginTop="15px";
restartbtn.style.padding="6px";

takeGuess = (guess) => {
  submit.addEventListener("click", function () {
    if (isNaN(parseInt(userGuess.value))) {
      window.alert("Please enter a valid number");
      clearEntry();
      return;
    } else if (
      parseInt(userGuess.value) <= 0 ||
      parseInt(userGuess.value) > 100
    ) {
      window.alert("Please enter a number between 1 to 100 only");
      clearEntry();
      return;
    } else {
      guess = parseInt(userGuess.value);
      if (noRepeat(guess)) {
        clearEntry();
      } else {
        checkGuess(guess);
      }
    }
  });
  return guess;
};

if (startGame == true) {
  takeGuess();
}

checkGuess = (guess) => {
  if (guess > guessedNum) {
    window.alert(`The number is too high!`);
    clearEntry();
    oldGuessLi.push(guess);
    oldGuess.style = "display:block";
    oldGuess.textContent = oldGuessLi;
    userAttempt++;
    let remain = attemptRem - userAttempt;
    attempt.textContent = remain;
    if (remain <= 0) {
      endGame();
      window.alert("The Game has ended! Sorry you lost!");
    }
  } else if (guess < guessedNum) {
    window.alert(`The number is too low!`);
    clearEntry();
    oldGuessLi.push(guess);
    oldGuess.style = "display:block";
    oldGuess.textContent = oldGuessLi;
    userAttempt++;
    let remain = attemptRem - userAttempt;
    attempt.textContent = remain;
    if (remain <= 0) {
      endGame();
      window.alert("The Game has ended! Sorry you lost!");
    }
  } else {
    window.alert(`Congratulation! You took ${userAttempt} attempt.🎉`);
    clearEntry();
    endGame();
  }
  return guess;
};

noRepeat = (guess) => {
  for (let i = 0; i < oldGuessLi.length; i++) {
    const element = oldGuessLi[i];
    if (guess === element) {
      window.alert("You can't enter a repeated number!");
      return true;
    }
  }
  return false;
};

clearEntry = () => {
  userGuess.value = "";
  startGame = true;
};

endGame = () => {
  startGame = false;
  userGuess.disabled = true;
  submit.disabled = true;
  document.getElementById("but").appendChild(restartbtn);
  restart();
};

restart = () => {
  restartbtn.addEventListener("click", function () {
    location.reload();
    startGame = true;
    submit.disabled = false;
    userGuess.disabled = false;
  });
};
