const audioInfoArray = [
  { name: 'Another Love', artist: 'Tom Odell', file: 'audio/anotherlove.mp3', image: 'images/anotherlove.jpg' },
  { name: 'All Of Me', artist: 'John Legend', file: 'audio/allofme.mp3', image: 'images/allofme.jpg' },
  { name: 'Thinking Out Loud', artist: 'Ed Sheeran', file: 'audio/x.mp3', image: 'images/x.jpg' },
  { name: 'Let Her Go', artist: 'Passenger', file: 'audio/lethergo.mp3', image: 'images/lethergo.jpg' },
  { name: '7 Years', artist: ' Lukas Graham', file: 'audio/7years.mp3', image: 'images/7years.jpg' },
  { name: 'Save Your Tears ', artist: 'Save Your Tears', file: 'audio/saveyourtears.mp3', image: 'images/saveyourtears.jpg' },
  { name: 'Perfect', artist: 'Ed Sheeran', file: 'audio/perfect.mp3', image: 'images/perfect.jpg' },
  { name: 'Flowers', artist: 'Miley Cyrus', file: 'audio/Flowers.mp3', image: 'images/Flowers.jpg' },
  { name: 'Shape of You', artist: 'Ed Sheeran', file: 'audio/ShapeofYou.mp3', image: 'images/ShapeofYou.jpg' },
  { name: 'The Scientist', artist: 'Coldplay', file: 'audio/ShapeofYou.mp3', image: 'images/TheScientist.jpg' },
  { name: 'Someone You Loved', artist: 'Lewis Capaldi', file: 'audio/SomeoneYouLoved.mp3', image: 'images/SomeoneYouLoved.webp' },
  { name: 'Daylight', artist: 'David Kushner', file: 'audio/Daylight.mp3', image: 'images/Daylight.webp' },
  { name: 'As It Was', artist: 'Harry Styles', file: 'audio/AsItWas.mp3', image: 'images/AsItWas.webp' },
  { name: 'Secrets', artist: 'Paul Damixie', file: 'audio/Secrets.mp3', image: 'images/Secrets.webp' },
  { name: 'Youre Beautiful', artist: 'James Blunt', file: 'audio/YoureBeautiful.mp3', image: 'images/YoureBeautiful.webp' },
  { name: 'Rolling in the Deep', artist: 'Adele', file: 'audio/RollingintheDeep.mp3', image: 'images/RollingintheDeep.webp' },
];



const audioArray = audioInfoArray.map(music => new Audio(music.file));
const musicContainer = document.getElementById('musicContainer');
const timerElement = document.getElementById('timer');
const timeSlider = document.getElementById('timeSlider');
let intervalId;
let activeIndex = null;

function createMusicElement(index) {
  const music = audioInfoArray[index];

  const musicElement = document.createElement('div');
  musicElement.classList.add('music1');

  musicElement.innerHTML = `
    <img src="${music.image}" alt="" class="img">
    <h2>${music.name}</h2>
    <h4>${music.artist}</h4>
    <center><img src="icons/play.png" alt="" class="play" id="playPauseImage${index}" onclick="toggleAudio(${index})"></center>
  `;

  return musicElement;
}

audioInfoArray.forEach((_, index) => {
  musicContainer.appendChild(createMusicElement(index));
});

timeSlider.addEventListener('input', function () {
  const seekTime = parseInt(this.value, 10);
  audioArray[activeIndex].currentTime = seekTime;
  updateTimer(activeIndex);
});

function toggleAudio(index) {
  if (activeIndex !== null && activeIndex !== index) {
    audioArray[activeIndex].pause();
    document.getElementById(`playPauseImage${activeIndex}`).src = 'icons/play.png';
  }

  if (activeIndex === index && !audioArray[index].paused) {
    audioArray[index].pause();
    document.getElementById(`playPauseImage${index}`).src = 'icons/play.png';
  } else {
    audioArray[index].currentTime = 0;
    audioArray[index].play();
    updateTimer(index);
    document.getElementById(`playPauseImage${index}`).src = 'icons/pause.png';
  }

  activeIndex = (activeIndex === index) ? null : index;
}

// ...

function updateTimer(index) {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (activeIndex === index && !audioArray[index].paused) {
      const duration = audioArray[index].duration;
      const currentTime = audioArray[index].currentTime;
      const musicName = audioInfoArray[index].name;
      const musicImage = audioInfoArray[index].image;
      timerElement.innerHTML = `<strong>${musicName}</strong>: ${formatTime(currentTime)} / ${formatTime(duration)}`;
      timeSlider.max = duration;
      timeSlider.value = currentTime;
      const currentTrackImage = document.getElementById('currentTrackImage');
      currentTrackImage.src = musicImage;
    }
  }, 1000);
}

// ...


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function nextTrack() {
  if (activeIndex !== null) {
    const nextIndex = (activeIndex + 1) % audioArray.length;
    toggleAudio(nextIndex);
  }
}
function previousTrack() {
  if (activeIndex !== null) {
    const previousIndex = (activeIndex - 1 + audioArray.length) % audioArray.length;
    toggleAudio(previousIndex);
  }
}

function nextTrack() {
  if (activeIndex !== null) {
    const nextIndex = (activeIndex + 1) % audioArray.length;
    toggleAudio(nextIndex);
  }
}
audioArray.forEach((audio, index) => {
  audio.addEventListener('ended', () => {
    const nextIndex = (index + 1) % audioArray.length;
    toggleAudio(nextIndex);
  });
});


