import Player from "./player"
import Computer from "./computer"
import Hand from "./hand"





class Game{

    constructor(){ 
        this.deck = Array.from(Array(53).keys()).slice(1)
        this.pot = 0;
        this.currentBlinds = 100;
        this.player = new Player();
        this.computer = new Computer(); 
        this.usedCards = [];
        this.communityCards = [];
        this.status = 'Preflop';
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
            document.getElementById("console").innerHTML="Must call the bet or raise";
        } else {
            this.computer.computerTurn();
        }
    }



    // nextAction () {
    //     if (this.communityCards.length === 0) {
    //         this.flop.bind(this);
    //     } else if (this.communityCards.length === 3) {
    //         this.turn.bind(this);
    //     } else {
    //         this.river.bind(this);
    //     }
    // }

    payBlinds() {
        this.pot += (this.currentBlinds * 2);
        this.player.chips -= this.currentBlinds;
        this.computer.chips -= this.currentBlinds;
        this.player.investment += this.currentBlinds;
        this.computer.investment += this.currentBlinds;
    }

    preFlop() {
        if (this.status === "Preflop") {
            this.status = "flop";
            this.player.hand = (this.deal(2));
            this.computer.hand = (this.deal(2));
        } else {
            return null;
        }
    }

    flop(){

        if (this.status === "flop") {
            this.status = "turn";
            const flopArray = this.deal(3);
            this.communityCards.concat(flopArray);
            document.getElementById("1").src="./src/imgs/Cards/" + `${flopArray[0]}` + ".JPG";
            document.getElementById("2").src="./src/imgs/Cards/" + `${flopArray[1]}` + ".JPG";
            document.getElementById("3").src="./src/imgs/Cards/" + `${flopArray[2]}` + ".JPG";
        } else {
            return null
        }
    }

    turn() {
        if (this.status === "turn") {
            this.status = "river";
            const turnCard = this.deal(1);
            this.communityCards.concat(turnCard);
            document.getElementById("4").src ="./src/imgs/Cards/" + `${turnCard[0]}` + ".JPG";

        } else {
            return null;
        }
    }

    river() {
        if (this.status === "river") {
            this.status = "preflop";
            const riverCard = this.deal(1)
            this.communityCards.concat(riverCard)
            document.getElementById("5").src ="./src/imgs/Cards/" + `${riverCard[0]}` + ".JPG";
        } else {
            return null;
        }
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
        let total = this.computer.investment - this.player.investment;
        console.log(total);
        this.player.chips -= total;
        this.pot += total
        if (this.communityCards.length === 5) {
            this.showDown();
        } else {
            document.getElementById("console-header").innerHTML="Call"
            const oldPot = this.pot;
            this.pot = setTimeout(this.computer.computerTurn(oldPot - total, oldPot), 5000);
            this.flop();
            this.computer.computerTurn(this.pot);
        }
    }
    playGame(){
        const x = document.getElementById("splash-container");
        if (x.style.display === "none") {
            x.style.display = "flex";
        } else {
            x.style.display = "none";
        }
          this.preFlop();
          this.payBlinds();
          let chips = this.player.chips;
          document.getElementById("console-header").innerHTML="Welcome to poker cat! Everyone pays 100 in blinds, and you will start each hand. Good luck!";
          document.getElementById("console-current-pot").innerHTML=`Current Pot: ${this.pot}`;
          document.getElementById("console-boss-chips").innerHTML="Boss Cat's Chips: " + `${this.computer.chips}`;
          document.getElementById("console-your-chips").innerHTML=`Your Chips: ${chips}`;
          let hand = this.player.hand;
          document.getElementById("cardone").src="./src/imgs/Cards/" + `${hand[0]}` + ".JPG"
          document.getElementById("cardtwo").src="./src/imgs/Cards/" + `${hand[1]}` + ".JPG";
        
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

    updateFrontendTotals () {
        document.getElementById("console-boss-chips").innerHTML=this.computer.chips.toString();
        document.getElementById("console-your-chips").innerHTML=this.player.chips.toString();
        document.getElementById("console-current-pot").innerHTML=this.pot.toString();
    }

    announceWinner() {
        if (this.winner() === 0){
            document.getElementById("console").innerHTML="You lose!";
        } else {
            document.getElementById("console").innerHTML="WINNER!!!";
        }
    }

    showRaise () {
        const raiseAmount = document.getElementById("myRange").value;
        document.getElementById("raise-amount").innerHTML=raiseAmount.toString();
    }
}

export default Game;


