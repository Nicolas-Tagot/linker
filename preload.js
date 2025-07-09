const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
  openExternal: (url) => ipcRenderer.send("open-external", url),
  readClipboard: () => ipcRenderer.invoke("read-clipboard"),
})
