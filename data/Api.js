import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyCH5IYjd7JovKj41hKzy8OuhErVWU9Wvlc",
  authDomain: "resq-db.firebaseapp.com",
  databaseURL: "https://resq-db.firebaseio.com",
  projectId: "resq-db",
  storageBucket: "resq-db.appspot.com",
  messagingSenderId: "882838639057"
};
firebase.initializeApp(config);


export class Help {

constructor(user, message, emergency, datetime, vehicle, lat, long) {
    this.user = user;
    this.message = message;
    this.emergency = emergency;
    this.datetime = datetime;
    this.vehicle = vehicle;
    this.lat = lat;
    this.long = long;
  }

}

export default class Api{

  constructor() {
    console.log("Constructing the Api...");
    this.db = firebase.firestore();
  }

  // insertSampleRowInFireStore = () => {
  //
  //  console.log("Trying to save the Sample User data");
  //
  //   var help = new Help('feroz','i m in a pickle', 'prod-issue', new Date(),'RAV4', 34234 ,2341234)
  //
  //   console.log(JSON.stringify(help))
  //   this.db.collection("help-requests").add({
  //     user: help.user,
  //     message: help.message,
  //     emergency: help.emergency,
  //     datetime: help.datetime,
  //     vehicle: help.vehicle,
  //     lat: help.lat,
  //     long: help.long
  //   })
  //     .then(function(docRef) {
  //         console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function(error) {
  //         console.error("Error adding document: ", error);
  //     });
  // }

  askForHelp = (user, message, emergency, datetime, vehicle, lat, long) => {

    this.db.collection("help-requests").add({
      user: user,
      message: message,
      emergency: emergency,
      datetime: datetime,
      vehicle: vehicle,
      lat: lat,
      long: long
    })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

  }

  callForHelps = (helpee) => {
      console.log("callForHelps:", helpee);
      return this.db.collection("users/" + helpee + "/callForHelp");
  }

  responseForHelp = (helpee) => {
      console.log("responseForHelp:", helpee);
      return this.db.collection("users/" + helpee + "/responseForHelp");
  }

  respondToHelp = (user, documentId) => {
      console.log("respondToHelp:", user, documentId);
      var docRef = this.db.collection("users/" + user + "/callForHelp").doc(documentId);

      var setWithMerge = docRef.set({
          accepted: true
      }, { merge: true });
  }


  recieveRow = () => {
   console.log("Trying to query the Sample User data");
   return this.db.collection("users");
  }

}
