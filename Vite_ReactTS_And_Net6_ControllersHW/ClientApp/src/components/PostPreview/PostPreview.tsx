import styles from './PostPreview.module.css'
import {IPost} from "../../store/types";

interface Props{
    model:IPost
    onClick: (id:string)=>void,
    OnDeleteClick: (id:string)=>void
}
export function PostPreview(props:Props){
    return(<div className={styles.postView} onClick={()=>props.onClick(props.model.id)} >
        <div className={styles.postView_img} style={{
            width: '100%',
            height: '100%',
            backgroundSize: '100% 100%',
            backgroundImage: `url(${props.model.preview})`
        }}>
            <div className={styles.postView_closeButton}>
                <button onClick={(e) => {
                    e.stopPropagation()
                    props.OnDeleteClick(props.model.id)
                }}>
                    X
                </button>
            </div>
        </div>

        <div className={styles.postView_title}>
            <div>{props.model.title}</div>
            <div>{props.model.author}</div>
        </div>
    </div>);
}