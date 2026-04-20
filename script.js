let songs;
const audio = new Audio("https://pagalnew.com/320-download/52483");
const playButton = document.getElementById("playPauseBtn");
const songContainer = document.getElementById("playlist");
playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  checkAudioState()
});

async function fetchSongs() {
  isloading = true;
  try {
    const res = await fetch(
      "https://sangeet-3-backend.onrender.com/api/ashay/musics",
    );
    const data = await res.json();
    songs = data;
    await manipulateSongs(data);
  } catch (error) {
    alert("Failed to fetch songs. Please try again later.");
  } finally {
    isloading = false;
  }
  checkLoading();
}

function checkLoading() {
  if (isloading) {
    songContainer.innerHTML = "<p>Loading songs...</p>";
  }
}

fetchSongs();

async function manipulateSongs(songs) {
  songContainer.innerHTML = "";

  for (const element of songs) {
    // const artistName = await fetchArtistName(element.artists);
    songContainer.innerHTML += `
         <div class="playlist-item" onclick="playSong('${element.audioUrl}')">
                    <img src="${element.coverImage}" alt="Aayi Re Mere Yaar Holi Khelne Ko" class="track-image">
                    <div class="track-info">
                        <h3>${element.name}</h3>
                        <p>${element.artists}</p>
                    </div>
                   
                </div>
        `;
  }
}

function playSong(url) {
  audio.src = url;
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  checkAudioState()
}




function checkAudioState(){
    if (audio.paused) {
        console.log("Audio is paused");
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        console.log("Audio is playing");

        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}
