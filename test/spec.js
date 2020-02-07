const Application = require('spectron').Application;
const electronPath = require('electron');
const path = require('path');
const assert = require('assert');

describe('Cat Clipmaster lunch', function() {
    this.timeout(10000);

    const app = new Application({
        path: electronPath,
        args: [path.join(__dirname, '..')],
        webdriverOptions: {
            deprecationWarnings: false
        }
    });

    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if(app && app.isRunning()) {
            return app.stop();
        }
    });

    it('show an initial window', () => {
        return app.client.getWindowCount()
            .then(count => {
                return assert.equal(count, 1);
            });
    });

    it('has the correct title', () => {
        return app.client.waitUntilWindowLoaded()
            .getTitle()
            .then(title => {
                return assert.equal(title, 'Cat Clipmaster');
            })
    });

    it('does not have the developer tools open', () => {
        return app.client.waitUntilWindowLoaded()
            .browserWindow.isDevToolsOpened()
            .then(isOpen => {
                return assert.equal(isOpen, false);
            });
    });

    it('has a button with the text "Copy from Clipboard"', () => {
        return app.client.waitUntilWindowLoaded()
            .getText('#copy-from-clipboard')
            .then(buttonText => {
                return assert.equal(buttonText, 'Copy from Clipboard');
            });
    });

    it('should not have clippings when it starts up', () => {
        return app.client.waitUntilWindowLoaded()
            .$$('.clipping-list-item')
            .then(clippings => {
                return assert.equal(clippings.length, 0);
            });
    });

    it('should have one clipping when the "Copy from Clipboard" button has been clicked', () => {
        return app.client.waitUntilWindowLoaded()
            .click('#copy-from-clipboard')
            .$$('.clipping-list-item')
            .then(clippings => {
                return assert.equal(clippings.length, 1);
            })
    });

    it('should successfully remove a clipping', () => {
        return app.client.waitUntilWindowLoaded()
            .click('#copy-from-clipboard')
            .moveToObject('.clipping-list-item')
            .click('.remove-clipping')
            .$$('.clipping-list-item')
            .then(clippings => {
                return assert.equal(clippings.length, 0);
            });
    });

    it('should have the correct text in a new clipping', () => {
        return app.client.waitUntilWindowLoaded()
            .electron.clipboard.writeText('Hello Electron')
            .click('#copy-from-clipboard')
            .getText('.clipping-text')
            .then(clippingText => {
                return assert.equal(clippingText, 'Hello Electron');
            });
    });

    it('should write the clipping text to the clipboard', () => {
        return app.client.waitUntilWindowLoaded()
            .electron.clipboard.writeText('Hello Electron')
            .click('#copy-from-clipboard')
            .electron.clipboard.writeText('Hello NodeJS')
            .click('.copy-clipping')
            .electron.clipboard.readText()
            .then(clipboardText => {
                return assert.equal(clipboardText, 'Hello Electron');
            })
    });
});
