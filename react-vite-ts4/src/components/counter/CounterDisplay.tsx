import React from "react";
import { useCounter } from "../../context/CounterContext";

const CounterDisplay: React.FC = () => {
  const { state } = useCounter();
  return <h2>Count: {state.count}</h2>;
};

export default CounterDisplay;
