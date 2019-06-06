import { ConfigurationState } from "../StateModels";

export const CONFIGURATION_LOADED = "CONFIGURATION_LOADED"
export interface ConfigurationLoadedAction {
    type: typeof CONFIGURATION_LOADED
    payload: ConfigurationState
}

export type ConfigurationActions = ConfigurationLoadedAction
