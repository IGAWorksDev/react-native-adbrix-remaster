
<p align="center">
    <img src="https://adbrix.vn/blog/abx-images/2021/07/banner3.jpg">
</p>

# React Native [adbrix Dfinery](https://console.dfinery.io/) plugin for Android and iOS.

We try our best to support you to integrate our RN Plugin into your project, if you have any issues please contact us via email se.team@igaworks.com

*When submitting an issue please tell us relevant information such as your appkey, development environment, code snippet, etc..*

### This plugin is built for

- [Android SDK](https://help.dfinery.io/hc/ko/articles/360006568493-SDK-Release-Note-Android) **v2.1.0.1** released on 2021.06.24
- [iOS SDK](https://help.dfinery.io/hc/ko/articles/360006568953-SDK-Release-Note-iOS) **v1.6.5801** released on 2021.06.30

> 
Pls check [release log](https://help.dfinery.io/hc/ko/articles/360006568953-SDK-Release-Note-iOS) to find suitable version for your development environment.
To change iOS xcframework version, after installing plugin from npm, go to node_modules/react-native-adbrix-remaster/react-native-adbrix-remaster.podspec, update native dependency:  **s.dependency 'AdBrixRemastered_XC', '1.0.0'**. Then use pod update command:
```
cd ios && pod update
```

## Installation

1. `$ npm install react-native-adbrix-remaster --save`
2. If React Native version <= 0.59
`$ react-native link react-native-adbrix-remaster`

Then run the following:

*iOS*
```
$ cd ios && pod install
$ react-native run-ios
```

*Android*
```
$ react-native run-android
```

> Starting from RN [v0.60](https://facebook.github.io/react-native/blog/2019/07/03/version-60), and react-native-adbrix-remaster `v1.4.6` the plugin uses [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md). <br/>
If your app does not support autolinking, follow steps below. You can also reference example app in this repository to learn more about manual link.

#### iOS

1. Add to pod file path to react-native-adbrix-remaster.podspec. Example: `pod 'react-native-adbrix-remaster', :path => '../..'`
2. You can find react-native-adbrix-remaster source files inside Development Pods > react-native-adbrix-remaster


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import io.adbrix.AdbrixPackage;` to the imports at the top of the file
  - Add `new AdbrixPackage()` to the list returned by the `getPackages()` method
  ```
  @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new AdbrixPackage());
          return packages;
        }
  ```
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-adbrix-remaster
  	project(':react-native-adbrix-remaster).projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-adbrix-remaster/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':react-native-adbrix-remaster)
  	```



## Usage
```javascript
import AdbrixRm from 'react-native-adbrix-remaster';

```
## 📖 Guides

Great installation and setup guides can be viewed [here](https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-).
- [Platform Setup Guide](https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-#toc2)
- [Deeplink and Deferred Deeplink Guide](https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-#toc5)
- [Custom Event API Guide](https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-#toc12)  

### Notice for iOS development environment
  - You can update adbrix podspec to match your development environment (Xcode, Swift version etc). 
  - (IOS) After selecting a suitable version, modify react-native-adbrix-remaster.podspec, change directory to your_project_root_dir/ios and run **pod update** command 
