let lastScrollTop = 0;
let isScrolling;
const banner = document.querySelector('.banner');
const threshold = 50;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;

  if (scrollTop > lastScrollTop && scrollTop > threshold){
    banner.classList.add('hide');
  } else {
    if (scrollTop + clientHeight < scrollHeight) {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        banner.classList.remove('hide');
      }, 5);
    }
  }
  lastScrollTop = scrollTop;
});

const apiKey = 'cf0820a2fe8cd6ae023f229bd9d87a66'; // public information key
const username = 'muckfarcus'; // replace with the username you're interested in

const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;
const defaultImageUrl = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'; // replace with the URL of the default picture

fetch(url)
  .then(response => response.json())
  .then(data => {
    const recentTracks = data.recenttracks.track;
    const mostRecentTrack = recentTracks[0];
    console.log('Most recently played track:', mostRecentTrack);

    const toast = document.getElementById('toast');
    const toastBackground = document.getElementById('toast-background');
    const toastImage = document.getElementById('toast-image');
    const toastSong = document.getElementById('toast-song');
    const toastArtist = document.getElementById('toast-artist');
    const toastDate = document.getElementById('toast-date');

    if (mostRecentTrack.image[3]['#text'] && mostRecentTrack.image[3]['#text'] !== defaultImageUrl) {
      toastBackground.style.backgroundImage = `url(${mostRecentTrack.image[3]['#text']})`;
      toastImage.src = mostRecentTrack.image[3]['#text']; // use the largest image
    } else {
      toastBackground.style.backgroundColor = '#A14848';
      toastImage.src = defaultImageUrl; // use the default image
    }

    toastSong.textContent = `${mostRecentTrack.name}`;
    toastArtist.textContent = `${mostRecentTrack.artist['#text']}`;

    const dateListened = mostRecentTrack.date ? mostRecentTrack.date['#text'] : null;

    if (dateListened) {
      const date = moment(dateListened, 'DD MMM YYYY, HH:mm').subtract(5, 'hours');
      toastDate.textContent = date.fromNow();
    } else {
      toastDate.textContent = 'Just now';
    }

    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');
  })
  .catch(error => console.error('Error:', error));

  