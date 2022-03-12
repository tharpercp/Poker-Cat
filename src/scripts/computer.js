class Computer{

    constructor() {
        this.chips = 20000;
        this.hand = 0;
        this.investment = 0;
    }

    computerTurn(pot) {
        if (pot / 2 === this.investment) {
            let bet = pot / 2
            this.investment += (bet);
            this.chips -= (bet);
            this.switchTurn();
            pot += bet;
            return pot;
        } else {
            if (this.handStrength() > 0) {
                let callAmount = pot - this.investment;
                this.chips -= callAmount;
                return pot + callAmount;
            } else {
                return pot;
            }
        }
    }

    switchTurn () {
        document.getElementById("call").disabled = false;
        document.getElementById("raise").disabled = false;
        document.getElementById("fold").disabled = false;
    }

    handStrength () {
        for (let i = 0; i < 2; i++) {
            if (this.hand[i] % 13 === 1 || this.hand[i] % 13 > 11) {
                return 1;
            }
            return -1;
        }

    }


    
}

export default Computer;