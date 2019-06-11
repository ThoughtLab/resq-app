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

export default class HelperScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();
    this.api = new Api();
    console.log("Api()->" + Object.keys(this.api));
    this.ref = this.api.callForHelps('asim');
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

  }

  help(documentId) {
    console.log('HelpeeScreen:help', documentId);
    var api = new Api();
    api.respondToHelp('asim', documentId);
  }

  componentDidMount() {
    console.log("F()->" + (this.ref));
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  display(item) {
    if(!item.accepted){
      console.log('display()');
      return <TouchableOpacity onPress={() => this.help(item.key)} style={styles.helpLink}>
      <Text style={styles.helpLinkText}>I wanna help!</Text>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity style={styles.helpLink}>
      <Text style={styles.helpLinkText}>Thanks Mate!</Text>
      </TouchableOpacity>
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

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={({item}) => <>
          <Text style={styles.item}>{item.msg}</Text>
          <View style={styles.helpContainer}>
            {this.display(item)}
          </View>
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
