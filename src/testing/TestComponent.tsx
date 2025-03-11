import { useState } from "react";

type ChildProps = {
  title: string;
  setFoo: React.Dispatch<React.SetStateAction<string>>;
};

const Child = ({ title, setFoo }: ChildProps) => {
  return (
    <>
      <p>Hello from {title} element</p>
      <button onClick={() => setFoo("yayy")}>set text</button>
    </>
  );
};

export const TestComponent = () => {
  const [count, setCount] = useState<number>(0);
  const [foo, setFoo] = useState<string>("");
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h6>Counter: {count}</h6>
      <button onClick={handleIncrement}>Add to count</button>
      <Child title="slkj :)" setFoo={setFoo} />
      <p>foo is {foo}</p>
    </div>
  );
};

export default TestComponent;
