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
import Api from '../data/Api';


var helpee = {
  name: 'feroz',
  vehicle: 'RAV4',
  lat: '-37.823891',
  long: '144.911118'
};

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.api = new Api();

  }

  flatie() {
    console.log('HomeScreen:help:flatie');
    var api = new Api();
    api.askForHelp(helpee.name, 'I have a flatie', 'mechanic', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  flatTyre() {
    console.log('HomeScreen:help');
    var api = new Api();
    api.askForHelp(helpee.name, 'I have a flat tyre', 'mechanic', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  medical() {
    console.log('HomeScreen:help');
    var api = new Api();
    api.askForHelp(helpee.name, 'I have a severe heart ache', 'medical', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  tow() {
    console.log('HomeScreen:help');
    var api = new Api();
    api.askForHelp(helpee.name, 'my axles broken', 'tow', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  sos() {
    console.log('HomeScreen:help');
    var api = new Api();
    api.askForHelp(helpee.name, 'random', 'sos', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  fuel() {
    console.log('HomeScreen:help');
    var api = new Api();
    api.askForHelp(helpee.name, 'my fuel is gonna end', 'fuel', new Date(), helpee.vehicle, helpee.lat, helpee.long);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/ResQLogo.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.flatie} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/battery.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Flatie</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.flatTyre} style={styles.helpLink}>
                <Image
                  source={require('../assets/images/Tyres.png')}
                  style={styles.helpLinkIcon}
                />
                <Text style={styles.helpLinkText}>Flat Tyre</Text>
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
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  helpContainer: {
    width: '50%',
    marginTop: 15,
    alignItems: 'center',
  },
  helpLinkIcon: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
  helpLink: {
    paddingVertical: 15,
  }
});
