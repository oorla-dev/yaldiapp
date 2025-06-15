// 🎵 YALDI Music App - Complete JavaScript

// Global Variables
let currentView = "main-view"
let currentAlbum = null
let currentTrack = null
let currentTrackIndex = 0
let isPlaying = false
let isPlayerExpanded = false
const currentPlaylist = []
let cart = []
let playlists = []
let preferences = {
  theme: "light",
  language: "it",
  notifications: true,
  autoplay: false,
  quality: "medium",
  showLyrics: true,
  wifiOnly: false,
  equalizer: false,
  history: true,
}

// Sample Data
const albums = [
  {
    id: 1,
    title: "YALDHI",
    artist: "YALDI",
    year: "2024",
    cover:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23ff6b6b'/><text x='100' y='110' text-anchor='middle' font-family='Arial' font-size='24' fill='white' font-weight='bold'>YALDHI</text></svg>",
    tracks: [
      { id: 1, title: "NEW ALDI", duration: "3:24", file: "audio1.mp3" },
      { id: 2, title: "FVCK GIANVOIT", duration: "2:58", file: "audio2.mp3" },
      { id: 3, title: "ALDIEN", duration: "4:12", file: "audio3.mp3" },
    ],
  },
  {
    id: 2,
    title: "DONDA 2",
    artist: "YALDI",
    year: "2024",
    cover:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23333'/><text x='100' y='110' text-anchor='middle' font-family='Arial' font-size='20' fill='white' font-weight='bold'>DONDA 2</text></svg>",
    tracks: [
      { id: 4, title: "Track 1", duration: "3:45", file: "audio4.mp3" },
      { id: 5, title: "Track 2", duration: "4:20", file: "audio5.mp3" },
    ],
  },
  {
    id: 3,
    title: "FM",
    artist: "YALDI",
    year: "2023",
    cover:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%234ecdc4'/><text x='100' y='110' text-anchor='middle' font-family='Arial' font-size='32' fill='white' font-weight='bold'>FM</text></svg>",
    tracks: [
      { id: 6, title: "Radio Hit", duration: "3:30", file: "audio6.mp3" },
      { id: 7, title: "Frequency", duration: "4:05", file: "audio7.mp3" },
    ],
  },
]

const products = [
  {
    id: 1,
    name: "YALDI Hoodie",
    price: "€89.99",
    category: "apparel",
    image:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f0f0f0'/><text x='150' y='160' text-anchor='middle' font-family='Arial' font-size='20' fill='%23666'>YALDI Hoodie</text></svg>",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "YALDHI Vinyl",
    price: "€24.99",
    category: "music",
    image:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><circle cx='150' cy='150' r='140' fill='%23333'/><circle cx='150' cy='150' r='20' fill='%23666'/><text x='150' y='250' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'>YALDHI Vinyl</text></svg>",
    sizes: ["One Size"],
  },
  {
    id: 3,
    name: "YALDI Cap",
    price: "€34.99",
    category: "accessories",
    image:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23ff6b6b'/><text x='150' y='160' text-anchor='middle' font-family='Arial' font-size='18' fill='white'>YALDI Cap</text></svg>",
    sizes: ["One Size"],
  },
]

const events = [
  {
    id: 1,
    title: "YALDI LIVE",
    subtitle: "Concerto Esclusivo",
    description: "Un'esperienza musicale unica con YALDI",
    location: "Milano",
    venue: "Alcatraz",
    date: "15 Marzo 2024",
  },
  {
    id: 2,
    title: "MEET & GREET",
    subtitle: "Incontra YALDI",
    description: "Sessione esclusiva di foto e autografi",
    location: "Roma",
    venue: "Atlantico Live",
    date: "22 Marzo 2024",
  },
]

// Audio Context for Web Audio API
let audioContext
let audioBuffer
let audioSource
let gainNode

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎵 YALDI Music App inizializzata")

  // Load saved preferences
  loadPreferences()

  // Initialize views
  initializeNavigation()
  initializeAlbums()
  initializeStore()
  initializeEvents()
  initializePlayer()
  initializeProfile()
  initializeAuth()
  initializePreferences()
  initializePlaylists()
  initializeChat()

  // Apply theme
  applyTheme()

  // Show welcome message
  showToast("Benvenuto in YALDI Music App! 🎵")
})

// Navigation System
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetView = item.getAttribute("data-view")
      switchView(targetView)

      // Update active nav item
      navItems.forEach((nav) => nav.classList.remove("active"))
      item.classList.add("active")
    })
  })
}

function switchView(viewId) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active-view")
  })

  // Show target view
  const targetView = document.getElementById(viewId)
  if (targetView) {
    targetView.classList.add("active-view")
    currentView = viewId

    // Load view-specific content
    switch (viewId) {
      case "stores-view":
        loadProducts()
        break
      case "events-view":
        loadEvents()
        break
      case "hql-view":
        loadChatMessages()
        break
      case "playlists-view":
        loadPlaylists()
        break
      case "preferences-view":
        loadPreferencesContent()
        break
    }
  }
}

// Albums System
function initializeAlbums() {
  loadAlbums()

  // Back button for album detail
  document.getElementById("album-back-btn").addEventListener("click", () => {
    switchView("main-view")
  })
}

function loadAlbums() {
  const albumGrid = document.getElementById("album-grid")
  albumGrid.innerHTML = ""

  albums.forEach((album) => {
    const albumElement = createAlbumElement(album)
    albumGrid.appendChild(albumElement)
  })
}

