import { useState, useEffect } from "react";
import Timer from "./Timer.jsx";

const App = () => {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [baseMinutes, setBaseMinutes] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isReverse, setIsReverse] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    if (baseMinutes <= 0) return;
    setIsRunning(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setBaseMinutes(0);
    setInputMinutes(0);
  };

   useEffect(() => {
    if (isPaused && inputMinutes > 0) {
      setBaseMinutes((prev) => prev + inputMinutes);
      setInputMinutes(0);
      setIsRunning(true);
      setIsPaused(false);
    }
  }, [inputMinutes]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "300px",
        }}
      >
        <h1>{isReverse ? "Reverse Timer" : "Normal Timer"}</h1>

        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => setIsReverse(true)}>Reverse</button>
          <button onClick={() => setIsReverse(false)}>Normal</button>
        </div>

        <input
          type="number"
          placeholder="Add minutes"
          value={inputMinutes}
          onChange={(e) =>
            setInputMinutes(
              e.target.value === "" ? 0 : Number(e.target.value)
            )
          }
          style={{ padding: "6px", marginBottom: "15px", width: "80%" }}
        />

        <Timer
          minutes={baseMinutes}
          isRunning={isRunning}
          isReverse={isReverse}
          onFinish={() => {
            setIsRunning(false);
            setIsPaused(false);
            setBaseMinutes(0);
          }}
        />

        <div style={{ marginTop: "20px" }}>
          {!isRunning && !isPaused && (
            <button onClick={startTimer}>Start</button>
          )}

          {isRunning && (
            <button onClick={stopTimer}>Stop</button>
          )}

          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
