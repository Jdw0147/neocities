const randomLinks = [
  { url: 'music.html', name: 'Music Page' },
  { url: 'sotd.html', name: 'Song of the Day' },
  { url: 'pokemon.html', name: 'Pokemon Page' }
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
});