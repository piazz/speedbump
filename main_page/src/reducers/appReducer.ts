import {
    AppActions,
    ENABLE_PROCEED_BUTTON,
    FINISHED_LOADING,
    IS_GOING_BACK,
    TIME_REMAINING,
} from "../store/actions/appActions"
import { AppState } from "../store/StateModels"

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
        case ENABLE_PROCEED_BUTTON:
            return {...state, proceedEnabled: true}
        default:
            return state
    }
}

export default AppReducer
