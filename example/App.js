/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict local
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

import AdbrixRm from 'react-native-adbrix-remaster';

const win = Dimensions.get('window');
const header_img_ratio = win.width / 1200;

// Other user properties
var userProperties = new AdbrixRm.UserProperties();
userProperties.setProperty('user_nick', 'peterPark');
userProperties.setProperty('place', 'Seoul');
userProperties.setProperty('height', 180);
userProperties.setProperty('married', false);

var eventAttr = new AdbrixRm.AttrModel();
eventAttr.setAttrs('address', 'New York');
eventAttr.setAttrs('age', 27);
eventAttr.setAttrs('firsttime', true);

// product and category setup (can be set maximum 5 categories)
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

var pushModel = new AdbrixRm.AbxPushModel();
pushModel.setCampaignId("string:12345");
pushModel.setCycleTime("string:2019092008");
pushModel.setDeepLinkUrl("deepLinkUrl");
pushModel.setCampaignRevisionNo("2");
pushModel.setStepId("string:stepId");

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function setListeners() {
    AdbrixRm.setDeferredDeeplinkListener((result) => {
      console.log("App.js setDeferredDeepLinkListener callback is called result : "+result);
    });

    AdbrixRm.setDeeplinkListener((deeplink) => {
      console.log("App.js setDeeplinkListener callback is called. deeplink : "+deeplink);
    });

    AdbrixRm.setRemotePushMessageListener((result) => {
      console.log("App.js setRemotePushMessageListener callback is called : "+result);
    });

    AdbrixRm.setDfnInAppMessageAutoFetchListener((result) => {
      console.log("App.js setDfnInAppMessageAutoFetchListener callback is called result : "+result);
    });

    AdbrixRm.setInAppMessageClickListener((result) => {
      console.log("App.js setInAppMessageClickListener callback is called result : "+result);
    });
    
    AdbrixRm.setDfnInAppMessageAutoFetchListener((result) => {
      console.log("App.js setDfnInAppMessageAutoFetchListener called result : "+ result);
    });

    AdbrixRm.setLogListener((result) => {
      console.log("App.js setLogListener called result : "+result); 
    });
  }

  useEffect(setListeners, []);

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
            The main purpose of this example project is to get started with
            adbrix RN native plugin and to illustrates how to use adbrix React
            Native SDK in your app.
          </Section>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.event("eventName", null);
            }}>
            <Text style={styles.button_text}>Test Instance Button</Text>
          </TouchableOpacity>
          
          <Separator/>
          <Section title="Common">
          </Section>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commonPurchase(
                'OrderID_12341',
                productList,
                0.0,
                3500.0,
                AdbrixRm.PAYMENT_METHOD_BANK_TRASNFER,
                eventAttr,
              );
            }}>
            <Text style={styles.button_text}>PURCHASE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commonSignUp(AdbrixRm.SIGNUP_CHANNEL_APPLEID);
              AdbrixRm.commonSignUp(AdbrixRm.SIGNUP_CHANNEL_APPLEID, eventAttr);
            }}>
            <Text style={styles.button_text}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commonAppUpdate("1.0.0", "1.0.1");
              AdbrixRm.commonAppUpdate("1.0.0", "1.0.1", eventAttr);
            }}>
            <Text style={styles.button_text}>APP UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commonInvite(AdbrixRm.INVITE_CHANNEL_WHATSAPP);
              AdbrixRm.commonInvite(AdbrixRm.INVITE_CHANNEL_WHATSAPP, eventAttr)
            }}>
            <Text style={styles.button_text}>INVITE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commonUseCredit();
              AdbrixRm.commonUseCredit(eventAttr);
            }}>
            <Text style={styles.button_text}>USE CREDIT</Text>
          </TouchableOpacity>
          
          <Separator/>
          <Section title="Commerce"/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commerceViewHome();
              AdbrixRm.commerceViewHome(eventAttr);
            }}>
            <Text style={styles.button_text}>view home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commerceCategoryView(category2, productList);
              AdbrixRm.commerceCategoryView(category2, productList, eventAttr);
            }}>
            <Text style={styles.button_text}>category view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commerceProductView(product1, eventAttr);
              // AdbrixRm.commerceProductView(product1);
            }}>
            <Text style={styles.button_text}>product view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commerceRefund("orderId", "prductString", 10.0, "extraString");
              // AdbrixRm.commerceRefund("orderId", "prductString", 10.0);
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.commerceShare(AdbrixRm.SHARING_CHANNEL_FACEBOOK, product1, eventAttr);
              // AdbrixRm.commerceShare(AdbrixRm.SHARING_CHANNEL_FACEBOOK, product1);
            }}>
            <Text style={styles.button_text}>share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commerceListView(productList);
              AdbrixRm.commerceListView(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>list view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commerceCartView(productList);
              AdbrixRm.commerceCartView(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>cart view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commerceAddToCart(productList);
              AdbrixRm.commerceAddToCart(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {             
              // AdbrixRm.commerceAddToWishList(productList);
              AdbrixRm.commerceAddToWishList(productList, eventAttr);
            }}>
            <Text style={styles.button_text}>add to wish cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {             
              const discount = 0.0;
              const deliveryCharge = 0.0;
              // AdbrixRm.commerceReviewOrder("orderId", productList, discount, deliveryCharge);
              AdbrixRm.commerceReviewOrder("orderId", productList, discount, deliveryCharge, eventAttr);
            }}>
            <Text style={styles.button_text}>review order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.commercePaymentInfoAdded();
              AdbrixRm.commercePaymentInfoAdded(eventAttr);
            }}>
            <Text style={styles.button_text}>payment info added</Text>
          </TouchableOpacity>
          <Separator/>
          <Section title="Game"/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.gameTutorialCompleted(true);
              AdbrixRm.gameTutorialCompleted(true, eventAttr);
            }}>
            <Text style={styles.button_text}>tutorial complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.gameCharacterCreated();
              AdbrixRm.gameCharacterCreated(eventAttr);
            }}>
            <Text style={styles.button_text}>character created</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.gameStageCleared("stageName");
              AdbrixRm.gameStageCleared("stageName", eventAttr);
            }}>
            <Text style={styles.button_text}>stage cleared</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.gameLevelAchieved(15);
              AdbrixRm.gameLevelAchieved(15, eventAttr);
            }}>
            <Text style={styles.button_text}>level achieved</Text>
          </TouchableOpacity>
          <Separator />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.login('adbrix_demo_userid');
            }}>
            <Text style={styles.button_text}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.logout();
            }}>
            <Text style={styles.button_text}>logout</Text>
          </TouchableOpacity>
          <Separator/>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setAge(30);
            }}>
            <Text style={styles.button_text}>set age</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setGender(AdbrixRm.GENDER_MALE);
            }}>
            <Text style={styles.button_text}>set Gender</Text>
          </TouchableOpacity>
          <Section title="CI"/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setKakaoId("kakao id");
            }}>
            <Text style={styles.button_text}>set kakao id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.saveUserProperties(userProperties);
            }}>
            <Text style={styles.button_text}>save user property</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const userCiProperties = new AdbrixRm.UserProperties();
              userCiProperties.setProperty("secret_id", "secret");
              userCiProperties.setProperty("user_phone", "010-0000-0000");
              userCiProperties.setProperty("is_married", false);

              AdbrixRm.saveUserCiProperties(userCiProperties);
            }}>
            <Text style={styles.button_text}>save user ci properties</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const arrOfAction = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];
              AdbrixRm.fetchActionHistoryByUserId(null, arrOfAction, (result) => {
                console.log("fetchActionHistoryByUserId Callback : " + result);
              });
            }}>
            <Text style={styles.button_text}>fetch history user id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const arrOfAction = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];
              AdbrixRm.fetchActionHistoryByAdid(null, arrOfAction, (result) => {
                console.log("fetchActionHistoryByAdid Callback : " + result);
              });
            }}>
            <Text style={styles.button_text}>fetch history ad id</Text>
          </TouchableOpacity>
          <Separator/>
          
          <Section title="Action"/>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              const actionType = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];;
              AdbrixRm.getActionHistory(1,1,actionType, (array) => {
                console.log("getActionHistory callback called : "+array);
              });
            }}>
            <Text style={styles.button_text}>get action history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              const actionType = ["PUSH_ANDROID","PUSH_IOS","TEXT_MESSAGE","KAKAOTALK"];;
              AdbrixRm.getAllActionHistory(actionType, (array) => {
                console.log("getAllActionHistory callback called : "+array);
              });
            }}>
            <Text style={styles.button_text}>get all action history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.deleteActionHistory(null, "historyid", '15000000', (result) => {
                console.log("deleteActionHistory callback called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>delete action history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.deleteAllActionHistoryByUserId(null, (result) => {
                console.log("deleteAllActionHistoryByUserId callback called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>delete All Action History By User Id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.deleteAllActionHistoryByAdid(null, (result) => {
                console.log("deleteAllActionHistoryByAdid callback called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>delete All Action History By Adid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.clearSyncedActionHistoryInLocalDB((result) => {
                console.log("clearSyncedActionHistoryInLocalDB callback called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>clear Synced Action History In Local DB</Text>
          </TouchableOpacity>
          <Separator/>
          <Section title="In App Message"/>
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
            <Text style={styles.button_text}>open In App Message</Text>
          </TouchableOpacity>
          <Section title="Event"/>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.flushAllEvents((result) => {
                console.log("flushAllEvents callback is called result : "+result);
              });
            }}>
            <Text style={styles.button_text}>flush All Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // AdbrixRm.event('custom event with null attr')
              AdbrixRm.event('custom event with event attr', eventAttr);
            }}>
            <Text style={styles.button_text}>CUSTOM EVENT</Text>
          </TouchableOpacity>
          <Separator/>
          <Section title="ETC">
          </Section>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.openPush(pushModel);
            }}>
            <Text style={styles.button_text}>Open Push</Text>
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
              AdbrixRm.getUserId((result) => {
                console.log("getUserId result : "+result);
              });
            }}>
            <Text style={styles.button_text}>get user id</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.insertPushData(JSON.stringify(eventAttr));
            }}>
            <Text style={styles.button_text}>insert Push Data</Text>
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
            <Text style={styles.button_text}>delete User Data And Stop SDK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#17CC97' }]}
            onPress={() => {
              AdbrixRm.restartSDK(
                "adbrix_demo_userid", 
                (result) => { console.log("restart onSuccess Callback called. result : "+result)},
                (result) => { console.log("restart onFail Callback called. result : "+result)}
              );
            }}>
            <Text style={styles.button_text}>restart</Text>
          </TouchableOpacity>
          <Separator />

          <Section title="Android Only"/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setPushIconStyle("test1", "test2", 0x1000FF00);
            }}>
            <Text style={styles.button_text}>AOS : set push icon style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AdbrixRm.setPushIconStyle("small icon name", "large icon name", 0xFF00FF00);
            }}>
            <Text style={styles.button_text}>AOS : set push icon style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let priority = 1;
              let visibility =  1;
              AdbrixRm.setNotificationOption(priority, visibility);
            }}>
            <Text style={styles.button_text}>AOS : set notification option</Text>
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
            <Text style={styles.button_text}>AOS : set notification channel</Text>
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
                'https://help.dfinery.io/hc/en us/articles/360033981253 Adbrix Integration React Native ',
              );
            }}>
            <Text style={styles.button_text}>Help center</Text>
          </TouchableOpacity>
          <Section title="Ecommerce Demo (Advanced)">
            For more advanced adbrix dfinery demo, you can see how adbrix API
            can be used in ecommerce app. Please check the link belows.
          </Section>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#797EF6' }]}
            onPress={() => {
              Linking.openURL(
                'https://github.com/yen igaw/reactnative_dfinery_ecommerce_demo',
              );
            }}>
            <Text style={styles.button_text}>Ecommerce App Demo</Text>
          </TouchableOpacity>
          <Separator />
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
