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
                this.deck.push({num: values[i], suit: suits[j], value: i+2, imgSrc: `${values[i]}_of_${suits[j]}2.png`});
              }
            }
            // console.log(deck);  // log the deck to console
          
        // for (let suit in suits){
        //     for (let value in values){
        //         this.deck.push({num: `${values[value]}`, sut: `${suits[suit]}`, rank: `${values[value] + 2}`, src:`${values[value]}_of_${suits[suit]}2.png`});
        //     }
        // }
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
    p1 : { 
        cards : [],
        hand : [],
        partner: this.p3
    },
    p2 : { 
        cards : [],
        hand : [],
        partner: this.p4
    },
    p3 : { 
        cards : [],
        hand : [],
        partner: this.p1
    },
    p4 : { 
        cards : [],
        hand : [],
        partner: this.p2
    }
}

// create new deck called spades
let spades = new Deck();
// shuffle it twice;
spades.shuffle();
spades.shuffle();

let p1Cards = players.p1.cards;
let p1Hand = players.p1.hand;

const dealRound1 = () => {
    players.p1.cards.push(spades.deck.splice(0, 5));
    players.p2.cards.push(spades.deck.splice(0, 5));
    players.p3.cards.push(spades.deck.splice(0, 5));
    players.p4.cards.push(spades.deck.splice(0, 5));
    // for (let i = 0; i < 5; i++) {
    //     players.p1.hand.push(pop(players.p1.cards[0][0]));
        
    // }
}
const dealRound2 = () => {
    players.p1.cards.push(spades.deck.splice(0, 4));
    players.p2.cards.push(spades.deck.splice(0, 4));
    players.p3.cards.push(spades.deck.splice(0, 4));
    players.p4.cards.push(spades.deck.splice(0, 4));
}
const dealRound3 = () => {
    players.p1.cards.push(spades.deck.splice(0, 4));
    players.p2.cards.push(spades.deck.splice(0, 4));
    players.p3.cards.push(spades.deck.splice(0, 4));
    players.p4.cards.push(spades.deck.splice(0, 4));
}

const dealCards = () => {
    dealRound1();
    dealRound2();
    dealRound3();
};

dealCards();
console.log('p1 hand',players.p1.cards)
console.log(spades.deck.length);

let 