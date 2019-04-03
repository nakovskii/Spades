
let hand = [ { num: 'ace',
suit: 'hearts',
value: 14,
imgSrc: '../images/ace_of_hearts.png' },
{ num: 2,
suit: 'diamonds',
value: 2,
imgSrc: '../images/2_of_diamonds.png' },
{ num: 'queen',
suit: 'spades',
value: 12,
imgSrc: '../images/queen_of_spades.png' },
{ num: 4,
suit: 'clubs',
value: 4,
imgSrc: '../images/4_of_clubs.png' },
{ num: 10,
suit: 'clubs',
value: 10,
imgSrc: '../images/10_of_clubs.png' },
{ num: 5,
suit: 'spades',
value: 5,
imgSrc: '../images/5_of_spades.png' },
{ num: 5,
suit: 'diamonds',
value: 5,
imgSrc: '../images/5_of_diamonds.png' },
{ num: 2,
suit: 'clubs',
value: 2,
imgSrc: '../images/2_of_clubs.png' },
{ num: 'king',
suit: 'spades',
value: 13,
imgSrc: '../images/king_of_spades.png' },
{ num: 'ace',
suit: 'diamonds',
value: 14,
imgSrc: '../images/ace_of_diamonds.png' },
{ num: 8,
suit: 'spades',
value: 8,
imgSrc: '../images/8_of_spades.png' },
{ num: 7,
suit: 'diamonds',
value: 7,
imgSrc: '../images/7_of_diamonds.png' },
{ num: 6,
suit: 'diamonds',
value: 6,
imgSrc: '../images/6_of_diamonds.png' } ];

// function compareSuits(a, b) {
//     let comparison = 0;
//     if (a.suit > b.suit) {
//       comparison = 1;
//     } else if (a.suit < b.suit) {
//       comparison = -1;
//     }
//     return comparison;
//   }
const compareSuits = (a, b) => {
    let comparison = 0;
    if (a.suit > b.suit) {
      comparison = 1;
    } else if (a.suit < b.suit) {
      comparison = -1;
    }
    return comparison;
  }
console.log(hand);

  hand = hand.sort(compareSuits);
  
  console.log(hand);