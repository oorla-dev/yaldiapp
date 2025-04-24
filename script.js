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
    // ... altri album
  ];

  // --- STATO DELL'APPLICAZIONE ---
  let currentTrack = null; 
  let isPlaying = false; 
  const audioPlayer = document.getElementById("audio-player"); 

  // --- FUNZIONI AGGIUNTIVE ---
  
  // Funzione per verificare l'esistenza del file audio
  async function checkAudioFileExists(audioSrc) {
    try {
      const response = await fetch(audioSrc, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error(`Errore nel controllare l'esistenza del file audio: ${audioSrc}`, error);
      return false;
    }
  }

  // --- Funzione per avviare la riproduzione ---
  async function playTrack(track, album) {
    if (!track || !album) {
      console.error("playTrack chiamata senza traccia o album valido.");
      return;
    }

    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        if (audioPlayer.readyState >= 2) {
          try {
            await audioPlayer.play();
          } catch (e) {
            console.error("Errore durante la ripresa della riproduzione:", e);
          }
        } else {
          audioPlayer.load();
          try {
            await audioPlayer.play();
          } catch (e) {
            console.error("Errore durante il caricamento e la riproduzione:", e);
          }
        }
      }
      return;
    }

    currentTrack = track;

    // Controlla il percorso audio
    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(`Percorso audio non valido per "${track.title}".`);
      alert(`Errore: Percorso audio non valido per "${track.title}".`);
      return;
    }

    if (!track.audioSrc.startsWith("YALDHI/")) {
      track.audioSrc = "YALDHI/" + track.audioSrc.split("/").pop();
    }

    const fileExists = await checkAudioFileExists(track.audioSrc);
    if (!fileExists) {
      alert(`Errore: Il file audio "${track.audioSrc}" non esiste.`);
      return;
    }

    audioPlayer.src = track.audioSrc;

    try {
      await audioPlayer.play();
      isPlaying = true;
    } catch (error) {
      console.error("Errore durante la riproduzione:", error);
    }
  }

  // --- INIZIALIZZAZIONE ---
  function init() {
    if (!audioPlayer) {
      console.error("Elemento audio player principale non trovato.");
      return;
    }
    console.log("App inizializzata.");
  }

  init();
});
