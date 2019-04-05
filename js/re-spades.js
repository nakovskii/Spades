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
let trickSuitId = null;
// each player has its own slot in the trick.  This is to keep track of who won the hand
let trick = [ , , , ,];

let p0hand = [];
let p1hand = [];
let p2hand = [];
let p3hand = [];
let diamonds = [];
let clubs = [];
let hearts = [];
let spades = [];
const defineSuitArray = (s, arr) => {
    for (let i = 0; i < 13; i++) {
        arr[i] = s+i;
    }
}
// create new deck called spades
let nDeck = new Deck();

//  shuffle twice
nDeck.shuffle();
nDeck.shuffle();
// get flatted deck array
let myDeck = nDeck.deck.flat();
// console.log(myDeck);
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
    let cardplayed = [];
    if (p===0){
        cardplayed.push(p0hand.splice(Math.floor(Math.random()* p0hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        trick[p] = cardplayed.pop();
        updateGlobalVariables();
    }
    else if (p===1){
        cardplayed.push(p1hand.splice(Math.floor(Math.random()* p1hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        trick[p] = cardplayed.pop();
        updateGlobalVariables();
    }
    else if (p===2){
        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        trick[p] = cardplayed.pop();
        updateGlobalVariables();
    }
    else if (p===3){
        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        trick[p] = cardplayed.pop();
        updateGlobalVariables();
        // renderTrick();
    }
    console.log(trick);
    
}
const throwDiamonds = (player) => {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
}
const checkTrickForSpades = () => {
    for (let i = 0; i < trick.length; i++) {
        if (spades.includes(trick[i].id)){
            return true;
        }
    }
    return false;
}
const doesThePlayerHaveTrickSuit = (player) => {
    for (let i = 0; i < player.length; i++) {
        if (player[i].suit === trickSuit){
            return true;
        }
    }
    return false;
}
const getTheHighestCardValueId = (player, whichsuit) => {
    if (whichsuit === 'diamonds'){
        let tempArr = [];
        for (let i = 0; i < player.length; i++) {
            if (diamonds.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        return Math.max(...tempDiaArr);

    } else if (whichsuit === 'clubs'){
        let tempArr = [];
        for (let i = 0; i < player.length; i++) {
            if (clubs.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        return Math.max(...tempArr);

    } else if (whichsuit === 'hearts'){
        let tempArr = [];
        for (let i = 0; i < player.length; i++) {
            if (hearts.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        return Math.max(...tempArr);

    } else if (whichsuit === 'spades'){
        let tempArr = [];
        for (let i = 0; i < player.length; i++) {
            if (spades.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        return Math.max(...tempArr);

    } else {return 0}
}

const getPlayerHighCardValueIdIndex = (player, playerHighCardValueId) => {
    let tempArr = [];
    for (let i = 0; i < player.length; i++) {
        tempArr[i]= player[i].id;
    }
    return tempArr.indexOf(playerHighCardValueId);
}
const playersTurn = (player) => {
    // check player's hand for suit
    if (checkTrickForSpades){
        if (trickSuit === 'spades'){
            // do something - check - look
            // check player has trick suit
        }
    } else {
        if (doesThePlayerHaveTrickSuit(player)) {
            let playerHighCardValueId = getTheHighestCardValueId(player, trickSuit);
            if (!playerHighCardValueId){
                console.log('something went wrong in finding highest card');
            }
        } else {
            let tricksHighCardId = getTricksHighCardOftrickSuitId();
            if (playerHighCardValueId > tricksHighCardId){
                let playerHighCardValueIdIndex = getPlayerHighCardValueIdIndex(player, playerHighCardValueId);
                trick.push(player.splice(playerHighCardValueIdIndex, 1));
                console.log(`player should poped card into`,trick);
                
            }
        }
    }


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
}





const play = () => {
    defineSuitArray(102, diamonds);
    defineSuitArray(115, clubs);
    defineSuitArray(128, hearts);
    defineSuitArray(141, spades);
    // console.log('diamonds',diamonds);
    // console.log('clubs',clubs);
    // console.log('hearts',hearts);
    // console.log('spades',spades);

    
    dealCards();
    sortHand();
    // displayPlayer0Cards();
    // displayPlayer1Cards();
    // displayPlayer2Cards();
    // displayPlayer3Cards();
    computerPlays();
    console.log(`trickSuit: ${trickSuit}`);
    console.log(`trickSuitId: ${trickSuitId}`);
    
}
play();
