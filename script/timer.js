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

/*--------------- Write Data - Player (Dave & Malorie w/Help) -------------*/

function writeGameOn(value) {
  const db = getDatabase();
  set(ref(db, 'gameOn/'), {
    value
  });
}

/*-------------- Read Data - Game On (Dave & Malorie w/Help) --------------*/

async function readGameOn(){
  const dbRef = ref(getDatabase());
  const response = await get(child(dbRef, `gameOn/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());              // writes prompt as value 
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return response;
}

/*--------------- Read Timestamp from Actor (Malorie) -------------*/

async function readTimeStamp(){
  const dbRef = ref(getDatabase());
  const storedTime = await get(child(dbRef, `timeStamp/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());              // writes prompt as value -------// object(i) is "Correct prompt" if correct and {value: 'Correct prompt'} if not correct
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return storedTime;
}

/*--------------- Calculate Time Remaining (Malorie) -- FOR WAITING PAGE -------------*/

function checkTimerState() {
  readGameOn().then(function (response) {
    console.log(response);
    if (response.value) {
      readTimeStamp().then(function (storedTime) {
        console.log(storedTime);
        const difference = Date.now() - storedTime.value;
        const elapsed = Math.floor(difference / 1000);
        let time = 180 - elapsed;
        console.log(time);
        
        function updateTimer() {
          let minutes = Math.floor(time / 60);
          let seconds = time % 60;

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          const timer = document.getElementById("timer");
          timer.innerHTML = `${minutes}:${seconds}`;

          if (time === 0) {
            clearInterval(countdownInterval);
            writeGameOn(false);
            window.location.href = "role.html";
          }

          time--;
        }
        let countdownInterval = setInterval(updateTimer, 1000);
      });
    }
  })
};

/*--------------- Refresh Time (Malorie) -------------*/

$(document).ready(function(){
  $(document).ready(function(){
    setInterval(checkGameState, 1000); /// this one calls the function every second
  });
  checkTimerState();
});