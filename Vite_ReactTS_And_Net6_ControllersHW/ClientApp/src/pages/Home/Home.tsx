import {Button} from "antd";
import styles from './Home.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchPostsRequestAction} from "../../store/actions/posts.action";
import {AppDispatch} from "../../store";
import {useEffect} from "react";
export function Home(){
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()

    async function featchPosts(){
        await dispatch(fetchPostsRequestAction())
    }
    useEffect(()=>{
        featchPosts()
    },[])

    return (
        <div className={styles.body}>
            <header>
                <div className={styles.headerTitle}>POSTS APP</div>
                <Button onClick={()=>{navigate('/')}}>HOME</Button>
                <Button.Group className={styles.buttons}>
                    <Button size={"large"}
                        onClick={()=>navigate('/posts/add')}>Create</Button>
                </Button.Group>
            </header>
            <Outlet/>
        </div>)
}