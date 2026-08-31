import { useState } from "react";

interface CreateAlarmProps {
  onClose: () => void;
}

function CreateAlarm({ onClose }: CreateAlarmProps) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  return (
    <>
      <label>
        Hour
        <input
          type="number"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => {
            const { min, max, value } = e.target;
            setHour(
              Math.max(Number(min), Math.min(Number(max), Number(value))),
            );
          }}
        ></input>
      </label>
      <label>
        Minute
        <input
          type="number"
          min="0"
          max="59"
          value={minute}
          onChange={(e) => {
            const { min, max, value } = e.target;
            setMinute(
              Math.max(Number(min), Math.min(Number(max), Number(value))),
            );
          }}
        ></input>
      </label>
      <button onClick={onClose}>Cancel</button>
      <button>Save</button>
    </>
  );
}

export default CreateAlarm;
