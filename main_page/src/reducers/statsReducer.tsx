import { STATS_LOADED, StatsActions } from "../store/actions/statsActions";
import { StatsState } from "../store/StateModels";

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
