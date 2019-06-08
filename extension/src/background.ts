// MARK: - Constants

const url = browser.runtime.getURL("main/index.html");

// MARK: - Properties

let currentActiveTabId = -1

interface Session {
    redirectURL: string;
    tabId: number;
    isRedirecting: boolean;
}
let sessionMap: {[key: number]: Session} = {}

// MARK: - Listeners
const onBeforeRequestListener = (details: any) => {

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
    const newSession: Session = {
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
            currentTabId: currentActiveTabId,
        }
    })

    // Return the redirectURL once we've set the local storage
    return storingPromise.then(() => {
        return {
            redirectUrl: url
        };
    })
}

const REDIRECT_PATTERNS_KEY = "REDIRECTS"
interface ISettings {
    REDIRECTS: string[];
    TIMEOUT: number;
}
const getSettings: () => Promise<ISettings | undefined> = async ()=> {
    const settings = await browser.storage.sync.get(SETTINGS_KEY)
    return settings[SETTINGS_KEY]
}

const refreshRedirects = (redirects: string[]) => {
    console.log(`Setting new redirects to: ${redirects}`)
    browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener)
    browser.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, { urls: redirects }, ["blocking"]);
}

const parseRedirects = (redirects: string[]): string[] => {
    // URLS will be coming in the formats of "reddit.com", "*.reddit.com", "www.reddit.com", "http://reddit.com", "http://www.reddit.com"
    const pattern = /^(\w+:\/\/){0,1}(www\.){0,1}/g
    return redirects.map((str) => {
        const suffix = str.replace(pattern, "")
        const withoutTrailingSlash = suffix.replace(/\/$/, "")
        const ret = `*://*.${withoutTrailingSlash}/*`  
        console.log(ret)
        return ret
    })
}

function processNewSettings(settings: ISettings) {
    // TODO: other stuff
    const redirects = parseRedirects(settings.REDIRECTS)
    refreshRedirects(redirects)
    return Promise.resolve()
}

const defaultSettings: ISettings = {
    REDIRECTS: ["reddit.com"],
    TIMEOUT: 5,
}

async function setDefaultSettings() {
    return browser.storage.sync.set({
        [SETTINGS_KEY]: defaultSettings
    }).then(() => {
        return defaultSettings
    })
}

function initExtension() {
    // TODO: Remove this clear. This is only for testing. 
    browser.storage.sync.clear()
    .then(getSettings)
    .then((settings) => {
        if (settings === undefined) {
            return setDefaultSettings()
        } else {
            return settings
        }
    })
    .then(processNewSettings)
    .then(() => {
        setupListeners()
    })
}

const REDIRECTS_KEY = "REDIRECTS"
const SETTINGS_KEY = "SETTINGS"
const TIMEOUT_KEY = "TIMEOUT"
function setupListeners() {
    browser.tabs.onActivated.addListener((activeInfo) => {
        currentActiveTabId = activeInfo.tabId
    })

    browser.storage.onChanged.addListener(() => {
        getSettings().then((settings) => {
            // TODO: Figure out why the fucking typecast doesn't work here
            // (settings shouldn't be empty at this point)
            processNewSettings(settings as ISettings)
        })
    })
}

interface Message {
    type: string;
    id: number;
}
browser.runtime.onMessage.addListener((message: Message) => {
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
function receiveMessage(message: Message) {
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

initExtension()