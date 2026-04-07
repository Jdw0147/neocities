async function loadSongCalendar() {
  try {
    console.log('Loading songs.json...');
    const response = await fetch('songs.json');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Songs loaded:', data.songs.length);

    // Calculate today's day of year
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    console.log('Day of year:', dayOfYear);

    const calendar = document.getElementById('sotdCalendar');
    console.log('Calendar element found:', !!calendar);
    calendar.innerHTML = '';

    data.songs.forEach(song => {
      console.log('Creating div for day', song.num);
      const dayDiv = document.createElement('div');
      dayDiv.className = 'song-day';
      dayDiv.setAttribute('data-day', song.num);
      dayDiv.setAttribute('title', `Day ${song.num}: ${song.title} - ${song.artist}`);

      if (song.num === dayOfYear) {
        dayDiv.classList.add('today');
        dayDiv.setAttribute('id', 'today-song');
      }

      const img = document.createElement('img');
      img.src = song.image;
      img.alt = song.album;
      img.loading = 'lazy';

      dayDiv.appendChild(img);

      dayDiv.addEventListener('click', () => {
        alert(`${song.title}\nby ${song.artist}\nfrom ${song.album}`);
      });

      calendar.appendChild(dayDiv);
    });

    const todaySong = document.getElementById('today-song');
    if (todaySong) {
      todaySong.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } catch (error) {
    console.error('Failed to load song calendar:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadSongCalendar);