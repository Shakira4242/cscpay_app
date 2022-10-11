import React, { useEffect, useState } from "react";
import { BleManager } from 'react-native-ble-plx';
import { ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, StyleSheet, Button, View, Text, TextInput } from "react-native";
import { AuthProvider, useAuth } from "../utils/auth-context";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: '#FB55F7',
  blue: '#4194FB',
  orange: '#FF762D',
  dark: '#2A2E32',
  white: '#FFFFFF',
  green: '#0CA047',
  darker: '#1B2129',
  purple: '#6C42E4',
  grey: '#2f3133',
  almostblack: '#050505',
};
const { width, height } = Dimensions.get('window');


const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/iPhone 13 Pro Max - 1(7).png"};

export default function Settings(){
	const auth = useAuth()

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={image} resizeMode="cover" style={styles.image}>	
		      <TouchableOpacity
		      	onPress={()=>auth.signOut()}
		        style={{
		          top: - height/2 + ITEM_HEIGHT,
		          paddingVertical: 10,
		          paddingHorizontal: 20,
		          width: width/1.25,
		          backgroundColor: colors.grey,
		          alignItems: 'center',
		          justifyContent: 'center',
		          borderRadius: 15,
		        }}
		        activeOpacity={0.8}
		      >
		        <Text style={{ fontSize: 20, fontWeight: '500', color: colors.white }}>
		          Sign Out
		        </Text>
		      </TouchableOpacity>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    backgroundColor: colors.almostblack,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});