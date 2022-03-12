class Hand {
    //Spades (1-13), Diamonds(14-26), Hearts(27-39), Clubs(40-52)
    //Straight Flush, 4-kind, full-house, flush,straight, 3-kind, two-pair, pair
    
    constructor(sevenCardHand) {
        this.result = this.findHand(sevenCardHand);
    }

    findHand(cardInstances) {
        const flush = flushCheck(cardInstances);
        const straight = straightCheck(cardInstances);
        const pairs = pairsCheck(cardInstances);
        if (flush && straight) {
            return 80;
        } else if (pairs > 0) {
            return pairs;
        } else if (flush) {
            return 50;
        } else if (straight) {
            return 40; 
        } 
    }

    flushCheck(cardInstances) { 
        const suits = { "spades": 0, "diamonds": 0, "hearts": 0, "clubs": 0 }
        for (let i = 0; i < 7; i++) {
            suits[cardInstances[i].suit] += 1;
        }
        return Object.values(suits).some((el) => el > 4);
    }

    straightCheck(cardInstances) {
        const check = []
        for (let i = 0; i < 7; i++) {
            check.push(cardInstances[i].value)
        }
        check = check.sort();
        if (straight(check)) {
            return true;
        } else {
            return false;
        }
    }
    straight(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr[0] + i) {
                return false;
            }
        }
        return true; 
    }

    pairsCheck(cardInstances) {
        const pairs = {}
        for (let i = 0; i < 7; i++) {
            let temp = cardInstances.filter((card) => card.value === cardInstances[i].value )
            if (temp.length > 1) {
                pairs[cardInstances[i].value] = temp.length;
            }
        }
        let pairsArr = Object.values(pairs)
        pairsArr.sort();
        if (pairsArr.length < 2) {
            if (pairsArr[0] === 4){
                return 70;
            } else if (pairsArr[0] === 3) {
                return 30;
            } else if (pairsArr.length === 0) {
                return 0;
            } else if (pairsArr[0] === 2) {
                return 20;
            }
        } else {
            let pairs = 0;
            let trips = false;
            for (let i = pairsArr.length - 1; i > 0; i--) {
                if (pairsArr[i] === 2) {
                    pairs += 1; 
                } else if (pairsArr[i] === 3) {
                    trips = true;
                }
    
            }
            if (trips === true && pairs > 0) {
                return 60;
            } else if (pairs > 1) {
                return 25;
            }
        }
    }
    
}

export default Hand;
