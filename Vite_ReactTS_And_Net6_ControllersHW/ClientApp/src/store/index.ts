import {applyMiddleware, createStore, Dispatch} from "redux";

import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import {IAction} from "./actions/posts.action";
import rootReducer, {IRootState} from "./reducers/rootReducer";

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<IRootState, IAction>)
)
export type AppDispatch = ThunkDispatch<IRootState, null, IAction> & Dispatch<IAction>;
export default store