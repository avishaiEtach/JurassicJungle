export function setUser(user: User | undefined): any {
  return async (dispatch: any) => {
    dispatch({ type: "SET_USER", user });
  };
}

export function setUserAvatarLoader(loader: boolean): any {
  return async (dispatch: any) => {
    dispatch({ type: "SET_USER_AVATAR_LOADER", loader });
  };
}

export function setUserChosen(state: "login" | "signup"): any {
  return async (dispatch: any) => {
    dispatch({ type: "SET_USER_CHOSEN", state });
  };
}
