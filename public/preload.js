const { desktopCapturer, contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "electronApi", {
        desktopCapturer,
    },
);

ipcRenderer.on('drop-file', (e, data) => {
    const event = new CustomEvent('drop-file', {detail:data})

    document.dispatchEvent(event)
})
