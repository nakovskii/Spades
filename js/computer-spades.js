// ******************
// 
// Laeeq Naqvi
// Spades card game
// 
// *****************

class Deck {
    constructor() {
        this.deck = [];
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
            for (let i = 0; i < values.length; i++) {
              for (let j = 0; j < suits.length; j++) {
                this.deck.push({num: values[i], suit: suits[j], value: i+2, imgSrc: `../images/${values[i]}_of_${suits[j]}.png`});
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
        partner: this.p2
    },
    p1 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p3
    },
    p2 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p0
    },
    p3 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p1
    }
}
let whosTurn = 0;
const whosTurnfn = (p) => {
    if (p == 3) {
        whosTurn = 0;
    } else {
        whosTurn = p + 1;
    }
}
// create new deck called spades
let spades = new Deck();
// shuffle it twice;
spades.shuffle();
spades.shuffle();

const dealRound = (n, index) => {
    players.p0.cards.push(spades.deck.splice(0, n));
    players.p1.cards.push(spades.deck.splice(0, n));
    players.p2.cards.push(spades.deck.splice(0, n));
    players.p3.cards.push(spades.deck.splice(0, n));
}

const dealCards = () => {
    dealRound(5);
    dealRound(4);
    dealRound(4);
    // let newLeft = 100;
    // let p0HandDOM = document.querySelectorAll('.card-img');
// This changes SRC of the 13 crads for p0
//     for (let i =0; i < 13 ; i++){
//         newLeft += 40;
//         p0HandDOM[i].style.left= `${newLeft}px`;
//         p0HandDOM[i].src = `${players.p1.hand[i].imgSrc}`;
//         p0HandDOM[i].addEventListener('click', (e) => {
//             // console.log(e);
//             let selectedCard = e.target.value
//             console.log(selectedCard);
//         });
//     }
};

//  sort the cards by suit and then value

 
// what card to throw?
// let player 1 pick a card and put it on the table
// all players will throw same cards on the suit
// check to see if the player has a higher card than the highest on the table
// if not throw the lowest of that suit
// check to see if spade is on the table? spade card.
// if not throw the lowest of the spade, if yes, throw bigger 
// if the suit is not found


// deal and display the cards of player 0
// let deal = document.getElementById('deal');
// deal.addEventListener('click', dealCards);  // temporerily disabled look
dealCards();

let p0c = players.p0.cards.flat();
let p1c = players.p1.cards.flat();
let p2c = players.p2.cards.flat();
let p3c = players.p3.cards.flat();

console.log('p0 flat',p0c);

    
    // temp play - this needs to come from the DOM - look
let table = [];
    // trick.p0.push(players.p0.hand[0]);
    
    table[0] = p0c.pop();
    
    console.log('table',table);
    let tableTsuit = table[0].suit;
    console.log('tableTsuit',tableTsuit);
    
    let tableMaxC = table[0];
    let tableMaxCIndex = table.indexOf(tableMaxC);
    console.log('tableMaxCIndex', tableMaxCIndex);
    whosTurnfn(0);
    debugger;
    console.log(`whosTurn: ${whosTurn}`);

// player 1 checks his hand and looks for the suit
    let pSuit = [];
    let pMaxCardVal = [];
    let pMinCardVal
    for (let i = 0; i < p1c.length; i++) {
        if (tableTsuit === p1c[i].suit) {
            psuit[i] = p1c[i];
        }
    }
    for (let i = 0; i < pSuit.length; i++) {
         if (pSuit[i] !== undefined) {
                if (pMaxCardVal == []) {
                    pMaxCardVal = pSuit[i]
                }
            if (tableMaxC.value < pSuit[i].value) {
             console.log(table);
            }
         }
        
    }
