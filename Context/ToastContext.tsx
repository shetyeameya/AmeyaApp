import React, { createContext, useReducer, useContext } from "react";
import Toast from "../Reusable/Toast";

interface ToastProviderProps {
  children: React.ReactNode;
}
export type ToastType = "error" | "success" | "info" | "warning";

export interface ToastMessage {
  message: string;
  type: ToastType;
  duration?: number;
}

type ToastAction =
  | {
      type: "SHOW_TOAST";
      payload: ToastMessage;
    }
  | {
      type: "HIDE_TOAST";
    };

interface ToastState {
  toast: ToastMessage | null;
}

const initialState: ToastState = {
  toast: null,
};
const ToastStateContext = createContext<ToastState | undefined>(undefined);

const ToastDispatchContext = createContext<
  React.Dispatch<ToastAction> | undefined
>(undefined);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: ToastState, action: ToastAction) => {
      switch (action.type) {
        case "SHOW_TOAST":
          return { ...state, toast: action.payload };
        case "HIDE_TOAST":
          return { ...state, toast: null };
        default:
          return state;
      }
    },
    initialState
  );

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};
function useToastState() {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error("useToastState must be used within a ToastProvider");
  }
  return context;
}

function useToastDispatch() {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error("useToastDispatch must be used within a ToastProvider");
  }
  return context;
}

export { ToastProvider, useToastDispatch, useToastState };
