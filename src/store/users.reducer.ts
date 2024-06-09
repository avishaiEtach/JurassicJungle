import { AlertColor } from "@mui/material";

interface initialState {
  user: User | undefined;
  loader: boolean;
  state: "login" | "signup";
}

const initialState: initialState = {
  user: undefined,
  loader: true,
  state: "login",
};

export function usersReducer(state = initialState, action: any) {
  let newState = { ...initialState };
  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.user };
      break;
    case "SET_USER_AVATAR_LOADER":
      newState = { ...state, loader: action.loader };
      break;
    case "SET_USER_CHOSEN":
      newState = { ...state, state: action.state };
      break;
    default:
  }
  return newState;
}
