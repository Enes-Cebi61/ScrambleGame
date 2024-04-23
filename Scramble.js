// Select DOM elements
const wordText = document.querySelector(".word"),       // Word display area
    hintText = document.querySelector(".hint span"),     // Hint display area
    timeText = document.querySelector(".time b"),        // Time display area
    inputField = document.querySelector("input"),        // User input area
    refreshBtn = document.querySelector(".refresh-word"),// Button to restart the game
    checkBtn = document.querySelector(".check-word"),    // Button to check user input
    revealBtn = document.querySelector(".reveal-answer"); // Button to reveal the answer

let correctWord, timer; // Variables for the correct word and timer

// Function to start the timer
const initTimer = maxTime => {
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        // When time is up, stop the timer, inform the user, and start a new game
        clearInterval(timer);
        alert(`Timer off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

// Function to start the game
const initGame = () => {
    clearInterval(timer); // Reset the timer

    // Select a new random word
    initTimer(31);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    
    // Shuffle the letters of the selected word
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    // Display the shuffled word and add the hint
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    
    // Convert the correct word to lowercase and reset the input field
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

// Start the game when the page loads
initGame();

// Function to check user input
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert("Please enter a word to check"); // Check for empty input
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`); // Check for incorrect input
    alert(`Congrats! ${userWord.toUpperCase()} is the correct word`); // Congratulate on correct input

    // Move to the next word when the correct word is guessed
    initGame();
}

// Call the function to start the game when the refresh button is clicked
refreshBtn.addEventListener("click", initGame);

// Call the function to check user input when the check button is clicked
checkBtn.addEventListener("click", checkWord);

// Call the function to reveal the correct word when the reveal button is clicked
revealBtn.addEventListener("click", () => {
    alert(`The correct word is: ${correctWord.toUpperCase()}`);
});
