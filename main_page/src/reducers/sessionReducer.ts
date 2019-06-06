import { SessionState } from "../store/StateModels";
import { SessionActions, INITIAL_STATE_FETCHED } from "../store/actions/sessionActions";

const defaultSessionState: SessionState = {
    currentTabId: -1,
    redirectURL: "",
}

const SessionReducer = (state: SessionState = defaultSessionState, action: SessionActions): SessionState => {
    switch (action.type) {
        case INITIAL_STATE_FETCHED:
            return action.payload
        default: return state
    }
}

export default SessionReducer