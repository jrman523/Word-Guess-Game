// 20 words
var wordList = ["chrome", "firefox", "codepen", "javascript", "jquery", "twitter", "github", "wordpress", "opera", "sass", "layout", "standards", "semantic", "designer", "developer", "module", "component", "website", "creative", "python"];
var guessedLTR = [];
var correctGuess = [];
var correctWord;
var wins = 0;
var tries = 0;

function randomize() {
    var blankWord = [];
    var random = Math.floor(Math.random() * wordList.length);
    correctWord = wordList[random];
    let wordBlankDiv = document.getElementById("wordBlank");
    for (let i = 0; i < wordList[random].length; i++) {
        var blank = document.createElement('span');
        blank.classList.add("blank");
        blank.textContent = "_";
        wordBlankDiv.appendChild(blank);
    }
    tries = Math.floor(wordList[random].length * 1.5);
    var triesDiv = document.getElementById("tries");
    triesDiv.innerHTML = tries;
    var imgPath = "assests/images/" + wordList[random] + ".png";
    var img = document.getElementById("imgHint");
    img.setAttribute("src", imgPath);
    img.setAttribute("alt", wordList[random]);
}

function validation(letter) {
    var previousIndex = -1;
    var foundIndex;
    if (!correctGuess.includes(letter)) {
        for (let i = 0; i < correctWord.length; i++) {
            foundIndex = correctWord.indexOf(letter, previousIndex + 1);
            if (foundIndex != -1) {
                previousIndex = foundIndex;
                let wordBlankDiv = document.getElementById("wordBlank");
                wordBlankDiv.getElementsByTagName("span")[foundIndex].textContent = letter;
                correctGuess.push(letter);
                if (correctGuess.length < correctWord.length) {} else {
                    previousIndex = 0;
                    wordBlankDiv.innerHTML = "";
                    randomize();
                    correctGuess = [];
                    var winsDiv = document.getElementById("wins");
                    wins++;
                    winsDiv.innerHTML = wins;
                    guessedLTR = [];
                    var guessedDiv = document.getElementById("guessed");
                    guessedDiv.innerHTML = guessedLTR;
                    break;
                }

            }
        }

    } else {
        alert("You have already guessed: " + letter);
    }
}

document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        var guessedDiv = document.getElementById("guessed");
        let wordBlankDiv = document.getElementById("wordBlank");
        if (correctWord.includes(event.key)) {
            validation(event.key);
        } else {
            var triesDiv = document.getElementById("tries");
            if (tries <= 0) {
                alert("You are out of tries. Better luck next time!");
                wordBlankDiv.innerHTML = "";
                randomize();
                correctGuess = [];
                var winsDiv = document.getElementById("wins");
                wins++;
                winsDiv.innerHTML = wins;
                guessedLTR = [];
                var guessedDiv = document.getElementById("guessed");
                guessedDiv.innerHTML = guessedLTR;
            } else {
                if (!guessedLTR.includes(event.key)) {
                    guessedLTR.push(event.key);
                    guessedDiv.innerHTML = guessedLTR;
                    tries--;
                    triesDiv.innerHTML = tries;
                } else {
                    alert("You have already guessed: " + event.key);
                }
            }
        }
    } else {
        alert('please press a letter');
    }
}

window.onload = function(event) {
    randomize();
}