function createAlbumElement(album) {
  const albumDiv = document.createElement("div")
  albumDiv.className = "album-item"
  albumDiv.innerHTML = `
        <img src="${album.cover}" alt="${album.title}">
        <div class="album-title">${album.title}</div>
        <div class="album-year">${album.year}</div>
    `

  albumDiv.addEventListener("click", () => {
    showAlbumDetail(album)
  })

  return albumDiv
}

function showAlbumDetail(album) {
  currentAlbum = album

  // Update album detail view
  document.getElementById("detail-album-title").textContent = album.title
  document.getElementById("detail-album-title-large").textContent = album.title
  document.getElementById("detail-album-cover").src = album.cover
  document.getElementById("detail-album-year").textContent = album.year
  document.getElementById("detail-album-tracks-count").textContent = `${album.tracks.length} brani`

  // Load tracks
  loadTracks(album.tracks)

  // Switch to album detail view
  switchView("album-detail-view")
}

function loadTracks(tracks) {
  const tracksList = document.getElementById("tracks-list")
  tracksList.innerHTML = ""

  tracks.forEach((track, index) => {
    const trackElement = createTrackElement(track, index)
    tracksList.appendChild(trackElement)
  })
}

function createTrackElement(track, index) {
  const trackDiv = document.createElement("div")
  trackDiv.className = "track-item"
  trackDiv.innerHTML = `
        <div class="track-left">
            <div class="track-icon">
                <i class="fas fa-play"></i>
            </div>
            <div class="track-name">${track.title}</div>
        </div>
        <div class="track-duration">${track.duration}</div>
    `

  trackDiv.addEventListener("click", () => {
    playTrack(track, index)
  })

  return trackDiv
}

// Player System
function initializePlayer() {
  const playerBar = document.getElementById("player-bar")
  const playBtn = document.getElementById("play-btn")
  const playBtnLarge = document.getElementById("play-btn-large")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const prevBtnLarge = document.getElementById("prev-btn-large")
  const nextBtnLarge = document.getElementById("next-btn-large")
  const playerBackBtn = document.getElementById("player-back-btn")
  const progressContainer = document.getElementById("progress-container")
  const volumeBtn = document.getElementById("volume-btn")
  const volumeControl = document.getElementById("volume-control")
  const volumeSlider = document.getElementById("volume-slider")

  // Player bar click to expand
  playerBar.addEventListener("click", (e) => {
    if (!e.target.closest(".controls")) {
      expandPlayer()
    }
  })

  // Play/Pause buttons
  playBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    togglePlayPause()
  })

  playBtnLarge.addEventListener("click", togglePlayPause)

  // Previous/Next buttons
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    previousTrack()
  })

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    nextTrack()
  })

  prevBtnLarge.addEventListener("click", previousTrack)
  nextBtnLarge.addEventListener("click", nextTrack)

  // Player back button
  playerBackBtn.addEventListener("click", collapsePlayer)

  // Progress bar
  progressContainer.addEventListener("click", seekTrack)

  // Volume controls
  volumeBtn.addEventListener("click", toggleVolumeControl)
  volumeSlider.addEventListener("input", changeVolume)

  // Footer buttons
  initializeFooterButtons()
}

function initializeFooterButtons() {
  const loopBtn = document.getElementById("loop-btn")
  const shuffleBtn = document.getElementById("shuffle-btn")
  const lyricsBtn = document.getElementById("lyrics-btn")

  loopBtn.addEventListener("click", toggleLoop)
  shuffleBtn.addEventListener("click", toggleShuffle)
  lyricsBtn.addEventListener("click", toggleLyrics)
}

function playTrack(track, index) {
  currentTrack = track
  currentTrackIndex = index

  // Update player UI
  updatePlayerUI()

  // Simulate audio playback
  simulateAudioPlayback()

  // Update track list UI
  updateTrackListUI()

  // Show Android notification
  showAndroidNotification(track)
}

function updatePlayerUI() {
  if (!currentTrack || !currentAlbum) return

  // Update mini player
  document.getElementById("player-track-title").textContent = currentTrack.title
  document.getElementById("player-track-album").textContent = currentAlbum.title
  document.getElementById("player-artwork").src = currentAlbum.cover

  // Update expanded player
  document.getElementById("expanded-track-title").textContent = currentTrack.title
  document.getElementById("expanded-track-artist").textContent = currentAlbum.artist
  document.getElementById("expanded-album-title").textContent = currentAlbum.title
  document.getElementById("expanded-artwork").src = currentAlbum.cover
  document.getElementById("total-time").textContent = currentTrack.duration

  // Show player
  document.getElementById("player-container").style.display = "block"
}

function simulateAudioPlayback() {
  isPlaying = true
  updatePlayButtons()

  // Simulate progress
  let currentTime = 0
  const duration = parseDuration(currentTrack.duration)

  const progressInterval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(progressInterval)
      return
    }

    currentTime += 1
    updateProgress(currentTime, duration)

    if (currentTime >= duration) {
      clearInterval(progressInterval)
      nextTrack()
    }
  }, 1000)
}

function parseDuration(duration) {
  const parts = duration.split(":")
  return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
}

