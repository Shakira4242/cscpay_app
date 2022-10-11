/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import { Buffer } from "buffer";

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import CheckoutScreen from './checkoutScreen';
import { supabase } from '../utils/supabaseClient'


import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';

import { stringToBytes } from "convert-string";

const UpdateMachines = ({route, navigation}) => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  const [connecting, setConnecting] = useState(false)
  const [connectedState, setConnectedState] = useState("")

  const {first, last, price} = route.params


  const machine_number = String(first).padStart(3, '0')

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  }

  const stopScan = () => {
    BleManager.stopScan().then(() => {
        console.log('Stopped scan');
    });
  }

  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

  const handleDiscoverPeripheral = (peripheral) => {
  	if(peripheral["name"] !== undefined){
  		if(String(peripheral.name).length == 18){
  			if((parseInt(String(peripheral.name).slice(-3)) >= first) && (parseInt((String(peripheral.name).slice(-3))) <= last)){
  				const { data, error } = supabase
				.from('machine_ids')
				.insert({ serial_number: peripheral.name, value: price }, { upsert: true })
				.then((data)=>{
					console.log(data)
					setTimeout(() => {
						setConnectedState("added " + peripheral.name)
					},250);
				})
  			}
  		}
  	}
          
    // console.log("found " + peripheral.name)
    // testPeripheral(peripheral)
    // console.log('Got ble peripheral', peripheral.name);
    // if (!peripheral.name) {
    //   peripheral.name = 'NO NAME';
    // }
    // peripherals.set(peripheral.id, peripheral);
    // setList(Array.from(peripherals.values()));
  }

  const testPeripheral = (peripheral) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);

          setTimeout(() => {

            /* Test read current RSSI value */
            // BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
            //   console.log('Retrieved peripheral services', peripheralData);

            //   BleManager.readRSSI(peripheral.id).then((rssi) => {
            //     console.log('Retrieved actual RSSI value', rssi);
            //     let p = peripherals.get(peripheral.id);
            //     if (p) {
            //       p.rssi = rssi;
            //       peripherals.set(peripheral.id, p);
            //       setList(Array.from(peripherals.values()));
            //     }                
            //   });                                          
            // });

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza

            fetch('https://quiet-truth-2000.lidar.workers.dev/?search=' + peripheral.name)
            .then((response) => response.json())
            .then((data) => {
              const token = data.token

              BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = '49535343-FE7D-4AE5-8FA9-9FAFD205E455';
              var startMachineCharacteristic = '49535343-8841-43F4-A8D4-ECBE34729BB3';
              setTimeout(() => {
                BleManager.write(peripheral.id, service, startMachineCharacteristic, token).then(() => {
                  console.log('Writed start machine characteristic');
                  setConnectedState("successfully connected")
                  setTimeout(()=>{
                    setConnecting(false)
                  },3000)
                }).catch((error)=>{
                  console.log(error)
                  setConnectedState("error connecting to machine")
                  setTimeout(()=>{
                    setConnecting(false)
                  },3000)
                });
              }, 500);
              });
            });

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }

  }

  useEffect(() => {
    BleManager.start({showAlert: false})

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    // if (Platform.OS === 'android' && Platform.Version >= 23) {
    //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
    //       if (result) {
    //         console.log("Permission is OK");
    //       } else {
    //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
    //           if (result) {
    //             console.log("User accept");
    //           } else {
    //             console.log("User refuse");
    //           }
    //         });
    //       }
    //   });
    // }  
    
    return (() => {
      console.log('unmount');
      bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
      bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }, []);

  const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons
              name="close"
              size={15}
              color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Titles */}
      <View style={styles.titlesWrapper}>
        <Text style={styles.title}>Click below to start machine #{machine_number}</Text>
      </View>

      {/* Place an order */}
      <TouchableOpacity
        onPress={() => {
          startScan()
          setConnecting(true)
        }} 
      >
        <View style={styles.orderWrapper}>
          <Text style={styles.orderText}>Start Machine</Text>
          <Feather name="chevron-right" size={18} color={colors.black} />
        </View>
      </TouchableOpacity>

      {connecting ? 
        <Text style={{
          fontSize: 20,
          color: colors.price,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>{connectedState}</Text>
        :
        <></>
      }
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default UpdateMachines;