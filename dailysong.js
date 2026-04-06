// Frontend Javascript for loading songs of the day sidebar

async function loadDailySong() {
  try {
    const response = await fetch('songs.json');
    const data = await response.json();

    // Today's song
    const today = data.today;
    document.querySelector('[data-song="today-title"]').textContent = today.title;
    document.querySelector('[data-song="today-artist"]').textContent = today.artist;
    document.querySelector('[data-song="today-image"]').src = today.image;
    document.querySelector('[data-song="today-image"]').alt = today.album;

    // Yesterday's song
    const yesterday = data.yesterday;
    document.querySelector('[data-song="yesterday-title"]').textContent = yesterday.title;
    document.querySelector('[data-song="yesterday-artist"]').textContent = yesterday.artist;
  } catch (error) {
    console.error('Failed to load daily song:', error);
  }
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadDailySong);