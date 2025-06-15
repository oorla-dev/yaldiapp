// Global State
let currentUser = null
let isLoggedIn = false
let cart = []
let currentTrack = null
let isPlaying = false
let currentAlbum = null
let logoClickCount = 0
let showGames = false
let currentTheme = "light"

// Products Data (removed BASIC TEE, OVERSIZED HOODIE, ALDI RUNNER, SPORT RUNNER)
const products = [
  {
    id: 1,
    name: "FREE MARINAIO TEE",
    code: "FM-01",
    image: "https://i.ibb.co/N2MRs64X/FREE-MARINAIO.jpg",
    type: "clothing",
    category: "tee",
    price: 30,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "YALDI HOODIE",
    code: "YH-01",
    image: "https://i.ibb.co/MDZf9tSY/Progetto-senza-titolo.jpg",
    type: "clothing",
    category: "hoodie",
    price: 55,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "YALDI CLASSIC",
    code: "YC-01",
    image: "https://i.ibb.co/MDD2ZSgp/Progetto-senza-titolo-2.jpg",
    type: "shoes",
    price: 20,
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
]

// Albums Data
const albums = [
  {
    id: 1,
    title: "YALDHI",
    image: "https://i.ibb.co/NgS7rqnn/2-20250302_130159-0001.jpg",
    available: true,
    tracks: [
      { id: 1, title: "THE GARDEN OF ALDI", duration: "3:45", file: "YALDHI/01 THE GARDEN OF ALDI.mp3" },
      { id: 2, title: "THE ALDI STORM", duration: "4:12", file: "YALDHI/02 THE ALDI STORM.m4a" },
      { id: 3, title: "NEW ALDI", duration: "3:24", file: "YALDHI/03 NEW ALDI.mp3" },
      { id: 4, title: "80 ALDYIES", duration: "3:58", file: "YALDHI/04 80 ALDYIES.m4a" },
      { id: 5, title: "ALDI IN THE SKY", duration: "4:33", file: "YALDHI/05 ALDI IN THE SKY.mp3" },
      { id: 6, title: "ALDIEN", duration: "3:17", file: "YALDHI/06 ALDIEN.mp3" },
      { id: 7, title: "BROTHERS OF ALDI", duration: "4:05", file: "YALDHI/07 BROTHERS OF ALDI.mp3" },
      { id: 8, title: "FVCK GIANVOIT", duration: "2:58", file: "YALDHI/08 FVCK GIANVOIT.mp3" },
    ],
  },
  {
    id: 2,
    title: "DONDA 2",
    image: "/placeholder.svg?height=300&width=300",
    available: false,
    tracks: [],
  },
  {
    id: 3,
    title: "BULDY",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
    tracks: [
      { id: 9, title: "ALDIES (CIRCLES)", duration: "3:33", file: "BULDY/ALDIES(CIRCLES)-2.wav" },
      { id: 10, title: "ALDIMAN", duration: "4:18", file: "BULDY/ALDIMAN.mp3" },
      { id: 11, title: "ALDITIME", duration: "3:55", file: "BULDY/ALDITIME-2.wav" },
      { id: 12, title: "ALDY AND LOWS", duration: "3:51", file: "BULDY/ALDYANDLOWS.wav" },
      { id: 13, title: "ALDY AND THE BEAST", duration: "4:25", file: "BULDY/ALDYANDTHEBEAST.wav" },
      { id: 14, title: "BESAME ALDI", duration: "3:28", file: "BULDY/BESAMEALDI.wav" },
      { id: 15, title: "BULDY", duration: "4:07", file: "BULDY/BULDY-2.wav" },
      { id: 16, title: "I CANT ALDI", duration: "3:42", file: "BULDY/ICANTALDI.wav" },
    ],
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  initializeIcons()
  loadUserData()
  updateCartDisplay()
  startCountdown()
  preventContextMenu()
})

function initializeApp() {
  // Set initial theme
  const savedTheme = localStorage.getItem("yaldi-theme") || "light"
  setTheme(savedTheme)

  // Initialize current album
  currentAlbum = albums[0]

  // Show home section by default
  showSection("home")
}

function initializeIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }
}

