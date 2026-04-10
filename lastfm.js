/* A file for pulling my lastfm data to be displayed on the music page */

/* LASTFM credentials */
const LASTFM_USERNAME = 'Dwhee1209';
const LASTFM_API_KEY = 'bbc4942d5446e22323c15e7468c3812b';
const LASTFM_API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;


/* Helper function to get track info including album art */
async function getTrackInfo(trackName, artistName) {
    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&track=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_API_KEY}&format=json`
        );
        const data = await response.json();

        if (data.track?.album?.image) {
            const largeImage = data.track.album.image.find(img => img.size === 'medium');
            return largeImage?.['#text'] || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching track info:', error);
        return null;
    }
}

/* Helper function to call the Netlify proxy */
async function callProxy(apiType, params = {}) {
    try {
        const response = await fetch('/.netlify/functions/proxy-api', {
            method: 'POST',
            body: JSON.stringify({
                apiType,
                ...params
            })
        });

        if (!response.ok) throw new Error('Proxy request failed');
        return await response.json();
    } catch (error) {
        console.error('Proxy error:', error);
        return null;
    }
}


async function loadWeeklyStats() {
    try {
        // Get albums, artists, tracks using proxy
        const albumsData = await callProxy('lastfm-weekly-album');
        const artistsData = await callProxy('lastfm-weekly-artist');
        const tracksData = await callProxy('lastfm-weekly-track');

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
            const albumInfo = await callProxy('lastfm-album', {
                artistName: topAlbum.artist['#text'],
                albumName: topAlbum.name
            });

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

        /* Fetch all track info in parallel */
        const trackPromises = tracks.weeklytrackchart.track.slice(0, 5).map(async (track) => {
            const albumArt = await getTrackInfo(track.name, track.artist['#text']);
            return { track, albumArt };
        });

        const tracksWithArt = await Promise.all(trackPromises);

        tracksWithArt.forEach(({ track, albumArt }) => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'top-track-item';

            /* Add album art if available */
            if (albumArt) {
                const img = document.createElement('img');
                img.src = albumArt;
                img.className = 'track-album-art';
                img.alt = 'Album art';
                trackDiv.appendChild(img);
            }

            const trackNameP = document.createElement('p');
            trackNameP.className = 'top-track-name';
            trackNameP.textContent = track.name;

            const trackArtistP = document.createElement('p');
            trackArtistP.className = 'top-track-artist';
            trackArtistP.textContent = `by ${track.artist['#text']}`;

            trackDiv.appendChild(trackNameP);
            trackDiv.appendChild(trackArtistP);
            tracksContainer.appendChild(trackDiv);
        });
    }
}

/* RECENT LISTENING FUNCTIONS */

/* Fetching the 5 most recent songs I've listened to */
async function getRecentTracks() {
    try {

        const recentTracksData = await callProxy('lastfm-recent');

        /*calling the function to display the data
        The fetching functions are async so that we can do this */
        displayRecentTracks(recentTracksData);

    } catch (error) {
        console.error('Error fetching recent songs:', error);
    }
}

/* Displaying the recent songs in the html */
async function displayRecentTracks(recentTracks) {
    if (recentTracks.recenttracks && recentTracks.recenttracks.track) {
        const container = document.getElementById('recent-tracks');
        container.innerHTML = '';

        /* Fetch all track info in parallel */
        const trackPromises = recentTracks.recenttracks.track.map(async (track) => {
            const albumArt = await getTrackInfo(track.name, track.artist['#text']);
            return { track, albumArt };
        });

        const tracksWithArt = await Promise.all(trackPromises);

        tracksWithArt.forEach(({ track, albumArt }) => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'recent-track';

            /* Add album art if available */
            if (albumArt) {
                const img = document.createElement('img');
                img.src = albumArt;
                img.className = 'track-album-art';
                img.alt = 'Album art';
                trackDiv.appendChild(img);
            }

            const songName = document.createElement('p');
            songName.className = 'track-name';
            songName.textContent = track.name || 'Unknown Track';

            const artistName = document.createElement('p');
            artistName.className = 'track-artist';
            artistName.textContent = track.artist['#text'] || 'Unknown Artist';

            trackDiv.appendChild(songName);
            trackDiv.appendChild(artistName);
            container.appendChild(trackDiv);
        });
    }
}


/* Initiates the functions when the dom loads */
document.addEventListener('DOMContentLoaded', loadWeeklyStats);
document.addEventListener('DOMContentLoaded', getRecentTracks);