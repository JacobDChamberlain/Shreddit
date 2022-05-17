const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const GET_COMMUNITY_POSTS = 'posts/GET_COMMUNITY_POSTS'
const GET_ONE_POST = 'posts/GET_ONE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'
const DELETE_POST = 'posts/DELETE_POST'



const getAll = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

const getAllByCommun = (posts) => ({
    type: GET_COMMUNITY_POSTS,
    posts
})

const getOne = (post) => ({
    type: GET_ONE_POST,
    post
})

const createOne = (post) => ({
    type: CREATE_POST,
    post
})

const updateOne = (post) => ({
    type: UPDATE_POST,
    post
})

const deleteOne = (post) => ({
    type: DELETE_POST,
    post
})



export const getAllPosts = () => async (dispatch) => {

    const res = await fetch('/api/posts/')

    if (res.ok) {
        const posts = await res.json()

        dispatch(getAll(posts))

        return posts
    }
}

export const getAllCommunityPosts = (community_id) => async (dispatch) => {

    const res = await fetch(`/api/posts/sh/${community_id}`)

    if (res.ok) {
        const communityPosts = await res.json()

        dispatch(getAllByCommun(communityPosts))

        return communityPosts
    }
}

export const getOnePost = (post_id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${post_id}`)

    if (res.ok) {
        const post = await res.json()

        dispatch(getOne(post))

        return post
    }
}

export const createPost = (post) => async (dispatch) => {

    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    if (res.ok) {
        const newPost = await res.json()

        dispatch(createOne(newPost))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
    if (data.errors) {
        return data.errors;
    }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updatePost = (post) => async (dispatch) => {

    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    if (res.ok) {
        const updatedPost = await res.json()

        console.log("post reducer, res--->", res)

        dispatch(updateOne(updatedPost))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
    if (data.errors) {
        return data.errors;
    }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deletePost = (post_id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${post_id}/delete`)

    if (res.ok) {
        const deletedPost = await res.json()

        dispatch(deleteOne(deletedPost))

        return deletedPost
    }
}



const initialState = {}

export default function postReducer(state = initialState, action) {

    let newState

    switch(action.type) {
        case GET_ALL_POSTS: {
            newState = {}

            action.posts.map(post => {
                return newState[post.id] = post
            })

            return newState
        }
        case GET_COMMUNITY_POSTS: {
            newState = {}

            action.posts.map(post => {
                return newState[post.id] = post
            })

            return newState
        }
        case GET_ONE_POST: {
            newState = {}

            newState[action.post.id] = action.post

            return newState
        }
        case CREATE_POST: {
            newState = { ...state }

            newState[action.post.id] = action.post

            return newState
        }
        case UPDATE_POST: {
            newState = { ...state }

            newState[action.post.id] = action.post

            return newState
        }
        case DELETE_POST: {
            newState = { ...state }

            delete newState[action.post.id]

            return newState
        }
        default:
            return state
    }
}
