const { ipcRenderer, contextBridge } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    // window.location = '/Login';
    ipcRenderer.on('redirect-login', (_event, value) => {
        window.location = '/Login';
    })
})
contextBridge.exposeInMainWorld('api', {

    Action: (args) =>  ipcRenderer.invoke('action', args), 
    App: () =>  ipcRenderer.invoke('app'),  
    Alert: (args) =>  ipcRenderer.invoke('alert', args), 
    

});

