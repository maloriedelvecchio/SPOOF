/*--------------- Setup - Firebase (Dave & Malorie) -------------*/

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

/*--------------- Write Data - Player (Dave & Malorie w/Help) -------------*/

function writeSpinData(value, index) {
  const db = getDatabase();
  set(ref(db, 'spinData/' + 1), {
    value,
    index
  });
}

function writeGameOn(value) {
    const db = getDatabase();
    set(ref(db, 'gameOn/'), {
      value
    });
}

/* --------------- Spin Wheel (Dave) --------------------- */

const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

/* --------------- Minimum And Maximum Angle For A Value (Dave) --------------------- */

const spinValues = {
  prompt: [
    { minDegree: 61, maxDegree: 90, value: "Brushing your teeth" },
    { minDegree: 31, maxDegree: 60, value: "Doing a magic trick" },
    { minDegree: 0, maxDegree: 30, value: "Playing the piano" },
    { minDegree: 331, maxDegree: 360, value: "Playing basketball" },
    { minDegree: 301, maxDegree: 330, value: "Taking a selfie" },
    { minDegree: 271, maxDegree: 300, value: "Doing a yoga pose" },
    { minDegree: 241, maxDegree: 270, value: "Baking a cake" },
    { minDegree: 211, maxDegree: 240, value: "Walking a dog" },
    { minDegree: 181, maxDegree: 210, value: "Opening a present" },
    { minDegree: 151, maxDegree: 180, value: "Playing video games" },
    { minDegree: 121, maxDegree: 150, value: "Fishing" },
    { minDegree: 91, maxDegree: 120, value: "Rock climbing" },
  ]
}

/* --------------- Size Of Each Piece (Dave) --------------------- */

const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

/* --------------- Background Colors (Dave) --------------------- */

var spinColors = [
  "#ED7657", "#61C9C8","#F7E0B2","#ED7657","#61C9C8","#F7E0B2","#ED7657","#61C9C8","#F7E0B2","#ED7657","#61C9C8","#F7E0B2",
];

/* --------------- Chart (Dave) --------------------- */

let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        borderColor: "#FBF9ED",
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    hover: {mode: null},
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
        display: false,
      },
    },
  },
});

/* --------------- Display Value Based On Angle (Dave) --------------------- */
/* --------------- Change to Prompt (Malorie) --------------------- */


const wheelActive = document.querySelector('#spin-page');
const promptActive = document.querySelector('#prompt-page')
const promptSpot = document.querySelector('#prompt');

const generateValue = (angleValue) => {
  let j = 0;
  for (let i of spinValues.prompt) {
    
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      wheelActive.classList.add("hide");
      promptActive.classList.remove("hide");
      promptSpot.innerHTML = `<p class="prompt">${i.value}</p>`;
      writeSpinData(i.value, j);
      
/* --------------- Start Timer (Dave?) --------------------- */
      
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
      spinBtn.disabled = false;
      break;
    }
    j++
  }
};

/* ---------------- Start Timer ------------------- */



/* --------------- Spinning Code (Dave)--------------------- */

let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  writeGameOn(true);
  spinBtn.disabled = true;
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

/* --------------- No Scroll (Malorie) --------------------- */

function disable_scroll_mobile(){
  document.addEventListener('touchmove', preventDefault, false);
}
function enable_scroll_mobile(){
  document.removeEventListener('touchmove', preventDefault, false);
}

disable_scroll_mobile();
enable_scroll_mobile();