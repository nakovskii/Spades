// ******************
// 
// Laeeq Naqvi
// Spades card game
// 
// *****************
//  sort the cards by suit and then value

 
// let player 1 pick a card and put it on the table
// all players will throw same cards on the suit
// check to see if the player has a higher card than the highest on the table
// if not throw the lowest of that suit
// check to see if spade is on the table? spade card.
// if not throw the lowest of the spade, if yes, throw bigger 
// if the suit is not found


class Deck {
    constructor() {
        this.deck = [];
        let sortNum = 102
        const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
            for (let j = 0; j < suits.length; j++) {
                for (let i = 0; i < values.length; i++) {
                this.deck.push({sorted: sortNum, suit: suits[j], value: i+2, imgSrc: `../images/${values[i]}_of_${suits[j]}.png`});
                sortNum++
                }
            }
    } // end buildDeck 
    shuffle () {
        let m = this.deck.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
    }
}

let players = {
    p0 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
    },
    p1 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
    },
    p2 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
    },
    p3 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
    }
}
// which player goes next
let whosTurn = 0;
// turn Total must not be greater than 4
let turnTotal = 0
// if firstMove = true player is allowed to pick any card
let firstMove = true;
// what card to throw? 
let trickSuit = ''; 
// each player has its own slot in the trick.  This is to keep track of who won the hand
var trick = [[],[],[],[]];

let p0Trick = [];
let p1Trick = [];
let p2Trick = [];
let p3Trick = [];

let p0hand = [];
let p1hand = [];
let p2hand = [];
let p3hand = [];
let diamonds = [ 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114 ];
let clubs =  [ 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127 ];
let hearts = [ 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140 ];
let spades = [ 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153 ];

// create new deck called spades
let spadez = new Deck();
let myDeck = spadez.deck.flat();
console.log(myDeck);

// shuffle it twice;
spadez.shuffle();
spadez.shuffle();


const clearTrick = () => {
    document.querySelector('#t-p0').src = '';
    document.querySelector('#t-p1').src = '';
    document.querySelector('#t-p2').src = '';
    document.querySelector('#t-p3').src = '';
    p0Trick = [];
    p1Trick = [];
    p2Trick = [];
    p3Trick = [];
    trickSuit = '';
    turnTotal = 0;
    firstMove = true;
}


const dealRound = (n,index) => {
    p0hand.push(myDeck.splice(0, n));
    p1hand.push(myDeck.splice(0, n));
    p2hand.push(myDeck.splice(0, n));
    p3hand.push(myDeck.splice(0, n));
}
const sortHand = () => {
    const compareSort = (a, b) => {  // callback fundtion
        let comparison = 0;
        if (a.id > b.id) {
          comparison = 1;
        } else if (a.id < b.id) {
          comparison = -1;
        }
        return comparison;
      }
    // flatten the hand arrays before sort
    p0hand = p0hand.flat().sort(compareSort);
    p1hand = p1hand.flat().sort(compareSort);
    p2hand = p2hand.flat().sort(compareSort);
    p3hand = p3hand.flat().sort(compareSort);
  }

// This translates the Card by x or y co-ordinate and # px displacement
const checkSuitPresence = (hand) => {
    for (let i = 0; i < hand.length; i++) {
        console.log(`hand.suit: ${hand[i].suit} - trickSuit:${trickSuit} `);
        
        if (hand[i].suit == trickSuit) {
            return true;
        } else {
            return false;
        }
    }
}

const checkSuitPresenceInTrick = (arr, suitt) => {
    // console.log(`suitt:`, suitt);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].suit == suitt) {
            console.log(`comapring card: `, arr[i]);
            
            return true;
        } else {
            return false;
        }
    }
}

