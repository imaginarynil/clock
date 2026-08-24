import "@/app/style.css";
import { useRef, useState } from "react";

function Stopwatch() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [decimal, setDecimal] = useState(0);
  const [intervalId, setIntervalId] = useState<any>(undefined);
  function start() {
    if (intervalId == undefined)
      setIntervalId(
        setInterval(() => {
          setDecimal((decimal) => (decimal + 1) % (100 + 1));
        }, 6),
      );
  }
  function stop() {
    clearInterval(intervalId);
    setIntervalId(undefined);
  }
  return (
    <div>
      <div>
        {hour > 0 && <span>{hour}:</span>}
        <span>{minute}:</span>
        <span>{second}.</span>
        <span>{decimal}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default Stopwatch;
