import * as React from 'react';
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Linking,
  Button
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';

import { useAuth } from "../utils/auth-context";

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import Animated, {
  color,
  round,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";

import { getGift } from "../api/verify";

Feather.loadFont();
MaterialCommunityIcons.loadFont();

import { Root, Popup } from 'popup-ui'

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;


const { width, height } = Dimensions.get('window');

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Discover({ navigation }) {
  const auth = useAuth();

  const [giftConfetti, setGiftConfetti] = useState(null)

  const [categoriesData, setCategoriesData] = useState(null)

  useEffect(()=>{
    function getCategoryData() {
      fetch("https://categorydata.lidar.workers.dev")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCategoriesData(data)
      })
    }
    getCategoryData()
  },[])


  requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL]).then((statuses) => {
    console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
    console.log('Bluetooth Peripheral', statuses[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL]);
  });

  const MenubottomSheetRef = useRef(null);
  const SettingsbottomSheetRef = useRef(null);

  // variables
  
  const MenusnapPoints = useMemo(() => ["30%", "60%"], []);
  const SettingssnapPoints = useMemo(() => ["90%" ], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderCategoryItem = ({ item }) => {
    return (
      <View
      >
      <View
        style={styles.categoryItemWrapper}
      >
        <TouchableOpacity
          onPress={() =>
            gift().then(function(data){
              setGiftConfetti(data)
            })
            // navigation.navigate('Details', {item: item})
          }
        >
        <Image source={{uri: item.image}} style={styles.categoryItemImage} />
        </TouchableOpacity>
      </View>
      <Text style={{color: colors.white, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 13}}>{item.title}</Text>
      </View>
    );
  };

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text style={{
          color: colors.white
        }}>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>

        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              onPress={() => {
                SettingsbottomSheetRef.current.expand()
              }}
            >
            <Feather name="menu" size={30} color={colors.primary} />                  
            </TouchableOpacity>

            <View style={styles.rightWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Scan', {arg: 'laundry'})
                }}
              >
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* Categories
        <View style={styles.categoriesWrapper}>
          <View style={styles.categoriesListWrapper}>
            <FlatList
              data={categoriesData}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
        </View>
        */}

        {/* Popular 
        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>Recent Transactions</Text>
          {popularData.map((item) => (
            <TouchableOpacity
              key={item.id}
            >
              <View
                key={item.id}
                style={[
                  styles.popularCardWrapper,
                  {
                    marginTop: item.id == 1 ? 10 : 20,
                  },
                ]}>
                <View>
                  <View>
                    <View style={styles.popularTopWrapper}>
                      <Text style={styles.popularTopText}>some random charge</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.popularCardRight}>
                  <Text>{item.image}}</Text>
                  <Image source={{uri: item.image}} style={styles.popularCardImage} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        */}

      {/* </ScrollView> */}

      {/* Menu */}
      <BottomSheet
        ref={MenubottomSheetRef}
        snapPoints={MenusnapPoints}
        index={0}
        backgroundStyle={styles.backgroundContainer}
        handleIndicatorStyle={styles.handleStyleContainer}
      >
        <View style={{marginLeft: 20}}>
        <Text style={[styles.titlesTitle, {
          fontSize: 20,
          color: colors.white,
        }]}>BeetleApp
        </Text>
        </View>

        <View style={[styles.titlesWrapper,{
            marginTop: 0
        }]}>
        <Text style={[styles.titlesTitle, {
          fontSize: 15,
          fontWeight: '500',
          color: colors.white,
        }]}>Click on the top right icon to get started
        </Text>
        </View>

        <Button 
          title="update database"
          onPress={()=>navigation.navigate('CreateAccount')}
        >
        </Button>

        {/*
        <View style={[styles.titlesWrapper,{
          marginBottom: 5
        }]}>
        <Text style={[styles.titlesTitle, {
          fontSize: 20
        }]}>Menu</Text>
        </View>
        */}

        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {categoriesData !== null ?
            <FlatList
              data={categoriesData}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            :
            <></>
          }
        </BottomSheetScrollView>

      </BottomSheet>

      {/* Settings */}
      <BottomSheet
        ref={SettingsbottomSheetRef}
        snapPoints={SettingssnapPoints}
        // add bottom inset to elevate the sheet
        bottomInset={0}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={styles.backgroundContainer}
      >
        <View>
          <TouchableOpacity
            onPress={()=>SettingsbottomSheetRef.current.close()}
          >
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.primary}
              style={{
                padding: 20
              }}
            />
          </TouchableOpacity>

          {/* send feedback button */}

          <TouchableOpacity
            style={{
              backgroundColor: colors.black,
              marginHorizontal: 5,
              padding: 15,
              borderRadius: 10,
            }}
            onPress={()=>Linking.openURL('app-settings:')}
          >
            <View
              style={styles.buttonContainer}
            >
              <Text style={{
                color: colors.white,
                fontSize: 15,
                margin: 5,
              }}>Bluetooth and Camera Settings</Text>
              <MaterialCommunityIcons
                name="cog"
                size={26}
                color={colors.primary}
                style={{
                  marginRight: 10
                }}
              />
            </View>
          </TouchableOpacity>


          {/* logout button */}

          <TouchableOpacity
            style={{
              backgroundColor: colors.black,
              marginHorizontal: 5,
              marginTop: 5,
              padding: 15,
              borderRadius: 10,
            }}
            onPress={()=> auth.signOut()}
          >
            <View
              style={styles.buttonContainer}
            >
              <Text style={{
                color: colors.white,
                fontSize: 15,
                margin: 5,
              }}>Logout</Text>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.primary}
                style={{
                  margin: 5,
                }}
              />
            </View>
          </TouchableOpacity>

        </View>
      </BottomSheet>

      {/* Warning */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontSize: 16,
    color: colors.textDark,
  },
  titlesTitle: {
    fontSize: 28,
    color: colors.textDark,
    marginTop: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  categoryItemWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  categoryItemTitle: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 18,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: 20,
    height: 20,
    borderRadius: 26,
    marginBottom: 5,
  },
  categorySelectIcon: {
    alignSelf: 'center',
    margin: 20
  },
  popularWrapper: {
    paddingHorizontal: 10,
  },
  popularTitle: {
    color: colors.white,
    fontSize: 16,
  },
  popularCardWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.dark,
    borderRadius: 25,
    paddingTop: 10,
    paddingLeft: 30,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  popularTopWrapper: {
    colors: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.white
  },
  popularTitlesWrapper: {
    color: colors.dark,
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontSize: 14,
    color: colors.dark,
  },
  popularTitlesWeight: {
    fontSize: 12,
    color: colors.dark,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontSize: 12,
    color: colors.dark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 40,
  },
  popularCardImage: {
    margin: 10,
    padding: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  sheetContainer: {
    // add horizontal space
    flex: 1,
    backgroundColor: colors.black,
  },
  contentContainer: {
    backgroundColor: colors.secondary,
    color: colors.white
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backgroundContainer: {
    backgroundColor: colors.secondary,
  },
  handleStyleContainer: {
    backgroundColor: colors.primary
  }
});