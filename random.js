const randomLinks = [
  { url: 'music.html', name: 'Music Page' },
  { url: 'music-videos.html', name: 'Music Video Page' },
  { url: 'live-music.html', name: 'Live Music Page' },
  { url: 'sotd.html', name: 'Song of the Day' },
  { url: 'pokemon.html', name: 'Pokemon Page' },
  { url: 'guestbook.html', name: 'Guestbook' },
  { url: 'how/backroom.html', name: 'Backroom Page' },
  { url: 'how/how.html', name: 'How Did He Do That?' },
  { url: 'book/book.html', name: 'The Tome'},
  { url: 'links.html', name: 'Links & Resources' },
  { url: 'library.html', name: 'Library' },
  { url: 'book-library.html', name: 'Books' },
  { url: 'movies.html', name: 'Movies' },
  { url: 'radio/radio.html', name: 'Radio' }
];

document.addEventListener('DOMContentLoaded', () => {
  const randomLink = document.querySelector('.icon-link-item:first-child .icon-link');

  if (randomLink) {
    randomLink.addEventListener('click', (e) => {
      e.preventDefault();
      const randomPage = randomLinks[Math.floor(Math.random() * randomLinks.length)];
      window.location.href = randomPage.url;
    });
  }

  // Margin ads: 1/3 chance of showing on each page load
  if (Math.random() < 1/3) {
    const rightAd = document.getElementById('margin-ad-right');
    if (rightAd) rightAd.classList.add('visible');
  }

  // Left margin ad: 1/5 chance of showing on each page load
  if (Math.random() < 1/5) {
    const leftAd = document.getElementById('margin-ad-left');
    if (leftAd) leftAd.classList.add('visible');
  }
});

// Peter Alert
const petericon = document.getElementById('peter-icon');
if (petericon) {
  petericon.addEventListener('click', peterAlert);
  const okbtn = document.getElementById('peter-btn');
  if (okbtn) {
    okbtn.addEventListener('click', closePeterAlert);
  }
}

function peterAlert() {
  let peter = document.getElementById('peter-alert');
  peter.style.display = 'flex';
}

function closePeterAlert() {
  let peter = document.getElementById('peter-alert');
  peter.style.display = 'none';
}

// Retep Alert
const retepicon = document.getElementById('retep-icon');
if (retepicon) {
  retepicon.addEventListener('click', retepAlert);
  const okbtn = document.getElementById('retep-btn');
  if (okbtn) {
    okbtn.addEventListener('click', closeRetepAlert);
  }
}

function retepAlert() {
  let retep = document.getElementById('retep-alert');
  retep.style.display = 'flex';
}

function closeRetepAlert() {
  let retep = document.getElementById('retep-alert');
  retep.style.display = 'none';
}