import React, { useEffect, useState, Component } from "react";
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { ImageBackground, SafeAreaView, StyleSheet, Button, View, Text, TextInput } from "react-native";
import { Root, Popup } from 'popup-ui'
import { Buffer } from 'buffer';

class BluetoothScan extends Component{
	constructor() {
	    super();
	    this.manager = new BleManager();
	    this.state = {
	      status: "not connected"
	    };
	}

	componentDidMount(){
		const subscription = this.manager.onStateChange((state) => {
		    if (state === 'PoweredOn') {
	        	this.scanAndConnect();
	        	subscription.remove()
	    	} else if (state === 'PoweredOff') {
	    		console.log('powered off')
				subscription.remove()
	    	}
		}, true);
	};

	componentWillUnmount() {
        this.manager.stopDeviceScan();
        this.manager.destroy();
        this.setState({status: "not connected"})
    }

	scanAndConnect() {
		console.log(this.props.machine_number)
		this.manager.startDeviceScan(null, null, (error, device) => {
			this.setState({status: "scanning ..."})

			// console.log(device);

		  	if (error) {
		    	console.log(error)
		    	this.setState({status: error})
		    	return
		  	}

			if (String(device.name).slice(-2) === String(this.props.machine_number).slice(-2)) {
				const device_name = device.name
			    this.setState({status: "Connecting to machine"})

			    this.manager.stopDeviceScan();

			    device.connect({requestMTU: 527})
			      	.then((device) => {
			      		return device.isConnected()
			      	}).then(()=>{
			        	console.log("Discovering services and characteristics");
			        	return device.discoverAllServicesAndCharacteristics()
			      	}).then((device) => {
			      		console.log(device)
			      		return fetch('https://quiet-truth-2000.lidar.workers.dev/?search=' + device_name)
			      	}).then((response) => {
			      		return response.text()
			      	}).then((data) => {
						if(data !== null){
							console.log(data)

							if(data == "1"){
								device.writeCharacteristicWithResponseForService('49535343-fe7d-4ae5-8fa9-9fafd205e455','49535343-8841-43f4-a8d4-ecbe34729bb3', Buffer.from('0200ac534500a500000256955517020000220405104610000000000000050000010001a5a5a5a5a8b7e4f3328b537c1bc58b00c5f2fb0d3f6bd183bd75aaf787073cfbe2e3de5d5a11d550a3439418c228fcf8e627503b44d20e754e29d6d70c91be50e4cce951bb3e45e463191829ae579be3ab375f23eeb830964031afda2102c7531c45f6c974db19d67b70f8c4e4d158bc2e3656866a4f782d9a65f10761fde47695f944676e324148f72f52268803').toString('base64'))
							}else if(data == "0"){
								device.writeCharacteristicWithResponseForService('49535343-fe7d-4ae5-8fa9-9fafd205e455','49535343-8841-43f4-a8d4-ecbe34729bb3', Buffer.from('0200ac53450096000002569555f4010000220330153451000000000000050000010001a5a5a5a5a8b7e4f3328b537c0a3b970b8045e1a1d72e1c8f9fd80ac3e773cc53dd3d1d1a4e35d9108a4ec55aefc60ef1ce3ccdfc48b646512d79dbc029f2898baa0be1a8003905321ecd5a0564d13adf7f122e539c9deed55545cef1f31df613b502b7220838184560d77381464fee293cbc4b3fbf5b5cf16d1ff3dae1f13236323d650c6e324148f72f52268903').toString('base64'))
							}					
						}
					}).catch((error) => {
        				// Handle errors
        				console.log(error)
    				});
		   	}
		});


		setTimeout(() => {
		  this.manager.stopDeviceScan();
		}, 5000);
	}

	render(){
		return (<View><Text>{this.state.status}</Text></View>);
	};
}


// export const startMachine = (device) => {
// 	const manager = new BleManager(); 

// 	function initialize() {
// 		const subscription = manager.onStateChange((state) => {
// 		    if (state === 'PoweredOn') {
// 		    	console.log("powered on state")
// 	        	writeToDevice();
// 	        	subscription.remove()
// 	    	} else if(state === 'PoweredOff') {
// 	    		Popup.show({
// 					type: 'Warning',
// 					title: 'Bluetooth not enabled',
// 					button: true,
// 					textBody: 'Turn on your bluetooth to connect to laundry machines',
// 					buttonText: 'Ok',
// 					callback: () => Popup.hide(),
// 				})
// 	    	}
// 		}, true);
// 	}

// 	function writeToDevice(){
// 		console.log("writing to device")

// 		// console.log(device.id);
		
