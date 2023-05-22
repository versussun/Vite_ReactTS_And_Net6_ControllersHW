import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostAsync} from "../../services/postsService";
import {IPost} from "../../store/types";
import {PostBigPreview} from "../../components/Post/PostBigPreview";
import {PostFormEdit} from "../../components/PostEditForm/PostFormEdit";

interface Props{
    isEdit:boolean;
}
export function Post({isEdit}:Props){
    const [post,setPost] = useState<IPost>()
    const {id} = useParams();
    async function getPost(id:string|undefined){
        if(id===undefined){
            setPost(undefined);
            return;}
        const result:IPost = await getPostAsync(id);
        setPost(result);
    }
    useEffect(()=>{
        getPost(id)
    },[isEdit,id]);

    if(isEdit){
        return <PostFormEdit post={post}/>
    }else{
        return <PostBigPreview post={post}/>
    }

}