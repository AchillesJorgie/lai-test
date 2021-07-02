import React, { useState, useEffect } from "react";
import x from "./x.svg";
import o from "./o.svg";
import "./App.css";

const ROW_COLUMN_DEFAULT_SIZE = 3;

const setNewBoard = () => {
  const newBoard = [];
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
  let [gameState, setGameState] = useState("ongoing");
  let [playerTurn, setPlayerTurn] = useState("o");
  let [xRowColumnCount, setXRowColumnCount] = useState([0, 0]);
  let [oRowColumnCount, setORowColumnCount] = useState([0, 0]);
  let [winningPlayer, setWinningPlayer] = useState("");

  const onClick = async (player, row, column) => {
    const updatedBoard = [...boardArray];
    if (updatedBoard[column][row].length > 0 || winningPlayer.length > 0) {
      return;
    }
    updatedBoard[column][row] = player;
    if (playerTurn === "o") {
      await setORowColumnCount([
        oRowColumnCount[0] + column,
        oRowColumnCount[1] + row,
      ]);
    } else {
      await setXRowColumnCount([
        xRowColumnCount[0] + column,
        xRowColumnCount[1] + row,
      ]);
    }
    await setBoardArray(updatedBoard);
    await setPlayerTurn(playerTurn === "o" ? "x" : "o");
  };

  useEffect(() => {
    if (
      xRowColumnCount[0] % 3 === 0 &&
      xRowColumnCount[1] % 3 === 0 &&
      xRowColumnCount[0] + xRowColumnCount[1] !== 0
    ) {
      setWinningPlayer("x");
    }
    if (
      oRowColumnCount[0] % 3 === 0 &&
      oRowColumnCount[1] % 3 === 0 &&
      oRowColumnCount[0] + oRowColumnCount[1] !== 0
    ) {
      setWinningPlayer("o");
    }
  }, [xRowColumnCount, oRowColumnCount]);

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
