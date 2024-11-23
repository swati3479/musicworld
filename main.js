let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_front = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

// Array for music tracks
let track_list = [
  {
    name: "Lo Maan Liya",
    artist: "Arijit Singh",
    path: "https://s17.aconvert.com/convert/p3r68-cdx67/qgsi0-nuz62.mp3"
  },
  {
    name: "Shayad",
    artist: "Pritam, Arijit Singh",
    path: "https://s19.aconvert.com/convert/p3r68-cdx67/bxqru-xouzy.mp3"
  },
  {
    name: "Jhoome Jo Pathaan",
    artist: "Arijit Singh, Sukriti Kakar",
    path: "https://s19.aconvert.com/convert/p3r68-cdx67/jfftn-ohkmz.mp3"
  },
  {
    name: "Naina",
    artist: "Diljit Dosanjh",
    path: "https://s21.aconvert.com/convert/p3r68-cdx67/r0rji-dew7f.mp3"
  },
    {
    name: "Tere Pyar Mein",
    artist: "Arijit Singh, Nikhita Gandhi",
   path: "https://s31.aconvert.com/convert/p3r68-cdx67/05bzw-m5bei.mp3"
  },
      {
    name: "",
    artist: "",
    path: ""
  },
        {
    name: "",
    artist: "",
    path: ""
  },
          {
    name: "",
    artist: "",
    path: ""
  },
            {
    name: "",
    artist: "",
    path: ""
  },
              {
    name: "",
    artist: "",
    path: ""
  },
                {
    name: "",
    artist: "",
    path: ""
  },
                  {
    name: "",
    artist: "",
    path: ""
  },
];

// Array for background images (independent of music)
let background_images = [
  "https://i.pinimg.com/736x/2d/a9/c4/2da9c4f0d49127e870ba28f8db2c848c.jpg",
  "https://i.pinimg.com/736x/64/fc/f4/64fcf4cb00b65b7c014ba4b9735b3064.jpg",
  "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
  "https://i.pinimg.com/736x/f6/52/b4/f652b4aa020ed9565dda599b98932271.jpg",
  "https://i.pinimg.com/736x/f1/31/28/f13128c1d73337f31346af965f7f1b0c.jpg",
  "https://i.pinimg.com/736x/25/f6/02/25f6022c134d0152b382f3c121c4ca58.jpg",
];

function loadTrack(track_front) {
  clearInterval(updateTimer);
  resetValues();

  // Load the current track
  curr_track.src = track_list[track_front].path;
  curr_track.load();

  // Update UI
  track_art.style.backgroundImage = "url(" + track_list[track_front].image + ")";
  track_name.textContent = track_list[track_front].name;
  track_artist.textContent = track_list[track_front].artist;
  now_playing.textContent = "PLAYING " + (track_front + 1) + " OF " + track_list.length;

  // Update the background with an unrelated image
  let bg_image = background_images[track_front % background_images.length];
  document.body.style.backgroundImage = "url(" + bg_image + ")";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  // Start updating the seek bar
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track on page load
loadTrack(track_front);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  track_front = (track_front + 1) % track_list.length;
  loadTrack(track_front);
  playTrack();
}

function prevTrack() {
  track_front = (track_front - 1 + track_list.length) % track_list.length;
  loadTrack(track_front);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime % 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration % 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
