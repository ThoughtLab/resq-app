import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../../assets/images/ResQlogo.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              onPress={() => navigate('Main', {name: 'Haris'})}
              buttonStyle={styles.button}
              title="Haris"
              color="#8405f4"
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              onPress={() => navigate('Main', { name: 'Kelvin' })}
              buttonStyle={styles.button}
              title="Kelvin"
              color="#8405f4"
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              onPress={() => navigate('Main', { name: 'Asim' })}
              buttonStyle={styles.button}
              title="Asim"
              color="#8405f4"
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              onPress={() => navigate('Main', { name: 'Froz' })}
              buttonStyle={styles.button}
              title="Froz"
              color="#8405f4"
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              onPress={() => navigate('Main', { name: 'Maysam' })}
              buttonStyle={styles.button}
              title="Maysam"
              color="#8405f4"
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    width: 200
  }
});
