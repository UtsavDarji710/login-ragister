import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from "./Redux/Reducer/Reducer";
export const store = createStore (Reducer,composeWithDevTools())
