import { useState } from "react";
import CreateAlarm from "./CreateAlarm";

interface Alarm {
  id: string;
  hour: number;
  minute: number;
  active: boolean;
}

const initialAlarms = [
  { id: crypto.randomUUID(), hour: 12, minute: 0, active: true },
];

function Alarm() {
  const [isCreating, setIsCreating] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);

  function handleCreateAlarm(alarm: Alarm) {
    setAlarms([...alarms, alarm]);
  }

  return (
    <>
      {!isCreating && <button onClick={() => setIsCreating(true)}>Add</button>}
      {isCreating && (
        <CreateAlarm
          onClose={() => setIsCreating(false)}
          onCreateAlarm={handleCreateAlarm}
        />
      )}
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id}>
            {alarm.hour} {alarm.minute}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Alarm;
