/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Separator from './components/Seperator';
import Section from './components/Section';

import AdbrixRm from 'react-native-adbrix-remaster';

const win = Dimensions.get('window');
const header_img_ratio = win.width/1200;

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const handleDeepLink = (e) => {
   
    Alert.alert(
      "DeepLink Info",
      `Opened by URL:  ${e.url}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  };

  // https://reactnative.dev/docs/linking#handling-deep-links
  useEffect(() => {
    // Anything in here is fired on component mount.
    
    // adbrix RN plugin Version 1: If use V1, need to comment native function initAdBrixWithAppKey:secretKey in AppDelegate.m
    // AdbrixRm.startAdbrixSDK('dW6eSX9fbk2r0Rr4KJIQ0A', 'tkBFgB2bOUK0L0Jo9FKqyw');
    // AdbrixRm.setDeeplinkListener(function (deeplink) {
    //   console.log('deeplink msg arrived!');
    //   console.log(deeplink); // you will receive deeplink info on "deeplink"
    // });

    // adbrix RN plugin Version 2:
    AdbrixRm.initRNPlugin();
    AdbrixRm.setDeferredDeeplinkListener(function (deferredDeeplink) {
      console.log('deferredDeeplink msg arrived!');
      console.log(deeplink); // you will receive DeferredDeeplink info on "deeplink"
      Alert.alert(
        "DeferredDeeplink Info",
        `URL:  ${deferredDeeplink}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });

    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });
    return () => {
      // Anything in here is fired on component unmount.
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Image
          style={styles.headerImage}
          source={require('./asset/adbrix_header_img.jpeg')}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="adbrix Dfinery">
            adbrix Dfinery is a CDP platform with mobile app attribution,
            analytics and enngament automation, customer explorer features.
          </Section>
          <Separator />
          <Section title="React Native SDK Example">
            The main purpose of this example project is to get-started with
            adbrix RN native plugin and to illustrates how to use adbrix React
            Native SDK in your app.
          </Section>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.login('adbrix_demo_userid');
            }}>
            <Text style={styles.button_text}>Log-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Age
              AdbrixRm.setAge(30);

              // Gender
              AdbrixRm.setGender(AdbrixRm.GENDER_MALE);

              // Other user properties
              var userProperties = new AdbrixRm.UserProperties();
              userProperties.setProperty('user_nick', 'peterPark');
              userProperties.setProperty('place', 'Seoul');
              userProperties.setProperty('height', 180);
              userProperties.setProperty('married', false);

              AdbrixRm.setUserProperties(userProperties);
            }}>
            <Text style={styles.button_text}>Set User Properties</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Addtional event parameter
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              // Click a button "Invite a friend"
              AdbrixRm.event('invite_button_click', eventAttr);
            }}>
            <Text style={styles.button_text}>Custom event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Addtional event parameter
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              AdbrixRm.commonSignUp(AdbrixRm.SIGNUP_CHANNEL_KAKAO, eventAttr);
            }}>
            <Text style={styles.button_text}>Sign-up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // product and category setup (can be set maximum 5 categories)
              var category1 = new AdbrixRm.CategoryModel();
              category1.setCategory('cloth');
              category1.setCategory('panth');
              category1.setCategory('short');
              category1.setCategory('summer');
              category1.setCategory('Nike');

              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);
              product1.setCategory(category1);

              var category2 = new AdbrixRm.CategoryModel();
              category2.setCategory('electronic');
              category2.setCategory('small');
              category2.setCategory('samsung');
              category2.setCategory('phone');
              category2.setCategory('galaxybrand');

              var product2 = new AdbrixRm.ProductModel();
              product2.setProductId('12324');
              product2.setProductName('Galaxy S10');
              product2.setPrice(50000);
              product2.setDiscount(10000);
              product2.setCurreny(AdbrixRm.CURRENCY_KR_KRW);
              product2.setCategory(category2);

              // productlist setup
              var productList = new AdbrixRm.ProductModelList();
              productList.setProduct(product1);
              productList.setProduct(product2);

              // Addtional event parameter
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              //purchase API
              AdbrixRm.commonPurchase(
                'OrderID_12341',
                productList,
                0.0,
                3500.0,
                AdbrixRm.PAYMENT_METHOD_BANK_TRASNFER,
                eventAttr,
              );
            }}>
            <Text style={styles.button_text}>In-app purchase</Text>
          </TouchableOpacity>
          <Section title="Ecommerce Demo (Advanced)">
            For more advanced adbrix dfinery demo, you can see how adbrix API
            can be used in ecommerce app. Please check the link belows.
          </Section>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#797EF6'}]}
            onPress={() => {
              Linking.openURL(
                'https://github.com/yen-igaw/reactnative_dfinery_ecommerce_demo',
              );
            }}>
            <Text style={styles.button_text}>Ecommerce App Demo</Text>
          </TouchableOpacity>
          <Separator />
          <Section title="More information">
            You can visit our help center to learn how to user adbrix dfinery
            and integrate SDK into your app.
          </Section>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#17CC97'}]}
            onPress={() => {
              Linking.openURL(
                'https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-',
              );
            }}>
            <Text style={styles.button_text}>Help center</Text>
          </TouchableOpacity>

          <View style={{height: 30}}></View>

          <Image
            style={styles.headerImage}
            source={require('./asset/adbrix_fraudkillchain.jpg')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  headerImage: {
    width: win.width,
    height: 300 * header_img_ratio, //300 is actual height of image
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1D87E5",
    padding: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  button_text: {
    color: 'white',
    textTransform: 'uppercase'
  }
});

export default App;
