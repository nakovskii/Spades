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
                this.deck.push({id: sortNum, suit: suits[j], value: i+2, imgSrc: `../images/${values[i]}_of_${suits[j]}.png`});
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
let fisrtMove = true;
// what card to throw? 
let trickSuit = ''; 
// each player has its own slot in the trick.  This is to keep track of who won the hand
let trick = [ , , , ,];

let p0hand = [];
let p1hand = [];
let p2hand = [];
let p3hand = [];

// create new deck called spades
let spades = new Deck();
let myDeck = spades.deck.flat();
// console.log(myDeck);

//  shuffle twice
spades.shuffle();
spades.shuffle();

const dealRound = (n,index) => {
    p0hand.push(myDeck.splice(0, n));
    p1hand.push(myDeck.splice(0, n));
    p2hand.push(myDeck.splice(0, n));
    p3hand.push(myDeck.splice(0, n));
}
const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2);    
};
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
    p3hand = p2hand.flat().sort(compareSort);
    // p0hand = p0hand.sort(compareSort);
    // p1hand = p1hand.sort(compareSort);
    // p2hand = p2hand.sort(compareSort);
    // p3hand = p3hand.sort(compareSort);
  }
const updateGlobalVariables = () => {
    turnTotal++;
    if (turnTotal===4){
        renderTrick();
        turnTotal = 0;
    }
    whosTurn++;
    if (whosTurn>4){whosTurn=0}
}
const playersTurnNew = (p) => {
    if (p===0){
        let cardplayed = p0hand.splice(Math.floor(Math.random()* 13),1);
        trickSuit = cardplayed.suit;
        trick[p].push(cardplayed.pop());
        updateGlobalVariables();
        // renderTrick();
    }
    else if (p===1){
        let cardplayed = p1hand.splice(Math.floor(Math.random()* 13),1);
        trickSuit = cardplayed.suit;
        trick[p].push(cardplayed.pop());
        updateGlobalVariables();
        // renderTrick();

    }
    else if (p===2){
        let cardplayed = p2hand.splice(Math.floor(Math.random()* 13),1);
        trickSuit = cardplayed.suit;
        trick[p].push(cardplayed.pop());
        updateGlobalVariables();

    }
    else if (p===3){
        let cardplayed = p3hand.splice(Math.floor(Math.random()* 13),1);
        trickSuit = cardplayed.suit;
        trick[p].push(cardplayed.pop());
        updateGlobalVariables();
        // renderTrick();
    }
    console.log(trick);
    
}
const playersTurn = () => {
    // check player's hand for suit

    // get cards in the trick


}

const renderTrick = () => {
    console.log('start renderTrick',trick);
    trick = trick.flat(2);
    let p0TrickImg = document.querySelector('#t-p0');
    let p1TrickImg = document.querySelector('#t-p1');
    let p2TrickImg = document.querySelector('#t-p2');
    let p3TrickImg = document.querySelector('#t-p3');
    console.log(p0TrickImg, p1TrickImg, p2TrickImg, p3TrickImg);
    console.log(trick);
    // if (trick[0] != []) {p0TrickImg.src = trick[0].imgSrc;}
    // if (trick[1] != []) {p1TrickImg.src = trick[1].imgSrc;}
    // if (trick[2] != []) {p2TrickImg.src = trick[2].imgSrc;}
    // if (trick[3] != []) {p3TrickImg.src = trick[3].imgSrc;}

    p0TrickImg.src = trick[0].imgSrc;
    p1TrickImg.src = trick[1].imgSrc;
    p2TrickImg.src = trick[2].imgSrc;
    p3TrickImg.src = trick[3].imgSrc;
}

const computerPlays = () => {
    if (fisrtMove){playersTurnNew(whosTurn);}
    else {playersTurn(whosTurn);}
    if (turnTotal===4){
        renderTrick();
    }
    // playersTurn(1);
    // playersTurn(2);
    // playersTurn(3);
}





const play = () => {
    dealCards();
    sortHand();
    // displayPlayer0Cards();
    // displayPlayer1Cards();
    // displayPlayer2Cards();
    // displayPlayer3Cards();
    computerPlays();
}
play();
