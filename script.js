const backgroundMusic = new Audio('./03. Prepare to Be Sliced!.mp3'); 
    backgroundMusic.loop = true; 
    backgroundMusic.volume = 0.5; 
    backgroundMusic.play(); 


document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Login:', username, password);
    alert('Login submitted!');
});

document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    console.log('Signup:', username, password);
    alert('Signup submitted!');
});

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Signup successful! You can now log in.');
        window.location.href = 'index.html'; 
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            window.location.href = 'welcome.html';
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }


}