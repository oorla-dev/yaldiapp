document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.app-container');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            if (!targetView) return;
            
            // Hide all views
            views.forEach(view => {
                view.classList.add('hidden');
            });
            
            // Show target view
            document.getElementById(targetView).classList.remove('hidden');
            
            // Update active nav item
            navItems.forEach(navItem => {
                if (navItem.getAttribute('data-view') === targetView) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            });
        });
    });
    
    // Player controls
    const playBtn = document.querySelector('.play-btn');
    let isPlaying = true;
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            this.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    });
    
    // Album click functionality
    const albumItems = document.querySelectorAll('.album-item');
    
    albumItems.forEach(album => {
        album.addEventListener('click', function() {
            const albumImg = this.querySelector('img').src;
            const albumTitle = this.querySelector('.album-title').textContent;
            
            // Update now playing
            document.querySelector('.now-playing img').src = albumImg;
            document.querySelector('.track-info').textContent = albumTitle;
            
            // Reset player state
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        });
    });
});