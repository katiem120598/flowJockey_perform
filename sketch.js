let points = [];
let shapes = [];
let normpoints = [];
let normshapes = [];
let clientnum = 0;
let mode = "grid"; // Default mode
const serverAddress = "wss://flowjockey-server.onrender.com";
const ws = new WebSocket(serverAddress);
const bass = document.getElementById("bass");
const mid = document.getElementById("mid");
const treble = document.getElementById("treble");
const lowThresh = document.getElementById("low-thresh");
const midThresh = document.getElementById("mid-thresh");
const highThresh = document.getElementById("high-thresh");
const lowSlider = document.getElementById("low-thresh");
const lowInput = document.getElementById("low-thresh-input");

// --- SYNC SLIDER <-> INPUT BOX ---
lowSlider.addEventListener("input", () => {
  lowInput.value = lowSlider.value;
});
lowInput.addEventListener("input", () => {
  lowSlider.value = lowInput.value;
});

const playpause = document.getElementById("playButton")

document.addEventListener("DOMContentLoaded", function () {
  // Attach the event listener to each radio button with the name 'mode'
  const startDraw = document.createElement("text")
  const modeOptions = document.getElementsByName("mode");
  modeOptions.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        mode = this.value;
        console.log("Selected mode:", mode);

        // Send the mode change to the server
        const modeswitch = { type: "modeswitch", mode: mode };
        ws.send(JSON.stringify(modeswitch));
      }
    });
  });
});

bass.addEventListener("input", function () {
  console.log("Current slider value:", bass.value);
  const modeswitch = { type: "bassval", val:bass.value};
  ws.send(JSON.stringify(modeswitch));
  // Update some real-time display or effect
});

mid.addEventListener("input", function () {
  // Update some real-time display or effect
  const modeswitch = { type: "midval",val:mid.value };
  ws.send(JSON.stringify(modeswitch));
});
treble.addEventListener("input", function () {
  const modeswitch = { type: "trebleval", val:treble.value };
  ws.send(JSON.stringify(modeswitch));
  // Update some real-time display or effect
});
lowThresh.addEventListener("input", function () {
  console.log("Current slider value:", lowThresh.value);
  const modeswitch = { type: "lowthreshval", val:lowThresh.value};
  ws.send(JSON.stringify(modeswitch));
  // Update some real-time display or effect
});

midThresh.addEventListener("input", function () {
  // Update some real-time display or effect
  const modeswitch = { type: "midthreshval",val:midThresh.value };
  ws.send(JSON.stringify(modeswitch));
});
highThresh.addEventListener("input", function () {
  const modeswitch = { type: "highthreshval", val:highThresh.value };
  ws.send(JSON.stringify(modeswitch));
  // Update some real-time display or effect
});
playpause.addEventListener("click", function () {
  const playpause = { type: "playpause", val:"pressed" };
  ws.send(JSON.stringify(playpause));
  // Update some real-time display or effect
});

// WebSocket connection setup
ws.onopen = function () {
  // Send initial client info when the WebSocket connection opens
  const clientdata = { type: "client_info", app: "perform" };
  ws.send(JSON.stringify(clientdata));
  console.log("I just connected to the server on " + serverAddress);
};

// Handling messages from server
ws.onmessage = function (event) {
  // Process server messages here
  console.log("Message from server:", event.data);
};
