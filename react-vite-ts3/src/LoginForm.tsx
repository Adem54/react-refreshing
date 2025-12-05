import { useReducer } from "react";

type State = {
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
};

//Burasi Action yani dispatch e paramtrede verilecek, ve ozellikle payload dispatch OnChange icinde calisacak ve ordan paramtreden gelen event uzerinden o anda girilen valueye erisiuoruz ya iste onu payload a biz atariz ki o da loginReducer action fonks icerisinde onu state deki username e atayacaktir...
type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string };

const initialState: State = {
  username: "",
  password: "",
  loading: false,
  error: null,
};

function loginReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SUBMIT_START":
      return { ...state, loading: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, loading: false };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function LoginForm() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });
    try {
      // fake API call
      await new Promise(res => setTimeout(res, 1000));
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (err) {
      dispatch({ type: "SUBMIT_ERROR", payload: "Noe gikk galt" });
    }
  };

  return (
    <>    <form onSubmit={handleSubmit}>
      <input
        value={state.username}
        onChange={e =>
          dispatch({ type: "SET_USERNAME", payload: e.target.value })
        }
        placeholder="Username"
      />
      <input
        type="password"
        value={state.password}
        onChange={e =>
          dispatch({ type: "SET_PASSWORD", payload: e.target.value })
        }
        placeholder="Password"
      />

      <button type="submit" disabled={state.loading}>
        {state.loading ? "Logging in..." : "Login"}
      </button>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>

    <h3>{JSON.stringify(state)}</h3>
    </>

  );
}

export default LoginForm;