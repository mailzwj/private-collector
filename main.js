const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const ipcMain = require('./native/ipc-main');
const ipcAdd = require('./native/ipc-add');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 768,
        show: false
    });

    let home = url.format({
        pathname: path.resolve(__dirname, './html/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(home);

    win.on('close', () => {
        win = null;
    });

    win.webContents.on('did-finish-load', () => {
        win.show();
        ipcMain(win);
    });

    ipcAdd(win);

    // win.show();
};

app.on('ready', createWindow);

app.on('window-all-close', () => {
    if (process.platform !== 'darwin') {
        win.quit();
    }
});

app.on('activate', () => {
    if (!win) {
        createWindow();
    }
});
