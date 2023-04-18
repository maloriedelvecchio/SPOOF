

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
/*--------------- Read Data - Guesser -------------*/

async function readSpinData(){
  const dbRef = ref(getDatabase());
  const response = await get(child(dbRef, `spinData/1`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return response;
}


 // readSpinData(i.value)


/*--------------- Write Data - Player -------------*/

function writeSpinData(value) {
  const db = getDatabase();
  set(ref(db, 'spinData/' + 1), {
    value
  });
  }

  /--------------- Validation of the answers -------------/
  function generateVariations(answer) {
   const baseAnswer = answer.toLowerCase();
   const variations = [
     baseAnswer,
     baseAnswer.replace("you are ", ""),
     baseAnswer.replace("you are ", "you're "),
     baseAnswer.replace(/ /g, ''), // remove spaces
     baseAnswer.replace(/ /g, '-') // replace spaces with hyphens
   ];
   return variations;
 }

 function checkAnswer(userInput, correctAnswer) {
   userInput = userInput.toLowerCase();
   correctAnswer = correctAnswer.toLowerCase();
   const variations = generateVariations(correctAnswer);

   for (let i = 0; i < variations.length; i++) {
     if (userInput === variations[i]) {
       return true; // Correct answer
     }
   }
   return false; // Incorrect answer
 }


 document.getElementById("guessForm").addEventListener("submit", function(e){
 e.preventDefault();
 let x = document.forms["guessForm"]["text-input"].value;
 readSpinData().then(function (response){
   console.log(x);
   console.log(response);
   if (checkAnswer(x, response.value)) {
     alert("Correct");
     return true;
   }
   else {
     alert("Not Correct");
   }
 })
});
   abc