document.addEventListener("DOMContentLoaded", () => {
  // --- DATI ---
  const albums = [
    // ... (albums data) ...
  ];
  const products = [
    // ... (products data) ...
  ];
  const events = [
    // ... (events data) ...
  ];

  // --- STATO DELL'APPLICAZIONE ---
  let currentView = "main-view"
  let currentAlbum = null
  let currentTrack = null
  let isPlaying = false
  const audioPlayer = document.getElementById("audio-player")

  // --- CACHE ELEMENTI DOM FREQUENTEMENTE USATI ---
  const playButtons = document.querySelectorAll(".play-btn")
  const prevButtons = document.querySelectorAll(".prev-btn")
  const nextButtons = document.querySelectorAll(".next-btn")
  const playerBars = document.querySelectorAll(".player-bar")
  const navItems = document.querySelectorAll(".nav-item")
  const navBars = document.querySelectorAll(".nav-bar")
  const appContainers = document.querySelectorAll(".app-container")

  // Cache specific to main-view
  const mainView = document.getElementById("main-view");
  const albumGrid = mainView ? mainView.querySelector(".album-grid") : null;
  let comingSoonElement = null; // Will store the coming soon element

  // MODIFICHE PER ANIMAZIONI CAMBIO PAGINA: Durata dell'animazione in millisecondi
  const animationDuration = 500; // DEVE corrispondere alla durata delle transizioni/animazioni CSS


  // --- INIZIALIZZAZIONE ---
  function init() {
    if (!audioPlayer) {
      console.error("Errore Critico: Elemento audio player principale (#audio-player) non trovato!")
      return;
    }

    setupComingSoon();
    renderEvents();
    renderProducts(); // Inizialmente mostra tutti i prodotti nello store
    setupNavigation();
    setupAudioPlayer();
    setupCategoryFilters();

    // MODIFICHE PER TASTI NELLA PAGINA SPLY (main-view)
    setupLandingPageLinks(); // Aggiunge listener per i link interni alla landing page

    // MODIFICHE PER ANIMAZIONI: Gestisce la visualizzazione della vista iniziale con animazione
    const initialViewElement = document.getElementById(currentView);
    if (initialViewElement) {
         appContainers.forEach(view => {
             if (view.id === currentView) {
                 view.classList.remove("hidden");
             } else {
                 view.classList.add("hidden");
             }
         });

         if (currentView === "main-view") {
             showComingSoonMessage(true);
         } else {
             showComingSoonMessage(false);
         }

         initialViewElement.classList.add("view-entering");
         setTimeout(() => {
             initialViewElement.classList.remove("view-entering");
         }, animationDuration);

         navBars.forEach((navbar) => {
              navbar.querySelectorAll(".nav-item").forEach((navItem) => {
                  navItem.classList.toggle("active", navItem.getAttribute("data-view") === currentView);
              });
         });

    } else {
         console.error("Vista iniziale non trovata:", currentView);
          appContainers.forEach(view => view.classList.add("hidden"));
    }

    console.log("App inizializzata.");
  }

  // MODIFICHE PER TASTI NELLA PAGINA SPLY (main-view)
  function setupLandingPageLinks() {
      // Esempio: cerca elementi con ID specifici all'interno della main-view
      const latestDropLink = document.getElementById('link-latest-drop'); // Assumi esista un elemento con questo ID
      const newReleasesLink = document.getElementById('link-new-releases'); // Assumi esista un elemento con questo ID
      // L'utente vuole che i link per eventi restino "lì", quindi non li modifichiamo per navigare

      if (latestDropLink) {
          latestDropLink.style.cursor = 'pointer'; // Indica che è cliccabile
          latestDropLink.addEventListener('click', () => {
              console.log("Latest Drop link clicked, switching to Stores.");
              switchView('stores-view');
               // Aggiorna nav bar per riflettere la vista corrente (Stores)
              navBars.forEach((navbar) => {
                navbar.querySelectorAll(".nav-item").forEach((navItem) => {
                  navItem.classList.toggle("active", navItem.getAttribute("data-view") === 'stores-view');
                });
              });
          });
      } else {
           console.warn("Elemento #link-latest-drop non trovato nella main view.");
      }

      if (newReleasesLink) {
           newReleasesLink.style.cursor = 'pointer'; // Indica che è cliccabile
           newReleasesLink.addEventListener('click', () => {
               console.log("New Releases link clicked, attempting to show YALDHI album.");
               // Trova l'album YALDHI (ID 1) nei dati
               const yaldhiAlbum = albums.find(album => album.id === 1);

               if (yaldhiAlbum) {
                   showAlbumDetail(yaldhiAlbum); // Usa la funzione esistente per mostrare il dettaglio album
                    // Aggiorna nav bar per riflettere la vista corrente (Album Detail View)
                   navBars.forEach((navbar) => {
                     navbar.querySelectorAll(".nav-item").forEach((navItem) => {
                       // Potrebbe non esserci un nav item specifico per 'album-detail-view',
                       // ma potremmo volere che l'item 'main-view' (album list concept) rimanga attivo
                       // o nessuno sia attivo. Manteniamo l'item della vista precedente attivo o nessuno.
                       // Per ora, non aggiorniamo la nav bar automaticamente per il dettaglio album.
                       // L'utente naviga *fuori* dalle viste principali del menu.
                       // Oppure potremmo voler disattivare tutti i nav items.
                       navItem.classList.remove("active"); // Nessun nav item principale attivo
                     });
                   });

               } else {
                   console.error("Album YALDHI (ID 1) non trovato nei dati.");
                    alert("Dettagli album non disponibili.");
               }
           });
      } else {
           console.warn("Elemento #link-new-releases non trovato nella main view.");
      }

       // Per "new events resta li", non aggiungiamo qui un listener di navigazione
       // Ci aspettiamo che eventuali link di eventi sulla landing page non navighino
       // o che la navigazione verso la vista eventi sia gestita dal menu principale.
  }


  // MODIFICHE PER COMING SOON: Funzione per creare e preparare l'elemento Coming Soon
  function setupComingSoon() {
      if (!mainView) {
          console.error("Main view non trovata per setup Coming Soon.");
          return;
      }

      comingSoonElement = mainView.querySelector("#coming-soon-message");

      if (!comingSoonElement) {
          comingSoonElement = document.createElement("div");
          comingSoonElement.id = "coming-soon-message";
          comingSoonElement.style.cssText = "text-align: center; padding: 50px; font-size: 1.5em; color: #ccc; width: 100%;"; // Stile base
          comingSoonElement.innerHTML = "<h2>COMING SOON</h2><p>La sezione album è attualmente in costruzione. Torna a controllare presto!</p>";

          if (albumGrid && albumGrid.parentNode) {
               albumGrid.parentNode.insertBefore(comingSoonElement, albumGrid.nextSibling);
          } else {
               mainView.appendChild(comingSoonElement);
          }

           comingSoonElement.classList.add("hidden"); // Inizialmente nascosto
      }
  }

  // MODIFICHE PER COMING SOON: Funzione helper per mostrare/nascondere Coming Soon e griglia album
  function showComingSoonMessage(show) {
       if (albumGrid) {
           albumGrid.classList.toggle("hidden", show);
       }
       if (comingSoonElement) {
           comingSoonElement.classList.toggle("hidden", !show);
       }
  }


  // --- NAVIGAZIONE TRA VISTE ---
  function setupNavigation() {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view")
        switchView(targetViewId)

        // Aggiorna stato active nav bar (logica esistente)
        navBars.forEach((navbar) => {
          navbar.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId)
          })
        })
      })
    })
  }

  // --- SWITCH VIEW (modificata per gestire animazioni e Coming Soon) ---
  function switchView(viewId) {
    console.log("Switching to view:", viewId);

    if (viewId === currentView) {
        console.log("Already in view:", viewId);
        return;
    }

    const currentViewElement = document.getElementById(currentView);
    const targetViewElement = document.getElementById(viewId);

    if (!targetViewElement) {
        console.error("Target view not found:", viewId);
        return;
    }

    if (isPlaying) {
      audioPlayer.pause();
    }
    if (currentView === "album-detail-view") {
      updateTrackListUI(null);
    }

    if (currentViewElement) {
        currentViewElement.classList.remove("view-entering");
        currentViewElement.classList.add("view-exiting");
    }

    setTimeout(() => {
        if (currentViewElement) {
            currentViewElement.classList.add("hidden");
            currentViewElement.classList.remove("view-exiting");
        }

         appContainers.forEach((view) => {
             if (view.id !== viewId) {
                 view.classList.add("hidden");
             }
         });

        targetViewElement.classList.remove("hidden");

         targetViewElement.classList.remove("view-exiting");
        targetViewElement.classList.add("view-entering");

         setTimeout(() => {
             targetViewElement.classList.remove("view-entering");
         }, animationDuration);


        // --- Gestione specifica per main-view (Coming Soon) DOPO aver mostrato il container ---
        if (viewId === "main-view") {
            showComingSoonMessage(true);
        } else {
            showComingSoonMessage(false);
        }

        currentView = viewId;

    }, currentViewElement ? animationDuration : 0);

     // Nota: l'aggiornamento della navigazione nel menu principale è gestito nel listener click del nav-item
  }


  // --- RENDERING CONTENUTI ---

  // Questa funzione non viene chiamata all'avvio con la logica Coming Soon attiva.
  function renderAlbumGrid() {
    console.log("renderAlbumGrid chiamata (potrebbe essere nascosta)");
    const albumGrid = document.querySelector("#main-view .album-grid")
    if (!albumGrid) return

    showComingSoonMessage(false); // Nasconde Coming Soon e mostra griglia

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

    const tracksList = detailView.querySelector(".tracks-list")
    if (!tracksList) {
      console.error("Contenitore lista tracce non trovato")
      return
    }
    tracksList.innerHTML = ""

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
        console.log(`Track item clicked: ${track.title} (ID: ${track.id})`)
        playTrack(track, album)
      })
      tracksList.appendChild(trackElement)
    })

    updateTrackListUI(currentTrack && currentTrack.albumId === album.id ? currentTrack.id : null);

    // Utilizza switchView per passare alla vista dettaglio album con animazione
    switchView("album-detail-view")

    const backButton = detailView.querySelector(".back-btn")
    if (backButton) {
      const newBackButton = backButton.cloneNode(true)
      backButton.parentNode.replaceChild(newBackButton, backButton)
      newBackButton.addEventListener("click", () => {
        if (isPlaying) {
          audioPlayer.pause()
        }
        // Ritorna alla main-view (che ora mostra Coming Soon)
        switchView("main-view")
         // Aggiorna nav bar per tornare all'elemento main-view
        navBars.forEach((navbar) => {
          navbar.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.toggle("active", navItem.getAttribute("data-view") === 'main-view');
          });
        });
      })
    }
  }

  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid")
    if (!productsGrid) {
         console.error("Contenitore prodotti (#stores-view .products-grid) non trovato.");
         return;
     }
    productsGrid.innerHTML = ""
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)
    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p>Nessun prodotto trovato per questa categoria.</p>";
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
    if (!eventsGrid) {
        console.error("Contenitore eventi (#events-view .events-grid) non trovato.");
        return;
    }
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
    playButtons.forEach((btn) => btn.addEventListener("click", togglePlayPause))
    prevButtons.forEach((btn) => btn.addEventListener("click", playPrevTrack))
    nextButtons.forEach((btn) => btn.addEventListener("click", playNextTrack))

    audioPlayer.addEventListener("ended", playNextTrack)
    audioPlayer.addEventListener("play", handlePlayEvent)
    audioPlayer.addEventListener("pause", handlePauseEvent)
    audioPlayer.addEventListener("error", handleErrorEvent)
  }

  function handlePlayEvent() {
    console.log("Audio player event: play")
    isPlaying = true
    updatePlayPauseButton()
    updateTrackIcon(true)
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
    updatePlayPauseButton()
    updateTrackIcon(false)
  }

  function handleErrorEvent() {
    console.error("Errore Audio Player:", audioPlayer.error)
    isPlaying = false
    updatePlayPauseButton()
    updateTrackIcon(false)
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
    alert("Errore durante il caricamento dell'audio. Controlla i percorsi dei file audio e la console per dettagli tecnici.")
  }

  function playTrack(track, album) {
    if (!track || !album) {
      console.error("playTrack chiamata senza traccia o album valido.")
      return
    }

    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioPlayer.pause()
        console.log("Pausing current track.")
      } else {
        if (audioPlayer.readyState >= 2) {
          audioPlayer.play().catch((e) => console.error("Errore ripresa riproduzione:", e))
          console.log("Resuming current track.")
        } else {
          console.log("Audio non pronto per riprendere, riprovo a caricare.")
          audioPlayer.load()
          audioPlayer.play().catch((e) => console.error("Errore play dopo load:", e))
        }
      }
      return
    }

    console.log(`Attempting to play track (ID: ${track.id}): ${track.title}`)
    const trackToPlay = { ...track, albumId: album.id };
    currentTrack = trackToPlay;
    currentAlbum = album;


    console.log(`Setting audio source to: ${track.audioSrc}`)
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(
        `Errore: Percorso audio non valido per la traccia "${track.title}" (ID: ${track.id}). Ricevuto:`,
        track.audioSrc,
      )
      handleErrorEvent()
      alert(`Errore: Percorso audio mancante o non valido per "${track.title}". Controlla i dati nell'array 'albums'.`)
      return
    }

    if (!track.audioSrc.startsWith("YALDHI/") && !track.audioSrc.startsWith("/") && !track.audioSrc.includes("://")) {
       console.warn(`Percorso audio non inizia con YALDHI/, / o protocollo: ${track.audioSrc}. Tentativo di correzione automatica aggiungendo YALDHI/.`);
       track.audioSrc = "YALDHI/" + track.audioSrc.split("/").pop();
       console.log(`Percorso corretto: ${track.audioSrc}`);
    }

    audioPlayer.src = track.audioSrc

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

    if (currentView === "album-detail-view" && currentAlbum.id === album.id) {
      updateTrackListUI(track.id)
    } else if (currentView === "album-detail-view") {
         updateTrackListUI(null);
    }


    console.log("Calling load() and play() on audio player...")
    audioPlayer.load()
    const playPromise = audioPlayer.play()

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("Playback started successfully (via Promise).")
        })
        .catch((error) => {
          console.error("Error attempting to play audio (via Promise):", error)
          if (error.name === "NotAllowedError" || error.name === "AbortError") {
             console.warn("Riproduzione bloccata dalle impostazioni del browser o mancata interazione utente.");
             alert("La riproduzione automatica è bloccata dal browser. Clicca sul pulsante Play per avviare l'audio.");
          } else {
             handleErrorEvent();
          }
        })
    }
  }

  function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view" || !currentAlbum) return;
    const tracksListContainer = document.querySelector("#album-detail-view .tracks-list");
    if (!tracksListContainer) return;

    tracksListContainer.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon");
      const isCurrentTrack = String(item.dataset.trackId) === String(activeTrackId);

      item.classList.toggle("active", isCurrentTrack);

      if (icon) {
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active");
        if (isCurrentTrack) {
          icon.classList.add("active");
          icon.classList.add("fas", isPlaying ? "fa-volume-up" : "fa-pause");
        } else {
          icon.classList.add("fas", "fa-music");
        }
      }
    });
  }

  function updateTrackIcon(isPlayingNow) {
    if (currentView === "album-detail-view" && currentTrack && currentAlbum) {
         if (document.querySelector("#album-detail-view .album-title-large").textContent === currentAlbum.title) {
              const activeTrackItem = document.querySelector(
                `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`
              );
              if (activeTrackItem) {
                const icon = activeTrackItem.querySelector(".track-icon");
                if (icon && activeTrackItem.classList.contains("active")) {
                  icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up");
                   icon.classList.add("fas", isPlayingNow ? "fa-volume-up" : "fa-pause");
                }
              }
         }
    }
  }

  function updatePlayPauseButton() {
    playButtons.forEach((btn) => {
      btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
  }

  function togglePlayPause() {
    console.log("Toggle Play/Pause button clicked.");
    if (!currentTrack) {
        console.log("No current track, attempting to load first track overall.");
        if (albums.length > 0 && albums[0].tracks.length > 0) {
             playTrack(albums[0].tracks[0], albums[0]);
        } else {
             console.warn("Nessuna traccia disponibile negli album per la riproduzione.");
             alert("Nessuna traccia disponibile per la riproduzione.");
        }
        return;
    }

    if (isPlaying) {
      audioPlayer.pause();
    } else {
       if (audioPlayer.readyState >= 2) {
           audioPlayer.play().catch((e) => console.error("Errore play su toggle:", e));
       } else {
           console.warn("Audio non pronto per play su toggle, stato:", audioPlayer.readyState);
           audioPlayer.load();
           audioPlayer.play().catch((e) => console.error("Errore play dopo load su toggle:", e));
       }
    }
  }

  function playNextTrack() {
    console.log("Next track requested.");
    const currentAlbumData = albums.find(a => currentAlbum && a.id === currentAlbum.id);

    if (!currentTrack || !currentAlbumData) {
      console.log("Nessuna traccia corrente o album trovato per andare alla successiva.");
      return;
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbumData);

    if (currentIndex !== -1 && currentIndex < currentAlbumData.tracks.length - 1) {
      console.log("Playing next track in album.");
      playTrack(currentAlbumData.tracks[currentIndex + 1], currentAlbumData);
    } else {
      console.log("Ultima traccia dell'album raggiunta.");
      if (!audioPlayer.paused) audioPlayer.pause();
    }
  }

  function playPrevTrack() {
    console.log("Previous track requested.");
    const currentAlbumData = albums.find(a => currentAlbum && a.id === currentAlbum.id);

    if (!currentTrack || !currentAlbumData) {
      console.log("Nessuna traccia corrente o album trovato per andare alla precedente.");
      return;
    }

    const currentIndex = findTrackIndex(currentTrack, currentAlbumData);

    if (currentIndex > 0) {
      console.log("Playing previous track in album.");
      playTrack(currentAlbumData.tracks[currentIndex - 1], currentAlbumData);
    } else if (currentIndex === 0) {
      console.log("Prima traccia dell'album.");
      if (audioPlayer.currentTime > 3) {
        console.log("Riavvolgo la traccia corrente.");
        audioPlayer.currentTime = 0;
      } else {
          console.log("Meno di 3 secondi trascorsi, nessuna azione.");
      }
    } else {
         console.log("Traccia non trovata nell'album corrente o errore indice.");
    }
  }

  // --- FUNZIONI UTILITY ---
  function findTrackIndex(track, album) {
    if (!track || !album || !album.tracks) return -1;
    return album.tracks.findIndex((t) => String(t.id) === String(track.id));
  }

  // --- STORE & EVENTS (Logica semplice di rendering) ---
  function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll("#stores-view .category-btn")
    if (!categoryButtons.length) {
        console.warn("Nessun bottone di categoria trovato nella vista store.");
        return;
    }
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
        renderProducts(category)
      })
    })
     const allButton = document.querySelector("#stores-view .category-btn[data-category='all']");
     if(allButton) {
         allButton.classList.add("active");
     } else if (categoryButtons.length > 0) {
         categoryButtons[0].classList.add("active");
     }
  }

  // --- AVVIO APPLICAZIONE ---
  init() // Chiama la funzione di inizializzazione dopo che il DOM è pronto
})
