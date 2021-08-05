// react-native.config.js
const path = require('path');

module.exports = {
  dependency: {
    platforms: {
      ios: { podspecPath: path.join(__dirname, 'react-native-adbrix-remaster.podspec') },
      android: {
        packageImportPath: 'import io.adbrix.AdbrixPackage;',
        packageInstance: 'new AdbrixPackage()',
      },
    },
  },
};