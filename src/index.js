import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let Square = ({value, handleClick}) => {
      return (
        <button className="square" onClick={handleClick}>
          {value}
        </button>
      );
  }
  
  let Board = ({squares, onClick}) => {

      let renderSquare = (i) => {
      return <Square value={squares[i]} handleClick={()=>onClick(i)} />;
    }

      return (
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
  }
  
  let Game =  () => {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    let current = history[stepNumber];
    console.log(current);
    let squares = current.squares;

    let handleClick = (i)=>{
      setStepNumber(history.length);
      setHistory(history.slice(0, stepNumber))
      setHistory( [...history, {squares:squares.map((item, k)=>{
        if(item==='X'||item==='O')
          {
              return item;
          }
      if (k===i) {
         setXIsNext(!xIsNext);
          if(xIsNext)
              return 'X';
          return 'O'
      }
      return null;
  })}]
        )
    }


    
    const winner = calculateWinner(squares);
    let status;

    if(winner){
        status = 'Winner: ' + winner;
    } else {
        status = `Next player: ${xIsNext?'X':'Y'}`;
    }

    let jumpTo = (step)=>{
      setStepNumber(step);
      setXIsNext((step%2)===0)
    }

    const moves = history.map((move, step)=>{
      const desc = step ? 'Go To Move #' + step : 'Go to start of game';
      return(
      <li key={move}>
        <button onClick={()=>jumpTo(step)}>{desc}</button>
      </li>
      )
    })


      return (
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={handleClick} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }  