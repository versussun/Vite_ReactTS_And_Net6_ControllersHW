import { Formik, Form, FormikHelpers } from 'formik'
import {IPost} from "../../store/types";
import 'formik-antd/es/input/style'

import {SubmitButton, FormItem, Input} from "formik-antd/es";
import styles from './PostFormEdit.module.css'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {string} from "yup";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {addPostRequestAction, updatePostRequestAction} from "../../store/actions/posts.action";

interface  Props{
    post:IPost|undefined
}
const initValue:IPost ={
    id:'',
    title:'',
    author:'',
    description:'',
    preview:''
}
export function PostFormEdit({post}:Props){
    const[model, setModel] = useState<IPost>(post??initValue)
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()

    useEffect(()=>{
        setModel(post??initValue)
    },[post])

    const postSchema=Yup.object({
        title:string().min(5).max(256).required(),
        author:string().min(5).max(256).required(),
        description:string().min(20).max(1280).required(),
        preview:string().required()
    })

    return(
    <div className={styles.edit_form}>
        <h1 style={{textAlign:"center"}}>{post===undefined?"CREATE POST":"EDIT POST"}</h1>
        <Formik enableReinitialize={true} validationSchema={postSchema}
            initialValues={model}
            onSubmit={ async (
                values: IPost,
                { setSubmitting }: FormikHelpers<IPost>
            ) => {
                setSubmitting(true);
                if(post===undefined) {
                    await dispatch(addPostRequestAction(values))
                }else{
                    await dispatch(updatePostRequestAction(values));
                }
                setSubmitting(false);

                navigate(post===undefined?'/':`/posts/${values.id}`);

            }}
        >
            <Form >
                <FormItem name='title' label='Title' required={true}>
                    <Input name='title'></Input>
                </FormItem>
                <FormItem name='author' label='Author'>
                    <Input name='author'/>
                </FormItem>
                <FormItem name='description' label='Description'>
                    <Input.TextArea name='description'/>
                </FormItem>
                <FormItem name='preview' label='Preview'>
                    <Input name='preview'/>
                </FormItem>
                <div>
                    <SubmitButton style={
                        {
                            display:"block",
                            marginLeft:"auto",
                            marginRight:"0",
                            fontSize:"1em",
                            height:"2em",
                            width:"5em",
                            marginTop:"1em"
                        }}>Submit</SubmitButton>
                </div>
            </Form>
        </Formik>
    </div>
    )
}