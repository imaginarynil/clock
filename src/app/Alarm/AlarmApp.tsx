import { useState } from "react";
import CreateAlarm from "@/app/Alarm/CreateAlarm";
import { Alarm } from "@/app/Alarm/types";
import AlarmList from "./AlarmList";

const initialAlarms = [
  { id: crypto.randomUUID(), hour: 12, minute: 0, active: true },
];

function AlarmApp() {
  const [isCreating, setIsCreating] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);

  function handleCreateAlarm(alarm: Alarm) {
    setAlarms([...alarms, alarm]);
  }

  function handleUpdateAlarm(updatedAlarm: Alarm) {
    setAlarms(
      alarms.map((alarm) => {
        if (updatedAlarm.id === alarm.id) {
          return updatedAlarm;
        } else {
          return alarm;
        }
      }),
    );
  }

  return (
    <>
      {!isCreating && <button onClick={() => setIsCreating(true)}>Add</button>}
      {isCreating && (
        <CreateAlarm
          onClose={() => setIsCreating(false)}
          onCreate={handleCreateAlarm}
        />
      )}
      <AlarmList alarms={alarms} onUpdateAlarm={handleUpdateAlarm} />
    </>
  );
}

export default AlarmApp;
