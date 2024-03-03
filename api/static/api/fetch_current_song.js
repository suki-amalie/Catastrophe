async function fetch_current_song() {
    try {
        const response = await fetch("/spotify/current-song");
        if (!response.ok) {
            console.error("Failed to fetch the current song.");
            return {}; // Return an empty object or any other fallback value you prefer
        } else {
            const data = await response.json();
            //console.log(data);
            return data; // This will be returned when the promise resolves
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return {}; // Return an empty object or any other fallback value in case of error
    }
    
}

let currentSongData = {}; // Store the current song data globally


async function updateUIWithCurrentSong() {
    const songData = await fetch_current_song();
    // Now you have the song data, you can use it to update your UI accordingly
    // For example:
    if (songData.image_url !== currentSongData.image_url) {
        // Update other UI elements as needed
        currentSongData = songData
        display_current_song(currentSongData);


    }
    if (songData && Object.keys(songData).length > 0) {
        // Update your progress bar or other elements based on songData
        console.log("Song data fetched and UI can be updated here");
        // Periodically update the progress bar every second
        updateProgressBar(songData);
        updateTimeDisplay(songData);
    } else {
        // Handle the case where no song data is available
        console.log("No song data available");
    }
}



function display_current_song(songData) {
    const song_container = document.getElementById('song-container');

    var song_content = 
    `<div class="song-cover float-left">
    <img src=${songData.image_url} alt="Song Cover">
    </div>
    <div class="song-info float-right" id="current-song">
        <div class="song-name">${songData.title}</div>
        <div class="song-artist">${songData.artist}</div>
        <div class="music-progress-group">
            <div class="music-time" id="currentTime">0:00</div>
            <div class="music-progress-container">
                <div class="music-progress-bar" id="musicProgressBar"></div>
            </div>
            <div class="music-time" id="totalTime">0:00</div>
        </div>
    </div>`;

    song_container.innerHTML = song_content;

}

async function updateProgressBar(songData) {

    const progressBar = document.getElementById('musicProgressBar');
    if (songData.is_playing) {

        const percentage = (songData.time / songData.duration) * 100;
        progressBar.style.width = percentage + '%';
    } else {
        progressBar.style.width = '0%';
    }
}

// Helper function to format time (in seconds) as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60000);
    const remainingSeconds = ((seconds/1000) % 60).toFixed(0);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to update the time display
function updateTimeDisplay(songData) {
    const currentTimeElement = document.getElementById('currentTime');
    const totalTimeElement = document.getElementById('totalTime');
    console.log("Current time:", songData.time);

    const currentTime = formatTime(songData.time);

    const duration = formatTime(songData.duration);

    currentTimeElement.textContent = currentTime;
    totalTimeElement.textContent = duration;
}





// Initial call to update the UI with the current song
updateUIWithCurrentSong().catch(console.error); // Don't forget to handle potential errors

// Periodically update the UI with the current song
setInterval(updateUIWithCurrentSong, 1000); // Update every 5 seconds (adjust as needed)