import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [resetGame, setReset] = useState(false);
  const [score, setScore] = useState(0);

  return <>
    <Header score={score} highScore={highScore}/>
    <Main score={score} highScore={highScore} resetGame={resetGame} setScore={setScore} setHighScore={setHighScore} setReset={setReset} />
  </>
}

