/*--------------- Setup - Firebase -------------*/

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
async function readGameOn(){
  const dbRef = ref(getDatabase());
  const response = await get(child(dbRef, `gameOn/`)).then((snapshot) => {
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

function checkGameState(){
  readGameOn().then(function (response){                   //  access db and get value                                      //  writes x (user input?) to log
    console.log(response);                                   //  writes PROMPT as value ----- // object (i) and value = "Correct prompt" if correct and {value: 'Correct prompt'} if not correct

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


$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
    setInterval(checkGameState, 1000); /// this one calls the function every second
  });
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })