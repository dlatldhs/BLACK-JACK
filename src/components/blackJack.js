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

    // 게임 다시 시작하기
    startNewGame(type) {
        if ( type === 'continue' ) { //type 이 continue 일 때 (계속 하는거)
            if ( this.state.money > 0 ) { // 돈이 0 보다 크게 있음
                // deck = card 즉 card의 수가 10개 보다 적다면 새롭게 카드를 다시 만들고 아니면 계속 같은 deck 을 사용하는거
                const deck = ( this.state.deck.length < 10 ) ? this.generateDeck() : this.state.deck;
                // dealCard 에서 updateDeck(Deck - randomCard) player dealer 반환함
                const { updateDeck , player , dealer } = this.dealCard(deck); // player 하고 dealer 한테 카드 주는거

                this.setState({
                    deck: updateDeck,
                    dealer,
                    player,
                    currentChip:null,
                    gameOver: false,
                    message: null
                });
            }
            else { // 돈이 0 보다 적을 때
                this.setState({ message: 'Game over! You are broke! | Please start a new game.'});
            }
        }
        else { // continue 계속하는게 아니라면 새 게임 만드는거
            const deck = this.generateDeck();// deck 생성
            const { updateDeck, player, dealer } = this.dealCard(deck); // 카드 할당

            // state 만들기
            this.setState({
                deck: updateDeck,
                dealer,
                player,
                money:100,
                inputValue: '',
                currentChip: null,
                gameOver: false,
                message: null
            })
        }
    }

    // 카드 추가
    hit() {
        if ( !this.state.gameOver ) { // gmaeOver 한 상태라면 실행 X gameOver 안했으면 실행 ㄱㄱ
            if ( this.state.currentChip ) { // chip(game coin)이 있을 때
                const {randomCard,updateDeck} = this.getRandomCard(this.state.deck);
                const player = this.state.player;
                player.cards.push(randomCard);
                player.count = this.getCount(player.cards);

                if ( player.count > 21 ) { // player 블랙잭 count가 21 보다 클 때
                    this.setState({ player, gameOver: true, message: 'BUST!' });
                }
                else {
                    this.setState({ deck: updateDeck, player });
                }
            }
            else {// 없을 ㄸ ㅐ
                this.setState({ message: 'Please place chip' });
            }
        }
        else { // 이미 game over 한 상태
            this.setState({ message: 'Game over! Please start a new game.' });
        }
    }

    // 딜러 카드 드로우
    dealerDraw() {
        
    }
    // 몇 개 인지 세는거
    getCount(cards){}
    // STOP
    stand() {}
    // 승자 가리기
    getWinner(){}
    // input
    inputChange(e){}
    // handler
    handleKeyDown(e){}
    // 모아줌
    componentWillMount(){}
    render(){

    } 
}