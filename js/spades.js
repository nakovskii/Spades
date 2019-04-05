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
    trick : [[],[],[],[]],
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
let fisrtMove = true;
// what card to throw? 
let trickSuit = ''; 
// each player has its own slot in the trick.  This is to keep track of who won the hand
var trick = [[],[],[],[]];

let p0hand = [];
let p1hand = [];
let p2hand = [];
let p3hand = [];

// create new deck called spades
let spades = new Deck();
// let myDeck = spades.deck.flat();
// console.log(myDeck);

// const fs = require('fs')   
// // Write data in 'Output.txt' . 
// fs.writeFile('./deck.txt', spades.deck, (err) => { 
      
//     // In case of a error throw err. 
//     if (err) throw err; 
// }) 

// shuffle it twice;
spades.shuffle();
spades.shuffle();


const clearTrick = () => {
    document.querySelector('#t-p0').src = '';
    document.querySelector('#t-p1').src = '';
    document.querySelector('#t-p2').src = '';
    document.querySelector('#t-p3').src = '';
    trick = [[],[],[],[]].slice();
    trickSuit = '';
    turnTotal = 0;
    fisrtMove = true;
}


const dealRound = (n,index) => {
    players.p0.cards.push(spades.deck.splice(0, n));
    players.p1.cards.push(spades.deck.splice(0, n));
    players.p2.cards.push(spades.deck.splice(0, n));
    players.p3.cards.push(spades.deck.splice(0, n));
        for (let i = 0; i < n; i++) {
            players.p0.hand.push(players.p0.cards[index].pop());
            players.p1.hand.push(players.p1.cards[index].pop());
            players.p2.hand.push(players.p2.cards[index].pop());
            players.p3.hand.push(players.p3.cards[index].pop());
        }
}

// callback funtion for sort()
const compareSuits = (a, b) => {
    let comparison = 0;    
    if (a.suit > b.suit) {
      comparison = 1;
    } else if (a.suit < b.suit) {
      comparison = -1;
    }
    return comparison;
  }
