import {SELECT_SUBREDDIT,INVALIDATE_SUBREDDIT,RECEIVE_POSTS,REQUEST_POSTS} from '../actions'

export const selectedSubreddit=(state='reactjs',action)=>{
    switch(action.type){
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

const posts=(state={
    isFetching:false,
    ditInvalidate:false,
    items:[]
},action)=>{
        switch(action.type){
            case INVALIDATE_SUBREDDIT:
                return {
                    ...state,ditInvalidate:true
                }
            case REQUEST_POSTS:
                return {
                    ...state,
                    isFetching:true,
                    ditInvalidate:false
                }
            case RECEIVE_POSTS:
                return {
                    ...state,
                    isFetching:false,
                    ditInvalidate:false,
                    items:action.items

                }
            default:
                return state
        }
}

export const postsBySubreddit=(state={},action)=>{
    debugger
    switch(action.type){
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
        return {
            ...state,
            [action.subreddit]:posts(state[action.subreddit],action)
        }
        default:
            return state
    }
}
