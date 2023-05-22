import {IPost} from '../store/types'
/*export const basePath = "https:/localhost:7178/api"*/
export async function getPostsAsync(){
    const result = await fetch(`/api/posts`,{
        method:'GET'
    });
    return result.json();
}
export async function getPostAsync(id:string){
    const result = await fetch(`/api/posts/${id}`,{
        method:'GET'
    });
    return result.json();
}
export async function deletePostAsync(id:string){
    await fetch(`/api/posts/${id}`,{
        method:'DELETE',
        headers: {'Content-Type':'application/json'}
    });
}

export async function createPostAsync(post:IPost){
    const result = await fetch(`/api/posts`,{
        method:'POST',
        body:JSON.stringify(post),
        headers: {'Content-Type':'application/json'}
    });
    return result.json();
}

export async function updatePostAsync(post:IPost){
    const result = await fetch(`/api/posts/${post.id}`,{
        method:'PUT',
        body:JSON.stringify(post),
        headers: {'Content-Type':'application/json'}
    });
    return result.json();
}

