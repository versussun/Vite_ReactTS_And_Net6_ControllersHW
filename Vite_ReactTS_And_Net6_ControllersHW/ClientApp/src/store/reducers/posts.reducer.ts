import {IPost} from "../types";
import {ADD_POST, DELETE_POST, FETCH_POST, IAction, UPDATE_POST} from "../actions/posts.action";

export interface  IState {
    items:IPost[]
}
const initialState:IState={
    items:[]
}
export default function postsReducer(state = initialState,{type, payload}:IAction):IState {
    switch (type){
        case ADD_POST:
            return {...state, items: [...state.items, payload as IPost]}
        case FETCH_POST:
            return {...state, items: payload as IPost[]}
        case UPDATE_POST:
            return {...state, items: state.items.map((post)=>{
                if(post.id===(payload as IPost).id){
                    return payload;
                }
                return  post;
                    }) as IPost[]
            }

        case DELETE_POST:
            return { ...state, items: state.items.filter((post) => post.id !== payload as string) }
        default:
            return  state;

    }
}