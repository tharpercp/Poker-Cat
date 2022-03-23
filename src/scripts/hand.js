class Hand {
    //Spades (1-13), Diamonds(14-26), Hearts(27-39), Clubs(40-52)
    //Straight Flush, 4-kind, full-house, flush,straight, 3-kind, two-pair, pair
    
    constructor(sevenCardHand) {
        this.result = this.findHand(sevenCardHand);
    }


    findHand(cardInstances) {
        const flush = this.flushCheck(cardInstances);
        const straight = this.straightCheck(cardInstances);
        const pairs = this.pairsCheck(cardInstances);
        if (flush && straight) {
            return 80;
        } else if (pairs > 0) {
            return pairs;
        } else if (flush) {
            return 50;
        } else if (straight) {
            return 40; 
        } else {
            return 0;
        }
    }

    flushCheck(cardInstances) { 
        const suits = { "spades": 0, "diamonds": 0, "hearts": 0, "clubs": 0 }
        for (let i = 0; i < cardInstances.length; i++) {
            if (cardInstances[i] < 14) {
                suits["spades"] += 1;
            } else if (cardInstances[i] < 27) {
                suits["diamonds"] += 1;
            } else if (cardInstances[i] < 40) {
                suits["hearts"] += 1;
            } else {
                suits["clubs"] += 1
            }
            
        }
        return Object.values(suits).some((el) => el > 4);
    }

    cardValues(arr) {
        const cardValues = arr.map((card) => {
            if (card < 14) {
                return card;
            } else if (card % 13 === 0) {
                return 13;
            } else {
                return card % 13;
            }
        });
        return cardValues;
    }

    straightCheck(cardInstances) {
        const check = this.cardValues(cardInstances).sort((a,b)=>a-b);
        console.log(check);
        if (check[0] === 1) {
            check.push(14);
        }
        let inARow = 0;
        for (let i = 0; i < check.length; i++) {
            if (i === 0) {
                if (check[i] === check[i + 1] - 1) {
                    inARow += 1;
                }
            } else {
                if (check[i] - 1 === check[i - 1]) {
                    inARow += 1;
                }
            }
        }
        console.log(inARow);
        if (inARow > 4) {
            return true;
        } else {
            return false;
        }
    }


    pairsCheck(cardInstances) {
        const key = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0};
        const cardValues = this.cardValues(cardInstances);
        console.log(cardValues);
        cardValues.forEach((card) => key[card] += 1)
        const counts = (Object.values(key));
        const pairsCount = counts.sort((a,b)=>a-b);
        const last = pairsCount.length - 1;
            if (pairsCount[last] === 4){
                return 70;
            } else if (pairsCount[last] === 3) {
                const pairs = pairsCount.filter((x) => x === 2);
                if (pairs.length > 0) {
                    return 60;
                } else {
                    return 30;
                }
            } else if (pairsCount[last] === 2) {
                const pairs = pairsCount.filter((x) => x === 2);
                if (pairs.length > 1) {
                    return 25;
                } else {
                    return 20;
                }
            } else {
                return 0;
            }
    }
    
}

export default Hand;
