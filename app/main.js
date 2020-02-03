const { menubar } = require('menubar');

const mb = menubar({
    browserWindow: {
        webPreferences: {
            nodeIntegration: true
        }
    }
});

mb.on('ready', () => {
    console.log('your app is ready');
});
