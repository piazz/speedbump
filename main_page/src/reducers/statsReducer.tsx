import { StatsState } from "../store/StateModels";
import { StatsActions, STATS_LOADED } from "../store/actions/statsActions";

const defaultState: StatsState = {
    pathToStatMap: {}
}

const StatsReducer = (state: StatsState = defaultState, action: StatsActions): StatsState => {
    switch (action.type) {
        case STATS_LOADED:
            return action.payload
        default:
            return state
    }
}

export default StatsReducer