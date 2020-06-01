const browser = this.chrome || this.browser

function setCurrentChoice({ ZWCPolicy = 'stegcloak' }) {
    document.querySelector('#ZWCPolicy').innerText = document.querySelector('#policy').value = ZWCPolicy
}

function saveOptions(e) {
    e.preventDefault()
    const ZWCPolicy = event.target.elements.policy.value
    browser.storage.sync.set({ ZWCPolicy }, setCurrentChoice.bind(null, ZWCPolicy))
}

function restoreOptions() {
    browser.storage.sync.get('ZWCPolicy', setCurrentChoice)
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
