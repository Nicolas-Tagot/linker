const { app, BrowserWindow, shell, ipcMain, clipboard } = require("electron")
const path = require("path")

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    frame: true,
    autoHideMenuBar: true,
    titleBarStyle: "default",
    movable: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  ipcMain.on("open-external", (event, url) => {
    shell.openExternal(url).catch((err) => {
      console.error("Failed to open URL:", err)
    })
  })

  ipcMain.handle("read-clipboard", () => {
    return clipboard.readText()
  })

  win.loadFile("index.html")
})
