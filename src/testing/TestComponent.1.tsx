import { FC, useState } from "react";

export const TestComponent: FC = () => {
  const [count, setCount] = useState<number>(0);
  //const divRef = useRef<div> (null)
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h6>Counter: {count}</h6>
      <button onClick={handleIncrement}>Add to count</button>
    </div>
  );
};
