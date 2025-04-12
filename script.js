document.addEventListener("DOMContentLoaded", () => {
  // --- DATI ---
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi.png",
      tracks: [
        { id: 101, title: "The Garden Of Aldi", duration: "3:05", audioSrc: "YALDHI/garden.mp3" },
        { id: 102, title: "The Aldi Storm", duration: "3:38", audioSrc: "YALDHI/allday.m4a" },
        { id: 103, title: "New Aldi", duration: "4:00", audioSrc: "YALDHI/bro.mp3" },
        { id: 104, title: "80 Aldyies", duration: "2:48", audioSrc: "YALDHI/allday.m4a" },
        { id: 105, title: "Aldi In The Sky", duration: "4:44", audioSrc: "YALDHI/city.mp3" },
        { id: 106, title: "Aldien", duration: "2:04", audioSrc: "YALDHI/alien.mp3" },
        { id: 107, title: "Brothers Of Aldi", duration: "4:15", audioSrc: "YALDHI/bro.mp3" },
        { id: 108, title: "Fuck Gianvoit", duration: "2:00", audioSrc: "YALDHI/fg.mp3" },
      ],
    },
    {
      id: 2,
      title: "DONDA 2",
      year: "2022",
      image: "images/donda2.jpg",
      tracks: [
        { id: 201, title: "True Love", duration: "3:15", audioSrc: "YALDHI/city.mp3" },
        { id: 202, title: "Broken Road", duration: "4:02", audioSrc: "YALDHI/bro.mp3" },
        { id: 203, title: "Get Lost", duration: "2:47", audioSrc: "YALDHI/garden.mp3" },
        { id: 204, title: "Too Easy", duration: "3:22", audioSrc: "YALDHI/alien.mp3" },
      ],
    },
    {
      id: 3,
      title: "BULDY",
      year: "2025",
      image: "images/buldy.jpg",
      tracks: [{ id: 301, title: "First Time", duration: "3:33", audioSrc: "YALDHI/fg.mp3" }],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2.jpg",
      tracks: [
        { id: 401, title: "Stars", duration: "3:10", audioSrc: "YALDHI/garden.mp3" },
        { id: 402, title: "Vultures", duration: "4:05", audioSrc: "YALDHI/alien.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "YALDHI/city.mp3" },
        { id: 404, title: "Keys To My Life", duration: "3:25", audioSrc: "YALDHI/bro.mp3" },
      ],
    },
  ]
  const products = [
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhicd.png", price: "€10.00", category: "music" },
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€20.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€30.00", category: "apparel" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€15.00", category: "music" },
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

  // --- STATO DELL'APPLICAZIONE ---
  let currentView = "main-view"
  let currentAlbum = null
  let currentTrack = null // Traccia controllata dal player principale
  let isPlaying = false // Stato del player principale (true = in riproduzione)
  const audioPlayer = document.getElementById("audio-player") // Riferimento all'UNICO tag audio usato per la riproduzione

  // --- CACHE ELEMENTI DOM FREQUENTEMENTE USATI ---
  const playButtons = document.querySelectorAll(".play-btn")
  const prevButtons = document.querySelectorAll(".prev-btn")
  const nextButtons = document.querySelectorAll(".next-btn")
  const playerBars = document.querySelectorAll(".player-bar")
  const navItems = document.querySelectorAll(".nav-item")
  const navBars = document.querySelectorAll(".nav-bar")
  const appContainers = document.querySelectorAll(".app-container")

  // --- INIZIALIZZAZIONE ---
  function init() {
    if (!audioPlayer) {
      console.error("Errore Critico: Elemento audio player principale (#audio-player) non trovato!")
      return // Blocca l'esecuzione se manca il player
    }
    renderAlbumGrid()
    renderEvents()
    renderProducts()
    setupNavigation()
    setupAudioPlayer()
    setupCategoryFilters()
    console.log("App inizializzata.")
  }

  // --- NAVIGAZIONE TRA VISTE ---
  function setupNavigation() {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view")
        if (!targetViewId || targetViewId === currentView) return
        if (isPlaying) {
          audioPlayer.pause()
        } // Pausa audio al cambio vista
        if (currentView === "album-detail-view") {
          updateTrackListUI(null)
        } // Toglie highlight
        switchView(targetViewId)
        // Aggiorna stato active nav bar
        navBars.forEach((navbar) => {
          navbar.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId)
          })
        })
      })
    })
  }

  function switchView(viewId) {
    console.log("Switching to view:", viewId)
    currentView = viewId
    appContainers.forEach((view) => view.classList.add("hidden"))
    const targetViewElement = document.getElementById(viewId)
    if (targetViewElement) {
      targetViewElement.classList.remove("hidden")
    } else {
      console.error("Target view not found:", viewId)
    }
  }

  // --- RENDERING CONTENUTI ---
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid")
    if (!albumGrid) return
    albumGrid.innerHTML = ""
    albums.forEach((album) => {
      const albumElement = document.createElement("div")
      albumElement.className = "album-item"
      let imageType = "image/jpeg"
      if (album.image.endsWith(".png")) imageType = "image/png"
      else if (album.image.endsWith(".svg")) imageType = "image/svg+xml"
      else if (album.image.endsWith(".webp")) imageType = "image/webp"
      albumElement.innerHTML = `<picture><source srcset="${album.image}" type="${imageType}"><img src="${album.image}" alt="${album.title} cover"></picture><div class="album-title">${album.title}</div><div class="album-year">${album.year}</div>`
      albumElement.addEventListener("click", () => showAlbumDetail(album))
      albumGrid.appendChild(albumElement)
    })
  }

  function showAlbumDetail(album) {
    currentAlbum = album
    const detailView = document.getElementById("album-detail-view")
    if (!detailView) {
      console.error("Vista dettaglio album non trovata")
      return
    }

    // Aggiorna info album
    detailView.querySelector(".album-title").textContent = album.title
    detailView.querySelector(".album-title-large").textContent = album.title
    detailView.querySelector(".album-year").textContent = album.year
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`
    const albumDetailPicture = detailView.querySelector(".album-cover-picture")
    const albumDetailSource = albumDetailPicture.querySelector(".album-source")
    const albumDetailImg = albumDetailPicture.querySelector(".album-cover")
    if (albumDetailSource && albumDetailImg) {
      let imageType = "image/jpeg"
      if (album.image.endsWith(".png")) imageType = "image/png"
      else if (album.image.endsWith(".svg")) imageType = "image/svg+xml"
      else if (album.image.endsWith(".webp")) imageType = "image/webp"
      albumDetailSource.srcset = album.image
      albumDetailSource.type = imageType
      albumDetailImg.src = album.image
      albumDetailImg.alt = `${album.title} album cover`
    }

    // Render tracks list (SENZA audio incorporati)
    const tracksList = detailView.querySelector(".tracks-list")
    if (!tracksList) {
      console.error("Contenitore lista tracce non trovato")
      return
    }
    tracksList.innerHTML = "" // Pulisce la lista precedente

    album.tracks.forEach((track) => {
      const trackElement = document.createElement("div")
      trackElement.className = "track-item"
      trackElement.dataset.trackId = track.id // Usa ID per riferimento
      // Crea HTML per la traccia (icona, titolo, durata)
      trackElement.innerHTML = `
                <div class="track-left">
                    <i class="fas fa-music track-icon"></i>
                    <span class="track-name">${track.title}</span>
                </div>
                <div class="track-duration">${track.duration}</div>
            `
      // Aggiunge listener per avviare la riproduzione col player principale
      trackElement.addEventListener("click", () => {
        console.log(`Track item clicked: ${track.title} (ID: ${track.id})`)
        playTrack(track, album)
      })
      tracksList.appendChild(trackElement)
    })

    // Aggiorna stato visualizzazione lista (highlight traccia corrente)
    updateTrackListUI(currentTrack && currentTrack.albumId === currentAlbum.id ? currentTrack.id : null)

    switchView("album-detail-view") // Mostra la vista dettaglio

    // Setup back button
    const backButton = detailView.querySelector(".back-btn")
    if (backButton) {
      const newBackButton = backButton.cloneNode(true) // Evita listener duplicati
      backButton.parentNode.replaceChild(newBackButton, backButton)
      newBackButton.addEventListener("click", () => {
        if (isPlaying) {
          audioPlayer.pause()
        }
        switchView("main-view")
        document.querySelectorAll("#main-view .nav-item").forEach((navItem) => {
          // Aggiorna nav bar main view
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === "main-view")
        })
      })
    }
  }

  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid")
    if (!productsGrid) return
    productsGrid.innerHTML = ""
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)
    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p>Nessun prodotto trovato.</p>"
      return
    }
    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product-item"
      productElement.innerHTML = `<img class="product-image" src="${product.image}" alt="${product.name}"><div class="product-id">${product.id}</div><div class="product-name">${product.name}</div><div class="product-price">${product.price}</div>`
      productsGrid.appendChild(productElement)
    })
  }

  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid")
    if (!eventsGrid) return
    eventsGrid.innerHTML = ""
    if (events.length === 0) {
      eventsGrid.innerHTML = "<p>Nessun evento.</p>"
      return
    }
    events.forEach((event) => {
      const eventElement = document.createElement("div")
      eventElement.className = "event-card"
      eventElement.innerHTML = `<div class="event-content"><div class="event-title">${event.title}</div><div class="event-subtitle">${event.subtitle}</div><div class="event-desc">${event.desc}</div><div class="event-location">${event.location}</div><div class="event-venue">${event.venue}</div><div class="event-date">${event.date}</div></div>`
      eventsGrid.appendChild(eventElement)
    })
  }

  // --- LOGICA PLAYER AUDIO PRINCIPALE ---
  function setupAudioPlayer() {
    // Listener per i controlli principali (associati a TUTTE le barre player per coerenza UI)
    playButtons.forEach((btn) => btn.addEventListener("click", togglePlayPause))
    prevButtons.forEach((btn) => btn.addEventListener("click", playPrevTrack))
    nextButtons.forEach((btn) => btn.addEventListener("click", playNextTrack))

    // Listener per eventi del tag <audio> principale
    audioPlayer.addEventListener("ended", playNextTrack) // Passa alla traccia successiva alla fine
    audioPlayer.addEventListener("play", handlePlayEvent) // Quando la riproduzione inizia/riprende
    audioPlayer.addEventListener("pause", handlePauseEvent) // Quando la riproduzione va in pausa/finisce
    audioPlayer.addEventListener("error", handleErrorEvent) // In caso di errore caricamento/riproduzione
  }

  function handlePlayEvent() {
    console.log("Audio player event: play")
    isPlaying = true
    updatePlayPauseButton() // Aggiorna i pulsanti play/pause in tutte le barre
    updateTrackIcon(true) // Aggiorna l'icona nella lista (se visibile)
  }

  function handlePauseEvent() {
    console.log("Audio player event: pause/ended")
    isPlaying = false
    updatePlayPauseButton() // Aggiorna i pulsanti play/pause
    updateTrackIcon(false) // Aggiorna l'icona nella lista
  }

  function handleErrorEvent() {
    console.error("Errore Audio Player:", audioPlayer.error)
    isPlaying = false
    updatePlayPauseButton()
    updateTrackIcon(false)
    // Resetta UI player bar
    playerBars.forEach((playerBar) => {
      const img = playerBar.querySelector(".now-playing img")
      const titleEl = playerBar.querySelector(".track-title")
      const albumEl = playerBar.querySelector(".track-album")
      if (img) img.src = "placeholder.svg"
      if (titleEl) titleEl.textContent = "Errore Audio"
      if (albumEl) albumEl.textContent = ""
    })
    currentTrack = null
    currentAlbum = null
    if (currentView === "album-detail-view") updateTrackListUI(null)
    alert("Errore durante il caricamento dell'audio. Controlla i percorsi dei file e la console per dettagli.") // Avviso utente
  }

  // Funzione centrale per avviare/cambiare traccia
  function playTrack(track, album) {
    if (!track || !album) {
      console.error("playTrack chiamata senza traccia o album valido.")
      return
    }

    // Gestione click sulla stessa traccia
    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioPlayer.pause()
        console.log("Pausing current track.")
      } else {
        // Tenta di riprendere solo se l'audio è pronto
        if (audioPlayer.readyState >= 2) {
          audioPlayer.play().catch((e) => console.error("Errore ripresa riproduzione:", e))
          console.log("Resuming current track.")
        } else {
          console.log("Audio non pronto per riprendere, riprovo a caricare.")
          audioPlayer.load() // Riprova a caricare se non è pronto
          audioPlayer.play().catch((e) => console.error("Errore play dopo reload:", e))
        }
      }
      return // Esce dopo aver gestito pausa/ripresa della stessa traccia
    }

    // --- Cambia traccia ---
    console.log(`Attempting to play track (ID: ${track.id}): ${track.title}`)
    currentTrack = track
    currentAlbum = album
    currentTrack.albumId = currentAlbum.id // Associa album a traccia per riferimento

    // *** VERIFICA PERCORSO AUDIO ***
    console.log(`Setting audio source to: ${track.audioSrc}`)
    // Controlla se il percorso sembra valido (controlli base, non garantisce esistenza file)
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(
        `Errore: Percorso audio non valido per la traccia "${track.title}" (ID: ${track.id}). Ricevuto:`,
        track.audioSrc,
      )
      handleErrorEvent() // Simula errore per resettare UI
      alert(`Errore: Percorso audio mancante o non valido per "${track.title}". Controlla i dati nell'array 'albums'.`)
      return
    }

    // Assicurati che il percorso inizi con YALDHI/ se non lo è già
    if (!track.audioSrc.startsWith("YALDHI/")) {
      console.warn(`Percorso audio non inizia con YALDHI/: ${track.audioSrc}. Tentativo di correzione automatica.`)
      track.audioSrc = "YALDHI/" + track.audioSrc.split("/").pop()
      console.log(`Percorso corretto: ${track.audioSrc}`)
    }

    audioPlayer.src = track.audioSrc

    // Aggiorna UI Player Bar (tutte le barre)
    playerBars.forEach((playerBar) => {
      const img = playerBar.querySelector(".now-playing img")
      const titleEl = playerBar.querySelector(".track-title")
      const albumEl = playerBar.querySelector(".track-album")
      if (img) {
        img.src = currentAlbum.image || "placeholder.svg"
        img.alt = `Now playing: ${track.title}`
      }
      if (titleEl) titleEl.textContent = track.title
      if (albumEl) albumEl.textContent = currentAlbum.title
    })

    // Aggiorna UI Lista Tracce (se visibile)
    if (currentView === "album-detail-view") {
      updateTrackListUI(track.id)
    }

    // Carica e avvia riproduzione
    console.log("Calling load() and play() on audio player...")
    audioPlayer.load() // Necessario per applicare il nuovo src
    const playPromise = audioPlayer.play() // play() restituisce una Promise

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Successo (l'evento 'play' gestirà l'aggiornamento stato/UI)
          console.log("Playback started successfully (via Promise).")
        })
        .catch((error) => {
          // Errore durante il tentativo di play (es. interazione utente non rilevata, file non caricato)
          console.error("Error attempting to play audio (via Promise):", error)
          // L'evento 'error' sul tag audio dovrebbe comunque scattare se il problema è il file
          // Ma potremmo forzare un reset UI qui per sicurezza
          handleErrorEvent()
        })
    }
  }

  // --- AGGIORNAMENTO INTERFACCIA UTENTE ---
  function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view") return // Opera solo nella vista dettaglio
    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list")
    if (!tracksListContainer) return

    tracksListContainer.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon")
      // Usa '==' per confronto flessibile tra dataset (stringa) e id (numero/stringa)
      const isCurrentTrack = item.dataset.trackId == activeTrackId

      item.classList.toggle("active", isCurrentTrack) // Evidenzia/deseleziona l'intera riga

      if (icon) {
        // Aggiorna icona
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active")
        if (isCurrentTrack) {
          icon.classList.add("active") // Classe per icona attiva
          // L'icona riflette lo stato isPlaying del player principale
          icon.classList.add("fas", isPlaying ? "fa-volume-up" : "fa-pause")
        } else {
          icon.classList.add("fas", "fa-music") // Icona default per tracce non attive
        }
      }
    })
  }

  // Aggiorna solo l'icona della traccia attiva (chiamato da play/pause events)
  function updateTrackIcon(isPlayingNow) {
    if (currentView === "album-detail-view" && currentTrack) {
      // Trova l'elemento della traccia attualmente attiva nella lista
      const activeTrackItem = document.querySelector(
        `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`,
      )
      if (activeTrackItem) {
        const icon = activeTrackItem.querySelector(".track-icon")
        // Aggiorna solo se l'icona esiste e l'item è marcato come 'active'
        if (icon && activeTrackItem.classList.contains("active")) {
          icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up")
          // Imposta icona corretta (volume se play, pausa se non play)
          icon.classList.add("fas", isPlayingNow ? "fa-volume-up" : "fa-pause")
        }
      }
    }
  }

  // Aggiorna i pulsanti play/pause in TUTTE le barre del player
  function updatePlayPauseButton() {
    playButtons.forEach((btn) => {
      // Cambia l'icona interna del bottone
      btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
    })
  }

  // --- CONTROLLI PLAYER ---
  function togglePlayPause() {
    console.log("Toggle Play/Pause button clicked.")
    // Se non c'è traccia selezionata, prova ad avviare la prima traccia del primo album
    if (!currentTrack) {
      console.log("No current track, attempting to play first track overall.")
      if (albums.length > 0 && albums[0].tracks.length > 0) {
        playTrack(albums[0].tracks[0], albums[0])
      } else {
        console.warn("Nessuna traccia disponibile per la riproduzione.")
      }
      return
    }
    // Se una traccia è selezionata, alterna play/pausa
    if (isPlaying) {
      audioPlayer.pause()
    } else {
      // Tenta play solo se l'audio ha dati sufficienti
      if (audioPlayer.readyState >= 2) {
        // HAVE_CURRENT_DATA or more
        audioPlayer.play().catch((e) => console.error("Errore play su toggle:", e))
      } else {
        console.warn("Audio non pronto per play su toggle, stato:", audioPlayer.readyState)
        // Potresti provare a ricaricare o mostrare un feedback
        audioPlayer.load() // Prova a ricaricare
        audioPlayer.play().catch((e) => console.error("Errore play dopo reload su toggle:", e))
      }
    }
  }

  function playNextTrack() {
    console.log("Next track requested.")
    if (!currentAlbum || !currentTrack) {
      console.log("Nessuna traccia corrente per andare alla successiva.")
      return
    }
    const currentIndex = findTrackIndex(currentTrack, currentAlbum)
    if (currentIndex !== -1 && currentIndex < currentAlbum.tracks.length - 1) {
      // C'è una traccia successiva nello stesso album
      console.log("Playing next track in album.")
      playTrack(currentAlbum.tracks[currentIndex + 1], currentAlbum)
    } else {
      console.log("Ultima traccia dell'album raggiunta.")
      // Fine dell'album: Metti in pausa o implementa logica diversa (es. loop, stop)
      if (!audioPlayer.paused) audioPlayer.pause()
      // Opzionale: deseleziona traccia nella UI
      // updateTrackListUI(null);
      // currentTrack = null; // Rimuove riferimento alla traccia finita
    }
  }

  function playPrevTrack() {
    console.log("Previous track requested.")
    if (!currentAlbum || !currentTrack) {
      console.log("Nessuna traccia corrente per andare alla precedente.")
      return
    }
    const currentIndex = findTrackIndex(currentTrack, currentAlbum)
    if (currentIndex > 0) {
      // C'è una traccia precedente nello stesso album
      console.log("Playing previous track in album.")
      playTrack(currentAlbum.tracks[currentIndex - 1], currentAlbum)
    } else if (currentIndex === 0) {
      console.log("Prima traccia dell'album. Riavvolgo se > 3 secondi.")
      // Se siamo sulla prima traccia, riavvolgi se sono passati più di 3 sec, altrimenti non fare nulla
      if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0
      }
    }
  }

  // --- FUNZIONI UTILITY ---
  function findTrackIndex(track, album) {
    if (!track || !album || !album.tracks) return -1
    // Usa '==' per confronto flessibile ID (potrebbe essere numero o stringa)
    return album.tracks.findIndex((t) => t.id == track.id)
  }

  // --- STORE & EVENTS (Logica semplice di rendering, invariata) ---
  function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll("#stores-view .category-btn")
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
        renderProducts(category)
      })
    })
  }

  // --- AVVIO APPLICAZIONE ---
  init() // Chiama la funzione di inizializzazione dopo che il DOM è pronto
})