// 		manager.connectToDevice(device.id).then(function(connectedDevice){
// 			connectedDevice.discoverAllServicesAndCharacteristics().then(function(device){
				// fetch('https://quiet-truth-2000.lidar.workers.dev/?search=' + device.name)
				// .then(response => response.text())
				// .then(data => {
				// 	if(data !== null){
				// 		if(data == "1"){
				// 			manager.writeCharacteristicWithResponseForDevice(device.id, '49535343-fe7d-4ae5-8fa9-9fafd205e455', '49535343-8841-43f4-a8d4-ecbe34729bb3', base64.encode('0200ac534500a500000256955517020000220405104610000000000000050000010001a5a5a5a5a8b7e4f3328b537c1bc58b00c5f2fb0d3f6bd183bd75aaf787073cfbe2e3de5d5a11d550a3439418c228fcf8e627503b44d20e754e29d6d70c91be50e4cce951bb3e45e463191829ae579be3ab375f23eeb830964031afda2102c7531c45f6c974db19d67b70f8c4e4d158bc2e3656866a4f782d9a65f10761fde47695f944676e324148f72f52268803')).then(function(characteristic){
				// 				console.log(characteristic)
				// 			})
				// 		}else if(data == "0"){
				// 			manager.writeCharacteristicWithResponseForDevice(device.id, '49535343-fe7d-4ae5-8fa9-9fafd205e455', '49535343-8841-43f4-a8d4-ecbe34729bb3', base64.encode('0200ac53450096000002569555f4010000220330153451000000000000050000010001a5a5a5a5a8b7e4f3328b537c0a3b970b8045e1a1d72e1c8f9fd80ac3e773cc53dd3d1d1a4e35d9108a4ec55aefc60ef1ce3ccdfc48b646512d79dbc029f2898baa0be1a8003905321ecd5a0564d13adf7f122e539c9deed55545cef1f31df613b502b7220838184560d77381464fee293cbc4b3fbf5b5cf16d1ff3dae1f13236323d650c6e324148f72f52268903')).then(function(characteristic){
				// 				console.log(characteristic)
				// 			})
				// 		}
				// 	}
				// });
// 			})
// 		})
// 	}

// 	initialize()
// }




// // export default function BluetoothScan({route, navigation}){
// // 	const {machineNumber, machineType} = route.params;
// // 	const [scanned, setScanned] = useState("")
// // 	const [connection, setConnection] = useState("")
// // 	let numScanned = 0;

// // 	const manager = new BleManager();

// // 	useEffect(()=>{
		
// // 	},[])

// // 	async function scan() {
// 		// manager.startDeviceScan(null, null, async(error, device) => {
// 		// 	if (error) {
// 		// 		// Handle error (scanning will be stopped automatically)
// 		// 		setConnection("error")
// 		// 		await manager.stopDeviceScan();
// 		// 	}

// 		// 	// Check if it is a device you are looking for based on advertisement data
// 		// 	// or other criteria.

// 		// 	if(device.localName !== null){
// 		// 		console.log(device.localName)
// 		// 		if(String(device.localName).slice(-2) == machineNumber) {

// // 					try {
// // 						await manager.stopDeviceScan();
// // 					}catch(error){
// // 						console.log("error")
// // 						console.log(error)
// // 					}

// // 					try {
// // 						await manager.connectToDevice(device.id)
// // 						console.log(device)
// // 					} catch(error) {
// // 						console.log("error")
// // 					    console.log(error)
// // 					}

// // 					try {
// // 						await device.discoverAllServicesAndCharacteristics()
// // 						const services = await device.services()
// // 						console.log("services")
// // 						console.log(services)
// // 					}catch(error){
// // 						console.log("error")
// // 						console.log(error)
// // 					}


// // 					console.log(await manager.isDeviceConnected(device.id))

// // 					// await manager.cancelDeviceConnection(device.id)

// // 					// console.log(await manager.isDeviceConnected(device.id))

// 					// if(machineType == "dryer"){
// 					// 	try{
// 					//  		const response = await manager.writeCharacteristicWithoutResponseForDevice(device.id, '49535343-fe7d-4ae5-8fa9-9fafd205e455', '49535343-8841-43f4-a8d4-ecbe34729bb3', base64.encode('0200ac53450096000002569555f4010000220330153451000000000000050000010001a5a5a5a5a8b7e4f3328b537c0a3b970b8045e1a1d72e1c8f9fd80ac3e773cc53dd3d1d1a4e35d9108a4ec55aefc60ef1ce3ccdfc48b646512d79dbc029f2898baa0be1a8003905321ecd5a0564d13adf7f122e539c9deed55545cef1f31df613b502b7220838184560d77381464fee293cbc4b3fbf5b5cf16d1ff3dae1f13236323d650c6e324148f72f52268903'))
// 					//  		console.log(response)
// 					// 	}catch(error){
// 					// 		console.log(error)
// 					// 	}
// 					// }else{
// 					// 	try{
// 					//   		const response = await manager.writeCharacteristicWithoutResponseForDevice(device.id, '49535343-fe7d-4ae5-8fa9-9fafd205e455', '49535343-8841-43f4-a8d4-ecbe34729bb3', base64.encode('0200ac534500a500000256955517020000220405104610000000000000050000010001a5a5a5a5a8b7e4f3328b537c1bc58b00c5f2fb0d3f6bd183bd75aaf787073cfbe2e3de5d5a11d550a3439418c228fcf8e627503b44d20e754e29d6d70c91be50e4cce951bb3e45e463191829ae579be3ab375f23eeb830964031afda2102c7531c45f6c974db19d67b70f8c4e4d158bc2e3656866a4f782d9a65f10761fde47695f944676e324148f72f52268803'))
// 					//   		console.log(response)
// 					// 	}catch(error){
// 					// 		console.log(error)
// 					// 	}
// 					// }

// 					// await manager.cancelDeviceConnection(device.id)

// // 					setConnection("written to device")
// // 					// return
// // 				}
// // 			}

// //     	});
// // 	}

// // 	return (
// // 		<Text>{connection}</Text>
// // 	);
// // }

export default function Connect({route, navigation}){
	const {machine_number} = route.params;

	return (<BluetoothScan machine_number={machine_number}/>);
}