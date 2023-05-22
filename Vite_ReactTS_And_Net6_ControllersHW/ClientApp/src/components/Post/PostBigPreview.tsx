import styles from "./PostBigPreview.module.css";
import {IPost} from "../../store/types";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

interface  Props{
    post:IPost|undefined
}
export function PostBigPreview({post}:Props){
    const navigate = useNavigate();

    return (<div className={styles.body}>
        <div className={styles.title}>{post?.title}</div>
        <div className={styles.id}>id:{post?.id}
            <Button style={{display:"block", width:"100%"}}
                    onClick={()=>navigate(`/posts/${post?.id}/edit`)}>Edit</Button>
        </div>
        <div className={styles.preview} style={{
            width: '20em',
            height: '20em',
            backgroundSize: '100% 100%',
            backgroundImage: `url(${post?.preview})`
        }}/>
        <p className={styles.description}>{post?.description}</p>
        <div className={styles.author}>{post?.author}</div>


    </div>)
}