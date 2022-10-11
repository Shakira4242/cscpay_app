import React, { useState, useEffect} from "react";
import { SafeAreaView,TouchableOpacity,  StyleSheet, Button, Text, Keyboard, TouchableWithoutFeedback} from "react-native";

import { checkVerification } from "../api/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { useAuth } from "../utils/auth-context";
import colors from '../assets/colors/colors';


const Otp = ({ route, navigation }) => {
 const { phoneNumber } = route.params;
 const [invalidCode, setInvalidCode] = useState(false);

 const userData = useAuth()

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

 return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   <SafeAreaView style={styles.wrapper}>
     <Text style={styles.prompt}>Confirm your number</Text>
     <Text style={styles.message}>
       {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
     </Text>
     <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
      }}
      onPress={() => navigation.navigate("PhoneNumber")}
     >
      <Text style={{
        color: 'black',
        fontWeight: '500',
        margin: 7
       }}>Change Phone Number</Text>
     </TouchableOpacity>
     <OTPInputView
       style={{ width: "80%", height: 200 }}
       pinCount={6}
       autoFocusOnLoad
       codeInputFieldStyle={styles.underlineStyleBase}
       codeInputHighlightStyle={styles.underlineStyleHighLighted}
       onCodeFilled={(code) => {
         checkVerification(phoneNumber, code).then((success) => {
           if (!success) setInvalidCode(true);
           success && navigation.replace("Discover");
         });
       }}
     />
     {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
   </SafeAreaView>
   </TouchableWithoutFeedback>
 );
};

const styles = StyleSheet.create({
 wrapper: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: colors.white
 },

 borderStyleBase: {
   width: 30,
   height: 45,
 },

 borderStyleHighLighted: {
   borderColor: "#03DAC6",
 },

 underlineStyleBase: {
   width: 30,
   height: 45,
   borderWidth: 0,
   borderBottomWidth: 1,
   color: "black",
   fontSize: 20,
 },

 underlineStyleHighLighted: {
   borderColor: "#03DAC6",
 },

 prompt: {
   fontSize: 24,
   paddingHorizontal: 30,
   paddingBottom: 20,
   fontWeight: '700'
 },

 message: {
   fontSize: 16,
   paddingHorizontal: 30,
 },

 error: {
   color: "red",
 },
});

export default Otp;
