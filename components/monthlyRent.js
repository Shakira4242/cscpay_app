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
 ScrollView,
 FlatList
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import CurrencyInput from 'react-native-currency-input';
import { livetestSignIn, testSignIn, sendSmsVerification } from "../api/verify";

import ApartmentLogin from "./apartmentLogin"

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const MonthlyRent = ({ route, navigation }) => {
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const [value, setValue] = useState(1000);

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

  return (
  	<>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    
   		<View style={styles.container}>

      		<SafeAreaView style={styles.wrapper}>

  		        <View style={{
  		          margin: 10,
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
		              margin: 10
		            }}>
		                <Text style={{
		                  fontSize: 20,
		                  fontWeight: '500',
		                }}>What's your monthly rent?</Text>
		            </View>


		        	 {/* apartment search heading */}
		            <View style={{
		              margin: 10
		            }}>
		                <Text style={{
		                  fontSize: 15,
		                  fontWeight: '300',
		                }}>Try to be specific. This number must be similar to what your landlord charfes in order for Beetleapp to cover your rent.</Text>
		            </View>

                {/* last name */}

                <View style={{
                  margin: 10
                }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                  }}>Monthly Rent</Text>
                  
                  <CurrencyInput
                    value={value}
                    onChangeValue={setValue}
                    prefix="$"
                    delimiter=","
                    separator="."
                    precision={2}
                    style={{
                      height: 40,
                      width: 300,
                      borderWidth: 2,
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                      fontSize: 20
                    }}
                  ></CurrencyInput>
                </View>

                <View>
                  <TouchableOpacity
                      style={styles.loginButton}

                      onPress={() => {
                        navigation.navigate('ApartmentSearch')
                     }}
                    >
                      <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>

		        </View>
      		</SafeAreaView>

    	</View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 15
  },

  loginButton: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 20, 
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

  categoryItemImage: {
  	height: 50,
  	width: 200,
  	margin: 10,
  }
});

export default MonthlyRent;