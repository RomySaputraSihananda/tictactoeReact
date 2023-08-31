import { useState } from "react";

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

const Board = () => {
  const [player, setPlayer] = useState("x");
  const [value, setValue] = useState({ x: [], o: [] });
  const [winner, setWinner] = useState([false, ""]);

  const handleClick = (dom, key) => {
    if (dom.innerText || winner[0]) return;
    const { x, o } = value;

    dom.innerText = player;
    player === "x" ? x.sort().push(key) : o.sort().push(key);

    setValue(value);
    console.log(whoWinner());
    setPlayer(player === "x" ? "o" : "x");
  };

  const children = () => {
    const data = [];
    for (let i = 0; i < 9; i++) {
      data.push(
        <div key={i} onClick={(event) => handleClick(event.target, i)}></div>
      );
    }
    return data;
  };

  const whoWinner = () => {
    const line = player === "x" ? value.x : value.o;
    const search = lines.map((element) => {
      const [a, b, c] = element;
      const data = [line.indexOf(a), line.indexOf(b), line.indexOf(c)];
      const check = data.map((e) => {
        return e !== -1;
      });

      if (check[0] && check[1] && check[2]) return true;
      return false;
    });
    const winner = search.find((e) => e === true);
    if (winner) return setWinner([true, player]);
    return false;
  };

  const reset = () => {
    setValue({ x: [], o: [] });
    setWinner([false, ""]);
    const box = document.querySelectorAll(".Board > div");
    box.forEach((e) => {
      e.innerText = "";
    });
  };

  return (
    <>
      <button onClick={() => reset()}>Reset</button>
      {winner[0] ? (
        <h1>{winner[1]} winner</h1>
      ) : (
        <h1>Player {player} is Run</h1>
      )}
      <div className="Board">{children()}</div>
    </>
  );
};

export default Board;
