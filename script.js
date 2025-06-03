// Mock Data con percorsi corretti
const mockData = {
    songs: [
        // JL Album
        { id: 's1', title: 'Intro', artist: 'Kanye West', albumId: 'a1', duration: '1:23', audioUrl: 'YALDHI/08 FVCK GIANVOIT.mp3', cover: 'images/jl2.jpg' },
        { id: 's2', title: 'Heaven and Hell', artist: 'Kanye West', albumId: 'a1', duration: '2:24', audioUrl: 'YALDHI/01 THE GARDEN OF ALDI.mp3', cover: 'images/jl2.jpg' },
        { id: 's3', title: 'Still Under Development', artist: 'Kanye West', albumId: 'a1', duration: '0:52', audioUrl: 'YALDHI/02 THE ALDI STORM.m4a', cover: 'images/jl2.jpg' },
        
        // BULDY Album
        { id: 's4', title: 'Aldi Man', artist: 'Kanye West', albumId: 'a2', duration: '4:37', audioUrl: 'YALDHI/03 NEW ALDI.mp3', cover: 'images/buldy.jpg' },
        { id: 's5', title: 'Close To Aldi', artist: 'Kanye West', albumId: 'a2', duration: '3:58', audioUrl: 'YALDHI/04 80 ALDYIES.m4a', cover: 'images/buldy.jpg' },
        { id: 's6', title: 'Circaldies', artist: 'Kanye West', albumId: 'a2', duration: '5:39', audioUrl: 'YALDHI/05 ALDI IN THE SKY.mp3', cover: 'images/buldy.jpg' },
        { id: 's23', title: 'Buldy', artist: 'Kanye West', albumId: 'a2', duration: '4:12', audioUrl: 'YALDHI/06 ALDIEN.mp3', cover: 'images/buldy.jpg' },
        { id: 's24', title: 'Aldi and the Conad', artist: 'Kanye West', albumId: 'a2', duration: '3:45', audioUrl: 'YALDHI/07 BROTHERS OF ALDI.mp3', cover: 'images/buldy.jpg' },
        { id: 's25', title: 'ShowAldi', artist: 'Kanye West', albumId: 'a2', duration: '4:28', audioUrl: 'YALDHI/08 FVCK GIANVOIT.mp3', cover: 'images/buldy.jpg' },
        { id: 's26', title: 'Aldi & Lows', artist: 'Kanye West', albumId: 'a2', duration: '3:33', audioUrl: 'YALDHI/01 THE GARDEN OF ALDI.mp3', cover: 'images/buldy.jpg' },
        { id: 's27', title: 'ALDIROSE', artist: 'Kanye West', albumId: 'a2', duration: '5:21', audioUrl: 'YALDHI/02 THE ALDI STORM.m4a', cover: 'images/buldy.jpg' },
        
        // DONDA 2 Album
        { id: 's7', title: 'Security', artist: 'Kanye West', albumId: 'a3', duration: '1:59', audioUrl: 'YALDHI/03 NEW ALDI.mp3', cover: 'images/donda2.jpg' },
        { id: 's8', title: 'We Did It Kid', artist: 'Kanye West', albumId: 'a3', duration: '3:07', audioUrl: 'YALDHI/04 80 ALDYIES.m4a', cover: 'images/donda2.jpg' },
        { id: 's9', title: 'Pablo', artist: 'Kanye West ft. Travis Scott', albumId: 'a3', duration: '2:13', audioUrl: 'YALDHI/05 ALDI IN THE SKY.mp3', cover: 'images/donda2.jpg' },
        
        // YALDHI Album
        { id: 's10', title: 'THE GARDEN OF ALDI', artist: 'Kanye West', albumId: 'a4', duration: '3:51', audioUrl: 'YALDHI/01 THE GARDEN OF ALDI.mp3', cover: 'images/yaldhi.png' },
        { id: 's11', title: 'THE ALDI STORM', artist: 'Kanye West', albumId: 'a4', duration: '4:16', audioUrl: 'YALDHI/02 THE ALDI STORM.m4a', cover: 'images/yaldhi.png' },
        { id: 's12', title: 'NEW ALDI', artist: 'Kanye West', albumId: 'a4', duration: '5:27', audioUrl: 'YALDHI/03 NEW ALDI.mp3', cover: 'images/yaldhi.png' },
        { id: 's13', title: '80 ALDIES', artist: 'Kanye West', albumId: 'a4', duration: '3:08', audioUrl: 'YALDHI/04 80 ALDYIES.m4a', cover: 'images/yaldhi.png' },
        { id: 's14', title: 'ALDI IN THE SKY', artist: 'Kanye West', albumId: 'a4', duration: '6:00', audioUrl: 'YALDHI/05 ALDI IN THE SKY.mp3', cover: 'images/yaldhi.png' },
        { id: 's15', title: 'ALDIEN', artist: 'Kanye West', albumId: 'a4', duration: '3:50', audioUrl: 'YALDHI/06 ALDIEN.mp3', cover: 'images/yaldhi.png' },
        { id: 's16', title: 'BROTHERS OF ALDI', artist: 'Kanye West', albumId: 'a4', duration: '4:22', audioUrl: 'YALDHI/07 BROTHERS OF ALDI.mp3', cover: 'images/yaldhi.png' },
        { id: 's17', title: 'FVCK GIANVOIT', artist: 'Kanye West', albumId: 'a4', duration: '2:45', audioUrl: 'YALDHI/08 FVCK GIANVOIT.mp3', cover: 'images/yaldhi.png' },
        
        // YALDHI DELUXE Album
        { id: 's18', title: 'ALDILESS', artist: 'Kanye West', albumId: 'a5', duration: '3:33', audioUrl: 'YALDHI/01 THE GARDEN OF ALDI.mp3', cover: 'images/yaldhi.png' },
        { id: 's19', title: 'ALL DI', artist: 'Kanye West', albumId: 'a5', duration: '4:11', audioUrl: 'YALDHI/02 THE ALDI STORM.m4a', cover: 'images/yaldhi.png' },
        { id: 's20', title: 'ALDI BURNING', artist: 'Kanye West', albumId: 'a5', duration: '5:15', audioUrl: 'YALDHI/03 NEW ALDI.mp3', cover: 'images/yaldhi.png' },
        { id: 's21', title: 'HOT ALDI', artist: 'Kanye West', albumId: 'a5', duration: '3:42', audioUrl: 'YALDHI/04 80 ALDYIES.m4a', cover: 'images/yaldhi.png' },
        { id: 's22', title: 'MEET THE ALDI MAKERS', artist: 'Kanye West', albumId: 'a5', duration: '4:28', audioUrl: 'YALDHI/05 ALDI IN THE SKY.mp3', cover: 'images/yaldhi.png' }
    ],
    
    albums: [
        { id: 'a1', title: 'JL', artist: 'Kanye West', cover: 'images/jl2.jpg', songs: ['s1', 's2', 's3'], year: 2024 },
        { id: 'a2', title: 'BULDY', artist: 'Kanye West', cover: 'images/buldy.jpg', songs: ['s4', 's5', 's6', 's23', 's24', 's25', 's26', 's27'], year: 2023 },
        { id: 'a3', title: 'DONDA 2', artist: 'Kanye West', cover: 'images/donda2.jpg', songs: ['s7', 's8', 's9'], year: 2022 },
        { id: 'a4', title: 'YALDHI', artist: 'Kanye West', cover: 'images/yaldhi.png', songs: ['s10', 's11', 's12', 's13', 's14', 's15', 's16', 's17'], year: 2013 },
        { id: 'a5', title: 'YALDHI DELUXE', artist: 'Kanye West', cover: 'images/yaldhi.png', songs: ['s18', 's19', 's20', 's21', 's22'], year: 2013 }
    ],
    
    playlists: [
        { id: 'p1', name: 'My Kanye Mix', cover: 'images/buldy.jpg', songs: ['s1', 's4', 's7', 's10', 's18'], creator: 'Orlaaa', duration: '18h 24min' },
        { id: 'p2', name: 'JL Favorites', cover: 'images/jl2.jpg', songs: ['s1', 's2', 's3'], creator: 'Orlaaa', duration: '4h 39min' },
        { id: 'p3', name: 'DONDA Collection', cover: 'images/donda2.jpg', songs: ['s7', 's8', 's9'], creator: 'Orlaaa', duration: '7h 19min' },
        { id: 'p4', name: 'YALDHI Complete', cover: 'images/yaldhi.png', songs: ['s10', 's11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19', 's20', 's21', 's22'], creator: 'Orlaaa', duration: '56h 41min' },
        { id: 'p5', name: 'BULDY Hits', cover: 'images/buldy.jpg', songs: ['s4', 's5', 's6', 's23', 's27'], creator: 'Orlaaa', duration: '22h 15min' }
    ],
    
    artists: [
        { id: 'ar1', name: 'Kanye West', image: 'images/yaldhi.png', followers: 15000000 },
        { id: 'ar2', name: 'Ye', image: 'images/buldy.jpg', followers: 239298 },
        { id: 'ar3', name: 'JAY-Z', image: 'images/donda2.jpg', followers: 8500000 }
    ],
    
    genres: [
        { id: 'g1', name: 'italian trap', color: 'bg-purple' },
        { id: 'g2', name: 'italian hip hop', color: 'bg-blue' },
        { id: 'g3', name: 'podcasts', color: 'bg-green' }
    ],
    
    categories: [
        { id: 'c1', name: 'Music', color: 'bg-pink' },
        { id: 'c2', name: 'Podcasts', color: 'bg-green' },
        { id: 'c3', name: 'Live Events', color: 'bg-indigo' },
        { id: 'c4', name: 'Made For You', color: 'bg-purple' }
    ]
};

