import { INITIAL_STATE_FETCHED, SessionActions } from "../store/actions/sessionActions";
import { ThunkAction } from "redux-thunk";
import { RootState, SessionState } from "../store/StateModels";
import { Storage } from "../utility/Constants";
import { AppActions } from "../store/actions/appActions";
import { finishLoading, beginLoading } from "./appActionCreators";

export const initialStateFetched = (state: SessionState): SessionActions => ({
    type: INITIAL_STATE_FETCHED,
    payload: state
})

export const fetchSessionState = (): ThunkAction<void, RootState, null, AppActions | SessionActions> => async (dispatch) => {
  console.log("Fetching session")
  // If we're in dev mode, there's no extension, no so browser.
  if (process.env.NODE_ENV !== "production" ) {
    console.debug("App running standalone without extension")
    dispatch(finishLoading())
    return
  }

  console.debug()
  dispatch(beginLoading())

  const state = await browser.storage.local.get(Storage.STATE_KEY)
  const sessionState: SessionState = state[Storage.STATE_KEY]
  dispatch(finishLoading())
  dispatch(initialStateFetched(state))
  console.debug(`Got session info: ${sessionState}`)
}