function updateProgress(current, total) {
  const percentage = (current / total) * 100
  document.getElementById("progress-bar").style.width = `${percentage}%`

  const currentTimeStr = formatTime(current)
  document.getElementById("current-time").textContent = currentTimeStr
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function togglePlayPause() {
  isPlaying = !isPlaying
  updatePlayButtons()

  if (isPlaying && currentTrack) {
    simulateAudioPlayback()
  }
}

function updatePlayButtons() {
  const playIcon = isPlaying ? "fas fa-pause" : "fas fa-play"
  document.querySelector("#play-btn i").className = playIcon
  document.querySelector("#play-btn-large i").className = playIcon
}

function previousTrack() {
  if (!currentAlbum) return

  currentTrackIndex = Math.max(0, currentTrackIndex - 1)
  const track = currentAlbum.tracks[currentTrackIndex]
  playTrack(track, currentTrackIndex)
}

function nextTrack() {
  if (!currentAlbum) return

  currentTrackIndex = Math.min(currentAlbum.tracks.length - 1, currentTrackIndex + 1)
  const track = currentAlbum.tracks[currentTrackIndex]
  playTrack(track, currentTrackIndex)
}

function expandPlayer() {
  document.getElementById("player-container").classList.add("expanded")
  document.body.classList.add("player-expanded")
  isPlayerExpanded = true
}

function collapsePlayer() {
  document.getElementById("player-container").classList.remove("expanded")
  document.body.classList.remove("player-expanded")
  isPlayerExpanded = false
}

function seekTrack(e) {
  if (!currentTrack) return

  const rect = e.currentTarget.getBoundingClientRect()
  const percentage = (e.clientX - rect.left) / rect.width
  const duration = parseDuration(currentTrack.duration)
  const newTime = Math.floor(duration * percentage)

  updateProgress(newTime, duration)
}

function toggleVolumeControl() {
  const volumeControl = document.getElementById("volume-control")
  volumeControl.style.display = volumeControl.style.display === "none" ? "flex" : "none"
}

function changeVolume(e) {
  const volume = e.target.value
  // In a real app, this would control actual audio volume
  console.log("Volume changed to:", volume)
}

function toggleLoop() {
  const loopBtn = document.getElementById("loop-btn")
  loopBtn.classList.toggle("active")
  showToast(loopBtn.classList.contains("active") ? "🔁 Loop attivato" : "🔁 Loop disattivato")
}

function toggleShuffle() {
  const shuffleBtn = document.getElementById("shuffle-btn")
  shuffleBtn.classList.toggle("active")
  showToast(shuffleBtn.classList.contains("active") ? "🔀 Shuffle attivato" : "🔀 Shuffle disattivato")
}

function toggleLyrics() {
  const lyricsContainer = document.getElementById("lyrics-container")
  const lyricsBtn = document.getElementById("lyrics-btn")

  if (lyricsContainer.innerHTML === "") {
    loadLyrics()
    lyricsBtn.classList.add("active")
  } else {
    lyricsContainer.innerHTML = ""
    lyricsBtn.classList.remove("active")
  }
}

function loadLyrics() {
  const lyricsContainer = document.getElementById("lyrics-container")
  const sampleLyrics = [
    "🎵 Verso 1",
    "Questa è una canzone di esempio",
    "Con testi dimostrativi",
    "Per l'app YALDI Music",
    "",
    "🎵 Ritornello",
    "YALDI, YALDI, sempre in movimento",
    "Musica che arriva al cuore",
    "YALDI, YALDI, questo è il momento",
    "Di vivere ogni emozione",
  ]

  lyricsContainer.innerHTML = `
        <div class="lyrics-preview">
            <div class="lyrics-preview-header">📝 Testi - ${currentTrack ? currentTrack.title : "Traccia"}</div>
            <div class="lyrics-preview-content">
                ${sampleLyrics.map((line) => `<div class="lyrics-line">${line}</div>`).join("")}
            </div>
        </div>
    `
}

function updateTrackListUI() {
  document.querySelectorAll(".track-item").forEach((item, index) => {
    item.classList.toggle("active", index === currentTrackIndex)
    const icon = item.querySelector(".track-icon i")
    if (index === currentTrackIndex && isPlaying) {
      icon.className = "fas fa-pause"
      item.querySelector(".track-icon").classList.add("active")
    } else {
      icon.className = "fas fa-play"
      item.querySelector(".track-icon").classList.remove("active")
    }
  })
}

// Store System
function initializeStore() {
  const searchToggle = document.getElementById("search-toggle")
  const searchInput = document.getElementById("search-input")
  const cartToggle = document.getElementById("cart-toggle")
  const categoryBtns = document.querySelectorAll(".category-btn")

  // Search functionality
  searchToggle.addEventListener("click", () => {
    const isVisible = searchInput.style.display !== "none"
    searchInput.style.display = isVisible ? "none" : "block"
    if (!isVisible) {
      searchInput.focus()
    }
  })

  searchInput.addEventListener("input", (e) => {
    filterProducts(e.target.value)
  })

  // Cart functionality
  cartToggle.addEventListener("click", showCart)

  // Category filtering
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const category = btn.getAttribute("data-category")
      filterProductsByCategory(category)
    })
  })
}

function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productElement = createProductElement(product)
    productsGrid.appendChild(productElement)
  })
}

