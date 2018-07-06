const { ipcMain, BrowserWindow } = require('electron');
const uuid = require('uuid/v4');
const url = require('url');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/data.json');
let sourceData = require(dataPath);

module.exports = (win) => {

    let cldWin;

    ipcMain.on('show-add-dlg', (event) => {
        cldWin = new BrowserWindow({
            width: 400,
            height: 200,
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
    });

    ipcMain.on('close-add-dlg', () => {
        if (cldWin) {
            cldWin.close();
        }
    });

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
        cldWin.close();
    });
};
