import React from "react";
import { useCounter } from "../../context/CounterContext";

const CounterControls: React.FC = () => {
  const { dispatch } = useCounter();

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "RESET", payload: 0 })}>Reset</button>
    </div>
  );
};

export default CounterControls;
