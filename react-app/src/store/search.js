const SEARCH_RESULTS = 'search/SEARCH_RESULTS'
const EMPTY_RESULT = 'search/EMPTY_RESULT'



const searchAction = (search, searchResult) => ({
    type: SEARCH_RESULTS,
    search,
    searchResult
})

const clearSearchAction = () => ({
    type: EMPTY_RESULT
})



export const search = (search_input) => async dispatch => {
    const res = await fetch(`/api/search/shred?search_input=${search_input}`)

    if (res.ok) {
        const search_result = await res.json();
        dispatch(searchAction(search_result, search_input));
        return search_result;
    }
}

export const emptySearch = () => async dispatch => {
    dispatch(clearSearchAction())
    return;
}



const initialState = {}

export default function searchReducer(state = initialState, action) {

    let newState

    switch (action.type) {
        case SEARCH_RESULTS: {
            newState = { ...state }
            let search_results = action.search.results
            newState['search_results'] = search_results
            return newState
        }
        case EMPTY_RESULT: {
            newState = { ...state }
            newState['search_results'] = []
            return newState;
        }
        default:
            return state
    }
}
