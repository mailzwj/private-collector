const electron = require('electron');
const { ipcRenderer } = electron;

const cancelBtn = document.querySelector('#J_AddCancel');
const okBtn = document.querySelector('#J_AddOk');
const favTitle = document.querySelector('#J_FavTitle');
const fav = document.querySelector('#J_FavLink');

cancelBtn.addEventListener('click', () => {
    ipcRenderer.send('close-add-dlg');
}, false);

okBtn.addEventListener('click', () => {
    ipcRenderer.send('save-fav-link', {
        title: favTitle.value,
        url: fav.value
    });
}, false);
