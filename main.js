const { app, BrowserWindow } = require("electron")

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    frame: true,
    transparent: true,
  })
  win.loadFile("index.html")
}

app.whenReady().then(() => {
  createWindow()
})