function createProductElement(product) {
  const productDiv = document.createElement("div")
  productDiv.className = "product-item"
  productDiv.setAttribute("data-category", product.category)

  productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            🛒 Aggiungi al Carrello
        </button>
    `

  return productDiv
}

function filterProducts(searchTerm) {
  const productItems = document.querySelectorAll(".product-item")

  productItems.forEach((item) => {
    const productName = item.querySelector(".product-name").textContent.toLowerCase()
    const matches = productName.includes(searchTerm.toLowerCase())
    item.style.display = matches ? "block" : "none"
  })
}

function filterProductsByCategory(category) {
  const productItems = document.querySelectorAll(".product-item")

  productItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category")
    const shouldShow = category === "all" || itemCategory === category
    item.style.display = shouldShow ? "block" : "none"
  })
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  // Show size selector if product has sizes
  if (product.sizes && product.sizes.length > 1) {
    showSizeSelector(product)
  } else {
    addProductToCart(product, product.sizes ? product.sizes[0] : null)
  }
}

function showSizeSelector(product) {
  const modal = document.getElementById("size-modal")
  const productName = document.getElementById("size-product-name")
  const sizeOptions = document.querySelector(".size-options")

  productName.textContent = product.name
  sizeOptions.innerHTML = ""

  product.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button")
    sizeBtn.className = "size-btn"
    sizeBtn.setAttribute("data-size", size)
    sizeBtn.textContent = size

    sizeBtn.addEventListener("click", () => {
      addProductToCart(product, size)
      modal.style.display = "none"
    })

    sizeOptions.appendChild(sizeBtn)
  })

  modal.style.display = "flex"

  // Close modal
  document.getElementById("size-modal-close").addEventListener("click", () => {
    modal.style.display = "none"
  })
}

function addProductToCart(product, size) {
  const existingItem = cart.find((item) => item.id === product.id && item.size === size)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1,
    })
  }

  updateCartBadge()
  showToast(`✅ ${product.name} aggiunto al carrello`)
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (totalItems > 0) {
    badge.textContent = totalItems
    badge.style.display = "flex"
  } else {
    badge.style.display = "none"
  }
}

function showCart() {
  const modal = document.getElementById("cart-modal")
  const cartContent = document.getElementById("cart-content")

  if (cart.length === 0) {
    cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Il tuo carrello è vuoto</p>
            </div>
        `
  } else {
    cartContent.innerHTML = `
            <div class="cart-items">
                ${cart.map((item) => createCartItemHTML(item)).join("")}
            </div>
            <div class="cart-summary">
                <div class="cart-total">
                    <span>Totale: ${calculateCartTotal()}</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">
                    💳 Procedi al Checkout
                </button>
            </div>
        `
  }

  modal.style.display = "flex"

  // Close modal
  document.getElementById("cart-modal-close").addEventListener("click", () => {
    modal.style.display = "none"
  })
}

function createCartItemHTML(item) {
  return `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">Taglia: ${item.size || "N/A"}</div>
                <div class="cart-item-price">${item.price}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, '${item.size}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, '${item.size}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">
                    🗑️ Rimuovi
                </button>
            </div>
        </div>
    `
}

function changeQuantity(productId, size, change) {
  const item = cart.find((item) => item.id === productId && item.size === size)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId, size)
    } else {
      updateCartBadge()
      showCart() // Refresh cart display
    }
  }
}

function removeFromCart(productId, size) {
  cart = cart.filter((item) => !(item.id === productId && item.size === size))
  updateCartBadge()
  showCart() // Refresh cart display
}

function calculateCartTotal() {
  const total = cart.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("€", ""))
    return sum + price * item.quantity
  }, 0)
  return `€${total.toFixed(2)}`
}

function checkout() {
  showToast("🚀 Reindirizzamento al checkout...")
  // In a real app, this would redirect to a checkout page
  setTimeout(() => {
    cart = []
    updateCartBadge()
    document.getElementById("cart-modal").style.display = "none"
    showToast("✅ Ordine completato con successo!")
  }, 2000)
}

// Events System
function initializeEvents() {
  // Event notification permission
  requestNotificationPermission()
}

function loadEvents() {
  const eventsGrid = document.getElementById("events-grid")
  eventsGrid.innerHTML = ""

  events.forEach((event) => {
    const eventElement = createEventElement(event)
    eventsGrid.appendChild(eventElement)
  })
}

function createEventElement(event) {
  const eventDiv = document.createElement("div")
  eventDiv.className = "event-card"

  eventDiv.innerHTML = `
        <div class="event-title">${event.title}</div>
        <div class="event-subtitle">${event.subtitle}</div>
        <div class="event-desc">${event.description}</div>
        <div class="event-location">📍 ${event.location}</div>
        <div class="event-venue">🏢 ${event.venue}</div>
        <div class="event-date">📅 ${event.date}</div>
    `

  eventDiv.addEventListener("click", () => {
    showEventNotification(event)
  })

  return eventDiv
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    const banner = document.createElement("div")
    banner.className = "notification-permission-banner"
    banner.innerHTML = `
            <span>Vuoi ricevere notifiche per i nuovi eventi?</span>
            <button onclick="enableNotifications()">Abilita</button>
        `
    document.body.appendChild(banner)

    setTimeout(() => {
      if (banner.parentNode) {
        banner.remove()
      }
    }, 10000)
  }
}

function enableNotifications() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showToast("🔔 Notifiche abilitate!")
      }
    })
  }

  // Remove banner
  const banner = document.querySelector(".notification-permission-banner")
  if (banner) banner.remove()
}

function showEventNotification(event) {
  showInAppNotification(`🎉 ${event.title}`, `${event.description} - ${event.date}`)
}

