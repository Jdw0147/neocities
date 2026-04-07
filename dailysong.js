async function loadDailySong() {
  try {
    const response = await fetch('songs.json');
    const data = await response.json();

    // Calculate today's day of year
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Get today and yesterday's songs using "num" field
    const todaySong = data.songs.find(s => s.num === dayOfYear);
    const yesterdaySong = data.songs.find(s => s.num === dayOfYear - 1 || (dayOfYear === 1 && s.num === 365));

    if (todaySong) {
      document.querySelector('[data-song="today-title"]').textContent = todaySong.title;
      document.querySelector('[data-song="today-artist"]').textContent = todaySong.artist;
      document.querySelector('[data-song="today-image"]').src = todaySong.image;
      document.querySelector('[data-song="today-image"]').alt = todaySong.album;
    }

    if (yesterdaySong) {
      document.querySelector('[data-song="yesterday-title"]').textContent = yesterdaySong.title;
      document.querySelector('[data-song="yesterday-artist"]').textContent = yesterdaySong.artist;
      document.querySelector('[data-song="yesterday-image"]').src = yesterdaySong.image;
      document.querySelector('[data-song="yesterday-image"]').alt = yesterdaySong.album;
    }
  } catch (error) {
    console.error('Failed to load daily song:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadDailySong);