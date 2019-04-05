
let diamonds =[ 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114 ];
let player = [ { id: 103,
    suit: 'diamonds',
    value: 3,
    imgSrc: '../images/3_of_diamonds.png' },
  { id: 104,
    suit: 'diamonds',
    value: 4,
    imgSrc: '../images/4_of_diamonds.png' },
  { id: 105,
    suit: 'diamonds',
    value: 5,
    imgSrc: '../images/5_of_diamonds.png' },
  { id: 106,
    suit: 'diamonds',
    value: 6,
    imgSrc: '../images/6_of_diamonds.png' },
  { id: 107,
    suit: 'diamonds',
    value: 7,
    imgSrc: '../images/7_of_diamonds.png' },
  { id: 112,
    suit: 'diamonds',
    value: 12,
    imgSrc: '../images/queen_of_diamonds.png' },
  { id: 114,
    suit: 'diamonds',
    value: 14,
    imgSrc: '../images/ace_of_diamonds.png' },
  { id: 127,
    suit: 'clubs',
    value: 14,
    imgSrc: '../images/ace_of_clubs.png' }];

    let tempArr = [];
    // player = player.flat();
    
        for (let i = 0; i < player.length; i++) {
            if (diamonds.includes(player[i].id)){
                tempArr.push(player[i].id);
            }
        }
        console.log(`tempArr`,tempArr, Math.max(...tempArr));
         
    