import React, { useEffect, useState, useRef, useMemo} from "react";
import { BleManager } from 'react-native-ble-plx';
import { ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, AppRegistry, StyleSheet, Linking, Button, View, Text, TextInput, Image } from "react-native";
import { AuthProvider, useAuth } from "../utils/auth-context";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

import { useIsFocused } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg'; 

import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";

import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/iPhone 13 Pro Max - 1(7).png"};

export default function Scan({route, navigation}){
	const [hasPermission, setHasPermission] = React.useState(false);
	const devices = useCameraDevices();
	const device = devices.back;
	const {arg} = route.params; 
	const isCancelled = React.useRef(false);


	const [isTorch, setIsTorch] = useState("off");

	const isFocussed = useIsFocused();

	const WarningPermissionbottomSheetRef = useRef(null);
  	const WarningPermissionsnapPoints = useMemo(() => ["50%", "70%"], []);

  	const instructionbottomSheetRef = useRef(null);
  	const instructionsnapPoints = useMemo(() => ["20%"], []);


	const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
		checkInverted: true,
	});


	//Alternatively you can use the underlying function:
	
	// const frameProcessor = useFrameProcessor((frame) => {
	//   'worklet';
	//   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
	//   runOnJS(setBarcodes)(detectedBarcodes);
	// }, []);

	useEffect(()=>{
		if(barcodes.length > 0){
			for (const element of barcodes) {
				// console.log(element.rawValue)
				if([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].includes(parseInt(element.rawValue))){
					navigation.navigate('BLE', {number: element.rawValue })
				}
			}
		}
	},[barcodes])

	useEffect(() => {
		(async () => {
		  const status = await Camera.requestCameraPermission();
		  setHasPermission(status === 'authorized');
		})();
	}, []);


	return (
		<>
		{ device != null && hasPermission ?
		    <Camera
		      style={styles.container}
		      device={device}
		      frameProcessor={frameProcessor}
		      frameProcessorFps={5}
		      isActive={isFocussed}
		      torch={isTorch}
		    >

		    <SafeAreaView
		    	style={styles.container}
		    >
				<View
					style={styles.headerWrapper}
				>
		          <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
		            <Feather style={styles.headerLeft} name="chevron-left" size={12} color={colors.primary} />
		          </TouchableOpacity>
		          <TouchableOpacity onPress={() => {
		          	const toggleTorch = function(){
		          		if(isTorch == "on"){
		          			return "off";
		          		}else{
		          			return "on";
		          		}
		          	} 
		          	setIsTorch(toggleTorch());
		          }}>
		            <Feather style={styles.headerLeft} name="zap" size={12} color={colors.primary} />
		          </TouchableOpacity>
		        </View>
		    </SafeAreaView>

		    <BottomSheet
		        ref={instructionbottomSheetRef}
		        snapPoints={instructionsnapPoints}
		        index={0}
		        enablePanDownToClose={false}
		        backgroundStyle={styles.backgroundContainer}
		        handleIndicatorStyle={styles.handleStyleContainer}
		      >
		        <View style={{
		        	margin: 20,
		        	textAlign: 'center',
		        	justifyContent: 'center',
		        	alignItems: 'center'
		        }}>
		          <View>
		          <Text style={[styles.titlesTitle, {
		            color: colors.white,
		            fontSize: 17,
		            marginHorizontal: 20,
		          }]}>Scan the qr code</Text>
		          </View>
		        </View>
		    </BottomSheet>

		    </Camera>
		  	:
		  	<View style={{
		  		flex: 1,
    			backgroundColor: 'grey'
		  	}}>
		  		<SafeAreaView>
				<View style={styles.headerWrapper}>
				<TouchableOpacity
				  onPress={() => {
				    navigation.goBack()
				  }}
				>
				<Feather name="chevron-left" size={30} color={colors.primary} />                  
				</TouchableOpacity>

				</View>
				</SafeAreaView>

			  	<BottomSheet
			        ref={WarningPermissionbottomSheetRef}
			        snapPoints={WarningPermissionsnapPoints}
			        index={0}
			        enablePanDownToClose={false}
			        backgroundStyle={styles.backgroundContainer}
			        handleIndicatorStyle={styles.handleStyleContainer}
			      >
			        <View style={{
			        	margin: 20
			        }}>
			          <View>
			          <Text style={[styles.titlesTitle, {
			            color: colors.white,
			            fontSize: 17,
			            marginHorizontal: 20,
			          }]}>Your bluetooth or camera settings are turned off.</Text>

			          <TouchableOpacity
			          	onPress={()=>Linking.openURL('app-settings:')}
			          >
			          	<View
			          		style={{
			          			backgroundColor: colors.background,
			          			marginVertical: 20,
			          			marginHorizontal: 5,
              					padding: 15,
              					borderRadius: 10,
			          		}}
			          	>
			          		<Text style={{
			          			color: 'white',
			          			textAlign: 'center',
			          			fontSize: 20
			          		}}>click here to turn on</Text>
			          	</View>
			          </TouchableOpacity>
			          </View>
			        </View>
			    </BottomSheet>
		    </View>
		}
		</>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerLeft: {
		borderColor: colors.primary,
		borderWidth: 2,
		padding: 12,
		borderRadius: 10,
		margin: 20
	},
	image: {
		width: 300,
		height: 300,
	},
  	headerWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 20,
		alignItems: 'center',
	},
	qrOverlayWrapper: {
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 20,
		alignItems: 'center',
	},
	backgroundContainer: {
		backgroundColor: colors.secondary,
	},
	handleStyleContainer: {
		backgroundColor: colors.primary
	}
});