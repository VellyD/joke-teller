const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: "8fddb9759b1d4d269902bc66bc8a1b65",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const jokesAPI = "https://v2.jokeapi.dev/joke/Programming";

  try {
    const response = await fetch(jokesAPI);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMeAJoke(joke);
    toggleButton();
  } catch (err) {
    alert("Server error" + err);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
