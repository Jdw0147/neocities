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

async function displayWeeklyStats(albums, artists, tracks) {

    /* Top albums */
    if (albums.weeklyalbumchart && albums.weeklyalbumchart.album) {
        const topAlbum = albums.weeklyalbumchart.album[0];
        const artistName = topAlbum.artist['#text'] || 'Unknown Artist';
        const albumName = topAlbum.name || 'Unknown Album';

        // Album Art, second call to lastfm, annoying but temporary
        try {
            const albumInfoResponse = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${LASTFM_API_KEY}&format=json`
            );
            const albumInfo = await albumInfoResponse.json();

            // Update album name
            document.getElementById('album-name').textContent = albumName;
            document.getElementById('album-artist').textContent = artistName;

            /* Get the cover image from the album info */
            if (albumInfo.album?.image) {
                const largeImage = albumInfo.album.image.find(img => img.size === 'extralarge');
                if (largeImage && largeImage['#text']) {
                    document.getElementById('album-cover').src = largeImage['#text'];
                }
            }
        } catch (error) {
            console.error('Error fetching album info:', error);
        }

    }

    /* Top Artists */
    if (artists.weeklyartistchart?.artist) {
        const artistsContainer = document.getElementById('top-artists');
        artistsContainer.innerHTML = '';

        for (const artist of artists.weeklyartistchart.artist.slice(0, 3)) {
            
            const artistDiv = document.createElement('div');
            artistDiv.className = 'top-artist-item';
            // Create artist name
            const artistNameP = document.createElement('p');
            artistNameP.className = 'artist-name';
            artistNameP.textContent = artist.name;

            // Create playcount
            const playcountP = document.createElement('p');
            playcountP.className = 'artist-playcount';
            playcountP.textContent = `${artist.playcount} plays`;

            // Add to container
            artistDiv.appendChild(artistNameP);
            artistDiv.appendChild(playcountP);
            artistsContainer.appendChild(artistDiv);
        };
    }

    /* Top Tracks */
    if (tracks.weeklytrackchart?.track) {
        const tracksContainer = document.getElementById('top-tracks');
        tracksContainer.innerHTML = '';

        tracks.weeklytrackchart.track.slice(0, 5).forEach(track => {
            // Create track item container
            const trackDiv = document.createElement('div');
            trackDiv.className = 'top-track-item';

            // Create track name
            const trackNameP = document.createElement('p');
            trackNameP.className = 'top-track-name';
            trackNameP.textContent = track.name;

            // Create artist name
            const trackArtistP = document.createElement('p');
            trackArtistP.className = 'top-track-artist';
            trackArtistP.textContent = `by ${track.artist['#text']}`;

            // Add to container
            trackDiv.appendChild(trackNameP);
            trackDiv.appendChild(trackArtistP);
            tracksContainer.appendChild(trackDiv);
        });
    }
}

function getArtistImage(aristId) {
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${aristId}&api_key=${LASTFM_API_KEY}&format=json`)
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


/* Initiates the functions when the dom loads */
document.addEventListener('DOMContentLoaded', loadWeeklyStats);
document.addEventListener('DOMContentLoaded', getRecentTracks);