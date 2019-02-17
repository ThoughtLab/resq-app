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


export default class Api{

  constructor() {
    console.log("Constructing the Api...");
    this.db = firebase.firestore();
  }

  insertSampleRowInFireStore = () => {

   console.log("Trying to save the Sample User data");

    this.db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  }

/*  get db() {
    return this.db;
  }
*/
  recieveRow = () => {
   console.log("Trying to query the Sample User data");
   return this.db.collection("users");
  }

}