function showInAppNotification(title, body) {
  const notification = document.createElement("div")
  notification.className = "in-app-notification"
  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-body">${body}</div>
        </div>
        <button class="notification-close" onclick="this.parentNode.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

function showAndroidNotification(track) {
  showInAppNotification(`🎵 In riproduzione`, `${track.title} - ${currentAlbum ? currentAlbum.artist : "Artista"}`)
}

// Profile System
function initializeProfile() {
  const themeToggle = document.getElementById("theme-toggle")
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const profileTabs = document.querySelectorAll(".profile-tab")
  const avatarInput = document.getElementById("avatar-input")
  const avatarContainer = document.querySelector(".profile-avatar-container")
  const editProfileBtn = document.getElementById("edit-profile-btn")
  const preferencesBtn = document.getElementById("preferences-btn")
  const logoutBtn = document.getElementById("logout-btn")

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)
  darkModeToggle.addEventListener("click", toggleTheme)

  // Profile tabs
  profileTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab")
      switchProfileTab(targetTab)

      profileTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
    })
  })

  // Avatar upload
  avatarContainer.addEventListener("click", () => {
    avatarInput.click()
  })

  avatarInput.addEventListener("change", handleAvatarUpload)

  // Profile actions
  editProfileBtn.addEventListener("click", editProfile)
  preferencesBtn.addEventListener("click", () => switchView("preferences-view"))
  logoutBtn.addEventListener("click", logout)

  // Load profile data
  loadProfileData()
}

function switchProfileTab(tabId) {
  document.querySelectorAll(".profile-tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  document.getElementById(`${tabId}-tab`).classList.add("active")
}

function handleAvatarUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      document.getElementById("profile-avatar").src = e.target.result
      showToast("📸 Avatar aggiornato!")
    }
    reader.readAsDataURL(file)
  }
}

function loadProfileData() {
  // Load saved profile data or use defaults
  const profileData = JSON.parse(localStorage.getItem("yaldi_profile")) || {
    username: "YaldiUser",
    fullname: "Utente YALDI",
    bio: "Amante della musica YALDI 🎵",
    location: "Italia",
    website: "yaldi.it",
    email: "user@yaldi.it",
  }

  document.getElementById("profile-username").textContent = profileData.username
  document.getElementById("profile-fullname").textContent = profileData.fullname
  document.getElementById("profile-bio").textContent = profileData.bio
  document.getElementById("profile-location").textContent = profileData.location
  document.getElementById("profile-website").textContent = profileData.website
  document.getElementById("profile-email").textContent = profileData.email
}

function editProfile() {
  showToast("✏️ Funzione di modifica profilo in arrivo!")
}

function logout() {
  if (confirm("Sei sicuro di voler uscire?")) {
    localStorage.removeItem("yaldi_profile")
    localStorage.removeItem("yaldi_preferences")
    showToast("👋 Logout effettuato")
    switchView("login-view")
  }
}

// Authentication System
function initializeAuth() {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const loginLink = document.getElementById("login-link")
  const registerLink = document.getElementById("register-link")
  const loginBackBtn = document.getElementById("login-back-btn")
  const registerBackBtn = document.getElementById("register-back-btn")

  // Form submissions
  loginForm.addEventListener("submit", handleLogin)
  registerForm.addEventListener("submit", handleRegister)

  // Switch between login and register
  loginLink.addEventListener("click", (e) => {
    e.preventDefault()
    switchView("login-view")
  })

  registerLink.addEventListener("click", (e) => {
    e.preventDefault()
    switchView("register-view")
  })

  // Back buttons
  loginBackBtn.addEventListener("click", () => switchView("profile-view"))
  registerBackBtn.addEventListener("click", () => switchView("profile-view"))
}

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Simple validation
  if (email && password) {
    showToast("🚀 Login effettuato con successo!")
    switchView("main-view")
  } else {
    showAuthError("login-error", "Inserisci email e password valide")
  }
}

function handleRegister(e) {
  e.preventDefault()

  const username = document.getElementById("register-username").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value

  // Validation
  if (!username || !email || !password) {
    showAuthError("register-error", "Compila tutti i campi")
    return
  }

  if (password !== confirmPassword) {
    showAuthError("register-error", "Le password non coincidono")
    return
  }

  if (password.length < 6) {
    showAuthError("register-error", "La password deve essere di almeno 6 caratteri")
    return
  }

  // Save profile data
  const profileData = {
    username: username,
    email: email,
    fullname: username,
    bio: "Nuovo utente YALDI 🎵",
    location: "Italia",
    website: "yaldi.it",
  }

  localStorage.setItem("yaldi_profile", JSON.stringify(profileData))

  showToast("🎉 Registrazione completata!")
  loadProfileData()
  switchView("main-view")
}

function showAuthError(errorId, message) {
  const errorDiv = document.getElementById(errorId)
  errorDiv.textContent = message
  errorDiv.style.display = "block"

  setTimeout(() => {
    errorDiv.style.display = "none"
  }, 5000)
}

// Preferences System
function initializePreferences() {
  const preferencesBackBtn = document.getElementById("preferences-back-btn")
  const preferenceTabs = document.querySelectorAll(".preference-tab")

  preferencesBackBtn.addEventListener("click", () => switchView("profile-view"))

  preferenceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab")
      switchPreferenceTab(targetTab)

      preferenceTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
    })
  })
}

function switchPreferenceTab(tabId) {
  // Clear existing content
  const content = document.querySelector(".preferences-content")

  switch (tabId) {
    case "general":
      loadGeneralPreferences(content)
      break
    case "audio":
      loadAudioPreferences(content)
      break
    case "advanced":
      loadAdvancedPreferences(content)
      break
  }
}

