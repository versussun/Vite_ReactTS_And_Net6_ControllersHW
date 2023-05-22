import {PostPreview} from "../PostPreview/PostPreview";
import {useDispatch, useSelector} from "react-redux";
import {deletePostRequestAction} from "../../store/actions/posts.action";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../../store";
import {IRootState} from "../../store/reducers/rootReducer";
import {IPost} from "../../store/types";
import styles from './PostList.module.css'

export function PostsList(){
    const posts = useSelector<IRootState,IPost[]>((state)=>state.posts.items);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate()
    function onPostClick(id:string){
        navigate(`/posts/${id}`);
    }
    async function onPostDelete(id:string){
        await dispatch(deletePostRequestAction(id));
    }

    return (
        <div className={styles.list}>
            {posts.map(post=><PostPreview key={post.id} model={post} onClick={onPostClick} OnDeleteClick={onPostDelete}/>)}
        </div>)

}