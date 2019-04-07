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
        tricksBid: 0,
        tricksWon: 0,
    },
    p1 : { 
        tricksBid: 0,
        tricksWon: 0,
    },
    p2 : { 
        tricksBid: 0,
        tricksWon: 0,
    },
    p3 : { 
        tricksBid: 0,
        tricksWon: 0,
    }
}

let myDeck = [];
// which player goes next
let whosTurn = 0;
// turn Total must not be greater than 4
let turnTotal = 0
// turnNumber
let tricksTotal = 1;
// if firstMove = true player is allowed to pick any card
let firstMove = true;
// what card to throw? 
let trickSuit = ''; 
let trickSuitId = null;
let tricksHighCardHolder = null;
// each player has its own variable for the trick.  This is to keep track of who won the hand
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
// myDeck = flattenf(nDeck.deck.slice());
// console.log(myDeck);
// console.log(myDeck);
const dealRound = (n,index) => {
    p0hand.push(myDeck.splice(0, n));
    p1hand.push(myDeck.splice(0, n));
    p2hand.push(myDeck.splice(0, n));
    p3hand.push(myDeck.splice(0, n));
}
// array.flat() is not working after React Install so created own flatten function
flatten = (arr) => {
    return Array.prototype.concat(...arr);
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
    p0hand = flatten(p0hand).sort(compareSort);
    p1hand = flatten(p1hand).sort(compareSort);
    p2hand = flatten(p2hand).sort(compareSort);
    p3hand = flatten(p3hand).sort(compareSort);
  }
  const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2); 
    sortHand();   
};

