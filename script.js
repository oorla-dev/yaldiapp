document.addEventListener("DOMContentLoaded", () => {
  // Data
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi.png", // Immagine personalizzata per YALDHI
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
      image: "images/donda2.jpg", // Immagine personalizzata per DONDA 2
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
      image: "images/buldy.jpg", // Immagine personalizzata per BULDY
      tracks: [
        { id: 301, title: "First Time", duration: "3:33", audioSrc: "audio/buldy-first-time.mp3" },

      ],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2.jpg", // Immagine personalizzata per JL 2
      tracks: [
        { id: 401, title: "Stars", duration: "3:10", audioSrc: "audio/jl2-stars.mp3" },
        { id: 402, title: "Vultures", duration: "4:05", audioSrc: "audio/jl2-vultures.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 404, title: "Keys To My Life", duration: "3:25", audioSrc: "audio/jl2-keys-to-my-life.mp3" },
      ],
    },
  ]

  const products = [
    {
      id: "AY-01",
      name: "YALDHI CD",
      image: "images/yaldhicd.png",
      price: "€30.00",
      category: "music",
    },
    {
      id: "FM-104",
      name: "FREE MARINAIO TEE",
      image: "images/fm.jpg",
      price: "€80.00",
      category: "apparel",
    },
    {
      id: "YS-22",
      name: "YALDHI HOODIE",
      image: "images/hoodie.jpg",
      price: "€120.00",
      category: "apparel",
    },
    {
      id: "BL-05",
      name: "BULDY VINYL",
      image: "images/buldy.jpg",
      price: "€35.00",
      category: "music",
    },
  ]

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
  ]

  // State
  let currentView = "main-view";
  let currentAlbum = null;
  let currentTrack = null;
  let isPlaying = false;
  const audioPlayer = document.getElementById("audio-player"); // Seleziona ancora il player della main-view

  // Initialize
  function init() {
    renderAlbumGrid();
    renderEvents();
    renderProducts(); // Chiamata iniziale per mostrare tutti i prodotti
    setupNavigation();
    setupAudioPlayer();
    setupCategoryFilters(); // Imposta i filtri delle categorie
  }

  // Navigation
  function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const allViews = document.querySelectorAll(".app-container"); // Seleziona tutti i container

    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view");
        if (!targetViewId || targetViewId === currentView) return; // Non fare nulla se è la stessa vista

        switchView(targetViewId);

        // Aggiorna la classe active su tutti i nav-bar
        document.querySelectorAll('.nav-bar').forEach(navbar => {
            navbar.querySelectorAll('.nav-item').forEach(navItem => {
                 if (navItem.getAttribute('data-view') === targetViewId) {
                     navItem.classList.add('active');
                 } else {
                     navItem.classList.remove('active');
                 }
            });
        });
      });
    });
  }


  function switchView(viewId) {
    console.log("Switching to view:", viewId);
    currentView = viewId;

    // Hide all views
    document.querySelectorAll(".app-container").forEach((view) => {
      view.classList.add("hidden");
    });

    // Show target view
    const targetViewElement = document.getElementById(viewId);
    if (targetViewElement) {
        targetViewElement.classList.remove("hidden");
    } else {
        console.error("Target view not found:", viewId);
    }
  }

  // Album Grid
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid");
    if (!albumGrid) return; // Verifica se l'elemento esiste
    albumGrid.innerHTML = "";

    albums.forEach((album) => {
      const albumElement = document.createElement("div");
      albumElement.className = "album-item";
      // MODIFICA: Usa <picture> e <source>
      // Determina il tipo MIME dall'estensione (semplificato)
      let imageType = "image/jpeg"; // Default
      if (album.image.endsWith(".png")) {
          imageType = "image/png";
      } else if (album.image.endsWith(".svg")) {
          imageType = "image/svg+xml";
      } else if (album.image.endsWith(".webp")) {
          imageType = "image/webp";
      }
      albumElement.innerHTML = `
                <picture>
                    <source srcset="${album.image}" type="${imageType}">
                    <img src="${album.image}" alt="${album.title} cover">
                </picture>
                <div class="album-title">${album.title}</div>
                <div class="album-year">${album.year}</div>
            `;

      albumElement.addEventListener("click", () => {
        showAlbumDetail(album);
      });

      albumGrid.appendChild(albumElement);
    });
  }

  // Album Detail
  function showAlbumDetail(album) {
    currentAlbum = album; // Imposta l'album corrente

    // Seleziona elementi nella vista dettaglio
    const detailView = document.getElementById("album-detail-view");
    if (!detailView) return;

    detailView.querySelector(".album-title").textContent = album.title; // Titolo piccolo nell'header
    detailView.querySelector(".album-title-large").textContent = album.title; // Titolo grande
    detailView.querySelector(".album-year").textContent = album.year;
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`;

    // MODIFICA: Aggiorna l'elemento <picture>
    const albumDetailPicture = detailView.querySelector(".album-cover-picture");
    const albumDetailSource = albumDetailPicture.querySelector(".album-source");
    const albumDetailImg = albumDetailPicture.querySelector(".album-cover");

    // Determina il tipo MIME dall'estensione (semplificato)
    let imageType = "image/jpeg"; // Default
    if (album.image.endsWith(".png")) {
        imageType = "image/png";
    } else if (album.image.endsWith(".svg")) {
        imageType = "image/svg+xml";
    } else if (album.image.endsWith(".webp")) {
        imageType = "image/webp";
    }

    albumDetailSource.srcset = album.image;
    albumDetailSource.type = imageType; // Imposta il tipo corretto
    albumDetailImg.src = album.image;
    albumDetailImg.alt = `${album.title} album cover`; // Alt text descrittivo

    // Render tracks
    const tracksList = detailView.querySelector(".tracks-list");
    tracksList.innerHTML = ""; // Pulisci la lista precedente

    album.tracks.forEach((track, index) => { // Aggiunto index
      const trackElement = document.createElement("div");
      trackElement.className = "track-item";
      trackElement.dataset.trackId = track.id; // Aggiungi un data attribute per identificare la traccia
      trackElement.innerHTML = `
                <div class="track-left">
                    <i class="fas fa-music track-icon"></i>
                    <span class="track-name">${track.title}</span> </div>
                <div class="track-duration">${track.duration}</div>
            `;

      trackElement.addEventListener("click", () => {
        playTrack(track, album); // Passa anche l'album
      });

      tracksList.appendChild(trackElement);
    });

    // Show album detail view
    switchView("album-detail-view");

    // Setup back button (assicurati che sia aggiunto una sola volta o rimuovi listener precedenti)
    const backButton = detailView.querySelector(".back-btn");
    // Rimuovi eventuali listener precedenti per evitare duplicazioni
    const newBackButton = backButton.cloneNode(true);
    backButton.parentNode.replaceChild(newBackButton, backButton);
    // Aggiungi il nuovo listener
    newBackButton.addEventListener("click", () => {
        switchView("main-view");
        // Aggiorna la nav-bar nella main-view
        document.querySelectorAll('#main-view .nav-item').forEach(navItem => {
            if (navItem.getAttribute('data-view') === 'main-view') {
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        });
    });
  }

 // Player (Unificato per tutte le viste)
 function setupAudioPlayer() {
    // Aggiungi listener ai pulsanti in tutte le barre del player
    document.querySelectorAll(".play-btn").forEach(btn => btn.addEventListener("click", togglePlayPause));
    document.querySelectorAll(".next-btn").forEach(btn => btn.addEventListener("click", playNextTrack));
    document.querySelectorAll(".prev-btn").forEach(btn => btn.addEventListener("click", playPrevTrack));

    audioPlayer.addEventListener("ended", playNextTrack);
    audioPlayer.addEventListener("play", () => { isPlaying = true; updatePlayPauseButton(); updateTrackIcon(true); });
    audioPlayer.addEventListener("pause", () => { isPlaying = false; updatePlayPauseButton(); updateTrackIcon(false); });
    audioPlayer.addEventListener("error", (e) => {
        console.error("Errore audio player:", e);
        isPlaying = false;
        updatePlayPauseButton();
        updateTrackIcon(false);
        // Potresti voler mostrare un messaggio all'utente qui
    });
 }

 function playTrack(track, album) { // Accetta anche l'album
    if (!album) {
        console.error("Album non fornito per la traccia:", track.title);
        return; // Se l'album non è passato, esci
    }
    currentTrack = track;
    currentAlbum = album; // Assicurati che l'album corrente sia aggiornato

    console.log(`Playing track: ${track.title} from ${album.title}`);

    audioPlayer.src = track.audioSrc; // Imposta src sull'elemento audioPlayer (quello della main-view)
    audioPlayer.load();

    // Aggiorna la UI in *tutte* le barre del player
    document.querySelectorAll(".player-bar").forEach(playerBar => {
        const img = playerBar.querySelector(".now-playing img");
        const titleEl = playerBar.querySelector(".track-title");
        const albumEl = playerBar.querySelector(".track-album");

        if (img) {
            img.src = currentAlbum.image;
            img.alt = `Now playing: ${track.title}`;
        }
        if (titleEl) titleEl.textContent = track.title;
        if (albumEl) albumEl.textContent = currentAlbum.title;
    });


    // Aggiorna la UI della track list *solo se la vista dettaglio è attiva*
    if (currentView === "album-detail-view") {
        updateTrackListUI(track.id);
    }


    // Play the track using audioPlayer (quello della main-view)
    audioPlayer.play().then(() => {
        // Successo
        isPlaying = true;
        updatePlayPauseButton();
        updateTrackIcon(true); // Aggiorna icona traccia attiva
    }).catch(error => {
        console.error("Errore durante la riproduzione:", error);
        isPlaying = false;
        updatePlayPauseButton();
        updateTrackIcon(false);
    });
 }

 function updateTrackListUI(activeTrackId) {
    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list");
    if (!tracksListContainer) return;

    tracksListContainer.querySelectorAll(".track-item").forEach(item => {
        const icon = item.querySelector(".track-icon");
        const trackId = item.dataset.trackId;

        if (trackId == activeTrackId) { // Usa == per comparare stringa e numero se necessario
            item.classList.add("active");
            if (icon) {
                icon.classList.add("active");
                icon.className = `fas ${isPlaying ? 'fa-volume-up' : 'fa-pause'} track-icon active`; // Cambia icona in base allo stato
            }
        } else {
            item.classList.remove("active");
            if (icon) {
                icon.classList.remove("active");
                icon.className = "fas fa-music track-icon"; // Icona di default
            }
        }
    });
 }

 function updateTrackIcon(isPlayingNow) {
     if (currentView === "album-detail-view" && currentTrack) {
         const activeTrackItem = document.querySelector(`#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`);
         if (activeTrackItem) {
             const icon = activeTrackItem.querySelector(".track-icon");
             if (icon && activeTrackItem.classList.contains('active')) { // Aggiorna solo l'icona attiva
                 icon.className = `fas ${isPlayingNow ? 'fa-volume-up' : 'fa-pause'} track-icon active`;
             }
         }
     }
 }


 function togglePlayPause() {
    if (!audioPlayer.src || audioPlayer.src === window.location.href) { // Controlla se src è impostato
        // Se nessuna traccia è caricata, prova a suonare la prima del primo album
        if (albums.length > 0 && albums[0].tracks.length > 0) {
            playTrack(albums[0].tracks[0], albums[0]);
        }
        return;
    }

    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play().catch(error => console.error("Errore ripresa riproduzione:", error));
    }
    // Lo stato isPlaying viene aggiornato dagli eventi 'play' e 'pause' del player
 }

 function updatePlayPauseButton() {
     // Aggiorna *tutti* i pulsanti play/pause
     document.querySelectorAll(".play-btn").forEach(btn => {
        btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
     });
 }


 function findTrackIndex(track, album) {
     if (!album || !album.tracks) return -1;
     return album.tracks.findIndex(t => t.id === track.id);
 }


 function playNextTrack() {
    if (!currentAlbum || !currentTrack) return;
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    if (currentIndex !== -1 && currentIndex < currentAlbum.tracks.length - 1) {
      playTrack(currentAlbum.tracks[currentIndex + 1], currentAlbum);
    } else {
        console.log("Ultima traccia dell'album");
        // Opzionale: ferma la riproduzione o passa al prossimo album
    }
 }

 function playPrevTrack() {
    if (!currentAlbum || !currentTrack) return;
    const currentIndex = findTrackIndex(currentTrack, currentAlbum);
    if (currentIndex > 0) {
      playTrack(currentAlbum.tracks[currentIndex - 1], currentAlbum);
    } else {
        console.log("Prima traccia dell'album");
        // Opzionale: torna all'ultima traccia o ferma
    }
 }


  // Store
  function renderProducts(category = "all") { // Accetta categoria come argomento
    const productsGrid = document.querySelector("#stores-view .products-grid");
    if (!productsGrid) return; // Controllo
    productsGrid.innerHTML = ""; // Pulisci prima di renderizzare

    const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = "<p>Nessun prodotto trovato in questa categoria.</p>"; // Messaggio se vuoto
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

  // Imposta i listener per i bottoni delle categorie
  function setupCategoryFilters() {
      const categoryButtons = document.querySelectorAll("#stores-view .category-btn");
      categoryButtons.forEach((button) => {
          button.addEventListener("click", function() {
              const category = this.getAttribute("data-category");

              // Update active button
              categoryButtons.forEach((btn) => btn.classList.remove("active"));
              this.classList.add("active");

              // Render products for the selected category
              renderProducts(category);
          });
      });
  }


  // Events
  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid");
    if (!eventsGrid) return; // Controllo
    eventsGrid.innerHTML = ""; // Pulisci

    if (events.length === 0) {
        eventsGrid.innerHTML = "<p>Nessun evento al momento.</p>";
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

  // Initialize the app
  init();
});
