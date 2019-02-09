// 76 words
var wordList = ["chrome", "firefox", "codepen", "javascript", "jquery", "twitter", "github", "wordpress", "opera", "sass", "layout", "standards", "semantic", "designer", "developer", "module", "component", "website", "creative", "banner", "browser", "screen", "mobile", "footer", "header", "typography", "responsive", "programmer", "css", "border", "compass", "grunt", "pixel", "document", "object", "ruby", "modernizr", "bootstrap", "python", "php", "pattern", "ajax", "node", "element", "android", "application", "adobe", "apple", "google", "microsoft", "bookmark", "internet", "icon", "svg", "background", "property", "syntax", "flash", "html", "font", "blog", "network", "server", "content", "database", "socket", "function", "variable", "link", "apache", "query", "proxy", "backbone", "angular", "email", "underscore", "cloud"];
var guessedLTR = [];
var correctGuess = [];
var correctWord;
var wins = 0;
var trys;

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
    console.log("Correct word: " + correctWord);
}

function validation(letter) {
    var previousIndex = -1;
    var foundIndex;
    for (let i = 0; i < correctWord.length; i++) {
        // previousIndex = i;
        foundIndex = correctWord.indexOf(letter, previousIndex + 1);
        if (foundIndex != -1) {
            previousIndex = foundIndex;
            console.log("FoundIndex: " + foundIndex);
            let wordBlankDiv = document.getElementById("wordBlank");
            wordBlankDiv.getElementsByTagName("span")[foundIndex].textContent = letter;
            if (correctGuess.length != correctWord.length) {
                correctGuess.push(letter);
                console.log("Correct Guess: ", correctGuess);
            } else {
                previousIndex = 0;
                wordBlankDiv.innerHTML = "";
                randomize();
                correctGuess = [];
                wins++;
                trys = 0;
                guessedLTR = [];
                console.log("Wins: ", wins)
                break;
            }

        }
    }

}

document.onkeypress = function(event) {
    console.log("this is the guess: ", event.key);
    var guessedDiv = document.getElementById("guessed");
    if (correctWord.includes(event.key)) {
        validation(event.key);
    } else {
        guessedLTR.push(event.key);
        guessedDiv.innerHTML = guessedLTR;
    }
}

window.onload = function(event) {
    console.log(event);
    randomize();
}