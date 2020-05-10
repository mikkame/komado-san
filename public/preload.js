const { desktopCapturer, contextBridge} = require("electron");
contextBridge.exposeInMainWorld(
    "desctipCapture", desktopCapturer
);
