/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses reamining 
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

// UI elements
const gameUI = document.querySelector('#game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessInputUI = document.querySelector('#guess-input'),
      guessBtnUI = document.querySelector('#guess-btn'),
      messageUI = document.querySelector('#message');

// Assign UI min and Max
minNumUI.textContent = min;
maxNumUI.textContent = max;

// Play again Event Listener
gameUI.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtnUI.addEventListener('click', function(){
  let guess = parseInt(guessInputUI.value);

  // Validate input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  };

  // Check if won
  if(guess === winningNum){
    // Game over - WON
    gameover(true, `${winningNum} is correct! YOU WIN!`);

  }else{
    // Wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // Game over - Lost

      gameover(false, `Game Over! ${winningNum} was the correct number! YOU LOST!`)
    
    }else{
      // Game continues = answer wrong

      // Change border color
      guessInputUI.style.borderColor = 'red';

      // clear the input
      guessInputUI.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not corret, ${guessesLeft} guesses left`, 'blue')
    }
  }
})

// Game Over
function gameover(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInputUI.disabled = true;
  // Change border color
  guessInputUI.style.borderColor = color;
  // Set text color
  messageUI.style.color = color;
  // Set message
  setMessage(msg);

  //Play again?
  guessBtnUI.value = 'Play Again';
  guessBtnUI.classList.add('play-again')  
}

// Get Random Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  messageUI.textContent = msg;
  messageUI.style.color = color;
}