// Store all songs for navigation
let allSongs = [];
let currentSongIndex = 0;
let currentYear = '2026';

// Physical albums - cover art (left) paired with their spinning record gif (right)
const physicalAlbums = [
  { name: 'Damaged', cover: 'physical-albums/damaged.gif', lp: 'physical-albums/damaged-lp.gif' },
  { name: 'Floral Green', cover: 'physical-albums/floral-green-outside.gif', lp: 'physical-albums/floral-green-lp.gif' },
  { name: 'Give Me Convenience or Give Me Death', cover: 'physical-albums/give-me-conenience-or-give-me-death.gif', lp: 'physical-albums/give-me-conenience-or-give-me-death-lp.gif' },
  { name: 'Living in Darkness', cover: 'physical-albums/living-in-darkness.gif', lp: 'physical-albums/living-in-darkness-lp.gif' },
  { name: 'Meat Is Murder', cover: 'physical-albums/meat-is-murder.gif', lp: 'physical-albums/meat-is-murder-lp.gif' },
  { name: 'Mingus Ah Um', cover: 'physical-albums/mingus-ah-um.gif', lp: 'physical-albums/mingus-ah-um-lp.gif' },
  { name: 'Moments of Clarity', cover: 'physical-albums/moments-of-clarity.gif', lp: 'physical-albums/moments-of-clarity-lp.gif' },
  { name: 'Nonstop Feeling', cover: 'physical-albums/nonstop-feeling.gif', lp: 'physical-albums/nonstop-feeling-lp.gif' },
  { name: 'Pink Moon', cover: 'physical-albums/pink-moon.gif', lp: 'physical-albums/pink-moon-lp.gif' },
  { name: 'Scenery', cover: 'physical-albums/scenery.gif', lp: 'physical-albums/scenery-lp.gif' },
  { name: 'Siamese Dream', cover: 'physical-albums/siamese-dream.gif', lp: 'physical-albums/siamese-dream-lp1.gif' },
  { name: 'Stranger in the Alps', cover: 'physical-albums/stranger-in-the-alps.gif', lp: 'physical-albums/stranger-in-the-alps-lp.gif' },
  { name: 'The Rainbow Goblins', cover: 'physical-albums/the-rainbow-goblins.gif', lp: 'physical-albums/the-rainbow-goblins-lp1.gif' },
  { name: "You Won't Go Before You're Supposed To", cover: 'physical-albums/you-wont-go-before-youre-supposed-to.gif', lp: 'physical-albums/you-wont-go-before-youre-supposed-to-lp.gif' },
  { name: 'Doolittle', cover: 'physical-albums/doolittle.gif', lp: 'physical-albums/doolittle-lp.gif' },
  { name: "First Two Seven Inches", cover: 'physical-albums/first-two-seven-inches.gif', lp: 'physical-albums/first-two-seven-inches-lp.gif' },
  { name: "Jar of Flies", cover: 'physical-albums/jar-of-flies.gif', lp: 'physical-albums/jar-of-flies-lp.gif' },
  { name: "Rage Against the Machine", cover: 'physical-albums/rage-against-the-machine.gif', lp: 'physical-albums/rage-against-the-machine-lp.gif' },
  { name: "Songs For The Deaf", cover: 'physical-albums/songs-for-the-deaf.gif', lp: 'physical-albums/songs-for-the-deaf-lp1.gif' },
  { name: "Take Offs and Landings", cover: 'physical-albums/take-offs-and-landings.gif', lp: 'physical-albums/take-offs-and-landings-lp1.gif' },
  { name: "Transatlanicism", cover: 'physical-albums/transatlanticism.gif', lp: 'physical-albums/transatlanticism-lp2.gif' },
  { name: "Souvlaki", cover: 'physical-albums/souvlaki.gif', lp: 'physical-albums/souvlaki-lp.gif' },
  { name: "Room on Fire", cover: 'physical-albums/room-on-fire.gif', lp: 'physical-albums/room-on-fire-lp.gif' },
  { name: "Fear Fun", cover: 'physical-albums/fear-fun.gif', lp: 'physical-albums/fear-fun-lp.gif' },
  { name: "Come In", cover: 'physical-albums/come-in.gif', lp: 'physical-albums/come-in-lp1.gif' },
  { name: "Bloodstains", cover: 'physical-albums/bloodstains.gif', lp: 'physical-albums/bloodstains-lp.gif' },
  { name: "Atlanta Millionaire's Club", cover: 'physical-albums/atlanta-millionaires-club.gif', lp: 'physical-albums/atlanta-millionaires-club-lp.gif' },
  { name: "A New World Record", cover: 'physical-albums/a-new-world-record.gif', lp: 'physical-albums/a-new-world-record-lp.gif' },
  { name: "You're Living All Over Me", cover: 'physical-albums/youre-living-all-over-me.gif', lp: 'physical-albums/youre-living-all-over-me-lp.gif' },
  { name: "Is This It", cover: 'physical-albums/is-this-it.gif', lp: 'physical-albums/is-this-it-lp.gif' },
  { name: "Survival Horror", cover: 'physical-albums/survival-horror.gif', lp: 'physical-albums/survival-horror-lp.gif' },
  { name: "Saturday Night Wrist", cover: 'physical-albums/saturday-night-wrist.gif', lp: 'physical-albums/saturday-night-wrist-lp.gif' },
  { name: "Nebraska", cover: 'physical-albums/nebraska.gif', lp: 'physical-albums/nebraska-lp.gif' },
  { name: "Grace", cover: 'physical-albums/grace.gif', lp: 'physical-albums/grace-lp.gif' },
  { name: "Everyone Else Is Doing It, So Why Can't We?", cover: 'physical-albums/everyone-else-is-doing-it.gif', lp: 'physical-albums/everyone-else-is-doing-it-lp.gif' },
  { name: "Four-Calendar Café", cover: 'physical-albums/four-calendar-cafe.gif', lp: 'physical-albums/four-calendar-cafe-lp.gif' },
  { name: "Alive 2007", cover: 'physical-albums/alive-2007.gif', lp: 'physical-albums/alive-2007-lp1.gif' },
  { name: "Life's A Trip", cover: 'physical-albums/lifes-a-trip.gif', lp: 'physical-albums/lifes-a-trip-lp.gif' },
  { name: "Man on the Moon: The End of Day", cover: 'physical-albums/man-on-the-moon.gif', lp: 'physical-albums/man-on-the-moon-lp1.gif'},
  { name: "Are You Experienced?", cover: 'physical-albums/are-you-experienced.gif', lp: 'physical-albums/are-you-experienced-lp.gif' },
  { name: "Worlds", cover: 'physical-albums/worlds.gif', lp: 'physical-albums/worlds-lp1.gif' },
  { name: "Wolf", cover: 'physical-albums/wolf.gif', lp: 'physical-albums/wolf-lp1.gif' },
  { name: "Undercurrent", cover: 'physical-albums/undercurrent.gif', lp: 'physical-albums/undercurrent-lp.gif' },
  { name: "Three Cheers for Sweet Revenge", cover: 'physical-albums/three-cheers-for-sweet-revenge.gif', lp: 'physical-albums/three-cheers-for-sweet-revenge-lp.gif' },
  { name: "The Pains of Being Pure at Heart", cover: 'physical-albums/the-pains-of-being-pure-at-heart.gif', lp: 'physical-albums/the-pains-of-being-pure-at-heart-lp.gif' },
  { name: "The Black Parade", cover: 'physical-albums/the-black-parade.gif', lp: 'physical-albums/the-black-parade-lp1.gif' },
  { name: "Tell All Your Friends", cover: 'physical-albums/tell-all-your-friends.gif', lp: 'physical-albums/tell-all-your-friends-lp1.gif' },
  { name: "Suicidal Tendencies", cover: 'physical-albums/suicidal-tendencies.gif', lp: 'physical-albums/suicidal-tendencies-lp.gif' },
  { name: "Sports", cover: 'physical-albums/sports.gif', lp: 'physical-albums/sports-lp.gif' },
  { name: "Slanted and Enchanted", cover: 'physical-albums/slanted-and-enchanted.gif', lp: 'physical-albums/slanted-and-enchanted-lp.gif' },
  { name: "Roman Candle", cover: 'physical-albums/roman-candle.gif', lp: 'physical-albums/roman-candle-lp.gif' },
  { name: "Reading, Writing and Arithmetic", cover: 'physical-albums/reading-writing-and-arithmetic.gif', lp: 'physical-albums/reading-writing-and-arithmetic-lp.gif' },
  { name: "On Guitar", cover: 'physical-albums/on-guitar.gif', lp: 'physical-albums/on-guitar-lp.gif' },
  { name: "Number 1 Record", cover: 'physical-albums/number-1-record.gif', lp: 'physical-albums/number-1-record-lp.gif' },
  { name: "Nectar", cover: 'physical-albums/nectar.gif', lp: 'physical-albums/nectar-lp1.gif' },
  { name: "Minecraft - Volume Beta", cover: 'physical-albums/minecraft-volume-beta.gif', lp: 'physical-albums/minecraft-volume-beta-lp1.gif' },
  { name: "Kiss My Super Bowl Ring", cover: 'physical-albums/kiss-my-super-bowl-ring.gif', lp: 'physical-albums/kiss-my-super-bowl-ring-lp.gif' },
  { name: "Hatful of Hollow", cover: 'physical-albums/hatful-of-hollow.gif', lp: 'physical-albums/hatful-of-hollow-lp.gif' },
  { name: "Give The People What They Want", cover: 'physical-albums/give-the-people-what-they-want.gif', lp: 'physical-albums/give-the-people-what-they-want-lp.gif' },
  { name: "For The Rest Of Your Life", cover: 'physical-albums/for-the-rest-of-your-life.gif', lp: 'physical-albums/for-the-rest-of-your-life-lp1.gif' },
  { name: "Eels", cover: 'physical-albums/eels.gif', lp: 'physical-albums/eels-lp.gif' },
  { name: "Cherry Bomb", cover: 'physical-albums/cherry-bomb.gif', lp: 'physical-albums/cherry-bomb-lp1.gif' },
  { name: "Census Designated", cover: 'physical-albums/census-designated.gif', lp: 'physical-albums/census-designated-lp1.gif' },
  { name: "Frailty", cover: 'physical-albums/frailty.gif', lp: 'physical-albums/frailty-lp.gif' },
  { name: "Dookie", cover: 'physical-albums/dookie.gif', lp: 'physical-albums/dookie-lp.gif' },
  { name: "Don't Tap The Glass", cover: 'physical-albums/dont-tap-the-glass.gif', lp: 'physical-albums/dont-tap-the-glass-lp.gif' },
  { name: "Days / Vibes", cover: 'physical-albums/days-vibes.gif', lp: 'physical-albums/days-vibes-lp.gif' },
  { name: "Blow By Blow", cover: 'physical-albums/blow-by-blow.gif', lp: 'physical-albums/blow-by-blow-lp.gif' },
  { name: "Ballads 1", cover: 'physical-albums/ballads-1.gif', lp: 'physical-albums/ballads-1-lp.gif' },
  { name: "As You Please", cover: 'physical-albums/as-you-please.gif', lp: 'physical-albums/as-you-please-lp.gif' },
  { name: "Antisocialites", cover: 'physical-albums/antisocialites.gif', lp: 'physical-albums/antisocialites-lp.gif' },
  { name: "As Good As Dead", cover: 'physical-albums/as-good-as-dead.gif', lp: 'physical-albums/as-good-as-dead-lp1.gif' },
  { name: "A Different Age", cover: 'physical-albums/a-different-age.gif', lp: 'physical-albums/a-different-age-lp.gif' },

];

