import { AnyAction, combineReducers, Reducer } from "redux"
import { RootState } from "../store/StateModels";
import appReducer from "./appReducer";
import configurationReducer from "./configurationReducer";
import sessionReducer from "./sessionReducer";
import statsReducer from "./statsReducer";

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
    appState: appReducer,
    sessionState: sessionReducer,
    configuration: configurationReducer,
    stats: statsReducer
})

export default rootReducer
