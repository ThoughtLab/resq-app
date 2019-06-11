import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Api from '../data/Api';
import Help from '../data/Api';

// var api = new Api();
// console.log("api=" + api);

var helpee = {
  name: 'feroz',
  vehicle: 'RAV4',
  lat: '-37.823891',
  long: '144.911118'
}

export default class HelpeeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };



  constructor() {
    super();
    this.api = new Api();

  }

  flatTyre() {
    console.log('HelpeeScreen:flatTyre');
    var api = new Api();
    api.askForHelp(helpee.name,'I have a flat tyre', 'mechanic', new Date(), helpee.vehicle, helpee.lat , helpee.long);
  }

  medical() {
    console.log('HelpeeScreen:medical');
    var api = new Api();
    api.askForHelp(helpee.name,'I have a severe heart ache', 'medical', new Date(), helpee.vehicle, helpee.lat , helpee.long);
  }

  tow() {
    console.log('HelpeeScreen:tow');
    var api = new Api();
    api.askForHelp(helpee.name,'my axles broken', 'tow', new Date(), helpee.vehicle, helpee.lat , helpee.long);
  }

  sos() {
    console.log('HelpeeScreen:sos');
    var api = new Api();
    api.askForHelp(helpee.name,'random', 'sos', new Date(), helpee.vehicle, helpee.lat , helpee.long);
  }

  fuel() {
    console.log('HelpeeScreen:fuel');
    var api = new Api();
    api.askForHelp(helpee.name,'my fuel is gonna end', 'fuel', new Date(), helpee.vehicle, helpee.lat , helpee.long);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.flatTyre} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Flat Tyre</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.medical} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Medical</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.tow} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Tow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.sos} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>SOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.fuel} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Fuel</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
});
