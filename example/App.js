/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, version } from 'react';
import type { Node } from 'react';
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

import AdbrixRm from 'react-native-adbrix-remaster'

const win = Dimensions.get('window');
const header_img_ratio = win.width / 1200;

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function setListeners() {
    AdbrixRm.setDeferredDeeplinkListener((result) => {
      console.log("setDeferredDeepLinkListener callback is called result : "+result);
    });
    AdbrixRm.setDeeplinkListener((deeplink) => {
      console.log("setDeeplinkListener callback is called. deeplink : "+deeplink);
    });
    AdbrixRm.setLocalPushMessageListener((result) => {
      console.log("setLocalPushListener callback is called result : "+result);
    });
    AdbrixRm.setRemotePushMessageListener((result) => {
      console.log("setRemotePushMessageListener callback is called : "+result);
    });
    AdbrixRm.setInAppMessageClickListener((result) => {
      console.log("setInAppMessageClickListener callback is called result : "+result);
    });

    AdbrixRm.setDfnInAppMessageAutoFetchListener((result) => {
      console.log("setDfnInAppMessageAutoFetchListener callback is called result : "+result);
    });
  }

  useEffect(() => {
    setListeners();
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
          {/* login, commonSignUp, commonAppUpdate */}
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
              const eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('userid', 'my_user_id');
              AdbrixRm.commonAppUpdate("1.0.0", "1.0.1", eventAttr);
            }}>
            <Text style={styles.button_text}>APP-UPDATE</Text>
          </TouchableOpacity>
          <Separator />

          {/* commonInvite, commonUseCredit, commonPurchase */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('userid', 'my_user_id');
              AdbrixRm.commonInvite(AdbrixRm.INVITE_CHANNEL_KAKAO, eventAttr)
            }}>
            <Text style={styles.button_text}>COMMON-INVITE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('userid', 'my_user_id');
              AdbrixRm.commonUseCredit(eventAttr);
            }}>
            <Text style={styles.button_text}>COMMON-USE-CREDIT</Text>
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
            <Text style={styles.button_text}>COMMON-PURCHASE</Text>
          </TouchableOpacity>
          <Separator/>
          
          {/* customEvent,  view-home, category-view*/}
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
            <Text style={styles.button_text}>CUSTOM-EVENT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('home', 'my home');
              AdbrixRm.commerceViewHome(eventAttr)
            }}>
            <Text style={styles.button_text}>commerce-view-home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var category1 = new AdbrixRm.CategoryModel();
              category1.setCategory('my category');
              category1.setCategory('big');
              category1.setCategory('apple');
              category1.setCategory('tv');
              category1.setCategory('apple tv');

              var category2 = new AdbrixRm.CategoryModel();
              category2.setCategory('electronic');
              category2.setCategory('small');
              category2.setCategory('samsung');
              category2.setCategory('phone');
              category2.setCategory('galaxybrand');

              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);
              product1.setCategory(category1);

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
              AdbrixRm.commerceCategoryView(category2, productList, eventAttr);
            }}>
            <Text style={styles.button_text}>category-view</Text>
          </TouchableOpacity>
          <Separator/>
          
          {/* productView, refund, search */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Addtional event parameter
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);

              AdbrixRm.commerceProductView(product1, eventAttr);
            }}>
            <Text style={styles.button_text}>product-view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commerceRefund("orderId", "prductString", 10.0, "extraString");
            }}>
            <Text style={styles.button_text}>refund</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commerceSearch("keyword", "productString", "extraString");
            }}>
            <Text style={styles.button_text}>search</Text>
          </TouchableOpacity>
          <Separator/>

          {/* share, listview, cartview */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              AdbrixRm.commerceShare(AdbrixRm.SHARING_CHANNEL_LINE, product1, eventAttr);
            }}>
            <Text style={styles.button_text}>share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              var category1 = new AdbrixRm.CategoryModel();
              category1.setCategory('cloth');
              category1.setCategory('panth');
              category1.setCategory('short');
              category1.setCategory('summer');
              category1.setCategory('Nike');

              var category2 = new AdbrixRm.CategoryModel();
              category2.setCategory('electronic');
              category2.setCategory('small');
              category2.setCategory('samsung');
              category2.setCategory('phone');
              category2.setCategory('galaxybrand');

              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);

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
              AdbrixRm.commerceListView(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>list-view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);

              var category1 = new AdbrixRm.CategoryModel();
              category1.setCategory('cloth');
              category1.setCategory('panth');
              category1.setCategory('short');
              category1.setCategory('summer');
              category1.setCategory('Nike');

              var category2 = new AdbrixRm.CategoryModel();
              category2.setCategory('electronic');
              category2.setCategory('small');
              category2.setCategory('samsung');
              category2.setCategory('phone');
              category2.setCategory('galaxybrand');
              
              var product1 = new AdbrixRm.ProductModel();
              product1.setProductId('3029102');
              product1.setProductName('Gray top');
              product1.setPrice(50000);
              product1.setDiscount(10000);
              product1.setCurreny(AdbrixRm.CURRENCY_KR_KRW);

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
              AdbrixRm.commerceCartView(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>cart-view</Text>
          </TouchableOpacity>
          <Separator/>


          {/* paymentInFoadded, reviewTutorialComplete, characterCreated */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);
              AdbrixRm.commercePaymentInfoAdded(eventAttr);
            }}>
            <Text style={styles.button_text}>payment-info-added</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);
              AdbrixRm.gameTutorialCompleted(true, eventAttr);
            }}>
            <Text style={styles.button_text}>review-tutorial-complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.gameCharacterCreated("extra string");
            }}>
            <Text style={styles.button_text}>character-created</Text>
          </TouchableOpacity>
          <Separator/>

          {/* stageCleared, levelAchieved, logout */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);
              AdbrixRm.gameStageCleared("stageName", eventAttr);
            }}>
            <Text style={styles.button_text}>stage-cleared</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.gameLevelAchieved(15, "extra string");
            }}>
            <Text style={styles.button_text}>level-achieved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.logout();
            }}>
            <Text style={styles.button_text}>logout</Text>
          </TouchableOpacity>
          <Separator/>

          {/* setPushIconStyle, localPush, bigPicturePush */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setPushIconStyle("test1", "test2", 0x1000FF00);
            }}>
            <Text style={styles.button_text}>set-push-icon-style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const pushProperties = new AdbrixRm.BigTextPushPropertiesModel();
              const html = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<body>\n" +
                "\n" +
                "<p>Big Text</p>\n" +
                "<p style=\"color:red;\">Big Text</p>\n" +
                "<p style=\"color:blue;\">Big Text</p>\n" +
                "<p style=\"font-size:50px;\">Big Text</p>\n" +
                "\n" +
                "</body>\n" +
                "</html>\n" +
                "\n";
              pushProperties.setTitle("텍스트 푸시");
              pushProperties.setContentText("contentText");
              pushProperties.setContentText("contentText")
              pushProperties.setBigText("bigContentTitle")
              pushProperties.setSummaryText("summaryText")
              pushProperties.setBigText(html)
              pushProperties.setDeepLinkUri("https://xMeRtnm5n0CiTfZcPMAxtg.adtouch-qa.adbrix.io/api/v1/click/PKajcmG9YEyIAFVheuYFZA")
              pushProperties.setSecond(10)
              pushProperties.setEventId(1546);
              AdbrixRm.setBigTextClientPushEvent(pushProperties, true);
            }}>
            <Text style={styles.button_text}>aos : set-big-text-client-push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const pushProperties = new AdbrixRm.BigPicturePushPropertiesModel();
              pushProperties.setTitle("Big Picture push Title");
              pushProperties.setContentText("contentText");
              pushProperties.setSummaryText("summaryText");
              pushProperties.setBigPictureUrl("https://velog.velcdn.com/images/dear_jjwim/post/e27d8adc-ab59-416a-904f-290724118407/image.jpeg");
              pushProperties.setDeepLinkUri("https://xMeRtnm5n0CiTfZcPMAxtg.adtouch-qa.adbrix.io/api/v1/click/PKajcmG9YEyIAFVheuYFZA");
              pushProperties.setSecond(10);
              pushProperties.setEventId(1546);
              pushProperties.setResourceId(0);
              AdbrixRm.setBigPictureClientPushEvent(pushProperties, true);
            }}>
            <Text style={styles.button_text}>aos : big-picture-push</Text>
          </TouchableOpacity>

          {
            /* 
              IOS : registerLocalPushNotification, 
              AOS : cancelClientPushEvent, 
              Both : cancelLocalPushNotification, 
              Both : cancelLocalPushNotifiactionAll,
              AOS : getPushEventList,
              Both : getRegisteredLocalPushNotification,
              AOS : setPushIconStyle,
              AOS : setNotificationOption,
              AOS : setNotificationChannel
            */
          }
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.registerLocalPushNotification(1546);
            }}>
            <Text style={styles.button_text}>ios : register-Local-Push-Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.cancelClientPushEvent(1546)
            }}>
            <Text style={styles.button_text}>AOS : cancel-Client-Push-Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let arrrayOfEventIds = [1, 2, 3, 4, 1546];
              AdbrixRm.cancelLocalPushNotification(arrrayOfEventIds);
            }}>
            <Text style={styles.button_text}>BOTH : cancel-local-push-notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.cancelLocalPushNotificationAll();
            }}>
            <Text style={styles.button_text}>both : cancel-local-push-notification-all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // 콜백으로 비동기로 처리해야 하지 않나?
              var pushEventList = AdbrixRm.getPushEventList();
              console.log("getPushEventList : "+pushEventList);
            }}>
            <Text style={styles.button_text}>AOS : get-push-event-list</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var registerdLocalPushNotification = AdbrixRm.getRegisteredLocalPushNotification();
              console.log("registerdLocalPushNotification : "+registerdLocalPushNotification);
            }}>
            <Text style={styles.button_text}>both : get-Registered-Local-Push-Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setPushIconStyle("small icon name", "large icon name", 0xFF00FF00);
            }}>
            <Text style={styles.button_text}>AOS : set-push-icon-style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let priority = 1;
              let visibility = -1;
              AdbrixRm.setNotificationOption(priority, visibility);
            }}>
            <Text style={styles.button_text}>AOS : set-notification-option</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let channelName = "test channel name";
              let channelDescription = "channel Description";
              let importance = 3;
              let vibrateEnable = true;

              AdbrixRm.setNotificationChannel(channelName, channelDescription, importance, vibrateEnable);
            }}>
            <Text style={styles.button_text}>AOS : set-notification-channel</Text>
          </TouchableOpacity>

          {/* user property */}
          <Separator/>
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
            <Text style={styles.button_text}>set-user-property</Text>
          </TouchableOpacity>
          <Separator/>

          {/* localServerPush, priorityPush, stackingPush */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setNotificationOption(this, 1, -1);
            }}>
            <Text style={styles.button_text}>priority-push</Text>
          </TouchableOpacity>
          <Separator/>

          {/* restart, fetchHistoryUserId */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.restartSDK(
                "adbrix_demo_userid", 
                () => { console.log("restart onSuccess Callback called")},
                (result) => { console.log("restart onFail Callback called. result : "+result)}
              );
            }}>
            <Text style={styles.button_text}>restart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const arrOfAction = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];
              AdbrixRm.fetchActionHistoryByUserId(null, arrOfAction, (array) => {
                Alert.alert(
                  "fetchActionHistoryByUserId",
                  `array : `+array,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
                console.log("fetchActionHistoryByUserId Callback : " + array);
              });
            }}>
            <Text style={styles.button_text}>fetch-history-user-id</Text>
          </TouchableOpacity>
          <Separator/>
          {/* fetchHistoryAdid, getHistory, getAllHistory */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const arrOfAction = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];
              AdbrixRm.fetchActionHistoryByAdid(null, arrOfAction, (array) => {
                console.log("fetchActionHistoryByUserId Callback : " + array);
              });
            }}>
            <Text style={styles.button_text}>fetch-history-ad-id</Text>
          </TouchableOpacity>
          <Separator/>
          {/* deleteHistory, deepLinkEvent */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.deleteActionHistory(null, "historyid", '15000000', () => {
                console.log("deleteActionHistory callback called");
              });
            }}>
            <Text style={styles.button_text}>delete-history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.deepLinkEvent();
            }}>
            <Text style={styles.button_text}>deep link event</Text>
          </TouchableOpacity>


          <Section title="Ecommerce Demo (Advanced)">
            For more advanced adbrix dfinery demo, you can see how adbrix API
            can be used in ecommerce app. Please check the link belows.
          </Section>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#797EF6' }]}
            onPress={() => {
              Linking.openURL(
                'https://github.com/yen-igaw/reactnative_dfinery_ecommerce_demo',
              );
            }}>
            <Text style={styles.button_text}>Ecommerce App Demo</Text>
          </TouchableOpacity>
          <Separator />

          {/* openPush, getSDKVersion, insertPushData */}
          <Section title="Added Method test Buttons">
            You can test the sdk by click buttons.
          </Section>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              var pushModel = new AdbrixRm.AbxPushModel();
              pushModel.setCampaignId("string:12345");
              pushModel.setCycleTime("string:2019092008");
              pushModel.setDeepLinkUrl("deepLinkUrl");
              pushModel.setCampaignRevisionNo("2");
              pushModel.setStepId("string:stepId");
              AdbrixRm.openPush(pushModel);
            }}>
            <Text style={styles.button_text}>Open-Push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={async () => {
              const sdkVersion = await AdbrixRm.getSDKVersion();
              Alert.alert(
                "SDK Version",
                `version :  ${sdkVersion}`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }}>
            <Text style={styles.button_text}>Get sdk version</Text>
          </TouchableOpacity>          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              var eventAttr = new AdbrixRm.AttrModel();
              eventAttr.setAttrs('address', 'New York');
              eventAttr.setAttrs('age', 27);
              eventAttr.setAttrs('firsttime', true);
              
              AdbrixRm.insertPushData(JSON.stringify(eventAttr));
            }}>
            <Text style={styles.button_text}>insert Push Data</Text>
          </TouchableOpacity>
          <Separator/>

          {/* getActionHistory, getAllActionHistory, deleteActionHistory */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              const actionType = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];;
              AdbrixRm.getActionHistory(1,1,actionType, (array) => {
                console.log("getActionHistory callback called : "+array);
              });
            }}>
            <Text style={styles.button_text}>get-action-history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              const actionType = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];;
              AdbrixRm.getAllActionHistory(actionType, (array) => {
                console.log("getAllActionHistory callback called : "+array);
              });
            }}>
            <Text style={styles.button_text}>get-all-action-history</Text>
          </TouchableOpacity>
          <Separator/>
        
          {/* deleteAllActionHistoryByUserId,  deleteAllActionHistoryByAdId, clearSyncedActionHistoryInLocalDB*/}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.deleteAllActionHistoryByUserId(null, () => {
                console.log("deleteAllActionHistoryByUserId callback called");
              });
            }}>
            <Text style={styles.button_text}>delete-All-Action-History-By-User-Id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.deleteAllActionHistoryByAdid(null, () => {
                console.log("deleteAllActionHistoryByAdid callback called");
              });
            }}>
            <Text style={styles.button_text}>delete-All-Action-History-By-Adid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.clearSyncedActionHistoryInLocalDB(() => {
                console.log("clearSyncedActionHistoryInLocalDB callback called")
              });
            }}>
            <Text style={styles.button_text}>clear-Synced-Action-History-In-Local-DB</Text>
          </TouchableOpacity>
          <Separator/>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.fetchInAppMessage((result) => {
                console.log("fetchInAppMessage callback is called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>fetch In App Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.getAllInAppMessage((result) => {
                console.log("getAllInAppMessage callback is called. result : "+result);
              })
            }}>
            <Text style={styles.button_text}>get All In App Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.openInAppMessage("L5W8MfibEEO4PyRNxtSZ5Q", (result) => {
                console.log("openInAppMessage callback is called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>open-In-App-Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.flushAllEvents((result) => {
                console.log("flushAllEvents callback is called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>flush-All-Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.deleteUserDataAndStopSDK(
                "1234",
                message => {
                  console.log(message);
                },
                message => {
                  console.log(message);
                }
              )
            }}>
            <Text style={styles.button_text}>delete-User-Data-And-Stop-SDK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.disableSDK(
                "disable Reason"
              );
            }}>
            <Text style={styles.button_text}>disable-SDK</Text>
          </TouchableOpacity>
          <Separator />
          <Section title="More information">
            You can visit our help center to learn how to user adbrix dfinery
            and integrate SDK into your app.
          </Section>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              Linking.openURL(
                'https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-',
              );
            }}>
            <Text style={styles.button_text}>Help center</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }}></View>

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
