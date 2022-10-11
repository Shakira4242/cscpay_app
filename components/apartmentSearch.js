import React, { useState, useEffect, useRef } from "react";
import {
 SafeAreaView,
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Image,
 TouchableWithoutFeedback,
 Keyboard,
 Dimensions,
 ImageBackground,
 Pressable,
 TextInput,
 ScrollView
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { livetestSignIn, testSignIn, sendSmsVerification } from "../api/verify";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const ApartmentSearch = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

  return (
  	<>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <View style={{
          margin: 10
        }}>
          <SafeAreaView>
            <View style={styles.headerWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.headerLeft}
                    name="chevron-left"
                    size={20}
                    color={colors.black}
                  />
                </TouchableOpacity>
            </View>
          </SafeAreaView>


        	{/* apartment search heading */}
          <View style={{
            marginTop: 50,
            margin: 10
          }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
              }}>What's your address</Text>
            </View>

          {/* intro subheading */}

            <View style={{
            margin: 10
          }}>
              <Text style={{
                fontSize: 15,
                fontWeight: '300',
              }}>We will use this address to check if we support your address.</Text>
            </View>

          {/* Address */}

          <ScrollView
            keyboardShouldPersistTaps='always' 
            listViewDisplayed={false} 
          >
            <GooglePlacesAutocomplete
              placeholder='Search'
              onPress={(data, details) => {
                // 'details' is provided when fetchDetails = true
                console.log(details)
                navigation.navigate('ApartmentPortalSearch', {address: data.description})
              }}
              textInputProps={{
                  height: 40,
                  width: 300,
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10
              }}
              query={{
                key: 'AIzaSyA-YTPxap9XjO-lJ_3z3VXUXlYiYCwh_SI',
                language: 'en',
              }}
            />
          </ScrollView>    
        </View>
      </SafeAreaView>
    </View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 15
  },

  loginButton: {
    padding: 15,
    marginTop: 15, 
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.black,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 19,
    textAlign: 'center'
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    padding: 20,
    alignItems: 'center',
  },

  headerLeft: {
    borderColor: colors.black,
    borderWidth: 2,
    padding: 7,
    borderRadius: 10,
    padding: 5,
  },
});

export default ApartmentSearch;