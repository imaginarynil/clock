import { Alarm } from "@/app/Alarm/types";
import { useState } from "react";

interface AlarmItemProps {
  alarm: Alarm;
  onUpdate: (alarm: Alarm) => void;
}

function AlarmItem({ alarm, onUpdate }: AlarmItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hour, setHour] = useState(alarm.hour);
  const [minute, setMinute] = useState(alarm.minute);
  return (
    <>
      {isUpdating ? (
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
          <button
            onClick={() => {
              setIsUpdating(false);
              setHour(alarm.hour);
              setMinute(alarm.minute);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onUpdate({
                ...alarm,
                hour: hour,
                minute: minute,
              });
              setIsUpdating(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          {alarm.hour} {alarm.minute}
        </>
      )}
      {!isUpdating && (
        <button onClick={() => setIsUpdating(true)}>Update</button>
      )}
      <button>Delete</button>
    </>
  );
}

interface AlarmListProps {
  alarms: Alarm[];
  onUpdateAlarm: (alarm: Alarm) => void;
}

function AlarmList({ alarms, onUpdateAlarm }: AlarmListProps) {
  return (
    <ul>
      {alarms.map((alarm) => (
        <li key={alarm.id}>
          <AlarmItem alarm={alarm} onUpdate={onUpdateAlarm} />
        </li>
      ))}
    </ul>
  );
}

export default AlarmList;
