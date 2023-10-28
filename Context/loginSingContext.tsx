import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthProviderProps {
  children: React.ReactNode;
}
type Action =
  | { type: "POST_LOGIN_SUCCESS"; args: any }
  | { type: "LOG_OUT" }
  | { type: "UPDATE_LOGGEDINUSER"; args: any };

type Dispatch = (action: Action) => void;
type State = {
  loginVisible: boolean;
  signupVisible: boolean;
  isLoggedIn?: boolean;
  jwtToken?: string;
  Email?: string;
  loginerror?: boolean;
  FirstName: string;
};

const initialState: State = {
  loginVisible: false,
  signupVisible: false,
  isLoggedIn: false,
  jwtToken: "",
  Email: "",
  FirstName: "",
  loginerror: false,
};

const AuthPopupStateContext = React.createContext<State | undefined>(undefined);
const AuthPopupDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const clearLocal = async () => {
  try {
    await AsyncStorage.removeItem("localAuthState");
  } catch (error) {
    console.log("Error clearing local storage:", error);
  }
};

const AuthPopupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "POST_LOGIN_SUCCESS":
      return {
        ...state,
        signupVisible: false,
        loginVisible: false,
        isLoggedIn: true,
        jwtToken: action.args.jwtToken,
        Email: action.args.Email,
        FirstName: action.args.FirstName,
      };
    case "UPDATE_LOGGEDINUSER":
      return {
        ...state,
        ...action.args,
      };
    case "LOG_OUT":
      clearLocal();
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const AuthPopupContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(AuthPopupReducer, initialState);

  React.useEffect(() => {
    const fetchState = async () => {
      try {
        const storedState = await AsyncStorage.getItem("localAuthState");
        console.log("fetchState::", storedState);
        if (storedState) {
          dispatch({
            type: "UPDATE_LOGGEDINUSER",
            args: JSON.parse(storedState),
          });
        }
      } catch (error) {
        console.log("Error fetching the state:", error);
      }
    };

    fetchState();
  }, []);

  React.useEffect(() => {
    console.log("state:::", state);
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("localAuthState", JSON.stringify(state));
      } catch (error) {
        console.log("Error saving the state:", error);
      }
    };

    saveState();
  }, [state]);

  return (
    <AuthPopupStateContext.Provider value={state}>
      <AuthPopupDispatchContext.Provider value={dispatch}>
        {children}
      </AuthPopupDispatchContext.Provider>
    </AuthPopupStateContext.Provider>
  );
};

const useAuthPopupState = (): State => {
  const context = React.useContext(AuthPopupStateContext);
  if (context === undefined) {
    throw new Error(
      "useAuthPopupState must be used within an AuthPopupContextProvider"
    );
  }
  return context;
};

const useAuthPopupDispatch = (): Dispatch => {
  const context = React.useContext(AuthPopupDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAuthPopupDispatch must be used within an AuthPopupContextProvider"
    );
  }
  return context;
};

export { AuthPopupContextProvider, useAuthPopupState, useAuthPopupDispatch };
