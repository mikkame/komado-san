module.exports = {
    pages: {
        index: 'src/main.js',
        welcome: 'src/welcome.js'
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                mac : {
                    extendInfo: {
                        "NSCameraUsageDescription": "Please give us access to your camera"
                    },
                    "entitlements": "mac_config/entitlements.mac.plist",
                    "entitlementsInherit": "mac_config/entitlements.mac.plist",
                }
            },
        }
    },
}
