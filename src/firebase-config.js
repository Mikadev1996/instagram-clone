
const config = {
    apiKey: "AIzaSyA4RFVcvCVa3u4D2IY6xJIYCplfX4H3k7Q",
    authDomain: "instagram-clone-9a4b3.firebaseapp.com",
    projectId: "instagram-clone-9a4b3",
    storageBucket: "instagram-clone-9a4b3.appspot.com",
    messagingSenderId: "239052361470",
    appId: "1:239052361470:web:e4c4d08ed00ca348bd1faf"
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
            'Add your web app\'s configuration object to firebase-config.js');
    } else {
        return config;
    }
}