function loadPreferencesContent() {
  loadGeneralPreferences(document.querySelector(".preferences-content"))
}

function loadGeneralPreferences(container) {
  container.innerHTML = `
        <div class="preferences-section">
            <h2>🌍 Impostazioni Generali</h2>
            <div class="preference-item">
                <span>🌐 Lingua</span>
                <select class="preference-select" id="language-select">
                    <option value="it">🇮🇹 Italiano</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="de">🇩🇪 Deutsch</option>
                </select>
            </div>
            <div class="preference-item">
                <span>🌙 Tema Scuro</span>
                <div class="toggle-switch ${preferences.theme === "dark" ? "active" : ""}" id="theme-toggle-pref">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>🔔 Notifiche</span>
                <div class="toggle-switch ${preferences.notifications ? "active" : ""}" id="notifications-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>📱 Modalità schermo</span>
                <select class="preference-select" id="screen-mode-select">
                    <option value="auto">🔄 Automatica</option>
                    <option value="portrait">📱 Verticale</option>
                    <option value="landscape">📺 Orizzontale</option>
                </select>
            </div>
            <div class="preference-item">
                <span>🔄 Aggiornamenti automatici</span>
                <div class="toggle-switch active" id="auto-updates-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
        </div>
    `

  // Add event listeners
  addPreferenceListeners()
}

function loadAudioPreferences(container) {
  container.innerHTML = `
        <div class="preferences-section">
            <h2>🎵 Impostazioni Audio</h2>
            <div class="preference-item">
                <span>▶️ Autoplay</span>
                <div class="toggle-switch ${preferences.autoplay ? "active" : ""}" id="autoplay-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>🎧 Qualità audio</span>
                <select class="preference-select" id="quality-select">
                    <option value="low">📻 Bassa (64 kbps)</option>
                    <option value="medium">🎵 Media (128 kbps)</option>
                    <option value="high">🎼 Alta (320 kbps)</option>
                    <option value="lossless">💎 Lossless (FLAC)</option>
                </select>
            </div>
            <div class="preference-item">
                <span>📝 Mostra testi</span>
                <div class="toggle-switch ${preferences.showLyrics ? "active" : ""}" id="lyrics-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>📶 Download solo su Wi-Fi</span>
                <div class="toggle-switch ${preferences.wifiOnly ? "active" : ""}" id="wifi-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>🔊 Normalizzazione volume</span>
                <div class="toggle-switch active" id="volume-normalization-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>🎚️ Equalizzatore</span>
                <div class="toggle-switch ${preferences.equalizer ? "active" : ""}" id="equalizer-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="equalizer-controls" id="equalizer-controls" style="display: ${preferences.equalizer ? "block" : "none"};">
                <div class="equalizer-slider">
                    <span>🔊 Bassi</span>
                    <input type="range" min="-10" max="10" value="0" id="bass-slider">
                    <span id="bass-value">0</span>
                </div>
                <div class="equalizer-slider">
                    <span>🎵 Medi</span>
                    <input type="range" min="-10" max="10" value="0" id="mid-slider">
                    <span id="mid-value">0</span>
                </div>
                <div class="equalizer-slider">
                    <span>🎼 Alti</span>
                    <input type="range" min="-10" max="10" value="0" id="treble-slider">
                    <span id="treble-value">0</span>
                </div>
            </div>
        </div>
    `

  addPreferenceListeners()
}

function loadAdvancedPreferences(container) {
  container.innerHTML = `
        <div class="preferences-section">
            <h2>🔧 Impostazioni Avanzate</h2>
            <div class="preference-item">
                <span>📚 Salva cronologia</span>
                <div class="toggle-switch ${preferences.history ? "active" : ""}" id="history-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>🗂️ Cache</span>
                <button class="secondary-btn" id="clear-cache-btn">
                    🗑️ Svuota cache
                </button>
            </div>
            <div class="preference-item">
                <span>📊 Dati utente</span>
                <button class="secondary-btn" id="export-data-btn">
                    📤 Esporta dati
                </button>
            </div>
            <div class="preference-item">
                <span>🐛 Debug mode</span>
                <div class="toggle-switch" id="debug-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>⚡ Performance mode</span>
                <div class="toggle-switch active" id="performance-toggle">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="preference-item">
                <span>📊 Statistiche utilizzo</span>
                <button class="secondary-btn" id="stats-btn">
                    📈 Visualizza
                </button>
            </div>
        </div>
        <button class="reset-preferences-btn" id="reset-preferences-btn">
            🔄 Ripristina Impostazioni Predefinite
        </button>
    `

  addPreferenceListeners()
}

function addPreferenceListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle-pref")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // All toggle switches
  document.querySelectorAll(".toggle-switch").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      this.classList.toggle("active")
      savePreferences()
      showToast("💾 Preferenze salvate")
    })
  })

  // Select elements
  document.querySelectorAll(".preference-select").forEach((select) => {
    select.addEventListener("change", () => {
      savePreferences()
      showToast("💾 Preferenze salvate")
    })
  })

  // Equalizer controls
  const equalizerToggle = document.getElementById("equalizer-toggle")
  const equalizerControls = document.getElementById("equalizer-controls")

  if (equalizerToggle && equalizerControls) {
    equalizerToggle.addEventListener("click", function () {
      const isActive = this.classList.contains("active")
      equalizerControls.style.display = isActive ? "block" : "none"
    })
  }

  // Equalizer sliders
  document.querySelectorAll('[id$="-slider"]').forEach((slider) => {
    slider.addEventListener("input", function () {
      const valueSpan = document.getElementById(this.id.replace("-slider", "-value"))
      if (valueSpan) {
        valueSpan.textContent = this.value
      }
    })
  })

  // Action buttons
  const clearCacheBtn = document.getElementById("clear-cache-btn")
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", clearCache)
  }

  const exportDataBtn = document.getElementById("export-data-btn")
  if (exportDataBtn) {
    exportDataBtn.addEventListener("click", exportUserData)
  }

  const resetBtn = document.getElementById("reset-preferences-btn")
  if (resetBtn) {
    resetBtn.addEventListener("click", resetPreferences)
  }

  const statsBtn = document.getElementById("stats-btn")
  if (statsBtn) {
    statsBtn.addEventListener("click", showStats)
  }
}

