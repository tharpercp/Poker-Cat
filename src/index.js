import Game from "./scripts/game"


document.addEventListener("DOMContentLoaded", () => {
    
    
    const myGame = new Game();
     
    document.getElementById("raise").addEventListener("click", () => myGame.raise(document.getElementById("myRange").value));
    document.getElementById("call").addEventListener("click", () => myGame.call());
    document.getElementById("check").addEventListener("click", () => myGame.check());
    document.getElementById("fold").addEventListener("click", () => myGame.fold(0));
    document.getElementById("start").addEventListener("click", () => myGame.playGame());
    document.getElementById("myRange").addEventListener("click", () => myGame.showRaise());
});


