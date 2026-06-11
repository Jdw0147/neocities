const randomLinks = [
  { url: 'music.html', name: 'Music Page' },
  { url: 'sotd.html', name: 'Song of the Day' },
  { url: 'pokemon.html', name: 'Pokemon Page' },
  { url: 'guestbook.html', name: 'Guestbook' }
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