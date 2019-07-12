
# react-native-adbrix-rm-react

## Getting started

`$ npm install react-native-adbrix-rm-react --save`

### Mostly automatic installation

`$ react-native link react-native-adbrix-rm-react`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-adbrix-rm-react` and add `RNAdbrixRmReact.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAdbrixRmReact.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import org.domain.RNAdbrixRmReactPackage;` to the imports at the top of the file
  - Add `new RNAdbrixRmReactPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-adbrix-rm-react'
  	project(':react-native-adbrix-rm-react').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-adbrix-rm-react/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-adbrix-rm-react')
  	```


## Usage
```javascript
import RNAdbrixRmReact from 'react-native-adbrix-rm-react';

// TODO: What to do with the module?
RNAdbrixRmReact;
```
  