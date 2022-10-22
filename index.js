const { app, BrowserWindow } = require('electron')
const electron = require('electron')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

