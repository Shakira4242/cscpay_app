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
 TextInput
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { livetestSignIn, testSignIn, sendSmsVerification } from "../api/verify";

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthProvider, useAuth } from "../utils/auth-context";

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const createAccount = ({ navigation }) => {
  const [formattedValue, setFormattedValue] = useState("");

  const [first, setFirst] = useState(null)
  const [last, setLast] = useState(null)
  const [price, setPrice] = useState(null)


  const phoneInput = useRef(null);
  const auth = useAuth()

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

  return (
  	<>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   		<View style={styles.container}>
      	<SafeAreaView style={styles.wrapper}>
        <View style={{
        	flex: 1,
        }}>
        	<Text style={{
        		fontSize: 20,
        		fontWeight: '700',
        	}}>First number</Text>
        	<TextInput
        		style={{
        			height: 40,
        			width: 300,
				    borderWidth: 1,
				    padding: 10,
        		}}
        		placeholder={"First number"}
            value={first}
            onChangeText={setFirst}
        	></TextInput>

        	<View style={{
        		margin: 10
        	}}>
	        	<Text style={{
	        		fontSize: 20,
	        		fontWeight: '700',
	        	}}>Last number</Text>
	        	<TextInput
	        		style={{
	        			height: 40,
	        			width: 300,
					    borderWidth: 1,
					    padding: 10,
	        		}}
	        		placeholder={"Last Number"}
              value={last}
              onChangeText={setLast}
	        	></TextInput>
	        </View>

          <View style={{
            margin: 10
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
            }}>Value</Text>
            <TextInput
              style={{
                height: 40,
                width: 300,
              borderWidth: 1,
              padding: 10,
              }}
              value={price}
              placeholder={"Last Number"}
              onChangeText={setPrice}
            ></TextInput>
          </View>

        	<TouchableOpacity
	          style={styles.loginButton}

	          onPress={() => {
              navigation.navigate('UpdateMachines', {first: first, last: last, price: price})
            }}
	        >
	          <Text style={styles.buttonText}>Submit</Text>
        	</TouchableOpacity>
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

export default createAccount;