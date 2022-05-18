const GET_ONE_USER = 'users/GET_ONE_USER'


const getOne = (user) => ({
    type: GET_ONE_USER,
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


const initialState = {}

export default function userInfoReducer(state = initialState, action) {

    let newState

    switch(action.type) {
        case GET_ONE_USER: {
            newState = {}

            newState[action.user.id] = action.user

            return newState
        }
        default:
            return state
    }
}
