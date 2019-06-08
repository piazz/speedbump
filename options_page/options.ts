// TODO: Pull the config shape into a shared TS definition.

// MARK: - Constants

const REDIRECTS_KEY = "REDIRECTS"
const SETTINGS_KEY = "SETTINGS"
const TIMEOUT_KEY = "TIMEOUT"

// MARK: - DOM References

let redirectTextAreaElement = document.querySelector("#redirects")! as HTMLTextAreaElement
let timeoutInputElement = document.querySelector("#timeout")! as HTMLInputElement
let formElement = document.querySelector("form")! as HTMLFormElement

// MARK: - Listener Setup

formElement.addEventListener("submit", saveOptions)
document.addEventListener("DOMContentLoaded", restoreOptions)

// MARK: - Models

interface Settings {
    REDIRECTS: string[];
    TIMEOUT: number;
}

function restoreOptions() {
    let settings = browser.storage.sync.get(SETTINGS_KEY) as Promise<{[SETTINGS_KEY]: Settings}>
    settings.then((result) => {
        const settings = result[SETTINGS_KEY]
        if (!settings) {
            // TODO: Set some sensible defaults
            return
        }
        const redirects = settings.REDIRECTS.join("\n")
        const timeout = settings.TIMEOUT

        redirectTextAreaElement.value = redirects
        timeoutInputElement.value = String(timeout)
    })
}

function saveOptions(e: Event) {
    e.preventDefault()

    const redirects = redirectTextAreaElement.value
    const timeout = timeoutInputElement.value

    if (!isValidRedirects(redirects)) {
        window.alert("Not valid!!!!!")
        return
    }

    const processedPatterns = processPatterns(redirects)
    const newSettings: Settings = {
        REDIRECTS: processedPatterns,
        TIMEOUT: Number(timeout)
    }

    browser.storage.sync.set({
        [SETTINGS_KEY]: newSettings
    })
}

function isValidRedirects(redirects: string) {
    // This regex checks:
    // No spaces with negative lookahead: (?!.*\s.*)
    // 0 to 1 "*://" prefixes (\w+:\/\/){0,1}
    // at least 1 letter in the actual URL followed by a ".", including wildcards ((\w|\*)+\.)+
    // ".***" pattern with at least one * \.(\w+)
    // 0 to 1 (/***) patterns (\/.*)*
    // then a newline
    // and the entire thing repeated at least one time
    const pattern = /^(((?!.* .*)(\w+:\/\/){0,1}((\w|\*)+\.)+(\w+)(\/.*)*)\n{0,1})*$/g
    return pattern.test(redirects)
}

function processPatterns(patterns: string) {
    return patterns.split("\n")
}