function showRandomPhysicalAlbum() {
  const cover = document.getElementById('sotdAlbumCover');
  const lp = document.getElementById('sotdAlbumLp');
  if (!cover || !lp) return;

  const album = physicalAlbums[Math.floor(Math.random() * physicalAlbums.length)];
  cover.src = album.cover;
  cover.alt = `${album.name} album cover`;
  lp.src = album.lp;
  lp.alt = `${album.name} record spinning on a turntable`;
}

async function loadSongCalendar(year = 2026) {
  currentYear = year;

  // Map months to their background GIFs
  const monthBackgrounds = {
    'January': '/backgrounds/moving/snow.gif',
    'February': '/backgrounds/moving/pink-lines.gif',
    'March': '/backgrounds/static/trees.gif',
    'April': '/backgrounds/moving/rain.gif',
    'May': '/backgrounds/static/flower-field.gif',
    'June': '/backgrounds/moving/water.gif',
    'July': '/backgrounds/static/poolfloor.jpg',
    'August': '/backgrounds/static/fabric.jpg',
    'September': '/backgrounds/static/butterflies.gif',
    'October': '/backgrounds/static/ghouls.gif',
    'November': "url('/backgrounds/moving/leaves.gif'), url('/backgrounds/static/tree.jpg')",
    'December': '/backgrounds/moving/winter-sky.gif'
  };

  try {
    //Determine which JSON file to load based on the year
    const filename = year === 2026 ? 'songs.json' : 'songs25.json';
    const response = await fetch(filename);
    
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

    allSongs = [];
    monthOrder.forEach(month => {
      if (songsByMonth[month]) {
        allSongs = allSongs.concat(songsByMonth[month]);
      }
    });

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
          monthContainer.style.backgroundImage = monthBackgrounds[month].includes('url(') ? monthBackgrounds[month] : `url('${monthBackgrounds[month]}')`;
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

          dayDiv.setAttribute('data-month', month);
          dayDiv.appendChild(img);

          dayDiv.addEventListener('click', () => {
            openSongModal(song, monthBackgrounds[month]);
          });

          songsGrid.appendChild(dayDiv);
        });

        monthContainer.appendChild(songsGrid);
        calendar.appendChild(monthContainer);
      }
    });
    
  } catch (error) {
    console.error('Failed to load song calendar:', error);
  }
}


