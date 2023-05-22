import postsReducer, {IState} from "./posts.reducer";
import {combineReducers} from "redux";

export interface IRootState{
    posts:IState
}
const rootReducer = combineReducers<IRootState>({
    posts: postsReducer
});
export default rootReducer;