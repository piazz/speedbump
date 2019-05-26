/* eslint-disable no-undef */

// MARK: - Constants

const patterns = ["*://*.reddit.com/*",
                 "*://*.facebook.com/*",
                 "*://*.news.ycombinator.com/*"
                ];
const url = browser.runtime.getURL("index.html");

// MARK: - Properties

let currentActiveTabId = -1
let sessionMap = {}

// MARK: - Listeners

browser.webRequest.onBeforeRequest.addListener(
    redirectToExtension,
    { urls: patterns },
    ["blocking"]
);
browser.tabs.onActivated.addListener(onActivatedTab)
browser.runtime.onMessage.addListener(receiveMessage)

// MARK: - Functions

function onActivatedTab(activeInfo) {
    currentActiveTabId = activeInfo.tabId
}

function redirectToExtension(requestDetails) {
    // If we have an originUrl, that means this wasn't
    // a user initiated request, so we don't care about it.
    if (requestDetails.originUrl) {
        return
    }

    // If we're redirecting for this particular tab right now,
    // delete the redirect session and then return to proceed on.
    const existingSession = sessionMap[requestDetails.tabId]
    if (existingSession && existingSession.isRedirecting) {
        delete sessionMap[requestDetails.tabId]
        console.log("Not gonna redirect")
        return
    }

    console.log("Redirecting")
    // Otherwise:
    // Create a new session
    const newSession = {
        redirectURL: requestDetails.url,
        tabId: currentActiveTabId,
    }

    // Store it in the map
    sessionMap[currentActiveTabId] = newSession

    // Store the redirect and id in local storage for the react app
    const storingPromise = browser.storage.local.set({
        PAUSE_STATE: {
            redirectURL: requestDetails.url,
            id: currentActiveTabId,
        }
    })

    // Return the redirectURL once we've set the local storage
    return storingPromise.then(() => {
        return {
            redirectUrl: url
        };
    })
}

function proceed(tabId) {
    console.log(`Proceeding to URL: ${url}`)
    const session = sessionMap[tabId]
    if (session) {
        browser.tabs.update(tabId, {url: session.redirectURL})
    } else {
        console.error("Should be a session!!!")
    }
}

function retreat(tabId) {
    browser.tabs.remove(tabId)
}

function receiveMessage(message) {
    switch (message.type) {
        case "PROCEED":
            proceed(message.id)
            break
        case "RETREAT":
            retreat(message.id)
            break
        default:
            console.warning("Unknown Message")
    }
}
