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
    image: "",
    path: "https://s17.aconvert.com/convert/p3r68-cdx67/qgsi0-nuz62.mp3"
  },
  {
    name: "Shayad",
    artist: "Pritam, Arijit Singh",
    image: "",
    path: "https://s19.aconvert.com/convert/p3r68-cdx67/bxqru-xouzy.mp3"
  },
  {
    name: "Jhoome Jo Pathaan",
    artist: "Arijit Singh, Sukriti Kakar",
    image: "",
    path: "https://s19.aconvert.com/convert/p3r68-cdx67/jfftn-ohkmz.mp3"
  },
  {
    name: "Naina",
    artist: "Diljit Dosanjh",
    image: "",
    path: "https://s21.aconvert.com/convert/p3r68-cdx67/r0rji-dew7f.mp3"
  },
 {
    name: "Tere Pyar Mein",
    artist: "Arijit Singh, Nikhita Gandhi",
   image: "",
   path: "https://s31.aconvert.com/convert/p3r68-cdx67/05bzw-m5bei.mp3"
  },
  {
    name: "Jamna Paar",
    artist: "Tony Kakkar, Neha Kakkar, Tony Jr",
    image: "",
    path: "https://s19.aconvert.com/convert/p3r68-cdx67/kih1x-j8sbq.mp3"
  },
  {
    name: "Aaj Ki Raat",
    artist: "Madhubanti Bagchi, Divya Kumar",
    image: "",
    path: "https://s31.aconvert.com/convert/p3r68-cdx67/mqxcr-t3g64.mp3"
  },
  {
    name: "Husan Tera Tauba Tauba",
    artist: "Karan Aujla",
    image: "",
    path: "https://s3.aconvert.com/convert/p3r68-cdx67/w4j5j-3amnn.mp3"
  },
  {
    name: "Kar Gayi Chull",
    artist: "Badshah, Amaal Mallik, Fazilpuria, Sukriti Kakar, Neha Kakkar",
    image: "",
    path: "https://s31.aconvert.com/convert/p3r68-cdx67/ugz9z-5yy6s.mp3"
  },
  {
    name: "Badtameez Dil",
    artist: "Pritam, Benny Dayal, Shefali Alvares",
    image: "",
    path: "https://s17.aconvert.com/convert/p3r68-cdx67/7njjb-7u8j9.mp3"
  },
  {
    name: "Subhanallah",
    artist: "Pritam, Sreerama Chandra, Shilpa Rao",
    image: "",
    path: "https://s51.aconvert.com/convert/p3r68-cdx67/yoou7-bi2kj.mp3"
  }
];

// Array for background images (independent of music)
let background_images = [
  "https://i.pinimg.com/736x/2d/a9/c4/2da9c4f0d49127e870ba28f8db2c848c.jpg",
  "https://i.pinimg.com/736x/64/fc/f4/64fcf4cb00b65b7c014ba4b9735b3064.jpg",
  "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
  "https://i.pinimg.com/736x/f6/52/b4/f652b4aa020ed9565dda599b98932271.jpg",
  "https://i.pinimg.com/736x/f1/31/28/f13128c1d73337f31346af965f7f1b0c.jpg",
  "https://i.pinimg.com/736x/25/f6/02/25f6022c134d0152b382f3c121c4ca58.jpg",
  "https://i.pinimg.com/736x/f9/01/db/f901dba3dd64f8f4ebf7aee73b98ee3c.jpg",
  "https://i.pinimg.com/736x/73/3f/3b/733f3be4b8167b1bf068ca7913a7c298.jpg",
  "https://i.pinimg.com/736x/12/de/87/12de87198cc73cbbc5108384476e8bae.jpg",
  "https://i.pinimg.com/736x/f2/0d/f8/f20df829d3d76b6f2f4478da2d2f4874.jpg",
  "https://i.pinimg.com/736x/ea/6c/23/ea6c23ce2180aaf0f52549b07ea6ea3a.jpg",
  "https://i.pinimg.com/736x/c8/5b/25/c85b259964f99975360a806352829219.jpg"
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
