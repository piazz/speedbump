import { BEGIN_LOADING, AppActions, FINISHED_LOADING } from "../store/actions/appActions";

export const beginLoading = (): AppActions => ( { type: BEGIN_LOADING } )
export const finishLoading = (): AppActions => ( { type: FINISHED_LOADING } )
