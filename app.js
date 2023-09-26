//   Start the game by pressing readyToPlay() function. Then we get the three options. Each time we press the button a game plays and we get a score. When either player reaches 5 points the game finished and we display the points.

let computerSelection;
let playerSelection;
let computerScore=0;
let playerScore=0;

let buttons = document.querySelectorAll('.button');
const gameContainer = document.querySelector('#gameContainer');
const title = document.querySelector('h1');
const cta = document.querySelector('#cta');
const end = document.querySelector("#end");
const container = document.querySelector('#resultContainer');
const endDesc = document.querySelector("#endDesc");
const returnMainBtn = document.querySelector("#retryBtn");

// Give each button an eventlistener so a game starts when they are pressed

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const img = button.querySelector('img');
        playerSelection = img.alt.toLocaleLowerCase();

        playRound(playerSelection, computerSelection);

        if(playerScore === 5 || computerScore === 5){
            declareWinner();
        }
    });
});


// Make computer pick

const pickArray=['Rock','Paper','Scissors'];

function getComputerChoice(){
    return pickArray[~~(Math.random() * pickArray.length)];
    // console.log(pickArray[~~(Math.random() * pickArray.length)]) 
}

// Play a game by playing computerChoice agains the clicked button

function playRound(playerSelection, computerSelection){

    // make the both picks lowercase 
    computerSelection = getComputerChoice().toLocaleLowerCase();
    playerSelection = playerSelection.toLocaleLowerCase();
    // console.log(computerSelection, playerSelection)

    // start comparing 
    // Tie
    if(computerSelection == playerSelection){
        displayResults('Tie game!');
    }
    // Time you will loose!
    else if(
        (computerSelection == "rock" && playerSelection == "scissors") ||
        (computerSelection == "scissors" && playerSelection == "paper") ||
        (computerSelection == "paper" && playerSelection == "rock")
      ){
        computerScore= ++computerScore;
        keepCpuScore();
        displayResults(
            `Oh no! You lost. ${capitalize(computerSelection)} beats ${playerSelection}.`
        );
      }else{
        playerScore = ++playerScore;
        keepPlayerScore();
        displayResults(
            `Let's go!! You won. ${capitalize(playerSelection)} beats ${computerSelection}.`
        )
      }
}

// Capitalizes the result
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Display results
function displayResults(str){
    container.style.opacity=1;
    container.textContent = str;
}

// updates the computers score
function keepCpuScore(){
    let computerScoreBox = document.querySelector('#computerScore');
    computerScoreBox.style.opacity=1;
    computerScoreBox.textContent = computerScore;
}

// updates player score
function keepPlayerScore(){
    let playerScoreBox = document.querySelector('#playerScore');
    playerScoreBox.style.opacity=1;
    playerScoreBox.textContent = playerScore;
}

// Declare winner()
function declareWinner(){
    rplContent();
    if( playerScore > computerScore){
        endDesc.style.color='green';
        endDesc.textContent ='You win!';
        returnMainBtn.innerText='Play again?';
    }else{
        endDesc.style.color='darkred';
        endDesc.textContent='You lost...';
        returnMainBtn.innerText='Try again?';
    }
}
// Make items dissapear
function rplContent(){
    gameContainer.classList.add('disappear');
    returnMainBtn.style.opacity=1;
    end.style.display='contents'; 
    cta.style.display='none';
    title.style.color='black';

    returnMainBtn.addEventListener('click', () => {
        resetGame();
        location.reload();
    })
}

function resetGame(){
    container.textContent='';
    playerScore=0;
    computerScore=0;
    keepPlayerScore();
}