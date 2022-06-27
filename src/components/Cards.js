class Cards extends React.Component { // react component 사용
    constructor(props){               // React component props method init & setting
        super(props);                 // 이거 해야 this 사용 가능

        this.state = {
            deck: [],
            dealer: null,
            player: null,
            money: 0,
            inputValue: '',
            currentBet: null,
            gameOver: false,
            message: null 
        };
    }
    generateDeck() { // create Deck  and return deck[]
        // card & deck create 
        const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
        const suits = ['♦','♣','♥','♠'];
        const deck = [];
        
        // deck 에 card 추가하는(push) 하는 코드
        for ( let i = 0 ; i < cards.length ; i++ ) {
            for ( let j = 0 ; j < suits.length ; j++ ) {
                deck.push({number: cards[i], suit: suits[j]});
            }
        }
        return deck
    }
}