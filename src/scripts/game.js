import Player from "./player"
import Computer from "./computer"
import Hand from "./hand"





class Game{

    constructor(){ 
        this.deck = Array.from(Array(53).keys()).slice(1)
        this.pot = 0;
        this.currentBlinds = 100;
        this.user = new Player();
        this.computer = new Computer(); 
        this.usedCards = [];
        this.communityCards = [];
    }

    
    

    switchTurn () {
        if (this.turn === this.user) {
            this.turn = this.computer;
        } else {
            this.turn = this.user;
        }
    }


    start() {
        this.payBlinds();
        this.preFlop();
    }

    deal(x) {
        const hand = []
        while (hand.length < x){
            let randomIndex = Math.floor(Math.random() * 52); 
                if (!this.usedCards.includes(this.deck[randomIndex])) {
                    hand.push(this.deck[randomIndex])
                    this.usedCards.push(this.deck[randomIndex])
                }
        }
        return hand; 
    }

    switchToComp() {
        document.getElementById("call").disabled = true;
        document.getElementById("raise").disabled = true;
        document.getElementById("check").disabled = true;
        document.getElementById("fold").disabled = true;
    }

    userTurn () {
        document.getElementById("call").disabled = false;
        document.getElementById("raise").disabled = false;
        document.getElementById("check").disabled = false;
        document.getElementById("fold").disabled = false;
    }

    raise(amount) {
        this.pot += amount;
        this.user.chips -= amount;
        this.user.investment += amount;
        this.switchToComp(); 
        this.computer.computerTurn();
    }

    check() {
        if (this.user.investment !== this.computer.investment) {
            document.getElementById("console").innerHTML="Must call the bet or raise"
        } else {
            this.computer.computerTurn();
        }
    }



    nextAction () {
        if (this.communityCards.length === 0) {
            this.flop.bind(this);
        } else if (this.communityCards.length === 3) {
            this.turn.bind(this);
        } else {
            this.river.bind(this);
        }
    }

    payBlinds() {
        this.pot += (this.currentBlinds * 2)
        this.user.chips -= this.currentBlinds
        this.computer.chips -= this.currentBlinds
    }

    preFlop() {
        this.user.hand = (this.deal(2));
        this.computer.hand = (this.deal(2));
    }

    flop(){
        const flopArray = this.deal(3);
        this.communityCards.concat(flopArray);
        const flopa = document.getElementById("flopa").src="./src/imgs/Cards/" + `${flopArray[0]}` + ".JPG";
        const flopb = document.getElementById("flopb").src="./src/imgs/Cards/" + `${flopArray[1]}` + ".JPG";
        const flopc = document.getElementById("flopc").src="./src/imgs/Cards/" + `${flopArray[2]}` + ".JPG";
    }

    turn() {
        const turnCard = this.deal(1);
        this.communityCards.concat(turnCard);
        document.getElementById("turn").src ="./src/imgs/Cards/" + `${turnCard[0]}` + ".JPG";
    }

    river() {
        const riverCard = this.deal(1)
        this.communityCards.concat(riverCard)
        document.getElementById("river").src ="./src/imgs/Cards/" + `${riverCard[0]}` + ".JPG";
    }

    showDown() {
        let cards = this.communityCards
        let userHand = this.user.hand.concat(cards);
        userHand = new Hand(userHand);
        const compHand = this.computer.hand.concat(cards);
        compHand = new Hand(compHand)
        if (userHand > compHand) {
            this.user.chips += this.pot;
        } else if (userHand < compHand) {
            this.computer.chips += this.pot;
        } else {
            this.user.cihps += this.pot / 2;
            this.computer.chips += this.pot / 2;
        }
        this.communityCards = [];
        this.usedCards = [];
        this.pot = 0;
        this.user.investment = 0;
        this.computer.investment = 0;
        //enable button for showdown
    }

    fold() {
        this.computer.chips += this.pot;
        this.pot = 0;
        this.user.investment = 0;
        this.computer.investment = 0;
        this.user.hand = 0;
        this.computer.hand = 0;
        this.communityCards = [];
        this.usedCards = [];
        //enable button for next hand
    }

    call() {
        let total = this.computer.investment - this.user.investment;
        this.user.chips -= total;
        this.pot += total
        if (this.communityCards.length === 5) {
            this.showDown();
        } else {
            this.nextAction();
            this.computer.computerTurn();
        }
    }
    playGame(){
        if (this.winner() > 0) {
          this.preFlop();
          this.payBlinds();
          let chips = this.user.chips;
          document.getElementById("starta").innerHTML="Your turn, make a move!";
          document.getElementById("startb").innerHTML=`Current Pot: ${this.pot}`;
          document.getElementById("startc").innerHTML="Boss Cat's Chips: " + `${this.computer.chips}`;
          document.getElementById("chips").innerHTML=`YOUR CHIPS: ${chips}`;
          let hand = this.user.hand;
          document.getElementById("cardone").src="./src/imgs/Cards/" + `${hand[0]}` + ".JPG"
          document.getElementById("cardtwo").src="./src/imgs/Cards/" + `${hand[1]}` + ".JPG";
        } else {
          this.announceWinner();
        }
      }

    winner() {
        if (this.user.chips === 0) {
            return -1;
        } else if (this.computer.chips === 0){
            return 0;
        } else {
            return 1;
        }
    }

    announceWinner() {
        if (this.winner() === 0){
            document.getElementById("console").innerHTML="You lose!";
        } else {
            document.getElementById("console").innerHTML="WINNER!!!";
        }
    }
}

export default Game;


