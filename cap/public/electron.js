
const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const isDev = require("electron-is-dev");
const path = require('path');
const db = require('../src/models/index');
const authentication = require('../src/authentication');



const associate = require('../src/models/associations/sequelizeAssociations');

const routes = require(path.join(app.getAppPath(), './src/routes'));


// db.sequelize
//   .sync( )
//   .then((result) => {
//     console.log(db.sequelize.models);


//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const testConnetion = async ()=>{
//    try {
//     //await db.sequelize.authenticate();
//     await db.sequelize.sync({ force: true });
//     //console.log("All models were synchronized successfully.");
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
let win = null;
const createWindow = () => {
  win = new BrowserWindow({
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

  // testConnetion();

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


ipcMain.handle('alert', async (event, args) => {
  new Notification({
    icon:  path.join(app.getAppPath(), args.status ? './public/success.png' : './public/error.png'),
    title: args.title,
    body: args.text,
  }).show()

})

ipcMain.handle('action', async (event, args) => {

  if (!args.controller)
    return { status: false, text: "Controller not indetified" };
  if (!args.action)
    return { status: false, text: "Action not indetified" };

  if (!await authentication.is_authenticated && args.controller != 'Login' && args.controller != 'Authenticate') {
    win.webContents.send('redirect-login');
    return { status: false, text: "Unauthorized", unauthorized: true };
  }


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



