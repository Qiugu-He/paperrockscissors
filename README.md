## Paper, Rock and Scissors
<img src="https://github.com/Qiugu-He/20-React-App/blob/master/04-Paper_Rock_Scissors/game.png" alt="alt text" width="100%" height="100%">

This small app let me practiced with *react hook: useState, useEffet*

### States:
```JavaScript
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [gameState, setGameState] = useState(null); // win, lose, draw

    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
```

### Rendering flow:
-> App.js<Br>
-----> Render Component: Rock, Paper, Scissor. 
```JavaScript
        <div>
            <button className="rock" onClick={() => handleUserChoice(1)}>
                <Rock />
            </button>
            <button className="paper" onClick={() => handleUserChoice(2)}>
                <Paper />
            </button>
            <button className="scissors" onClick={() => handleUserChoice(3)}>
                <Scissors />
            </button>
        </div>
```
-----> Change States: handlerUserChoices()
```JavaScript
    //get the user's choice and set it to state
    function handleUserChoice(choice){
        const chosenChoice = choices.find(c => c.id === choice);
        setUserChoice(chosenChoice);

        //determin the winer
        if (chosenChoice.losesTo === computerChoice.id) {
        // lose
        /*
            Here, dont using setLooses(losses + 1), instead using function way:  setLosses(losses => losses + 1);
            Because we need to track the previous one
        */
        setLosses(losses => losses + 1);
        setGameState('lose');
        } else if (computerChoice.losesTo === chosenChoice.id) {
        // win
        setWins(wins => wins + 1);
        setGameState('win');
        } else if (computerChoice.id === chosenChoice.id) {
        // draw
        setGameState('draw');
        }
    }
```
-----> Pop to show win/loss/draw based on state:
```JavaScript
      {gameState && (
        <div
          className={`game-state ${gameState}`}
          onClick={() => restartGame()}
        >
        <div>
          <div className="game-state-content">
            <p>{renderComponent(userChoice)}</p>
            {/* <p>you {gameState}!</p> */}
            {gameState === 'win' && <p>Congrats! You won!</p>}
            {gameState === 'lose' && <p>Sorry! You lost!</p>}
            {gameState === 'draw' && <p>You drew!</p>}

            <p>{renderComponent(computerChoice)}</p>
          </div>

          <button>Play Again</button>
        </div>
      </div>
      )}
```


## How to Run :
- npm install<br>
- npm run
- npm build (For production)