// App State
let appState = {
    currentScreen: 'home',
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isShuffled: false,
    isRepeating: false,
    queue: [],
    currentIndex: 0,
    searchQuery: '',
    libraryFilter: 'Playlists',
    libraryViewMode: 'grid'
};

// Audio Player
let audioPlayer;

// Screen Management
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active', 'prev');
        if (screen.id === screenId) {
            screen.classList.add('active');
        }
    });
    
    appState.currentScreen = screenId.replace('-screen', '');
    updateBottomNav();
    
    // Hide bottom nav on detail screens
    const bottomNav = document.getElementById('bottom-nav');
    const hideNavScreens = ['detail-screen', 'settings-screen', 'artist-screen'];
    if (hideNavScreens.includes(screenId)) {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
    }
}

function updateBottomNav() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === appState.currentScreen) {
            btn.classList.add('active');
        }
    });
}

// Audio Functions
function playSong(song, queue = []) {
    if (!audioPlayer) return;
    
    appState.currentSong = song;
    if (queue.length > 0) {
        appState.queue = queue;
        appState.currentIndex = queue.findIndex(s => s.id === song.id);
    }
    
    audioPlayer.src = song.audioUrl;
    audioPlayer.load();
    
    updateMiniPlayer();
    updateFullPlayer();
    
    if (appState.isPlaying) {
        audioPlayer.play().catch(e => console.log('Play error:', e));
    }
}

