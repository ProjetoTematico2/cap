const { app, BrowserWindow } = require('electron')
const isDEV = require("electron-is-dev");
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1300,
      height: 800
    })
    
    isDEV ?
      win.loadURL('http://localhost:3000')
      :
      win.loadFile('build/index.html');
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