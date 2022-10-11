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

import ApartmentLogin from "./apartmentLogin"

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const image = { uri: "https://yrjpyxxskaprgyqwygdq.supabase.co/storage/v1/object/public/website/Section 2 - Payments(3).png"}

import colors from '../assets/colors/colors';

const { width, height } = Dimensions.get('window');

const ApartmentPortalSearch = ({ route, navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const address = route.params.address
  const [categoriesData, setCategoriesData] = useState(null)

  useEffect(()=>{
    Keyboard.dismiss()
  },[])

  useEffect(()=>{
    function getCategoryData() {
      fetch("https://portalnames.lidar.workers.dev")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCategoriesData(data)
      })
    }
    getCategoryData()
  },[])

  const renderCategoryItem = ({ item }) => {
    return (
    	<View
			style={{
				backgroundColor: 'white',
			}}
		>
    		<TouchableOpacity onPress={()=>{
    			navigation.navigate('ApartmentLogin', {"item": item})
    		}}>
				<View
					style={{
						borderRadius: 10,
						margin: 10,
						justifyContent: 'center',
  						alignItems: 'center',
  						backgroundColor: item.backgroundColor,
  						borderColor: 'grey',
						borderRadius: 15,
						borderWidth: 0.5,
					}}
				>
					<Image source={{uri: item.image}} style={styles.categoryItemImage} />
				</View>
			</TouchableOpacity>
		</View>
    );
  };

  return (
  	<>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    	
    	<View
			style={{
				height: height,
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
		                }}>You live at {address}</Text>
		            </View>


		        	{/* apartment search heading */}
		            <View style={{
                  marginTop: 100,
		              margin: 10
		            }}>
		                <Text style={{
		                  fontSize: 15,
		                  fontWeight: '300',
		                }}>Sign into your rental portal to authorize Beetleapp to cover your rent.</Text>
		            </View>

		        </View>
      		</SafeAreaView>

    	</View>

    	
    	<View style={{
    		flexDirection: 'column-reverse',
        margin: 15
    	}}>
    		{categoriesData !== null ?
	            <FlatList
	              snapToAlignment="start"
	              decelerationRate={"fast"}
	              snapToInterval={Dimensions.get("window").width}
	              showsHorizontalScrollIndicator={false}
	              data={categoriesData}
	              renderItem={renderCategoryItem}
	              keyExtractor={(item) => item.id}
	              horizontal={false}
	            />
	            :
	            <></>
	        }
    	</View>


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

export default ApartmentPortalSearch;