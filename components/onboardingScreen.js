import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10, color: 'white'}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        bottomBarColor='black'
        onSkip={() => navigation.replace("PhoneNumber")}
        onDone={() => navigation.navigate("PhoneNumber")}
        pages={[
          {
            backgroundColor: 'black',
            image: <Image source={require('../assets/images/onboarding-1.png')} />,
            title: 'A new way to pay for laundry and more',
            subtitle: 'Beetleapp cuts out all the middlemen and passes these savings onto you.',
          },
          {
            backgroundColor: 'black',
            image: <Image source={require('../assets/images/onboarding-2.png')} />,
            title: 'No more credit card fees.',
            subtitle: 'With Beetleapp, you pay with credit cards but avoid the credit card fees.',
          },
          {
            backgroundColor: 'black',
            image: <Image source={require('../assets/images/onboarding-3.png')} />,
            title: "Tomorrow's payment technology, today",
            subtitle: "We're building the future and it doesn't involve the big guys.",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
});