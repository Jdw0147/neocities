const fs = require('fs');
const https = require('https');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID;

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'accounts.spotify.com',
      path: '/api/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).access_token);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write('grant_type=client_credentials');
    req.end();
  });
}

async function getPlaylistTracks(accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.spotify.com',
      path: `/v1/playlists/${PLAYLIST_ID}/tracks?limit=50`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('API Response:', JSON.stringify(parsed, null, 2)); // Debug log
          
          if (!parsed.items) {
            throw new Error(`No items in response. Got: ${JSON.stringify(parsed)}`);
          }
          
          resolve(parsed.items);
        } catch (e) {
          console.error('Parse error:', e);
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

(async () => {
  try {
    console.log('Playlist ID:', PLAYLIST_ID);
    console.log('Client ID exists:', !!CLIENT_ID);
    console.log('Client Secret exists:', !!CLIENT_SECRET);

    const token = await getAccessToken();
    console.log('Access token obtained:', !!token);

    const tracks = await getPlaylistTracks(token);
    console.log('Tracks received:', tracks.length);
    
    const dayOfYear = getDayOfYear();
    
    // Map all 365 days to songs
    const songs = [];
    for (let day = 1; day <= 365; day++) {
      const songIndex = (day - 1) % tracks.length;
      const track = tracks[songIndex].track;
      
      songs.push({
        day,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images[0]?.url || '',
        spotifyUrl: track.external_urls.spotify
      });
    }

    const output = {
      today: songs[dayOfYear - 1],
      yesterday: songs[(dayOfYear - 2 + 365) % 365],
      songs,
      totalSongs: tracks.length,
      currentDay: dayOfYear,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync('songs.json', JSON.stringify(output, null, 2));
    console.log('✓ Daily song updated');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();