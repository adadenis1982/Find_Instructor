import * as types from "../actionTypes/map";

const initialState = {
    loading: false,
    error: null,
    map: []
}

export function mapReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case types.INIT_MAP_LOADING:
        case types.DELETE_MAP_LOADING: {
            const newState = {...state};
            newState.loading = true;
            newState.error = null;
            return newState;
        }
        case types.INIT_MAP_ERROR:
        case types.DELETE_MAP_ERROR:{
            const newState = {...state};
            newState.loading = false;
            newState.error = payload;
            return newState;
        }

        case types.INIT_MAP_SUCCESS: {
            const newState = {...state};
            newState.loading = true;
            newState.error = null;
            newState.map = payload;
            return newState;
        }

        case types.DELETE_MAP_SUCCESS: {
            const newState = {...state};
            newState.loading = false;
            newState.error = null;
            return newState;
        }


        default:{
            return state;
        }
    }
}
