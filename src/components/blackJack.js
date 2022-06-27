class blackJack extends React.Component { // react component 사용
    constructor(props){               // React component props method init & setting
        super(props);                 // 이거 해야 this 사용 가능
        
        this.state = {
            deck: [],
            dealer: null,
            player: null,
            money: 0,
            inputValue: '',
            currentChip: null,
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
        updatedDeck.splice(randomIndex,1); // randomCard 랜덤 카드 고른 거 선택안되게 하려고 deck(카드)에서 뺌
        return { randomCard , updatedDeck } // 랜덤 카드 / 덱 - 랜덤카드 
    }

    // 딜러 & 플레이어의 카드를 실질적으로 만듬
    dealCard(deck)  {
        // deck 을 만들고 update 해줌
        // getRandomCard ==> 랜덤 카드 만듬 
        const playerCard1 = this.getRandomCard(deck); // deck 이 지금 카드 현재 상태임
        // getRandomCard 에서 randomCard 하고 updateDeck을 반환함
        // randomCard는 deck(카드) 중에서 아무거나 랜덤으로 고른 하나이고 updateDeack 은 
        const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck); // playerCard1 에 randomCard 랑 updateDeck 이 있는데 updateDeck => deck - randomCard
        const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck);
        
        const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
        const dealerStartingHand = [dealerCard1.randomCard, {}];

        const player = {
            cards: playerStartingHand,
            count: this.getCount(playerStartingHand) // JS method player한테 있는 카드 갯수 구해줌
        };
         
        const dealer = {
            cards: dealerStartingHand,
            count: this.getCount(dealerStartingHand) // JS method 딜러 한테 있는 카드 갯수 구해줌
        }

        //      Deck을 randomCard를 제외한 Deck 으로 update 함 그리고 player , dealer 객체 반환
        return {updateDeck: playerCard2.updatedDeck, player, dealer};

    }

    hangChip() {
        const currentChip = this.state.inputValue;

        if ( currentChip > this.state.money ) { // 더 많이 입력 받았을 경우
            this.setState({ message: '돈이 부족해용' });
        }
        else if ( currentChip % 1 !==0 ) { // 숫자가 아닌 것들 입력 받을 경우
            this.setState({ message: '숫자만 넣어주세용' });
        }
        else {
            const money = this.state.money - currentChip;
            this.setState({ money, inputValue: '', currentChip });
        }
    }
}