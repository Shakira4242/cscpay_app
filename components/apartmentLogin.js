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
import { livetestSignIn, testSignIn, sendSmsVerification } from "../api/verify";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const ApartmentLogin = ({ route, navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const item = route.params.item

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

  return (
  	<>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>    	
    	<View
			style={{
				backgroundColor: item.backgroundColor
			}}
	    >

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
		                    style={[styles.headerLeft, {borderColor: item.textColor}]}
		                    name="chevron-left"
		                    size={20}
		                    color={item.textColor}
		                  />
		                </TouchableOpacity>
		            </View>
		          </SafeAreaView>
		        </View>
      		</SafeAreaView>

    	</View>

    	
    	<View
			style={{
				width: width,
				height: height,
				backgroundColor: item.backgroundColor,
			}}
		>

		<View
			style={{
				borderRadius: 10,
				marginVertical: 10,

				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: item.backgroundColor,
			}}
		>
			<Image source={{uri: item.image}} style={styles.categoryItemImage} />
			<Text style={{
				fontSize: 12,
	      		fontWeight: '500',
	      		margin: 30,
	      		color: item.textColor
			}}>Sign in to {item.portalName} to authorize Beetleapp to use this service to cover you rent each month.</Text>

			<View style={{
	    	}}>
	        	<Text style={{
	        		fontSize: 10,
	        		fontWeight: '500',
	        		color: item.textColor,
	        		marginTop: 10
	        	}}>Email</Text>
	        	<TextInput
	        		style={{
	        			width: 300,
					    padding: 10,
					    borderRadius: 10,
					    marginTop: 5,
					    backgroundColor: 'white',
					    borderColor: 'grey',
					    borderWidth: 0.5,
	        		}}
	        		placeholder={"Email"}
	        	></TextInput>
	        </View>

	        <View style={{
	    	}}>
	        	<Text style={{
	        		fontSize: 10,
	        		fontWeight: '500',
	        		color: item.textColor,
	        		marginTop: 10
	        	}}>Password</Text>
	        	<TextInput
	        		style={{
	        			width: 300,
					    padding: 10,
					    borderRadius: 10,
					    marginTop: 5,
					    backgroundColor: 'white',
					    borderColor: 'grey',
					    borderWidth: 0.5,
	        		}}
	        		placeholder={"Password"}
	        	></TextInput>
	        </View>

	        <View>
		    	<TouchableOpacity
		          style={[styles.loginButton, {backgroundColor: item.backgroundColor}]}

		          onPress={() => {
		            navigation.navigate('MonthlyRent')
		         }}
		        >
		          <Text style={[styles.buttonText, {color: item.textColor}]}>Sign In</Text>
		    	</TouchableOpacity>
	    	</View>
		</View>
		</View>


    	</View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },

  wrapper: {

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

export default ApartmentLogin;