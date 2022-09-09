const { app, BrowserWindow, ipcMain } = require('electron');
const DEV_MODE = require('electron-is-dev');
const PATH_CONTROLLERS = './controllers';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }

    });

    DEV_MODE ?
        win.loadURL("http://localhost:3000") :
        win.loadFile("src/views/build/index.html");


};

app.whenReady().then(() => {
    createWindow();
    ipcMain.on('set-title', handleSetTitle)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


function handleSetTitle (event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  }

const Action = (controller, action, params) => {
    const fn = window[`${PATH_CONTROLLERS}/${controller}/${action}`];
    if (typeof fn === "function")
        return fn.apply(null, params);
    else
        return { status: false, text: "Action not found." };


}