import { StatsState } from "../StateModels"

export const STATS_LOADED = "STATS_LOADED"
export interface StatsLoadedAction {
    type: typeof STATS_LOADED
    payload: StatsState
}

export type StatsActions = StatsLoadedAction