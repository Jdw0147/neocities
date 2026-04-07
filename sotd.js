async function loadSongCalendar() {

  // Map months to their background GIFs
  const monthBackgrounds = {
    'January': '/backgrounds/moving/stars3.gif',
    'February': '/backgrounds/moving/pink-lines.gif',
    'March': '/backgrounds/static/trees.gif',
    'April': '/backgrounds/moving/leaves.gif',
    'May': '/backgrounds/static/clouds.gif',
    'June': '/backgrounds/static/water.gif',

  };

  try {
    const response = await fetch('songs.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // Group songs by month
    const songsByMonth = {};
    data.songs.forEach(song => {
      // Extract month from date like "January 1st, 2026"
      const month = song.date.split(' ')[0];  // Gets "January"

      if (!songsByMonth[month]) {
        songsByMonth[month] = [];
      }
      songsByMonth[month].push(song);
    });

    // Define month order
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    const calendar = document.getElementById('sotdCalendar');
    calendar.innerHTML = '';

    // Today calculation
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Render each month in order
    monthOrder.forEach(month => {
      if (songsByMonth[month]) {
        // Create month container with background
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        monthContainer.setAttribute('data-month', month);

        // Set background if defined
        if (monthBackgrounds[month]) {
          monthContainer.style.backgroundImage = `url('${monthBackgrounds[month]}')`;
        }

        // Add month heading
        const heading = document.createElement('div');
        heading.className = 'month-heading';
        heading.textContent = month.toUpperCase();
        monthContainer.appendChild(heading);

        // Wrapper for songs grid
        const songsGrid = document.createElement('div');
        songsGrid.className = 'month-songs';

        // Add songs for this month
        songsByMonth[month].forEach(song => {
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

          songsGrid.appendChild(dayDiv);
        });

        monthContainer.appendChild(songsGrid);
        calendar.appendChild(monthContainer);
      }
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