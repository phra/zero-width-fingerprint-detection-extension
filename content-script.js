async function detect(ZWCPolicy, ZWCUrl) {
    const req = await fetch(ZWCUrl)
    const ZWC = await req.json()
    const ZWCSet = new Set(ZWC.map(c => c.text))

    function isZWCTracked(text) {
        switch (ZWCPolicy) {
            case 'stegcloak':
            default:
                return text ? /[\u200c\u200d\u2060\u2061\u2062\u2063\u2064]/.test(text) : false
            case 'zwc':
                return text ? text.split('').some(c => ZWCSet.has(c)) : false
            case 'paranoid':
                return text ? /[^\u0000-\u007F]/.test(text) : false
        }
    }

    const setData = DataTransfer.prototype.setData
    DataTransfer.prototype.setData = function mySetData(...args) {
        if (isZWCTracked(args[1])) {
            alert('ZWC Tracking Detected!! [DataTransfer.prototype.setData()]')
        }

        return setData.call(this, ...args)
    }

    document.addEventListener('copy', (event) => {
        const selection = document.getSelection().toString()
        if (isZWCTracked(selection)) {
            alert('ZWC Tracking Detected!! [document.addEventListener("copy")]')
        }
    })

    document.addEventListener('cut', (event) => {
        const selection = document.getSelection().toString()
        if (isZWCTracked(selection)) {
            alert('ZWC Tracking Detected!! [document.addEventListener("cut")]')
        }
    })

    document.addEventListener('paste', (event) => {
        const selection = (event.clipboardData || window.clipboardData).getData('text')
        if (isZWCTracked(selection)) {
            alert('ZWC Tracking Detected!! [document.addEventListener("paste")]')
        }
    })

    const write = Clipboard.prototype.write
    Clipboard.prototype.write = function myWrite(...args) {
        if (isZWCTracked(args[0])) {
            alert('ZWC Tracking Detected!! [Clipboard.prototype.write()]')
        }

        return write.call(this, ...args)
    }

    const writeText = Clipboard.prototype.writeText
    Clipboard.prototype.writeText = function myWriteText(...args) {
        if (isZWCTracked(args[0])) {
            alert('ZWC Tracking Detected!! [Clipboard.prototype.writeText()]')
        }

        return writeText.call(this, ...args)
    }
}

async function main() {
    const browser = this.chrome || this.browser
    const { ZWCPolicy } = await new Promise((resolve, reject) => {
        try {
            browser.storage.sync.get(["ZWCPolicy"], resolve)
        } catch (err) {
            reject(err)
        }
    }).catch(console.error.bind(console))

    const ZWCUrl = browser.runtime.getURL('zwc.json')
    const script = document.createElement('script')
    script.textContent = `${detect.toString()};detect('${ZWCPolicy}', '${ZWCUrl}').catch(console.error.bind(console))`
    document.head.appendChild(script)
}

main().catch(console.error.bind(console))
