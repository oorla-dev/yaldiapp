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
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhicd.png", price: "€30.00", category: "music" },
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€30.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€30.00", category: "apparel" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€30.00", category: "music" },
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

  // MODIFICHE PER COMING SOON: Cache degli elementi specifici per la main view
  const mainView = document.getElementById("main-view");
  const albumGrid = mainView ? mainView.querySelector(".album-grid") : null;
  let comingSoonElement = null; // Variabile per l'elemento "Coming Soon"


  // --- INIZIALIZZAZIONE ---
  function init() {
    if (!audioPlayer) {
      console.error("Errore Critico: Elemento audio player principale (#audio-player) non trovato!")
      return // Blocca l'esecuzione se manca il player
    }

    // MODIFICHE PER COMING SOON: Non renderizzare la griglia degli album all'avvio
    // renderAlbumGrid(); // Questa chiamata viene sostituita dalla logica "Coming Soon"

    // MODIFICHE PER COMING SOON: Prepara l'elemento "Coming Soon"
    setupComingSoon();

    renderEvents() // Mantieni il rendering delle altre sezioni
    renderProducts() // Mantieni il rendering delle altre sezioni
    setupNavigation()
    setupAudioPlayer()
    setupCategoryFilters()

    // MODIFICHE PER COMING SOON: Imposta la vista iniziale per mostrare "Coming Soon"
     if (currentView === "main-view") {
         showComingSoonMessage(true); // Mostra il messaggio Coming Soon
     }


    console.log("App inizializzata.");
  }

  // MODIFICHE PER COMING SOON: Funzione per creare e preparare l'elemento Coming Soon
  function setupComingSoon() {
      if (!mainView) {
          console.error("Main view non trovata per setup Coming Soon.");
          return;
      }

      // Controlla se l'elemento Coming Soon esiste già nel DOM
      comingSoonElement = mainView.querySelector("#coming-soon-message");

      if (!comingSoonElement) {
          // Se non esiste, crealo
          comingSoonElement = document.createElement("div");
          comingSoonElement.id = "coming-soon-message";
          // Aggiungi uno stile base (puoi spostarlo in CSS)
          comingSoonElement.style.cssText = "text-align: center; padding: 50px; font-size: 1.5em; color: #ccc; width: 100%;";
          comingSoonElement.innerHTML = "<h2>COMING SOON</h2><p>La sezione album è attualmente in costruzione. Torna a controllare presto!</p>";

          // Aggiungi l'elemento alla main view
          // Puoi decidere dove posizionarlo, ad esempio dopo la griglia (se esiste)
          if (albumGrid && albumGrid.parentNode) {
               albumGrid.parentNode.insertBefore(comingSoonElement, albumGrid.nextSibling);
          } else {
               // Se la griglia non c'è, aggiungilo direttamente alla main view
               mainView.appendChild(comingSoonElement);
          }

          // Assicurati che inizialmente sia nascosto, la funzione switchView gestirà la visibilità
           comingSoonElement.classList.add("hidden"); // Usa la classe hidden esistente
      }
  }

  // MODIFICHE PER COMING SOON: Funzione helper per mostrare/nascondere Coming Soon e griglia album
  function showComingSoonMessage(show) {
       if (albumGrid) {
           // Nascondi la griglia album se stai mostrando Coming Soon
           albumGrid.classList.toggle("hidden", show);
       }
       if (comingSoonElement) {
            // Mostra Coming Soon se 'show' è true, nascondi altrimenti
           comingSoonElement.classList.toggle("hidden", !show);
       }
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
        switchView(targetViewId) // Questa funzione ora gestisce lo stato Coming Soon per main-view

        // Aggiorna stato active nav bar (logica esistente)
        navBars.forEach((navbar) => {
          navbar.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId)
          })
        })
      })
    })
  }

  // --- SWITCH VIEW (modificata per gestire Coming Soon nella main-view) ---
  function switchView(viewId) {
    console.log("Switching to view:", viewId)
    currentView = viewId
    appContainers.forEach((view) => view.classList.add("hidden")) // Nascondi tutte le viste

    const targetViewElement = document.getElementById(viewId)
    if (targetViewElement) {
      targetViewElement.classList.remove("hidden") // Mostra la vista di destinazione

      // MODIFICHE PER COMING SOON: Gestione specifica per la main-view
      if (viewId === "main-view") {
          // Quando passi ALLA main-view, mostra Coming Soon e nascondi la griglia
          showComingSoonMessage(true);
      } else {
         // Quando passi DALLA main-view ad un'altra vista
         // Gli elementi interni (griglia, coming soon) vengono nascosti automaticamente
         // perché il loro contenitore (.app-container) viene nascosto.
         // Tuttavia, per coerenza, possiamo assicurarci che siano nascosti.
         showComingSoonMessage(false); // Nascondi sia la griglia che il coming soon
      }

    } else {
      console.error("Target view not found:", viewId)
    }
  }

  // --- RENDERING CONTENUTI ---

  // MODIFICHE PER COMING SOON: Questa funzione ora non viene chiamata all'avvio
  // La mantengo nel caso in cui in futuro si volesse riattivare la griglia album
  function renderAlbumGrid() {
    console.log("renderAlbumGrid chiamata (ma potenzialmente nascosta da Coming Soon)");
    const albumGrid = document.querySelector("#main-view .album-grid") // Ri-seleziona in caso di modifiche al DOM
    if (!albumGrid) return

    // MODIFICHE PER COMING SOON: Assicurati che Coming Soon sia nascosto se decidi di renderizzare la griglia esplicitamente
    showComingSoonMessage(false); // Nascondi Coming Soon e mostra griglia

    albumGrid.innerHTML = "" // Pulisce la griglia precedente
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

    // Aggiorna info album (codice esistente)
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

    // Render tracks list (SENZA audio incorporati) (codice esistente)
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
    // Passa l'ID della traccia corrente solo se appartiene all'album che stai mostrando
    updateTrackListUI(currentTrack && currentTrack.albumId === album.id ? currentTrack.id : null);


    switchView("album-detail-view") // Mostra la vista dettaglio

    // Setup back button (codice esistente)
    const backButton = detailView.querySelector(".back-btn")
    if (backButton) {
      // Clona il bottone per rimuovere listener precedenti e aggiungerne uno nuovo pulito
      const newBackButton = backButton.cloneNode(true)
      backButton.parentNode.replaceChild(newBackButton, backButton)
      newBackButton.addEventListener("click", () => {
        if (isPlaying) {
          audioPlayer.pause()
        }
        switchView("main-view")
        // Aggiorna nav bar main view (se necessario, switchView aggiorna già l'active)
        // document.querySelectorAll("#main-view .nav-item").forEach((navItem) => {
        //   navItem.classList.toggle("active", navItem.getAttribute("data-view") === "main-view")
        // })
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
    prevButtons.forEach((btn) => btn("click", playPrevTrack)) // Corretto 'addEventListener'
    nextButtons.forEach((btn) => btn("click", playNextTrack)) // Corretto 'addEventListener'

    // Listener per eventi del tag <audio> principale
    audioPlayer.addEventListener("ended", playNextTrack) // Passa alla traccia successiva alla fine
    audioPlayer.addEventListener("play", handlePlayEvent) // Quando la riproduzione inizia/riprende
    audioPlayer.addEventListener("pause", handlePauseEvent) // Quando la riproduzione va in pausa/finisce
    audioPlayer.addEventListener("error", handleErrorEvent) // In caso di errore caricamento/riproduzione
     // Potresti voler aggiungere listener per 'timeupdate' per aggiornare una progress bar

     // Aggiunto controllo per i pulsanti prev/next se necessario (erano 'btn('click', ...)')
     prevButtons.forEach((btn) => btn.addEventListener("click", playPrevTrack));
     nextButtons.forEach((btn) => btn.addEventListener("click", playNextTrack));
  }

  function handlePlayEvent() {
    console.log("Audio player event: play")
    isPlaying = true
    updatePlayPauseButton() // Aggiorna i pulsanti play/pause in tutte le barre
    updateTrackIcon(true) // Aggiorna l'icona nella lista (se visibile)
     // Aggiorna UI player bar se non è già fatto da playTrack
     if (currentTrack && currentAlbum) {
         playerBars.forEach(playerBar => {
             const img = playerBar.querySelector(".now-playing img");
             const titleEl = playerBar.querySelector(".track-title");
             const albumEl = playerBar.querySelector(".track-album");
             if (img && img.src.includes("placeholder.svg")) img.src = currentAlbum.image || "placeholder.svg";
             if (titleEl && titleEl.textContent === "Errore Audio") titleEl.textContent = currentTrack.title;
             if (albumEl && albumEl.textContent === "") albumEl.textContent = currentAlbum.title;
         });
     }
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
      if (img) img.src = "placeholder.svg" // Immagine placeholder
      if (titleEl) titleEl.textContent = "Errore Audio"
      if (albumEl) albumEl.textContent = ""
    })
    currentTrack = null // Resetta lo stato della traccia in caso di errore
    currentAlbum = null // Resetta lo stato dell'album in caso di errore
    if (currentView === "album-detail-view") updateTrackListUI(null) // Rimuovi l'highlight dalla lista
    alert("Errore durante il caricamento dell'audio. Controlla i percorsi dei file audio e la console per dettagli tecnici.") // Avviso utente
  }

  // Funzione centrale per avviare/cambiare traccia
  function playTrack(track, album) {
    if (!track || !album) {
      console.error("playTrack chiamata senza traccia o album valido.")
      return
    }

    // Gestione click sulla stessa traccia (logica esistente)
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
    // Salva un riferimento alla traccia e all'album corrente
    // Aggiungo l'albumId alla traccia per facilitare la navigazione (next/prev)
    const trackToPlay = { ...track, albumId: album.id };
    currentTrack = trackToPlay;
    currentAlbum = album;


    // *** VERIFICA PERCORSO AUDIO ***
    console.log(`Setting audio source to: ${track.audioSrc}`)
    // Controlli base sul percorso
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(
        `Errore: Percorso audio non valido per la traccia "${track.title}" (ID: ${track.id}). Ricevuto:`,
        track.audioSrc,
      )
      handleErrorEvent() // Simula errore per resettare UI
      alert(`Errore: Percorso audio mancante o non valido per "${track.title}". Controlla i dati nell'array 'albums'.`)
      return
    }

    // Correzione automatica del percorso se necessario (basato sul tuo esempio con "YALDHI/")
    // Evita di correggere se è già un percorso assoluto o inizia con '/'
    if (!track.audioSrc.startsWith("YALDHI/") && !track.audioSrc.startsWith("/") && !track.audioSrc.includes("://")) {
       console.warn(`Percorso audio non inizia con YALDHI/, / o protocollo: ${track.audioSrc}. Tentativo di correzione automatica aggiungendo YALDHI/.`);
       track.audioSrc = "YALDHI/" + track.audioSrc.split("/").pop(); // Prende solo il nome file finale
       console.log(`Percorso corretto: ${track.audioSrc}`);
    }

    audioPlayer.src = track.audioSrc

    // Aggiorna UI Player Bar (tutte le barre) (logica esistente)
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

    // Aggiorna UI Lista Tracce (se visibile e se stai visualizzando l'album corretto)
    if (currentView === "album-detail-view" && currentAlbum.id === album.id) {
      updateTrackListUI(track.id)
    } else if (currentView === "album-detail-view") {
        // Se passi a una traccia di un altro album mentre eri nella vista dettaglio di un album diverso,
        // assicurati che l'highlight precedente venga rimosso.
         updateTrackListUI(null);
    }


    // Carica e avvia riproduzione (logica esistente con Promise)
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
          // Gestisci errori specifici come autoplay bloccato
          if (error.name === "NotAllowedError" || error.name === "AbortError") {
             console.warn("Riproduzione bloccata dalle impostazioni del browser o mancata interazione utente.");
             // Fornisci feedback all'utente
             alert("La riproduzione automatica è bloccata dal browser. Clicca sul pulsante Play per avviare l'audio.");
          } else {
             // Gestisci altri errori
             handleErrorEvent(); // Utilizza la gestione errori generale
          }
        })
    }
  }

  // --- AGGIORNAMENTO INTERFACCIA UTENTE ---

  // Aggiorna lo stato visuale della lista tracce (highlight e icona)
  function updateTrackListUI(activeTrackId) {
    // Applica aggiornamenti solo se sei nella vista dettaglio album E se un album è correntemente visualizzato
    if (currentView !== "album-detail-view" || !currentAlbum) return;
    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list");
    if (!tracksListContainer) return;

    tracksListContainer.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon");
      // Confronto ID: usa String() per sicurezza nel confronto tra dataset (stringa) e ID (potrebbe essere numero)
      const isCurrentTrack = String(item.dataset.trackId) === String(activeTrackId);

      item.classList.toggle("active", isCurrentTrack); // Evidenzia/deseleziona l'intera riga

      if (icon) {
        // Aggiorna icona
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active");
        if (isCurrentTrack) {
          icon.classList.add("active"); // Classe per icona attiva (per eventuale stile CSS)
          // L'icona riflette lo stato isPlaying del player principale
          // Mostra icona volume se in riproduzione, pausa se in pausa
          icon.classList.add("fas", isPlaying ? "fa-volume-up" : "fa-pause");
        } else {
          icon.classList.add("fas", "fa-music"); // Icona default per tracce non attive
        }
      }
    });
  }

  // Aggiorna solo l'icona della traccia attiva nella lista (chiamato da play/pause events)
  function updateTrackIcon(isPlayingNow) {
    // Applica aggiornamenti solo se sei nella vista dettaglio album E c'è una traccia corrente
    if (currentView === "album-detail-view" && currentTrack) {
         // Trova l'elemento della traccia attualmente attiva nella lista visualizzata
         const activeTrackItem = document.querySelector(
           `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`
         );
         if (activeTrackItem) {
           const icon = activeTrackItem.querySelector(".track-icon");
           // Aggiorna solo se l'icona esiste e l'item è marcato come 'active' (dovrebbe esserlo)
           if (icon && activeTrackItem.classList.contains("active")) {
             icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up");
             // Imposta icona corretta (volume se play, pausa se non play)
             icon.classList.add("fas", isPlayingNow ? "fa-volume-up" : "fa-pause");
           }
         }
    }
  }


  // Aggiorna i pulsanti play/pause in TUTTE le barre del player (logica esistente)
  function updatePlayPauseButton() {
    playButtons.forEach((btn) => {
      // Cambia l'icona interna del bottone
      btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
  }

  // --- CONTROLLI PLAYER ---
  function togglePlayPause() {
    console.log("Toggle Play/Pause button clicked.");
    // Se non c'è traccia selezionata, prova ad avviare la prima traccia del primo album
    if (!currentTrack) {
      console.log("No current track, attempting to play first track overall.");
      if (albums.length > 0 && albums[0].tracks.length > 0) {
        // Chiama playTrack con la prima traccia del primo album
        playTrack(albums[0].tracks[0], albums[0]);
      } else {
        console.warn("Nessuna traccia disponibile negli album per la riproduzione.");
         alert("Nessuna traccia disponibile per la riproduzione.");
      }
      return; // Esci dopo aver gestito il caso "nessuna traccia"
    }

    // Se una traccia è selezionata, alterna play/pausa (logica esistente)
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      // Tenta play solo se l'audio ha dati sufficienti
      if (audioPlayer.readyState >= 2) { // HAVE_CURRENT_DATA o more
        audioPlayer.play().catch((e) => console.error("Errore play su toggle:", e));
      } else {
        console.warn("Audio non pronto per play su toggle, stato:", audioPlayer.readyState);
        // Prova a ricaricare e riprodurre
        audioPlayer.load();
        audioPlayer.play().catch((e) => console.error("Errore play dopo load su toggle:", e));
      }
    }
  }

  function playNextTrack() {
    console.log("Next track requested.");
    // Trova l'album corrente nei dati originali per accedere alla lista tracce completa
    const currentAlbumData = albums.find(a => currentAlbum && a.id === currentAlbum.id);

    if (!currentTrack || !currentAlbumData) {
      console.log("Nessuna traccia corrente o album trovato per andare alla successiva.");
      return;
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbumData);

    if (currentIndex !== -1 && currentIndex < currentAlbumData.tracks.length - 1) {
      // C'è una traccia successiva nello stesso album
      console.log("Playing next track in album.");
      playTrack(currentAlbumData.tracks[currentIndex + 1], currentAlbumData);
    } else {
      console.log("Ultima traccia dell'album raggiunta.");
      // Fine dell'album: Metti in pausa
      if (!audioPlayer.paused) audioPlayer.pause();
      // Opzionale: potresti voler deselezionare la traccia o passare all'album successivo
       // updateTrackListUI(null); // Rimuovi highlight dall'ultima traccia
       // currentTrack = null; // Resetta lo stato se vuoi che il player si fermi completamente
    }
  }

  function playPrevTrack() {
    console.log("Previous track requested.");
     // Trova l'album corrente nei dati originali per accedere alla lista tracce completa
    const currentAlbumData = albums.find(a => currentAlbum && a.id === currentAlbum.id);

    if (!currentTrack || !currentAlbumData) {
      console.log("Nessuna traccia corrente o album trovato per andare alla precedente.");
      return;
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbumData);

    if (currentIndex > 0) {
      // C'è una traccia precedente nello stesso album
      console.log("Playing previous track in album.");
      playTrack(currentAlbumData.tracks[currentIndex - 1], currentAlbumData);
    } else if (currentIndex === 0) {
      // Se siamo sulla prima traccia, riavvolgi se sono passati più di 3 sec
      console.log("Prima traccia dell'album.");
      if (audioPlayer.currentTime > 3) {
        console.log("Riavvolgo la traccia corrente.");
        audioPlayer.currentTime = 0; // Riavvia la traccia corrente
        // Se era in play, ripartirà dall'inizio
        // Se era in pausa, sarà pronta per ripartire dall'inizio al prossimo play
      } else {
          console.log("Meno di 3 secondi trascorsi, nessuna azione (o potresti implementare salto all'album precedente).");
          // Opzionale: salta all'ultima traccia dell'album precedente se desiderato
      }
    } else {
         console.log("Traccia non trovata nell'album corrente o errore indice.");
    }
  }

  // --- FUNZIONI UTILITY ---
  function findTrackIndex(track, album) {
    if (!track || !album || !album.tracks) return -1;
     // Trova l'indice della traccia nell'array dell'album
     // Confronta gli ID assicurandoti che siano dello stesso tipo (es. stringa)
    return album.tracks.findIndex((t) => String(t.id) === String(track.id));
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
