import Game from "./scripts/game"


document.addEventListener("DOMContentLoaded", () => {
    
    
    const myGame = new Game();
    
    

    document.getElementById("call").addEventListener("click", () => myGame.call());
    document.getElementById("check").addEventListener("click", () => myGame.check());
    document.getElementById("fold").addEventListener("click", () => myGame.fold());
    document.getElementById("start").addEventListener("click", () => myGame.playGame());
    document.getElementById("myRange").addEventListener("click", () => myGame.showRaise());
})


