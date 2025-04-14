document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURAZIONE LOGGING ---
  const DEBUG = true // Impostare a false in produzione

  function logInfo(message, data) {
    if (DEBUG) console.log(`[INFO] ${new Date().toISOString().substr(11, 8)} - ${message}`, data || "")
  }

  function logWarning(message, data) {
    console.warn(`[WARN] ${new Date().toISOString().substr(11, 8)} - ${message}`, data || "")
  }

  function logError(message, error) {
    console.error(`[ERROR] ${new Date().toISOString().substr(11, 8)} - ${message}`, error || "")
  }

  // --- SISTEMA DI NOTIFICHE ---
  function showNotification(message, type = "info", duration = 3000) {
    // Crea o riutilizza l'elemento di notifica
    let notification = document.getElementById("app-notification")
    if (!notification) {
      notification = document.createElement("div")
      notification.id = "app-notification"
      notification.style.position = "fixed"
      notification.style.bottom = "70px"
      notification.style.left = "50%"
      notification.style.transform = "translateX(-50%)"
      notification.style.padding = "10px 20px"
      notification.style.borderRadius = "5px"
      notification.style.zIndex = "1000"
      notification.style.maxWidth = "80%"
      notification.style.textAlign = "center"
      notification.style.transition = "opacity 0.3s ease-in-out"
      document.body.appendChild(notification)
    }

    // Imposta lo stile in base al tipo
    switch (type) {
      case "error":
        notification.style.backgroundColor = "#f44336"
        notification.style.color = "white"
        break
      case "warning":
        notification.style.backgroundColor = "#ff9800"
        notification.style.color = "black"
        break
      case "success":
        notification.style.backgroundColor = "#4CAF50"
        notification.style.color = "white"
        break
      default:
        notification.style.backgroundColor = "#2196F3"
        notification.style.color = "white"
    }

    // Imposta il messaggio e mostra la notifica
    notification.textContent = message
    notification.style.opacity = "1"

    // Nascondi la notifica dopo la durata specificata
    clearTimeout(notification.hideTimeout)
    notification.hideTimeout = setTimeout(() => {
      notification.style.opacity = "0"
    }, duration)
  }

  // --- GESTIONE ERRORI AUDIO ---
  function getAudioErrorMessage(error) {
    if (!error || !error.code) return "Errore sconosciuto durante la riproduzione audio"

    switch (error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return "La riproduzione è stata interrotta dall'utente"
      case MediaError.MEDIA_ERR_NETWORK:
        return "Errore di rete durante il caricamento del file audio"
      case MediaError.MEDIA_ERR_DECODE:
        return "Errore di decodifica: il file audio potrebbe essere danneggiato"
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return "Formato audio non supportato o file non trovato"
      default:
        return `Errore audio sconosciuto (codice: ${error.code})`
    }
  }

  // --- DATI ---
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi-cover.png",
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
      image: "images/donda2-cover.svg",
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
      image: "images/buldy-cover.svg",
      tracks: [{ id: 301, title: "First Time", duration: "3:33", audioSrc: "YALDHI/fg.mp3" }],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2-cover.svg",
      tracks: [
        { id: 401, title: "Stars", duration: "3:10", audioSrc: "YALDHI/garden.mp3" },
        { id: 402, title: "Vultures", duration: "4:05", audioSrc: "YALDHI/alien.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "YALDHI/city.mp3" },
        { id: 404, title: "Keys To My Life", duration: "3:25", audioSrc: "YALDHI/bro.mp3" },
      ],
    },
  ]
  const products = [
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhi-cd.png", price: "€30.00", category: "music" },
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€80.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€120.00", category: "apparel" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€35.00", category: "music" },
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
  let currentTrack = null
  let isPlaying = false
  let isLoading = false
  const audioPlayer = document.getElementById("audio-player")

  // --- CACHE ELEMENTI DOM FREQUENTEMENTE USATI ---
  const playButtons = document.querySelectorAll(".play-btn")
  const prevButtons = document.querySelectorAll(".prev-btn")
  const nextButtons = document.querySelectorAll(".next-btn")
  const playerBars = document.querySelectorAll(".player-bar")
  const navItems = document.querySelectorAll(".nav-item")
  const navBars = document.querySelectorAll(".nav-bar")
  const appContainers = document.querySelectorAll(".app-container")

  // --- VERIFICA SUPPORTO BROWSER ---
  function checkBrowserSupport() {
    // Verifica supporto audio
    if (!audioPlayer) {
      logError("Elemento audio player principale (#audio-player) non trovato!")
      showNotification("Errore critico: player audio non trovato", "error")
      return false
    }

    // Verifica supporto formati audio
    const audioTest = document.createElement("audio")
    const supportedFormats = {
      mp3: audioTest.canPlayType("audio/mpeg"),
      m4a: audioTest.canPlayType("audio/mp4"),
      wav: audioTest.canPlayType("audio/wav"),
    }

    logInfo("Formati audio supportati:", supportedFormats)

    // Avvisa se alcuni formati non sono supportati
    const unsupportedFormats = []
    if (!supportedFormats.mp3) unsupportedFormats.push("MP3")
    if (!supportedFormats.m4a) unsupportedFormats.push("M4A")
    if (!supportedFormats.wav) unsupportedFormats.push("WAV")

    if (unsupportedFormats.length > 0) {
      logWarning(`Il browser potrebbe non supportare i seguenti formati: ${unsupportedFormats.join(", ")}`)
      showNotification(
        `Attenzione: alcuni formati audio (${unsupportedFormats.join(", ")}) potrebbero non essere supportati`,
        "warning",
        5000,
      )
    }

    return true
  }

  // --- INIZIALIZZAZIONE ---
  function init() {
    logInfo("Inizializzazione applicazione...")

    if (!checkBrowserSupport()) {
      return // Interrompi se ci sono problemi critici
    }

    // Rimuovi tutti i placeholder SVG
    document.querySelectorAll('img[src*="placeholder.svg"]').forEach((img) => {
      logInfo("Rimozione placeholder:", img.src)
      img.src = ""
    })

    // Inizializza le viste
    renderAlbumGrid()
    renderEvents()
    renderProducts()
    setupNavigation()
    setupAudioPlayer()
    setupCategoryFilters()

    logInfo("App inizializzata con successo")
    showNotification("App pronta", "success", 2000)
  }

  // --- NAVIGAZIONE TRA VISTE ---
  function setupNavigation() {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view")
        if (!targetViewId || targetViewId === currentView) return

        if (isPlaying) {
          logInfo("Pausa audio durante cambio vista")
          audioPlayer.pause()
        }

        if (currentView === "album-detail-view") {
          updateTrackListUI(null)
        }

        switchView(targetViewId)

        navBars.forEach((navbar) => {
          navbar.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId)
          })
        })
      })
    })
  }

  function switchView(viewId) {
    logInfo(`Cambio vista: da ${currentView} a ${viewId}`)
    currentView = viewId
    appContainers.forEach((view) => view.classList.add("hidden"))
    const targetViewElement = document.getElementById(viewId)
    if (targetViewElement) {
      targetViewElement.classList.remove("hidden")
    } else {
      logError(`Vista target non trovata: ${viewId}`)
      showNotification("Errore: vista non trovata", "error")
    }
  }

  // --- RENDERING CONTENUTI ---
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid")
    if (!albumGrid) {
      logError("Contenitore griglia album non trovato")
      return
    }

    albumGrid.innerHTML = ""

    if (albums.length === 0) {
      albumGrid.innerHTML = "<p class='no-content'>Nessun album disponibile.</p>"
      return
    }

    albums.forEach((album) => {
      const albumElement = document.createElement("div")
      albumElement.className = "album-item"

      // Determina il tipo di immagine
      let imageType = "image/jpeg"
      if (album.image.endsWith(".png")) imageType = "image/png"
      else if (album.image.endsWith(".svg")) imageType = "image/svg+xml"
      else if (album.image.endsWith(".webp")) imageType = "image/webp"

      // Crea elemento con gestione errori immagine
      albumElement.innerHTML = `
        <picture>
          <source srcset="${album.image}" type="${imageType}">
          <img src="${album.image}" alt="${album.title} cover" onerror="this.onerror=null; this.src='/placeholder.svg'; this.alt='Immagine non disponibile';">
        </picture>
        <div class="album-title">${album.title}</div>
        <div class="album-year">${album.year}</div>
      `

      albumElement.addEventListener("click", () => showAlbumDetail(album))
      albumGrid.appendChild(albumElement)
    })

    logInfo("Griglia album renderizzata con successo")
  }

  function showAlbumDetail(album) {
    logInfo(`Mostra dettaglio album: ${album.title} (ID: ${album.id})`)
    currentAlbum = album
    const detailView = document.getElementById("album-detail-view")
    if (!detailView) {
      logError("Vista dettaglio album non trovata")
      showNotification("Errore: vista dettaglio non trovata", "error")
      return
    }

    // Aggiorna info album
    detailView.querySelector(".album-title").textContent = album.title
    detailView.querySelector(".album-title-large").textContent = album.title
    detailView.querySelector(".album-year").textContent = album.year
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`

    // Gestione immagine album con controllo errori
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

      // Gestione errore caricamento immagine
      albumDetailImg.onerror = function () {
        this.onerror = null
        this.src = ""
        this.alt = "Immagine non disponibile"
        logWarning(`Impossibile caricare l'immagine dell'album: ${album.image}`)
      }
    }

    // Render tracks list
    const tracksList = detailView.querySelector(".tracks-list")
    if (!tracksList) {
      logError("Contenitore lista tracce non trovato")
      return
    }
    tracksList.innerHTML = ""

    if (album.tracks.length === 0) {
      tracksList.innerHTML = "<p class='no-content'>Nessuna traccia disponibile per questo album.</p>"
    } else {
      album.tracks.forEach((track) => {
        const trackElement = document.createElement("div")
        trackElement.className = "track-item"
        trackElement.dataset.trackId = track.id
        trackElement.innerHTML = `
          <div class="track-left">
            <i class="fas fa-music track-icon"></i>
            <span class="track-name">${track.title}</span>
          </div>
          <div class="track-duration">${track.duration}</div>
        `
        trackElement.addEventListener("click", () => {
          logInfo(`Track item clicked: ${track.title} (ID: ${track.id})`)
          playTrack(track, album)
        })
        tracksList.appendChild(trackElement)
      })
    }

    updateTrackListUI(currentTrack && currentTrack.albumId === currentAlbum.id ? currentTrack.id : null)

    switchView("album-detail-view")

    const backButton = detailView.querySelector(".back-btn")
    if (backButton) {
      const newBackButton = backButton.cloneNode(true)
      backButton.parentNode.replaceChild(newBackButton, backButton)
      newBackButton.addEventListener("click", () => {
        if (isPlaying) {
          audioPlayer.pause()
        }
        switchView("main-view")
        document.querySelectorAll("#main-view .nav-item").forEach((navItem) => {
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === "main-view")
        })
      })
    }
  }

  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid")
    if (!productsGrid) {
      logError("Contenitore griglia prodotti non trovato")
      return
    }

    productsGrid.innerHTML = ""
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p class='no-content'>Nessun prodotto trovato in questa categoria.</p>"
      return
    }

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product-item"
      productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='/placeholder.svg'; this.alt='Immagine non disponibile';">
        <div class="product-id">${product.id}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
      `
      productsGrid.appendChild(productElement)
    })

    logInfo(`Prodotti renderizzati per categoria: ${category}`)
  }

  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid")
    if (!eventsGrid) {
      logError("Contenitore griglia eventi non trovato")
      return
    }

    eventsGrid.innerHTML = ""

    if (events.length === 0) {
      eventsGrid.innerHTML = "<p class='no-content'>Nessun evento disponibile.</p>"
      return
    }

    events.forEach((event) => {
      const eventElement = document.createElement("div")
      eventElement.className = "event-card"
      eventElement.innerHTML = `
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-subtitle">${event.subtitle}</div>
          <div class="event-desc">${event.desc}</div>
          <div class="event-location">${event.location}</div>
          <div class="event-venue">${event.venue}</div>
          <div class="event-date">${event.date}</div>
        </div>
      `
      eventsGrid.appendChild(eventElement)
    })

    logInfo("Eventi renderizzati con successo")
  }

  // --- LOGICA PLAYER AUDIO PRINCIPALE ---
  function setupAudioPlayer() {
    logInfo("Configurazione player audio...")

    // Controlli principali
    playButtons.forEach((btn) => btn.addEventListener("click", togglePlayPause))
    prevButtons.forEach((btn) => btn.addEventListener("click", playPrevTrack))
    nextButtons.forEach((btn) => btn.addEventListener("click", playNextTrack))

    // Eventi audio
    audioPlayer.addEventListener("loadstart", () => {
      logInfo("Audio: inizio caricamento")
      isLoading = true
      updateLoadingState(true)
    })

    audioPlayer.addEventListener("canplay", () => {
      logInfo("Audio: pronto per la riproduzione")
      isLoading = false
      updateLoadingState(false)
    })

    audioPlayer.addEventListener("ended", () => {
      logInfo("Audio: riproduzione terminata")
      playNextTrack()
    })

    audioPlayer.addEventListener("play", handlePlayEvent)
    audioPlayer.addEventListener("pause", handlePauseEvent)
    audioPlayer.addEventListener("error", handleErrorEvent)

    // Gestione progresso (opzionale)
    audioPlayer.addEventListener("timeupdate", () => {
      // Qui puoi aggiungere codice per aggiornare una barra di progresso
    })

    logInfo("Player audio configurato con successo")
  }

  function updateLoadingState(isLoading) {
    // Aggiorna UI per mostrare stato di caricamento
    playButtons.forEach((btn) => {
      if (isLoading) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        btn.disabled = true
      } else {
        updatePlayPauseButton()
        btn.disabled = false
      }
    })
  }

  function handlePlayEvent() {
    logInfo("Audio player event: play")
    isPlaying = true
    isLoading = false
    updatePlayPauseButton()
    updateTrackIcon(true)
  }

  function handlePauseEvent() {
    logInfo("Audio player event: pause")
    isPlaying = false
    updatePlayPauseButton()
    updateTrackIcon(false)
  }

  function handleErrorEvent(e) {
    const errorDetails = audioPlayer.error
    const errorMessage = getAudioErrorMessage(errorDetails)
    const trackInfo = currentTrack ? `"${currentTrack.title}" (${currentTrack.audioSrc})` : "sconosciuta"

    logError(`Errore riproduzione audio per traccia ${trackInfo}: ${errorMessage}`, errorDetails)

    // Dettagli tecnici per debug
    if (errorDetails) {
      logError(`Codice errore: ${errorDetails.code}, messaggio: ${errorDetails.message}`)
    }

    // Resetta stato
    isPlaying = false
    isLoading = false
    updatePlayPauseButton()
    updateTrackIcon(false)
    updateLoadingState(false)

    // Aggiorna UI player bar
    playerBars.forEach((playerBar) => {
      const img = playerBar.querySelector(".now-playing img")
      const titleEl = playerBar.querySelector(".track-title")
      const albumEl = playerBar.querySelector(".track-album")

      if (img) img.src = ""
      if (titleEl) titleEl.textContent = "Errore Audio"
      if (albumEl) albumEl.textContent = errorMessage
    })

    if (currentView === "album-detail-view") updateTrackListUI(null)

    // Mostra errore all'utente
    showNotification(`Errore: ${errorMessage}`, "error", 5000)

    // Suggerimenti specifici in base al tipo di errore
    if (errorDetails && errorDetails.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      const fileExt = currentTrack && currentTrack.audioSrc ? currentTrack.audioSrc.split(".").pop().toLowerCase() : ""

      if (fileExt === "mp3" || fileExt === "m4a" || fileExt === "wav") {
        showNotification(
          `Verifica che il file "${currentTrack.audioSrc}" esista nella directory corretta`,
          "warning",
          7000,
        )
      } else {
        showNotification(`Il formato audio "${fileExt}" potrebbe non essere supportato dal browser`, "warning", 7000)
      }
    }
  }

  // Funzione per verificare se un file esiste (solo per debug)
  function checkFileExists(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open("HEAD", url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(true)
        } else {
          callback(false)
        }
      }
    }
    xhr.send()
  }

  // Funzione per riprodurre una traccia con gestione errori migliorata
  function playTrack(track, album) {
    if (!track || !album) {
      logError("playTrack chiamata senza traccia o album valido")
      showNotification("Errore: dati traccia non validi", "error")
      return
    }

    // Gestione click sulla stessa traccia
    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        logInfo(`Pausa traccia corrente: ${track.title}`)
        audioPlayer.pause()
      } else {
        logInfo(`Riprendo traccia corrente: ${track.title}`)
        audioPlayer.play().catch((e) => {
          logError("Errore ripresa riproduzione:", e)
          showNotification("Impossibile riprendere la riproduzione", "error")
        })
      }
      return
    }

    // Cambia traccia
    logInfo(`Tentativo riproduzione traccia: ${track.title} (${track.audioSrc})`)

    // Verifica validità percorso audio
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      logError(`Percorso audio non valido per la traccia "${track.title}"`)
      showNotification(`Errore: percorso audio non valido per "${track.title}"`, "error")
      return
    }

    // Imposta nuova traccia corrente
    currentTrack = track
    currentAlbum = album
    currentTrack.albumId = currentAlbum.id

    // Mostra stato di caricamento
    isLoading = true
    updateLoadingState(true)

    // Verifica esistenza file (opzionale, solo per debug)
    if (DEBUG) {
      checkFileExists(track.audioSrc, (exists) => {
        if (!exists) {
          logWarning(`Il file audio potrebbe non esistere: ${track.audioSrc}`)
        } else {
          logInfo(`File audio verificato: ${track.audioSrc}`)
        }
      })
    }

    // Imposta direttamente il percorso audio
    try {
      audioPlayer.src = track.audioSrc
      logInfo(`Audio source impostata: ${track.audioSrc}`)

      // Aggiorna UI Player Bar
      playerBars.forEach((playerBar) => {
        const img = playerBar.querySelector(".now-playing img")
        const titleEl = playerBar.querySelector(".track-title")
        const albumEl = playerBar.querySelector(".track-album")

        if (img) {
          img.src = currentAlbum.image || ""
          img.alt = `Now playing: ${track.title}`
        }
        if (titleEl) titleEl.textContent = track.title
        if (albumEl) albumEl.textContent = currentAlbum.title
      })

      // Aggiorna UI Lista Tracce
      if (currentView === "album-detail-view") {
        updateTrackListUI(track.id)
      }

      // Riproduci l'audio con gestione errori
      audioPlayer.load() // Forza il ricaricamento

      audioPlayer
        .play()
        .then(() => {
          logInfo("Riproduzione avviata con successo")
        })
        .catch((error) => {
          logError("Errore avvio riproduzione:", error)

          // Analisi dettagliata dell'errore
          if (error.name === "NotAllowedError") {
            showNotification("Riproduzione bloccata: interazione utente richiesta", "warning")
          } else if (error.name === "NotSupportedError") {
            showNotification
            "warning\");
          } else if (error.name === "NotSupportedError") {
            showNotification("Formato audio non supportato dal browser", "error")
          } else {
            showNotification(`Errore riproduzione: ${error.message || "errore sconosciuto"}`, "error")
          }

          // Reset dello stato
          isLoading = false
          updateLoadingState(false)
        })
    } catch (e) {
      logError("Errore durante l'impostazione della sorgente audio:", e)
      showNotification(`Errore configurazione audio: ${e.message}`, "error")
      isLoading = false
      updateLoadingState(false)
    }
  }

  // --- AGGIORNAMENTO INTERFACCIA UTENTE ---
  function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view") return

    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list")
    if (!tracksListContainer) return

    tracksListContainer.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon")
      const isCurrentTrack = item.dataset.trackId == activeTrackId

      item.classList.toggle("active", isCurrentTrack)

      if (icon) {
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "fa-spinner", "fa-spin", "active")

        if (isCurrentTrack) {
          icon.classList.add("active")
          if (isLoading) {
            icon.classList.add("fas", "fa-spinner", "fa-spin")
          } else {
            icon.classList.add("fas", isPlaying ? "fa-volume-up" : "fa-pause")
          }
        } else {
          icon.classList.add("fas", "fa-music")
        }
      }
    })
  }

  function updateTrackIcon(isPlayingNow) {
    if (currentView === "album-detail-view" && currentTrack) {
      const activeTrackItem = document.querySelector(
        `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`,
      )

      if (activeTrackItem) {
        const icon = activeTrackItem.querySelector(".track-icon")
        if (icon && activeTrackItem.classList.contains("active")) {
          icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "fa-spinner", "fa-spin")

          if (isLoading) {
            icon.classList.add("fas", "fa-spinner", "fa-spin")
          } else {
            icon.classList.add("fas", isPlayingNow ? "fa-volume-up" : "fa-pause")
          }
        }
      }
    }
  }

  function updatePlayPauseButton() {
    playButtons.forEach((btn) => {
      if (isLoading) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
      } else {
        btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
      }
    })
  }

  // --- CONTROLLI PLAYER ---
  function togglePlayPause() {
    logInfo("Toggle Play/Pause button clicked")

    if (isLoading) {
      logInfo("Ignoro click durante caricamento")
      return // Ignora click durante il caricamento
    }

    if (!currentTrack) {
      logInfo("Nessuna traccia corrente, tento di riprodurre la prima traccia")
      if (albums.length > 0 && albums[0].tracks.length > 0) {
        playTrack(albums[0].tracks[0], albums[0])
      } else {
        logWarning("Nessuna traccia disponibile per la riproduzione")
        showNotification("Nessuna traccia disponibile", "warning")
      }
      return
    }

    if (isPlaying) {
      audioPlayer.pause()
    } else {
      audioPlayer.play().catch((e) => {
        logError("Errore play su toggle:", e)
        showNotification("Impossibile avviare la riproduzione", "error")
      })
    }
  }

  function playNextTrack() {
    logInfo("Next track requested")

    if (isLoading) {
      logInfo("Ignoro richiesta durante caricamento")
      return // Ignora durante il caricamento
    }

    if (!currentAlbum || !currentTrack) {
      logInfo("Nessuna traccia corrente per andare alla successiva")
      return
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbum)
    if (currentIndex !== -1 && currentIndex < currentAlbum.tracks.length - 1) {
      logInfo("Riproduco traccia successiva nell'album")
      playTrack(currentAlbum.tracks[currentIndex + 1], currentAlbum)
    } else {
      logInfo("Ultima traccia dell'album raggiunta")
      if (!audioPlayer.paused) audioPlayer.pause()
      showNotification("Fine dell'album", "info", 2000)
    }
  }

  function playPrevTrack() {
    logInfo("Previous track requested")

    if (isLoading) {
      logInfo("Ignoro richiesta durante caricamento")
      return // Ignora durante il caricamento
    }

    if (!currentAlbum || !currentTrack) {
      logInfo("Nessuna traccia corrente per andare alla precedente")
      return
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbum)
    if (currentIndex > 0) {
      logInfo("Riproduco traccia precedente nell'album")
      playTrack(currentAlbum.tracks[currentIndex - 1], currentAlbum)
    } else if (currentIndex === 0) {
      logInfo("Prima traccia dell'album. Riavvolgo se > 3 secondi")
      if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0
        showNotification("Traccia riavvolta", "info", 1000)
      } else {
        showNotification("Già alla prima traccia", "info", 1000)
      }
    }
  }

  // --- FUNZIONI UTILITY ---
  function findTrackIndex(track, album) {
    if (!track || !album || !album.tracks) return -1
    return album.tracks.findIndex((t) => t.id == track.id)
  }

  // --- STORE & EVENTS ---
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
  init()
})