function clearCache() {
  if (confirm("Sei sicuro di voler svuotare la cache?")) {
    localStorage.removeItem("yaldi_cache")
    showToast("🗑️ Cache svuotata")
  }
}

function exportUserData() {
  const userData = {
    profile: JSON.parse(localStorage.getItem("yaldi_profile") || "{}"),
    preferences: preferences,
    playlists: playlists,
    timestamp: new Date().toISOString(),
  }

  const dataStr = JSON.stringify(userData, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)

  const link = document.createElement("a")
  link.href = url
  link.download = "yaldi_user_data.json"
  link.click()

  URL.revokeObjectURL(url)
  showToast("📤 Dati esportati")
}

function resetPreferences() {
  if (confirm("Sei sicuro di voler ripristinare tutte le impostazioni?")) {
    preferences = {
      theme: "light",
      language: "it",
      notifications: true,
      autoplay: false,
      quality: "medium",
      showLyrics: true,
      wifiOnly: false,
      equalizer: false,
      history: true,
    }

    savePreferences()
    applyTheme()
    loadPreferencesContent()
    showToast("🔄 Impostazioni ripristinate")
  }
}

function showStats() {
  const stats = {
    tracksPlayed: Math.floor(Math.random() * 100) + 50,
    hoursListened: Math.floor(Math.random() * 50) + 20,
    favoriteGenre: "Hip Hop",
    totalPlaylists: playlists.length,
  }

  showToast(`📊 Statistiche: ${stats.tracksPlayed} brani, ${stats.hoursListened}h di ascolto`)
}

// Playlists System
function initializePlaylists() {
  const newPlaylistBtn = document.getElementById("new-playlist-btn")

  if (newPlaylistBtn) {
    newPlaylistBtn.addEventListener("click", showCreatePlaylistModal)
  }

  // Load saved playlists
  playlists = JSON.parse(localStorage.getItem("yaldi_playlists")) || [
    {
      id: 1,
      name: "I miei preferiti",
      tracks: [],
      created: new Date().toISOString(),
    },
  ]
}

function loadPlaylists() {
  const sidebar = document.getElementById("playlists-sidebar")
  const container = document.getElementById("playlist-tracks-container")

  if (!sidebar || !container) return

  sidebar.innerHTML = ""

  playlists.forEach((playlist, index) => {
    const playlistElement = createPlaylistElement(playlist, index)
    sidebar.appendChild(playlistElement)
  })

  // Show first playlist by default
  if (playlists.length > 0) {
    showPlaylistTracks(playlists[0])
  }
}

function createPlaylistElement(playlist, index) {
  const div = document.createElement("div")
  div.className = `playlist-sidebar-item ${index === 0 ? "active" : ""}`

  div.innerHTML = `
        <div class="playlist-sidebar-icon">
            <i class="fas fa-music"></i>
        </div>
        <div class="playlist-sidebar-info">
            <div class="playlist-sidebar-name">${playlist.name}</div>
            <div class="playlist-sidebar-count">${playlist.tracks.length} brani</div>
        </div>
        <button class="playlist-delete-btn" onclick="deletePlaylist(${playlist.id})">
            <i class="fas fa-trash"></i>
        </button>
    `

  div.addEventListener("click", (e) => {
    if (!e.target.closest(".playlist-delete-btn")) {
      document.querySelectorAll(".playlist-sidebar-item").forEach((item) => {
        item.classList.remove("active")
      })
      div.classList.add("active")
      showPlaylistTracks(playlist)
    }
  })

  return div
}

function showPlaylistTracks(playlist) {
  const container = document.getElementById("playlist-tracks-container")

  container.innerHTML = `
        <div class="playlist-header">
            <h2>${playlist.name}</h2>
            <p>${playlist.tracks.length} brani</p>
        </div>
        <div class="playlist-tracks">
            ${
              playlist.tracks.length === 0
                ? '<div class="empty-playlist"><i class="fas fa-music"></i><p>Nessun brano in questa playlist</p><p class="empty-playlist-subtitle">Aggiungi brani dai tuoi album preferiti</p></div>'
                : playlist.tracks.map((track) => createPlaylistTrackHTML(track)).join("")
            }
        </div>
    `
}

function createPlaylistTrackHTML(track) {
  return `
        <div class="playlist-track-item">
            <div class="playlist-track-left">
                <div class="playlist-track-play">
                    <i class="fas fa-play"></i>
                </div>
                <div class="playlist-track-info">
                    <div class="playlist-track-title">${track.title}</div>
                    <div class="playlist-track-artist">${track.artist}</div>
                </div>
            </div>
            <div class="playlist-track-right">
                <div class="playlist-track-duration">${track.duration}</div>
                <button class="playlist-track-remove" onclick="removeFromPlaylist(${track.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `
}

