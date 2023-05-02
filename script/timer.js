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

/*---------------- Response to Game On (Dave & Malorie w/Help) ------------------

function checkGameState(){
  readGameOn().then(function (response){                                                     
    console.log(response);

    if(response.value){  
     // btn_role_b.style.pointerEvents = 'none';
    //  btn_role_b.style.cursor = 'default';    
      btn_role_a.style.pointerEvents = 'none';
      btn_role_a.style.cursor = 'default';
      btn_role_a.classList.remove("enabled");
      btn_role_a.classList.add("disabled");
    }
    else {
   //   btn_role_b.style.pointerEvents = 'auto';
   //   btn_role_b.style.cursor = 'pointer';    
      btn_role_a.style.pointerEvents = 'auto';
      btn_role_a.style.cursor = 'pointer';
      btn_role_a.classList.remove("disabled");
      btn_role_a.classList.add("enabled");
    }
  })
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

/*-----------Timer - Original ----------

const timer = document.getElementById("timer");
let time = 180;

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = `${minutes}:${seconds}`;

  if (time === 0) {
    clearInterval(countdownInterval);
  }

  time--;
}

let countdownInterval = setInterval(updateTimer, 1000);

/*---------------------------------Timer (Dave)------------------------------------
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
    }, 1000); */