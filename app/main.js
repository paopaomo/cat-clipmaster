const { menubar } = require('menubar');

const mb = menubar();

mb.on('ready', () => {
    console.log('your app is ready');
});