function showCreatePlaylistModal() {
  const modal = document.createElement("div")
  modal.className = "create-playlist-modal-overlay"
  modal.innerHTML = `
        <div class="create-playlist-modal">
            <div class="create-playlist-header">
                <h2>🎵 Nuova Playlist</h2>
                <button class="close-btn" onclick="this.closest('.create-playlist-modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="create-playlist-content">
                <input type="text" id="new-playlist-name" placeholder="Nome della playlist" autofocus>
                <div class="create-playlist-actions">
                    <button class="cancel-btn" onclick="this.closest('.create-playlist-modal-overlay').remove()">Annulla</button>
                    <button class="create-btn" id="create-playlist-confirm" disabled>Crea</button>
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  const input = modal.querySelector("#new-playlist-name")
  const createBtn = modal.querySelector("#create-playlist-confirm")

  input.addEventListener("input", () => {
    createBtn.disabled = input.value.trim() === ""
  })

  createBtn.addEventListener("click", () => {
    createPlaylist(input.value.trim())
    modal.remove()
  })

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      createPlaylist(input.value.trim())
      modal.remove()
    }
  })
}

function createPlaylist(name) {
  const newPlaylist = {
    id: Date.now(),
    name: name,
    tracks: [],
    created: new Date().toISOString(),
  }

  playlists.push(newPlaylist)
  savePlaylists()
  loadPlaylists()
  showToast(`🎵 Playlist "${name}" creata!`)
}

function deletePlaylist(playlistId) {
  if (confirm("Sei sicuro di voler eliminare questa playlist?")) {
    playlists = playlists.filter((p) => p.id !== playlistId)
    savePlaylists()
    loadPlaylists()
    showToast("🗑️ Playlist eliminata")
  }
}

function savePlaylists() {
  localStorage.setItem("yaldi_playlists", JSON.stringify(playlists))
}

// Chat System
function initializeChat() {
  const chatForm = document.getElementById("chat-form")
  const chatInput = document.getElementById("chat-input")

  if (chatForm) {
    chatForm.addEventListener("submit", handleChatMessage)
  }
}

function loadChatMessages() {
  const container = document.getElementById("messages-container")

  // Add welcome message if empty
  if (container.innerHTML.trim() === "") {
    addChatMessage("YALDI HQ", "👋 Ciao! Sono l'assistente virtuale di YALDI. Come posso aiutarti?", false)
  }
}

function handleChatMessage(e) {
  e.preventDefault()

  const input = document.getElementById("chat-input")
  const message = input.value.trim()

  if (message) {
    addChatMessage("Tu", message, true)
    input.value = ""

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(message)
      addChatMessage("YALDI HQ", response, false)
    }, 1000)
  }
}

function addChatMessage(sender, message, isUser) {
  const container = document.getElementById("messages-container")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message-wrapper ${isUser ? "user-message" : ""}`

  messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-sender">${sender}</div>
            <div class="message-bubble">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
    `

  container.appendChild(messageDiv)
  container.scrollTop = container.scrollHeight
}

function generateAIResponse(message) {
  const responses = [
    "🎵 Grazie per il tuo messaggio! Sto elaborando la risposta...",
    "🤖 Interessante! Dimmi di più sui tuoi gusti musicali.",
    "🎧 Hai già ascoltato l'ultimo album di YALDI?",
    "📱 Posso aiutarti con qualsiasi funzione dell'app!",
    "🎶 La musica è la mia passione, parliamone!",
    "✨ Ottima domanda! Ecco cosa penso...",
    "🚀 YALDI è sempre in evoluzione, grazie per il feedback!",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

// Theme System
function toggleTheme() {
  preferences.theme = preferences.theme === "light" ? "dark" : "light"
  applyTheme()
  savePreferences()
  showToast(`🎨 Tema ${preferences.theme === "dark" ? "scuro" : "chiaro"} attivato`)
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", preferences.theme)

  // Update toggle switches
  const toggles = document.querySelectorAll("#theme-toggle-pref, #dark-mode-toggle")
  toggles.forEach((toggle) => {
    if (preferences.theme === "dark") {
      toggle.classList.add("active")
    } else {
      toggle.classList.remove("active")
    }
  })
}

// Preferences Management
function loadPreferences() {
  const saved = localStorage.getItem("yaldi_preferences")
  if (saved) {
    preferences = { ...preferences, ...JSON.parse(saved) }
  }
}

function savePreferences() {
  localStorage.setItem("yaldi_preferences", JSON.stringify(preferences))
}

// Utility Functions
function showToast(message) {
  const toast = document.getElementById("saved-message")
  const messageSpan = document.getElementById("toast-message")

  messageSpan.textContent = message
  toast.style.display = "flex"

  setTimeout(() => {
    toast.style.display = "none"
  }, 2000)
}

// Initialize everything when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("🎵 YALDI Music App caricata completamente!")
  })
} else {
  console.log("🎵 YALDI Music App già caricata!")
}

// Service Worker Registration (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("🔧 Service Worker registrato:", registration.scope)
      })
      .catch((error) => {
        console.log("❌ Registrazione Service Worker fallita:", error)
      })
  })
}

// Export for global access
window.YaldiApp = {
  switchView,
  playTrack,
  addToCart,
  toggleTheme,
  showToast,
  createPlaylist,
  deletePlaylist,
}
