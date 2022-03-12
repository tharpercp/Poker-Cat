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
        this.status = "";
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
        const oldPot = this.pot;
        this.switchToComp(); 
        this.pot = this.computer.computerTurn();
        if (this.pot === oldPot && this.status === 'River') {
            this.showDown();
        } else if (this.pot === oldPot && this.status !== 'River') {

        }
    }

    check() {
        if (this.user.investment !== this.computer.investment) {
            document.getElementById("console").innerHTML="Must call the bet or raise";
        } else {
            this.computer.computerTurn();
        }
    }



    displayHand (hand) {
        const hands = {
            1: "twos",
            2: "threes",
            3: "fours",
            4: "fives",
            5: "sixes",
            6: "sevens",
            7: "eights",
            8: "nines",
            9: "tens",
            10: "jacks",
            11: "queens",
            12: "kings",
            13: "aces",
            20: "pair",
            25: "two-pair",
            30: "three-of-a-kind",
            40: "straight",
            50: "flush",
            60: "full-house",
            70: "FOUR OF A KIND",
            80: "STRAIGHT FLUSH"

        };
        if (hand.length < 5) {
            if (hand[0] === hand[1]) {
                const handName = hands[hand[0]]
                document.getElementById("console-hand").innerHTML=`a pair of ${handName}`;
            }
        } else {
            const highHand = Math.max(...hand)
            const result = new Hand(hand);
            document.getElementById("console-hand").innerHTML=`${hands[result]}${hands[highHand]}`;
        }
        
    }

    payBlinds() {
        this.communityCards = [];
        this.usedCards = [];
        this.pot += (this.currentBlinds * 2);
        this.player.chips -= this.currentBlinds;
        this.computer.chips -= this.currentBlinds;
        this.player.investment += this.currentBlinds;
        this.computer.investment += this.currentBlinds;
    }

    preFlop() {
        if (this.status === "") {
            this.status = "preflop";
            this.player.hand = (this.deal(2));
            this.computer.hand = (this.deal(2));
            this.displayHand(this.player.hand);
        } else {
            return null;
        }
    }

    flop(){

        if (this.status === "preflop") {
            this.status = "flop";
            const flopArray = this.deal(3);
            this.communityCards.concat(flopArray);
            const hand = this.communityCards + this.player.hand;
            document.getElementById("1").src="./src/imgs/Cards/" + `${flopArray[0]}` + ".JPG";
            document.getElementById("2").src="./src/imgs/Cards/" + `${flopArray[1]}` + ".JPG";
            document.getElementById("3").src="./src/imgs/Cards/" + `${flopArray[2]}` + ".JPG";
            this.displayHand(hand);
        } else {
            return null
        }
    }

    turn() {
        if (this.status === "flop") {
            this.status = "turn";
            const turnCard = this.deal(1);
            this.communityCards.concat(turnCard);
            document.getElementById("4").src ="./src/imgs/Cards/" + `${turnCard[0]}` + ".JPG";

        } else {
            return null;
        }
    }

    river() {
        if (this.status === "turn") {
            this.status = "river";
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
        this.status = "";
        this.updateFrontendTotals();
        this.playNextHand();
    }

    fold() {
        this.computer.chips += this.pot;
        this.pot = 0;
        this.user.investment = 0;
        this.computer.investment = 0;
        this.user.hand = [];
        this.computer.hand = [];
        this.communityCards = [];
        this.usedCards = [];
        this.playNextHand();
    }

    call() {
        let total = this.computer.investment - this.player.investment;
        this.player.chips -= total;
        const oldPot = this.pot;
        this.pot += total
        console.log(this.pot);
        if (this.communityCards.length === 5) {
            this.showDown();
        } else {
            document.getElementById("console-header").innerHTML="Call"
            this.pot = this.computer.computerTurn(this.pot);
            this.flop();
            this.updateFrontendTotals();
            this.computer.computerTurn();
            const raiseAmount = this.pot - oldPot;
            if (raiseAmount > 0) {
                document.getElementById("console-header").innerHTML=`Boss cat raised you ${raiseAmount}. Raise, call, or fold?`;
                this.userTurn();

            } else if (raiseAmount === 0) {
                document.getElementById("console-header").innerHTML="Boss cat checked. Your turn - Raise or check?";
                this.userTurn();
            } 
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

      playNextHand () {
        if (this.winner() < 1) {
            this.announceWinner();
        }
        this.payBlinds();
        this.preFlop();
        this.updateFrontendTotals();
        let hand = this.player.hand;
        document.getElementById("cardone").src="./src/imgs/Cards/" + `${hand[0]}` + ".JPG"
        document.getElementById("cardtwo").src="./src/imgs/Cards/" + `${hand[1]}` + ".JPG";
        document.getElementById("console-header").innerHTML="Blinds have been paid, your turn - Raise or check/call.";
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
        const computerChips=this.computer.chips.toString();
        const playerChips = this.player.chips.toString();
        const pot = this.pot.toString();
        document.getElementById("console-boss-chips").innerHTML=`Boss Cat's Chips: ${computerChips}`
        document.getElementById("console-your-chips").innerHTML=`Your Chips: ${playerChips}`
        document.getElementById("console-current-pot").innerHTML=`Current Pot: ${pot}`
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


