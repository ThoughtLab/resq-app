import React from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator, List, ListItem , View, FlatList,TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Api from '../data/Api';

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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
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

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();
    this.api = new Api();
    console.log("Api()->" + Object.keys(this.api));
    this.ref = this.api.responseForHelp(helpee.name);
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
      messages.push({
        key: doc.id,
        user:  doc.data().user,
        skills:  doc.data().skills.join(','),
        location:  doc.data().location.latitude + ":" + doc.data().location.longitude
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

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={({item}) => <>
          <Text style={styles.item}>{item.user}</Text>
          </>
        }
        />
      </ScrollView>
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