function togglePlay() {
    if (!appState.currentSong || !audioPlayer) return;
    
    if (appState.isPlaying) {
        audioPlayer.pause();
        appState.isPlaying = false;
    } else {
        audioPlayer.play().catch(e => {
            console.log('Play error:', e);
        });
        appState.isPlaying = true;
    }
    
    updatePlayButtons();
}

function nextSong() {
    if (appState.queue.length === 0) return;
    
    const nextIndex = (appState.currentIndex + 1) % appState.queue.length;
    appState.currentIndex = nextIndex;
    playSong(appState.queue[nextIndex], appState.queue);
}

function previousSong() {
    if (appState.queue.length === 0) return;
    
    const prevIndex = appState.currentIndex === 0 ? appState.queue.length - 1 : appState.currentIndex - 1;
    appState.currentIndex = prevIndex;
    playSong(appState.queue[prevIndex], appState.queue);
}

function seekTo(time) {
    if (audioPlayer) {
        audioPlayer.currentTime = time;
        appState.currentTime = time;
    }
}

function setVolume(volume) {
    if (audioPlayer) {
        audioPlayer.volume = volume;
        appState.volume = volume;
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updatePlayButtons() {
    const playBtns = document.querySelectorAll('#mini-play-btn, #main-play-btn');
    playBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            if (appState.isPlaying) {
                icon.setAttribute('data-lucide', 'pause');
            } else {
                icon.setAttribute('data-lucide', 'play');
            }
        }
    });
    
    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateMiniPlayer() {
    const miniPlayer = document.getElementById('mini-player');
    if (!appState.currentSong) {
        miniPlayer.classList.add('hidden');
        return;
    }
    
    miniPlayer.classList.remove('hidden');
    
    const coverEl = document.getElementById('mini-player-cover');
    const titleEl = document.getElementById('mini-player-title');
    const artistEl = document.getElementById('mini-player-artist');
    
    if (coverEl) coverEl.src = appState.currentSong.cover;
    if (titleEl) titleEl.textContent = appState.currentSong.title;
    if (artistEl) artistEl.textContent = appState.currentSong.artist;
}

function updateFullPlayer() {
    if (!appState.currentSong) return;
    
    const coverEl = document.getElementById('full-player-cover');
    const titleEl = document.getElementById('full-player-title');
    const artistEl = document.getElementById('full-player-artist');
    
    if (coverEl) coverEl.src = appState.currentSong.cover;
    if (titleEl) titleEl.textContent = appState.currentSong.title;
    if (artistEl) artistEl.textContent = appState.currentSong.artist;
}

