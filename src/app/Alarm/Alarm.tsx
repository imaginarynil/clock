import { useState } from "react";
import CreateAlarm from "./CreateAlarm";

function Alarm() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      {!isCreating && <button onClick={() => setIsCreating(true)}>Add</button>}
      {isCreating && <CreateAlarm onClose={() => setIsCreating(false)} />}
    </>
  );
}

export default Alarm;
