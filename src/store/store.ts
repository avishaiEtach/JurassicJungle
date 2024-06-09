import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { usersReducer } from "./users.reducer";

const rootReducer = combineReducers({
  usersModel: usersReducer, //use in useLanguage component
});

const composeEnhancers = compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