function updateProgress() {
    if (!appState.currentSong) return;
    
    const progress = appState.duration > 0 ? (appState.currentTime / appState.duration) * 100 : 0;
    
    // Update mini player progress
    const miniProgressBar = document.getElementById('mini-progress-bar');
    if (miniProgressBar) {
        miniProgressBar.style.width = `${progress}%`;
    }
    
    // Update full player progress
    const progressSlider = document.getElementById('progress-slider');
    if (progressSlider) {
        progressSlider.value = progress;
    }
    
    // Update time displays
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    if (currentTimeEl) currentTimeEl.textContent = formatTime(appState.currentTime);
    if (totalTimeEl) totalTimeEl.textContent = formatTime(appState.duration);
}

// Content Generation Functions
function generateQuickGrid() {
    const quickGrid = document.getElementById('quick-grid');
    if (!quickGrid) return;
    
    const recentItems = [...mockData.albums.slice(0, 3), ...mockData.playlists.slice(0, 3)];
    
    quickGrid.innerHTML = recentItems.slice(0, 6).map(item => `
        <button class="quick-item" onclick="handleItemClick('${item.id}', '${item.title ? 'album' : 'playlist'}')">
            <img src="${item.cover}" alt="${item.title || item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\'%3E%3Crect width=\\'60\\' height=\\'60\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <span>${item.title || item.name}</span>
        </button>
    `).join('');
}

function generateJumpBackIn() {
    const container = document.getElementById('jump-back-in');
    if (!container) return;
    
    const items = [...mockData.albums.slice(2), ...mockData.playlists.slice(2)];
    
    container.innerHTML = items.map(item => `
        <button class="card" onclick="handleItemClick('${item.id}', '${item.title ? 'album' : 'playlist'}')">
            <img src="${item.cover}" alt="${item.title || item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'128\\' height=\\'128\\' viewBox=\\'0 0 128 128\\'%3E%3Crect width=\\'128\\' height=\\'128\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <h3>${item.title || item.name}</h3>
            <p>${item.artist || item.creator}</p>
        </button>
    `).join('');
}

function generateFavoriteArtists() {
    const container = document.getElementById('favorite-artists');
    if (!container) return;
    
    container.innerHTML = mockData.artists.map(artist => `
        <button class="card artist-card" onclick="showArtistDetail('${artist.id}')">
            <img src="${artist.image}" alt="${artist.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'128\\' height=\\'128\\' viewBox=\\'0 0 128 128\\'%3E%3Ccircle cx=\\'64\\' cy=\\'64\\' r=\\'64\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <h3>${artist.name}</h3>
            <p>Artist</p>
        </button>
    `).join('');
}

function generateGenres() {
    const container = document.getElementById('genres-grid');
    if (!container) return;
    
    container.innerHTML = mockData.genres.map(genre => `
        <button class="genre-card ${genre.color}" onclick="handleCategoryClick('${genre.name}')">
            #${genre.name}
        </button>
    `).join('');
}

function generateCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;
    
    container.innerHTML = mockData.categories.map(category => `
        <button class="category-card ${category.color}" onclick="handleCategoryClick('${category.name}')">
            ${category.name}
        </button>
    `).join('');
}

function generateLibraryContent() {
    const container = document.getElementById('library-content');
    if (!container) return;
    
    let content = [];
    
    switch (appState.libraryFilter) {
        case 'Albums':
            content = mockData.albums.map(album => ({
                ...album,
                type: 'album',
                subtitle: album.artist
            }));
            break;
        case 'Artists':
            content = mockData.artists.map(artist => ({
                ...artist,
                type: 'artist',
                title: artist.name,
                cover: artist.image,
                subtitle: 'Artist'
            }));
            break;
        default:
            content = mockData.playlists.map(playlist => ({
                ...playlist,
                type: 'playlist',
                title: playlist.name,
                subtitle: `Playlist • ${playlist.creator}`
            }));
    }
    
    if (appState.libraryViewMode === 'grid') {
        container.className = 'library-content library-grid';
    } else {
        container.className = 'library-content library-list';
    }
    
    container.innerHTML = content.map(item => `
        <button class="library-item" onclick="handleItemClick('${item.id}', '${item.type}')">
            <img src="${item.cover}" alt="${item.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 48 48\\'%3E%3Crect width=\\'48\\' height=\\'48\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <div class="library-item-info">
                <h3>${item.title}</h3>
                <p>${item.subtitle}</p>
            </div>
        </button>
    `).join('');
}

function generateSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;
    
    const settings = [
        { id: 'account', title: 'Account', subtitle: 'Username • Free premium for friends', icon: 'user' },
        { id: 'content', title: 'Content and display', subtitle: 'Canvas • App language', icon: 'palette' },
        { id: 'playback', title: 'Playback', subtitle: 'Gapless playback • Autoplay', icon: 'volume-2' },
        { id: 'privacy', title: 'Privacy and social', subtitle: 'Recently played artists • Public playlists', icon: 'lock' },
        { id: 'notifications', title: 'Notifications', subtitle: 'Push • Email', icon: 'bell' },
        { id: 'devices', title: 'Apps and devices', subtitle: 'Amazon Alexa • Spotify Connect control', icon: 'smartphone' },
        { id: 'offline', title: 'Data-saving and offline', subtitle: 'Data saver • Downloads over cellular', icon: 'download' },
        { id: 'quality', title: 'Media quality', subtitle: 'Wi-Fi streaming quality • Cellular streaming quality', icon: 'bar-chart-3' },
        { id: 'about', title: 'About', subtitle: 'Version • Privacy Policy', icon: 'info' }
    ];
    
    container.innerHTML = settings.map(setting => `
        <button class="settings-item" onclick="handleSettingClick('${setting.id}')">
            <div class="settings-icon">
                <i data-lucide="${setting.icon}"></i>
            </div>
            <div class="settings-info">
                <h3>${setting.title}</h3>
                <p>${setting.subtitle}</p>
            </div>
            <i data-lucide="chevron-right"></i>
        </button>
    `).join('');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Event Handlers
function handleItemClick(itemId, itemType) {
    if (itemType === 'album') {
        showAlbumDetail(itemId);
    } else if (itemType === 'playlist') {
        showPlaylistDetail(itemId);
    } else if (itemType === 'artist') {
        showArtistDetail(itemId);
    }
}

function handleCategoryClick(category) {
    console.log('Category clicked:', category);
}

function handleSettingClick(settingId) {
    console.log('Setting clicked:', settingId);
}

