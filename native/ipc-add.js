const { ipcMain, BrowserWindow, globalShortcut } = require('electron');
const uuid = require('uuid/v4');
const url = require('url');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/data.json');
let sourceData = require(dataPath);

module.exports = (win) => {

    let cldWin;

    const createSubWindow = () => {
        cldWin = new BrowserWindow({
            width: 400,
            height: 220,
            parent: win,
            modal: true,
            resizable: false,
            show: false
        });

        const add = url.format({
            pathname: path.join(__dirname, '../html/add-fav.html'),
            protocol: 'file:',
            flashes: true
        });

        cldWin.loadURL(add);

        cldWin.on('ready-to-show', () => {
            cldWin.show();
        });

        cldWin.on('close', () => {
            cldWin = null;
        });
    };

    const closeSubWindow = () => {
        if (cldWin) {
            cldWin.close();
            cldWin = null;
        }
    };

    ipcMain.on('show-add-dlg', createSubWindow);

    globalShortcut.register('CmdOrCtrl+D', () => {
        if (cldWin) {
            cldWin.show();
        } else {
            createSubWindow();
        }
    });

    globalShortcut.register('Esc', closeSubWindow);

    ipcMain.on('close-add-dlg', closeSubWindow);

    ipcMain.on('save-fav-link', (ev, data) => {
        // console.log(data);
        data = data || {};
        let record = {
            id: uuid(),
            ...data
        };
        sourceData.records.unshift(record);
        fs.writeFileSync(dataPath, JSON.stringify(sourceData), 'utf-8');
        win.webContents.send('fav-list', sourceData);
        closeSubWindow();
    });
};
