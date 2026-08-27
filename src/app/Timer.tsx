import "@/app/style.css";
import { useEffect, useId, useRef, useState } from "react";

const MAX_SECOND = 60;
const MAX_MINUTE = 60;
const DELAY_IN_MS = 10;

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finishDate, setFinishDate] = useState(new Date());
  const hoursId = useId();
  const minutesId = useId();
  const secondsId = useId();
  const intervalId = useRef<any>(0);

  useEffect(() => {
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(timeInSeconds);
    let date = new Date();
    date.setTime(date.getTime() + timeInSeconds * 1000);
    setFinishDate(date);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && time === 0) {
      clearInterval(intervalId.current);
      setIsRunning(false);
      alert("time is up");
    }
  }, [time]);

  const secondComponent = Math.floor(time % MAX_SECOND);
  const minuteComponent = Math.floor((time / MAX_SECOND) % MAX_MINUTE);
  const hourComponent = Math.floor(time / (MAX_SECOND * MAX_MINUTE));

  function handleStart() {
    if (time === 0) {
      return;
    }
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  return (
    <div>
      <label htmlFor={hoursId}>Hours</label>
      <input
        id={hoursId}
        type="number"
        min="0"
        value={hours}
        onChange={(e) => {
          const { min, max, value } = e.target;
          setHours(Math.max(Number(min), Number(value)));
        }}
      />
      <label htmlFor={minutesId}>Minutes</label>
      <input
        id={minutesId}
        type="number"
        min="0"
        max="59"
        value={minutes}
        onChange={(e) => {
          const { min, max, value } = e.target;
          setMinutes(
            Math.max(Number(min), Math.min(Number(max), Number(value))),
          );
        }}
      />
      <label htmlFor={secondsId}>Seconds</label>
      <input
        id={minutesId}
        type="number"
        min="0"
        max="59"
        value={seconds}
        onChange={(e) => {
          const { min, max, value } = e.target;
          setSeconds(
            Math.max(Number(min), Math.min(Number(max), Number(value))),
          );
        }}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <p>
        {hourComponent} {minuteComponent} {secondComponent}
      </p>
      <p>
        {finishDate.getHours()} {finishDate.getMinutes()}{" "}
        {finishDate.getSeconds()}
      </p>
    </div>
  );
}

export default Timer;
