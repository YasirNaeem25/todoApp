import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = ({ navigation }) => {
  useEffect(() => { 
        SplashScreen.hide();
  }, []);

  const { width, height } = Dimensions.get('window');
  const circleSize = Math.min(width * 0.6, height * 0.6); 
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <Image style={{ width: circleSize, height: circleSize }} source={require('../Assets/todoIcon.png')} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
