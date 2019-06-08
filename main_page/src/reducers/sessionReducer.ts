import { INITIAL_STATE_FETCHED, SessionActions } from "../store/actions/sessionActions"
import { SessionState } from "../store/StateModels"

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

const shortenRedirectURL = (url: string) => {
    const prefixRemoved = url.replace(/^(.*:\/\/)(www\.)/m, "")
    const suffixRemoved = prefixRemoved.replace(/\..*$/m, "")
    return suffixRemoved
}

export const selectFriendlyURL = (state: SessionState) => {
    return shortenRedirectURL(state.redirectURL)
}

export default SessionReducer
