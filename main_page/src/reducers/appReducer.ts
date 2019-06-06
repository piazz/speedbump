import { AppState } from "../store/StateModels"
import { AppActions, IS_GOING_BACK, TIME_REMAINING, FINISHED_LOADING } from "../store/actions/appActions";

const defaultAppState: AppState = {
    timeRemaining: 5,
    proceedEnabled: false,
    isGoingBack: false,
    loading: true,
}

const AppReducer = (state: AppState = defaultAppState, action: AppActions): AppState => {
    switch (action.type) {
        case IS_GOING_BACK:
            return { ...state, isGoingBack: true }
        case TIME_REMAINING:
            return { ...state, timeRemaining: action.payload.newTime }
        case FINISHED_LOADING:
            return {...state, loading: false}
        default: 
            return state
    }
}

export default AppReducer