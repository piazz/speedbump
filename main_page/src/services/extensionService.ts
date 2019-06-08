import { SessionState } from "../store/StateModels"
import { StorageConstants } from "../utility/constants"

const BrowserConstants = {
    retreatMessageType: "RETREAT",
    proceedMessageType: "PROCEED"
}

const ExtensionService = {
    closeCurrentTab: (tabId: number) => {
        browser.runtime.sendMessage({
            type: BrowserConstants.retreatMessageType,
            id: tabId
        })
    },

    proceedToBlockedResource: (tabId: number) => {
        browser.runtime.sendMessage({
            type: BrowserConstants.proceedMessageType,
            id: tabId
        })
    },

    fetchStoredSession: async (): Promise<SessionState> => {
        const state = await browser.storage.local.get(StorageConstants.STATE_KEY)
        return state[StorageConstants.STATE_KEY]
    }
}

export default ExtensionService
