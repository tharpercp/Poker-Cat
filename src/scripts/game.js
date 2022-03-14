import Player from "./player"
import Computer from "./computer"
import Hand from "./hand"





class Game{

    constructor(){ 
        this.deck = this.shuffleDeck(Array.from(Array(53).keys()).slice(1));
        console.log(this.deck);
        this.pot = 0;
        this.currentBlinds = 100;
        this.player = new Player();
        this.computer = new Computer(); 
        this.usedCards = [];
        this.communityCards = [];
        this.status = "";

        this.displayHand = this.displayHand.bind(this);
        this.preFlop = this.preFlop.bind(this);
        this.flop = this.flop.bind(this);
        this.turn = this.turn.bind(this);
        this.river = this.river.bind(this);
        this.deal = this.deal.bind(this);
    }

    shuffleDeck(array) { //Fisher-Yates Shuffle Algo
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    start() {
        this.payBlinds();
        this.preFlop();
    }

    deal(x) {
        const hand = [];
        for  (let i = 0; i < x; i++) {
            hand.push(this.deck.pop());
        }
        return hand; 
    }

    switchToComp() {
        document.getElementById("call").disabled = true;
        document.getElementById('call').style.backgroundcolor = 'red'; 
        document.getElementById("raise").disabled = true;
        document.getElementById('raise').style.backgroundcolor = 'red'; 
        document.getElementById("check").disabled = true;
        document.getElementById('check').style.backgroundcolor = 'red'; 
        document.getElementById("fold").disabled = true;
        document.getElementById('fold').style.backgroundcolor = 'red'; 
    }

    userTurn () {
        document.getElementById("call").disabled = false;
        document.getElementById('call').style.backgroundcolor = 'lightgreen'; 
        document.getElementById("raise").disabled = false;
        document.getElementById('raise').style.backgroundcolor = 'lightgreen'; 
        document.getElementById("check").disabled = false;
        document.getElementById('check').style.backgroundcolor = 'lightgreen';
        document.getElementById("fold").disabled = false;
        document.getElementById('fold').style.backgroundcolor = 'lightgreen';
    }

    raise(amount) {
        this.pot += amount;
        this.player.chips -= amount;
        this.player.investment += amount;
        const oldPot = this.pot;
        this.switchToComp(); 
        this.pot = this.computer.computerTurn();
        if (this.pot === oldPot && this.status === 'River') {
            this.showDown();
        } else if (this.pot === oldPot && this.status !== 'River') {

        }
    }

    check() {
        if (this.player.investment !== this.computer.investment) {
            document.getElementById("console").innerHTML="Must call the bet or raise";
        } else {
            document.getElementById("console").innerHTML="Check";
            setTimeout(this.computer.computerTurn(), 5000);
        }
    }
    



    displayHand (hand) {
        const actualHand = Object.values(hand)
        const hands = {
            1: "ace",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            10: "ten",
            11: "jack",
            12: "queen",
            13: "king",
            20: "pair",
            25: "two-pair",
            30: "three-of-a-kind",
            40: "straight",
            50: "flush",
            60: "full-house",
            70: "FOUR OF A KIND",
            80: "STRAIGHT FLUSH"

        };
        if (actualHand.length < 5 && actualHand.length > 0) {
            const cardValues = actualHand.map((h) => {
                if (h < 14) {
                    return h;
                } else if (h % 13 === 0) {
                    return 13;
                } else {
                    return h % 13;
                }
            });
            if (cardValues[0] === cardValues[1]) {
                const handName = hands[cardValues[0]]
                document.getElementById("console-hand").innerHTML=`a pair of ${handName}`;
            } else {
                if (cardValues.includes(1)) {
                    document.getElementById("console-hand").innerHTML=`Ace high`;
                } else {
                    const highHand = Math.max(...cardValues);
                    document.getElementById("console-hand").innerHTML=`${hands[highHand]} high`;
                }
            }
        } else {
            const cardValues = actualHand.map((h) => {
                if (h < 14) {
                    return h;
                } else if (h % 13 === 0) {
                    return 13;
                } else {
                    return h % 13;
                }
            });
            const handInstance = new Hand(actualHand);
            const highHand = cardValues.sort((a,b)=>a-b);
            console.log(highHand);
            console.log(handInstance);
            if (handInstance.result === 20){
                document.getElementById("console-hand").innerHTML=`One pair`
            }
            else if (handInstance.result === 25) {
                document.getElementById("console-hand").innerHTML=`two pair - ${hands[highHand[highHand.length - 1]]}s and ${hands[highHand[0]]}s `;
            } else if (handInstance.result === 30 || handInstance.result === 60 || handInstance.result === 70) {
                document.getElementById("console-hand").innerHTML=`${hands[handInstance.result]}`;
            } else {
                if (highHand[0] === 1) {
                    document.getElementById("console-hand").innerHTML=`Ace high`;
                } else {
                    document.getElementById("console-hand").innerHTML=`${hands[highHand[highHand.length - 1]]} high`;
                }
            }
                
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
            let hand = [];
            this.status = "flop";
            const flopArray = this.deal(3);
            this.communityCards = flopArray;
            this.communityCards.forEach((card) => hand.push(card));
            this.player.hand.forEach((card) => hand.push(card));
            console.log(hand);
            this.displayHand(hand);
            document.getElementById("1").src="./src/imgs/Cards/" + `${flopArray[0]}` + ".JPG";
            document.getElementById("2").src="./src/imgs/Cards/" + `${flopArray[1]}` + ".JPG";
            document.getElementById("3").src="./src/imgs/Cards/" + `${flopArray[2]}` + ".JPG";
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
        let userSevenCardHand = [];
        let compSevenCardHand = [];
        this.player.hand.forEach((card) => userSevenCardHand.push(card));
        this.communityCards.forEach((card) => {
            userSevenCardHand.push(card);
            compSevenCardHand.push(card);
        });
        this.computer.hand.forEach((card, i) => {
            compSevenCardHand.push(card)
            document.getElementById(`${i + 1}`).src="./src/imgs/Cards/" + `${this.computer.hand[i]}` + ".JPG"
        });
        const userHand = new Hand(userSevenCardHand);
        const compHand = new Hand(compSevenCardHand);
        if (userHand > compHand) {
            this.player.chips += this.pot;
            document.getElementById("console").innerHTML=`You win this hand! Pot size: ${this.pot}`;
        } else if (userHand < compHand) {
            document.getElementById("console").innerHTML=`You lose this hand! Pot size: ${this.pot}`;
            this.computer.chips += this.pot;
        } else {
            this.player.chips += this.pot / 2;
            this.computer.chips += this.pot / 2;
        }
        this.communityCards = [];
        this.usedCards = [];
        this.pot = 0;
        this.player.investment = 0;
        this.computer.investment = 0;
        this.status = "";
        this.updateFrontendTotals();
        setTimeout(this.playNextHand(), 5000);
    }

    fold(x=0) {
        if (x === 1) {
            this.player.chips += this.pot
            document.getElementById("console").innerHTML=`Boss cat folded, you win this hand! Pot size: ${this.pot}`;
        } else {
            document.getElementById("console").innerHTML=`Fold - Pot size: ${this.pot}`;
            this.computer.chips += this.pot;
        }
        
        this.pot = 0;
        this.player.investment = 0;
        this.computer.investment = 0;
        this.player.hand = [];
        this.computer.hand = [];
        this.communityCards = [];
        this.usedCards = [];
        this.status = "";
        setTimeout(this.playNextHand(), 5000);
    }

    call() {
        let total = this.computer.investment - this.player.investment;
        this.player.chips -= total;
        const oldPot = this.pot;
        this.pot += total

        if (this.status === "river"|| this.player.chips === 0 || this.computer.chips === 0) {
            this.showDown();
        } else {
            document.getElementById("console").innerHTML="Call"
            this.pot = this.computer.computerTurn(this.pot);
            this.updateFrontendTotals();
            const raiseAmount = this.pot - oldPot;
            if (this.status === "" || this.status === "preflop") {
                if (raiseAmount > 0) {
                    document.getElementById("console").innerHTML=`Boss cat raised you ${raiseAmount}. Raise, call, or fold?`;
                    this.userTurn();
                    this.flop();
                } else if (raiseAmount === 0) {
                    document.getElementById("console").innerHTML="Boss cat checked. Your turn - Raise or check?";
                    this.userTurn();
                    this.flop();
                }
            } else if (this.status === "flop") {
                if (raiseAmount > 0) {
                    document.getElementById("console").innerHTML=`Boss cat raised you ${raiseAmount}. Raise, call, or fold?`;
                    this.userTurn();
                    this.turn();
                } else if (raiseAmount === 0) {
                    document.getElementById("console").innerHTML="Boss cat checked. Your turn - Raise or check?";
                    this.userTurn();
                    this.turn();
                }
            } else if (this.status === "turn"){
                if (raiseAmount > 0) {
                    document.getElementById("console").innerHTML=`Boss cat raised you ${raiseAmount}. Raise, call, or fold?`;
                    this.userTurn();
                    this.river();
                } else if (raiseAmount === 0) {
                    document.getElementById("console").innerHTML="Boss cat checked. Your turn - Raise or check?";
                    this.userTurn();
                    this.river();
                }
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
          this.updateFrontendTotals();
          let hand = this.player.hand;
          this.displayHand(hand);
          document.getElementById("cardone").src="./src/imgs/Cards/" + `${hand[0]}` + ".JPG"
          document.getElementById("cardtwo").src="./src/imgs/Cards/" + `${hand[1]}` + ".JPG";
      }

      playNextHand () {
        if (this.winner() < 1) {
            this.announceWinner();
        } else {
            this.deck = this.shuffleDeck(Array.from(Array(53).keys()).slice(1));
            this.payBlinds();
            this.preFlop();
            this.updateFrontendTotals();
            let hand = this.player.hand;
            document.getElementById("1").src="./src/imgs/cardback.png";
            document.getElementById("2").src="./src/imgs/cardback.png";
            document.getElementById("3").src="./src/imgs/cardback.png";
            document.getElementById("4").src="./src/imgs/cardback.png";
            document.getElementById("5").src="./src/imgs/cardback.png";
            document.getElementById("boss1").src="./src/imgs/cardback.png";
            document.getElementById("boss2").src="./src/imgs/cardback.png";
            document.getElementById("cardone").src="./src/imgs/Cards/" + `${hand[0]}` + ".JPG";
            document.getElementById("cardtwo").src="./src/imgs/Cards/" + `${hand[1]}` + ".JPG";
            document.getElementById("console").innerHTML="Blinds have been paid, your turn - Raise or check/call.";
        }

        
      }

    winner() {
        if (this.player.chips === 0) {
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


