/*--------------- Setup - Firebase (Malorie with some help from Dave) -------------*/

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

/*--------------- Read Data - Guesser (Dave & Malorie w/Help) -------------*/

async function readSpinData(){
  const dbRef = ref(getDatabase());
  const response = await get(child(dbRef, `spinData/1`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());              // writes prompt as value -------// object(i) is "Correct prompt" if correct and {value: 'Correct prompt'} if not correct
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return response;
}

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

/*--------------- Possible Answers (Dave & Malorie) -------------*/

let possibleAnswers = [ 
  ["You are brushing your teeth",   "You're brushing your teeth",   "Brushing teeth",   "Cleaning your teeth",   "Toothbrush"],   
  ["You are doing a magic trick",   "You're doing a magic trick",   "Doing a magic trick",   "Performing a magic trick",   "Magic",   "Casting a spell"],   
  ["You are playing the piano",   "You're playing the piano",   "Playing piano",   "Piano",   "Keyboard"],   
  ["You are playing basketball",   "You're playing basketball",   "Playing basketball",   "Basketball"],   
  ["You are taking a selfie",   "You're taking a selfie",   "Taking selfie",   "Selfie",   "Photo"],   
  ["You are doing a yoga pose",   "You're doing a yoga pose",   "Doing a yoga pose",   "Yoga pose",   "Yoga"],   
  ["You are baking a cake",   "You're baking a cake",   "Baking a cake",   "Making a cake",   "Baking"],   
  ["You are walking a dog",   "You're walking a dog",   "Walking dog",   "Dog walking"],   
  ["You are opening a present",   "You're opening a present",   "Opening a present", "Opening a gift"],
  ["You are playing video games", "You're playing video games", "Playing video games", "Playing Xbox", "Playing Play Station"],
  ["You are fishing", "You're fishing", "Fishing", "Fishing rod"],
  ["You are rock climbing", "You're rock climbing", "Rock climbing", "Climbing"]
];

/*-------------------- Win/Lose (Malorie w/Help) -----------------*/

  document.getElementById("guessForm").addEventListener("submit", function(e){
    e.preventDefault();
    let x = document.forms["guessForm"]["text-input"].value;   //  let x be the text inputted
    readSpinData().then(function (response){                   //  access db and get value
      console.log(x);                                          //  writes x (user input?) to log
      console.log(response);                                   //  writes PROMPT as value ----- // object (i) and value = "Correct prompt" if correct and {value: 'Correct prompt'} if not correct

      if(possibleAnswers[response.index].includes(x)){      
        window.location.href = "guesser_winner.html";
        return true;
      }
        
      else {
        const wrongGuess = document.querySelector('#wrong');
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML = '<p class="score">' + x + '</p>';
        wrongGuess.appendChild(li);
        wrongGuess.classList.remove("hide");
        document.getElementById("guessForm").reset();
      };
    });
  });

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

/*---------------- Response to Game On (Dave & Malorie w/Help) ------------------*/

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
            window.location.href = "guesser_loser.html";
          }

          time--;
        }
        let countdownInterval = setInterval(updateTimer, 1000);
      });
    }
  })
};

function checkGameState(){
  readGameOn().then(function (response){                                                     
    console.log(response);
    if(response.value){  
      document.getElementById("text-input").disabled = false;
      document.getElementById("text-submit").disabled = false;
    }
    else {
      document.getElementById("text-input").disabled = true;
      document.getElementById("text-submit").disabled = true;
    }
  })
}

/*----------------- General (Malorie w/Help) ------------------*/

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  setInterval(checkGameState, 1000); /// this one calls the function every second
  checkTimerState();
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/*--------GUESSER - TIMER--------

// Get a reference to the Firebase Realtime Database
const databaseRef = firebase.database().ref();

// Get the stored timestamp from the Firebase Realtime Database
databaseRef.child('timestamp').once('value', snapshot => {
  const storedTimestamp = snapshot.val();

  // Calculate the difference between the stored timestamp and the current time
  /*const difference = Date.now() - storedTimestamp;

  // Create a timer function to compare the current time with the stored timestamp
  
  const timer = setInterval(() => {
    const elapsed = Date.now() - storedTimestamp - difference;
    console.log(`Elapsed time: ${elapsed} milliseconds`);
  }, 1000);
});*/





