const liveScore = localStorage.getItem('liveScore');
      
document.getElementById('final-score').innerText = `Your Score: ${liveScore || 0}`;

const backgroundMusic = new Audio('./khada hun aaj bhi vahi cat version.mp3'); 
backgroundMusic.loop = true; 
    backgroundMusic.volume = 0.5; 
    backgroundMusic.play(); 