const GET_ALL_COMMUNITIES = 'communities/GET_ALL_COMMUNITIES'
const GET_ONE_COMMUNITY = 'communities/GET_ONE_COMMUNITY'
const CREATE_COMMUNITY = 'communities/CREATE_COMMUNITY'
const UPDATE_COMMUNITY = 'communities/UPDATE_COMMUNITY'
const DELETE_COMMUNITY = 'communities/DELETE_COMMUNITY'



const getAll = (communities) => ({
    type: GET_ALL_COMMUNITIES,
    communities
})

const getOne = (community) => ({
    type: GET_ONE_COMMUNITY,
    community
})

const createOne = (community) => ({
    type: CREATE_COMMUNITY,
    community
})

const updateOne = (community) => ({
    type: UPDATE_COMMUNITY,
    community
})

const deleteOne = (community) =>({
    type: DELETE_COMMUNITY,
    community
})



export const getAllCommunities = () => async (dispatch) => {

    const res = await fetch('/api/communities/')

    if (res.ok) {
        const communities = await res.json()

        dispatch(getAll(communities))

        return communities;
    }
}

export const getOneCommunity = (community_id) => async (dispatch) => {

    const res = await fetch(`/api/communities/${community_id}`)

    if (res.ok) {
        const community = await res.json()

        dispatch(getOne(community))

        return community;
    }
}

export const createCommunity = (community) => async (dispatch) => {

    const res = await fetch('/api/communities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(community)
    })

    if (res.ok) {
        const newCommunity = await res.json()

        dispatch(createOne(newCommunity))

        return newCommunity;
    }
}

export const updateCommunity = (community) => async (dispatch) => {

    const res = await fetch(`/api/communities/${community.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(community)
    })

    if (res.ok) {
        const updatedCommunity = await res.json()

        dispatch(updateOne(updatedCommunity))

        return updatedCommunity;
    }
}

export const deleteCommunity = (community_id) => async (dispatch) => {

    const res = await fetch(`/api/communities/${community_id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deletedCommunity = await res.json()

        dispatch(deleteCommunity(deletedCommunity))

        return deletedCommunity;
    }
}



const initialState = {}

export default function communityReducer(state = initialState, action) {

    let newState

    switch(action.type) {
        case GET_ALL_COMMUNITIES: {
            newState = {...state};

            action.communities.map(community => {
                return newState[community.id] = community;
            })

            return newState;
        }
        case GET_ONE_COMMUNITY: {
            newState = {};

            newState[action.community.id] = action.community;

            return newState;
        }
        case CREATE_COMMUNITY: {
            newState = { ...state };

            newState[action.community.id] = action.community;

            return newState;
        } // create and update are identical- refactor, DRY
        case UPDATE_COMMUNITY: {
            newState = { ...state };

            newState[action.community.id] = action.community

            return newState;
        }
        case DELETE_COMMUNITY: {
            newState = { ...state }

            delete newState[action.community.id];

            return newState;
        }
        default:
            return state;
    }
}