function showAlbumDetail(albumId) {
    const album = mockData.albums.find(a => a.id === albumId);
    if (!album) return;
    
    const albumSongs = mockData.songs.filter(song => song.albumId === albumId);
    
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;
    
    detailContent.innerHTML = `
        <div class="detail-hero">
            <img src="${album.cover}" alt="${album.title}" class="detail-cover" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'256\\' height=\\'256\\' viewBox=\\'0 0 256 256\\'%3E%3Crect width=\\'256\\' height=\\'256\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <h1 class="detail-title">${album.title}</h1>
            <p class="detail-subtitle">Album • ${album.year}</p>
            <p class="detail-meta">${album.artist}</p>
            <p class="detail-meta">${albumSongs.length} songs</p>
        </div>
        
        <div class="detail-actions">
            <div class="action-buttons">
                <button class="icon-btn"><i data-lucide="user-plus"></i></button>
                <button class="icon-btn"><i data-lucide="share"></i></button>
                <button class="icon-btn"><i data-lucide="more-horizontal"></i></button>
            </div>
            <div class="play-controls">
                <button class="icon-btn" onclick="toggleShuffle()">
                    <i data-lucide="shuffle" class="${appState.isShuffled ? 'active' : ''}"></i>
                </button>
                <button class="play-btn" onclick="playAlbum('${albumId}')">
                    <i data-lucide="play"></i>
                </button>
            </div>
        </div>
        
        <div class="song-list">
            ${albumSongs.map((song, index) => `
                <button class="song-item" onclick="playSongFromList('${song.id}', '${albumId}')">
                    <img src="${song.cover}" alt="${song.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'56\\' height=\\'56\\' viewBox=\\'0 0 56 56\\'%3E%3Crect width=\\'56\\' height=\\'56\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
                    <div class="song-info">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                    <span class="song-duration">${song.duration}</span>
                    <button class="icon-btn" onclick="event.stopPropagation()">
                        <i data-lucide="more-vertical"></i>
                    </button>
                </button>
            `).join('')}
        </div>
    `;
    
    showScreen('detail-screen');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showPlaylistDetail(playlistId) {
    const playlist = mockData.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    const playlistSongs = mockData.songs.filter(song => playlist.songs.includes(song.id));
    
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;
    
    detailContent.innerHTML = `
        <div class="detail-hero">
            <img src="${playlist.cover}" alt="${playlist.name}" class="detail-cover" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'256\\' height=\\'256\\' viewBox=\\'0 0 256 256\\'%3E%3Crect width=\\'256\\' height=\\'256\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
            <h1 class="detail-title">${playlist.name}</h1>
            <p class="detail-subtitle">Playlist</p>
            <p class="detail-meta">${playlist.creator}</p>
            <p class="detail-meta">${playlist.duration}</p>
        </div>
        
        <div class="detail-actions">
            <div class="action-buttons">
                <button class="icon-btn"><i data-lucide="user-plus"></i></button>
                <button class="icon-btn"><i data-lucide="share"></i></button>
                <button class="icon-btn"><i data-lucide="more-horizontal"></i></button>
            </div>
            <div class="play-controls">
                <button class="icon-btn" onclick="toggleShuffle()">
                    <i data-lucide="shuffle" class="${appState.isShuffled ? 'active' : ''}"></i>
                </button>
                <button class="play-btn" onclick="playPlaylist('${playlistId}')">
                    <i data-lucide="play"></i>
                </button>
            </div>
        </div>
        
        <div class="song-list">
            ${playlistSongs.map((song, index) => `
                <button class="song-item" onclick="playSongFromPlaylist('${song.id}', '${playlistId}')">
                    <img src="${song.cover}" alt="${song.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'56\\' height=\\'56\\' viewBox=\\'0 0 56 56\\'%3E%3Crect width=\\'56\\' height=\\'56\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
                    <div class="song-info">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                    <span class="song-duration">${song.duration}</span>
                    <button class="icon-btn" onclick="event.stopPropagation()">
                        <i data-lucide="more-vertical"></i>
                    </button>
                </button>
            `).join('')}
        </div>
    `;
    
    showScreen('detail-screen');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showArtistDetail(artistId) {
    const artist = mockData.artists.find(a => a.id === artistId);
    if (!artist) return;
    
    const artistAlbums = mockData.albums.filter(album => album.artist.includes(artist.name));
    const artistSongs = mockData.songs.filter(song => song.artist.includes(artist.name)).slice(0, 5);
    
    const artistHeader = document.getElementById('artist-header');
    const artistContent = document.getElementById('artist-content');
    
    if (!artistHeader || !artistContent) return;
    
    artistHeader.innerHTML = `
        <button class="icon-btn" onclick="showScreen('home-screen')" style="position: absolute; top: 16px; left: 16px; z-index: 10;">
            <i data-lucide="chevron-left"></i>
        </button>
        <img src="${artist.image}" alt="${artist.name}" class="artist-bg" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'256\\' viewBox=\\'0 0 400 256\\'%3E%3Crect width=\\'400\\' height=\\'256\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
        <div class="artist-info">
            <h1 class="artist-name">${artist.name}</h1>
            <p class="artist-followers">${artist.followers?.toLocaleString()} followers</p>
        </div>
        <div class="artist-actions">
            <button class="play-btn" onclick="playArtistSongs('${artistId}')">
                <i data-lucide="play"></i>
            </button>
            <button class="follow-btn">Follow</button>
            <button class="icon-btn">
                <i data-lucide="more-horizontal"></i>
            </button>
        </div>
    `;
    
    artistContent.innerHTML = `
        <div class="section">
            <h2 class="section-title">Popular</h2>
            <div class="song-list">
                ${artistSongs.map((song, index) => `
                    <button class="song-item" onclick="playSongFromArtist('${song.id}', '${artistId}')">
                        <span style="color: #b3b3b3; width: 24px; text-align: center;">${index + 1}</span>
                        <img src="${song.cover}" alt="${song.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'56\\' height=\\'56\\' viewBox=\\'0 0 56 56\\'%3E%3Crect width=\\'56\\' height=\\'56\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
                        <div class="song-info">
                            <div class="song-title">${song.title}</div>
                            <div class="song-artist">${song.artist}</div>
                        </div>
                        <button class="icon-btn" onclick="event.stopPropagation()">
                            <i data-lucide="heart"></i>
                        </button>
                        <span class="song-duration">${song.duration}</span>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Albums</h2>
            <div class="horizontal-scroll">
                ${artistAlbums.map(album => `
                    <button class="card" onclick="showAlbumDetail('${album.id}')">
                        <img src="${album.cover}" alt="${album.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'128\\' height=\\'128\\' viewBox=\\'0 0 128 128\\'%3E%3Crect width=\\'128\\' height=\\'128\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
                        <h3>${album.title}</h3>
                        <p>Album • ${album.year}</p>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    showScreen('artist-screen');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Play functions
function playAlbum(albumId) {
    const albumSongs = mockData.songs.filter(song => song.albumId === albumId);
    if (albumSongs.length > 0) {
        playSong(albumSongs[0], albumSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function playPlaylist(playlistId) {
    const playlist = mockData.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    const playlistSongs = mockData.songs.filter(song => playlist.songs.includes(song.id));
    if (playlistSongs.length > 0) {
        playSong(playlistSongs[0], playlistSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function playSongFromList(songId, albumId) {
    const song = mockData.songs.find(s => s.id === songId);
    const albumSongs = mockData.songs.filter(s => s.albumId === albumId);
    if (song) {
        playSong(song, albumSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function playSongFromPlaylist(songId, playlistId) {
    const song = mockData.songs.find(s => s.id === songId);
    const playlist = mockData.playlists.find(p => p.id === playlistId);
    if (song && playlist) {
        const playlistSongs = mockData.songs.filter(s => playlist.songs.includes(s.id));
        playSong(song, playlistSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function playSongFromArtist(songId, artistId) {
    const song = mockData.songs.find(s => s.id === songId);
    const artist = mockData.artists.find(a => a.id === artistId);
    if (song && artist) {
        const artistSongs = mockData.songs.filter(s => s.artist.includes(artist.name));
        playSong(song, artistSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function playArtistSongs(artistId) {
    const artist = mockData.artists.find(a => a.id === artistId);
    if (!artist) return;
    
    const artistSongs = mockData.songs.filter(song => song.artist.includes(artist.name));
    if (artistSongs.length > 0) {
        playSong(artistSongs[0], artistSongs);
        appState.isPlaying = true;
        updatePlayButtons();
    }
}

function toggleShuffle() {
    appState.isShuffled = !appState.isShuffled;
    const shuffleBtns = document.querySelectorAll('#shuffle-btn i');
    shuffleBtns.forEach(btn => {
        if (appState.isShuffled) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function toggleRepeat() {
    appState.isRepeating = !appState.isRepeating;
    const repeatBtns = document.querySelectorAll('#repeat-btn i');
    repeatBtns.forEach(btn => {
        if (appState.isRepeating) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Search Functions
function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    const searchCategories = document.getElementById('search-categories');
    
    if (!query.trim()) {
        searchResults.classList.add('hidden');
        searchCategories.classList.remove('hidden');
        return;
    }
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // Search albums
    mockData.albums.forEach(album => {
        if (album.title.toLowerCase().includes(lowerQuery) || album.artist.toLowerCase().includes(lowerQuery)) {
            results.push({
                ...album,
                type: 'album',
                name: album.title,
                subtitle: `Album • ${album.artist}`
            });
        }
    });
    
    // Search artists
    mockData.artists.forEach(artist => {
        if (artist.name.toLowerCase().includes(lowerQuery)) {
            results.push({
                ...artist,
                type: 'artist',
                name: artist.name,
                cover: artist.image,
                subtitle: `Artist • ${artist.followers?.toLocaleString()} followers`
            });
        }
    });
    
    // Search songs
    mockData.songs.forEach(song => {
        if (song.title.toLowerCase().includes(lowerQuery) || song.artist.toLowerCase().includes(lowerQuery)) {
            results.push({
                ...song,
                type: 'song',
                name: song.title,
                subtitle: `Song • ${song.artist}`
            });
        }
    });
    
    if (results.length > 0) {
        searchResults.innerHTML = `
            <h2 class="section-title">Results for "${query}"</h2>
            <div class="song-list">
                ${results.map(result => `
                    <button class="song-item" onclick="handleSearchResult('${result.id}', '${result.type}')">
                        <img src="${result.cover}" alt="${result.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'56\\' height=\\'56\\' viewBox=\\'0 0 56 56\\'%3E%3Crect width=\\'56\\' height=\\'56\\' fill=\\'%23333\\'/%3E%3C/svg%3E'">
                        <div class="song-info">
                            <div class="song-title">${result.name}</div>
                            <div class="song-artist">${result.subtitle}</div>
                        </div>
                    </button>
                `).join('')}
            </div>
        `;
        searchResults.classList.remove('hidden');
        searchCategories.classList.add('hidden');
    } else {
        searchResults.innerHTML = `
            <h2 class="section-title">Results for "${query}"</h2>
            <p style="text-align: center; color: #b3b3b3; padding: 32px;">No results found for "${query}"</p>
        `;
        searchResults.classList.remove('hidden');
        searchCategories.classList.add('hidden');
    }
}

function handleSearchResult(resultId, resultType) {
    switch (resultType) {
        case 'album':
            showAlbumDetail(resultId);
            break;
        case 'artist':
            showArtistDetail(resultId);
            break;
        case 'song':
            const song = mockData.songs.find(s => s.id === resultId);
            if (song) {
                playSong(song, [song]);
                appState.isPlaying = true;
                updatePlayButtons();
            }
            break;
    }
}

// Initialize App
function initializeApp() {
    console.log('Initializing app...');
    
    // Get audio player
    audioPlayer = document.getElementById('audio-player');
    
    // Set greeting based on time
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    
    const greetingEl = document.querySelector('.greeting');
    if (greetingEl) greetingEl.textContent = greeting;
    
    // Generate initial content
    try {
        generateQuickGrid();
        generateJumpBackIn();
        generateFavoriteArtists();
        generateGenres();
        generateCategories();
        generateLibraryContent();
        generateSettings();
        
        console.log('Content generated successfully');
    } catch (error) {
        console.error('Error generating content:', error);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Icons initialized');
    } else {
        console.warn('Lucide not loaded');
    }
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Bottom navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen(btn.dataset.screen + '-screen');
        });
    });
    
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showScreen('settings-screen');
        });
    }
    
    // Back buttons
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }
    
    const settingsBackBtn = document.getElementById('settings-back-btn');
    if (settingsBackBtn) {
        settingsBackBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }
    
    // Audio player events
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', () => {
            appState.currentTime = audioPlayer.currentTime;
            updateProgress();
        });
        
        audioPlayer.addEventListener('loadedmetadata', () => {
            appState.duration = audioPlayer.duration;
            updateProgress();
        });
        
        audioPlayer.addEventListener('ended', () => {
            if (appState.isRepeating) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            } else {
                nextSong();
            }
        });
        
        audioPlayer.addEventListener('play', () => {
            appState.isPlaying = true;
            updatePlayButtons();
        });
        
        audioPlayer.addEventListener('pause', () => {
            appState.isPlaying = false;
            updatePlayButtons();
        });
    }
    
    // Mini player events
    const miniPlayerExpand = document.getElementById('mini-player-expand');
    if (miniPlayerExpand) {
        miniPlayerExpand.addEventListener('click', () => {
            document.getElementById('full-player').classList.remove('hidden');
        });
    }
    
    const miniPlayBtn = document.getElementById('mini-play-btn');
    if (miniPlayBtn) {
        miniPlayBtn.addEventListener('click', togglePlay);
    }
    
    // Full player events
    const fullPlayerClose = document.getElementById('full-player-close');
    if (fullPlayerClose) {
        fullPlayerClose.addEventListener('click', () => {
            document.getElementById('full-player').classList.add('hidden');
        });
    }
    
    const mainPlayBtn = document.getElementById('main-play-btn');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', togglePlay);
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
    }
    
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSong);
    }
    
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', toggleShuffle);
    }
    
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
        repeatBtn.addEventListener('click', toggleRepeat);
    }
    
    // Progress slider
    const progressSlider = document.getElementById('progress-slider');
    if (progressSlider) {
        progressSlider.addEventListener('input', (e) => {
            const time = (e.target.value / 100) * appState.duration;
            seekTo(time);
        });
    }
    
    // Volume controls
    const volumeBtn = document.getElementById('volume-btn');
    if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
            const volumeSlider = document.getElementById('volume-slider');
            if (volumeSlider) {
                volumeSlider.classList.toggle('hidden');
            }
        });
    }
    
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            setVolume(e.target.value / 100);
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            appState.searchQuery = e.target.value;
            performSearch(appState.searchQuery);
            
            if (clearSearch) {
                if (e.target.value) {
                    clearSearch.classList.remove('hidden');
                } else {
                    clearSearch.classList.add('hidden');
                }
            }
        });
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
            }
            appState.searchQuery = '';
            clearSearch.classList.add('hidden');
            performSearch('');
        });
    }
    
    // Library filters
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            appState.libraryFilter = tab.dataset.filter;
            generateLibraryContent();
        });
    });
    
    // View toggle
    const viewToggle = document.getElementById('view-toggle');
    if (viewToggle) {
        viewToggle.addEventListener('click', () => {
            appState.libraryViewMode = appState.libraryViewMode === 'grid' ? 'list' : 'grid';
            generateLibraryContent();
            
            const icon = viewToggle.querySelector('i');
            if (icon) {
                if (appState.libraryViewMode === 'grid') {
                    icon.setAttribute('data-lucide', 'list');
                } else {
                    icon.setAttribute('data-lucide', 'grid');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
    
    console.log('Event listeners set up successfully');
}

// Start the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting app...');
    
    // Wait for Lucide to load
    if (typeof lucide !== 'undefined') {
        initializeApp();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                initializeApp();
            } else {
                console.warn('Lucide failed to load, initializing without icons');
                initializeApp();
            }
        }, 1000);
    }
});

// Also try to initialize when the window loads
window.addEventListener('load', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