// Theme Management
function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("yaldi-theme", theme)

  const themeSelect = document.getElementById("theme-select")
  if (themeSelect) {
    themeSelect.value = theme
  }
}

function changeTheme(theme) {
  setTheme(theme)
}

// Navigation
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    if (btn.textContent.toLowerCase().includes(sectionId.toLowerCase())) {
      btn.classList.add("active")
    }
  })

  // Close mobile menu
  closeMobileMenu()

  // Close cart if open
  closeCart()
}

function toggleMobileMenu() {
  const mobileNav = document.querySelector(".mobile-nav")
  const menuBtn = document.querySelector(".mobile-menu-btn i")

  mobileNav.classList.toggle("hidden")

  if (mobileNav.classList.contains("hidden")) {
    menuBtn.setAttribute("data-lucide", "menu")
  } else {
    menuBtn.setAttribute("data-lucide", "x")
  }

  initializeIcons()
}

function closeMobileMenu() {
  const mobileNav = document.querySelector(".mobile-nav")
  const menuBtn = document.querySelector(".mobile-menu-btn i")

  mobileNav.classList.add("hidden")
  menuBtn.setAttribute("data-lucide", "menu")
  initializeIcons()
}

// Logo Click Handler (Games Easter Egg)
function handleLogoClick() {
  logoClickCount++

  if (logoClickCount === 3) {
    showGames = true
    document.querySelectorAll(".games-btn").forEach((btn) => {
      btn.classList.remove("hidden")
    })
    logoClickCount = 0

    // Show notification
    showNotification(" Easter Egg Sbloccato! Sezione giochi disponibile!")
  }

  // Reset counter after 2 seconds
  setTimeout(() => {
    if (logoClickCount < 3) {
      logoClickCount = 0
    }
  }, 2000)
}

// Countdown Timer
function startCountdown() {
  const targetDate = new Date("June 15, 2025 18:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const timeDifference = targetDate - now

    if (timeDifference <= 0) {
      document.getElementById("days").textContent = "00"
      document.getElementById("hours").textContent = "00"
      document.getElementById("minutes").textContent = "00"
      document.getElementById("seconds").textContent = "00"
      return
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// Cart Management
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const sizeSelect = document.querySelector(`.size-select[data-product="${productId}"]`)
  const selectedSize = sizeSelect ? sizeSelect.value : ""

  if (product.sizes && !selectedSize) {
    showNotification("Seleziona una taglia prima di aggiungere al carrello", "error")
    return
  }

  const existingItem = cart.find((item) => item.id === productId && item.size === selectedSize)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    })
  }

  // Reset size selection
  if (sizeSelect) {
    sizeSelect.value = ""
  }

  updateCartDisplay()
  saveCartData()
  showNotification(`${product.name} aggiunto al carrello`)
}

function removeFromCart(productId, size) {
  cart = cart.filter((item) => !(item.id === productId && item.size === size))
  updateCartDisplay()
  saveCartData()
}

function updateQuantity(productId, size, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId, size)
    return
  }

  const item = cart.find((item) => item.id === productId && item.size === size)
  if (item) {
    item.quantity = newQuantity
    updateCartDisplay()
    saveCartData()
  }
}

