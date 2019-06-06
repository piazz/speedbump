/** @jsx jsx */
import { jsx } from "@emotion/core"
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import App from '../presentation/App';
import { RootState } from '../../store/StateModels';
import { fetchSessionState } from '../../actions/sessionActionCreators';

interface IAppContainerProps {
    fetchSessionState: () => void
    isLoading: boolean
}

const AppContainer: React.FC<IAppContainerProps> = ({ isLoading, fetchSessionState }) => {
    useEffect(() => {
        console.log("Beginning")
        fetchSessionState()
    })

    return (
        isLoading ? <LoadingView /> : <App />
    )
}

const LoadingView = () => {
    return (<div/>)
}

const mapState = (state: RootState) => ({
    isLoading: state.appState.loading
})

export default connect(mapState, { fetchSessionState })( AppContainer)
