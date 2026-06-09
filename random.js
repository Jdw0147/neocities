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
});