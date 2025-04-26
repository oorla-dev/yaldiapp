document.addEventListener("DOMContentLoaded", () => {
  // --- DATA ---
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi.png",
      available: true,
      tracks: [
        { id: 101, title: "THE GARDEN OF ALDI", duration: "3:05", audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3" },
        { id: 102, title: "THE ALDI STORM", duration: "3:38", audioSrc: "YALDHI/02 THE ALDI STORM.m4a" },
        { id: 103, title: "NEW ALDI", duration: "4:00", audioSrc: "YALDHI/03 NEW ALDI.mp3" },
        { id: 104, title: "80 ALDYIES", duration: "2:48", audioSrc: "YALDHI/04 80 ALDYIES.m4a" },
        { id: 105, title: "ALDI IN THE SKY", duration: "4:44", audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3" },
        { id: 106, title: "ALDIEN", duration: "2:04", audioSrc: "YALDHI/06 ALDIEN.mp3" },
        { id: 107, title: "BROTHERS OF ALDI", duration: "4:15", audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3" },
        { id: 108, title: "FVCK GIANVOIT", duration: "2:00", audioSrc: "YALDHI/08 FVCK GIANVOIT.mp3" },
      ],
    },
    {
      id: 2,
      title: "DONDA 2",
      year: "2022",
      image: "images/donda2.jpg",
      available: false,
      tracks: [
        { id: 201, title: "TRUE LOVE", duration: "3:15", audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3" },
        { id: 202, title: "BROKEN ROAD", duration: "4:02", audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3" },
        { id: 203, title: "GET LOST", duration: "2:47", audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3" },
        { id: 204, title: "TOO EASY", duration: "3:22", audioSrc: "YALDHI/06 ALDIEN.mp3" },
      ],
    },
    {
      id: 3,
      title: "BULDY",
      year: "2025",
      image: "images/buldy.jpg",
      available: false,
      tracks: [{ id: 301, title: "FIRST TIME", duration: "3:33", audioSrc: "YALDHI/08 FVCK GIANVOIT.mp3" }],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2.jpg",
      available: false,
      tracks: [
        { id: 401, title: "STARS", duration: "3:10", audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3" },
        { id: 402, title: "VULTURES", duration: "4:05", audioSrc: "YALDHI/06 ALDIEN.mp3" },
        { id: 403, title: "CARNIVAL", duration: "3:50", audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3" },
        { id: 404, title: "KEYS TO MY LIFE", duration: "3:25", audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3" },
      ],
    },
  ];

  const products = [
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhicd.png", price: "€30.00", category: "music" },
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€30.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€30.00", category: "apparel" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€30.00", category: "music" },
  ];

  const events = [
    {
      title: "Y$Ø",
      subtitle: "YALDHI",
      desc: "LISTENING EXPERIENCE",
      location: "PERUGIA",
      venue: "DISCALDI ARENA",
      date: "1 4 25",
    },
    {
      title: "YE",
      subtitle: "DONDA 2",
      desc: "LISTENING EXPERIENCE",
      location: "PESARO",
      venue: "DISCALDI ARENA",
      date: "4 9 25",
    },
  ];

  // --- APPLICATION STATE ---
  let currentView = "main-view";
  let currentAlbum = null;
  let currentTrack = null;
  let isPlaying = false;
  let userInteracted = false; // Track if user has interacted with the page
  const audioPlayer = document.getElementById("audio-player");

  // --- CACHE FREQUENTLY USED DOM ELEMENTS ---
  const playButtons = document.querySelectorAll(".play-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");
  const nextButtons = document.querySelectorAll(".next-btn");
  const playerBars = document.querySelectorAll(".player-bar");
  const navItems = document.querySelectorAll(".nav-item");
  const appContainers = document.querySelectorAll(".app-container");

  // --- INITIALIZATION ---
  function init() {
    if (!audioPlayer) {
      console.error("Critical Error: Main audio player element (#audio-player) not found!");
      return;
    }

    renderAlbumGrid();
    renderProducts();
    renderEvents();
    setupNavigation();
    setupAudioPlayer();
    setupCategoryFilters();
    setupUserInteractionTracking();

    console.log("App initialized.");
  }

  // Track user interaction to enable audio
  function setupUserInteractionTracking() {
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    
    function handleFirstInteraction() {
      userInteracted = true;
      console.log("User has interacted with the page. Audio playback should now be allowed.");
      
      // Remove event listeners once interaction is detected
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    }
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleFirstInteraction);
    });
  }

  // --- NAVIGATION BETWEEN VIEWS ---
  function setupNavigation() {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view");
        if (!targetViewId || targetViewId === currentView) return;
        
        switchView(targetViewId);

        // Update active state in all nav bars
        navItems.forEach((navItem) => {
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId);
        });
      });
    });
  }

  function switchView(viewId) {
    console.log("Switching to view:", viewId);
    currentView = viewId;
    
    // Hide all views
    appContainers.forEach((container) => {
      container.classList.add("hidden");
    });
    
    // Show target view
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.remove("hidden");
    } else {
      console.error("Target view not found:", viewId);
    }
  }

  // --- CONTENT RENDERING ---
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid");
    if (!albumGrid) return;

    albumGrid.innerHTML = "";
    
    albums.forEach((album) => {
      const albumElement = document.createElement("div");
      albumElement.className = `album-item ${!album.available ? "opacity-80" : ""}`;
      
      let imageType = "image/jpeg";
      if (album.image.endsWith(".png")) imageType = "image/png";
      
      albumElement.innerHTML = `
        <picture>
          <source srcset="${album.image}" type="${imageType}">
          <img src="${album.image}" alt="${album.title} cover">
        </picture>
        ${!album.available ? '<div class="album-overlay"><span>COMING SOON</span></div>' : ''}
        <div class="album-title">${album.title}</div>
        <div class="album-year">${album.year}</div>
      `;
      
      albumElement.addEventListener("click", () => {
        if (album.available) {
          showAlbumDetail(album);
        } else {
          console.log("Album not available yet");
        }
      });
      
      albumGrid.appendChild(albumElement);
    });
  }

  function showAlbumDetail(album) {
    currentAlbum = album;
    const detailView = document.getElementById("album-detail-view");
    if (!detailView) {
      console.error("Album detail view not found");
      return;
    }

    // Update album info
    detailView.querySelector(".album-title").textContent = album.title;
    detailView.querySelector(".album-title-large").textContent = album.title;
    detailView.querySelector(".album-year").textContent = album.year;
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`;
    
    const albumCoverPicture = detailView.querySelector(".album-cover-picture");
    const albumSource = albumCoverPicture.querySelector(".album-source");
    const albumCover = albumCoverPicture.querySelector(".album-cover");
    
    let imageType = "image/jpeg";
    if (album.image.endsWith(".png")) imageType = "image/png";
    
    albumSource.srcset = album.image;
    albumSource.type = imageType;
    albumCover.src = album.image;
    albumCover.alt = `${album.title} album cover`;

    // Render tracks list
    const tracksList = detailView.querySelector(".tracks-list");
    tracksList.innerHTML = "";
    
    album.tracks.forEach((track) => {
      const trackElement = document.createElement("div");
      trackElement.className = "track-item";
      trackElement.dataset.trackId = track.id;
      
      trackElement.innerHTML = `
        <div class="track-left">
          <i class="fas fa-music track-icon"></i>
          <span class="track-name">${track.title}</span>
        </div>
        <div class="track-duration">${track.duration}</div>
      `;
      
      trackElement.addEventListener("click", () => {
        selectTrack(track, album);
      });
      
      tracksList.appendChild(trackElement);
    });

    // Update track list UI (highlight current track if it belongs to this album)
    updateTrackListUI(currentTrack && currentTrack.albumId === album.id ? currentTrack.id : null);

    // Show album detail view
    switchView("album-detail-view");

    // Setup back button
    const backButton = detailView.querySelector(".back-btn");
    if (backButton) {
      // Clone to remove previous event listeners
      const newBackButton = backButton.cloneNode(true);
      backButton.parentNode.replaceChild(newBackButton, backButton);
      
      newBackButton.addEventListener("click", () => {
        switchView("main-view");
        
        // Update nav bar
        navItems.forEach((navItem) => {
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === "main-view");
        });
      });
    }
  }

  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid");
    if (!productsGrid) return;
    
    productsGrid.innerHTML = "";
    
    const filteredProducts = category === "all" 
      ? products 
      : products.filter(p => p.category === category);
    
    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p>Nessun prodotto trovato.</p>";
      return;
    }
    
    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-item";
      
      productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-id">${product.id}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
      `;
      
      productsGrid.appendChild(productElement);
    });
  }

  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid");
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = "";
    
    if (events.length === 0) {
      eventsGrid.innerHTML = "<p>Nessun evento.</p>";
      return;
    }
    
    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event-card";
      
      eventElement.innerHTML = `
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-subtitle">${event.subtitle}</div>
          <div class="event-desc">${event.desc}</div>
          <div class="event-location">${event.location}</div>
          <div class="event-venue">${event.venue}</div>
          <div class="event-date">${event.date}</div>
        </div>
      `;
      
      eventsGrid.appendChild(eventElement);
    });
  }

  // --- AUDIO PLAYER LOGIC ---
  function setupAudioPlayer() {
    // Set up event listeners for player controls
    playButtons.forEach((btn) => btn.addEventListener("click", togglePlayPause));
    prevButtons.forEach((btn) => btn.addEventListener("click", playPrevTrack));
    nextButtons.forEach((btn) => btn.addEventListener("click", playNextTrack));

    // Set up audio element event listeners
    audioPlayer.addEventListener("ended", playNextTrack);
    audioPlayer.addEventListener("play", handlePlayEvent);
    audioPlayer.addEventListener("pause", handlePauseEvent);
    audioPlayer.addEventListener("error", handleErrorEvent);
  }

  function handlePlayEvent() {
    console.log("Audio player event: play");
    isPlaying = true;
    updatePlayPauseButton();
    updateTrackIcon(true);
  }

  function handlePauseEvent() {
    console.log("Audio player event: pause/ended");
    isPlaying = false;
    updatePlayPauseButton();
    updateTrackIcon(false);
  }

  function handleErrorEvent(e) {
    console.error("Audio Player Error:", e, audioPlayer.error);
    isPlaying = false;
    updatePlayPauseButton();
    updateTrackIcon(false);
    
    // Reset player bar UI
    playerBars.forEach((playerBar) => {
      const img = playerBar.querySelector(".now-playing img");
      const titleEl = playerBar.querySelector(".track-title");
      const albumEl = playerBar.querySelector(".track-album");
      
      if (img) img.src = "placeholder.svg";
      if (titleEl) titleEl.textContent = "Errore Audio";
      if (albumEl) albumEl.textContent = "";
    });
  }

  // This function selects a track but doesn't automatically play it
  function selectTrack(track, album) {
    if (!track || !album) {
      console.error("selectTrack called without valid track or album.");
      return;
    }

    // Handle click on same track (toggle play/pause)
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
      return;
    }

    // Change track
    console.log(`Selected track (ID: ${track.id}): ${track.title}`);
    
    // Save reference to current track and album
    currentTrack = { ...track, albumId: album.id };
    currentAlbum = album;

    // Verify audio path
    console.log(`Setting audio source to: ${track.audioSrc}`);
    
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(`Error: Invalid audio path for track "${track.title}" (ID: ${track.id}). Received:`, track.audioSrc);
      alert(`Error: Missing or invalid audio path for "${track.title}". Check the data in the 'albums' array.`);
      return;
    }

    // Set the audio source
    audioPlayer.src = track.audioSrc;
    audioPlayer.load();

    // Update player bar UI
    playerBars.forEach((playerBar) => {
      const img = playerBar.querySelector(".now-playing img");
      const titleEl = playerBar.querySelector(".track-title");
      const albumEl = playerBar.querySelector(".track-album");
      
      if (img) {
        img.src = currentAlbum.image || "placeholder.svg";
        img.alt = `Now playing: ${track.title}`;
      }
      if (titleEl) titleEl.textContent = track.title;
      if (albumEl) albumEl.textContent = currentAlbum.title;
    });

    // Update track list UI if in album detail view
    if (currentView === "album-detail-view" && currentAlbum.id === album.id) {
      updateTrackListUI(track.id);
    } else if (currentView === "album-detail-view") {
      updateTrackListUI(null);
    }

    // Don't auto-play, wait for user to press play
    isPlaying = false;
    updatePlayPauseButton();
  }

  // --- UI UPDATES ---
  function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view" || !currentAlbum) return;
    
    const tracksList = document.querySelector("#album-detail-view .tracks-list");
    if (!tracksList) return;
    
    tracksList.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon");
      const isCurrentTrack = String(item.dataset.trackId) === String(activeTrackId);
      
      item.classList.toggle("active", isCurrentTrack);
      
      if (icon) {
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active");
        
        if (isCurrentTrack) {
          icon.classList.add("active");
          icon.classList.add(isPlaying ? "fa-volume-up" : "fa-pause");
        } else {
          icon.classList.add("fa-music");
        }
      }
    });
  }

  function updateTrackIcon(isPlayingNow) {
    if (currentView === "album-detail-view" && currentTrack) {
      const activeTrackItem = document.querySelector(
        `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`
      );
      
      if (activeTrackItem) {
        const icon = activeTrackItem.querySelector(".track-icon");
        
        if (icon && activeTrackItem.classList.contains("active")) {
          icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up");
          icon.classList.add(isPlayingNow ? "fa-volume-up" : "fa-pause");
        }
      }
    }
  }

  function updatePlayPauseButton() {
    playButtons.forEach((btn) => {
      btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
  }

  // --- PLAYER CONTROLS ---
  function togglePlayPause() {
    console.log("Toggle Play/Pause button clicked.");
    
    // If no track selected, try to select first track of first album
    if (!currentTrack) {
      console.log("No current track, attempting to select first track overall.");
      
      if (albums.length > 0 && albums[0].tracks.length > 0) {
        selectTrack(albums[0].tracks[0], albums[0]);
      } else {
        console.warn("No tracks available in albums for playback.");
        alert("Nessuna traccia disponibile per la riproduzione.");
      }
      return;
    }

    // Toggle play/pause for current track
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      // Try to play with proper error handling
      try {
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error);
            
            if (error.name === "NotAllowedError") {
              console.warn("Playback blocked by browser autoplay policy.");
              
              // Show a user-friendly message
              const message = document.createElement('div');
              message.className = 'autoplay-message';
              message.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: white; 
                            padding: 15px; text-align: center; z-index: 9999;">
                  Per riprodurre l'audio, interagisci con la pagina e premi nuovamente play.
                  <button style="margin-left: 10px; padding: 5px 10px; background: white; color: black; border: none; 
                                border-radius: 3px; cursor: pointer;" id="dismiss-message">OK</button>
                </div>
              `;
              
              document.body.appendChild(message);
              
              document.getElementById('dismiss-message').addEventListener('click', function() {
                document.body.removeChild(message);
              });
            }
          });
        }
      } catch (e) {
        console.error("Exception during play attempt:", e);
      }
    }
  }

  function playNextTrack() {
    console.log("Next track requested.");
    
    if (!currentTrack || !currentAlbum) {
      console.log("No current track or album found to go to next.");
      return;
    }
    
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    
    if (currentIndex !== -1 && currentIndex < currentAlbum.tracks.length - 1) {
      // There is a next track in the same album
      console.log("Selecting next track in album.");
      selectTrack(currentAlbum.tracks[currentIndex + 1], currentAlbum);
      
      // If we were playing, try to continue playing
      if (isPlaying) {
        try {
          audioPlayer.play().catch(e => console.log("Could not auto-play next track:", e));
        } catch (e) {
          console.error("Exception during next track play:", e);
        }
      }
    } else {
      console.log("Last track of album reached.");
      
      // End of album: Pause
      if (!audioPlayer.paused) audioPlayer.pause();
    }
  }

  function playPrevTrack() {
    console.log("Previous track requested.");
    
    if (!currentTrack || !currentAlbum) {
      console.log("No current track or album found to go to previous.");
      return;
    }
    
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    
    if (currentIndex > 0) {
      // There is a previous track in the same album
      console.log("Selecting previous track in album.");
      selectTrack(currentAlbum.tracks[currentIndex - 1], currentAlbum);
      
      // If we were playing, try to continue playing
      if (isPlaying) {
        try {
          audioPlayer.play().catch(e => console.log("Could not auto-play previous track:", e));
        } catch (e) {
          console.error("Exception during previous track play:", e);
        }
      }
    } else if (currentIndex === 0) {
      // If on first track, rewind if more than 3 seconds have passed
      console.log("First track of album.");
      
      if (audioPlayer.currentTime > 3) {
        console.log("Rewinding current track.");
        audioPlayer.currentTime = 0;
      } else {
        console.log("Less than 3 seconds elapsed, no action.");
      }
    } else {
      console.log("Track not found in current album or index error.");
    }
  }

  // --- UTILITY FUNCTIONS ---
  function findTrackIndex(track, album) {
    if (!track || !album || !album.tracks) return -1;
    
    return album.tracks.findIndex((t) => String(t.id) === String(track.id));
  }

  // --- STORE & EVENTS ---
  function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll("#stores-view .category-btn");
    
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        
        renderProducts(category);
      });
    });
  }

  // --- START APPLICATION ---
  init();
});
