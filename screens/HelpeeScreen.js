import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Api from '../data/Api';

const helpee = {
  name: 'Ellis',
  vehicle: 'RAV4',
  lat: '-37.823891',
  long: '144.911118'
};

export default class HelpeeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.api = new Api();
  }

  askForHelp = (message, emergency) => {
    new Api().askForHelp(helpee.name, message, emergency, new Date(), helpee.vehicle, helpee.lat, helpee.long);
    this.props.navigation.navigate('MapStack');
  };

  rideShare = () => {
    console.log('HomeScreen:rideShare')
    this.askForHelp('I need a ride', 'rideShare');
  }

  flatie = () => {
    console.log('HomeScreen:help:flatie');

    this.askForHelp('I have a flatie', 'mechanic');
  };

  flatTyre = () => {
    console.log('HelpeeScreen:flatTyre');

    this.askForHelp('I have a flat tyre', 'mechanic');
  };

  medical = () => {
    console.log('HelpeeScreen:medical');

    this.askForHelp('I have a severe heart ache', 'medic');
  };

  tow = () => {
    console.log('HelpeeScreen:tow');

    this.askForHelp('my axles broken', 'tow');
  };

  sos = () => {
    console.log('HelpeeScreen:sos');

    this.askForHelp('random', 'sos');
  };

  fuel = () => {
    console.log('HelpeeScreen:fuel');

    this.askForHelp('my fuel is gonna end', 'fuel');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/ResQLogo.png')}
              style={styles.welcomeImage}
            />
            <Image
              source={require('../assets/images/ISD.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.flatie} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/mechanical.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Mechanic</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.rideShare} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/ridesharing.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Ride Share</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.medical} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/medical.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Medical</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.tow} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/tow.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Tow</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.sos} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/sos.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>SOS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.fuel} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/fuel.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Fuel</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#eee',
    height: '100%'
  },
  linksContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
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
    marginBottom: 20
  },
  welcomeImage: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
    marginTop: 2
  },
  helpContainer: {
    width: '50%',
    marginTop: 10,
    alignItems: 'center'
  },
  helpLinkIcon: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
  helpLink: {
    paddingVertical: 15
  }
});
