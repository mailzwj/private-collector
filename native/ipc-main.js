const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/data.json');
const sourceData = require(dataPath);

module.exports = (win) => {
    // console.log('Source data: ', data);
    // win.openDevTools();
    win.webContents.send('fav-list', sourceData);

    ipcMain.on('show-detail-dlg', (ev, data) => {
        console.log(data);
    });

    ipcMain.on('remove-fav', (ev, data) => {
        data = data || {};
        for (let d = 0; sourceData.records[d]; d++) {
            if (sourceData.records[d].id === data.id) {
                sourceData.records.splice(d, 1);
            }
        }
        fs.writeFileSync(dataPath, JSON.stringify(sourceData), 'utf-8');
        win.webContents.send('fav-list', sourceData);
    });
};
