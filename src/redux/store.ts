import { createStore, combineReducers } from "redux";
import { isauth, DATA, USER } from "./reducer";

const Reducers = combineReducers({ isauth, DATA, user: USER });

export const store = createStore(Reducers);
