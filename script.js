// Speech Recognition setup
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert("Your browser does not support voice recognition!");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  const status = document.getElementById("status");

  // When listening starts
  recognition.onstart = () => {
    status.innerText = "🎙️ Jarvis is listening...";
  };

  // When result comes
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    status.innerText = `🗣️ You said: ${command}`;
    console.log("Heard:", command);
  };

  // On stop or error
  recognition.onerror = (event) => {
    status.innerText = `❌ Error: ${event.error}`;
  };

  recognition.onend = () => {
    status.innerText = "✅ Listening stopped.";
  };

  // Start button event
  document.getElementById("start-btn").addEventListener("click", () => {
    recognition.start();
  });
}