const compareSort = (a, b) => {  // callback fundtion
    let comparison = 0;
    // debugger;
    if (a.sorted > b.sorted) {
      comparison = 1;
    } else if (a.sorted < b.sorted) {
      comparison = -1;
    }
    return comparison;
  }

  const sortHand = () => {
    p0hand = players.p0.hand.sort(compareSort);
    p1hand = players.p1.hand.sort(compareSort);
    p2hand = players.p2.hand.sort(compareSort);
    p3hand = players.p3.hand.sort(compareSort);
    players.p0.hand = p0hand;
    players.p1.hand = p1hand;
    players.p2.hand = p2hand;
    players.p3.hand = p3hand;
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
    let newTrick = trick.flat(2);
    let p0TrickImg = document.querySelector('#t-p0');
    let p1TrickImg = document.querySelector('#t-p1');
    let p2TrickImg = document.querySelector('#t-p2');
    let p3TrickImg = document.querySelector('#t-p3');
    if (p === 0) {p0TrickImg.src = trick[0][0][0].imgSrc;}
    if (p === 1) {p1TrickImg.src = trick[1][0][0].imgSrc;}
    if (p === 2) {p2TrickImg.src = trick[2][0][0].imgSrc;}
    if (p === 3) {p3TrickImg.src = trick[3][0][0].imgSrc;}
    // if (p === 0) {p0TrickImg.src = newTrick[0].imgSrc;}
    // if (p === 1) {p1TrickImg.src = newTrick[1].imgSrc;}
    // if (p === 2) {p2TrickImg.src = newTrick[2].imgSrc;}
    // if (p === 3) {p3TrickImg.src = newTrick[3].imgSrc;}
}
const renderTrickEval = () => {
    turnTotal = 0;
    let newTrick = trick.flat(2);
    let p0TrickImg = document.querySelector('#t-p0');
    let p1TrickImg = document.querySelector('#t-p1');
    let p2TrickImg = document.querySelector('#t-p2');
    let p3TrickImg = document.querySelector('#t-p3');
    p0TrickImg.src = newTrick[0].imgSrc;
    p1TrickImg.src = newTrick[1].imgSrc;
    p2TrickImg.src = newTrick[2].imgSrc;
    p3TrickImg.src = newTrick[3].imgSrc;
}
const evaluateTrick = () =>{
    // renderTrickEval();
    let newTrick = trick.flat(2);
    console.log(`card values:`, newTrick[0].value, newTrick[1].value, newTrick[2].value, newTrick[3].value);
    let newTrickCardValuesArr = [newTrick[0].value, newTrick[1].value, newTrick[2].value, newTrick[3].value];
    let newTrickCardSuitsArr = [newTrick[0].suit, newTrick[1].suit, newTrick[2].suit, newTrick[3].suit];
    console.log(`array of values`, newTrickCardValuesArr);
    console.log(`array of values`, newTrickCardSuitsArr);
    console.log(newTrick);
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
            spades.deck.push(trick.splice(0,4)); // return card to deck
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
    for (let i=0; i<players.p0.hand.length; i++){
        newLeft += 25;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.left = `${newLeft}px`;
        pCard.src = `${players.p0.hand[i].imgSrc}`;
        p0HandDOM.appendChild(pCard);
        pCard.addEventListener('click', () => {
            let selectedCardindex = players.p0.hand.indexOf(players.p0.hand[i]);
            const p0Routine =()=> {
                pCard.style.transform = 'translateY(-200px)';
                    trick[0].push(players.p0.hand.splice(selectedCardindex,1));
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
                console.log('p0 suit presence',checkSuitPresence(players.p0.hand));
                if (fisrtMove) { 
                    trickSuit = players.p0.hand[selectedCardindex].suit; 
                    console.log(`trickSuit`,trickSuit); 
                    fisrtMove = false;
                    p0Routine();
                    
                } else if (checkSuitPresence(players.p0.hand) && players.p0.hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(players.p0.hand) && players.p0.hand[selectedCardindex].suit == 'spades') {
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
    for (let i=0; i< players.p2.hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.bottom = `${newTop}px`;
        pCard.src = `${players.p1.hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
    
        pCard.addEventListener('click', (e) => {  // eventListener
            if (whosTurn === 1 && turnTotal <= 4){
            let selectedCardindex = players.p1.hand.indexOf(players.p1.hand[i]);
            console.log(selectedCardindex);
            const p1Routine = () => {
                pCard.style.transform = 'translateX(-200px)';
                trick[1].push(players.p1.hand.splice(selectedCardindex,1));
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
    
            console.log('p1 suit presence',checkSuitPresence(players.p1.hand));
                if (fisrtMove) { 
                    trickSuit = players.p1.hand[selectedCardindex].suit; 
                    console.log(`p1-first move, trickSuit`,trickSuit); 
                    fisrtMove = false;
                    p1Routine();                    
                }  else if (checkSuitPresence(players.p1.hand) && players.p1.hand[selectedCardindex].suit != trickSuit){
                        console.log(pCard);
                        alert(`must select a card of ${trickSuit}`);
                    } else if (trickSuit!= 'spades' && !checkSuitPresence(players.p1.hand) && players.p1.hand[selectedCardindex].suit == 'spades') {
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
        pCard.src = `${players.p2.hand[i].imgSrc}`;
        p3HandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => { // eventListener
            if (whosTurn === 2 && turnTotal <= 4){
            let selectedCardindex = players.p2.hand.indexOf(players.p2.hand[i]); 
            const p2Routine = () => {
                pCard.style.transform = 'translateY(200px)';
                trick[2].push(players.p2.hand.splice(selectedCardindex,1));
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
                if (fisrtMove) { 
                    trickSuit = players.p2.hand.suit; 
                    console.log(`p1-first move, trickSuit`,trickSuit); 
                    fisrtMove = false;
                    p2Routine();
                        
            } else if (checkSuitPresence(players.p2.hand) && players.p2.hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(players.p2.hand) && players.p2.hand[selectedCardindex].suit == 'spades') {
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
    for (let i=0; i< players.p3.hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.top= `${newTop}px`;
        pCard.src = `${players.p3.hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => {
            if (whosTurn === 3 & turnTotal <=4){
            let selectedCardindex = players.p3.hand.indexOf(players.p3.hand[i]);
            console.log(selectedCardindex);
            const p3Routine = () => {
                pCard.style.transform = 'translateX(200px)';
                    trick[3].push(players.p3.hand.splice(selectedCardindex,1));
                    console.log(trick);
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
                if (fisrtMove) { 
                    trickSuit = players.p3.hand[selectedCardindex].suit; 
                    console.log(trickSuit);
                    fisrtMove = false;
                    p3Routine();
                } else if (checkSuitPresence(players.p3.hand) && players.p3.hand[selectedCardindex].suit != trickSuit){
                    alert(`must select a card of ${trickSuit}`);
                } else if (trickSuit!= 'spades' && !checkSuitPresence(players.p3.hand) && players.p3.hand[selectedCardindex].suit == 'spades') {
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
    