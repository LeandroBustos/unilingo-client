import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA5mVaG_R13LXUCDeHUqr5YasJX6tO1sSM",
	projectId: "mindco-c3cf8",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();