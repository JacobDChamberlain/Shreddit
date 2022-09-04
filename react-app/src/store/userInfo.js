const GET_ONE_USER = 'users/GET_ONE_USER'
const UPDATE_USER = 'users/UPDATE_USER'


const getOne = (user) => ({
    type: GET_ONE_USER,
    user
})

const updateOne = (user) => ({
    type: UPDATE_USER,
    user
})


export const getUserInfo = (user_id) => async (dispatch) => {

    const res = await fetch(`/api/users/${user_id}`)

    if (res.ok) {
        const user = await res.json()

        dispatch(getOne(user))

        return user
    }
}

export const updateUserInfo = (user) => async (dispatch) => {

    const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if (res.ok) {
        const updatedUser = await res.json();

        dispatch(updateOne(updatedUser));

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



const initialState = {}

export default function userInfoReducer(state = initialState, action) {

    let newState

    switch(action.type) {
        case GET_ONE_USER: {
            newState = {}

            newState[action.user.id] = action.user

            return newState
        }
        case UPDATE_USER: {
            newState = { ...state }

            newState[action.user.id] = action.user

            return newState
        }
        default:
            return state
    }
}
