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
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p3
    },
    p2 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p4
    },
    p3 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p1
    },
    p4 : { 
        cards : [],
        hand : [],
        tricksBid: 0,
        tricksWon: 0,
        partner: this.p2
    }
}
let whosTurn = 1;
let table = [];
// create new deck called spades
let spades = new Deck();
// shuffle it twice;
spades.shuffle();
spades.shuffle();

const dealRound = (n,index) => {
    players.p1.cards.push(spades.deck.splice(0, n));
    players.p2.cards.push(spades.deck.splice(0, n));
    players.p3.cards.push(spades.deck.splice(0, n));
    players.p4.cards.push(spades.deck.splice(0, n));
        for (let i = 0; i < n; i++) {
            players.p1.hand.push(players.p1.cards[index].pop());
            players.p2.hand.push(players.p2.cards[index].pop());
            players.p3.hand.push(players.p3.cards[index].pop());
            players.p4.hand.push(players.p4.cards[index].pop());
        }
}

const dealCards = () => {
    dealRound(5,0);
    dealRound(4,1);
    dealRound(4,2);
    let newLeft = 100;
    let p1HandDOM = document.querySelectorAll('.card-img');
    for (let i =0; i < 13 ; i++){
        newLeft += 40;
        p1HandDOM[i].style.left= `${newLeft}px`;
        p1HandDOM[i].src = `${players.p1.hand[i].imgSrc}`;
    }
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






// display the cards of player 1

let deal = document.getElementById('deal');
deal.addEventListener('click', dealCards);
