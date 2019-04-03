class Deck {
    constructor() {
        this.deck = [];
        let sortNum = 102
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
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
// which player goes next
let whosTurn = 0;
// turn Total must not be greater than 4
let turnTotal = 0
// if firstMove = true player is allowed to pick any card
let fisrtMove = true;
// what card to throw? 
let trickSuit = ''; 
// each player has its own slot in the trick.  This is to keep track of who won the hand
let trick = [[],[],[],[]];


// create new deck called spades
let spades = new Deck();
// console.log(spades.deck);

// shuffle it twice;
spades.shuffle();
spades.shuffle();




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
const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2);
};

dealCards();
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
    debugger;
    console.log('a.sorted', a.sorted, 'b.sorted', b.sorted);
    if (a.sorted > b.sorted) {
      comparison = 1;
    } else if (a.sorted < b.sorted) {
      comparison = -1;
    }
    return comparison;
  }
// compare is not working  - look check
console.log(players.p0.hand);
let handSorted = players.p0.hand.sort(compareSort);
console.log(handSorted);
// above is not working
