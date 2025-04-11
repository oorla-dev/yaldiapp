document.addEventListener("DOMContentLoaded", () => {
  // Data (rimane invariato)
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi.png",
      tracks: [
        { id: 101, title: "The Garden Of Aldi", duration: "3:05", audioSrc: "YALDHI/garden.mp3" },
        { id: 102, title: "The Aldi Storm", duration: "3:38", audioSrc: "MUSICA/YALDHI/YALDHI/Storm.m4a" },
        { id: 103, title: "New Aldi", duration: "4:00", audioSrc: "MUSICA/YALDHI/YALDHI/New.mp3" },
        { id: 104, title: "80 Aldyies", duration: "2:48", audioSrc: "MUSICA/YALDHI/YALDHI/Hurric.m4a" },
        { id: 105, title: "Aldi In The Sky", duration: "4:44", audioSrc: "YALDHI/city.mp3" },
        { id: 106, title: "Aldien", duration: "2:04", audioSrc: "YALDHI/alien.mp3" },
        { id: 107, title: "Brothers Of Aldi", duration: "4:15", audioSrc: "audio/yaldhi-praise-god.mp3" },
        { id: 108, title: "Fuck Gianvoit", duration: "2:00", audioSrc: "YALDHI/fg.mp3" },
      ],
    },
    {
      id: 2,
      title: "DONDA 2",
      year: "2022",
      image: "images/donda2.jpg",
      tracks: [
        { id: 201, title: "True Love", duration: "3:15", audioSrc: "audio/donda2-true-love.mp3" },
        { id: 202, title: "Broken Road", duration: "4:02", audioSrc: "audio/donda2-broken-road.mp3" },
        { id: 203, title: "Get Lost", duration: "2:47", audioSrc: "audio/donda2-get-lost.mp3" },
        { id: 204, title: "Too Easy", duration: "3:22", audioSrc: "audio/donda2-too-easy.mp3" },
      ],
    },
     {
      id: 3,
      title: "BULDY",
      year: "2025",
      image: "images/buldy.jpg",
      tracks: [
        { id: 301, title: "First Time", duration: "3:33", audioSrc: "audio/buldy-first-time.mp3" },
      ],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2.jpg",
      tracks: [
        { id: 401, title: "Stars", duration: "3:10", audioSrc: "audio/jl2-stars.mp3" },
        { id: 402, title: "Vultures", duration: "4:05", audioSrc: "audio/jl2-vultures.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 404, title: "Keys To My Life", duration: "3:25", audioSrc: "audio/jl2-keys-to-my-life.mp3" },
      ],
    },
  ];

  const products = [ // Dati prodotti invariati...
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhicd.png", price: "€30.00", category: "music" },
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€80.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€120.00", category: "apparel" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€35.00", category: "music" },
  ];

  const events = [ // Dati eventi invariati...
     { title: "Y$Ø", subtitle: "YALDHI", desc: "LISTENING EXPERIENCE", location: "PERUGIA", venue: "DISCALDI ARENA", date: "1 4 25" },
     { title: "YE", subtitle: "DONDA 2", desc: "LISTENING EXPERIENCE", location: "PESARO", venue: "DISCALDI ARENA", date: "4 9 25" },
  ];

  // State
  let currentView = "main-view";
  let currentAlbum = null;
  let currentTrack = null; // Traccia controllata dal player principale
  let isPlaying = false;    // Stato del player principale
  const audioPlayer = document.getElementById("audio-player"); // Player principale

  // Initialize
  function init() {
    renderAlbumGrid();
    renderEvents();
    renderProducts();
    setupNavigation();
    setupAudioPlayer();
    setupCategoryFilters();
  }

  // Navigation (con pausa audio al cambio vista)
  function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view");
        if (!targetViewId || targetViewId === currentView) return;

        // Pausa player principale e player incorporati quando si cambia vista
        if (isPlaying) {
            audioPlayer.pause();
        }
        document.querySelectorAll('.embedded-audio').forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
        // Resetta highlight lista se si esce da dettaglio
        if(currentView === 'album-detail-view') {
             updateTrackListUI(null);
        }

        switchView(targetViewId);

        document.querySelectorAll('.nav-bar').forEach(navbar => {
            navbar.querySelectorAll('.nav-item').forEach(navItem => {
                 navItem.classList.toggle('active', navItem.getAttribute('data-view') === targetViewId);
            });
        });
      });
    });
  }


  function switchView(viewId) {
    console.log("Switching to view:", viewId);
    currentView = viewId;
    document.querySelectorAll(".app-container").forEach((view) => view.classList.add("hidden"));
    const targetViewElement = document.getElementById(viewId);
    if (targetViewElement) {
        targetViewElement.classList.remove("hidden");
    } else {
        console.error("Target view not found:", viewId);
    }
  }

  // Album Grid (invariato)
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid");
    if (!albumGrid) return;
    albumGrid.innerHTML = "";
    albums.forEach((album) => {
      const albumElement = document.createElement("div");
      albumElement.className = "album-item";
      let imageType = "image/jpeg";
      if (album.image.endsWith(".png")) imageType = "image/png";
      else if (album.image.endsWith(".svg")) imageType = "image/svg+xml";
      else if (album.image.endsWith(".webp")) imageType = "image/webp";
      albumElement.innerHTML = `
                <picture>
                    <source srcset="${album.image}" type="${imageType}">
                    <img src="${album.image}" alt="${album.title} cover">
                </picture>
                <div class="album-title">${album.title}</div>
                <div class="album-year">${album.year}</div>
            `;
      albumElement.addEventListener("click", () => showAlbumDetail(album));
      albumGrid.appendChild(albumElement);
    });
  }

  // Album Detail
  function showAlbumDetail(album) {
    currentAlbum = album;
    const detailView = document.getElementById("album-detail-view");
    if (!detailView) return;

    // Aggiorna intestazione e dettagli album (invariato)
    detailView.querySelector(".album-title").textContent = album.title;
    detailView.querySelector(".album-title-large").textContent = album.title;
    detailView.querySelector(".album-year").textContent = album.year;
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`;
    const albumDetailPicture = detailView.querySelector(".album-cover-picture");
    const albumDetailSource = albumDetailPicture.querySelector(".album-source");
    const albumDetailImg = albumDetailPicture.querySelector(".album-cover");
    let imageType = "image/jpeg";
    if (album.image.endsWith(".png")) imageType = "image/png";
    else if (album.image.endsWith(".svg")) imageType = "image/svg+xml";
    else if (album.image.endsWith(".webp")) imageType = "image/webp";
    albumDetailSource.srcset = album.image;
    albumDetailSource.type = imageType;
    albumDetailImg.src = album.image;
    albumDetailImg.alt = `${album.title} album cover`;

    // Render tracks
    const tracksList = detailView.querySelector(".tracks-list");
    tracksList.innerHTML = "";

    album.tracks.forEach((track, index) => {
      const trackElement = document.createElement("div");
      trackElement.className = "track-item";
      // Usa l'id della traccia come identificatore per l'elemento lista
      trackElement.dataset.trackId = track.id;

      // --- MODIFICA INIZIO: Includi info traccia E tag audio ---
      trackElement.innerHTML = `
                <div class="track-info-container">
                    <div class="track-left">
                        <i class="fas fa-music track-icon"></i>
                        <span class="track-name">${track.title}</span>
                    </div>
                    <div class="track-duration">${track.duration}</div>
                </div>
                <audio class="embedded-audio" controls style="width: 100%; height: 35px; margin-top: 5px;" src="${track.audioSrc}" data-track-id="${track.id}">
                    Your browser does not support the audio element.
                </audio>
            `;
       // --- MODIFICA FINE ---


      // --- MODIFICA: Il click sull'ELEMENTO LISTA (trackElement) controlla il player principale ---
      trackElement.addEventListener("click", (event) => {
          // Impedisci al click di propagarsi ai controlli audio interni se clicchi sull'area generale
          if (event.target.closest('.embedded-audio')) {
              return; // Non fare nulla se il click è avvenuto dentro l'audio incorporato
          }
          playTrack(track, album); // Chiama la funzione per usare il player centrale
      });
      // --- Fine Modifica ---

      tracksList.appendChild(trackElement);
    });

     // Aggiorna UI lista se necessario
     if (currentTrack && currentTrack.albumId === currentAlbum.id) {
         updateTrackListUI(currentTrack.id);
     } else {
         updateTrackListUI(null);
     }

    switchView("album-detail-view");

    // Setup back button (con pausa audio)
    const backButton = detailView.querySelector(".back-btn");
    const newBackButton = backButton.cloneNode(true);
    backButton.parentNode.replaceChild(newBackButton, backButton);
    newBackButton.addEventListener("click", () => {
        if (isPlaying) {
            audioPlayer.pause();
        }
        detailView.querySelectorAll('.embedded-audio').forEach(audio => {
             if (!audio.paused) {
                 audio.pause();
             }
        });
        switchView("main-view");
        document.querySelectorAll('#main-view .nav-item').forEach(navItem => {
            navItem.classList.toggle('active', navItem.getAttribute('data-view') === 'main-view');
        });
    });
  }

 // Player Principale (setup e controlli)
 function setupAudioPlayer() {
    document.querySelectorAll(".play-btn").forEach(btn => btn.addEventListener("click", togglePlayPause));
    document.querySelectorAll(".next-btn").forEach(btn => btn.addEventListener("click", playNextTrack));
    document.querySelectorAll(".prev-btn").forEach(btn => btn.addEventListener("click", playPrevTrack));

    audioPlayer.addEventListener("ended", playNextTrack);
    audioPlayer.addEventListener("play", () => {
        isPlaying = true;
        updatePlayPauseButton();
        updateTrackIcon(true);
        // Assicura che l'audio incorporato corrispondente sia in pausa
        pauseEmbeddedAudio(currentTrack ? currentTrack.id : null, true); // Pausa tutti tranne (potenzialmente) quello corrente
    });
    audioPlayer.addEventListener("pause", () => {
        isPlaying = false;
        updatePlayPauseButton();
        updateTrackIcon(false);
        // Non interagiamo con gli incorporati quando il principale si ferma
    });
    audioPlayer.addEventListener("error", (e) => {
        console.error("Errore audio player principale:", e);
        isPlaying = false;
        updatePlayPauseButton();
        updateTrackIcon(false);
        // Reset UI player principale
        document.querySelectorAll(".player-bar").forEach(playerBar => {
            playerBar.querySelector(".now-playing img").src = "placeholder.svg";
            playerBar.querySelector(".track-title").textContent = "";
            playerBar.querySelector(".track-album").textContent = "";
        });
        currentTrack = null;
        currentAlbum = null;
        if(currentView === 'album-detail-view') {
            updateTrackListUI(null);
        }
    });
 }

 function playTrack(track, album) {
    if (!album) return;

    // Se la traccia cliccata è già quella corrente nel player principale e sta suonando, mettila in pausa
    if (currentTrack && currentTrack.id === track.id && isPlaying) {
        audioPlayer.pause();
        return;
    }
    // Se la traccia cliccata è già quella corrente ed è in pausa, riprendi la riproduzione
    if (currentTrack && currentTrack.id === track.id && !isPlaying) {
         audioPlayer.play().catch(error => console.error("Errore ripresa riproduzione:", error));
         return;
     }

    // --- MODIFICA: Pausa tutti gli audio incorporati prima di avviare il principale ---
    console.log("Pausing all embedded audio players...");
    pauseEmbeddedAudio(null, false); // Pausa tutti senza eccezioni
    // --- Fine Modifica ---

    // Carica e suona la nuova traccia nel player principale
    currentTrack = track;
    currentAlbum = album;
    currentTrack.albumId = currentAlbum.id; // Associa album a traccia

    console.log(`Avvio traccia (player principale): ${track.title} from ${album.title}`);
    audioPlayer.src = track.audioSrc;
    audioPlayer.load();

    // Aggiorna UI player principale
    document.querySelectorAll(".player-bar").forEach(playerBar => {
        const img = playerBar.querySelector(".now-playing img");
        const titleEl = playerBar.querySelector(".track-title");
        const albumEl = playerBar.querySelector(".track-album");
        if (img) { img.src = currentAlbum.image; img.alt = `Now playing: ${track.title}`; }
        if (titleEl) titleEl.textContent = track.title;
        if (albumEl) albumEl.textContent = currentAlbum.title;
    });

    // Aggiorna UI lista tracce (evidenziazione/icona)
    if (currentView === "album-detail-view") {
        updateTrackListUI(track.id);
    }

    // Avvia riproduzione player principale
    audioPlayer.play().catch(error => {
        console.error("Errore durante avvio riproduzione principale:", error);
        // Gestito dall'event listener 'error'
    });
 }

// --- NUOVA FUNZIONE HELPER: Pausa audio incorporati ---
// excludeTrackId: ID della traccia da non mettere in pausa (se null, pausa tutte)
// resetTime: se true, porta currentTime a 0 degli audio in pausa
function pauseEmbeddedAudio(excludeTrackId = null, resetTime = false) {
    if (currentView !== "album-detail-view") return; // Sicurezza: opera solo in dettaglio
    const embeddedAudios = document.querySelectorAll('#album-detail-view .embedded-audio');
    embeddedAudios.forEach(audio => {
        const audioTrackId = audio.dataset.trackId;
        // Se l'ID non corrisponde a quello da escludere (o se non c'è esclusione)
        if (excludeTrackId === null || audioTrackId != excludeTrackId) {
            if (!audio.paused) {
                audio.pause();
                console.log(`Paused embedded audio for track ID: ${audioTrackId || 'unknown'}`);
            }
            if (resetTime) {
                audio.currentTime = 0;
            }
        }
    });
}
// --- Fine Funzione Helper ---

 function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view") return;
    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list");
    if (!tracksListContainer) return;

    tracksListContainer.querySelectorAll(".track-item").forEach(item => {
        const icon = item.querySelector(".track-icon");
        const isCurrentTrack = item.dataset.trackId == activeTrackId; // Confronto ID

        item.classList.toggle("active", isCurrentTrack); // Classe sull'intero elemento item

        if (icon) {
            icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active");
            if (isCurrentTrack) {
                // L'icona riflette lo stato del PLAYER PRINCIPALE
                icon.classList.add("active");
                icon.classList.add("fas", isPlaying ? "fa-volume-up" : "fa-pause");
            } else {
                icon.classList.add("fas", "fa-music");
            }
        }
    });
 }

 function updateTrackIcon(isPlayingNow) {
     if (currentView === "album-detail-view" && currentTrack) {
         const activeTrackItem = document.querySelector(`#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`);
         if (activeTrackItem) {
             const icon = activeTrackItem.querySelector(".track-icon");
             if (icon && activeTrackItem.classList.contains('active')) {
                  icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up");
                  // Icona basata sullo stato del PLAYER PRINCIPALE
                  icon.classList.add("fas", isPlayingNow ? 'fa-volume-up' : 'fa-pause');
             }
         }
     }
 }


 function togglePlayPause() {
    if (!audioPlayer.src || !currentTrack) {
        if (albums.length > 0 && albums[0].tracks.length > 0) {
            playTrack(albums[0].tracks[0], albums[0]); // Avvia la prima traccia se nessuna è selezionata
        }
        return;
    }
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      if (audioPlayer.readyState >= 2) {
          audioPlayer.play().catch(error => console.error("Errore ripresa riproduzione:", error));
      }
    }
 }

 function updatePlayPauseButton() {
     document.querySelectorAll(".play-btn").forEach(btn => {
        btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
     });
 }

 function findTrackIndex(track, album) {
     if (!album || !album.tracks) return -1;
     return album.tracks.findIndex(t => t.id == track.id);
 }


 function playNextTrack() {
    if (!currentAlbum || !currentTrack) return;
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    if (currentIndex !== -1 && currentIndex < currentAlbum.tracks.length - 1) {
      playTrack(currentAlbum.tracks[currentIndex + 1], currentAlbum);
    } else {
        console.log("Ultima traccia dell'album (player principale).");
        // Potresti voler fermare qui o gestire diversamente
        if (!audioPlayer.paused) audioPlayer.pause(); // Ferma il player principale
        // updateTrackListUI(null); // Opzionale: deseleziona nella lista
    }
 }

 function playPrevTrack() {
    if (!currentAlbum || !currentTrack) return;
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    if (currentIndex > 0) {
      playTrack(currentAlbum.tracks[currentIndex - 1], currentAlbum);
    } else if (currentIndex === 0) {
        console.log("Prima traccia dell'album (player principale).");
        if (audioPlayer.currentTime > 3) {
             audioPlayer.currentTime = 0; // Riavvolge se oltre 3 sec
        }
        // Non fa altro se si preme prev sulla prima traccia entro 3 sec
    }
 }


  // Store (invariato)
  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid");
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category);
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = "<p>Nessun prodotto trovato.</p>"; return;
    }
    filteredProducts.forEach((product) => { /* ... codice render prodotto ... */
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
  function setupCategoryFilters() {
      const categoryButtons = document.querySelectorAll("#stores-view .category-btn");
      categoryButtons.forEach((button) => {
          button.addEventListener("click", function() {
              const category = this.getAttribute("data-category");
              categoryButtons.forEach((btn) => btn.classList.remove("active"));
              this.classList.add("active");
              renderProducts(category);
          });
      });
  }

  // Events (invariato)
  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid");
    if (!eventsGrid) return; eventsGrid.innerHTML = "";
    if (events.length === 0) { eventsGrid.innerHTML = "<p>Nessun evento.</p>"; return; }
    events.forEach((event) => { /* ... codice render evento ... */
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

  // Initialize the app
  init();
});
