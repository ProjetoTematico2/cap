const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require("electron-is-dev");
const path = require('path');
const routes = require('../src/routes');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    contextIsolation: true,
    webPreferences: {
      preload: isDev 
        ? path.join(app.getAppPath(), './public/preload.js') 
        : path.join(app.getAppPath(), './build/preload.js'),
      worldSafeExecuteJavaScript: true, 
      contextIsolation: true, 
    },
  })
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );


  if (isDev) {
    win.webContents.on('did-frame-finish-load', () => {
      win.webContents.openDevTools({ mode: 'detach' });
    });
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



ipcMain.handle('action', async (event, args) => {
  if (!args.controller)
    return { status: false, text: "Controller not indetified" };
  if (!args.action)
    return { status: false, text: "Action not indetified" };

  const routesResult = await routes.Action(args.controller, args.action, args.params);
  return routesResult;

})








// ipcMain.handle('test-invoke', (event, args) => {

//   return 'invoquei teu cu ' + args.nome;
// })


// ipcMain.on('test-send', (event, args) => {
//   console.log('enviei teu cu ' + args.nome);
//   event.sender.send('test-receive','recebi teu cu ' + args.nome);

// })

// ipcMain.on('test-receive', (event, args) => {
//   return 'recebi teu cu ' + args.nome;
// })



