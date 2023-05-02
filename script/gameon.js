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

/*-------------- Read Data - Game On (Dave & Malorie w/Help) --------------*/

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
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

const startButton = document.getElementById('btn_brown');
  startButton.addEventListener('click', function() {
    checkGameState();
  });

function checkGameState(){
  readGameOn().then(function (response){                                                     
    console.log(response);

    if(response.value){         // game IS on
      window.location.href='waiting.html';
    }
    else {                      // game IS NOT on
      window.location.href='role.html';
    }
  })
}

/*----------------- General (Malorie w/Help) ------------------*/

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
  });
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })