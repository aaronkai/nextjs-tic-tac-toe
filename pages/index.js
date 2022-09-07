import React from "react";
import { Board } from "../components/Board";
import { calculateWinner } from "../lib/calculateWinner";

export default function Game() {
  const [history, setHistory] = React.useState([
    { squares: Array(9).fill(null) },
  ]);
  console.log(history);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Go to game start'`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function handleClick(i) {
    console.log({ history, stepNumber, xIsNext });
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }
  function jumpTo(step) {
    setStepNumber(step), setXIsNext(step % 2 === 0);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// export default class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{ squares: Array(9).fill(null) }],
//       stepNumber: 0,
//       xIsNext: true,
//     };
//   }
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares,
//         },
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,
//     });
//   }
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: step % 2 === 0,
//     });
//   }
//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ? `Go to move # ${move}` : `Go to game start'`;
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);
