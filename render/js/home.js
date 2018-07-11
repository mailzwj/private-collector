const electron = require('electron');
const { ipcRenderer } = electron;

const comm = require('../render/js/common');

const pw = document.querySelector('#J_PageWrap');

const page = {
    state: {
        list: null
    },
    setState: function(state) {
        state = state || {};
        for (let key in state) {
            this.state[key] = state[key];
        }
        this.render();
    },
    render: function() {
        const list = this.state.list || [];
        const listDom = list.map((l, i) => {
            return `
                <div class="J_FavItem fav-item" data-id="${l.id}">
                    <div class="J_FavItemDetail fav-item-detail">
                        <p class="fav-item-title">${l.title}</p>
                        <p class="fav-item-link">${l.url}</p>
                    </div>
                    <span class="J_RemoveItem fav-item-remove" title="移除收藏"></span>
                </div>
            `;
        });
        if (listDom.length) {
            pw.classList.remove('empty');
        } else {
            pw.classList.add('empty');
        }
        listDom.push('<div class="J_AddFav add-fav"><span class="symbol-add"></span><p class="label">添加收藏</p></div>');
        pw.innerHTML = listDom.join('');
    }
};

ipcRenderer.on('fav-list', (ev, data) => {
    console.log(data);
    page.setState({
        list: data.records || []
    });
});

comm.delegate('click', pw, '.J_AddFav', (ev) => {
    ipcRenderer.send('show-add-dlg');
});

comm.delegate('click', pw, '.J_FavItemDetail', (ev) => {
    const target = ev.target;
    const dataNode = target.parentNode;
    ipcRenderer.send('show-detail-dlg', {
        id: dataNode.dataset.id
    });
});

comm.delegate('click', pw, '.J_RemoveItem', (ev) => {
    const target = ev.target;
    const dataNode = target.parentNode;
    if (window.confirm('确认删除该收藏吗？')) {
        ipcRenderer.send('remove-fav', {
            id: dataNode.dataset.id
        });
    }
});
