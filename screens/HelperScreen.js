import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  List,
  ListItem,
  View,
  FlatList,
  TouchableOpacity, Image
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Api from '../data/Api';

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
    minHeight: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'relative'
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
  helpedLinkText: {
    fontSize: 14,
    color: '#58a66b',
    textAlign: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  image: {
    position: 'absolute',
    left: -60,
    top: 7,
    height: 32,
    width: 32
  }
});

export default class HelperScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.api = new Api();
    console.log("HelperScreen.global.user", global.user);
    this.ref = this.api.callForHelps(global.user);
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      messages: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log("onCollectionUpdate()->");
    const messages = [];
    querySnapshot.forEach((doc) => {
      console.log("doc.data()->" + doc.data());
      const { first, last, born } = doc.data();
      var msg = doc.data().user + " needs " + doc.data().emergency

      messages.push({
        key: doc.id,
        msg: msg,
        accepted: doc.data().accepted
      });
    });
    console.log("set messages->" + messages);
    this.setState({
      messages,
      isLoading: false,
    });

  };

  help(documentId) {
    console.log('HelpeeScreen:help', documentId);
    var api = new Api();
    api.respondToHelp(global.user, documentId);
  }

  componentDidMount() {
    console.log("F()->" + (this.ref));
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  display(item) {
    if (!item.accepted) {
      console.log('display()');
      return <TouchableOpacity onPress={() => this.help(item.key)} style={styles.helpLink}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.image} />
        <Text style={styles.helpLinkText}>I wanna help!</Text>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity style={styles.helpLink}>
        <Image
          source={require('../assets/images/tick.png')}
          style={styles.image}
        />
        <Text style={styles.helpedLinkText}>Thanks! You have earned a credit.</Text>
      </TouchableOpacity>
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/ResQLogo.png')}
            style={styles.welcomeImage}
          />
        </View>
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <View style={styles.list}>
            <Text style={styles.item}>{item.msg}</Text>
            <View style={styles.helpContainer}>
              {this.display(item)}
            </View>
          </View>
          }
        />

      </ScrollView>
    );
  }
}
