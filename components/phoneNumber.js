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
 Pressable
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { livetestSignIn, testSignIn, sendSmsVerification } from "../api/verify";

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const PhoneNumber = ({ navigation }) => {
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
              margin: 20,
              marginBottom: 250
            }}>

            {/* create your account heading */}
            <View style={{
              marginTop: 100,
              margin: 10
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
              }}>What's your number</Text>
            </View>

            {/* intro subheading */}

            <View style={{
              margin: 10
            }}>
              <Text style={{
                fontSize: 15,
                fontWeight: '300',
              }}>We'll ask you to confirm this number next as a way to secure your account.</Text>
            </View>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="US"
                onChangeText={(text) => {
                  setValue(text);
                }}

                disableArrowIcon={true}

                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                countryPickerProps={{ withAlphaFilter: true }}
                withShadow
                autoFocus
              />
            </View>
            <View>

            {/* intro subheading */}

            <View style={{
              margin: 10
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '200',
              }}>By confirming your phone number you consent to receive SMS alerts from Beetleapp at the number provided (Msg frequency varies). For more information, refer to Beetleapp's <Text style={{color: 'black', fontWeight: '500'}}>Terms of service</Text> and <Text style={{color: 'black', fontWeight: '500'}}>Privacy Policy</Text></Text>
            </View>


            <TouchableOpacity
              style={styles.loginButton}

              onPress={() => {
                // TODO - send SMS!
                if(formattedValue == "+19999999999"){
                  testSignIn()
                }else if(formattedValue == "+19999999998"){
                  livetestSignIn()
                }else{
                  sendSmsVerification(formattedValue).then((sent) => {
                    navigation.navigate("Otp", { phoneNumber: formattedValue });
                  });
                }
             }}
            >
              <Text style={styles.buttonText}>Sign In</Text>
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
    flex: 1,
    backgroundColor: colors.white
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column-reverse',
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
});

export default PhoneNumber;