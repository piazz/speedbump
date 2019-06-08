import { ThunkAction } from "redux-thunk"

import { AllActions } from "../store/actions"
import { RootState } from "../store/StateModels"

export type AppThunkAction = ThunkAction<void, RootState, null, AllActions>
