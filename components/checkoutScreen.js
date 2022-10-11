import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text, TextInput, TouchableOpacity} from "react-native";
import { useStripe } from '@stripe/stripe-react-native';
import { AuthProvider, useAuth } from "../utils/auth-context";
import {supabase} from "../utils/supabaseClient";
import { StripeProvider } from '@stripe/stripe-react-native';

import colors from '../assets/colors/colors';

import Feather from 'react-native-vector-icons/Feather';


export default function CheckoutScreen({route, navigation}) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const { number } = route.params
  const machine_number = number

  const auth = useAuth();

  const fetchPaymentSheetParams = async () => {
    let response = null

    if(auth.user.phone == "19999999999"){
      response = await fetch(`https://eager-frost-glass.glitch.me/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "phone": auth.user.phone,
        }),
      });
    }else{
      response = await fetch(`https://lapis-scrawny-eggnog.glitch.me/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "phone": auth.user.phone,
        }),
      });
    }

    const { paymentIntent, ephemeralKey, customer} = await response.json();

    console.log(paymentIntent, ephemeralKey, customer);

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      applePay: false,
      merchantCountryCode: 'US',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }else{
      console.log(error)
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if(!error){
      console.log("connect")
      navigation.navigate('BLE', {"number": number})
    }
  };

  useEffect(()=> {
    initializePaymentSheet()
  },[]);

  return (
    <>
    {auth.user.phone == "19999999999" ?
      <StripeProvider
        publishableKey="pk_test_51KIxrAJ6Rq5YUGhcNV7LVWizXHfjjhPmZu6kZfK3wuKGWMveBDWbTkqSegQ2x5ltD0N51yPJGPLsKfiqvdq3rvGe00L6glSyiR"
        merchantIdentifier="merchant.beetleapp.com"
      >
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>You scanned machine number #{machine_number}</Text>
        </View>   

        {/* Place an order */}
        <TouchableOpacity
          disabled={!loading}
          onPress={openPaymentSheet}
        >
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>Pay $1</Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>
      </View>
      </StripeProvider>
    :
      <StripeProvider
        publishableKey="pk_live_51KIxrAJ6Rq5YUGhcqyBDLNERzT17lx8gbZ3GQ0x9S6FYO6FEoD9n4jw2LslBL020mgH6krLvcfHFAHdXlCb9sxWV009r9HCY0m"
        merchantIdentifier="merchant.beetleapp.com"
      >
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>You scanned machine number #{machine_number}</Text>
        </View>   

        {/* Place an order */}
        <TouchableOpacity
          disabled={!loading}
          onPress={openPaymentSheet}
        >
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>Pay $1</Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>
      </View>
      </StripeProvider>
    }
    </>
  );
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    color: colors.textDark,
    width: '50%',
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
    marginBottom: 20,
  },
  infoItemTitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoItemText: {
    fontSize: 18,
    color: colors.textDark,
  },
  itemImage: {
    resizeMode: 'contain',
    marginLeft: 50,
  },
  ingredientsWrapper: {
    marginTop: 40,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.textDark,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientItemWrapper: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  ingredientImage: {
    resizeMode: 'contain',
  },
  orderWrapper: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    marginRight: 10,
  },
})
