import React, { createContext, useContext, useReducer } from "react";

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET"; payload?: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: action.payload ?? 0 };
    default:
      return state;
  }
};

//Bunlar ozellikle context i kullanacak, compnoent in event-func larinda kullanilacak ve bunlari biz CountetContextType tipii ile gonderiyoruz
interface CounterContextType {
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const value: CounterContextType = { state, dispatch };

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
};

export const useCounter = (): CounterContextType => {
  const ctx = useContext(CounterContext);
  if (!ctx) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return ctx;
};
