import "@/app/style.css";
import { useEffect, useRef, useState } from "react";

const MAX_DECIMAL = 100; // 100 units
const MAX_SECOND = 60;
const MAX_MINUTE = 60;
const DELAY_IN_MS = 10; // 1 second = 100 units

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const decimal = time % MAX_DECIMAL;
  const second = Math.floor((time / MAX_DECIMAL) % MAX_SECOND);
  const minute = Math.floor((time / (MAX_DECIMAL * MAX_SECOND)) % MAX_MINUTE);
  const hour = Math.floor(time / (MAX_DECIMAL * MAX_SECOND * MAX_MINUTE));
  const intervalId = useRef<any>(0);
  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTime((time) => time + 1);
      }, DELAY_IN_MS);
    } else {
      clearInterval(intervalId.current);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isRunning]);
  function formatTime(x: number) {
    let res = x.toString();
    if (x < 10) {
      res = "0" + x;
    }
    return res;
  }
  function startStopwatch() {
    setIsRunning(true);
  }
  function stopStopwatch() {
    setIsRunning(false);
  }
  function resetStopwatch() {
    setTime(0);
  }
  return (
    <div>
      <div>
        {hour > 0 && <span>{hour}:</span>}
        <span>{formatTime(minute)}:</span>
        <span>{formatTime(second)}.</span>
        <span>{formatTime(decimal)}</span>
      </div>
      <button onClick={startStopwatch}>Start</button>
      <button onClick={stopStopwatch}>Stop</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;