const updateTricksWon = (p) => {
    if (p === 0){
        players.p0.tricksWon += 1;
        whosTurn = 0;
    } else if (p===1) {
        players.p1.tricksWon += 1; 
        whosTurn = 1;
    } else if (p===2) {
        players.p2.tricksWon += 1; 
        whosTurn = 2;
    } else if (p===3) {
        players.p3.tricksWon += 1; 
        whosTurn = 3;
    } else {}
    // setTimeout(clearTrick, 500);
}
const updateScoreCards = () => {
    let p0score = document.getElementById('p0-score');
    let p1score = document.getElementById('p1-score');
    let p2score = document.getElementById('p2-score');
    let p3score = document.getElementById('p3-score');
    let pWhosTurn = document.getElementById('whos-turn')
    p0score.innerHTML = `P0 Tricks won: <span>${players.p0.tricksWon}</span>`;
    p1score.innerHTML = `P1 Tricks won: <span>${players.p1.tricksWon}</span>`;
    p2score.innerHTML = `P2 Tricks won: <span>${players.p2.tricksWon}</span>`;
    p3score.innerHTML = `P3 Tricks won: <span>${players.p3.tricksWon}</span>`;
    pWhosTurn.innerHTML = `Player ${whosTurn} next!`


}

const renderTrick = (p) => {
    let p0TrickImg = document.querySelector('#t-p0');
    let p1TrickImg = document.querySelector('#t-p1');
    let p2TrickImg = document.querySelector('#t-p2');
    let p3TrickImg = document.querySelector('#t-p3');
    if (p === 0) {p0TrickImg.src = p0Trick[0].imgSrc;}
    if (p === 1) {p1TrickImg.src = p1Trick[0].imgSrc;}
    if (p === 2) {p2TrickImg.src = p2Trick[0].imgSrc;}
    if (p === 3) {p3TrickImg.src = p3Trick[0].imgSrc;}
}
const renderTrickEval = () => {
    turnTotal = 0;
    let p0TrickImg = document.querySelector('#t-p0');
    let p1TrickImg = document.querySelector('#t-p1');
    let p2TrickImg = document.querySelector('#t-p2');
    let p3TrickImg = document.querySelector('#t-p3');
    p0TrickImg.src = p0Trick.imgSrc;
    p1TrickImg.src = p1Trick.imgSrc;
    p2TrickImg.src = p2Trick.imgSrc;
    p3TrickImg.src = p3Trick.imgSrc;
}
const evaluateTrick = () =>{
    // renderTrickEval();
    
    console.log(`card values:`, p0Trick.value, p1Trick.value, p2Trick.value, p3Trick.value);
    let newTrickCardValuesArr = [p0Trick.value, p1Trick.value, p2Trick.value, p3Trick.value];
    let newTrickCardSuitsArr = [p0Trick.suit, p1Trick.suit, p2Trick.suit, p3Trick.suit];
    console.log(`array of values`, newTrickCardValuesArr);
    console.log(`array of values`, newTrickCardSuitsArr);
    let indexOfSuitsArr = [];
    let highestCardIndex = null;
    let tricksWinner = null;
    let highestCardValue = null;
        if ((trickSuit != 'spades') && newTrickCardSuitsArr.includes('spades')) {
            // evaluate for spades only
            console.log(`trick includes Spades`);
            indexOfSuitsArr = newTrickCardSuitsArr.indexOf('spades');
            let spadesCardArr = [newTrickCardValuesArr[indexOfSuitsArr[0]], newTrickCardValuesArr[indexOfSuitsArr[1]],newTrickCardValuesArr[indexOfSuitsArr[2]],newTrickCardValuesArr[indexOfSuitsArr[3]]];
            highestCardValue = Math.max(...spadesCardArr);
            highestCardIndex = newTrickCardValuesArr.indexOf(highestCardValue);
            updateTricksWon(highestCardIndex);
            spades.deck.push(trick.splice(0,4)); // return card to deck
            setTimeout(clearTrick, 500);
//  found solution to every occurence of a card https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
        } else if (newTrickCardSuitsArr.every( (val, i, arr) => val === trickSuit )) {
            // evaluate for trick suit only
            console.log(`same suit trick`);
            highestCardValue = Math.max(...newTrickCardValuesArr);
            highestCardIndex = newTrickCardValuesArr.indexOf(highestCardValue);
            console.log(highestCardIndex);
            tricksWinner = `players.p${highestCardIndex}`;
            console.log(tricksWinner);
            updateTricksWon(highestCardIndex);
            spades.deck.push(trick.splice(0,4)); // return card to deck
            setTimeout(clearTrick, 500);
        } else if (newTrickCardSuitsArr.includes(trickSuit)){
            console.log(` cards other than trick suit`);
            indexOfSuitsArr = newTrickCardSuitsArr.indexOf(trickSuit);
            let spadesCardArr = [newTrickCardValuesArr[indexOfSuitsArr[0]], newTrickCardValuesArr[indexOfSuitsArr[1]],newTrickCardValuesArr[indexOfSuitsArr[2]],newTrickCardValuesArr[indexOfSuitsArr[3]]];
            highestCardValue = Math.max(...spadesCardArr);
            highestCardIndex = newTrickCardValuesArr.indexOf(highestCardValue);
            updateTricksWon(highestCardIndex);
            setTimeout(clearTrick, 500);
        }
    // } // end for
}
const translateCard = (disp1, disp2) => {
    pCard.style.transform = `translateXY(${disp1}px, ${disp2}px)`;
};
// const placeCardOnTrick
// let tCards = document.querySelectorAll('.table-img');
// let p3TCard = document.createElement('img');

