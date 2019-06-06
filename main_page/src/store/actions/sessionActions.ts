import { SessionState } from "../StateModels";

export const INITIAL_STATE_FETCHED = "INITIAL_STATE_FETCHED"

export interface InitialStateFetchedAction {
    type: typeof INITIAL_STATE_FETCHED
    payload: SessionState
}

export type SessionActions = InitialStateFetchedAction