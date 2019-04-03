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
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
            for (let i = 0; i < values.length; i++) {
              for (let j = 0; j < suits.length; j++) {
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
    console.log('asorted', a.sorted);
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
// This translates the Card by x or y co-ordinate and # px displacement
const checkSuitPresence = (hand) => {
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].suit == trickSuit) {
            return true;
        } else {
            return false;
        }
    }
}

const translateCard = (disp1, disp2) => {
    pCard.style.transform = `translateXY(${disp1}px, ${disp2}px)`;
};

let displaceCardBy = 25;  // used for laying-over cards

const displayPlayer0Cards = () => {
    let newLeft = 175;
    let p0HandDOM = document.getElementById('pl-0');
    for (let i=0; i<players.p0.hand.length; i++){
        newLeft += 25;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.left = `${newLeft}px`;
        pCard.src = `${players.p0.hand[i].imgSrc}`;
        p0HandDOM.appendChild(pCard);
        pCard.addEventListener('click', () => {
            if (whosTurn === 0){
                let selectedCardindex = players.p0.hand.indexOf(players.p0.hand[i]);
                console.log(selectedCardindex);
                if (fisrtMove) { 
                    trickSuit = players.p0.hand[selectedCardindex].suit; 
                    console.log(trickSuit); 
                    fisrtMove = false;
                    pCard.style.transform = 'translateY(-200px)';
                    trick[0].push(players.p0.hand.splice(selectedCardindex,1));
                    whosTurn = 1;    
                } else if (checkSuitPresence(players.p0.hand) && players.p0.hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                    // pCard.removeEventListener('click', ()=>{
                    //     alert(`must select a card of ${trickSuit}`);
                    // });
                } else {
                    pCard.style.transform = 'translateY(-200px)';
                    trick[0].push(players.p0.hand.splice(selectedCardindex,1));
                    whosTurn = 1;    
                }
            }
        });
    }    
};

const displayPlayer1Cards = () => {
    let newTop = 0;
    let pHandDOM = document.getElementById('pl-1');
    for (let i=0; i< players.p2.hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.bottom = `${newTop}px`;
        pCard.src = `${players.p1.hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => {  // eventListener
            if (whosTurn === 1){
            let selectedCardindex = players.p1.hand.indexOf(players.p1.hand[i]);
            console.log(selectedCardindex);
                if (fisrtMove) { 
                    trickSuit = players.p1.hand[selectedCardindex].suit; 
                    console.log(trickSuit); 
                    fisrtMove = false;
                    pCard.style.transform = 'translateX(-200px)';
                    trick[1].push(players.p1.hand.splice(selectedCardindex,1));
                    whosTurn = 2;
                }  else if (checkSuitPresence(players.p1.hand) && players.p1.hand[selectedCardindex].suit != trickSuit){
                        console.log(pCard);
                        alert(`must select a card of ${trickSuit}`);
                        // pCard.removeEventListener('click', ()=>{
                        //     alert(`must select a card of ${trickSuit}`);
                        // });
                    } else {
                    // translateCard(-200, 0);
                        pCard.style.transform = 'translateX(-200px)';
                        trick[1].push(players.p1.hand.splice(selectedCardindex,1));
                        whosTurn = 2;
                    }
            
            
            
            
            }
        });
    }    
};

const displayPlayer2Cards = () => {
    let newLeft = 175;
    let p3HandDOM = document.getElementById('pl-2');
    for (let i=0; i<13; i++){
        newLeft += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.left = `${newLeft}px`;
        pCard.src = `${players.p2.hand[i].imgSrc}`;
        p3HandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => { // eventListener
            if (whosTurn === 2){
            let selectedCardindex = players.p2.hand.indexOf(players.p2.hand[i]);
            console.log(selectedCardindex);
                if (fisrtMove) { 
                    trickSuit = players.p2.hand.suit; 
                    console.log(trickSuit);
                    fisrtMove = false;
                } else if (checkSuitPresence(players.p2.hand) && players.p2.hand[selectedCardindex].suit != trickSuit){
                    console.log(pCard);
                    alert(`must select a card of ${trickSuit}`);
                    // pCard.removeEventListener('click', ()=>{
                    //     alert(`must select a card of ${trickSuit}`);
                    // });
                } else {
                // translateCard(y, 200);
                pCard.style.transform = 'translateY(200px)';
                trick[2].push(players.p2.hand.splice(selectedCardindex,1));
                whosTurn = 3;
                }
            } else {
                alert(`not your turn.`);
            }
        });
    }    
};
const displayPlayer3Cards = () => {
    let newTop = 0;
    let pHandDOM = document.getElementById('pl-3');
    for (let i=0; i< players.p3.hand.length; i++){
        newTop += displaceCardBy;
        let pCard = document.createElement('img');
        pCard.classList.add('card-img');
        pCard.style.top= `${newTop}px`;
        pCard.src = `${players.p3.hand[i].imgSrc}`;
        pHandDOM.appendChild(pCard);
        pCard.addEventListener('click', (e) => {
            if (whosTurn === 3){
            let selectedCardindex = players.p3.hand.indexOf(players.p3.hand[i]);
            console.log(selectedCardindex);
                if (fisrtMove) { 
                    trickSuit = players.p3.hand[selectedCardindex].suit; 
                    console.log(trickSuit);
                    fisrtMove = false;
                    pCard.style.transform = 'translateX(200px)';
                    // pCard.style.display = 'none';
                    trick[3].push(players.p3.hand.splice(selectedCardindex,1));
                    console.log(trick);
                    whosTurn = 0;
                } else if (checkSuitPresence(players.p3.hand) && players.p3.hand[selectedCardindex].suit != trickSuit){
                    alert(`must select a card of ${trickSuit}`);
                } else {
                    pCard.style.transform = 'translateX(200px)';
                    // pCard.style.display = 'none';
                    trick[3].push(players.p3.hand.splice(selectedCardindex,1));
                    console.log(trick);
                    whosTurn = 0;
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
    displayPlayer0Cards();
    displayPlayer1Cards();
    displayPlayer2Cards();
    displayPlayer3Cards();
}
play();
    
    // temp play - this needs to come from the DOM - look
    