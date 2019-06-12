import React from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator, List, ListItem , View, FlatList,TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Api from '../data/Api';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
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
  }
})

var helpee = {
  name: 'feroz',
  vehicle: 'RAV4',
  lat: '-37.823891',
  long: '144.911118'
}

var state = {
  mapRegion: {latitude: -37.82458,
    longitude: 144.957806,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,}
};

export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Links',
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
        user:  doc.data().user,
        skills:  doc.data().skills.join(','),
        lat:  doc.data().location.latitude,
        lon: doc.data().location.longitude
      });
    });
    console.log("set messages->" + messages);
    this.setState({
      messages,
      isLoading: false,
   });

  }

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
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    var listView
    if(this.state.isLoading && (this.state.messages == null ||  this.state.messages.length <= 0)){
      listView = (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>

        )
    } else {
      listView = (
        <FlatList
          data={this.state.messages}
          renderItem={({item}) => <Text style={styles.item}>{item.user} is on his way. ETA 20 mins.</Text>}
        />
      )
    }

    return (
      <View style={styles.container}>
      <MapView
          style={{ alignSelf: 'stretch', height: 500}}
          region={state.mapRegion}
          provider={MapView.PROVIDER_GOOGLE}
          onReady={this.focusMap}>
          {this.state.messages.map((m) =>
            <MapView.Marker key={m.key} coordinate={{ latitude: m.lat, longitude: m.lon }}
              title= {m.user}
              description={m.skills}
            />
          )}
        </MapView>
        {/* { listView } */}
        <View style={styles.activity}>
          <Text>An angel is on it's way, ETA 10 mins</Text>
        </View>
        
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
