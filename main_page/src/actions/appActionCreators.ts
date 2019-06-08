import { AppThunkAction } from "."
import ExtensionService from "../services/extensionService"
import {
  AppActions,
  BEGIN_LOADING,
  ENABLE_PROCEED_BUTTON,
  FINISHED_LOADING,
  IS_GOING_BACK,
} from "../store/actions/appActions"

type AppActionCreator = () => AppActions

const Constants = {
  appCloseWaitDurationMsec: 100
}

export const beginLoading: AppActionCreator = () => ( { type: BEGIN_LOADING } )
export const finishLoading: AppActionCreator = () => ( { type: FINISHED_LOADING } )
export const isGoingBack: AppActionCreator = () => ( { type: IS_GOING_BACK } )
export const enableProceedButton: AppActionCreator = () => ( { type: ENABLE_PROCEED_BUTTON } )

export const proceed = (): AppThunkAction => async (dispatch, getState) => {
  const tabId = getState().sessionState.currentTabId
  ExtensionService.proceedToBlockedResource(tabId)
}

export const retreat = (): AppThunkAction => async (dispatch, getState) => {
  console.log("Retreating")

  history.back()
  setTimeout(() => {
    const state = getState()
    const tabIsGoingBack = state.appState.isGoingBack
    if (!tabIsGoingBack) {
      const tabId = state.sessionState.currentTabId
      ExtensionService.closeCurrentTab(tabId)
    }
  }, Constants.appCloseWaitDurationMsec)
}
