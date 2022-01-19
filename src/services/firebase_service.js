import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9rp0vcsXHy3r72jZG03y6GxIifgaggcg",
  authDomain: "o-media-rider.firebaseapp.com",
  projectId: "o-media-rider",
  storageBucket: "o-media-rider.appspot.com",
  messagingSenderId: "730455314422",
  appId: "1:730455314422:web:aeecf7cd6aaec750c101d7"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
  

export const addBrand = async (body) => {
    const {brand, logo} = body;
    const url = await storage.ref(`/brands/${logo[0].name}`).put(logo[0]).then((data) => data.ref.getDownloadURL())
    return db.collection("brands").add({brand, logo: url});
}

export const getBrands = async () => {
  const result = await db.collection("brands").get();
  return result.docs.map(item => ({...item.data(), id: item.id}));
}

export const removeBrand = async (id) => {
  return db.collection("brands").doc(id).delete()
}