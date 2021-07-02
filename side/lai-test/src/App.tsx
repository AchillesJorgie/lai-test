import React, { useState, useEffect } from "react";
import x from "./x.svg";
import o from "./o.svg";
import "./App.css";

const ROW_COLUMN_DEFAULT_SIZE = 3;

let setNewBoard = () => {
  let newBoard = [];
  for (let col = 0; col < ROW_COLUMN_DEFAULT_SIZE; col++) {
    let newRow = [];
    for (let row = 0; row < ROW_COLUMN_DEFAULT_SIZE; row++) {
      newRow.push("");
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

function App() {
  let [boardArray, setBoardArray] = useState(setNewBoard());
  let [playerTurn, setPlayerTurn] = useState("o");
  let [xRowColumnCount, setXRowColumnCount] = useState([0, 0]);
  let [oRowColumnCount, setORowColumnCount] = useState([0, 0]);
  let [winningPlayer, setWinningPlayer] = useState("");

  let onClick = async (player, row, column) => {
    let updatedBoard = [...boardArray];
    if (updatedBoard[column][row].length > 0 || winningPlayer.length > 0) {
      return;
    }
    updatedBoard[column][row] = player;
    if (playerTurn === "o") {
      await setORowColumnCount([
        oRowColumnCount[0] + column + 1,
        oRowColumnCount[1] + row + 1,
      ]);
    } else {
      await setXRowColumnCount([
        xRowColumnCount[0] + column + 1,
        xRowColumnCount[1] + row + 1,
      ]);
    }
    await setBoardArray(updatedBoard);
    await setPlayerTurn(playerTurn === "o" ? "x" : "o");
  };

  // let getWinningTile = (c, r) => {
  //   let board = [...boardArray];
  //   let winningTiles = [];
  //   for (let col = 0; col < ROW_COLUMN_DEFAULT_SIZE; col++) {
  //     for (let row = 0; row < ROW_COLUMN_DEFAULT_SIZE; row++) {
  //       if (c === col && r !== row && board[col][row] === "") {
  //         winningTiles.push([col, row]);
  //       }
  //       if (c !== col && r === row && board[col][row] === "") {
  //         winningTiles.push([col, row]);
  //       }
  //       if (col === row && c !== col && r !== row && board[col][row] === "") {
  //         winningTiles.push([col, row]);
  //       }
  //       if (
  //         c + r === 2 &&
  //         c !== col &&
  //         r !== row &&
  //         col + row === 2 &&
  //         board[col][row] === ""
  //       ) {
  //         winningTiles.push([col, row]);
  //       }
  //     }
  //   }
  //   return winningTiles;
  // };

  useEffect(() => {
    if (
      xRowColumnCount[0] % 3 === 0 &&
      xRowColumnCount[1] % 3 === 0 &&
      xRowColumnCount[0] + xRowColumnCount[1] !== 0 &&
      (xRowColumnCount[0] === 6 || xRowColumnCount[1] === 6)
    ) {
      setWinningPlayer("x");
    }
    if (
      oRowColumnCount[0] % 3 === 0 &&
      oRowColumnCount[1] % 3 === 0 &&
      oRowColumnCount[0] + oRowColumnCount[1] !== 0 &&
      (oRowColumnCount[0] === 6 || oRowColumnCount[1] === 6)
    ) {
      setWinningPlayer("o");
    }
  }, [xRowColumnCount, oRowColumnCount]);

  // useEffect(() => {
  //   if (playerTurn === "x") {
  //     let winningTiles = getWinningTile();
  //     let randomIndex =
  //       winningTiles[Math.floor(Math.random() * winningTiles.length)];
  //     if (winningPlayer !== "") {
  //       setTimeout(function () {
  //         onClick(playerTurn, randomIndex[0], randomIndex[1]);
  //       }, 1500);
  //     }
  //   }
  // }, [playerTurn]);

  return (
    <div className="App">
      <header className="App-header">
        {boardArray.map((col, ci) => {
          return (
            <div key={ci} className="RowBox">
              {col.map((row, ri) => {
                return (
                  <div
                    key={ri}
                    className="Box"
                    onClick={() => onClick(playerTurn, ri, ci)}
                  >
                    {row.length > 0 ? (
                      <img
                        src={row === "x" ? x : o}
                        className="XO"
                        alt="logo"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
        {winningPlayer !== "" ? (
          <div className="WinText">{`${winningPlayer.toUpperCase()} WINS!`}</div>
        ) : null}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
