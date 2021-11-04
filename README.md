BACKGROUND

Texas hold'em poker is a game where you are dealt two cards, and there are five community cards
that everyone uses to make up the best five card hand. This game will take place between to players,
a user and a computer, and will play until one of them runs out of chips. Blind levels will slowly 
increase to ensure the game eventually ends, and there will be at least three levels against different
computer opponents of increasing difficulty.  

FUNCTIONALITY and MVPs

For a no-limit texas hold'em game, the users should be able to do the following:

    - Check, call, or raise button on each player turn, with the option to varry bet sizing from 2x to all
    of the chips.
    - Cards will be revealed in proper order (flop, turn, river) and only the user's cards will have the 
    face visible.
    - There will also be a home/menu screen where the user can select from game options, as well as learn the
    rules for this game. I will also display links to my GitHub and LinkedIn. 


WIREFRAMES

    - As previously stated, there will be nav links to my GitHub and LinkedIn, as well as a link to a detailed
    description of the rules of the game.
    - During the game there will be buttons for checking, calling, and raising. To customize the raise size,
    there will either be a slide bar, or input bar for user input.
    - The home screen will have options to increase/decease difficulty (change starting chip stacks, allow more time, etc...), as well as some options for sound settings.
    - There will also be some sort of reward for beating all three levels.

TECHNOLOGY, LIBRARIES, APIs

    This project will be implemented with the following technologies: 

    - I am going to try and implement the playing board with plain javascript, but I might need to use Canvas API depending on how difficult it is to create the buttons for player options, and make it look decent. 
    - I'll use webpack to bundle source code

IMPLEMENTATION TIMELINE

Friday Afternoon & Weekend: Setup project, including getting webpack up and running. Create card, game, chip classes. Try to use vanillaJS to get a game board rendered, with cards correctly displaying for user. Possibly get familiar with Canvas API. 

Monday: I'll work on implementing the computer players logic here. Once I create one computer player, I imagine
it will be easy to make some small adjustments to increase/decrease difficulty to create the three levels. If I have time, I will also work on implementing the buttons to check, call, raise. 

Tuesday: I'll use Tuesday to polish game logic, as well as the user interface. I need to make the buttons work 
properly, and update chip stacks and cards after each action. If I have time, I would also like some sort of animation for when a user folds, goes all-in, or on win/loss. 

Wednesday: On the last day, hopefully I won't be working on anymore app or game logic. I plan to use this day to work on the aesthetics of the game with css/JS. I also want to add a prize for users that win all three levels. I am thinking it will be some type of badge or outfit change for the main character, so if i have time I will add that here.  

Thursday Morning: Deploy to GitHub pages. If time, rewrite this proposal as a production README.
    

