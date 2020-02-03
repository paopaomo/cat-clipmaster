const { menubar } = require('menubar');
const { globalShortcut } = require('electron');

const mb = menubar({
    browserWindow: {
        webPreferences: {
            nodeIntegration: true
        }
    },
    preloadWindow: true,
    index: `file://${__dirname}/index.html`
});

mb.on('ready', () => {
    const createClipping = globalShortcut.register('CommandOrControl+!', () => {
        mb._browserWindow.webContents.send('create-new-clipping');
    });

    if(!createClipping) {
        console.error('Registration failed', 'createClipping');
    }

    const writeClipping = globalShortcut.register('Alt+CommandOrControl+@', () => {
        mb._browserWindow.webContents.send('write-to-clipboard');
    });

    if(!writeClipping) {
        console.error('Registration failed', 'writeClipping');
    }

    const publishClipping = globalShortcut.register('Alt+CommandOrControl+#', () => {
        mb._browserWindow.webContents.send('publish-clipping');
    });

    if(!publishClipping) {
        console.error('Registration failed', 'publishClipping');
    }
});
