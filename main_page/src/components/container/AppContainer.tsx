/** @jsx jsx */
import { jsx } from "@emotion/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"

import { enableProceedButton, isGoingBack, proceed, retreat } from "../../actions/appActionCreators"
import { fetchSessionState } from "../../actions/sessionActionCreators"
import { selectFriendlyURL } from "../../reducers/sessionReducer"
import { RootState } from "../../store/StateModels"
import App from "../presentation/App"

interface ContainerProps {
    // Action Creators
    fetchSessionState: () => void
    isGoingBack: () => void
    retreat: () => void
    proceed: () => void
    enableProceedButton: () => void

    isLoading: boolean
    proceedEnabled: boolean
    id: number
    friendlyURL: string
}

const useFetchSessionState = (boundFetchSessionState: () => void) => {
    useEffect(() => {
        console.log("Beginning")
        boundFetchSessionState()
    }, [])
}

const useSetBeforeUnloadListener = (boundIsGoingBack: () => void) => {
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
        boundIsGoingBack()
    })
  }, [])
}

const AppContainer: React.FC<ContainerProps> = (props) => {
    useFetchSessionState(props.fetchSessionState)
    useSetBeforeUnloadListener(props.isGoingBack)

    return (
        props.isLoading ?
            <LoadingView /> :
            <App
                friendlyURL={props.friendlyURL}
                proceedEnabled={props.proceedEnabled}
                didClickRetreat={props.retreat}
                didClickProceed={props.proceed}
                enableProceedButton={props.enableProceedButton}
            />
    )
}

const LoadingView = () => {
    return (<div/>)
}

const mapState = (state: RootState) => ({
    isLoading: state.appState.loading,
    proceedEnabled: state.appState.proceedEnabled,
    id: state.sessionState.currentTabId,
    friendlyURL: selectFriendlyURL(state.sessionState)
})

const actionCreators = {
    fetchSessionState,
    isGoingBack,
    retreat,
    enableProceedButton,
    proceed
}

export default connect(mapState, actionCreators)( AppContainer )
