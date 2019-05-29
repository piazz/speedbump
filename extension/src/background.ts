/* eslint-disable no-undef */

// MARK: - Constants

const patterns = ["*://*.reddit.com/*",
                 "*://*.facebook.com/*",
                 "*://*.news.ycombinator.com/*"
                ];
const url = browser.runtime.getURL("index.html");

// MARK: - Properties

let currentActiveTabId = -1

interface ISession {
    redirectURL: string;
    tabId: number;
    isRedirecting: boolean;
}
let sessionMap: {[key: number]: ISession} = {}

// MARK: - Listeners

browser.webRequest.onBeforeRequest.addListener((details) => {
    // If we have an originUrl, that means this wasn't
    // a user initiated request, so we don't care about it.
    if (details.originUrl) {
        return
    }

    // If we're redirecting for this particular tab right now,
    // delete the redirect session and then return to proceed on.
    const existingSession = sessionMap[details.tabId]
    if (existingSession && existingSession.isRedirecting) {
        delete sessionMap[details.tabId]
        console.log("Not gonna redirect")
        return
    }

    console.log("Redirecting")
    // Otherwise:
    // Create a new session
    const newSession: ISession = {
        redirectURL: details.url,
        tabId: currentActiveTabId,
        isRedirecting: false,
    }

    // Store it in the map
    sessionMap[currentActiveTabId] = newSession

    // Store the redirect and id in local storage for the react app
    const storingPromise = browser.storage.local.set({
        PAUSE_STATE: {
            redirectURL: details.url,
            id: currentActiveTabId,
        }
    })

    // Return the redirectURL once we've set the local storage
    return storingPromise.then(() => {
        return {
            redirectUrl: url
        };
    })
},
    { urls: patterns },
    ["blocking"]
);

browser.tabs.onActivated.addListener((activeInfo) => {
    currentActiveTabId = activeInfo.tabId
})

interface IMessage {
    type: string;
    id: number;
}
browser.runtime.onMessage.addListener((message: IMessage) => {
    switch (message.type) {
        case PROCEED_MESSAGE:
            proceed(message.id)
            break
        case RETREAT_MESSAGE:
            retreat(message.id)
            break
        default:
            console.warn("Unknown Message")
    }
})


function proceed(tabId: number) {
    console.log(`Proceeding to URL: ${url}`)
    const session = sessionMap[tabId]
    if (session) {
        browser.tabs.update(tabId, {url: session.redirectURL})
    } else {
        console.error("Should be a session!!!")
    }
}

function retreat(tabId: number) {
    browser.tabs.remove(tabId)
}

const PROCEED_MESSAGE = "PROCEED"
const RETREAT_MESSAGE = "RETREAT"
function receiveMessage(message: IMessage) {
    switch (message.type) {
        case PROCEED_MESSAGE:
            proceed(message.id)
            break
        case RETREAT_MESSAGE:
            retreat(message.id)
            break
        default:
            console.warn("Unknown Message")
    }
}
