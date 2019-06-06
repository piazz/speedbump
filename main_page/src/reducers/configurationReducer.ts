import { ConfigurationState } from "../store/StateModels";
import { ConfigurationActions, CONFIGURATION_LOADED } from "../store/actions/configurationActions";

const defaultState: ConfigurationState = {
    pauseDurationSec: 10
}

const configurationReducer = (state: ConfigurationState = defaultState, action: ConfigurationActions): ConfigurationState => {
    switch (action.type) {
        case CONFIGURATION_LOADED:
            return action.payload
        default:
            return state
    }
}

export default configurationReducer