// Modal Functions
function openSongModal(song, monthBackground) {

  // Find the index of this song for navigation
  currentSongIndex = allSongs.findIndex(s => s.num === song.num);

  const modal = document.getElementById('songModal');
  const overlay = document.getElementById('songModalOverlay');

  // Set modal background
  if (monthBackground) {
    modal.style.backgroundImage = monthBackground.includes('url(') ? monthBackground : `url('${monthBackground}')`;
  }

  // Populate modal content
  document.getElementById('modalTitle').textContent = `${song.title} - ${song.artist}`;
  document.getElementById('modalCoverImg').src = song.image;
  document.getElementById('modalCoverImg').alt = song.album;
  document.getElementById('modalDay').textContent = song.date;
  document.getElementById('modalAlbum').textContent = song.album;
  document.getElementById('modalYear').textContent = song.year;

  // Handle optional notes
  const notesSection = document.getElementById('modalNotesSection');
  if (song.additionalNotes) {
    document.getElementById('modalNotes').textContent = song.additionalNotes;
    notesSection.classList.add('show');
  } else {
    notesSection.classList.remove('show');
  }

  // Show modal
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSongModal() {
  const overlay = document.getElementById('songModalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function navigateToSong(index) {
  // Loop around if out of bounds
  if (index < 0) {
    index = allSongs.length - 1;
  } else if (index >= allSongs.length) {
    index = 0;
  }
  
  currentSongIndex = index;
  const song = allSongs[index];
  
  // Find the month for this song to get the background
  const month = song.date.split(' ')[0];
  const monthBackgrounds = {
    'January': '/backgrounds/moving/snow.gif',
    'February': '/backgrounds/moving/pink-lines.gif',
    'March': '/backgrounds/static/trees.gif',
    'April': '/backgrounds/moving/rain.gif',
    'May': '/backgrounds/static/flower-field.gif',
    'June': '/backgrounds/moving/water.gif',
    'July': '/backgrounds/static/poolfloor.jpg',
    'August': '/backgrounds/static/fabric.jpg',
    'September': '/backgrounds/static/butterflies.gif',
    'October': '/backgrounds/static/ghouls.gif',
    'November': "url('/backgrounds/moving/leaves.gif'), url('/backgrounds/static/tree.jpg')",
    'December': '/backgrounds/moving/winter-sky.gif'
  };
  
  // Update modal without closing/reopening
  document.getElementById('modalTitle').textContent = `${song.title} - ${song.artist}`;
  document.getElementById('modalCoverImg').src = song.image;
  document.getElementById('modalCoverImg').alt = song.album;
  document.getElementById('modalDay').textContent = song.date;
  document.getElementById('modalAlbum').textContent = song.album;
  document.getElementById('modalYear').textContent = song.year;
  
  const notesSection = document.getElementById('modalNotesSection');
  if (song.additionalNotes) {
    document.getElementById('modalNotes').textContent = song.additionalNotes;
    notesSection.classList.add('show');
  } else {
    notesSection.classList.remove('show');
  }
  
  // Update background
  if (monthBackgrounds[month]) {
    document.getElementById('songModal').style.backgroundImage = monthBackgrounds[month].includes('url(') ? monthBackgrounds[month] : `url('${monthBackgrounds[month]}')`;
  }
}

function nextSong() {
  navigateToSong(currentSongIndex + 1);
}

function previousSong() {
  navigateToSong(currentSongIndex - 1);
}

document.addEventListener('DOMContentLoaded', function () {

  // Set up year tab switching
  const yearTabs = document.querySelectorAll('.year-btn');
  yearTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Update active tab styling
      yearTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      // Load calendar for selected year
      const year = parseInt(e.target.getAttribute('data-year'));
      loadSongCalendar(year);
    });
  });

  // Close modal on X button click
  document.getElementById('modalClose').addEventListener('click', closeSongModal);

  // Navigation buttons
  document.getElementById('nextSongBtn').addEventListener('click', nextSong);
  document.getElementById('prevSongBtn').addEventListener('click', previousSong);

  // Close modal on overlay click
  document.getElementById('songModalOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
      closeSongModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSongModal();
    }
  });

  // Load initial calendar (2026)
  loadSongCalendar(2026);

  // Pick a random physical album to flank the title/buttons
  showRandomPhysicalAlbum();
});