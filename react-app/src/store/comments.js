const GET_POST_COMMENTS = 'comments/GET_POST_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'



const getAllByPost = (comments) => ({
    type: GET_POST_COMMENTS,
    comments
})

const createOne = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const updateOne = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteOne = (comment) => ({
    type: DELETE_COMMENT,
    comment
})



export const getCommentsByPost = (post_id) => async (dispatch) => {

    const res = await fetch(`/api/comments/post/${post_id}`)

    if (res.ok) {
        const postComments = await res.json()

        dispatch(getAllByPost(postComments))

        return postComments
    }
}

export const createComment = (comment) => async (dispatch) => {

    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const newComment = await res.json()

        dispatch(createOne(newComment))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
    }
    if (data.errors) {
        return data.errors;
    } else {
        return ['An error occured. Please try again.']
    }
}


export const updateComment = (comment) => async (dispatch) => {

    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const updatedComment = await res.json()

        dispatch(updateOne(updatedComment))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
    }
    if (data.errors) {
        return data.errors;
    } else {
        return ['An error occured. Please try again.']
    }
}

export const deleteComment = (comment_id) => async (dispatch) => {

    const res = await fetch(`/api/comments/${comment_id}/delete`)

    if (res.ok) {
        const deletedComment = await res.json()

        dispatch(deleteOne(deletedComment))

        return deletedComment
    }
}



const initialState = {}

export default function commentReducer(state = initialState, action) {

    let newState

    switch(action.type) {
        case GET_POST_COMMENTS: {
            newState = {}

            action.comments.map(comment => {
                return newState[comment.id] = comment
            })

            return newState
        }
        case CREATE_COMMENT: {
            newState = { ...state }

            newState[action.comment.id] = action.comment

            return newState
        }
        case UPDATE_COMMENT: {
            newState = { ...state }

            newState[action.comment.id] = action.comment

            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state }

            delete newState[action.comment.id]

            return newState
        }
        default:
            return state
    }
}
