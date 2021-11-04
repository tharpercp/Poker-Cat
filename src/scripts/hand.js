class Hand {
    //Spades (1-13), Diamonds(14-26), Hearts(27-39), Clubs(40-52)
    //Straight Flush, 4-kind, full-house, flush,straight, 3-kind, two-pair, pair
    
    constructor(sevenCardHand) {
        this.hand = findHand(sevenCardHand)
    }

    findHand(cardInstances) {
        const flush = flushCheck(cardInstances);
        const straight = straightCheck(cardInstances);
        const pairs = pairsCheck(cardInstances);
        if (flush && straight) {
            return 70;
        } else if (pairs === "four of a kind" || "full house") {
            return pairs;
        } else if (flush) {
            return 40;
        } else if (straight) {
            return 30; 
        } else if (pairs) {
            return pairs; 
        } else {
            return highCard(cardInstances);
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
            let temp = cardInstances.filter((x) => x.value === cardInstances[i].value )
            if (temp.length > 1) {
                pairs[cardInstances[i].value] = temp.length;
            }
        }
        let pairsArr = Object.values(pairs)
        pairsArr.sort();
        if (pairsArr.length < 2) {
            if (pairsArr[0] === 4){
                return 60;
            } else if (pairsArr[0] === 3) {
                return 30;
            } else {
                return 20; 
            }
        } else {
            let trips = false; 
            for (let i = pairsArr.length - 1; i > 0; i--) {
                if (pairsArr[i] === 4) {
                    return 60; 
                } else if (pairsArr[i] === 3) {
                    trips = true;
                } else {
                    if (trips = true) {
                        return 50;
                    } else {
                        return 20 + (pairs[i] % 13);
                    }
                }
            }
        }
    }

    highCard(cardInstances) {
        let arr = []
        for (let i = 0; i < cardInstances.length; i++) {
            arr.push(cardInstances[i].value)
        }
        arr.sort();
        return arr[arr.length - 1] % 13;
    }
    
}

export default Hand;