let displaceCardBy = 25;  // used for laying-over cards

const displayPlayer0Cards = () => {
    let newLeft = 105;
    let p0HandDOM = document.getElementById('pl-0');
    for (let i=0; i<p0hand.length; i++){
        newLeft += 25;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.left = `${newLeft}px`;
        pCard.src = `${p0hand[i].imgSrc}`;
        p0HandDOM.appendChild(pCard);
        pCard.addEventListener('click', () => {
            let selectedCardindex = p0hand.indexOf(p0hand[i]);
            const p0Routine =()=> {
                pCard.style.transform = 'translateY(-200px)';
                    p0Trick.push(p0hand.splice(selectedCardindex,1));
                    turnTotal++
                    whosTurn = 1;    
                    setTimeout(() => {
                        renderTrick(0);
                        pCard.style.display = 'none';
                        if (turnTotal === 4){
                            evaluateTrick();
                        }
                    }, 2200);
            }
            if (whosTurn === 0 && turnTotal <= 4){
                console.log(selectedCardindex);
                console.log('p0 suit presence',checkSuitPresence(p0hand));
                if (firstMove) { 
                    trickSuit = p0hand[selectedCardindex].suit; 
                    console.log(`trickSuit`,trickSuit); 
                    firstMove = false;
                    p0Routine();
                    
                } else if (checkSuitPresence(p0hand) && p0hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(p0hand) && p0hand[selectedCardindex].suit == 'spades') {
                    p0Routine();  
                } 
                else {
                    p0Routine();
                }
            } else {
                alert(`not your turn.`);
            }
        });
    }    
};

