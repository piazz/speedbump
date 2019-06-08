import { AppThunkAction } from "."
import ExtensionService from "../services/extensionService"
import { INITIAL_STATE_FETCHED, SessionActions } from "../store/actions/sessionActions"
import { SessionState } from "../store/StateModels"
import { beginLoading, finishLoading } from "./appActionCreators"

export const initialStateFetched = (state: SessionState): SessionActions => ({
    type: INITIAL_STATE_FETCHED,
    payload: state
})

export const fetchSessionState = (): AppThunkAction => async (dispatch) => {
    console.log("Fetching session")
    // If we're in dev mode, there's no extension, no so browser.
    if (process.env.NODE_ENV !== "production" ) {
      console.debug("App running standalone without extension")
      dispatch(finishLoading())
      return
    }

    console.debug()
    dispatch(beginLoading())

    const sessionState = await ExtensionService.fetchStoredSession()
    dispatch(finishLoading())
    dispatch(initialStateFetched(sessionState))
    console.debug(`Got session info: ${JSON.stringify(sessionState)}`)
}
