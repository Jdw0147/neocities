/* A file for pulling my lastfm data to be displayed on the music page */

/* LASTFM credentials */
const LASTFM_USERNAME = 'Dwhee1209';
const LASTFM_API_KEY = 'bbc4942d5446e22323c15e7468c3812b';
const LASTFM_API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

async function loadWeeklyStats() {
    try {
        /* Getting the top albums of last week */
        const albumsResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5`);
        const albumsData = await albumsResponse.json();
    
        /* Getting the top artists of last week */
        const artistsResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5`);
        const artistsData = await artistsResponse.json();

        /* Getting top songs of the last week */
        const tracksResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5`);
        const tracksData = await tracksResponse.json();

        /* Displaying the data */
        displayWeeklyStats(albumsData, artistsData, tracksData);
    } catch (error) {
        console.error('Error fetching weekly stats:', error);
    }
}

function displayWeeklyStats(albums, artists, tracks) {

    /* Top albums */
    if (albums.weeklyalbumchart && albums.weeklyalbumchart.album) {
        const topAlbum = albums.weeklyalbumchart.album[0];
        document.getElementById('album-name').textContent = topAlbum.name || 'Unknown Album';
        document.getElementById('album-artist').textContent = topAlbum.artist.name || 'Unknown Artist';

        /* Album Cover */
        if (topAlbum.image?.[3]) {
            document.getElementById('album-cover').src = topAlbum.image[3]['#text'];
        }
    }

    /* Top Artists */
    if (artists.weeklyartistchart?.artist) {
    const topArtistsHTML = artists.weeklyartistchart.artist.slice(0, 3).map(artist => `
      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #444;">
        <p style="font-size: 0.85em; margin: 0; color: #AAA;"><strong>${artist.name}</strong></p>
        <p style="font-size: 0.75em; margin: 2px 0 0; color: #777;">${artist.playcount} plays</p>
      </div>
    `).join('');
    document.getElementById('top-artists').innerHTML = topArtistsHTML;
  }

    /* Top Songs */
    if (tracks.weeklytrackchart?.track) {
    const topTracksHTML = tracks.weeklytrackchart.track.slice(0, 5).map(track => `
      <div style="margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px solid #444;">
        <p style="font-size: 0.8em; margin: 0; color: #AAA;"><strong>${track.name}</strong></p>
        <p style="font-size: 0.75em; margin: 2px 0 0; color: #777;">by ${track.artist.name}</p>
      </div>
    `).join('');
    document.getElementById('top-tracks').innerHTML = topTracksHTML;
  }
}


/* RECENT LISTENING FUNCTIONS */

/* Fetching the 5 most recent songs I've listened to */
async function getRecentTracks() {
    try {
        /* params method, user, api_key, limit, format */
        const recentTracksResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&limit=5&format=json`);
        const recentTracksData = await recentTracksResponse.json();

        /*calling the function to display the data
        The fetching functions are async so that we can do this */
        displayRecentTracks(recentTracksData);

    } catch (error) {
        console.error('Error fetching recent songs:', error);
    }
}

/* Displaying the recent songs in the html */
function displayRecentTracks(recentTracks) {
    if (recentTracks.recenttracks && recentTracks.recenttracks.track) {
        
        /* creating and clearing the recent tracks container so it stays updated */
        const container = document.getElementById('recent-tracks');
        container.innerHTML = '';

        /* looping through each track and putting them into html */
        recentTracks.recenttracks.track.forEach(track => {

            /* Creating a mini container for each song */
            const trackDiv = document.createElement('div');

            /* Applying the class so the information is formated (the styling for this class is already in the CSS file) */
            trackDiv.className = 'recent-track';

            /* Creating song name */
            const songName = document.createElement('p');
            songName.className = 'track-name';
            songName.textContent = track.name || 'Unknown Track';

            /* Creating artist name */
            const artistName = document.createElement('p');
            artistName.className = 'track-artist';
            artistName.textContent = track.artist['#text'] || 'Unknown Artist';

            /* Adding both to the container */
            trackDiv.appendChild(songName);
            trackDiv.appendChild(artistName);

            /* Adding the track container to the main recent track container */
            container.appendChild(trackDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadWeeklyStats);
document.addEventListener('DOMContentLoaded', getRecentTracks);