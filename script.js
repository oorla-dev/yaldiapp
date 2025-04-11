document.addEventListener("DOMContentLoaded", () => {
  // Data
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "placeholder.svg",
      tracks: [
        { id: 101, title: "Intro", duration: "1:30", audioSrc: "audio/yaldhi-intro.mp3" },
        { id: 102, title: "Praise God", duration: "3:45", audioSrc: "audio/yaldhi-praise-god.mp3" },
        { id: 103, title: "New Again", duration: "4:12", audioSrc: "audio/yaldhi-new-again.mp3" },
        { id: 104, title: "Heaven and Hell", duration: "2:58", audioSrc: "audio/yaldhi-heaven-and-hell.mp3" },
        { id: 105, title: "Outro", duration: "2:10", audioSrc: "audio/yaldhi-outro.mp3" },
      ],
    },
    {
      id: 2,
      title: "DONDA 2",
      year: "2022",
      image: "placeholder.svg",
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
      image: "placeholder.svg",
      tracks: [
        { id: 301, title: "First Time", duration: "3:33", audioSrc: "audio/buldy-first-time.mp3" },
        { id: 302, title: "Talking", duration: "2:55", audioSrc: "audio/buldy-talking.mp3" },
        { id: 303, title: "Back to Me", duration: "4:20", audioSrc: "audio/buldy-back-to-me.mp3" },
      ],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "placeholder.svg",
      tracks: [
        { id: 401, title: "Stars", duration: "3:10", audioSrc: "audio/jl2-stars.mp3" },
        { id: 402, title: "Vultures", duration: "4:05", audioSrc: "audio/jl2-vultures.mp3" },
        { id: 403, title: "Carnival", duration: "3:50", audioSrc: "audio/jl2-carnival.mp3" },
        { id: 404, title: "Keys To My Life", duration: "3:25", audioSrc: "audio/jl2-keys-to-my-life.mp3" },
      ],
    },
  ]

  const products = [
    {
      id: "AY-01",
      name: "YALDHI CD",
      image: "images/yaldhi-cd.png",
      price: "€30.00",
      category: "music",
    },
    {
      id: "FM-104",
      name: "FREE MARINAIO TEE",
      image: "placeholder.svg",
      price: "€80.00",
      category: "apparel",
    },
    {
      id: "YS-22",
      name: "YALDHI HOODIE",
      image: "placeholder.svg",
      price: "€120.00",
      category: "apparel",
    },
    {
      id: "BL-05",
      name: "BULDY VINYL",
      image: "placeholder.svg",
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
  let currentView = "main-view"
  let currentAlbum = null
  let currentTrack = null
  let isPlaying = false
  const audioPlayer = document.getElementById("audio-player")

  // Initialize
  function init() {
    renderAlbumGrid()
    renderEvents()
    renderProducts()
    setupNavigation()
    setupAudioPlayer()
  }

  // Navigation
  function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item")

    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetView = this.getAttribute("data-view")
        if (!targetView) return

        switchView(targetView)

        // Update active nav item
        navItems.forEach((navItem) => {
          if (navItem.getAttribute("data-view") === targetView) {
            navItem.classList.add("active")
          } else {
            navItem.classList.remove("active")
          }
        })
      })
    })
  }

  function switchView(viewId) {
    currentView = viewId

    // Hide all views
    document.querySelectorAll(".app-container").forEach((view) => {
      view.classList.add("hidden")
    })

    // Show target view
    document.getElementById(viewId).classList.remove("hidden")
  }

  // Album Grid
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid")
    albumGrid.innerHTML = ""

    albums.forEach((album) => {
      const albumElement = document.createElement("div")
      albumElement.className = "album-item"
      albumElement.innerHTML = `
                <img src="${album.image}" alt="${album.title}">
                <div class="album-title">${album.title}</div>
                <div class="album-year">${album.year}</div>
            `

      albumElement.addEventListener("click", () => {
        showAlbumDetail(album)
      })

      albumGrid.appendChild(albumElement)
    })
  }

  // Album Detail
  function showAlbumDetail(album) {
    currentAlbum = album

    // Set album details
    document.querySelector("#album-detail-view .album-title").textContent = album.title
    document.querySelector("#album-detail-view .album-title-large").textContent = album.title
    document.querySelector("#album-detail-view .album-year").textContent = album.year
    document.querySelector("#album-detail-view .album-tracks-count").textContent = `${album.tracks.length} brani`
    document.querySelector("#album-detail-view .album-cover").src = album.image

    // Render tracks
    const tracksList = document.querySelector("#album-detail-view .tracks-list")
    tracksList.innerHTML = ""

    album.tracks.forEach((track) => {
      const trackElement = document.createElement("div")
      trackElement.className = "track-item"
      trackElement.innerHTML = `
                <div class="track-left">
                    <i class="fas fa-music track-icon"></i>
                    <div class="track-name">${track.title}</div>
                </div>
                <div class="track-duration">${track.duration}</div>
            `

      trackElement.addEventListener("click", () => {
        playTrack(track)
      })

      tracksList.appendChild(trackElement)
    })

    // Show album detail view
    switchView("album-detail-view")

    // Setup back button
    document.querySelector("#album-detail-view .back-btn").addEventListener("click", () => {
      switchView("main-view")
    })
  }

  // Player
  function setupAudioPlayer() {
    // Play/Pause button
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", togglePlayPause)
    })

    // Next button
    document.querySelectorAll(".next-btn").forEach((btn) => {
      btn.addEventListener("click", playNextTrack)
    })

    // Previous button
    document.querySelectorAll(".prev-btn").forEach((btn) => {
      btn.addEventListener("click", playPrevTrack)
    })

    // Audio ended event
    audioPlayer.addEventListener("ended", playNextTrack)
  }

  function playTrack(track) {
    currentTrack = track

    // Update audio source
    audioPlayer.src = track.audioSrc
    audioPlayer.load()

    // Update player UI
    document.querySelectorAll(".now-playing img").forEach((img) => {
      img.src = currentAlbum.image
    })

    document.querySelectorAll(".track-title").forEach((el) => {
      el.textContent = track.title
    })

    document.querySelectorAll(".track-album").forEach((el) => {
      el.textContent = currentAlbum.title
    })

    // Update track list UI
    document.querySelectorAll(".track-item").forEach((item) => {
      item.classList.remove("active")
      const icon = item.querySelector(".track-icon")
      icon.classList.remove("active")
      icon.className = "fas fa-music track-icon"
    })

    const activeTrackItem = document.querySelector(`.track-item:nth-child(${currentAlbum.tracks.indexOf(track) + 1})`)
    if (activeTrackItem) {
      activeTrackItem.classList.add("active")
      const icon = activeTrackItem.querySelector(".track-icon")
      icon.classList.add("active")
      icon.className = "fas fa-volume-up track-icon active"
    }

    // Play the track
    isPlaying = true
    updatePlayPauseButton()
    audioPlayer.play().catch((error) => {
      console.error("Errore durante la riproduzione:", error)
      isPlaying = false
      updatePlayPauseButton()
    })
  }

  function togglePlayPause() {
    if (!currentTrack) {
      if (currentAlbum && currentAlbum.tracks.length > 0) {
        playTrack(currentAlbum.tracks[0])
      } else if (albums.length > 0 && albums[0].tracks.length > 0) {
        currentAlbum = albums[0]
        playTrack(albums[0].tracks[0])
      }
      return
    }

    if (isPlaying) {
      audioPlayer.pause()
    } else {
      audioPlayer.play().catch((error) => {
        console.error("Errore durante la riproduzione:", error)
      })
    }

    isPlaying = !isPlaying
    updatePlayPauseButton()
  }

  function updatePlayPauseButton() {
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
    })
  }

  function playNextTrack() {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex((track) => track.id === currentTrack.id)
    if (currentIndex < currentAlbum.tracks.length - 1) {
      playTrack(currentAlbum.tracks[currentIndex + 1])
    }
  }

  function playPrevTrack() {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex((track) => track.id === currentTrack.id)
    if (currentIndex > 0) {
      playTrack(currentAlbum.tracks[currentIndex - 1])
    }
  }

  // Store
  function renderProducts() {
    const productsGrid = document.querySelector(".products-grid")
    productsGrid.innerHTML = ""

    products.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product-item"
      productElement.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-id">${product.id}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            `

      productsGrid.appendChild(productElement)
    })

    // Category filters
    const categoryButtons = document.querySelectorAll(".category-btn")
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")

        // Update active button
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        // Filter products
        filterProducts(category)
      })
    })
  }

  function filterProducts(category) {
    const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category)

    const productsGrid = document.querySelector(".products-grid")
    productsGrid.innerHTML = ""

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product-item"
      productElement.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-id">${product.id}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            `

      productsGrid.appendChild(productElement)
    })
  }

  // Events
  function renderEvents() {
    const eventsGrid = document.querySelector(".events-grid")
    eventsGrid.innerHTML = ""

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
  }

  // Initialize the app
  init()
})
