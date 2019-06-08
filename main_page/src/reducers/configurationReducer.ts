import { CONFIGURATION_LOADED, ConfigurationActions } from "../store/actions/configurationActions"
import { ConfigurationState } from "../store/StateModels"

const defaultState: ConfigurationState = {
    pauseDurationSec: 10
}

const configurationReducer = (state: ConfigurationState = defaultState, action: ConfigurationActions) => {
    switch (action.type) {
        case CONFIGURATION_LOADED:
            return action.payload
        default:
            return state
    }
}

export default configurationReducer
