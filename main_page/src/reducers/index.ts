import { combineReducers, Reducer, AnyAction } from "redux"
import { RootState } from "../store/StateModels";
import configurationReducer from "./configurationReducer";
import sessionReducer from "./sessionReducer";
import appReducer from "./appReducer";
import statsReducer from "./statsReducer";

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
    appState: appReducer,
    sessionState: sessionReducer,
    configuration: configurationReducer,
    stats: statsReducer
})

export default rootReducer
