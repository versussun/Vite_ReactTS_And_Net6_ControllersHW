import {IPost} from "../types";
import {createPostAsync, deletePostAsync, getPostsAsync, updatePostAsync} from "../../services/postsService";
import { Dispatch } from 'redux';
export const FETCH_POST='[POST] fetch Post'
export const ADD_POST = '[POST] add Post'
export const UPDATE_POST ='[POST] update POST'
export const DELETE_POST='[POST] delete POST'

export interface IAction{
    type:string,
    payload:string|IPost|IPost[]
}

export function fetchPostsAction(payload:IPost[]):IAction{
    return{
        type:FETCH_POST,
        payload:payload
    }
}

export function addPostAction(payload:IPost):IAction{
    return{
        type:ADD_POST,
        payload:payload
    }
}
export function updatePostAction(payload:IPost):IAction{
    return {
        type:UPDATE_POST,
        payload:payload
    }
}
export function deletePostAction(payload:string):IAction{
    return {
        type:DELETE_POST,
        payload:payload
    }
}

export function fetchPostsRequestAction(){
    return async function(dispatch:Dispatch){
        const items:IPost[] = await  getPostsAsync();
        return  dispatch(fetchPostsAction(items))
    }
}
export function addPostRequestAction(post:IPost){
    return async function(dispatch:Dispatch){
        const crtPost= await createPostAsync(post)
        return dispatch(addPostAction(crtPost))
    }
}
export function updatePostRequestAction(post:IPost){
    return async function(dispatch:Dispatch){
        const updPost = await  updatePostAsync(post)
        return dispatch(updatePostAction(updPost))
    }
}
export function deletePostRequestAction(id:string){
    return async function(dispatch:Dispatch){
        await  deletePostAsync(id);
        return dispatch(deletePostAction(id))
    }
}


