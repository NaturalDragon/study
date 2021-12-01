
export const REQUEST_POSTS='REQUEST_POSTS'
export const RECEIVE_POSTS='RECEIVE_POSTS'
export const SELECT_SUBREDDIT='SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT='INVALIDATE_SUBREDDIT'


export const selectSubreddit=subreddit=>{
    return {
        type:SELECT_SUBREDDIT,
        subreddit
    }
}
export const invalidateSubreddit=subreddit=>{
    return{
        type:INVALIDATE_SUBREDDIT,
        subreddit
    }
}
export const requestPost=subreddit=>{
    return {
        type:REQUEST_POSTS,
        subreddit
    }
}

export const receviePosts=(subreddit,json)=>{
    debugger
    return {
        type:RECEIVE_POSTS,
        subreddit,
        items:[`${json}`]
    }
}
const fetchPost=subreddit=>dispatch=>{
    debugger
    dispatch(requestPost(subreddit));
    return fetch(`http://171.221.227.116:5004/api/health`).then(res=>res.json())
    .then(json=>dispatch(receviePosts(subreddit,json)))
}
const shouldFetchPosts=(state,subreddit)=>{
    debugger
    const posts=state.postsBySubreddit[subreddit];
    if(!posts){
        return true;
    }
    if(posts.isFetching){
        return false;
    }
    return posts.ditInvalidate
}
export const fecthPostsIfNeeded=subreddit=>(dispatch,getState)=>{
    debugger
     if(shouldFetchPosts(getState(),subreddit)){
         return dispatch(fetchPost(subreddit))
     }
}
export const addTodo=(text,list)=>{
    return  {
        type:'ADD_TODO',
        text,
        list
    }
}