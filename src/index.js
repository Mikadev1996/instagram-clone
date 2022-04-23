import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);

async function getTestData() {
    const testData = collection(db, 'test-data');
    const testSnapshot = await getDocs(testData);
    console.log(testSnapshot);
    const test = testSnapshot.docs.map(doc => doc.data());
    console.log(test);
}

getTestData();

ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