const updateTurnVariables = () => {
    firstMove = false;
    turnTotal++;
    `Player ${whosTurn} just finished. updating`
    whosTurn++;
    if (turnTotal==4){
        renderTrick();
        evaluateTrick();
        turnTotal = 0;
        tricksTotal++;
    } else {
        computerPlays();
    }
    if (whosTurn==4){whosTurn=0;}
    console.log(`g-Variables update 1stmove:${firstMove} turnT: ${turnTotal} whosTrun: ${whosTurn}`);
}
const playersTurnNew = (p) => {
    let cardplayed = [];
    if (p===0){
        console.log(`player 0`, p0hand);
        cardplayed.push(p0hand.splice(Math.floor(Math.random()* p0hand.length),1));
        cardplayed = flatten(cardplayed);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p0Trick.push(cardplayed.pop());
        console.log(`p0Trick after cardplayed`,p0Trick);
        updateTurnVariables();
        tricksHighCardHolder = 0;
    }
    else if (p===1){
        console.log(`player 1`, p1hand);
        cardplayed.push(p1hand.splice(Math.floor(Math.random()* p1hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p1Trick.push(cardplayed.pop());
        console.log(`p1Trick after cardplayed`, p1Trick);
        updateTurnVariables();
        tricksHighCardHolder = 1;
    }
    else if (p===2){
        console.log(`player 2`, p2hand);

        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p2Trick.push(cardplayed.pop());
        console.log(`p2Trick after cardplayed`, p2Trick);
        updateTurnVariables();
        tricksHighCardHolder = 2;
    }
    else if (p===3){
        console.log(`player 3`, p3hand);
        cardplayed.push(p2hand.splice(Math.floor(Math.random()* p2hand.length),1));
        cardplayed = cardplayed.flat(2);
        trickSuit = cardplayed[0].suit;
        trickSuitId = cardplayed[0].id;
        p3Trick.push(cardplayed.pop());
        console.log(`p3Trick after cardplayed`,p3Trick);
        updateTurnVariables();
        tricksHighCardHolder = 3;
    }    
} // playersTurnNew() end 

// check this is flawed
const checkTrickForSpades = () => {
    console.log(`checking trick for spades`, p0Trick, p1Trick, p2Trick, p3Trick);
    let p0hasSpades = false;
    let p1hasSpades = false;
    let p2hasSpades = false;
    let p3hasSpades = false;
    if(p0Trick) {
        p0hasSpades = spades.includes(p0Trick[0].id);
    } else if (p1Trick)  {
        p1hasSpades = spades.includes(p1Trick[0].id);
    } else if(p2Trick) {
        p2hasSpades = spades.includes(p2Trick[0].id);
    } else if (p3Trick) {
        p3hasSpades = spades.includes(p3Trick[0].id);
    } 
    debugger;
    return (p0hasSpades || p1hasSpades || p2hasSpades || p3hasSpades);
} // end checkTrickForSpades

const doesThePlayerHaveSuit = (player, suit) => {
    console.log(`check doesThePlayerHaveSuit ${whosTurn} hand`, player, suit);
    for (let i = 0; i < player.length; i++) {
        if (player[i].suit === suit){
            console.log(`player ${whosTurn} at index ${i} has ${player[i].suit} & trickSuit: ${trickSuit}`);
            return true;
        }
    }
    return false;
} // doesThePlayerHaveSuit

const getTheHighestCardValueId = (player, whichsuit) => {
    console.log(`getting highest card val, whichsuit:`, whichsuit);
    // not going below this 
    let tempArr = [];
    let maxID = null;
    player = flatten(player);
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
    } else {return false}
} 

const getPlayerCardValueIdIndex = (player, playerCardValueId) => {
    console.log(`in getPlayerCardValueIdIndex`);
    let tempArr = [];
    for (let i = 0; i < player.length; i++) {
        tempArr[i]= player[i].id;
    }
    return tempArr.indexOf(playerCardValueId);
}

const getTricksHighCardOfSuitId = (suit) => {
    console.log(`getting tricks hig card id`);
    let tempArr = [];
    if (p0Trick != [] && p0Trick.suit == suit){
        tempArr.push(p0Trick.id);
    } else if (p1Trick != [] && p0Trick.suit == suit){
        tempArr.push(p1Trick.id);
    } else if (p2Trick != [] && p0Trick.suit == suit){
        tempArr.push(p2Trick.id);
    } else if (p3Trick != [] && p0Trick.suit == suit){
        tempArr.push(p3Trick.id);
    } else {}
    return Math.max(...tempArr);
}

const throwCardIntoTrick = (whozturn, player, index) =>{
    if (whozturn === 0){
        p0Trick.push(player.splice(index, 1));
        p1Trick = flatten(flatten(p0Trick));
        console.log(`p0 threw a card in trick from index: ${index} p0trick:`,p0Trick);
        updateTurnVariables();
    } else if (whozturn===1) {
        p1Trick.push(player.splice(index, 1));
        p1Trick = flatten(p1Trick);
        console.log(`p1 threw a card in trick from index: ${index} p1trick:`,p1Trick);
        updateTurnVariables();
    } else if (whozturn===2) {
        p2Trick.push(player.splice(index, 1));
        p2Trick = flatten(p2Trick);
        console.log(`p2 threw a card in trick from index: ${index} p2trick:`,p2Trick);
        updateTurnVariables();
    } else if (whozturn===3) {
        p3Trick.push(player.splice(index, 1));
        p3Trick = flatten(p3Trick);
        console.log(`p3 threw a card in trick from index: ${index} p3trick:`,p3Trick);
        updateTurnVariables();
    }else {console.log(`error: player not known`);
    } 
}

const whosTurnIsIt = (whozturn) => {
    if (whozturn===0){
        return p0hand;
    } else if (whozturn===1) {
        return p1hand;
    } else if (whozturn===2) {
        return p2hand;
    } else if (whozturn===3) {
        return p3hand;
    }else {console.log(`error: player not known`); 
    }
}

const findPlayersSmallestCardIndex = (player) => {
    // finds most cards on thr same suit minus spades
    let diamondsSmallestCardId = getTheLowestCardValueId (player, 'diamonds');
    let heartsSmallestCardId = getTheLowestCardValueId (playerCardValueId, 'hearts');
    let clubsSmallestCardId = getTheLowestCardValueId (player, 'clubs');
    let diamondsSmallestCardIndex = findPlayersSmallestCardIndex(player, diamondsSmallestCardId);
    let heartsSmallestCardIndex = findPlayersSmallestCardIndex(player, heartsSmallestCardId);
    let clubssSmallestCardIndex = findPlayersSmallestCardIndex(player, clubsSmallestCardId);
    let smallestCardIndex = null;
    if (clubsSmallestCardId) {
        smallestCardIndex = getPlayerCardValueIdIndex(player, clubsSmallestCardId);
        if (heartsSmallestCardId && player[findPlayersSmallestCardIndex(player, heartsSmallestCardId)].value < player[smallestCardIndex].value) {
                smallestCardIndex = findPlayersSmallestCardIndex(player, heartsSmallestCardId);
        } else if (diamondsSmallestCardId && player[findPlayersSmallestCardIndex(player, diamondsSmallestCardId)].value < player[smallestCardIndex].value) {
                smallestCardIndex = findPlayersSmallestCardIndex(player, diamondsSmallestCardId);
        } 
    } else if (diamondsSmallestCardId){
        smallestCardIndex = getPlayerCardValueIdIndex(player, diamondsSmallestCardId);
        if (heartsSmallestCardId && player[findPlayersSmallestCardIndex(player, heartsSmallestCardId)].value < player[smallestCardIndex].value) {
            smallestCardIndex = findPlayersSmallestCardIndex(player, heartsSmallestCardId)
        }
    }
}

const playersTurn = (whozturn) => {
    // check player's hand for suit
    console.log(`playersTurn`);
    console.log(`trickSuit: ${trickSuit}`);
    console.log(`trickSuitId: ${trickSuitId}`);
    debugger;
    let player = whosTurnIsIt(whozturn);
    // console.log(`player ${whozturn}'s hand `, player);
    // code is fine upto here
    if (checkTrickForSpades()){
        if (trickSuit !== 'spades'){
            console.log(`spades in the trick & trickSuit not equals spades`);
            if (doesThePlayerHaveSuit(player, trickSuit)) {
                // if yes, throw smallest card
                let playerLowCardValueId = getTheLowestCardValueId(player, trickSuit);
                let playerLowCardValueIdIndex = getPlayerCardValueIdIndex(player, playerLowCardValueId)
                throwCardIntoTrick(whosTurn, player, playerLowCardValueIdIndex);
                console.log(`player with highest card in the tricks is p:${tricksHighCardHolder}`);
            } else { // if the trick has spades and it's not the tricksuit 
                // if the player doesn't have tricksuit either
                // check if the player has spades
                if (doesThePlayerHaveSuit(player, 'spades')) {
                    let playerHighCardValueId = getTheHighestCardValueId(player, 'spades');
                    let tricksHighCardId = getTricksHighCardOfSuitId('spades');
                    if (playerHighCardValueId > tricksHighCardId){
                        let playerHighCardValueIdIndex = getPlayerCardValueIdIndex(player, playerHighCardValueId);
                        throwCardIntoTrick(whosTurn, player, playerHighCardValueIdIndex);
                        tricksHighCardHolder = whosTurn;
                        console.log(`player with highest spade card in the tricks is p:${tricksHighCardHolder}`);
                    // if no bigger spades card then throw lowest card from the deck
                    } else {
                        console.log(`get lowest non-spade card !!`);
                        
                    }
                } else {
                    console.log(`player does't have Spades`);
                    
                    }
            }  // end else if player doesn't have suit
        }    
    } else { // if the trick doesn't have spade
        if (doesThePlayerHaveSuit(player, trickSuit)) {
            // checked! player has trickSuit
            let playerHighCardValueId = getTheHighestCardValueId(player, trickSuit);
            if (!playerHighCardValueId){
                console.log('something went wrong in finding highest card');
            } else {
                tricksHighCardId = getTricksHighCardOfSuitId(trickSuit);
                if (playerHighCardValueId > tricksHighCardId){
                    let playerHighCardValueIdIndex = getPlayerCardValueIdIndex(player, playerHighCardValueId);
                    // p${}.push(player.splice(playerHighCardValueIdIndex, 1));
                    throwCardIntoTrick(whosTurn,player,playerHighCardValueIdIndex);
                    tricksHighCardHolder = whosTurn;
                    console.log(`player ${whosTurn} should've poped high card into trick`, whosTurn, p0Trick, p1Trick, p3Trick);
                } else {
                    playerLowCardValueId = getTheLowestCardValueId(player, trickSuit);
                    playerLowCardValueIdIndex = getPlayerCardValueIdIndex (player, playerLowCardValueId);
                    throwCardIntoTrick(whosTurn, player, playerLowCardValueIdIndex);
                    console.log(`player ${whosTurn} should've poped high card into trick`, whosTurn, p0Trick, p1Trick, p3Trick);
                }
            } 
        } else { // if the player doesn't have suit, check if the player has spades
            if (doesThePlayerHaveSuit(player, 'spades')) {
                tricksHighCardId = getTricksHighCardOfSuitId('spades');
                playerCardValueId = getTheHighestCardValueId(player, 'spades');
                if (playerCardValueId > tricksHighCardId) {
                    playerHighCardValueIdIndex = getPlayerCardValueIdIndex(player, 'spades');
                    throwCardIntoTrick(whosturn, player, playerHighCardValueIdIndex);
                    tricksHighCardHolder = whosTurn;
                } else { // player desn't have higher spades card
                    console.log(`player doesn't have higher spades card`);
                    playerLowCardValueIdIndex = findPlayersSmallestCardIndex(player);
                    throwCardIntoTrick(whosTurn, player, playerLowCardValueIdIndex);
                }
            } else { // the player doesn't have spades
                playerLowCardValueIdIndex = findPlayersSmallestCardIndex(player);
                throwCardIntoTrick(whosTurn, player, playerLowCardValueIdIndex);
            }
        }
    }

}

const renderTrick = () => {
    console.log('start renderTrick');
    // let p0TrickImg = document.querySelector('#t-p0');
    // let p1TrickImg = document.querySelector('#t-p1');
    // let p2TrickImg = document.querySelector('#t-p2');
    // let p3TrickImg = document.querySelector('#t-p3');
    // console.log(p0TrickImg, p1TrickImg, p2TrickImg, p3TrickImg);
    // p0TrickImg.src = p0Trick.imgSrc;
    // p1TrickImg.src = p1Trick.imgSrc;
    // p2TrickImg.src = p2Trick.imgSrc;
    // p3TrickImg.src = p3Trick.imgSrc;
}

const computerPlays = () => {
    console.log(`whosTurn: ${whosTurn}, turnTotal: ${turnTotal}`);
    if (firstMove){playersTurnNew(whosTurn);}
    else {playersTurn(whosTurn);}
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
const clearTrick = () => {
    document.querySelector('#t-p0').src = '';
    document.querySelector('#t-p1').src = '';
    document.querySelector('#t-p2').src = '';
    document.querySelector('#t-p3').src = '';
    trickSuit = '';
    turnTotal = 0;
    firstMove = true;
}
const evaluateTrick = () => {
    // let trickCardSuitsArr = [p0Trick[0].suit, p1Trick[0].suit, p2Trick[0].suit, p3Trick[0].suit];
    // let indexOfSuitsArr = [];
    // let highestCardIndex = null;
    // let tricksWinner = null;
    // if ((trickSuit != 'spades') && trickCardSuitsArr.includes('spades')) {
    //     // evaluate for spades only
    //     console.log(`trick includes Spades`);
    //     indexOfSuitsArr = trickCardSuitsArr.indexOf('spades');
    //     let spadesCardArr = 
    //     highestCardValue = Math.max(...spadesCardArr);
    //     highestCardIndex = trickCardSuitsArr.indexOf(highestCardValue);
    //     updateTricksWon(highestCardIndex);
    //     setTimeout(clearTrick, 500);
    // } else if (trickCardSuitsArr.every( (val, i, arr) => val === trickSuit )) {
    //     // evaluate for trick suit only
    //     console.log(`same suit trick`);
    //     highestCardValue = Math.max(...trickCardValuesArr);
    //     highestCardIndex = trickCardValuesArr.indexOf(highestCardValue);
    //     console.log(highestCardIndex);
    //     tricksWinner = `p${highestCardIndex}hand`;
    //     console.log(tricksWinner);
    //     updateTricksWon(highestCardIndex);
    //     setTimeout(clearTrick, 500);
    // } else if (trickCardSuitsArr.includes(trickSuit)){
    //     console.log(` cards other than trick suit`);
    //     indexOfSuitsArr = newTrickCardSuitsArr.indexOf(trickSuit);
    //     let spadesCardArr = [trickCardSuitsArr[indexOfSuitsArr[0]], trickCardSuitsArr[indexOfSuitsArr[1]],trickCardSuitsArr[indexOfSuitsArr[2]],trickCardSuitsArr[indexOfSuitsArr[3]]];
    //     highestCardValue = Math.max(...spadesCardArr);
    //     highestCardIndex = trickCardSuitsArr.indexOf(highestCardValue);
    //     updateTricksWon(highestCardIndex);
    //     setTimeout(clearTrick, 500);
    // }
    console.log(`tricks highcard holder should be ${tricksHighCardHolder}`);
    console.log(p0Trick, p1Trick, p2Trick, p3Trick);
    
    
    // if (tricksTotal < 13){
    //     computerPlays();
    // }
}
const play = () => {
    //  shuffle twice
    nDeck.shuffle();
    nDeck.shuffle();
    // get flatted deck array
    myDeck = flatten(nDeck.deck.slice());
    // console.log(myDeck);

    dealCards();
    sortHand();
    computerPlays();
    
}

play();
