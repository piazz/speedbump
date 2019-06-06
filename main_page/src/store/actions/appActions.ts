import { SessionActions } from "./sessionActions";

export const IS_GOING_BACK = "IS_GOING_BACK"
export const TIME_REMAINING = "TIME_REMAINING"
export const CLICK_PROCEED = "CLICK_PROCEED"
export const CLICK_RETREAT = "CLICK_RETREAT"
export const BEGIN_LOADING = "BEGIN_LOADING"
export const FINISHED_LOADING = "FINISHED_LOADING"

export interface IsGoingBackAction {
    type: typeof IS_GOING_BACK
}

export interface TimeRemainingAction {
    type: typeof TIME_REMAINING
    payload: {
        newTime: number
    }
}

export interface ClickProceedAction {
    type: typeof CLICK_PROCEED
}

export interface ClickRetreatAction {
    type: typeof CLICK_RETREAT
}

export interface BeginLoadingAction {
    type: typeof BEGIN_LOADING
}

export interface FinishLoadingAction {
    type: typeof FINISHED_LOADING
}

export type AppActions =   IsGoingBackAction  | TimeRemainingAction
                         | ClickRetreatAction | ClickRetreatAction
                         | BeginLoadingAction | FinishLoadingAction