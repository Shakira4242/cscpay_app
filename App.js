import React, {useContext, useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons';
import PhoneNumber from "./components/phoneNumber";
import Otp from "./components/otpPasscode";
import Discover from "./components/Discover";
import Loading from "./components/loading";
import Settings from "./components/settings";
import Details from "./components/details";
import Scan from "./components/scan";
import Connect from "./components/connect"
import BLE from "./components/bleManager"
import CheckoutScreen from "./components/checkoutScreen"
import WelcomeScreen from "./components/welcomeScreen"
import OnboardingScreen from './components/onboardingScreen';

import ApartmentSearch from "./components/apartmentSearch"
import ApartmentPortalSearch from "./components/apartmentPortalSearch"
import ApartmentLogin from "./components/apartmentLogin"
import MonthlyRent from "./components/monthlyRent"
import UpdateMachines from "./components/updateMachines"

import createAccount from "./components/createAccount"

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Image } from "react-native";

import colors from './assets/colors/colors';


import { AuthProvider, useAuth } from "./utils/auth-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const auth = useAuth();
  const [mode,setMode] = useState("live");
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      console.log(value)
      // AsyncStorage.removeItem('alreadyLaunched')
      // setIsFirstLaunch(true)
      // setIsFirstLaunch(true)
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(true);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'OnboardingScreen';
  } else {
    routeName = 'WelcomeScreen';
  }

  return (
    <NavigationContainer initialRoute={routeName}>
      <Stack.Navigator>
        {auth.user === undefined &&
          <Stack.Screen 
            options={{headerShown: false}}
            name="Loading" 
            component={Loading} 
          />
        }
        {(auth.user === null && isFirstLaunch !== null) ?
          <>
          {(auth.user === null && isFirstLaunch == true) ?
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="OnboardingScreen"
                component={gestureHandlerRootHOC(OnboardingScreen)}
              />
              <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ headerShown: false }} />
              <Stack.Screen name="Otp" component={Otp}  options={{ headerShown: false }}/>
            </>
            :
            <>
              <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ headerShown: false }} />
              <Stack.Screen name="Otp" component={Otp}  options={{ headerShown: false }}/>
            </>
          }
          </>
          :
          <>
          </>
        }
        {auth.user && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Discover"
              component={gestureHandlerRootHOC(Discover)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Scan"
              component={gestureHandlerRootHOC(Scan)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="CheckoutScreen"
              component={gestureHandlerRootHOC(CheckoutScreen)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Details"
              component={gestureHandlerRootHOC(Details)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="BLE"
              component={gestureHandlerRootHOC(BLE)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="CreateAccount"
              component={gestureHandlerRootHOC(createAccount)}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="UpdateMachines"
              component={gestureHandlerRootHOC(UpdateMachines)}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

const App = () => {
  return (
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
  );
};

export default App;