const displayPlayer1Cards = () => {
    let newTop = 123;
    let pHandDOM = document.getElementById('pl-1');
    for (let i=0; i< p1hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.bottom = `${newTop}px`;
        pCard.src = `${p1hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
    
        pCard.addEventListener('click', (e) => {  // eventListener
            if (whosTurn === 1 && turnTotal <= 4){
            let selectedCardindex = p1hand.indexOf(p1hand[i]);
            console.log(selectedCardindex);
            const p1Routine = () => {
                pCard.style.transform = 'translateX(-200px)';
                p1Trick.push(p1hand.splice(selectedCardindex,1));
                turnTotal++
                whosTurn = 2; 
                setTimeout(() => {
                    renderTrick(1);
                    pCard.style.display = 'none';
                    if (turnTotal === 4){
                        evaluateTrick();
                    }
                }, 2200);
            }
    
            console.log('p1 suit presence',checkSuitPresence(p1hand));
                if (firstMove) { 
                    trickSuit = p1hand[selectedCardindex].suit; 
                    console.log(`p1-first move, trickSuit`,trickSuit); 
                    firstMove = false;
                    p1Routine();                    
                }  else if (checkSuitPresence(p1hand) && p1hand[selectedCardindex].suit != trickSuit){
                        console.log(pCard);
                        alert(`must select a card of ${trickSuit}`);
                    } else if (trickSuit!= 'spades' && !checkSuitPresence(p1hand) && p1hand[selectedCardindex].suit == 'spades') {
                        p1Routine();  
                    } else {
                        p1Routine();
                           
                    }
            } else {
                alert(`not your turn.`);
            }
        });
    }    
};

const displayPlayer2Cards = () => {
    let newLeft = 105;
    let p3HandDOM = document.getElementById('pl-2');
    for (let i=0; i<13; i++){
        newLeft += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.left = `${newLeft}px`;
        pCard.src = `${p2hand[i].imgSrc}`;
        p3HandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => { // eventListener
            if (whosTurn === 2 && turnTotal <= 4){
            let selectedCardindex = p1hand.indexOf(p1hand[i]); 
            const p2Routine = () => {
                pCard.style.transform = 'translateY(200px)';
                p2Trick.push(p2hand.splice(selectedCardindex,1));
                turnTotal++
                whosTurn = 3;
                setTimeout(() => {
                    renderTrick(2);
                    pCard.style.display = 'none';
                    if (turnTotal === 4){
                        evaluateTrick();
                    }
                }, 2200);
            }           
                if (firstMove) { 
                    trickSuit = p2hand.suit; 
                    console.log(`p1-first move, trickSuit`,trickSuit); 
                    firstMove = false;
                    p2Routine();
                        
            } else if (checkSuitPresence(p1hand) && p1hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(p1hand) && p1hand[selectedCardindex].suit == 'spades') {
                    p2Routine();  
                } else {
                p2Routine();
                    
            }
        } else {
                alert(`not your turn.`);
            }
        });
    }    
};
const displayPlayer3Cards = () => {
    let newTop = 123;
    let pHandDOM = document.getElementById('pl-3');
    for (let i=0; i< p3hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.top= `${newTop}px`;
        pCard.src = `${p3hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => {
            if (whosTurn === 3 & turnTotal <=4){
            let selectedCardindex = p3hand.indexOf(p3hand[i]);
            console.log(selectedCardindex);
            const p3Routine = () => {
                pCard.style.transform = 'translateX(200px)';
                    p3Trick.push(p1hand.splice(selectedCardindex,1));
                    turnTotal++
                    whosTurn = 0;
                    setTimeout(() => {
                        renderTrick(3);
                        pCard.style.display = 'none';
                        if (turnTotal === 4){
                            evaluateTrick();
                        } 
                    }, 2500);
            }
                if (firstMove) { 
                    trickSuit = p3hand[selectedCardindex].suit; 
                    console.log(trickSuit);
                    firstMove = false;
                    p3Routine();
                } else if (checkSuitPresence(p3hand) && p3hand[selectedCardindex].suit != trickSuit){
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(p1hand) && p1hand[selectedCardindex].suit == 'spades') {
                    p3Routine();  
                } else {
                    p3Routine();
                       
                }
            } else {
                alert(`not your turn.`);
            }
        });
    }    
};

const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2);
};




// deal and display the cards of player 0
let deal = document.getElementById('deal');
// deal.addEventListener('click', dealCards);  // temporerily disabled look
const play = () => {
    dealCards();
    sortHand();
    displayPlayer0Cards();
    displayPlayer1Cards();
    displayPlayer2Cards();
    displayPlayer3Cards();
    setInterval(updateScoreCards, 250);
    let p0score = document.getElementById('p0-score');
    console.log(p0score);
    
    let p1score = document.getElementById('p1-score');
    let p2score = document.getElementById('p2-score');
    let p3score = document.getElementById('p3-score');
    p0score.innerHTML = `Tricks won by you: ${players.p0.tricksWon}`;
    p1score.innerHTML = `Tricks won by P1: ${players.p1.tricksWon}`;
    p2score.innerHTML = `Tricks won by partner: ${players.p2.tricksWon}`;
    p3score.innerHTML = `Tricks won by P3 ${players.p3.tricksWon}`;

}
play();
    
    // temp play - this needs to come from the DOM - look
    