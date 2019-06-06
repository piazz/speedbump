export interface ConfigurationState {
    pauseDurationSec: number;
}

export interface SessionState {
    currentTabId: number;
    redirectURL: string;
}

export interface StatsState {
    pathToStatMap: {
        [path: string]: Event
    }
}

// TODO: Flesh out events/metrics
export interface Event {
}

export interface AppState {
    timeRemaining: number;
    proceedEnabled: boolean;
    isGoingBack: boolean;
    loading: boolean;
}

export interface RootState {
    configuration: ConfigurationState
    sessionState: SessionState
    appState: AppState
    stats: StatsState
}