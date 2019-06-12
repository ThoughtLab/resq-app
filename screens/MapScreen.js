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
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
    minHeight: '100%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
  contentContainer: {
    paddingTop: 30,
  },
  listItem: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'relative'
  }
});

var helpee = {
  name: 'ellis',
  vehicle: 'RAV4',
  lat: '-37.823891',
  long: '144.911118'
};

var state = {
  mapRegion: {
    latitude: -37.82458,
    longitude: 144.957806,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }
};

export default class MapScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.api = new Api();
    console.log("Api()->" + Object.keys(this.api));
    console.log(helpee.name);
    this.ref = this.api.responseForHelp(helpee.name);
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      messages: []
    };
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  onCollectionUpdate = (querySnapshot) => {
    console.log("onCollectionUpdate()->");
    const messages = [];
    querySnapshot.forEach((doc) => {
      console.log("doc.data()->" + doc.data());
      messages.push({
        key: doc.id,
        user: doc.data().user,
        skills: doc.data().skills.join(','),
        lat: doc.data().location.latitude,
        lon: doc.data().location.longitude
      });
    });
    console.log("set messages->" + messages);
    this.setState({
      messages,
      isLoading: false,
    });

  };

  componentDidMount() {
    console.log("F()->" + (this.ref));
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  focusMap(markers, animated) {
    if (this.map) {
      if (markers && markers.length) {
        this.map.fitToCoordinates(markers, {
          animated,
          edgePadding: Dimensions.tripPageMapMargins
        });
      }
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

    var listView
    if(this.state.messages.length <= 0){
      listView = (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        )
    } else {
      listView = (
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <View style={styles.listItem}><Text style={styles.item}>{item.user} is on his way. ETA 20 mins.</Text></View>}
        />
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/ResQLogo.png')}
              style={styles.welcomeImage}
            />
          </View>
          <MapView
            style={{ alignSelf: 'stretch', height: 400 }}
            region={state.mapRegion}
            provider={MapView.PROVIDER_GOOGLE}
            onReady={this.focusMap}>
            {this.state.messages.map((m) =>
              <MapView.Marker key={m.key} coordinate={{ latitude: m.lat, longitude: m.lon }}
                              title={m.user}
                              description={m.skills}
              />
            )}
          </MapView>
          {listView}
        </ScrollView>

      </View>
    );
  }
}
/*
<ScrollView style={styles.container}>
  <Text>
  {
    this.state.messages.map((item, i) => (
      item.first + ":" + item.last + "\n"
    ))
  }
  </Text>
</ScrollView>


*/
