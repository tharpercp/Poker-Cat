import Game from "./scripts/game"


document.addEventListener("DOMContentLoaded", () => {
    
    
    const myGame = new Game();
    
    

    document.getElementById("call").addEventListener("click", myGame.call());
    document.getElementById("check").addEventListener("click", myGame.check());
    document.getElementById("fold").addEventListener("click", myGame.fold());
    document.getElementById("showFlop").addEventListener("click", myGame.flop());
    document.getElementById("showTurn").addEventListener("click", myGame.turn());
    document.getElementById("showTurn").addEventListener("click", myGame.river());

    myGame.playGame();

})