function updateCartDisplay() {
  const cartBadge = document.querySelector(".cart-badge")
  const cartEmpty = document.getElementById("cart-empty")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")
  const totalAmount = document.getElementById("total-amount")

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Update badge
  if (totalItems > 0) {
    cartBadge.textContent = totalItems
    cartBadge.classList.remove("hidden")
  } else {
    cartBadge.classList.add("hidden")
  }

  // Update cart modal content
  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden")
    cartItems.classList.add("hidden")
    cartTotal.classList.add("hidden")
  } else {
    cartEmpty.classList.add("hidden")
    cartItems.classList.remove("hidden")
    cartTotal.classList.remove("hidden")

    // Render cart items
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${item.size ? `<div class="cart-item-size">Taglia: ${item.size}</div>` : ""}
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1})">
                        <i data-lucide="minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1})">
                        <i data-lucide="plus"></i>
                    </button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `,
      )
      .join("")

    totalAmount.textContent = `€${totalPrice.toFixed(2)}`
    initializeIcons()
  }
}

function toggleCart() {
  const cartModal = document.getElementById("cart-modal")
  cartModal.classList.toggle("active")
}

function closeCart() {
  const cartModal = document.getElementById("cart-modal")
  cartModal.classList.remove("active")
}

function checkout() {
  if (cart.length === 0) return

  generateReceipt()
  cart = []
  updateCartDisplay()
  saveCartData()
  closeCart()
  showNotification("Ordine completato! Ricevuta scaricata.")
}

// Music Player
function selectAlbum(albumId) {
  currentAlbum = albums.find((album) => album.id === albumId)

  // Update album selection UI
  document.querySelectorAll(".album-card").forEach((card) => {
    card.classList.remove("active")
  })

  document.querySelectorAll(".album-card")[albumId - 1].classList.add("active")

  // Update tracks display
  const tracksSection = document.querySelector(".tracks-section")
  const tracksTitle = document.querySelector(".tracks-title")
  const tracksList = document.querySelector(".tracks-list")

  if (currentAlbum.available) {
    tracksSection.style.display = "block"
    tracksTitle.textContent = `${currentAlbum.title} - TRACKLIST`

    tracksList.innerHTML = currentAlbum.tracks
      .map(
        (track, index) => `
            <div class="track-item" onclick="playTrack(${index})">
                <div class="track-controls">
                    <button class="track-play-btn">
                        <i data-lucide="play"></i>
                    </button>
                    <div class="track-info">
                        <h4>${track.title}</h4>
                        <p>${track.name}</p>
                    </div>
                </div>
                <div class="track-duration">${track.duration}</div>
            </div>
        `,
      )
      .join("")

    initializeIcons()
  } else {
    tracksSection.style.display = "none"
  }
}

function playTrack(trackIndex) {
  if (!currentAlbum || !currentAlbum.available) return

  currentTrack = currentAlbum.tracks[trackIndex]
  isPlaying = true

  // Update track UI
  document.querySelectorAll(".track-item").forEach((item, index) => {
    if (index === trackIndex) {
      item.classList.add("active")
      const playBtn = item.querySelector(".track-play-btn i")
      playBtn.setAttribute("data-lucide", "pause")
    } else {
      item.classList.remove("active")
      const playBtn = item.querySelector(".track-play-btn i")
      playBtn.setAttribute("data-lucide", "play")
    }
  })

  // Show mini player
  const miniPlayer = document.querySelector(".mini-player")
  miniPlayer.classList.remove("hidden")

  // Update mini player
  updateMiniPlayer()
  initializeIcons()
}

function togglePlay() {
  if (!currentTrack) return

  isPlaying = !isPlaying
  updateMiniPlayer()

  // Update track item play button
  const activeTrack = document.querySelector(".track-item.active .track-play-btn i")
  if (activeTrack) {
    activeTrack.setAttribute("data-lucide", isPlaying ? "pause" : "play")
  }

  initializeIcons()
}

function playNextTrack() {
  if (!currentAlbum || !currentTrack) return

  const currentIndex = currentAlbum.tracks.findIndex((track) => track.title === currentTrack.title)
  const nextIndex = (currentIndex + 1) % currentAlbum.tracks.length
  playTrack(nextIndex)
}

function playPrevTrack() {
  if (!currentAlbum || !currentTrack) return

  const currentIndex = currentAlbum.tracks.findIndex((track) => track.title === currentTrack.title)
  const prevIndex = currentIndex === 0 ? currentAlbum.tracks.length - 1 : currentIndex - 1
  playTrack(prevIndex)
}

function clearTrack() {
  currentTrack = null
  isPlaying = false

  // Hide mini player
  const miniPlayer = document.querySelector(".mini-player")
  miniPlayer.classList.add("hidden")

  // Reset track UI
  document.querySelectorAll(".track-item").forEach((item) => {
    item.classList.remove("active")
    const playBtn = item.querySelector(".track-play-btn i")
    playBtn.setAttribute("data-lucide", "play")
  })

  initializeIcons()
}

function updateMiniPlayer() {
  const playIcon = document.querySelector(".mini-player .play-icon")
  const pauseIcon = document.querySelector(".mini-player .pause-icon")

  if (isPlaying) {
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
  } else {
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
  }
}

// Games
function openGame(gameId) {
  const gameModal = document.getElementById("game-modal")
  const gameTitle = document.getElementById("game-title")
  const gameContent = document.getElementById("game-content")

  let title = ""
  let content = ""

  switch (gameId) {
    case "yaldi-runner":
      title = " YALDI RUNNER"
      content = createYaldiRunnerGame()
      break
    case "puzzle-yeezy":
      title = "🧩 PUZZLE YEEZY"
      content = createPuzzleYeezyGame()
      break
    case "aldi-quest":
      title = " ALDI QUEST"
      content = createAldiQuestGame()
      break
    case "music-hero":
      title = " MUSIC HERO"
      content = createMusicHeroGame()
      break
  }

  gameTitle.textContent = title
  gameContent.innerHTML = content
  gameModal.classList.add("active")
}

function closeGame() {
  const gameModal = document.getElementById("game-modal")
  gameModal.classList.remove("active")
}

function createYaldiRunnerGame() {
  return `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1rem;">
                <strong>Score: <span id="runner-score">0</span></strong>
            </div>
            <div style="width: 100%; height: 150px; background: linear-gradient(to right, #3b82f6, #8b5cf6); border-radius: 8px; position: relative; overflow: hidden; margin-bottom: 1rem;" id="runner-game">
                <div style="position: absolute; width: 20px; height: 20px; background: #fbbf24; border-radius: 50%; left: 20px; bottom: 50%; transition: all 0.3s ease;" id="runner-player"></div>
            </div>
            <p style="margin-bottom: 1rem; color: #666;">Premi SPAZIO o clicca SALTA per evitare gli ostacoli!</p>
            <button class="btn btn-primary" onclick="startRunnerGame()">INIZIA GIOCO</button>
        </div>
    `
}

function createPuzzleYeezyGame() {
  return `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1rem;">
                <strong>Mosse: <span id="puzzle-moves">0</span></strong>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; max-width: 200px; margin: 0 auto 1rem; aspect-ratio: 1;" id="puzzle-grid">
                <!-- Puzzle pieces will be generated here -->
            </div>
            <p style="margin-bottom: 1rem; color: #666;">Riordina i numeri da 1 a 8!</p>
            <button class="btn btn-primary" onclick="initPuzzle()">NUOVO PUZZLE</button>
        </div>
    `
}

function createAldiQuestGame() {
  return `
        <div style="padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <strong>Score: <span id="quest-score">0</span></strong>
            </div>
            <div style="background: linear-gradient(135deg, #dbeafe, #e0e7ff); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                <h4 style="margin-bottom: 0.5rem;" id="quest-title">Benvenuto da ALDI</h4>
                <p style="margin-bottom: 1rem;" id="quest-description">Ti trovi all'ingresso di un ALDI speciale. Cosa fai?</p>
                <div id="quest-options">
                    <button class="btn btn-outline" style="width: 100%; margin-bottom: 0.5rem;" onclick="questChoice(0)">Prendi un carrello</button>
                    <button class="btn btn-outline" style="width: 100%;" onclick="questChoice(1)">Vai direttamente ai prodotti</button>
                </div>
            </div>
        </div>
    `
}

function createMusicHeroGame() {
  return `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1rem;">
                <strong>Score: <span id="hero-score">0</span></strong>
            </div>
            <div style="width: 100%; height: 200px; background: #000; border-radius: 8px; position: relative; overflow: hidden; margin-bottom: 1rem;" id="hero-game">
                <div style="position: absolute; bottom: 10%; width: 100%; height: 2px; background: #ef4444;"></div>
                <div style="position: absolute; bottom: 8px; width: 100%; display: flex; justify-content: center; gap: 4px;">
                    <div style="width: 32px; height: 32px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: black;">A</div>
                    <div style="width: 32px; height: 32px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: black;">S</div>
                    <div style="width: 32px; height: 32px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: black;">D</div>
                    <div style="width: 32px; height: 32px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: black;">F</div>
                </div>
            </div>
            <p style="margin-bottom: 1rem; color: #666;">Premi A, S, D, F quando le note raggiungono la linea rossa!</p>
            <button class="btn btn-primary" onclick="startHeroGame()">INIZIA GIOCO</button>
        </div>
    `
}

// Game Functions (simplified versions)
function startRunnerGame() {
  let score = 0
  const scoreElement = document.getElementById("runner-score")

  const gameInterval = setInterval(() => {
    score += 1
    scoreElement.textContent = score

    if (score >= 100) {
      clearInterval(gameInterval)
      showNotification("Complimenti! Hai completato YALDI Runner!")
    }
  }, 100)

  setTimeout(() => {
    clearInterval(gameInterval)
    showNotification(`Gioco terminato! Score finale: ${score}`)
  }, 10000)
}

function initPuzzle() {
  const grid = document.getElementById("puzzle-grid")
  const pieces = [1, 2, 3, 4, 5, 6, 7, 8, 0].sort(() => Math.random() - 0.5)

  grid.innerHTML = pieces
    .map(
      (piece, index) => `
        <div style="aspect-ratio: 1; background: ${piece === 0 ? "#f3f4f6" : "linear-gradient(135deg, #8b5cf6, #ec4899)"}; 
                    border-radius: 4px; display: flex; align-items: center; justify-content: center; 
                    color: white; font-weight: bold; cursor: pointer;" 
             onclick="movePuzzlePiece(${index})">
            ${piece !== 0 ? piece : ""}
        </div>
    `,
    )
    .join("")
}

function movePuzzlePiece(index) {
  const movesElement = document.getElementById("puzzle-moves")
  const moves = Number.parseInt(movesElement.textContent) + 1
  movesElement.textContent = moves

  if (moves >= 20) {
    showNotification("Puzzle completato! (Simulato)")
  }
}

let questScene = 0
let questScore = 0

function questChoice(choice) {
  questScore += choice === 0 ? 20 : 10
  questScene++

  const scoreElement = document.getElementById("quest-score")
  const titleElement = document.getElementById("quest-title")
  const descElement = document.getElementById("quest-description")
  const optionsElement = document.getElementById("quest-options")

  scoreElement.textContent = questScore

  if (questScene === 1) {
    titleElement.textContent = "Corridoio Principale"
    descElement.textContent = "Sei nel corridoio principale. Vedi delle YEEZY speciali!"
    optionsElement.innerHTML = `
            <button class="btn btn-outline" style="width: 100%; margin-bottom: 0.5rem;" onclick="questChoice(0)">Prendi le YEEZY</button>
            <button class="btn btn-outline" style="width: 100%;" onclick="questChoice(1)">Continua a esplorare</button>
        `
  } else {
    titleElement.textContent = "Missione Completata!"
    descElement.textContent = `Ottimo lavoro! Score finale: ${questScore}`
    optionsElement.innerHTML = `
            <button class="btn btn-primary" style="width: 100%;" onclick="resetQuest()">RIGIOCA</button>
        `
  }
}

function resetQuest() {
  questScene = 0
  questScore = 0

  const scoreElement = document.getElementById("quest-score")
  const titleElement = document.getElementById("quest-title")
  const descElement = document.getElementById("quest-description")
  const optionsElement = document.getElementById("quest-options")

  scoreElement.textContent = "0"
  titleElement.textContent = "Benvenuto da ALDI"
  descElement.textContent = "Ti trovi all'ingresso di un ALDI speciale. Cosa fai?"
  optionsElement.innerHTML = `
        <button class="btn btn-outline" style="width: 100%; margin-bottom: 0.5rem;" onclick="questChoice(0)">Prendi un carrello</button>
        <button class="btn btn-outline" style="width: 100%;" onclick="questChoice(1)">Vai direttamente ai prodotti</button>
    `
}

function startHeroGame() {
  let score = 0
  const scoreElement = document.getElementById("hero-score")

  const gameInterval = setInterval(() => {
    score += Math.floor(Math.random() * 50) + 10
    scoreElement.textContent = score

    if (score >= 1000) {
      clearInterval(gameInterval)
      showNotification("Perfetto! Sei un Music Hero!")
    }
  }, 500)

  setTimeout(() => {
    clearInterval(gameInterval)
    showNotification(`Gioco terminato! Score finale: ${score}`)
  }, 15000)
}

// Account Management
function showAccountSection(section) {
  // Update navigation
  document.querySelectorAll(".account-nav-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  const navBtn = document.getElementById(`${section}-nav`)
  if (navBtn) {
    navBtn.classList.add("active")
  }

  // Update content
  document.querySelectorAll(".account-form").forEach((form) => {
    form.classList.remove("active")
  })

  const targetForm = document.getElementById(`${section}-form`)
  if (targetForm) {
    targetForm.classList.add("active")
  }
}

function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  const accounts = JSON.parse(localStorage.getItem("yaldi-accounts") || "[]")
  const user = accounts.find((acc) => acc.email === email && acc.password === password)

  if (user) {
    currentUser = user
    isLoggedIn = true
    localStorage.setItem("yaldi-current-user", JSON.stringify(user))
    updateAuthUI()
    loadUserProfile()
    showNotification("Accesso effettuato con successo!")
    document.getElementById("login-email").value = ""
    document.getElementById("login-password").value = ""
  } else {
    showNotification("Email o password non corretti!", "error")
  }
}

function handleRegister(event) {
  event.preventDefault()

  const name = document.getElementById("register-name").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm").value

  if (password !== confirmPassword) {
    showNotification("Le password non coincidono!", "error")
    return
  }

  const accounts = JSON.parse(localStorage.getItem("yaldi-accounts") || "[]")
  const existingUser = accounts.find((acc) => acc.email === email)

  if (existingUser) {
    showNotification("Email già registrata!", "error")
    return
  }

  const newUser = {
    name,
    email,
    password,
    registeredAt: new Date().toISOString(),
  }

  accounts.push(newUser)
  localStorage.setItem("yaldi-accounts", JSON.stringify(accounts))

  currentUser = newUser
  isLoggedIn = true
  localStorage.setItem("yaldi-current-user", JSON.stringify(newUser))

  updateAuthUI()
  loadUserProfile()
  showNotification("Registrazione completata con successo!")

  // Clear form
  document.getElementById("register-name").value = ""
  document.getElementById("register-email").value = ""
  document.getElementById("register-password").value = ""
  document.getElementById("register-confirm").value = ""
}

function handleLogout() {
  currentUser = null
  isLoggedIn = false
  localStorage.removeItem("yaldi-current-user")
  updateAuthUI()
  showNotification("Disconnesso con successo!")
  showAccountSection("login")
}

function updateAuthUI() {
  const userGreeting = document.querySelector(".user-greeting")
  const logoutBtn = document.querySelector(".logout-btn")
  const loginNav = document.getElementById("login-nav")
  const registerNav = document.getElementById("register-nav")
  const profileNav = document.getElementById("profile-nav")
  const settingsNav = document.getElementById("settings-nav")

  if (isLoggedIn && currentUser) {
    userGreeting.textContent = `Ciao, ${currentUser.name}`
    userGreeting.classList.remove("hidden")
    logoutBtn.classList.remove("hidden")

    loginNav.classList.add("hidden")
    registerNav.classList.add("hidden")
    profileNav.classList.remove("hidden")
    settingsNav.classList.remove("hidden")

    showAccountSection("profile")
  } else {
    userGreeting.classList.add("hidden")
    logoutBtn.classList.add("hidden")

    loginNav.classList.remove("hidden")
    registerNav.classList.remove("hidden")
    profileNav.classList.add("hidden")
    settingsNav.classList.add("hidden")

    showAccountSection("login")
  }
}

function loadUserProfile() {
  if (!currentUser) return

  const userKey = `yaldi-user-${currentUser.email}`
  const userData = localStorage.getItem(userKey)

  if (userData) {
    const data = JSON.parse(userData)
    const profile = data.profile || {}

    document.getElementById("profile-name").value = profile.name || currentUser.name || ""
    document.getElementById("profile-username-input").value = profile.username || ""
    document.getElementById("profile-bio").value = profile.bio || ""
    document.getElementById("profile-location").value = profile.location || ""
    document.getElementById("profile-website").value = profile.website || ""

    const avatarLetter = document.getElementById("avatar-letter")
    const profileUsername = document.getElementById("profile-username")

    avatarLetter.textContent = (profile.name || currentUser.name || "Y").charAt(0).toUpperCase()
    profileUsername.textContent = `@${profile.username || "username"}`
  } else {
    // Set defaults
    document.getElementById("profile-name").value = currentUser.name || ""
    const avatarLetter = document.getElementById("avatar-letter")
    avatarLetter.textContent = (currentUser.name || "Y").charAt(0).toUpperCase()
  }
}

function saveProfile(event) {
  event.preventDefault()

  if (!currentUser) return

  const profile = {
    name: document.getElementById("profile-name").value,
    username: document.getElementById("profile-username-input").value,
    bio: document.getElementById("profile-bio").value,
    location: document.getElementById("profile-location").value,
    website: document.getElementById("profile-website").value,
  }

  const userKey = `yaldi-user-${currentUser.email}`
  const existingData = JSON.parse(localStorage.getItem(userKey) || "{}")

  existingData.profile = profile
  existingData.lastUpdated = new Date().toISOString()

  localStorage.setItem(userKey, JSON.stringify(existingData))

  // Update avatar and username display
  const avatarLetter = document.getElementById("avatar-letter")
  const profileUsername = document.getElementById("profile-username")

  avatarLetter.textContent = (profile.name || currentUser.name || "Y").charAt(0).toUpperCase()
  profileUsername.textContent = `@${profile.username || "username"}`

  showNotification("Profilo salvato con successo!")
}

function saveSettings() {
  if (!currentUser) return

  const settings = {
    theme: currentTheme,
    autoplay: document.getElementById("autoplay-toggle").checked,
    notifications: document.getElementById("notifications-toggle").checked,
  }

  const userKey = `yaldi-user-${currentUser.email}`
  const existingData = JSON.parse(localStorage.getItem(userKey) || "{}")

  existingData.settings = settings
  existingData.lastUpdated = new Date().toISOString()

  localStorage.setItem(userKey, JSON.stringify(existingData))

  showNotification("Impostazioni salvate con successo!")
}

// Data Management
function loadUserData() {
  const savedUser = localStorage.getItem("yaldi-current-user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    isLoggedIn = true
    updateAuthUI()
    loadUserProfile()
  }

  const savedCart = localStorage.getItem("yaldi-cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartDisplay()
  }
}

function saveCartData() {
  localStorage.setItem("yaldi-cart", JSON.stringify(cart))
}

// PDF Receipt Generation
async function generateReceipt() {
  try {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    // Colors
    const primaryColor = [23, 23, 23]
    const secondaryColor = [115, 115, 115]
    const accentColor = [245, 245, 245]

    // Background
    doc.setFillColor(...accentColor)
    doc.rect(0, 0, 210, 297, "F")

    // Header section
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 60, "F")

    // YALDI Logo
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(32)
    doc.setFont("helvetica", "bold")
    doc.text("YALDI", 20, 35)

    // Subtitle
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("YEEZY × ALDI COLLABORATION", 20, 45)

    // Receipt title
    doc.setTextColor(...primaryColor)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("RICEVUTA DI ACQUISTO", 20, 80)

    // Order info
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(200, 200, 200)
    doc.rect(15, 90, 180, 45, "FD")

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...primaryColor)

    const orderDate = new Date().toLocaleDateString("it-IT")
    const orderTime = new Date().toLocaleTimeString("it-IT")
    const orderNumber = "YLD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    doc.text(`Data: ${orderDate}`, 20, 105)
    doc.text(`Ora: ${orderTime}`, 20, 115)
    doc.text(`Ordine #: ${orderNumber}`, 20, 125)

    // Customer info
    if (currentUser) {
      doc.text("Cliente:", 110, 105)
      doc.text(currentUser.name, 110, 115)
      doc.text(currentUser.email, 110, 125)
    }

    // Items header
    doc.setFillColor(...accentColor)
    doc.rect(15, 145, 180, 15, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.text("PRODOTTO", 20, 155)
    doc.text("QTÀ", 120, 155)
    doc.text("PREZZO", 140, 155)
    doc.text("TOTALE", 170, 155)

    // Items
    let yPosition = 170
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)

    cart.forEach((item, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }

      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250)
        doc.rect(15, yPosition - 8, 180, 12, "F")
      }

      doc.setTextColor(...primaryColor)
      doc.text(item.name, 20, yPosition)

      if (item.size) {
        doc.setFontSize(8)
        doc.setTextColor(...secondaryColor)
        doc.text(`Taglia: ${item.size}`, 20, yPosition + 6)
        doc.setFontSize(9)
        doc.setTextColor(...primaryColor)
      }

      doc.text(item.quantity.toString(), 125, yPosition)
      doc.text(`€${item.price.toFixed(2)}`, 140, yPosition)
      doc.text(`€${(item.price * item.quantity).toFixed(2)}`, 170, yPosition)

      yPosition += item.size ? 18 : 12
    })

    // Totals
    yPosition += 10
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    doc.line(15, yPosition, 195, yPosition)

    yPosition += 15
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const iva = subtotal * 0.22
    const total = subtotal + iva

    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(...primaryColor)

    doc.text(`SUBTOTALE: €${subtotal.toFixed(2)}`, 120, yPosition)
    yPosition += 10
    doc.text(`IVA (22%): €${iva.toFixed(2)}`, 120, yPosition)
    yPosition += 15
    doc.setFontSize(14)
    doc.text(`TOTALE: €${total.toFixed(2)}`, 120, yPosition)

    // Footer
    yPosition += 30
    doc.setFontSize(8)
    doc.setTextColor(...secondaryColor)
    doc.text("Grazie per aver scelto YALDI!", 20, yPosition)
    doc.text("Per assistenza: support@yaldi.com", 20, yPosition + 10)

    // Save PDF
    doc.save(`YALDI_Receipt_${orderNumber}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    showNotification("Errore nella generazione della ricevuta", "error")
  }
}

// Utility Functions
function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 5rem;
        right: 1rem;
        background: ${type === "error" ? "#ef4444" : "#10b981"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `

  notification.textContent = message
  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

function preventContextMenu() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
  })

  document.addEventListener("keydown", (e) => {
    // Prevent common shortcuts
    if (
      (e.ctrlKey && (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "s")) ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault()
    }
  })
}

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize puzzle game when games section is shown
document.addEventListener("DOMContentLoaded", () => {
  // Initialize first album selection
  selectAlbum(1)
})
