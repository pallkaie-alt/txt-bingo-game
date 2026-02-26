//  Defineerime massiivi kõikide bingo fraasidega
const bingoPhrases = [
    "Kaotasid rahakoti",
    "Jälle jahtunud eine!",
    "Leidsid prillid WC-st",
    "Võtsid võõra läpaka",
    "Ostsid unerohtu",
    "Jõid energiajooke ",
    "Võtsid 3 kg alla",
    "Ajasid nimed sassi",
    "Unustasid tähtpäeva",
    "Kohv sai jälle otsa!!",
    "Võtsid 3 kg juurde",
    "Stressishoppasid",
    "Ähvardasid AI’d",
    "Kiitsid AI’d",
    "Git rikkis (oma süül)",
    "Kaotasid mobiili",
    "Palusid WiFi-jumalat",
    "2 õlut õhtul non-stop",
    "Rõõmustasid s|T@ ilma üle",
    "Magasid sisse",
    "Unustasid JUHAN-i",
    "Liiklesid veidralt",
    "Kukutasid läpaka maha",
    "Kaotasid hiire",
    "Helistasid progejast sõbrale"
];

// Defineerime kõik 12 võiduliini (indeksid 0 kuni 24)
const winningCombinations = [
    // Horisontaalsed read
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    // Vertikaalsed veerud
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    // Diagonaalid
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
];

let gameWon = false; // Muutuja, et vältida korduv-võitu samas mängus

//  Funktsioon fraaside juhuslikuks segamiseks 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// siin oli c shuffledPhrases enne New game Button lisamist

const gridContainer = document.getElementById('bingo-grid');
const newGameBtn = document.getElementById('new-game-btn');
const bingoMessage = document.getElementById('bingo-message');
const totalSquares = 25;

// Funktsioon, mis kontrollib võitu
function checkWin() {
    if (gameWon) return; // Kui mäng on juba võidetud, ära kontrolli uuesti

    // Võtame kõik ruudud DOM-ist
    const squares = document.querySelectorAll('.square');

    // Kontrollime, kas mõni võidukombinatsioon on täidetud
    const isWinner = winningCombinations.some(combination => {
        // .every() tagastab true vaid siis, kui KÕIK elemendid selles kombinatsioonis vastavad tingimusele
        return combination.every(index => squares[index].classList.contains('clicked'));
    });

    if (isWinner) {
        gameWon = true; // Märgime mängu võidetuks
        
        //  Kuvame BINGO teate
        bingoMessage.classList.add('show');
        
        //  Viskame konfettit (kasutab html-i lisatud raamatukogu)
        confetti({
            particleCount: 150, // Mitu tükki
            spread: 80,         // Kui laiali lendab
            origin: { y: 0.6 },  // Kust kohast lendu tõuseb (0 on üleval, 1 on all)
            colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
    }
}
function createBoard() { 
    gridContainer.innerHTML = '';  // Tühjendame vana kaardi kui see olemas
    gameWon = false;  // Nullime võidustaatuse
    bingoMessage.classList.remove('show');

    // Segame laused ära, et iga kaart oleks unikaalne
const shuffledPhrases = shuffleArray([...bingoPhrases]);

//  Loome 25 ruuduga uue mängu ja lisame igale ruudule segatud nimekirjast ühe lause

for (let i = 0; i < totalSquares; i++) {

    const square = document.createElement('div');
    square.classList.add('square');

    const textElement = document.createElement('span');
    // Võtame segatud massiivist järjekorras lause
    const customString = shuffledPhrases[i]; 
    textElement.textContent = customString;

    // Kuna nüüd on meil alati tekst olemas, lisame klassi 'has-text'
    if (customString.trim() !== "") {
        square.classList.add('has-text');
    }

    square.appendChild(textElement);

    // Hiirekliki sündmus X-i ja värvimuutuse jaoks
 square.addEventListener('click', function() {
            // Lubame klikkida ainult siis, kui mäng pole veel võidetud
            if (!gameWon) {
                this.classList.toggle('clicked');
                checkWin(); // Pärast iga klikki kontrollime, kas tekkis võit
            }
        });

    gridContainer.appendChild(square);
    }
}
//  Seome nupu klikkimise funktsiooniga createBoard
newGameBtn.addEventListener('click', createBoard);

createBoard();