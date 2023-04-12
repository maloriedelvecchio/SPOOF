

/*--------------- Setup - Firebase -------------*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
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

function readSpinData(value) {
  const db = getDatabase();
  set(ref(db, 'spinData/' + 1), {
    value
  });
  }


  function validateGuess() {
    let x = document.forms["guessForm"]["text-input"].value;
    if (x == readSpinData(i.value)) {
      alert("Correct");
      return true;
    }
  }


 // readSpinData(i.value)


/*--------------- Write Data - Player -------------*/

function writeSpinData(value) {
  const db = getDatabase();
  set(ref(db, 'spinData/' + 1), {
    value
  });
  }
/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "You are brushing your teeth" },
  { minDegree: 31, maxDegree: 60, value: "You are doing a magic trick" },
  { minDegree: 0, maxDegree: 30, value: "You are playing the piano" },
  { minDegree: 331, maxDegree: 360, value: "You are playing basketball" },
  { minDegree: 301, maxDegree: 330, value: "You are taking a selfie" },
  { minDegree: 271, maxDegree: 300, value: "You are doing a yoga pose" },
  { minDegree: 241, maxDegree: 270, value: "You are baking a cake" },
  { minDegree: 211, maxDegree: 240, value: "You are walking a dog" },
  { minDegree: 181, maxDegree: 210, value: "You are opening a present" },
  { minDegree: 151, maxDegree: 180, value: "You are playing video games" },
  { minDegree: 121, maxDegree: 150, value: "You are fishing" },
  { minDegree: 91, maxDegree: 120, value: "You are rock climbing" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Act as if "${i.value}" </p>`;
      writeSpinData(i.value)
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Get ready to Spoof!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */





