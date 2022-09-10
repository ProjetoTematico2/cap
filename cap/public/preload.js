const { ipcRenderer, contextBridge } = require('electron');


contextBridge.exposeInMainWorld('api', {

    Action: (args) =>  ipcRenderer.invoke('action', args) 


});