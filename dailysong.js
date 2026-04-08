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

    // Format dates
    const todayDateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateString = yesterday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Get today and yesterday's songs using "num" field
    const todaySong = data.songs.find(s => s.num === dayOfYear);
    const yesterdaySong = data.songs.find(s => s.num === dayOfYear - 1 || (dayOfYear === 1 && s.num === 365));

    // Update today's label with date
    const todayLabel = document.querySelector('[data-song="today-title"]').parentElement.querySelector('strong');
    if (todayLabel) {
      todayLabel.textContent = `Today's Pick (${todayDateString})`;
    }

    // Update yesterday's label with date
    const yesterdayLabel = document.querySelector('[data-song="yesterday-title"]').parentElement.querySelector('strong');
    if (yesterdayLabel) {
      yesterdayLabel.textContent = `Yesterday's (${yesterdayDateString})`;
    }

    // Handle today's song - show "TBA" if not found
    if (todaySong) {
      document.querySelector('[data-song="today-title"]').textContent = todaySong.title;
      document.querySelector('[data-song="today-artist"]').textContent = todaySong.artist;
      document.querySelector('[data-song="today-image"]').src = todaySong.image;
      document.querySelector('[data-song="today-image"]').alt = todaySong.album;
    } else {
      document.querySelector('[data-song="today-title"]').textContent = 'TBA';
      document.querySelector('[data-song="today-artist"]').textContent = 'Coming soon...';
      document.querySelector('[data-song="today-image"]').src = '';
      document.querySelector('[data-song="today-image"]').alt = '';
    }

    // Handle yesterday's song with album cover
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