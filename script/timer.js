/* this is a test timer that will be linked to all pages that require a timer, I intend to add the timer data to the firebase to sync the data accross multiple pages.*/ 

/*--------------- Setup - Firebase (Malorie & Dave) -------------*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAS_xn4bBKBHKGKN42sMmFLwiN7Cs2B0nU",
  authDomain: "spoof-5e4ba.firebaseapp.com",
  databaseURL: "https://spoof-5e4ba-default-rtdb.firebaseio.com",
  projectId: "spoof-5e4ba",
  storageBucket: "spoof-5e4ba.appspot.com",
  messagingSenderId: "561624489946",
  appId: "1:561624489946:web:45ff71f1b0ae8209d26ae3",
  measurementId: "G-KJG4WMVYS8"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/*---------------------------------Timer (Dave)------------------------------------*/ 
    var countdownTime = 180;
    
    var countdown = setInterval(function() {
    var minutes = Math.floor(countdownTime / 60);
    var seconds = countdownTime % 60;
      
    var formattedMinutes = String(minutes).padStart(2, '0');
    var formattedSeconds = String(seconds).padStart(2, '0');
      
    document.getElementById('countdown').textContent = formattedMinutes + ':' + formattedSeconds;
      
    countdownTime--;
      
    if (countdownTime < 0) {
    // Stop the countdown
    clearInterval(countdown);
        
    // Display a message when the countdown is over
    document.getElementById('countdown').textContent = 'Time\'s up!';
    }
    }, 1000); 