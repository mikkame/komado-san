const path = require('path')
const { notarize } = require('electron-notarize')

// .appのパスを設定
const appPath = path.resolve(__dirname, './dist_electron/mac/komado-san.app')

notarize({
    appBundleId:'me.mikka.komado-san',
    appPath,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_PASSWORD,
})
