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
let firstMove = true;
// what card to throw? 
let trickSuit = ''; 
let trickSuitId = null;
// each player has its own variable for the trick.  This is to keep track of who won the hand
let trick = [ , , , ,];
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
// const defineSuitArray = (s, arr) => {
//     for (let i = 0; i < 13; i++) {
//         arr[i] = s+i;
//     }
// }
// defineSuitArray(102, diamonds);
// defineSuitArray(115, clubs);
// defineSuitArray(128, hearts);
// defineSuitArray(141, spades);

// console.log('diamonds', diamonds);
// console.log('clubs',clubs);
// console.log('hearts', hearts);
// console.log('spades', spades);

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
  const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2); 
    sortHand();   
};

const updateGlobalVariables = () => {
    firstMove = false;
    turnTotal++;
    whosTurn++;
    if (turnTotal===4){
        renderTrick();
        turnTotal = 0;
    }
    if (whosTurn>3){whosTurn=0}
    console.log(`g-Variables update 1stmove:${firstMove} turnT: ${turnTotal} whosTrun: ${whosTurn}`);
    computerPlays();
}
const playersTurnNew = (p) => {
    let cardplayed = [];
    if (p===0){
        console.log(`player 0`, p0hand);
        
        cardplayed.push(p0hand.splice(Math.floor(Math.random()* p0hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p0Trick.push(cardplayed.pop());
        console.log(`p0Trick after cardplayed`,p0Trick);
        updateGlobalVariables();
    }
    else if (p===1){
        console.log(`player 1`, p1hand);
        cardplayed.push(p1hand.splice(Math.floor(Math.random()* p1hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p1Trick.push(cardplayed.pop());
        console.log(`p1Trick after cardplayed`, p1Trick);
        updateGlobalVariables();
    }
    else if (p===2){
        console.log(`player 2`, p2hand);

        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p2Trick.push(cardplayed.pop());
        console.log(`p2Trick after cardplayed`, p2Trick);
        updateGlobalVariables();
    }
    else if (p===3){
        console.log(`player 3`, p3hand);

        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p3Trick.push(cardplayed.pop());
        console.log(`p3Trick after cardplayed`,p3Trick);
        updateGlobalVariables();
    }    
}

const checkTrickForSpades = () => {
    console.log(`checking trick for spades`);
    return spades.includes(p0Trick.id) || spades.includes(p1Trick.id) || spades.includes(p2Trick.id) || spades.includes(p3Trick.id);
}
const doesThePlayerHaveTrickSuit = (player) => {
    console.log(`check doesThePlayerHaveTrickSuit ${whosTurn} hand`, player);
    for (let i = 0; i < player.length; i++) {
        if (player[i].suit === trickSuit){
            console.log(`player ${whosTurn} at index ${i} has ${player[i].suit} & trickSuit: ${trickSuit}`);
            return true;
        }
    }
    return false;
}

const getTheHighestCardValueId = (player, whichsuit) => {
    console.log(`getting highest card val, whichsuit:`, whichsuit);
    // not going below this 
    let tempArr = [];
    let maxID = null;
    player = player.flat();
    if (whichsuit == 'diamonds'){
        for (let i = 0; i < player.length; i++) {
            if (diamonds.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        maxID = Math.max(...tempArr);
        console.log(`tempArr`,tempArr, maxID);
        return maxID;
    } else if (whichsuit == 'clubs'){
        for (let i = 0; i < player.length; i++) {
            if (clubs.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        maxID = Math.max(...tempArr);
        console.log(`tempArr`,tempArr, maxID);
        return maxID;
    } else if (whichsuit == 'hearts'){
        for (let i = 0; i < player.length; i++) {
            if (hearts.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        maxID = Math.max(...tempArr);
        console.log(`tempArr`,tempArr, maxID);
        return maxID;
    } else if (whichsuit == 'spades'){
        for (let i = 0; i < player.length; i++) {
            if (spades.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        maxID = Math.max(...tempArr);
        console.log(`tempArr`,tempArr, maxID);
        return maxID;
    } else {return 0}
}

const getPlayerHighCardValueIdIndex = (player, playerHighCardValueId) => {
    console.log(`in getPlayerHighCardValueIdIndex`);
    let tempArr = [];
    for (let i = 0; i < player.length; i++) {
        tempArr[i]= player[i].id;
    }
    return tempArr.indexOf(playerHighCardValueId);
}

const getTheLowestCardValueId = (player, whichsuit)=> {
    console.log(`find lowest card. whichsuit: `, whichsuit);
    let tempArr = [];
    if (whichsuit == 'diamonds'){
        for (let i = 0; i < player.length; i++) {
            if (diamonds.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        console.log(`min tempArr`,tempArr);
        return Math.min(...tempArr);
    } else if (whichsuit == 'clubs'){
        for (let i = 0; i < player.length; i++) {
            if (clubs.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        console.log(`min tempArr`,tempArr);
        return Math.min(...tempArr);
    } else if (whichsuit == 'hearts'){
        for (let i = 0; i < player.length; i++) {
            if (hearts.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        console.log(`min tempArr`,tempArr);
        return Math.min(...tempArr);
    } else if (whichsuit == 'spades'){
        for (let i = 0; i < player.length; i++) {
            if (spades.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        console.log(`min tempArr`,tempArr);
        return Math.min(...tempArr);
    } else {return 0}
} 

const getTricksHighCardOftrickSuitId = () => {
    console.log(`getting tricks hig card id`);
    
    let tempArr = [];
    if (p0Trick != [] && p0Trick.suit == trickSuit){
        tempArr.push(p0Trick.id);
    } else if (p1Trick != [] && p0Trick.suit == trickSuit){
        tempArr.push(p1Trick.id);
    } else if (p2Trick != [] && p0Trick.suit == trickSuit){
        tempArr.push(p2Trick.id);
    } else if (p3Trick != [] && p0Trick.suit == trickSuit){
        tempArr.push(p3Trick.id);
    } else {}
    return Math.max(...tempArr);
}

const throwCardIntoTrick = (whozturn, player, index) =>{
    if (whozturn === 0){
        p0Trick.push(player.splice(index, 1));
        p1Trick = p0Trick.flat();
        console.log(`p0 threw a card in trick from index: ${index} p0trick:`,p0Trick);
        updateGlobalVariables();
    } else if (whozturn===1) {
        p1Trick.push(player.splice(index, 1));
        p1Trick = p1Trick.flat();
        console.log(`p1 threw a card in trick from index: ${index} p1trick:`,p1Trick);
        updateGlobalVariables();
    } else if (whozturn===2) {
        p2Trick.push(player.splice(index, 1));
        p2Trick = p2Trick.flat();
        console.log(`p2 threw a card in trick from index: ${index} p2trick:`,p2Trick);
        updateGlobalVariables();
    } else if (whozturn===3) {
        p3Trick.push(player.splice(index, 1));
        p3Trick = p3Trick.flat();
        console.log(`p3 threw a card in trick from index: ${index} p3trick:`,p3Trick);
        updateGlobalVariables();
    }else {console.log(`error player not known`);
    } 
}

const playersTurn = (whozturn) => {
    // check player's hand for suit
    console.log(`playersTurn`);
    let player = null;
    if (whozturn===0){
        player = p0hand;
    } else if (whozturn===1) {
        player = p1hand;
    } else if (whozturn===2) {
        player = p2hand;
    } else if (whozturn===3) {
        player = p3hand;
    }else {console.log(`error player not known`);
    }
    // console.log(`player ${whozturn}'s hand `, player);
    // code is fine upto here
    if (checkTrickForSpades()){
        if (trickSuit !== 'spades'){
            console.log(`spades in the trick & trickSuit not equals spades`);
            if (doesThePlayerHaveTrickSuit(player)) {
                // if yes, throw smallest card
                let playerLowCardValueId = getTheLowestCardValueId(player, trickSuit);
            } else {
                // if no, throw bigger spades card
                // if no bigger spades card then throw lowest card from the deck
            }
        }
    } else {
        if (doesThePlayerHaveTrickSuit(player)) {
            // checked! player has trickSuit
            let playerHighCardValueId = getTheHighestCardValueId(player, trickSuit);
            if (!playerHighCardValueId){
                console.log('something went wrong in finding highest card');
            } else {
                let tricksHighCardId = getTricksHighCardOftrickSuitId();
                if (playerHighCardValueId > tricksHighCardId){
                    let playerHighCardValueIdIndex = getPlayerHighCardValueIdIndex(player, playerHighCardValueId);
                    // p${}.push(player.splice(playerHighCardValueIdIndex, 1));
                    throwCardIntoTrick(whosTurn,player,playerHighCardValueIdIndex);
                    console.log(`player should've poped high card into trick`, whosTurn);
                } else {
                    playerLowCardValueId = getTheLowestCardValueId(player, trickSuit);
                    throwCardIntoTrick(whosTurn, player, playerLowCardValueId);
                    console.log(`player should've poped low card into into trick`, whosTurn);
                }
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

    p0TrickImg.src = p0Trick.imgSrc;
    p1TrickImg.src = p1Trick.imgSrc;
    p2TrickImg.src = p2Trick.imgSrc;
    p3TrickImg.src = p3Trick.imgSrc;
}

const computerPlays = () => {
    console.log(`whosTurn: ${whosTurn}, turnTotal: ${turnTotal}`);
    if (firstMove){playersTurnNew(whosTurn);}
    else {playersTurn(whosTurn);}
    if (turnTotal===4){
        renderTrick();
    }
    
}

const play = () => {
    dealCards();
    sortHand();
    computerPlays();
    console.log(`trickSuit: ${trickSuit}`);
    console.log(`trickSuitId: ${trickSuitId}`);
    
}
play();
