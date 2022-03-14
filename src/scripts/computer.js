import Hand from "./hand";
import Player from "./player";

class Computer{

    constructor() {
        this.chips = 20000;
        this.hand = 0;
        this.investment = 0;
    }

    computerTurn(pot, investment, communityCards) {
        if (pot / 2 === this.investment) {
            let bet = pot / 2;
            this.investment += (bet);
            this.chips -= (bet);
            pot += bet;
            return pot;
        } else {
            if (communityCards.length === 0) {
                const amountToCall = investment - this.investment;
                if (amountToCall > this.investment) {
                    if (this.hand[0] % 13 === 0 || this.hand[1] % 13 === 0 || this.hand[0] === 1 || this.hand[1] === 1 || this.hand[0] === this.hand[1] || amountToCall < this.chips * 0.25) {
                        let bet = amountToCall;
                        this.investment += bet;
                        this.chips -= bet;
                        pot += bet;
                        return pot;
                    } else {
                        return pot;
                    }
                }
            } else {
                const amountToCall = investment - this.investment;
                const fullHand = [];
                this.hand.forEach((card) => fullHand.push(card));
                communityCards.forEach((card) => fullHand.push(card));
                const handStrength = new Hand(fullHand)
                if (handStrength.result > 20) {
                    let bet = this.chips;
                    this.investment += bet;
                    this.chips -= bet;
                    pot += bet;
                    return pot;
                } else if (handStrength.value === 20) {
                    let bet = amountToCall;
                    this.investment += bet;
                    this.chips -= bet;
                    pot += bet;
                    return pot;
                } else {
                    return pot;
                }
            }

            }
    }


    
}

export default Computer;