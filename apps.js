const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
var ul = phrase.querySelector('ul');
const overlay = document.getElementById('overlay');
const ol = document.querySelector('ol');
var missed = 0;



//RESET BUTTON
const resetButton = document.createElement('button');
resetButton.type = 'button';
resetButton.textContent = 'PLAY AGAIN';
resetButton.className = 'btn__reset';



// LISTEN FOR THE GAME TO BEGIN
startButton.addEventListener('click', () => {
        const overlay_start = document.getElementById('overlay');
        overlay_start.style.display = 'none';
});



// CREATE AN ARRAY OF 5 PHRASES
const phrases = [ 
    ['The sky is blue'],
    ['My tea is hot'],
    ['Orange juice'],
    ['The grass is green'],
    ['Go on a hike']
];



// RETURN A RANDOM PHRASE FROM AN ARRAY
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor(Math.random() * arr.length)
    for (let i = randomNumber; i < randomNumber + 1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            var myChar = (arr[i][j].split(''));
        }
    }
    return myChar;
}
const phraseArray = getRandomPhraseAsArray(phrases);



// ADDS THE LETTERS OF A STRING TO THE DISPLAY
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        var li = document.createElement('li');
        li.textContent = arr[i];
        li.style.transition = 'width 2s, height 2s, background-color 1s, transform 2s'
        ul.appendChild(li);
        if (li.textContent === ' ') {
            li.className += 'space ';
        } else {
            li.className += 'letter ';
        }  
    }
};
addPhraseToDisplay(phraseArray);



//CHECK IF A LETTER IS IN THE PHRASE
function checkLetter(button) {
    const li = document.getElementsByTagName('li')
    var match = null;
    for (let i = 0; i < li.length; i++) {
        if (button.textContent === li[i].textContent.toLowerCase()) {
            li[i].className += 'show';
            match = button.textContent;
        } 
    }
    return match
};



//LISTEN TO THE KEYBOARD
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className != 'chosen') {
        var button = e.target;
        button.className = 'chosen ';
        const letterFound = checkLetter(button);
        button.disabled = 'true';
        if (!letterFound || e.target.className === 'chosen') {
                const lostLife = 0 + missed
                const lives = document.querySelectorAll('.tries img')[lostLife]
                lives.src = 'images/lostHeart.png';
                missed += 1;
        }
        checkWin()
    }   
});



//CHECK IF WIN OR LOSE GAME
function checkWin() {
    const isLetter = document.getElementsByClassName('letter');
    const isShow = document.getElementsByClassName('show');
    const h2 = overlay.firstElementChild
    if (isLetter.length === isShow.length) {
        overlay.className += ' win '
        overlay.style.display = 'flex';
        h2.textContent = 'You Win!'
        startButton.textContent = 'Play again';
        overlay.insertBefore(resetButton, startButton);
        startButton.style.display = 'none';
    } else if (missed > 4) {
        overlay.className += ' lose';
        overlay.style.display = 'flex';
        h2.textContent = 'You Lose!'
        startButton.textContent = 'Try again';
        overlay.insertBefore(resetButton, startButton);
        startButton.style.display = 'none';
    }
};



//RESTART THE GAME
function clearTheGame() {
    ul.textContent = "";
    missed = 0;
    overlay.classList = "start"

    const keyrows = document.getElementsByTagName('button');
    for (let i = 0; i < keyrows.length; i++) {
        let lisItem  = keyrows[i];
        if (lisItem.className === 'chosen ') {
            lisItem.classList.remove('chosen');
            lisItem.disabled = false;
        }
    };

    for (let i = 0; i < 5; i++) {
        const lives = document.querySelectorAll('.tries img')[i]
        lives.src = 'images/liveHeart.png';
    }
};



// LISTEN FOR RESET BUTTON
resetButton.addEventListener('click', () => {
    const overlay_start = document.getElementById('overlay');
    overlay_start.style.display = 'none';
    clearTheGame();
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});