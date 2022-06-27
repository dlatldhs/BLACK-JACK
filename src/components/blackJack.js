class blackJack extends React.Component { // react component 사용
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

    // 랜덤 카드 반환 하는 함수
    getRandomCard(deck) {
        const updatedDeck = deck;  // 위에 덱 만들어놓은거
        const randomIndex = Math.floor(Math.random() * updatedDeck.length ); // random 난수 생성
        const randomCard = updatedDeck[randomIndex] 
        updatedDeck.splice(randomIndex,1);
        return { randomCard , updatedDeck }
    }

    // 딜러 & 플레이어의 카드를 실질적으로 만듬
    dealCard(deck)  {
         
    }
}